var mongoose = require('mongoose');

var ExerciseSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true}
  , description: {type: String}
  , category: {type: String}
  //, images: []
  //, muscle_groups: []
  //, workouts: [] (Query or Relate?)
},
{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

mongoose.model('Exercise',ExerciseSchema);
