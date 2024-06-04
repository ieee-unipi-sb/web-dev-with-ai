# Workshop Guide

This guide is a step-by-step document in order to assist the attendies of the workshop "My first website with a glimpse of AI" presented by [Adreas Karabetian](https://github.com/adreaskar) and [Panagiotis Karamolegkos](https://www.github.com/karamolegkos).

# Table of Contents

## Prerequisites

- [Git](https://git-scm.com/downloads/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en/)

## Demo 1: Initial Testing

<details>
<summary><b><u>Download Code</b></u></summary><br>
  
Open VS Code and and in the toolbar select: `File ► Add Folder to Workspace ► Desktop ► Right Click ► Create ► Folder ► Name your Folder (for example "my-project") ► Add`.

Open a Terminal by selecting `Terminal ► New Terminal`. Then on your brand new Terminal, click the drop down `⌄` button, next to the `+` sign. Then choose `Command Prompt`.

In the Terminal write the following commands:

```shell
git clone https://github.com/ieee-unipi-sb/web-dev-with-ai
cd web-dev-with-ai
```

The first command is used to download the code from a repository. The second one is used to navigate inside the folder of our code.

</details>

<details>
<summary><b><u>Interaction with the Code</b></u></summary>
  
  ### Let's experiment with the code.

We can watch our website locally if we do the following: `Right Click on index.html ► Copy Path ► Open a Browser ► Paste the Copied Path on the URL`. 

- We can edit `public/index.html` line 9, to change the title of your website.

```html
<title>MovieFlix - Your movies collection</title>
```

- We can edit `public/index.html` line 39, to change the brand name of your website (logo on the menu).

```html
<a class="navbar-brand" style="user-select: none;">MovieFlix</a>
```

- We can link our CSS code in our HTML document, `public/index.html` line 27, like so:

```html
<link rel="stylesheet" href="css/style.css" />
```

- We can add inline CSS styling on your HTML elements, `public/index.html` line 77, like so:

```html
<button style="margin-top: 10px;" type="submit" class="btn btn-primary">
  Add Movie
</button>
```

- We can link our JavaScript code in our HTML document `public/index.html` line 197, which is used to run our application's logic, like so:

```html
<script src="js/main.js"></script>
```

- We can change our application's background image by editing the file name in our `public/css/style.css` line 6.

```css
background: url("https://raw.githubusercontent.com/ieee-unipi-sb/web-dev-with-ai/main/public/img/3.png");
```

- We can change our footer background color by editing the following attribute in
  `public/css/style.css` line 83.

```css
background-color: #f1f1f1;
```

</details>

## Demo 2: Integration with cloud services (Firebase)

<details>
<summary><b><u>Create Firebase Project & Key</b></u></summary>

### 1. Create a Project

Go to the [Firebase Console](https://console.firebase.google.com) and do the following:

- Login with your gmail account
- Create a Name for your project like `my-project-example`
- In this step, Firebase will create a Unique Identifier for your project. For example `my-project-example-becec6`
- Choose if you want to Enable Google Analytics (select `No` for this workshop)
  - If you accept the above, you will have to connect your Project with One Account for Firebase
- Create your project

### 2. Configure your Project

From your `Project Overview` Dashboard and under "Get started by adding Firebase to your app" choose `Web`. Now do the following:

- Give a Nickname to your Web App. Something like `my-web-example` and check the `"Also set up Firebase Hosting for this app"` box.
- Click on the drop down menu and choose to create your own id for your site. Give it a name like `my-first-project.web.app`
- Click Register App
- Choose `Use a <script> tag` opton
  - The Dashboard will provide you with everything you need, with a code snippet to create your firest Web App
- Press `Next`
- Press `Next` (yes trust us, again)
- Press `Continue to console`

### 3. Setup the FireStore Database

To Create FireStore:

- Go to your `Project Overview` Dashboard.
- Click on Build.
- Choose Firestore Database.
- Create Database.
- Select Europe.
- Start in test mode.
- Select `Create`.

### 4. Get your Firebase Key

In your `Project Overview` Dashboard:

- Next to `Project Overview` click on the gear icon (⚙️) ► `Project Settings`
- Scroll Down to `SDK setup and configuration` and Click on `Config`
- Do not close that page because you will need this config object in the next steps

</details>

<details>
<summary><b><u>Interaction with the Code - FireStore Database</b></u></summary>

### Let's complete our code

#### 1. In `public/index.html` lines 165 - 168 we have an empty config variable. We need to fill this information with our firebase configs.

```javascript
// Your web app's Firebase configuration
const firebaseConfig = {};
```

Return to your firebase Project Settings page copy the config object and paste it between the lines 165 - 168 in `public/index.html`.

```javascript
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "MyApIkEy",
  authDomain: "myproject.firebaseapp.com",
  projectId: "myproject-a5p21",
  storageBucket: "myproject-a5o21.appspot.com",
  messagingSenderId: "80244867918",
  appId: "1:80244847918:web:u197f9dd840194e26ef7bf",
};
```

#### 2. Uncomment `public/index.html` lines 200 - 201, from this:

```html
<!-- <script src="js/firebase.js"></script> -->
<!-- <script src="js/main.js"></script> -->
```

To this:

```html
<script src="js/firebase.js"></script>
<script src="js/main.js"></script>
```

</details>

<details>
<summary><b><u>Setup Llama3 Account & API Token</b></u></summary>

### To get your Llama3 API Token:

- Go to the [Llama API Website](https://www.llama-api.com/).
- Click on `Login`.
- Make an Account.
- From the `My Account` Dashboard, click on `API Token`.
- Click `Refresh` to generate your API Token.
- Do not close this page because you will need this Token in the next steps.

</details>

<details>
<summary><b><u>Interaction with the Code - Llama3 API</b></u></summary>
    
  ### Let's add our AI assistant.

#### 1. We start by uncommenting our chatbot functionalities file in `public/index.html` line 202 from this:

```html
<!-- <script src="js/chatbot.js"></script> -->
```

To this:

```html
<script src="js/chatbot.js"></script>
```

#### 2. Next we add our HTML code in `public/index.html` line 139

```html
<button class="chatbot-toggler">
  <span class="material-symbols-rounded">mode_comment</span>
  <span class="material-symbols-outlined">close</span>
</button>
<div class="chatbot">
  <header>
    <h2 style="margin-bottom: 0;">MovieBot</h2>
    <span class="close-btn material-symbols-outlined">close</span>
  </header>
  <ul class="chatbox">
    <li class="chat incoming">
      <span class="material-symbols-outlined">smart_toy</span>
      <p>Hi there 👋<br />How can I help you today?</p>
    </li>
  </ul>
  <div class="chat-input">
    <textarea
      placeholder="Enter a message..."
      spellcheck="false"
      required
    ></textarea>
    <span id="send-btn" class="material-symbols-rounded">send</span>
  </div>
</div>
```

#### 3. Let's add our Llama3 API key in `public/js/chatbot.js` line 10, between the double quotes. Starting from this:

```javascript
const API_KEY = "";
```

To something like this:

```javascript
const API_KEY =
  "LL-ZFLXvmZ0zjiA9trVSZNqulX3dd1Db7qMAedQq6sjRjcCLyUy2GsB56SZTxgDf4Ig";
```

</details>
  
## Web Application Deployment
    
<details>
<summary><b><u>Initialize a Firebase Repository</b></u></summary>
    
  To deploy your Web Application in publicly, you will have to install some packages for Firebase. Use the following commands in your `Terminal` in order to proceed:
  
  ```shell
  npm install -g firebase
  npm install -g firebase-tools
  ```

Then, you will have to login to Firebase and create a new Repository from your `Terminal` with the commands below. Follow the Guide and in the end select to use `Firestore` and `Hosting (Without Github)`. If you have any errors, follow the link provided to you in your Terminal.

```shell
firebase login  # Type Y on the prompt and then open your browser to login
firebase init
```

In the `firebase init` procedure choose the following: 

- Which Firebase features do you want to set up for this directory? ►

  ◉ Firestore: Configure security rules and indexes files for Firestore

  ◉ Hosting: Configure files for Firebase Hosting and (optionally) set

##### Project Setup

- Please select an option ► <b>Use an existing project</b>

- Select a default Firebase project for this directory ► <b> < Your project name > </b>

##### Firestore Setup

- What file should be used for Firestore Rules? ► <b> firestore.rules (Just click Enter) </b>

- What file should be used for Firestore indexes? ► <b> firestore.indexes.json (Just click Enter) </b>

##### Hosting Setup

- What do you want to use as your public directory? ► <b> public (Just click Enter) </b>

- Configure as a single-page app (rewrite all urls to /index.html)? ► <b> y </b>

- Set up automatic builds and deploys with GitHub? ► <b> N </b>

- File public/index.html already exists. Overwrite? ► <b> N </b>

</details>

<details>
<summary><b><u>Public Deployment</b></u></summary>

When you are ready you can deploy your site using the command:

```
firebase deploy
```

Now you can access your site though the ID of your project. For convinience:

- From your `Project Overview` Dashboard, click on `Hosting`.
- Click on one of the links under `Domains`.

Or just use the URL provided in your Terminal. 😊

</details>
