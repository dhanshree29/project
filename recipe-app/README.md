# RecipeApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.0,requires Node.js version 10.9.0 or later.

## Script for Development and Node server.
Install packages while doing local setup, run `npm install` and `npm install -g concurrently`.
Script is added in package.json file to run node  as well as devlopment server use `npm start`. 
Alternatively Run `node server.js` for consuming API using node server as backend before starting the app.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## About Recipe App
Application allows users to manage recipes. Display a dashboard to show a list of all available recipes and the options to create, update and delete a recipe. 
When the user selects a recipe the application display detail view of recipe. Recipes are retrieved through API with Node.js. 

## Planning the App
app Component - Root component holding our overall application.
header Component - Navigate between different sections and fetch/save data from/to server.
page-not-found component - Redirect users to home page when no route is found.
recipes component - Its a feature component holding other components.
recipe-list component - List all the available recipes as well as recipes are filterable and searchable.
recipe-item - its a recipe item to be displayed on recipe listing page.
recipe-edit - To add/edit recipe 
recipe-detail - Display detail view of recipe with edit and delete functionality
recipe-entry - Display message for recipe selection on home page.
Pipe and recipe Service - Pipe to filter and serach recipe. Service to store, delete, update and fetch/post data to api. 

## Backend
server.js file in the root of application is node server. Backend folder contains api code.

## Code Coverage
Run command `ng test --code-coverage` to see code coverage report.
Code coverage report is present in coverage folder.


