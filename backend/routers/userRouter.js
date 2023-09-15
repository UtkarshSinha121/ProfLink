const express = require('express');
const router = express.Router();

const Model = require('../models/userModel');

router.post('/add', (req, res) =>{
    console.log(req.body);

    //saving a data to mongodb
    new Model(req.body).save()
    .then((result) => {
          res.json(result);
    })
    .catch((err) => {
          console.log(err);
          res.status(500).json(err);
  });

});

router.get('/getall', (req, res) =>{

    Model.find({})
    .then((result) => {
          res.json(result); 
    }).catch((err) => {
        res.status(500).json(err);  
    });
   
});
//colon denotes a url parameter
router.get('/getbyid/:id', (req, res) =>{
    console.log(req.params.id);

    Model.findById(req.params.id)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);

    });
});

router.get('/getbyemail/:email', (req, res)=>{
    Model.find({email : req.params.email})
    .then((result) => {
         res.json(result);   
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/getbyname/:name', (req, res)=>{
    Model.find({name : req.params.name})
    .then((result) => {
         res.json(result);   
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/delete/:id', (req, res) =>{
    Model.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/update/:id', (req, res)=>{
    Model.findByIdAndUpdate(req.params.id, req.body ,{new: true})
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(500).json(err); 
    });
});

router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
    .then((result) => {
        if(result !== null) res.json(result);
        else res.status(401).json({message : 'login failed'})
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err); 
    });
});

//check if the user is already present using email
router.get('/checkemail/:email',(req,res)=>{

    //return 200 if email is available and 401 if not available
    Model.find({email:req.params.email})
    .then((result) => {
        if(result.length === 0)
        res.status(200).json();
        else
        res.status(401).json();
    }).catch((err) => {
        console.log(err);
        res.status(500).json();
    });
  });
  
  //check if the user is already present using username
  router.get('/checkname/:name',(req,res)=>{
  
    //return 200 if username is available and 401 if not available
    Model.find({name:req.params.name})
    .then((result) => {
        if(result.length === 0)
        res.status(200).json();
        else
        res.status(401).json();
    }).catch((err) => {
        console.log(err);
        res.status(500).json();
    });
  });


module.exports = router;