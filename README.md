# Commentinator

## Usage

To use this library -

1. Add below to `head` tag -

   ```javascript
       <script>
         var commentinatorConfig = {
           collectionName: '', // Your collection name in firesbase storage
          firebase: {
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

2. Add following html tag wherever you want to use commentinator -
   ```html
   <comment-inator group-id="<your group id>" height="<height for component>" />
   ```

## Firebase Configurations

- You have to add index to get the comments in 'Recent First' order. To do that run the code, go into console and there will be a link to create the indexes or It can be done manualy from firebase console.
