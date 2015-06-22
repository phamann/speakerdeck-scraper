"use strict";

var $ = require("cheerio");
var parseDate = require("../utils/date");
var baseUrl = require("../utils/config").baseUrl;

function parseStars($html) {
    return parseInt($html(".stargazers").text().match(/([0-9]+)/)[0]);
}

function parseViews($html) {
    var rawStr = $html(".views span").text().replace(",", "");
    var views = parseInt(rawStr.match(/([0-9]+)/)[0]);
    return views;
}

function generateEmbed(id) {
    return '<script async class="speakerdeck-embed" data-id="' + id + '"' +
                ' src="//speakerdeck.com/assets/embed.js"></script>';
}

function parseUser($html) {
    return {
        id: $html(".presenter a").attr("href").replace("/", ""),
        name: $html(".presenter h2").text(),
        avatar: $html(".presenter img").attr("src"),
        url: baseUrl +  $html(".presenter a").attr("href"),
        presentations: parseInt($html(".presentation-count").text().match(/([0-9]+)/)[0])
    };
}

function parseThumbnail(html) {
    return html.match(/<meta property\=\"og\:image\" content\=\"(.*)\"/)[1];
}

function parse(rawHTML) {
    var $html = $.load(rawHTML);
    var id = $html(".speakerdeck-embed").attr("data-id");
    return {
        id: id,
        user: parseUser($html),
        title: $html("#talk-details H1").text().trim(),
        description: $html(".description").text().trim(),
        date: parseDate($html("#talk-details mark").first().text()),
        stars: parseStars($html),
        category: $html(".category a").text(),
        views: parseViews($html),
        embed: generateEmbed(id),
        download: $html("#share_pdf").attr("href"),
        thumbnail: parseThumbnail(rawHTML)
    };
}

module.exports = parse;
