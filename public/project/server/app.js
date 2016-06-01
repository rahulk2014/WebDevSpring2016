/**
 * Created by rahul on 4/2/16.
 */

"use strict";
module.exports = function(app, mongoose, db) {


    var friendFollowerSchema = require("./models/friendfollower.schema.server.js")(mongoose);
    var friendFollowModel =  mongoose.model('follow',friendFollowerSchema);

    var userModel = require("./models/user.model.js")(mongoose, db,friendFollowModel);
    require("./services/user.services.server.js")(app,userModel);

    require("./services/spotify.service.server.js")(app, mongoose, db);

};