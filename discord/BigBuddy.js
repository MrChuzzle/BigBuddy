var Discord = require("discord.js");
var CommandHandler = require("./commands/CommandHandler").oCommandHandler;
var fs = require("fs");
var _oConfigModel = JSON.parse(fs.readFileSync(__dirname + "/models/config.json", "utf8"));

var oBigBuddy = function BigBuddy(aArguments) {
    var oClient = new Discord.Client(),
        oCommandHandler = new CommandHandler(this);

    this.setCommandHandler(oCommandHandler);
    this.setClient(oClient);
    this.attachEvents(oClient);

    if (aArguments.includes("login")) {
        this.login();
    }
};

oBigBuddy.prototype.attachEvents = function (oClient) {
    oClient.on("ready", () => {
        console.log("Logged in as: " + oClient.user.username);
    });

    oClient.on("message", oMessage => {
        if (!oMessage.author.bot) {
            this.getCommandHandler().execute(oMessage.content, oMessage);
        }
    });
};

oBigBuddy.prototype.execute = function (sMessage, oMessage) {
    if (sMessage.startsWith(this.getConfigProperty("sPrefix")) && sMessage.length > 1) {
        // split message into command and arguments
        var aArguments = sMessage.substr(1).split(" "),
            sCommand = aArguments[0];

        // remove command from arguments
        aArguments.shift();

        this.getCommandHandler().execute(sCommand, aArguments);
    }
};

oBigBuddy.prototype.login = function () {
    return this.getClient().login(this.getConfigProperty("sToken")).then(() => {
        this.setConfigProperty("bConnected", true);
    });
};

oBigBuddy.prototype.logout = function () {
    this.getClient().destroy();
    this.setConfigProperty("bConnected", false);
};

oBigBuddy.prototype.restart = function () {
    this.logout();
    return this.login();
};

/* =========================================================== */
/* getter/setter functions		                               */
/* =========================================================== */

oBigBuddy.prototype.getClient = function () {
    return this._oClient;
};

oBigBuddy.prototype.setClient = function (oClient) {
    this._oClient = oClient;
};

oBigBuddy.prototype.getConfigModel = function () {
    return _oConfigModel;
};

oBigBuddy.prototype.setConfigModel = function (oModel) {
    _oConfigModel = oModel;
};

oBigBuddy.prototype.getConfigProperty = function (sProperty) {
    return this.getConfigModel()[sProperty];
};

oBigBuddy.prototype.setConfigProperty = function (sProperty, oObject) {
    this.getConfigModel()[sProperty] = oObject;
};

oBigBuddy.prototype.getCommandHandler = function () {
    return this._oCommandHandler;
};

oBigBuddy.prototype.setCommandHandler = function (oCommandHandler) {
    this._oCommandHandler = oCommandHandler;
};

/* =========================================================== */
/* export						                               */
/* =========================================================== */
module.exports = {
    oBigBuddy
};
