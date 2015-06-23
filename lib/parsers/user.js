"use strict";

var $ = require("cheerio");
var parseDate = require("../utils/date");
var baseUrl = require("../utils/config").baseUrl;

function totalPages($html) {
    try {
        return parseInt($html(".pagination .last a").attr("href").match(/page=([0-9]+)/)[1]);
    } catch(e) {
        return 1;
    }
}

function parseTalks($html) {
    return $html(".talk").not(".empty").map(function(i, el) {
        return {
            id: $(el).attr("data-id"),
            title: $(".title", el).text().trim(),
            url: baseUrl + $("a", el).attr("href"),
            date: parseDate($(".date", el).text().trim()),
            slides: parseInt($(el).attr("data-slide-count")),
            thumbnail: $("[alt='Thumb_slide_0']", el).attr("src")
        };
    }).get();
}

function parseUser($html) {
    return {
        id: $html(".bio_mugshot").attr("href").replace("/", ""),
        url: baseUrl + $html(".bio_mugshot").attr("href"),
        name: $html(".sidebar h2").text(),
        avatar: $html(".bio_mugshot img").attr("src"),
        bio: $html(".bio").text()
    };
}


function parse(rawHTML, page){
    var $html = $.load(rawHTML);
    var pages = totalPages($html);
    var data = {
        user: parseUser($html),
        pages: pages,
        currentPage: page,
        count: $html(".talks").children().filter('.public').length,
        talks: parseTalks($html)
    };

    if(page < pages) {
        data.nextPage = page + 1;
    }

    return data;
}

module.exports = parse;
