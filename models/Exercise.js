var mongoose = require('mongoose');

var ExerciseSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true}
  , description: {type: String}
  , category: {type: String}
  //TODO:70 Exercise: Add images
  //, images: []
  //TODO:80 Exercise: Add muscle group tags
  //, muscle_groups: []
  //TODO:60 Exercise: Add workout relationship
  //, workouts: [] (Query or Relate?)
},
{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

mongoose.model('Exercise',ExerciseSchema);
