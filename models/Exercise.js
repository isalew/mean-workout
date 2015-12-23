var mongoose = require('mongoose');

var ExerciseSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true}
  , description: {type: String}
  , category: {type: String}
  //TODO:10 Add exercise image schema
  //, images: []
  //TODO:20 Add exercise muscle group tag schema
  //, muscle_groups: []
  //TODO:30 Add exercise workout relationship schema
  //, workouts: [] (Query or Relate?)
},
{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

mongoose.model('Exercise',ExerciseSchema);
