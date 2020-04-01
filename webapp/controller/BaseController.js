/**
 * Created by MHU on 31.03.2020.
 */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "../utils/Formatter"

], function (Controller, History, Formatter) { // eslint-disable-line id-match
    "use strict";

    var oGlobalStatics = {
        _oDiscord: ""
    };

    // noinspection UnnecessaryLocalVariableJS
    /**
     * BaseController.js
     *
     * This is the BaseController of the application, which contains some standard methods
     *
     * @param {String} [sId] id for the new control, generated automatically if no id is given
     * @param {Object} [mSettings] initial settings for the new control
     *
     * @class BaseController.js
     *
     * @extends sap.ui.core.mvc.Controller
     *
     * @constructor
     * @public
     * @alias csg.dev.BaseController
     */
    var oBaseController = Controller.extend("csg.dev.controller.BaseController", {

        // import formatter as global attribute
        formatter: Formatter,

        /* =========================================================== */
        /* Standard functions 										   */
        /* =========================================================== */

        /**
         * Constructor function to declare some static variables
         * @memberOf csg.dev.BaseController
         */
        constructor: function () {
            var sRootPath = "csg.dev";
            this._sViewPath = sRootPath + ".view.";
            this._sFragmentPath = sRootPath + ".view.fragments.";
        },

        /* =========================================================== */
        /* Getter functions of controller  						       */
        /* =========================================================== */

        /**
         * Convenience method for accessing the router.
         * @returns {sap.ui.core.routing.Router} the router for this component
         * @memberOf csg.dev.BaseController
         */
        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },

        /**
         * Convenience method for getting the view model by name.
         * @public
         * @param {String} [sName] the model name
         * @returns {sap.ui.model.Model} the model instance
         * @memberOf csg.dev.BaseController
         */
        getModel: function (sName) {
            return this.getView().getModel(sName);
        },

        /**
         * Getter for view path
         * @returns {String} Path of view files
         * @memberOf csg.dev.BaseController
         */
        getViewPath: function () {
            return this._sViewPath;
        },

        /**
         * Getter for fragments path
         * @returns {String} Path of fragment files
         * @memberOf csg.dev.BaseController
         */
        getFragmentPath: function () {
            return this._sFragmentPath;
        },

        /**
         * Getter for formatter functions collection
         * @returns {functions} Function collection
         * @memberOf csg.dev.BaseController
         */
        getFormatters: function () {
            return this.formatter;
        },

        /**
         * Convenience method for getting the resource bundle.
         * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
         * @memberOf csg.dev.BaseController
         */
        getResourceBundle: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        /**
         * Returns the translated text for the provided i18n key
         * @param {String} [sTextKey] The i18n key for the requested text
         * @param {Array} [aArray] An array which can contain operands for the placeholders
         * @return {String} The translated text for the provided i18n key
         * @memberOf csg.dev.BaseController
         */
        getResourceText: function (sTextKey, aArray) {
            if (this.getView().getModel("i18n")) { // check if the model is available
                return this.getView().getModel("i18n").getResourceBundle().getText(sTextKey, aArray);
            } else {
                return "";
            }
        },

        getDiscord: function () {
            return oGlobalStatics._oDiscord;
        },

        /* =========================================================== */
        /* Setter functions of controller  						       */
        /* =========================================================== */

        /**
         * Convenience method for setting the view model.
         * @param {sap.ui.model.Model} [oModel] the model instance
         * @param {String} [sName] the model name
         * @returns {sap.ui.mvc.View} the view instance
         * @memberOf csg.dev.BaseController
         */
        setModel: function (oModel, sName) {
            return this.getView().setModel(oModel, sName);
        },

        setDiscord: function (oDiscord) {
            oGlobalStatics._oDiscord = oDiscord;
        },

        setBusy: function (bBusy) {
            this.getView().getModel("appView").setProperty("/bBusy", bBusy);
        },

        /* =========================================================== */
        /* Utility functions of controller  						   */
        /* =========================================================== */

        /**
         * Convenience method to add or remove data to an array without duplicates
         * Sometimes it is necessary to use an array instead of a map
         * @param {Array} [aArray] - The array to change
         * @param {Object|string} [oData] - The data to be add or remove
         * @param {boolean} [bAdd] - Flag if data should be added to array
         * @memberOf csg.dev.BaseController
         */
        changeArray: function (aArray, oData, bAdd) {
            if (bAdd === true) {
                var bEntryExists = false;

                // search for this entry
                jQuery.each(aArray, function (iIndex, sArrayData) { // eslint-disable-line consistent-return
                    if (oData === sArrayData || JSON.stringify(oData) === JSON.stringify(sArrayData)) {
                        bEntryExists = true;

                        // break
                        return false;
                    }
                });

                // do not add duplicates
                if (bEntryExists === false) {
                    aArray.push(oData);
                }
            } else {
                // search for this entry and remove it
                for (var i = 0; i < aArray.length; i++) {
                    if (oData === aArray[i] || JSON.stringify(oData) === JSON.stringify(aArray[i])) {
                        var sSorter = aArray[0];

                        aArray[0] = aArray[i];
                        aArray[i] = sSorter;
                        aArray.shift();
                    }
                }
            }
        }

    });

    return oBaseController;

});
