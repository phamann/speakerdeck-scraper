# speakerdeck-scraper

### [Speaker Deck](http://speackerdeck.com) scraper for Node.js.

Why a Scraper? They don't have an API (yet).

## Setup

Install the module with: `npm install --save speakerdeck-scraper`

## Basic Usage

### .getUser()
The `getUser()` method accepts a user ID (the speaker deck path) and an optional page number.

This returns a Promise resolving to the users information and talks for the supplied page.

``` js
var speakerdeck = require('speakerdeck-scraper');

speakerdeck.getUser('patrickhamann', 2).then(function(user) {
  console.log(user.talks.items); // Array containing talk data
});
```

### `.getTalk()`
The `getTalk()` method accepts a talk ID (the speakerdeck.com path) and returns a Promise resolving to the talk information.

```js
var speakerdeck = require('speakerdeck-scraper');

speakerdeck.getTalk("patrickhamann/building-theguardian-dot-com").then(function(talk){
    console.log(talk.title);
})
```

### User Data

The following properties are available on the returned `user` object:

```javascript
{
  "user": {
    "id": String,
    "url": String,
    "name": String,
    "avatar": String,
    "bio": String
  },
  "talks": {
    "pages": Number,
    "page": Number,
    "items": [
      {
        "id": String,
        "title": String,
        "url": String,
        "date": String,
        "slides": Number,
        "thumbnail": String
      }
    ]
  }  
}
```

### Talk Data

The following properties are available on the returned `talk` object:

```javascript
{
  "user": {
    "id": String,
    "url": String,
    "name": String,
    "avatar": String
  },
  "description": String.
  "date": String,
  "stars": Number,
  "category": String,
  "views": Number,
  "embed": String,
  "download": String
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.

Lint your code with `gulp lint` and run tests with `gulp test`

All code is linted and tested automatically once pushed using [Travis CI](http://travis-ci.org/phamann/speakerdeck-scraper).

## License
Copyright (c) 2015 Patrick Hamann 
Licensed under the MIT license.

## Acknowledgements
Heavily inspired by [Mark Daglesish](https://github.com/markdalgleish)'s [lanyrd-scraper](https://github.com/markdalgleish/node-lanyrd-scraper)
