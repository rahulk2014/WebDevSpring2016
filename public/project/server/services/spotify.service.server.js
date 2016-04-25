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
        spotifyApi.searchTracks(query, {limit: 1, offset: 20})
            .then(function (data) {
                //console.log(data.body);
                res.json(returnResults((data.body)));
            }, function (error) {
                console.log("Unable to fetch data from spotify");
            });
        }

        function returnResults(resultsFromSpotify) {
            console.log("In Return Results");
           //console.log(resultsFromSpotify['tracks']);
            var allTracks = resultsFromSpotify['tracks'];
            var itemsInAllTracks = allTracks['items'];
            console.log(itemsInAllTracks.length);
            for(var i = 0; i < itemsInAllTracks.length; ++i) {
                var data = itemsInAllTracks[i];
                console.log(data);
                var artist = data['artists'][0]['name'];
                console.log(artist);
                var name = data['name'];
                console.log(name);
                var uri = data['uri'];
                console.log(uri);
            }
            return;
        }

        function hello () {

            var ans =
            {
                "album_type" : "album",
                "artists" : [ {
                    "external_urls" : {
                        "spotify" : "https://open.spotify.com/artist/0LyfQWJT6nXafLPZqxe9Of"
                    },
                    "href" : "https://api.spotify.com/v1/artists/0LyfQWJT6nXafLPZqxe9Of",
                    "id" : "0LyfQWJT6nXafLPZqxe9Of",
                    "name" : "Various Artists",
                    "type" : "artist",
                    "uri" : "spotify:artist:0LyfQWJT6nXafLPZqxe9Of"
                } ],
                "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
                "copyrights" : [ {
                    "text" : "2016 Zee Music Company",
                    "type" : "C"
                }, {
                    "text" : "2016 Zee Music Company",
                    "type" : "P"
                } ],
                "external_ids" : {
                    "upc" : "811868926360"
                },
                "external_urls" : {
                    "spotify" : "https://open.spotify.com/album/5nUpOwB6Kwb1SpqEVyY8Ut"
                },
                "genres" : [ ],
                "href" : "https://api.spotify.com/v1/albums/5nUpOwB6Kwb1SpqEVyY8Ut",
                "id" : "5nUpOwB6Kwb1SpqEVyY8Ut",
                "images" : [ {
                    "height" : 600,
                    "url" : "https://i.scdn.co/image/4c82bd9a5c1b27b66ebd746fd3739b9ef5623de5",
                    "width" : 600
                }, {
                    "height" : 300,
                    "url" : "https://i.scdn.co/image/ff19bda7b97c5e315fa18f8cff5ff04ae9441bd2",
                    "width" : 300
                }, {
                    "height" : 64,
                    "url" : "https://i.scdn.co/image/c61920dff1f4bbae1923c38b17d4c1825eb2c4b1",
                    "width" : 64
                } ],
                "name" : "Fitoor (Original Motion Picture Soundtrack)",
                "popularity" : 46,
                "release_date" : "2016-01-18",
                "release_date_precision" : "day",
                "tracks" : {
                    "href" : "https://api.spotify.com/v1/albums/5nUpOwB6Kwb1SpqEVyY8Ut/tracks?offset=0&limit=50",
                    "items" : [ {
                        "artists" : [ {
                            "external_urls" : {
                                "spotify" : "https://open.spotify.com/artist/7HCqGPJcQTyGJ2yqntbuyr"
                            },
                            "href" : "https://api.spotify.com/v1/artists/7HCqGPJcQTyGJ2yqntbuyr",
                            "id" : "7HCqGPJcQTyGJ2yqntbuyr",
                            "name" : "Amit Trivedi",
                            "type" : "artist",
                            "uri" : "spotify:artist:7HCqGPJcQTyGJ2yqntbuyr"
                        } ],
                        "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
                        "disc_number" : 1,
                        "duration_ms" : 283219,
                        "explicit" : false,
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/track/3JKH8kPZmLVuZp4LzEhYow"
                        },
                        "href" : "https://api.spotify.com/v1/tracks/3JKH8kPZmLVuZp4LzEhYow",
                        "id" : "3JKH8kPZmLVuZp4LzEhYow",
                        "name" : "Pashmina",
                        "preview_url" : "https://p.scdn.co/mp3-preview/0ddf5f4101511adc0691a1fc56b721b29eab1cef",
                        "track_number" : 1,
                        "type" : "track",
                        "uri" : "spotify:track:3JKH8kPZmLVuZp4LzEhYow"
                    }, {
                        "artists" : [ {
                            "external_urls" : {
                                "spotify" : "https://open.spotify.com/artist/4YRxDV8wJFPHPTeXepOstw"
                            },
                            "href" : "https://api.spotify.com/v1/artists/4YRxDV8wJFPHPTeXepOstw",
                            "id" : "4YRxDV8wJFPHPTeXepOstw",
                            "name" : "ARIJIT SINGH",
                            "type" : "artist",
                            "uri" : "spotify:artist:4YRxDV8wJFPHPTeXepOstw"
                        } ],
                        "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
                        "disc_number" : 1,
                        "duration_ms" : 283115,
                        "explicit" : false,
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/track/01OWLju63QtwxardhpliQs"
                        },
                        "href" : "https://api.spotify.com/v1/tracks/01OWLju63QtwxardhpliQs",
                        "id" : "01OWLju63QtwxardhpliQs",
                        "name" : "Yeh Fitoor Mera",
                        "preview_url" : "https://p.scdn.co/mp3-preview/c9f9fdfdb9e78c58b413f13b43d6bc84974245b7",
                        "track_number" : 2,
                        "type" : "track",
                        "uri" : "spotify:track:01OWLju63QtwxardhpliQs"
                    }, {
                        "artists" : [ {
                            "external_urls" : {
                                "spotify" : "https://open.spotify.com/artist/0QuAJhN4N4LgXtdU3yUS24"
                            },
                            "href" : "https://api.spotify.com/v1/artists/0QuAJhN4N4LgXtdU3yUS24",
                            "id" : "0QuAJhN4N4LgXtdU3yUS24",
                            "name" : "Zeb Bangash",
                            "type" : "artist",
                            "uri" : "spotify:artist:0QuAJhN4N4LgXtdU3yUS24"
                        } ],
                        "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
                        "disc_number" : 1,
                        "duration_ms" : 259709,
                        "explicit" : false,
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/track/0TQQa4tvXuehSoKhY5WSro"
                        },
                        "href" : "https://api.spotify.com/v1/tracks/0TQQa4tvXuehSoKhY5WSro",
                        "id" : "0TQQa4tvXuehSoKhY5WSro",
                        "name" : "Haminastu",
                        "preview_url" : "https://p.scdn.co/mp3-preview/2841fdff67e4eb25873cb31b5052a8dd467c42ff",
                        "track_number" : 3,
                        "type" : "track",
                        "uri" : "spotify:track:0TQQa4tvXuehSoKhY5WSro"
                    }, {
                        "artists" : [ {
                            "external_urls" : {
                                "spotify" : "https://open.spotify.com/artist/3oinJWo0iD7MVnojA8R8WP"
                            },
                            "href" : "https://api.spotify.com/v1/artists/3oinJWo0iD7MVnojA8R8WP",
                            "id" : "3oinJWo0iD7MVnojA8R8WP",
                            "name" : "Nandini Srikar",
                            "type" : "artist",
                            "uri" : "spotify:artist:3oinJWo0iD7MVnojA8R8WP"
                        }, {
                            "external_urls" : {
                                "spotify" : "https://open.spotify.com/artist/0QuAJhN4N4LgXtdU3yUS24"
                            },
                            "href" : "https://api.spotify.com/v1/artists/0QuAJhN4N4LgXtdU3yUS24",
                            "id" : "0QuAJhN4N4LgXtdU3yUS24",
                            "name" : "Zeb Bangash",
                            "type" : "artist",
                            "uri" : "spotify:artist:0QuAJhN4N4LgXtdU3yUS24"
                        } ],
                        "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
                        "disc_number" : 1,
                        "duration_ms" : 270027,
                        "explicit" : false,
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/track/06Ke7jLS8usE0yryw6LGUR"
                        },
                        "href" : "https://api.spotify.com/v1/tracks/06Ke7jLS8usE0yryw6LGUR",
                        "id" : "06Ke7jLS8usE0yryw6LGUR",
                        "name" : "Honedo Batiya",
                        "preview_url" : "https://p.scdn.co/mp3-preview/0049bbb4c3e22d0e5cfe8afc26e044fed9231cbc",
                        "track_number" : 4,
                        "type" : "track",
                        "uri" : "spotify:track:06Ke7jLS8usE0yryw6LGUR"
                    }, {
                        "artists" : [ {
                            "external_urls" : {
                                "spotify" : "https://open.spotify.com/artist/0Tgdv4JlRUoXWfGTrWgY1m"
                            },
                            "href" : "https://api.spotify.com/v1/artists/0Tgdv4JlRUoXWfGTrWgY1m",
                            "id" : "0Tgdv4JlRUoXWfGTrWgY1m",
                            "name" : "Jubin Nautiyal",
                            "type" : "artist",
                            "uri" : "spotify:artist:0Tgdv4JlRUoXWfGTrWgY1m"
                        }, {
                            "external_urls" : {
                                "spotify" : "https://open.spotify.com/artist/3eDT9fwXKuHWFvgZaaYC5v"
                            },
                            "href" : "https://api.spotify.com/v1/artists/3eDT9fwXKuHWFvgZaaYC5v",
                            "id" : "3eDT9fwXKuHWFvgZaaYC5v",
                            "name" : "Sunidhi Chauhan",
                            "type" : "artist",
                            "uri" : "spotify:artist:3eDT9fwXKuHWFvgZaaYC5v"
                        } ],
                        "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
                        "disc_number" : 1,
                        "duration_ms" : 270942,
                        "explicit" : false,
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/track/6E7tAO2CFJnVyYZMsv0oog"
                        },
                        "href" : "https://api.spotify.com/v1/tracks/6E7tAO2CFJnVyYZMsv0oog",
                        "id" : "6E7tAO2CFJnVyYZMsv0oog",
                        "name" : "Tere Liye",
                        "preview_url" : "https://p.scdn.co/mp3-preview/1291739592e3c76c842d81f600cdca6bf769f148",
                        "track_number" : 5,
                        "type" : "track",
                        "uri" : "spotify:track:6E7tAO2CFJnVyYZMsv0oog"
                    }, {
                        "artists" : [ {
                            "external_urls" : {
                                "spotify" : "https://open.spotify.com/artist/3eDT9fwXKuHWFvgZaaYC5v"
                            },
                            "href" : "https://api.spotify.com/v1/artists/3eDT9fwXKuHWFvgZaaYC5v",
                            "id" : "3eDT9fwXKuHWFvgZaaYC5v",
                            "name" : "Sunidhi Chauhan",
                            "type" : "artist",
                            "uri" : "spotify:artist:3eDT9fwXKuHWFvgZaaYC5v"
                        }, {
                            "external_urls" : {
                                "spotify" : "https://open.spotify.com/artist/7HCqGPJcQTyGJ2yqntbuyr"
                            },
                            "href" : "https://api.spotify.com/v1/artists/7HCqGPJcQTyGJ2yqntbuyr",
                            "id" : "7HCqGPJcQTyGJ2yqntbuyr",
                            "name" : "Amit Trivedi",
                            "type" : "artist",
                            "uri" : "spotify:artist:7HCqGPJcQTyGJ2yqntbuyr"
                        } ],
                        "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
                        "disc_number" : 1,
                        "duration_ms" : 289018,
                        "explicit" : false,
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/track/0JSmMFKBpQlNwnwWaP7F94"
                        },
                        "href" : "https://api.spotify.com/v1/tracks/0JSmMFKBpQlNwnwWaP7F94",
                        "id" : "0JSmMFKBpQlNwnwWaP7F94",
                        "name" : "Rangaa Re (Hindi Version)",
                        "preview_url" : "https://p.scdn.co/mp3-preview/7d0bdcd545a7745c9cc13366d8ea87ff6db49c32",
                        "track_number" : 6,
                        "type" : "track",
                        "uri" : "spotify:track:0JSmMFKBpQlNwnwWaP7F94"
                    }, {
                        "artists" : [ {
                            "external_urls" : {
                                "spotify" : "https://open.spotify.com/artist/7HCqGPJcQTyGJ2yqntbuyr"
                            },
                            "href" : "https://api.spotify.com/v1/artists/7HCqGPJcQTyGJ2yqntbuyr",
                            "id" : "7HCqGPJcQTyGJ2yqntbuyr",
                            "name" : "Amit Trivedi",
                            "type" : "artist",
                            "uri" : "spotify:artist:7HCqGPJcQTyGJ2yqntbuyr"
                        }, {
                            "external_urls" : {
                                "spotify" : "https://open.spotify.com/artist/2Yf4MRVpt0rcAd5y5h5ph1"
                            },
                            "href" : "https://api.spotify.com/v1/artists/2Yf4MRVpt0rcAd5y5h5ph1",
                            "id" : "2Yf4MRVpt0rcAd5y5h5ph1",
                            "name" : "Caralisa Monteiro",
                            "type" : "artist",
                            "uri" : "spotify:artist:2Yf4MRVpt0rcAd5y5h5ph1"
                        } ],
                        "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
                        "disc_number" : 1,
                        "duration_ms" : 289044,
                        "explicit" : false,
                        "external_urls" : {
                            "spotify" : "https://open.spotify.com/track/6irCd1osinUqpdJnqDOftO"
                        },
                        "href" : "https://api.spotify.com/v1/tracks/6irCd1osinUqpdJnqDOftO",
                        "id" : "6irCd1osinUqpdJnqDOftO",
                        "name" : "Rangaa Re (English Version",
                        "preview_url" : "https://p.scdn.co/mp3-preview/282b8cea7d0781c53cd076ffd947b19642bd89bb",
                        "track_number" : 7,
                        "type" : "track",
                        "uri" : "spotify:track:6irCd1osinUqpdJnqDOftO"
                    } ],
                    "limit" : 50,
                    "next" : null,
                    "offset" : 0,
                    "previous" : null,
                    "total" : 7
                },
                "type" : "album",
                "uri" : "spotify:album:5nUpOwB6Kwb1SpqEVyY8Ut"
            };


        }


}


