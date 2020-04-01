/**
 * Created by MHU on 31.03.2020.
 */
sap.ui.define([
    "sap/ui/base/Object",
    "sap/m/MessageToast",
    "./commands/Commands",
    "../lib/discord/webpack/discord.min"

], function (Object, MessageToast, Commands, DiscordJs) { // eslint-disable-line id-match
    "use strict";

    /**
     * Discord.js
     *
     * @param {String} [sId] id for the new control, generated automatically if no id is given
     * @param {Object} [mSettings] initial settings for the new control
     *
     * @class Discord.js
     *
     * @extends csg.dev.util.Discord
     *
     * @constructor
     * @public
     * @alias csg.dev.Discord
     */
    return {

        /**
         * Init some globals
         * @public
         * @alias csg.dev.Discord
         */
        init: function (oConfig) {
            this.setConfigModel(oConfig);
            this.setClient(new Discord.Client());
        },

        attachEvents: function (oClient) {
            oClient.on("ready", () => {
                MessageToast.show("Connected!");
            });

            oClient.on("message", oMessage => {
                if (!oMessage.author.bot) {
                    Commands.execute(oMessage.content, oMessage);
                }
            });
        },

        execute: function (sMessage, oMessage) {
            // TODO: split into command and args, if oMessage not inital => message was send from discord app
            if (sMessage.startsWith(this.getConfigProperty("sPrefix")) && sMessage.length > 1) {
                var aArguments = sMessage.substr(1).split(" "),
                    sCommand = aArguments[0];

                // remove command from arguments
                aArguments.shift();

                Commands.execute(sCommand, aArguments);
            }
        },

        login: function () {
            return this.getClient().login(this.getConfigProperty("sToken")).then(() => {
                this.setConfigProperty("bConnected", true);
            });
        },

        logout: function () {
            this.getClient().destroy();
            this.setConfigProperty("bConnected", false);
        },

        restart: function () {
            this.logout();
            return this.login();
        },

        setConfigModel: function (oModel) {
            this._oConfigModel = oModel;
        },

        setConfigProperty: function (sProperty, oObject) {
            this.getConfigModel().setProperty("/" + sProperty, oObject);
        },

        setClient: function (oClient) {
            this._oClient = oClient;

            // to lazy to use property change event
            this.attachEvents(oClient);
        },

        getClient: function () {
            return this._oClient;
        },

        getConfigModel: function () {
            return this._oConfigModel;
        },

        getConfigProperty: function (sProperty) {
            return this.getConfigModel().getProperty("/" + sProperty);
        }

    };
});
