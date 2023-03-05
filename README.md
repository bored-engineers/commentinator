# Commentinator

## Usage
To use this library - 
1. Add below to `head` tag - 

    ```javascript
        <script>
          var firebaseConfig = {
            apiKey: '',
            authDomain: '',
            projectId: '',
            storageBucket: '',
            messagingSenderId: '',
            appId: '',
            measurementId: '',
          };
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
    <comment-inator group-id="<your group id>" height="<height for component>"/>
    ```

