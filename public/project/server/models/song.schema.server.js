module.exports = function(mongoose){


    var SongSchema = mongoose.Schema({
        songid : String,
        songname: String,
        artistname : String,
        previewUrl : String
    }, {collection: 'song'});
    return SongSchema;
};
