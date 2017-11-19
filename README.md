# subscription-app

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run all the tests.

- `grunt test:client` will run frontend tests only (default browser option: `Chrome`).
- `grunt test:server` will run backend tests only.

## Framework libraries

### Frontend

Built using `AngularJS` and `Bootstrap`.

Some relevant libraries used on the frontend:

- [angular-autodisable](https://github.com/kirstein/angular-autodisable): An extension to angular `ng-click` directive that automatically sets the element to disabled if the handler would return a promise. **Why:** It is a very useful directive you can easily use on forms to automatically avoid multiple submitting.

- [restangular](https://github.com/mgonto/restangular): An AngularJS service that simplifies common GET, POST, DELETE, and UPDATE requests with a minimum of client code. **Why:** It is a very simple way to consume data from a RESTful API and it also allows to do some interesting things like creating several instances with different configurations or adding request/response interceptors (which are basically automatic actions to perform on every request/response automatically), among others.

### Backend

Built using `Node.js` and `MongoDB` as persistance.

Some relevant libraries used on the backend:

- [express](http://expressjs.com): A minimal and flexible `Node.js` web application framework that provides a robust set of features for web and mobile applications with a large number of HTTP utility methods and middleware that turns creating a robust API into something fast and easy. **Why:** It is one of the most straightforward framework choices for developing APIs in `Node.js`. There is also a lot of useful middleware out there - for example: authentication or security middleware - that can be easily plugged in your express app with no effort and a big community behind it.

- [mongoose](https://github.com/Automattic/mongoose): A `MongoDB` object modeling for `Node.js` that provides a straight-forward, schema-based solution to model an application data. **Why:** It makes `MongoDB` data modeling and validation easier because it includes built-in query building, validation, type casting and some other useful features that, in the end, allow to save development time.

- [throwjs](https://github.com/kbariotis/throw.js/): A very simple HTTP Error collection library. **Why:** It is very handy because it allows to create HTTP Error objects through a very simple and intuitive API that also simplifies and keeps code neat and clean - plus saves development time too!

