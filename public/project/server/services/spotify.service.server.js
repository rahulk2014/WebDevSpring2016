/**
 * Created by rahul on 4/24/16.
 */
var request = require(request);
var url = "";
var apiKey = "";
var spotifyAPi = require('spotify-web-api-node');


module.exports = function(app) {
    app.get("/api/project/search/:query", findSongsByArtist);

    function findSongsByArtist(req, res) {
        console.log("Inside findSongsByArtist in server services.");
        var query = req.params.query;
        spotifyAPi.getArtist('artist:'+query)
            .then(function(data) {
                console.log(data.body);
            },function(error) {
                console.log("Unable to fetch data from spotify");
            });
    }
}
