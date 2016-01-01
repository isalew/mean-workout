API Endpoints
=============

| Route                          | HTTP Verb | Description               | Status |
|:-------------------------------|:----------|:--------------------------|:-------|
| **Workouts**                   | --        | --                        | --     |
| /api/workouts                  | POST      | Create a workout          | Active |
| /api/workouts                  | GET       | Get all workouts          | Active |
| /api/workouts/:id              | GET       | Get a single workout      |        |
| /api/workouts/:id              | PUT       | Update a workout          |        |
| /api/workouts/:id              | DEL       | Delete a workout          |        |
| **Workout Exercises**          | --        | --                        | --     |
| /api/workouts/:id/exercise     | PUT       | Create a workout exercise |        |
| /api/workouts/:id/exercise/:id | DEL       | Delete a workout exercise |        |
| **Exercises**                  | --        | --                        | --     |
| /api/exercises                 | POST      | Create an exercise        | Active |
| /api/exercises                 | GET       | Get all exercises         | Active |
| /api/exercises/:id             | GET       | Get a single exercise     | Active |
| /api/exercises/:id             | PUT       | Update an exercise        | Active |
| /api/exercises/:id             | DEL       | Delete an exercise        | Active |
