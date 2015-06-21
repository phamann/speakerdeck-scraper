"use strict";

var moment = require("moment");

module.exports = function(rawString) {
    try {
        var date = rawString.match(/[\w]+\s+[0-9]+,\s+[0-9]{4}/)[0];
        return moment(date, ["MMM DD, YYYY", "MMMM DD, YYYY"]).format();
    } catch(e) {
        return;
    }
};
