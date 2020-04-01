/**
 * Created by MHU on 31.03.2020.
 */
sap.ui.define([
    "csg/dev/controller/BaseController"
], function (BaseController) {  // eslint-disable-line id-match
    "use strict";

    // noinspection UnnecessaryLocalVariableJS
    /**
     * NotFound.controller.js
     *
     * This view will be called, when a navigation failes
     *
     * @param {String} [sId] id for the new control, generated automatically if no id is given
     * @param {Object} [mSettings] initial settings for the new control
     *
     * @class NotFound.controller.js
     *
     * @extends csg.dev.controller.BaseController
     *
     * @constructor
     * @public
     * @alias csg.dev.NotFound
     */
    var oNotFound = BaseController.extend("csg.dev.controller.NotFound", {

        /* =========================================================== */
        /* Standard functions 										   */
        /* =========================================================== */

        /* =========================================================== */
        /* Utility functions of controller  						   */
        /* =========================================================== */

        /* =========================================================== */
        /* Event handlers (starts with "on")						   */
        /* =========================================================== */

        /**
         * Navigates back or to main view
         * @memberOf csg.dev.NotFound
         */
        onHomePressed: function () {
            var oDefaultData = {
                route: "main"
            };
            this.navigateBack(oDefaultData);
        }

        /* =========================================================== */
        /* Private functions (starts with "_")						   */
        /* =========================================================== */

    });

    return oNotFound;

});
