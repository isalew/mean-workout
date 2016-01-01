mean-workout
============

Set fitness goals, design workouts, log exercises, and stay fit with **MEAN Workout**. Built on the [MEAN JS](http://meanjs.org/) stack. Inspired by the [Django](https://www.djangoproject.com/) app [wger fitness](https://github.com/rolandgeider/wger).

Installation
------------

Download the tools

-	[Node.js](http://nodejs.org/download/)
-	[MongoDB](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
-	[Git](http://git-scm.com/download/mac)
-	[Bower](http://bower.io/#install-bower)

Download the repository

```
git clone https://github.com/isalew/mean-workout.git
```

Run NPM to install dependencies

```
cd mean-workout
npm install
```

In a separate terminal window, start a local instance of MongoDB

```
mongod
```

Start the app with grunt

```
grunt
```

Open the app in your browser at `localhost:3000`

```
localhost:3000
```

API
---

Documentation for API Endpoints is available [in the `app/routes` directory](https://github.com/isalew/mean-workout/tree/server/app/routes).

License
-------

The application is licenced under the Affero GNU General Public License 3 or later (AGPL 3+).
