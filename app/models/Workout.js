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

// TODO:20 Workout: Workout Schedule in Sessions

/*
// TODO:0 Workout: Add Exercise Method
WorkoutSchema.methods.addExercise = function(cb,id){
  //TODO:10 Workout: Validate method inputs
  this.exercises.push(id);
  this.save(cb);
};
*/

module.exports = mongoose.model('Workout',WorkoutSchema);
