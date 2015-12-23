var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Exercise = mongoose.model('Exercise');
var Workout = mongoose.model('Workout');

router.use(function(req,res,next){
  console.log('Time:', Date.now());
  next();
});

router.param('workout',function(req,res,next,id){

  var query = Workout.findById(id);

  query.exec(function(err,result){
    if(err){return next(err);}
    if(!result){return next(new Error('can\'t find workout'));}
    req.workout = result;
    return next();
  });

});

router.get('/', function(req,res,next){

  Workout.find(function(err,workouts){
    if(err){return next(err);}
    res.json(workouts);
  });

});

router.post('/',function(req,res,next){

  console.log(req.body);

  var workout = new Workout(req.body);

  workout.save(function(err,workout){
    if(err){return next(err);}
    res.json(workout);
  });

});
/*
router.put('/:workout/exercise',function(req,res,next){
  req.workout.addExercise(function(err, workout){
    if(err){return next(err);}
    res.json(workout);
  });
});
*/
/*
router.get('/:exercise',function(req,res,next){

  res.json(req.exercise);

});

router.put('/:exercise',function(req,res,next){

  //res.send('Got a PUT request at /api/exercises/:exercise');

  Exercise.update({_id:req.exercise._id},req.exercise,function(err,exercise){
    if(err){return next(err);}
    console.log('The raw response from Mongo was ', exercise);
    res.json(exercise);
  });

});

router.delete('/:exercise',function(req,res,next){

  Exercise.remove({_id: req.exercise._id},function(err){
    if(err){return next(err);}
    console.log('Deleted exercise ', req.exercise);
    res.json('Deleted ', req.exercise);
  });

});
*/
module.exports = router;
