// TODO: Add Workout Method - Add Exercise
// TODO: Add Workout Schedule in Sessions

var mongoose = require('mongoose');

var WorkoutSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true}
  , description: {type: String}
  , exercises: [{type: mongoose.Schema.Types.ObjectId, ref:'Exercise'}]
},
{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

mongoose.model('Workout',WorkoutSchema);
