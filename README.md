
# React TVMaze

## Deployed App
https://git.generalassemb.ly/pages/ga-wdi-exercises/react-tvmaze/

## Starter Code:
react-express-webpack starter app: [https://github.com/wdi-sg/react-express-webpack/tree/tvmaze-react](https://github.com/wdi-sg/react-express-webpack/tree/tvmaze-react)

## [Start with a Mock](https://facebook.github.io/react/docs/thinking-in-react.html#start-with-a-mock)
First step in creating a React app is to start with a mock and some sample data.
These are the two views for our app:

### The Search Page
![search page](./images/search.png)

I've identified two components on the search page.
1. The top level component, which we'll call `Home`, is boxed in magenta.
2. The search input, a sub-component of `Home`, in yellow we'll call `Search`.

### The Results Page
![results page](./images/results.png)

I've identified three components on this page.
1. The same `Home` top level component.
2. A `results` components which contains results and an option to search again.
3. The individual results

### Component Hierarchy

Given these breakdowns we have a component hierarchy that looks like:
- `Home`
  - `Search`
  - `Results`
    - `Result`

#### Sample Data
Use `results.js` as the result you would get back from any search.


## [Build a Static Version of the App](https://facebook.github.io/react/docs/thinking-in-react.html#step-2-build-a-static-version-in-react)

First we will build a static version of the app passing all of our data by `props`.
This makes it much easier to avoid getting bogged down in tricky details of functionality while implementing the visual appearance of the UI.

## [Identify the Minimal Representation of UI State](https://facebook.github.io/react/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state)

For our app to work we need:
- `movies` (movies to show)
- `query` (title being searched)
- `hasSearched` (boolean determining wether to show the search input or the results)

All of these are subject to change over time and so each must be kept in state.

## [Identify Where Your State Should Live](https://facebook.github.io/react/docs/thinking-in-react.html#step-4-identify-where-your-state-should-live)

Central to considering where state lives is the idea of **one way data flow**.
The react documentation describes this step as "often the most challenging part for newcomers to understand".

Our task here is to look for the component for each aspect of state that could be the one place where that state is managed.

In our app, `query` is needed to keep track of what is going on in the search box, as well as to make the actual query.
This request will return the movies to the same component which managed the query so `movies` should be managed by the same component.
Finally, we have our `hasSearched` flag which we need to set when we make the request so these should all live in the same place.

Currently, the parent to the `Results` and `Search` components is `Home`.
We don't want to clutter our top level component as our app grows so this segues nicely into the idea of Container and Presentational Components.

### [Container & Presentational Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
The above workflow has led to the currently very popular component architecture of distinguishing container and presentational components.

Presentational components are components that render themselves based solely on the information that they receive from props. At this point, all of our components are presentational.

Container components are components whose job it is to exclusively manage state and as props any data needed by its presentational components.

This leads to a very nice division where state management and presentation are cleanly separated.

We are going to create a `SearchContainer` to manage `query`, `shows`, and `hasSearched`.

## [Add Inverse Data Flow](https://facebook.github.io/react/docs/thinking-in-react.html#step-5-add-inverse-data-flow)
The last step is passing callbacks through props to presentational components to provide behavior.
We will need three functions defined on the `SearchContainer` component to provide necessary behavior to `Search` and `Results`:

1. `handleSearchInput` for managing changes to the input field
2. `onSubmitQuery` for kicking of the ajax request
3. `onSearchAgain` to set state back to render the search bar

> What is the point of all of these `.bind(this)` statements?

## Pre-API Integration Steps

Make sure that your TVMaze application handles user input properly.

### Handling User Input

The user-inputted value will be `SearchContainer`'s `this.state.query`, after you've done the following things...
1. In `SearchContainer`, add the `handleSearchInput` method to the `class`, and bind it in the `constructor`, if you have not already.
2. Pass `handleSearchInput` to the `Search` component via props.
3. In `Search`, you'll have to use the `onChange` event-listener prop to attach the method `handleSearchInput` from `SearchContainer`, available in `Search` as `this.props.handleSubmitInput`. [See here for an example from the React docs](https://reactjs.org/docs/forms.html#controlled-components).

> `handleSearchInput` is being passed down from `SearchContainer`, the parent element, to `Search` the child component. In React's model of unidirectional data-flow, parent components cannot be changed by their children **unless the parent component provides a helper method to its children, passed down via props, that changes the state on the parent**.

## Integrate with the TVMaze API

> Documentation here: https://www.tvmaze.com/api#show-search

There, you'll see an example of a URL you can use to query the TVMaze API. Ultimately, you'll want to replace the example tv program, `girls`, with whatever the user has input into the text box. This should be the value of `SearchContainer`'s `this.state.query`, after you've set everything up properly.

### Fetching Data from the API with fetch

> Create a new file called `Util.js`. Export a function like so...

```js
export queryTVMazeAPI (query) => {
  // fill url in with a URL based on the example at:
  // https://www.tvmaze.com/api#show-search
  // replace a part of the example URL with the user input, which you can 
  // assume will be the parameter of this function, `query`
  const url = ''
  fetch(url)
    .then((response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          console.log(data); //make sure to return something
        });
      }
    )
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
}
```

> Import this function in `SearchContainer` like so...

```js
//somewhere at the top of SearchContainer...
import {queryTVMazeAPI} from './Util'
```

You can now use your queryTVMazeAPI function, which takes one argument, in `SearchContainer`. You will want to pass the user's query as argument to this function when a user has submitted a search.

### Further
Implement error handling for the fetch. Re-do the request __x__ times before you message the user that it failed.

### Further
Create functionality for infinite scroll of tvmaze's full schedule: [https://www.tvmaze.com/api#full-schedule](https://www.tvmaze.com/api#full-schedule)

React boilerplate with ES2015, Express.js, and Webpack

[![Build Status](https://travis-ci.org/antonfisher/react-express-webpack.svg?branch=master)](https://travis-ci.org/antonfisher/react-express-webpack)
[![bitHound Dependencies](https://www.bithound.io/github/antonfisher/react-express-webpack/badges/dependencies.svg)](https://www.bithound.io/github/antonfisher/react-express-webpack/master/dependencies/npm)
[![bitHound Overall Score](https://www.bithound.io/github/antonfisher/react-express-webpack/badges/score.svg)](https://www.bithound.io/github/antonfisher/react-express-webpack)

## Technologies

- React (v16) + Redux (v3) + React Router (v4)
- Express.js (v4) as production and development server
- Webpack 4 (production and development configurations)
- SCSS support (+ sanitize.css included)
- ES2015+

## Features
- preconfigured router
- React Material UI example theme
- preconfigured modal windows
- preconfigured eslint and Prettier code formatter
- React Hot Loader
- Linux/MacOS/Windows

## Screenshots

Demo UI view:

![Demo view](https://raw.githubusercontent.com/antonfisher/react-express-webpack/docs/images/rew2-ui-screenshot.png)

Development `.js` bundles:

![Development js bundles](https://raw.githubusercontent.com/antonfisher/react-express-webpack/docs/images/rew-stat-dev.png)

Production `.js` bundles:

![Production js bundles](https://raw.githubusercontent.com/antonfisher/react-express-webpack/docs/images/rew-stat-prod.png)

Production mode server output:

![Production js bundles](https://raw.githubusercontent.com/antonfisher/react-express-webpack/docs/images/rew-log-prod.png)

## Usage

### Installation
```bash
git clone git@github.com:antonfisher/react-express-webpack.git
cd react-express-webpack
npm install

# remove boilerplate git references
rm ./.git
```

### Scripts
```bash
# run development mode
npm run dev

# run production mode
npm run build
npm start

# run prettier
npm run prettier

# run lint
npm run lint

# run on a different port
HTTP_PORT=3001 npm run dev
```

## License
MIT License. Free use and change.
>>>>>>> webserver/master
