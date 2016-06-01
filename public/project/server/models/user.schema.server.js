module.exports = function(mongoose){

    var ReviewSchema = require("./review.schema.server.js")(mongoose);
    var Playlist = require("./playlist.schema.server.js")(mongoose);
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phones: String,
        review: [ReviewSchema],
        playlists:[Playlist],
        friends : [String],
        type : {type : String, default : "project"}
    }, {collection: 'songUser'});
    return UserSchema;
};
