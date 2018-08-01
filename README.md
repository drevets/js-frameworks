# The Next Great JS Framework 

_React vs. Ember vs. Angular vs. Vue_

The Next Great JS Framework is an app designed to compare four different JS Frameworks (Vue, React, Ember, and Angular) based on certain activity criteria on GitHub to determine which framework has the healthiest ecosystem and the brightest future. 

For this project, when a GitHub user takes an action that creates a Pull Request Event, a Fork Event, or an Issues Event, that counts as a “vote” towards the framework. 

You can see the deployed app on Heroku: <link here> 

## Why

Choosing a technology to build a project in or train employees in is a big decision: it means that you (or the person you are building something for) will be working with an maintaining the code in the future, possibly for years. Because of that, it’s important to know that the open source technology has a robust ecosystem and is continually improving, so you can avoid starting on a hot new technology that ends up being super buggy and then dying because it doesn’t have people maintaining and improving the code base. 

For this project, I chose to monitor Fork Events, Pull Request Events, and Issues Events because these three types of actions show active involvement and questions, as opposed to passive actions like starring repos or watching them.

## Getting Started

Download the code, then run `npm install` and `npm run start-dev`.

## Tech 

* React / Redux
* React Native
* Node JS
* Sequelize
* PostgreSQL
* GitHub API 
* Semantic UI 
* Heroku 
* [Boilermaker app template] (https://github.com/FullstackAcademy/boilermaker)

# Reasoning 

## Choosing API routes 

I wanted to see active data coming from events in real-time. Though the app currently doesn’t support graph-like views, that would be an interesting feature to add. That’s why I decided to use the ![GitHub Events API] (https://developer.github.com/v3/activity/events/types/). This allowed me to access recent public events from each repository I wanted to monitor (Vue.js, Ember.js, Angular.js, React) and add them to a database, which could (over time) build a picture of how activity in each repository is changing. 

That said, the Events API did have some limitations. It only allowed the user to access the 300 most recent events, meaning historical data was closed to me. Furthermore, the number of events per API call page was limited to 30, which meant I had to loop through the API results in order to get all of the events. 

There was also no information about session data regarding when each user took the action resulting in a vote for a framework. In future versions of the app (possibly using the GraphQL API), I will be able to filter out “duplicate” votes from users by only counting one “vote” from a user as one of the above actions in one browser session. 

For this project, I explored using time comparisons to filter out votes that were made within five minutes of one another. This proved to be a fairly expensive action, so I am undertaking further exploration of ways to create a time buffer while creating the votes in the database. In this version of the app, all action a user takes are counted as votes regardless of time or browser session.  

## How it works 

When the user loads the page, the votes already in the database are fetched, as well as any new votes that might have come in between the last API call. This is done using two thunks, which sends all of the votes (both old and new) to the store. This information is also passed as props into the FrameworkData component itself by using connect.

Right now, on the initial load of data, the information on the screen is not updating automatically and requires a page refresh. I believe this can be fixed by changing where I am calling the function that updates the votes on state (right now they are both in componentDidMount).  

When the GitHub Events API is called, the new votes are sent via API call to the database, which either finds or creates new instances of the votes (after filtering only for the kinds of events that I am wanting to monitor) and sends back the new votes to the store (in the case where votes are being updated).

In the future, it would be better to set up a service worker or microservice to do API calls in the background to keep the data fresh, or to have a worker running on a dyno in Heroku for the same purpose. In the current version of the app, a setTimeout function calls the GitHub API every minute in order to refresh the data. 

On the front end, the vote information is received as an array, which is then sorted and filtered in order to display discrete counts for forks, issues, and pull requests as well as vote totals. 

Future versions of the app will include ability to sort dynamically in the table as well as have color-coding to easily see the leading framework. 
