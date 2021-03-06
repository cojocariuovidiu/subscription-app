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

Some relevant libraries used:

- [angular-autodisable](https://github.com/kirstein/angular-autodisable): An extension to angular `ng-click` directive that automatically sets the element to disabled if the handler would return a promise. **Why:** It is a very useful directive you can easily use to automatically avoid multiple form submitting.

- [restangular](https://github.com/mgonto/restangular): An AngularJS service that simplifies common GET, POST, DELETE, and UPDATE requests with a minimum of client code. **Why:** It is a very simple way to consume data from a RESTful API and it also allows to do some interesting things like, for example, creating several _Restangular_ instances using different configurations or adding request/response interceptors (which are basically automatic actions to perform on every request/response sent/received), among others.

### Backend

Built using `Node.js` and `MongoDB` as persistance.

Some relevant libraries used:

- [express](http://expressjs.com): A minimal and flexible `Node.js` web application framework that provides a robust set of features for web and mobile applications with a large number of HTTP utility methods and middleware that turns creating an API into something fast and easy. **Why:** It is one of the most straight-forward framework choices for developing APIs in `Node.js`, with a big community behind it. There are also a lot of useful middleware out there - for example, authentication and security middleware - that can be easily plugged into your express app with no effort.

- [mongoose](https://github.com/Automattic/mongoose): A `MongoDB` object modeling for `Node.js` that provides a straight-forward, schema-based solution to model your application data. **Why:** It makes `MongoDB` data modeling and validation easier because it includes built-in query building, validation, type casting and some other useful features that, in the end, allow to simplify code and save development time.

- [throwjs](https://github.com/kbariotis/throw.js/): A very simple HTTP Error collection library. **Why:** It is very handy because it allows to create HTTP Error objects through a very simple and intuitive API that also simplifies and keeps code neat and clean - plus saves development time too!

- [node-http-status](https://github.com/prettymuchbryce/node-http-status): Very simple module that exports constants enumerating the HTTP status codes. **Why:** It is very useful to avoid having status codes written in number in your server's code and having them easily referenced by constants instead, which keeps code much clean and readable. This one, together with the above listed `throwjs`, is one of my favorites.

Some **security** relevant libraries used:

- [helmet](https://github.com/helmetjs/helmet): Helmet is a collection of 12 smaller middleware functions that set HTTP headers to help protect your app. **Why:** Because it can help to avoid some known web vulnerabilities - it is also specified in the Express Security Best Practices [docs](http://expressjs.com/en/advanced/best-practice-security.html#use-helmet).

### Common libraries (Frontend & Backend)

- [momentjs](https://github.com/moment/moment/): Parse, validate, manipulate, and display dates and times in JavaScript. **Why**: Dealing with Dates can be something very tedious and this library offers a very useful and simple API to work with them very easily.

- [lodash](https://github.com/lodash/lodash): JavaScript utility library, implemented with performance in mind. **Why:** Because it makes easier working with arrays, numbers, objects, strings, etc. like, for example, iterating arrays, objects, strings or just testing values. In the end, it's very useful and saves development time too!

- [crypto](https://github.com/brix/crypto-js): JavaScript library of crypto standards. **Why:** Used it to generate the signature every request sent from a trusted client should specify. 

## API Documentation

### Security

A custom security middleware has been developed in order to secure the `/api` endpoint and discard requests from untrusted clients. Every trusted client should own a pair of `<api-key, api-secret>` keys and specify the following headers on every request sent to the backend service:

| Http Header | Description 	|
|-------	|-------------	|
| `subs-ts`  | The moment, expressed in _milliseconds_, the http request is being sent.<br> _Format: UTC Unix Timestamp._ |
| `subs-nonce`  | A random string. |
| `subs-apikey`  | The _api-key_ provided by the subscription app to the trusted client. |
| `subs-authorization`  | The request signature.<br> An hexadecimal coded hash generated by the _SHA1_ algorithm applied to a `keystring` using the _api-secret_ provided by the subscription app to the trusted client as the generator key. |

_NOTE: I didn't have time to use these headers in the integration tests, so the use of this middleware is commented in the code @_ [/server/routes.js:14](https://github.com/charliemc/subscription-app/blob/515925e7dae7fccffc891de7492a766bf06d6756/server/routes.js#L14)

#### Signature keystring generator

The `keystring` we use to generate the signature is the result of concatenating the `nonce`, `timestamp` and `apikey` together with some hash `#` characters:

`{nonce}#{ts}#{api-key}##`

An example of a JavaScript function that would generate this string would be the following:

```javascript
// Generates the keystring.
// Pre: <headersData.nonce>, <headersData.ts> and <headersData.apiKey> 
// should contain the values used in the headers.
function generateKeyString(headersData) {
  return headersData.nonce.concat('#')
    .concat(headersData.ts)
    .concat('#')
    .concat(headersData.apiKey)
    .concat('##');
}
```

### Subscriptions

#### Create subscription

**POST** `/api/subscriptions` creates a new subscription.

##### Request

| Field 	| Type   	| Description 	|
|-------	|--------	|-------------	|
| firstName  | string 	| **Optional**<br> Subscriber's first name. |
| email 	| string 	| **Required**<br> Subscriber's email address. |
| dateOfBirth 	| string 	| **Required**<br> Subscriber's date of birth. |
| gender 	| string 	| **Optional**<br> Subscriber's gender.<br> _Allowed values:_ `male`, `female`. |
| newsletterId 	| string 	| **Required**<br> Newsletter ID of the newsletter the subscriber wants to subscribe to.  |

example:

```json
{
  "firstName": "Bruce",
  "email": "brucewayne@wayne.enterprises.com",
  "dateOfBirth": "1976-02-28T23:00:00.000Z",
  "gender": "male",
  "newsletterId": "5a1095859ed46a42ff652796"
}
```

##### Response

###### Successful

| Field 	| Type   	| Description 	|
|-------	|--------	|-------------	|
| \_id  | string 	| New subscription's ID. |

example:

```json
HTTP/1.1 201 Created

{
  "_id": "5a1071f371e6d6335fd8757b"
}
```

###### Errors

| Status Code | Description 	|
|-------	|-------------	|
| 400  | **Bad Request**<br> Request subscription object is missing any of the required fields<br> _or_ any of the specified fields is invalid. |
| 409  | **Conflict**<br> The specified email address is already subscribed to that newsletter. |

examples:

```json
HTTP/1.1 400 Bad Request

{
  "name": "BadRequest",
  "message": "Subscription validation failed: email: Path `email` is required.",
  "statusCode": 400
}
```

```json
HTTP/1.1 409 Conflict

{
  "name": "Conflict",
  "message": "Subscription already exists",
  "statusCode": 409
}
```
