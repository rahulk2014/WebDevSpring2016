module.exports = function(mongoose){

    var SongSchema = require("./song.schema.server.js")(mongoose);
    var PlaylistSchema = mongoose.Schema({
        playlistName : String,
        songs : [SongSchema]
    }, {collection: 'playList'});
    return PlaylistSchema;
};