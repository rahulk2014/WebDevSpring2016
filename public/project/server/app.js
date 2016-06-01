/**
 * Created by rahul on 4/2/16.
 */

"use strict";
module.exports = function(app, mongoose, db) {

    var userModel = require("./models/user.model.js")(mongoose, db);
    require("./services/user.services.server.js")(app,userModel);

    require("./services/spotify.service.server.js")(app, mongoose, db);

};