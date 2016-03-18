/**
 * Created by rahul on 3/17/16.
 */

module.exports = function(app) {
    console.log("In Server app.js");
    var userModel = require("./models/user.model.js")();
    require("./services/user.service.server.js")( app, userModel);

    var formModel = require("./models/form.model.js")();
    require("./services/forms.service.server.js")( app, formModel);
    console.log("At the end of app.js");
};