/**
 * Created by MHU on 31.03.2020.
 */
sap.ui.define([
    "sap/ui/base/Object",
    "./Join"

], function (Object, Join) { // eslint-disable-line id-match
    "use strict";

    var aCommands = arguments; // eslint-disable-line id-match

    /**
     * Commands.js
     *
     * @param {String} [sId] id for the new control, generated automatically if no id is given
     * @param {Object} [mSettings] initial settings for the new control
     *
     * @class Commands.js
     *
     * @extends csg.dev.util.Commands
     *
     * @constructor
     * @public
     * @alias csg.dev.Commands
     */
    return {
        execute: function (sCommand, aArguments) {
            // chain of responsibility
            jQuery.each(aCommands, function (iIndex, oCommand) {
                if (oCommand.execute) {
                    if (oCommand.execute(sCommand, aArguments)){
                        // break
                        return false;
                    }
                }
            });
        }
    };
});