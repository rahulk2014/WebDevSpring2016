/**
 * Created by rahul on 3/17/16.
 */

module.exports = function(app) {
    var userModel = require("./models/user.model.js")();
    require("./services/user.service.server.js")( app, userModel);

    var formModel = require("./models/form.model.js")();
    require("./services/forms.service.server.js")( app, formModel);

    require("./services/field.service.server.js")(app, formModel);
};