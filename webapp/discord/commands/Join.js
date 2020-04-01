/**
 * Created by MHU on 31.03.2020.
 */
// need to use ugly global value because in define it gets undefined
var DiscordGlobal;

sap.ui.require([
    "csg/dev/BigBuddy/discord/Discord"
], function (Discord) { // eslint-disable-line id-match
    "use strict";
    DiscordGlobal = Discord; // eslint-disable-line id-match
    return Discord; // eslint-disable-line id-match
});

sap.ui.define([
    "sap/ui/base/Object",
    "sap/m/MessageToast"

], function (Object, MessageToast) { // eslint-disable-line id-match
    "use strict";

    return {
        oQueue: [],
        sNextPageToken: "",

        execute: function (sCommand, aArguments) {
            if (sCommand === "test") {
                var sPlaylistId = "PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG";
                var oXhttp = new XMLHttpRequest();
                oXhttp.onreadystatechange = function (oEvent) {
                    if (oEvent.target.readyState === 4 && oEvent.target.status === 200) {
                        var oResult = JSON.parse(oEvent.target.responseText);
                        this.handleResult(oResult);
                    }
                }.bind(this);

                oXhttp.open("GET", DiscordGlobal.getConfigProperty("sYoutubeApiUrlPrefix") + sPlaylistId + "&key=" + DiscordGlobal.getConfigProperty("sYoutubeApiKey"), true);
                oXhttp.send();
                return true;
            } else {
                debugger;
                return false;
            }
        },

        handleResult: function (oResult) {
            debugger;
        }
    };
});