/**
 * Created by MHU on 31.03.2020.
 */
sap.ui.define([
    "../controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "../discord/Discord"

], function (BaseController, JSONModel, Discord) {  // eslint-disable-line id-match
    "use strict";

    // noinspection UnnecessaryLocalVariableJS
    /**
     * App.controller.js
     *
     * Main frame for application
     *
     * @param {String} [sId] id for the new control, generated automatically if no id is given
     * @param {Object} [mSettings] initial settings for the new control
     *
     * @class App.controller.js
     *
     * @extends csg.dev.controller.BaseController
     *
     * @constructor
     * @public
     * @alias csg.dev.App
     */
    var oApp = BaseController.extend("csg.dev.controller.App", {

        /* =========================================================== */
        /* Standard functions 										   */
        /* =========================================================== */

        /**
         * Called when a controller is instantiated and its View controls (if
         * available) are already created. Can be used to modify the View before
         * it is displayed, to bind event handlers and do other one-time
         * initialization.
         * @memberOf csg.dev.controller.App
         */
        onInit: function () {
            var oAppViewModel = new JSONModel({
                bBusy: false,
                iDelay: 0
            });

            this.getView().setModel(oAppViewModel, "appView");

            // Load and set view model which is used for editable property binding
            var oView = this.getView(),
                oUserModel = new JSONModel();

            // prepare user model structure
            var oUserData = {
                userId: 'LOCAL',
                fullName: 'Local Test',
                name: ''
            };

            // set user model
            oUserModel.setData(oUserData);
            oView.setModel(oUserModel, "userModel");

            var oUser;

            try {
                oUser = sap.ui2.shell.getUser();

                oUser.load({},
                    function () {
                        //Load the user information and save it to the userModel for later access
                        oUserData = {
                            userId: oUser.getId(),
                            fullName: oUser.getFullName(),
                            name: oUser.getLastName()
                        };

                        oUserModel.setData(oUserData);

                    }, function () {

                    }
                );
            } catch (oError) {
                // do nothing
            }

            // set busy state dynamic, view is busy when a request is pending
			var oModel = oView.getModel(),
				oPendingRequests = new JSONModel({
					aRequestIds: []
				});

			oView.setModel(oPendingRequests, "requests");

			oModel.metadataLoaded().then(function () {
				oModel.attachBatchRequestSent(function (oData) {
					var aRequests = oPendingRequests.getProperty("/aRequestIds");

					this.changeArray(aRequests, oData.getParameter("ID"), true);
					oView.setBusy(true);
				}.bind(this));
				oModel.attachBatchRequestCompleted(function (oData) {
					var aRequests = oPendingRequests.getProperty("/aRequestIds");

					this.changeArray(aRequests, oData.getParameter("ID"), false);
					if (aRequests.length === 0) {
						oView.setBusy(false);
					}
				}.bind(this));
				oModel.attachBatchRequestFailed(function (oData) {
					var aRequests = oPendingRequests.getProperty("/aRequestIds");

					this.changeArray(aRequests, oData.getParameter("ID"), false);
					if (aRequests.length === 0) {
						oView.setBusy(false);
					}
				}.bind(this));
			}.bind(this));

			var oConfig = oView.getModel("config");

			Discord.init(oConfig);
			this.setDiscord(Discord);
        }

        /* =========================================================== */
        /* Utility functions of controller  						   */
        /* =========================================================== */

        /* =========================================================== */
        /* Event handlers (starts with "on")						   */
        /* =========================================================== */

        /* =========================================================== */
        /* Private functions (starts with "_")						   */
        /* =========================================================== */

    });

    return oApp;

});
