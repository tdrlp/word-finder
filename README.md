# Word Finder

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Node Versionn](https://img.shields.io/badge/npm-6.14.8-brightgreen.svg?style=flat-square)](https://shields.io/)
[![Express Versionn](https://img.shields.io/badge/express-4.17.1-orange.svg?style=flat-square)](https://shields.io/)
[![React Versionn](https://img.shields.io/badge/react-16.13.0-blue.svg?style=flat-square)](https://shields.io/)

A very basic word search game. With a list of randomly generated words, a grid is created. The user is then tasked with trying to find these words. As words are found, they stay selected on the grid and crossed out from the word list.

Decided what better way to try and learn `React` than trying to make a simple game with it.

## Screenshot

<img src="https://imgur.com/FL6khk7.png" height="400" />

## Demo & Deployment

I've deployed the front-end of this application on [Netlify](https://www.netlify.com/) and the back-end on [Heroku](https://www.heroku.com/). Since it's been deployed using free services, please be patient when accessing the app. If it hasn't been accessed in a while, it will have to wake itself up or if there are too many people trying to access it, your server requests might time out.

_The live demo can be accessed here: [Word Finder - DEMO](https://hopeful-volhard-378fac.netlify.app/)_

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   Your `npm` version is >= `6.14.8`

## Installation

To install `Word Finder`, follow these steps:

Linux and macOs:

```
git clone https://github.com/isoyute/word-finder.git
cd word-finder/client
npm i
cd ../server
npm i
```

I've only installed, ran and tested this app on _macOS Catalina 0.15.6_

## My To-Do List

This is a list of things that I still plan on working on when I get the chance (feel free to steal them, see contributing section below):

#### Bugs

-   [ ] Fix issue where list of generated words will contain duplicates
-   [ ] Fix selection line going outside of the grid
-   [ ] Fix app getting stuck generating smaller grids (happening when grid size <= 10x10)
-   [ ] Fix selection line getting stuck in `mouseDown` state when mouse released outside the grid

#### Features

-   [ ] Add winning screen
-   [ ] Add difficulty levels, with different grid sizes

## Contributing

To contribute, follow these steps:

1. Fork this repository
2. Create a branch: `git checkout -b <branch_name>`
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin word-finder/<location>`
5. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## License

This project uses the following license: [MIT](https://github.com/isoyute/word-finder/blob/master/LICENSE)
