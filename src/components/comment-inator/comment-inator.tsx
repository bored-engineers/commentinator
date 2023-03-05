import { Component, h, Host, Prop, State } from '@stencil/core';
import firebase from 'firebase/compat/app';
import { getAuth, signInWithPopup, GithubAuthProvider, setPersistence, browserLocalPersistence, signOut, User } from 'firebase/auth';
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore';
import { Comment } from './types';
import { getGithubUser } from './github-service';

declare var firebaseConfig: any;

@Component({
  tag: 'comment-inator',
  styleUrl: 'comment-inator.css',
})
export class CommentInator {
  firebaseApp: firebase.app.App = firebase.initializeApp(firebaseConfig);
  auth = getAuth(this.firebaseApp);
  firestore = getFirestore(this.firebaseApp);

  @State() showLoader: boolean = true;
  @State() user: User & { username: string };
  @State() comments: Comment[] = [];

  @Prop() height: string;
  @Prop() groupId: string;

  async componentDidLoad() {
    this.auth.onAuthStateChanged(async user => {
      this.user = user ? { ...user, username: (await getGithubUser(user.providerData[0].uid)).username } : null;
      this.showLoader = false;
    });

    const querySnapshot = await getDocs(query(collection(this.firestore, 'blog-comments'), where('groupId', '==', this.groupId)));
    this.comments = await Promise.all(
      querySnapshot.docs.map(async doc => {
        const comment = doc.data();
        const { username, name, imageUrl } = await getGithubUser(comment.githubId);
        return { username, name, imageUrl, text: comment.text, id: doc.id };
      }),
    );
  }

  // onPostCommentClickHandler = async (text) => {
  //   await setDoc(doc(this.firestore, 'blog-comments', uuid()), {
  //     text: text,
  //     collectionId: '1',
  //     githubId: this.user.providerData[0].uid,
  //   });
  // };

  onLoginClickHandler = () => {
    setPersistence(this.auth, browserLocalPersistence)
      .then(() => signInWithPopup(this.auth, new GithubAuthProvider()))
      .catch(e => console.error(e));
  };

  onLogoutClickHandler = () => {
    signOut(this.auth)
      .then(result => console.log(result))
      .catch(e => console.error(e));
  };

  render() {
    console.log('rendering');

    return (
      <Host>
        <div class="comment-form">
          {!this.user && (
            <div class="login">
              <span>Please sign in using following method to post comments</span>
              <button type="button" class="main" onClick={this.onLoginClickHandler}>
                Github
              </button>
            </div>
          )}
          {this.user && (
            <div class="login">
              <div class="top">
                <img src={this.user.photoURL} width="48" height="48" />
                <div class="name-time">
                  <span class="name">{this.user.displayName || this.user.username}</span>
                </div>
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
                  <img src={comment.imageUrl} width="48" height="48" />
                  <div class="name-time">
                    <span class="name">{comment.name || comment.username}</span>
                    <span class="time">2 Days Ago</span>
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
