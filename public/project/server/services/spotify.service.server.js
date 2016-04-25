/**
 * Created by rahul on 4/24/16.
 */
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();

module.exports = function(app) {
    app.get("/api/project/search/:query", findTracks);


    function findTracks(req, res) {
        console.log("Inside findSongsByArtist in server services.");

        var query = req.params.query;
        spotifyApi.searchTracks(query, {limit: 30, offset: 20})
            .then(function (data) {
                //console.log(data.body);
                res.json(returnResults((data.body)));
            }, function (error) {
                console.log("Unable to fetch data from spotify");
            });
        }

        function returnResults(resultsFromSpotify) {
            console.log("In Return Results");
            var results = [];
           //console.log(resultsFromSpotify['tracks']);
            var allTracks = resultsFromSpotify['tracks'];
            var itemsInAllTracks = allTracks['items'];
            console.log(itemsInAllTracks.length);
            for(var i = 0; i < itemsInAllTracks.length; ++i) {
                var data = itemsInAllTracks[i];
                //console.log(data);
                var artist = data['artists'][0]['name'];
                //console.log(artist);
                var name = data['name'];
                //console.log(name);
                var uri = data['uri'];
                //console.log(uri);
                var id = data['id'];
                var previewURL = data["preview_url"];
                results.push({
                    id : id,
                    songname : name,
                    uri : uri,
                    artistname : artist,
                    previewURL : previewURL
                });
            }
            //console.log(results);
            return results;
        }


}





