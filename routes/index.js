var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Exercise = mongoose.model('Exercise');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });

});

/* EXERCISES */

router.param('exercise',function(req,res,next,id){

  var query = Exercise.findById(id);

  query.exec(function(err,result){
    if(err){return next(err);}
    if(!result){return next(new Error('can\'t find exercise'));}
    req.exercise = result;
    return next();
  });

});

router.get('/api/exercises', function(req,res,next){

  Exercise.find(function(err,exercises){
    if(err){return next(err);}
    res.json(exercises);
  });

});

router.post('/api/exercises',function(req,res,next){

  var exercise = new Exercise(req.body);

  exercise.save(function(err,exercise){
    if(err){return next(err);}
    res.json(exercise);
  });

});

router.get('/api/exercises/:exercise',function(req,res,next){

  res.json(req.exercise);

});

router.put('/api/exercises/:exercise',function(req,res,next){

  //res.send('Got a PUT request at /api/exercises/:exercise');

  Exercise.update({_id:req.exercise._id},req.exercise,function(err,exercise){
    if(err){return next(err);}
    console.log('The raw response from Mongo was ', exercise);
    res.json(exercise);
  });

});

router.delete('/api/exercises/:exercise',function(req,res,next){

  Exercise.remove({_id: req.exercise._id},function(err){
    if(err){return next(err);}
    console.log('Deleted exercise ', req.exercise);
    res.json('Deleted ', req.exercise);
  });

});


module.exports = router;
