/**
 * Created by rahul on 3/17/16.
 */

module.exports = function(app) {
    var userModel = require("./models/user.model.js", app);
    var formModel = require("./models/form.model.js", app);

    var userService = require("./services/user.service.server.js", app, userModel);
    var formService = require("./services/forms.service.server.js", app, formModel);
};