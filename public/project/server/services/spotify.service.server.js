/**
 * Created by rahul on 4/24/16.
 */
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();

module.exports = function(app) {
    app.get("/api/project/search/:query", findTracks);
    app.get("/api/project/searchDetail/:songId", findSong);

    function findSong(req, res) {
        console.log("Inside findSongs by songId");
        var songId = req.params.songId;
        console.log("Song Id = " + songId);
        spotifyApi.getTrack(songId)
            .then(function(data) {
                res.json(returnSongDetailResult((data.body)));
            }, function(error) {
                console.log("Unable to fetch data from spotify.");
            });
    }

    function returnSongDetailResult(songDetailResult) {
        console.log("Inside return Song detail result");

        var imageURL = songDetailResult['album']['images'][0]['url'];
        var artists = songDetailResult['artists'][0];
        var duration_ms = songDetailResult['duration_ms'];
        duration_ms = Number(duration_ms)/1000;
        var trackName = songDetailResult['name'];
        var popularity = songDetailResult['popularity'];
        var previewURL = songDetailResult['preview_url'];
        var spotify_uri = songDetailResult['uri'];
        console.log(spotify_uri);
        var artistName = artists['name'];
        var artistURI = artists['uri'];

        songDetailResult = {
            imageURL : imageURL,
            artistName : artistName,
            artistURI : artistURI,
            spotify_uri : spotify_uri,
            previewURL : previewURL,
            popularity : popularity,
            trackName : trackName,
            duration_ms : duration_ms
        };
        console.log(spotify_uri);
        return songDetailResult;
    }

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
        var allTracks = resultsFromSpotify['tracks'];
        var itemsInAllTracks = allTracks['items'];

        for(var i = 0; i < itemsInAllTracks.length; ++i) {
            var data = itemsInAllTracks[i];
            var albumData = data['album'];
            var imagesList = albumData['images']
            var artist = data['artists'][0]['name'];
            var name = data['name'];
            var uri = data['uri'];
            var id = data['id'];
            var previewURL = data['preview_url'];
            results.push({
                    id : id,
                    songname : name,
                    uri : uri,
                    artistname : artist,
                    previewURL : previewURL,
                    image : imagesList[0]['url']
            });
        }
        return results;
    }
};





