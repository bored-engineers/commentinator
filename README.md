# Commentinator

Commentinator is a lightweight, open-source library designed for adding comments functionality to static websites, blogs, portfolios, articles, and even product websites. It is built on top of Firebase Authentication and Firestore Database, making it easy to use and reliable.

With Commentinator, you can enable your website visitors to leave comments on your pages and engage with your content. Commentinator uses Firebase Authentication to allow users to sign in with their GitHub accounts before they can add comments. This ensures that only authenticated users can leave comments, reducing the risk of spam or abusive comments.Commentinator stores comments in a Firestore Database, making them easily accessible and manageable. 

Commentinator is completely free to use and open-source, meaning you can modify and redistribute it as you see fit. However, if you use Firebase services, you will need to sign up for a Firebase account and pay for any usage beyond the free tier.


## Installation and usage

To use Commentinator, you need to provide following configurations -

1. First we need to give configuration and import the libary itself. Add below to `head` tag -

   ```javascript
       <script>
         var commentinatorConfig = {
           collectionName: '', // Your collection name in firesbase storage
          firebase: { // To know how to configure firebase, see firebase configuration section below
           apiKey: '',
           authDomain: '',
           projectId: '',
         }};
       </script>
       <script type="module" src="/build/commentinator.esm.js"></script>
       <script nomodule src="/build/commentinator.js"></script>
   ```

   Note - Its better to use Nuinito Font with this libary for minimal clean look. to do that add below to `head` tag -

   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet" />
   <style>
     * {
       font-family: 'Nunito', sans-serif;
       font-size: 16px;
     }
   </style>
   ```

2. Now add following html tag wherever you want to use commentinator -
   ```html
   <comment-inator group-id="<your group id>" height="<height for component>" />
   ```

   You have to use these tag on every page where you want to show commentinator interface. Note that comments are grouped using `group id` so if you want to have different comments on different pages of your site, blogs or products, you need to specify group id according to that. 

### Firebase Configurations
1. If you haven't already, create an account on Google Firebase.
2. Create a new Firebase project using the Firebase Console.
3. In the Firebase Console, navigate to the Authentication section and enable GitHub authentication.
4. Create a new GitHub OAuth App and provide the client ID and client secret from your app to the Firebase authentication setup.
5. Back in your Firebase project, add a new web app. Once the setup is complete, Firebase will provide you with a configuration object containing your apiKey, authDomain, and projectId. Copy these values and provide them to the Commentinator configuration in the head tag of your website.
6. Next, set up a Firestore database using the Firebase Console.
7. To ensure that only authorized GitHub users can add comments, add the following security rules to your Firestore database:
    ```javascript
    allow read;
    allow write: if request.auth.token.firebase.identities['github.com'][0] == request.resource.data.githubId;
    ```
8. Once your security rules are in place, create an index in your Firestore database. To do this, run your code locally and look for the following error in the console: FirebaseError: The query requires an index. You can create it here: https://console.firebase.google.com/v1/.... Click on the link provided to create the index automatically. Once the index is created, you're ready to start using Commentinator!

Todos
## running in local
## Contributing
## Code of Conduct
## License