# Dress Trial

## Description

This is a web view project to see how a dress looks on a model.

## Pre-requisites

1. Node.js
2. NPM
3. VS Code or any other editor
4. Git (optional) - only if you want to contribute to the project

## Installation

1. Clone the repository
2. Open the project in VS Code or any other editor
3. Run `npm install` to install all the dependencies
4. Run `npm start` to start the project
5. Open `http://localhost:3000` in your browser
6. Enjoy!

## Project Structure

- `public` - contains the static files
  - `index.html` - the main html file, the entry point of the application. This is hit when we navigate to `http://localhost:3000`
  - `app.js` - the main application file that contains javascript code to render the models and dresses. You can read more about it [here](./app.md)
  - `models` - contains the 3d models that we want to render
- `index.js` - the main file that contains the server code
  - js code has to run on a server, so we are using `express` to run the server
  - if we don't use a server that serves over http or https we get errors that it cannot load the resources and code doesn't work
- `package.json` - contains the project information and dependencies
- `webpack.config.js` - contains the webpack configuration
  - webpack is a module bundler, it bundles all the js, html, css and any other required files into one file so that it can be served to the browser

