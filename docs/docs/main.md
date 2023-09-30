---
title: Getting Started
---

# Introduction

Commentinator is a lightweight, open-source library designed for adding comments functionality to static websites, blogs, portfolios, articles, and even product websites. It uses Firebase Stack making it easy to use and reliable.

With Commentinator, you can enable your website visitors to leave comments on your pages and engage with your content. Commentinator uses Firebase Authentication to allow users to sign in with their GitHub accounts before they can add comments. This ensures that only authenticated users can leave comments, reducing the risk of spam or abusive comments. Commentinator stores comments in a Firestore Database, making them easily accessible and manageable.

Commentinator is completely free to use and open-source, meaning you can modify and redistribute it as you see fit. However, if you use Firebase services, you will need to sign up for a Firebase account and pay for any usage beyond the free tier.

## Preview

<p align="center">
  <video controls>
    <source src="/commentinator/videos/preview.webm" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</p>

## Getting Started

To start using commentinator we need to perform these two main activities -

### 1. Github Configuration

1. First navigate to your github account.
2. Create a new GitHub OAuth App.
3. Note down the client ID and client secret (we will use this to setup firebase configuration).

### 2. Firebase Configuration

1. If you haven't already, create an account on Google Firebase. Create a new Firebase project using the Firebase Console.
2. In the Firebase Console, navigate to the Authentication section and enable GitHub authentication.
3. Now provide the client id and client secret recieved from [Github Configuration](#1-github-configuration) step.
4. Next we need to add a new web app, you can find it under **Project Overview** section of the firebase project.
5. Once the setup is complete, Firebase will provide you with a configuration object containing your apiKey, authDomain, and projectId. Note down these we will use these values in the code configuration.
6. Next, set up a Firestore database using the Firebase Console.
7. To ensure that only authorized GitHub users can add comments, add the following security rules to your Firestore database:
   ```javascript
   allow read;
   allow write: if request.auth.token.firebase.identities['github.com'][0] == request.resource.data.githubId;
   ```
8. This step is after code configuration. Create an index in your Firestore database. To do this, run your code locally and look for the following error in the console: `FirebaseError: The query requires an index. You can create it here: https://console.firebase.google.com/v1/....` Click on the link provided to create the index automatically. Firebase might take some time in creating index, so wait till you see index status **Enabled**.

### 3. Code Configuration

1. First we need to give configuration and import the libary itself. Add below to `head` tag of your html -

   ```javascript
       <script>
         var commentinatorConfig = {
           collectionName: '', // Your collection name in firesbase storage, eg. blog-comments
           firebase: { // To know how to configure firebase, see firebase configuration
           apiKey: '',
           authDomain: '',
           projectId: '',
         }};
       </script>
       <script type="module" src="/build/commentinator.esm.js"></script>
       <script nomodule src="/build/commentinator.js"></script>
   ```

   Note - Its better to use Nuinito Font with this libary for minimal clean look. To do that add below to `head` tag -

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
   <comment-inator group-id="<your group id, eg. page-slug>" height="<height for component>" />
   ```

   You have to use these tag on every page where you want to show commentinator interface. Note that comments are grouped using `group id` so if you want to have different comments on different pages of your site, blogs or products, you need to specify group id according to that.
