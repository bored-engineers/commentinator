import { Component, getAssetPath, h, Host, Prop, State } from '@stencil/core';
import firebase from 'firebase/compat/app';
import { getAuth, signInWithPopup, GithubAuthProvider, setPersistence, browserLocalPersistence, signOut, User } from 'firebase/auth';
import { getFirestore, getDocs, collection, query, where, doc, setDoc, orderBy } from 'firebase/firestore';
import { IComment, IConfig } from './types';
import { getGithubUser } from './github-service';
import { v4 as uuid } from 'uuid';
import formatTimeAgo from './utils/time.util';

declare var commentinatorConfig: IConfig;

@Component({
  tag: 'comment-inator',
  styleUrl: 'comment-inator.css',
  assetsDirs: ['assets'],
})
export class CommentInator {
  firebaseApp: firebase.app.App = firebase.initializeApp(commentinatorConfig.firebase);
  auth = getAuth(this.firebaseApp);
  firestore = getFirestore(this.firebaseApp);

  @State() showLoader: boolean = true;
  @State() user: User & { username: string };
  @State() comments: IComment[] = [];
  @State() currentCommentText = '';

  @Prop() height: string;
  @Prop() groupId: string;

  getComments = async (): Promise<IComment[]> => {
    const querySnapshot = await getDocs(query(collection(this.firestore, commentinatorConfig.collectionName), where('groupId', '==', this.groupId), orderBy('createdAt', 'desc')));
    return Promise.all(
      querySnapshot.docs.map(async doc => {
        const comment = doc.data();
        const { username, name, imageUrl } = await getGithubUser(comment.githubId);
        return { username, name, imageUrl, text: comment.text, id: doc.id, createdAt: comment.createdAt };
      }),
    );
  };

  saveComment = async () => {
    await setDoc(doc(this.firestore, commentinatorConfig.collectionName, uuid()), {
      text: this.currentCommentText,
      groupId: this.groupId,
      githubId: this.user.providerData[0].uid,
      createdAt: Date.now(),
    });
  };

  async componentDidLoad() {
    this.auth.onAuthStateChanged(async user => {
      this.user = user ? { ...user, username: (await getGithubUser(user.providerData[0].uid)).username } : null;
    });

    this.comments = await this.getComments();
  }

  onPostCommentClickHandler = async () => {
    if (!this.currentCommentText) return;
    await this.saveComment();
    this.currentCommentText = '';
    await this.getComments();
  };

  onLoginClickHandler = () => {
    setPersistence(this.auth, browserLocalPersistence)
      .then(() => signInWithPopup(this.auth, new GithubAuthProvider()))
      .catch(e => console.error(e));
  };

  onLogoutClickHandler = () => signOut(this.auth);

  onInputHandler = e => {
    this.currentCommentText = e.target.value;
  };

  render() {
    return (
      <Host class="commentinator">
        <div class="comment-form">
          {!this.user && (
            <div class="login">
              <span>Please sign in using following method to post comments</span>
              <button type="button" class="login-button" onClick={this.onLoginClickHandler}>
                <img src={getAssetPath(`./assets/github-logo.svg`)} />
              </button>
            </div>
          )}
          {this.user && (
            <div class="comment-form-area">
              <div class="top">
                <div class="top-left">
                  <img src={this.user.photoURL} width="48" height="48" />
                  <div class="name-time">
                    <span class="name">{this.user.displayName || this.user.username}</span>
                  </div>
                </div>
                <div class="top-right">
                  <button class="setting-button" onClick={this.onLogoutClickHandler} aria-label="logout" data-cooltipz-dir="bottom-right">
                    <img alt="logout" src={getAssetPath(`./assets/logout.svg`)} />
                  </button>
                </div>
              </div>
              <div class="box">
                <textarea value={this.currentCommentText} onInput={e => this.onInputHandler(e)} maxlength="300" />
                <button class="post" onClick={this.onPostCommentClickHandler}>
                  Post
                </button>
              </div>
            </div>
          )}
        </div>
        <hr />
        <div class="comments" style={{ '--height': this.height || '100%' }}>
          {this.comments.map(comment => {
            return (
              <div class="comment" id={comment.id}>
                <div class="top">
                  <div class="top-left">
                    <img src={comment.imageUrl} width="48" height="48" />
                    <div class="name-time">
                      <span class="name">{comment.name || comment.username}</span>
                      <span class="time">{formatTimeAgo(comment.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div class="bottom">
                  <span>{comment.text}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Host>
    );
  }
}
