module.exports = function(mongoose){

    var PlaylistScehma = require("./playlist.schema.server.js")(mongoose);
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        playlists:[PlaylistScehma],
        friends : [String]
    }, {collection: 'songUser'});
    return UserSchema;
};
