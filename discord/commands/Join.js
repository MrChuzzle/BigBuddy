var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var oJoin = function Join(oBigBuddy) {
    this._oBigBuddy = oBigBuddy;
};

oJoin.prototype.execute = function (sCommand, aArguments) {
    if (sCommand === "test") {
        var sPlaylistId = "PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG";
        var oHttp = new XMLHttpRequest();

        oHttp.onreadystatechange = function () {
            if (oHttp.readyState === 4 && oHttp.status === 200) {
                var oResult = JSON.parse(this.responseText);
                handleResult(oResult);
            }
        };

        oHttp.open("GET", this._oBigBuddy.getConfigProperty("sYoutubeApiUrlPrefix") + sPlaylistId + "&key=" + this._oBigBuddy.getConfigProperty("sYoutubeApiKey"), true);
        oHttp.send();

        return true;
    } else {
        return false;
    }
};


/* =========================================================== */
/* private section        		                               */
/* =========================================================== */
var oQueue = [];
var sNextPageToken = "";

function handleResult(oResult) {
    console.log(oResult);
}

/* =========================================================== */
/* export               		                               */
/* =========================================================== */
module.exports = {
    oJoin
};