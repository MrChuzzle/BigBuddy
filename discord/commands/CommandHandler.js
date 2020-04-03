var Join = require("./Join").oJoin;


var oCommandHandler = function CommandHandler(oBigBuddy) {
    this._oBigBuddy = oBigBuddy;
    this._aCommands = [
        new Join(oBigBuddy)
    ]
};

oCommandHandler.prototype.execute = function (sCommand, aArguments) {
    // chain of responsibility
    for (var oCommand of this._aCommands) {
        if (oCommand.execute) {
            if (oCommand.execute(sCommand, aArguments)) {
                break;
            }
        }
    }
};

/* =========================================================== */
/* export               		                               */
/* =========================================================== */
module.exports = {
    oCommandHandler
};