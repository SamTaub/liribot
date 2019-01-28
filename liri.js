//Logic that checks users input command and runs the corresponding function
if (process.argv[2] === "movie-this") {
    callMovie();
} else if (process.argv[2] === "concert-this") {
    callConcert();
} else if (process.argv[2] === "spotify-this-song") {
    callSpotify();
} else if (process.argv[2] === "do-what-it-says"){
    doSay();
};
//Function that calls OMDB API when user inputs "movie-this"
function callMovie() {
    //Loads Axios & sets default search to Mr. Nobody if the user does not enter a movie name
    var axios = require("axios");
    var movieNodeArgs = process.argv;
    var movieTitle = "Mr. Nobody";
    //For Loop that combines multiple words in a search term and assigns it to the "movieTitle" variable
    for (var i = 3; i < movieNodeArgs.length; i++) {
        movieTitle = "";
        if (i > 3 && i < movieNodeArgs.length) {
            movieTitle = movieTitle + "+" + movieNodeArgs[i];
        }
        else {
            movieTitle += movieNodeArgs[i];
        }
    };
    //API call that searchs OMDB for the "movieTitle" variable created above
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
    //Displays the response in the terminal.  Inlcudes Title, Ratings, Year of Production, Language, Plot, and Cast list.
    axios.get(queryUrl).then(
        function (response) {
            console.log("\nMovie Title: " + response.data.Title, "\nRelease Year: " + response.data.Year, "\nIMDB Rating: " + response.data.imdbRating, "\nRotten Tomatoes Rating: " + JSON.stringify(response.data.Ratings[1].Value), "\nProduced in: " + response.data.Country, "\nLanguage: " + response.data.Language, "\nPlot: " + response.data.Plot, "\nCast: " + response.data.Actors);
        }
    );
};
//Function that calls Bands in Town API to display concert data based on the users input following "concert-this".
function callConcert() {
    //Loads AXIOS and Moment Packages.
    var axios = require("axios");
    var moment = require("moment");
    var concertNodeArgs = process.argv;
    var concertTitle = "";
    //For Loop that checks process.argv for all of the users search terms and combines into "concertTitle" variable.
    for (var i = 3; i < concertNodeArgs.length; i++) {
        if (i > 3 && i < concertNodeArgs.length) {
            concertTitle = concertTitle + "+" + concertNodeArgs[i];
        }
        else {
            concertTitle += concertNodeArgs[i];
        }
    };
    //Variable that holds the Bands in Town API Call that includes the users search term.
    var queryUrl = "https://rest.bandsintown.com/artists/" + concertTitle + "/events?app_id=codingbootcamp";
    //The response data is looped through and logged to the terminal.  The Artist, Venue, Location, and Time are displayed for all concerts.
    axios.get(queryUrl).then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log("\n--------------------", "\nArtist: " + response.data[i].lineup, "\nVenue: " + response.data[i].venue.name, "\nLocation: " + response.data[i].venue.city + ", " + response.data[i].venue.country, "\nDate & Time: " + moment(response.data[i].datetime).format("dddd MMMM Do YYYY h:mma"));
            };
        }
    );
};
//Function that is called when the user inputs "spotify-this" followed by a search term.
function callSpotify() {
    //Requires the .env file where the API Key and Secret are hidden.
    require("dotenv").config();
    //Requires Loads Spotify API module and Spotify API Key.
    var keys = require("./keys.js");
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    var spotifyNodeArgs = process.argv;
    var songTitle = "";
    //If the user does not enter a search term it will search for "The Sign" by Ace of Bass as default.
    if (spotifyNodeArgs.length === 3){
        songTitle = "The Sign US Remastered";
    };
    //For Loop that checks the entire process.argv for the users term and combines the terms into "songTitle" variable.
    for (var i = 3; i < spotifyNodeArgs.length; i++) {
        if (i > 3 && i < spotifyNodeArgs.length) {
            songTitle = songTitle + "+" + spotifyNodeArgs[i];
        }
        else {
            songTitle += spotifyNodeArgs[i];
        }
    };
    //Spotify API call.  Uses the "songTitle" variable to search for a song.  The Artist, song, album, and a preview are logged to the terminal.
    spotify.search({ type: 'track', query: songTitle }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("\nArtist: " + data.tracks.items[0].album.artists[0].name, "\nSong: " + data.tracks.items[0].name, "\nPreview: " + data.tracks.items[0].preview_url, "\nAlbum: " + data.tracks.items[0].album.name);
    });
};
//Function that runs when the user enters "do-what-it-says".
function doSay() {
    //Variables to require file reading and the requirements to use the hidden Spotify API Key & Secret.
    var fs = require('fs');
    require("dotenv").config();
    var keys = require("./keys.js");
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    //When the function is run, it reads "random.txt" to determine search parameters for the spotify API.
    fs.readFile("random.txt", "utf8", function (error, data) {
        //Logs an error to the terminal if the function fails to run.
        if (error) {
            console.log(error);
        }
        //Creates an array containing the data found in "random.txt".  Another variable is created to hold the song name.
        var randomArray = data.split(",");
        var songTitle = randomArray[1];
        //Spotify API is called once again using the query term we read from "random.text".  The result is printed in the terminal.
        spotify.search({ type: 'track', query: songTitle }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("\nArtist: " + data.tracks.items[0].album.artists[0].name, "\nSong: " + data.tracks.items[0].name, "\nPreview: " + data.tracks.items[0].preview_url, "\nAlbum: " + data.tracks.items[0].album.name);
        });

    });
};