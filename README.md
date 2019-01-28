#Liri Bot

###Description

The Liri Bot is a tool that can search for Movies, Concerts, and Songs.  It uses node.js to call API's and generate results based on a users search.  Liri searchs OMDB for Movies, Bands in Town for Concerts, and Spotify for songs.

###How to Use

Like any node application you will want to start by locating the liri folder in the terminal.  Enter node liri.js followed by your command and search term.

*node liri.js concert-this
    *Search Bands in Town API for concerts by the artist.
    *The Artist, Venue, Location, and Time for all upcoming concerts are printed to the terminal.
    *Example: node liri.js concert-this ozzy osbourne

*node liri.js spotify-this-song
    *Search Spotify API for this song.  Will print information for "The Sign" by Ace of Bass if no search term is entered.
    *The Artist, Song, Album, and a preview link are printed to the terminal.
    *Example: node liri.js spotify-this-song stairway to heaven

*node liri.js movie-this
    *Search OMDB API for a movie.  Will print information for "Mr. Nobody" if no search term is entered.
    *The Movie Title, Release Year, IMDB Rating, Rotten Tomatoes Rating, Country of Production, Language, Plot, and Cast are printed in the terminal.
    *Example: node liri.js movie-this the wedding singer

*node liri.js do-what-it-says
    *Uses spotify-this-song to print information about the song "I want it that way" by the Backstreet Boys.

###Technology

*node.js
*axios package
*spotify-api package
*moment.js package
*Bands in Town API
*Spotify API
*OMDB API