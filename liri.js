if (process.argv[2] === "movie-this") {
    callMovie();
};

if (process.argv[2] === "concert-this") {
    callConcert();
};

if (process.argv[2] === "spotify-this-song") {
    callSpotify();
};

function callMovie() {

    var axios = require("axios");
    var movieNodeArgs = process.argv;
    var movieTitle = "";

    for (var i = 3; i < movieNodeArgs.length; i++) {
        if (i > 3 && i < movieNodeArgs.length) {
            movieTitle = movieTitle + "+" + movieNodeArgs[i];
        }
        else {
            movieTitle += movieNodeArgs[i];
        }
    };

    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            console.log("Movie Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.stringify(response.data.Ratings[1].Value));
            console.log("Produced in: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Cast: " + response.data.Actors)
        }
    );
};

function callConcert() {

    var axios = require("axios");
    var moment = require("moment");
    var concertNodeArgs = process.argv;
    var concertTitle = "";

    for (var i = 3; i < concertNodeArgs.length; i++) {
        if (i > 3 && i < concertNodeArgs.length) {
            concertTitle = concertTitle + "+" + concertNodeArgs[i];
        }
        else {
            concertTitle += concertNodeArgs[i];
        }
    };

    var queryUrl = "https://rest.bandsintown.com/artists/" + concertTitle + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log("\n");
                console.log("---------------------------------------")
                console.log("\n");
                console.log("Artist: " + response.data[i].lineup);
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Date & Time: " + moment(response.data[i].datetime).format("dddd MMMM Do YYYY h:mma"));
            };
        }
    );
};

function callSpotify() {

    require("dotenv").config();

    var keys = require("./keys.js");
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    var spotifyNodeArgs = process.argv;
    var songTitle = "";

    for (var i = 3; i < spotifyNodeArgs.length; i++) {
        if (i > 3 && i < spotifyNodeArgs.length) {
            songTitle = songTitle + "+" + spotifyNodeArgs[i];
        }
        else {
            songTitle += spotifyNodeArgs[i];
        }
    };

    spotify.search({ type: 'track', limit: 5, query: songTitle }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var resultCounter = 0;

        console.log("Top results for: " + songTitle)

        for (var i = 0; i < data.tracks.items.length; i++) {

            resultCounter++;

            console.log("\n");
            console.log("#" + resultCounter)
            console.log("Artist: " + data.tracks.items[i].album.artists[0].name);
            console.log("Song: " + data.tracks.items[i].name);
            console.log("Preview: " + data.tracks.items[i].preview_url);
            console.log("Album: " + data.tracks.items[i].album.name);
        }
    });
};