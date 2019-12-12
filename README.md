# B.Sc (Hons.) Level 8 - Assignment 2 - Web API

**Name:** Dylan Gore

[React App README](/react/README.md)

[Live Demo of Complete Project](https://webapp.wit.dylangore.space)

## Overview

The is the API portion of the project management app. For full details on the React Web App, please see the link above.

## API Features

-   MongoDB Connection
-   Full CRUD Capabilities
-   Firebase Token Authentication
-   Testing of Mongoose Schemas

## Running the API - Development

The API can be run in development mode by running:

```bash
npm run dev
```

which will lint the files and will run the server using nodemon to watch for changes
The defualt port to access the API is 3002.

## Deploying to production

This project is setup to be deployed to Heroku but can also run on other services.

### Heroku

Simply run:

```bash
heroku create && git push heroku master
```

### Other

To deploy to a linux host, run:

```bash
npm run start
```

PM2 or similar is recommended.

The react app must be built first if running everything behind Express.

If the react app is being run in development mode, there is no need to build it first.
