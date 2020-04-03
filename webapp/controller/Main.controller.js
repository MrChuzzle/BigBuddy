/**
 * Created by MHU on 31.03.2020.
 */
sap.ui.define([
	"../controller/BaseController"

], function (BaseController) { // eslint-disable-line id-match, max-length
    "use strict";

    // noinspection UnnecessaryLocalVariableJS
    /**
     * Main.controller.js
     *
     * Description
     *
     * @param {string} [sId] id for the new control, generated automatically if no id is given
     * @param {object} [mSettings] initial settings for the new control
     *
     * @class Main.controller.js
     *
     * @extends csg/dev/controller/BaseController
     *
     * @constructor
     * @public
     * @alias csg.dev.Main
     */
    var oMain = BaseController.extend("csg.dev.controller.Main", {

        /* =========================================================== */
        /* Standard functions 										   */
        /* =========================================================== */

        /**
         * This function is called every time the view is loaded
         * @memberOf csg.dev.Main
         */
        onInit: function () {
            var oRouter = this.getRouter();
            oRouter.getRoute("main").attachMatched(
                this._onRouteMatched, this);
            oRouter.getTarget("main").attachDisplay(
                this._onTargetDisplay, this);
        },

        /* =========================================================== */
        /* Utility functions of controller  						   */
        /* =========================================================== */

        /* =========================================================== */
        /* Event handlers (starts with "on")						   */
        /* =========================================================== */

        onPressLogin: function () {
            this.sendMessageToBigBuddy("!login");
        },

        onPressLogout: function () {
            this.sendMessageToBigBuddy("!logout");
        },

        onPressRestart: function () {
            this.sendMessageToBigBuddy("!restart");
        },

        onSubmitCommand: function (oEvent) {
            var sValue = oEvent.getParameter("value");

            this.sendMessageToBigBuddy(sValue);
        },

        /* =========================================================== */
        /* Private functions (starts with "_")						   */
        /* =========================================================== */

        /**
         * Is called every time the route was matched
         * @param {sap.ui.base.Event} oEvent - An Event object consisting of an id, a source and a map of parameters
         * @memberOf csg.dev.Main
         * @private
         */
        _onRouteMatched: function (oEvent) {
            var oView = this.getView(),
                oModel = oView.getModel();

            // TODO: check if you are connected to the bot server
            oModel.metadataLoaded().then(function () {
                // call binding functions here...
            }.bind(this));
        },

        /**
         * Is called every time the target gets displayed
         * @param {sap.ui.base.Event} [oEvent] - An Event object consisting of an id, a source and a map of parameters
         * @memberOf csg.dev.Main
         * @private
         */
        _onTargetDisplay: function (oEvent) {

        }
    });

    return oMain;

});
