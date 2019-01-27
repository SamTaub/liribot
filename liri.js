if (process.argv[2] === "movie-this") {
    callMovie();
};

if (process.argv[2] === "concert-this") {
    callConcert();
};

if (process.argv[2] === "spotify-this-song") {
    callSpotify();
};

if (process.argv[2] === "do-what-it-says") {
    doSay();
};

function callMovie() {

    var axios = require("axios");
    var movieNodeArgs = process.argv;
    var movieTitle = "Mr. Nobody";

    for (var i = 3; i < movieNodeArgs.length; i++) {
        movieTitle = "";
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
            console.log("\nMovie Title: " + response.data.Title);
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
    var songTitle = "The Sign US Album Remastered";

    for (var i = 3; i < spotifyNodeArgs.length; i++) {
        songTitle = "";
        if (i > 3 && i < spotifyNodeArgs.length) {
            songTitle = songTitle + "+" + spotifyNodeArgs[i];
        }
        else {
            songTitle += spotifyNodeArgs[i];
        }
    };

    spotify.search({ type: 'track', limit: 3, query: songTitle }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("\nArtist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Preview: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
    });
};

function doSay() {

    var fs = require('fs');

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            console.log(error);
        }

        var randomArray = data.split(",");

        var songTitle = randomArray[1];



    });
};