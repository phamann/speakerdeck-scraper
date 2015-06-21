"use strict";

require('es6-promise').polyfill();
require('isomorphic-fetch');
var baseUrl = require("./utils/config").baseUrl;
var parseUser = require("./parsers/user");
var parseTalk = require("./parsers/talk");

function normalisePath(path) {
    return (/^\//.test(path)) ? path : '/' + path;
}

function fetchPath(path) {
    return fetch(path).then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }

        return response.text();
    }).catch(function(err) {
        console.log(err);
    });
}

function getUser(userId, page) {
    if(!userId) { throw new Error("User id needed to scrape"); }

    page = page || 1;
    var path = baseUrl + normalisePath(userId) + "?page=" + page;

    return fetchPath(path).then(function(data){
        return parseUser(data, page);
    });
}

function getTalk(talkId) {
    if(!talkId) { throw new Error("Talk id needed to scrape"); }

    var path = baseUrl + normalisePath(talkId);

    return fetchPath(path).then(function(data){
        return parseTalk(data);
    });
}

module.exports = {
    getTalk: getTalk,
    getUser: getUser
};
