# TMDB(The Movie Database) app Demo

## About DB and APIs
TMDB was used for searching the movies.
At first create developers account on TMDB and then generate your API key. Using this key you can search movies.

Two APIS were used in this project:
* https://api.themoviedb.org/3/search/movie?query=jungle&api_key={your key} - To search movies.
* https://api.themoviedb.org/3/movie/{movieID}?api_key={your key} - To get detailed information about a particular movie.

## How to build and run it yourself

You need to have your machine setup for [React Native Development](https://facebook.github.io/react-native/docs/getting-started.html) and API key from [TMDB The Movie Database](https://www.themoviedb.org/faq/api?language=en)


Complete the following steps to build and run the app:

1. Enter the `rnMovies` directory:

  ~~~
  $ cd tmdbapp
  ~~~

2. Install dependencies:

  ~~~
  $ npm install
  ~~~


3. Build and run for iOS

  ~~~
  $ react-native run-ios
  ~~~

4. Build and run for Android
  
  ~~~
  $ react-native run-android
  ~~~


#### Environment

react-native-cli: 2.0.1
react-native: 0.61.5

node v12.14.0
npm 6.13.4


