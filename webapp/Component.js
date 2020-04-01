/**
 * Created by MHU on 31.03.2020.
 */
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function (UIComponent, JSONModel, Device) {  // eslint-disable-line id-match
    "use strict";

    // noinspection UnnecessaryLocalVariableJS
    /**
     * Component.js
     *
     * The component class provides specific metadata for components by extending the ManagedObject class.
     * The UIComponent class provides additional metadata for the configuration of user interfaces
     * or the navigation between views.
     *
     * @param {String} [sId] id for the new control, generated automatically if no id is given
     * @param {Object} [mSettings] initial settings for the new control
     *
     * @class Component.js
     *
     * @extends sap.ui.core.UIComponent
     *
     * @constructor
     * @public
     * @alias csg.dev.Component
     */
    var oComponent = UIComponent.extend("csg.dev.BigBuddy.Component", {

        metadata: {
            manifest: "json"
        },

        /**
         * Initiates the application at first load
         * @memberOf csg.dev.Component
         */
        init: function () {
            // set device model
            var oDeviceModel = new JSONModel(Device);
            oDeviceModel.setDefaultBindingMode("OneWay");
            this.setModel(oDeviceModel, "device");

            // call the base component's init function and create the App view
            UIComponent.prototype.init.apply(this, arguments);

            // create the views based on the url/hash
            this.getRouter().initialize();

            // Deferred/ChangeGroups
            var oModel = this.getModel();
            var oChangeGroups = oModel.getChangeGroups();
            // oChangeGroups.Sample = {groupId: "sampleGroupId"};
            oModel.setChangeGroups(oChangeGroups);

            var aDeferredGroups = oModel.getDeferredGroups();
            // aDeferredGroups.push("sampleGroupId");
            oModel.setDeferredGroups(aDeferredGroups);
        },

        /**
         * Is called when the application is closed
         * @memberOf csg.dev.Component
         */
        onExit: function () {
            UIComponent.prototype.onExit.apply(this, arguments);
        },

        /**
         * Destroys the application after exiting
         * @memberOf csg.dev.Component
         */
        destroy: function () {
            // call the base component's destroy function
            UIComponent.prototype.destroy.apply(this, arguments);
        },

        /**
         * This method returns the content density class
         * @returns {String} The content density class
         * @memberOf csg.dev.Component
         */
        getContentDensityClass: function () {
            if (!this._sContentDensityClass) {
                if (!sap.ui.Device.support.touch) {
                    this._sContentDensityClass = "sapUiSizeCompact";
                } else {
                    this._sContentDensityClass = "sapUiSizeCozy";
                }
            }
            return this._sContentDensityClass;
        }
    });

    return oComponent;

});
