const express = require('express');

const router = express.Router();

//const db = require('../config/database');

const Placedin = require('../models/Placedin');



router.get('/', (req, res)=>{
    Placedin.findAll()
    .then(questions=>{
        console.log(questions);
        res.status(200).json(questions);
    })
    .catch(err=>{
        console.log(err);
    })
});

router.get('/addPlacedin', (req, res)=>{
    const data = {
        name:"Shivam",
        company: "SOAL",
       
    };
    let {name, company} = data;
    Placedin.create({
        name,
        company
    })
    .then(placedin=>res.redirect('/placedin'))
    .catch(err=>console.log(err));

});

module.exports = router;