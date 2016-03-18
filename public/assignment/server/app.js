/**
 * Created by rahul on 3/17/16.
 */

module.exports = function(app) {
    var userModel = require("./models/user.model.js", app);
    var formModel = require("./models/form.model.js", app);

    var userService = require("./services/user.service.server.js", userModel, formModel, app);
    var formService = require("./services/forms.service.server.js", userModel, formModel, app);
};