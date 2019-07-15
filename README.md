# Jiffy

[**Demo**](https://jiffy-110ff.firebaseapp.com/) - [**CHANGELOG**](CHANGELOG.md)

## Getting Started

1. Login to the app using a Google account.
2. Trending GIFs are shown by default, click on one to select it, and save it to your inventory from the dialog. You can optionally search for any GIFs in the search box.
3. From the hamburger menu, you can go to Inventory to see your saved GIFs, but you will want to categorize them.
4. Click on My Categories from the main menu and add some categories like: `haha`, `fails`, `epic`.
5. Return to your inventory to select GIFs and assign them to categories.

## Dependencies

- Node 8+
- Firebase Tools CLI

## Install/Setup

- Install Node.js
- Install Firebase Tools CLI
- Obtain a GIPHY API Key
- `npm install`
- Create a Firebase App
- Create a .env file with the following contents, filling in the matching parameters you get from Firebase and GIPHY:

```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DATABASE_URL=
REACT_APP_PROJECT_ID=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
REACT_APP_GIPHY_API_KEY=
REACT_APP_GIPHY_BASEURL=https://api.giphy.com/v1/
REACT_APP_API_BASEURL=
```

- `npm start`

## Deployment

`npm run deploy`

## Stack

- Framework: **React**
- API: **Firebase Cloud Functions**
- DB: **FireStore**
- HOSTING: **FireBase Hosting**
- AUTH: **Google**
- GIFs: **GIPHY**

## File/Folder Structure

- build/ - build output
- functions/ - api code
- public/ - bootstrap react html
- src/ - project source code
  - components/ - reusable components throughtout the app
  - helpers/ - utility functions
  - scenes/ - presentation-layer components used in routes
  - services/ - api functions to call endpoints

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

Specifically added for Firebase. This will build the project to output artifacts to the `build/` folder and then deploy FireBase.
