# CST499 - Project

# Source layout

* /src/index.js - This file will contains all of the basic routing of the application.
* /src/app - This directory will contains the business logic for the application
* /src/model - This directory will contains the core types and storage backends for models.
* /src/util - This directory will contains helper fumctions or constants variable

### How to run the project

## Running locally

Inorder to run this application locally you will need to install a few dependencies

* Node JS (https://nodejs.org/en/) (Recommend LTS)
* Yarn (https://yarnpkg.com/en/docs/install)
* Git
* Mongodb (Database)(https://docs.mongodb.com/v3.2/administration/install-community/)

Make sure you start your mongo server before continue.

After you installed all of the dependencies above you can run `yarn` to install project dependencies

`yarn dev` - To run server in development
`yarn build` - To build server for production
`yarn prod` - To run server in production mode
