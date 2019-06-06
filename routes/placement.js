const express = require('express');

const router = express.Router();

//const db = require('../config/database');

const Placement = require('../models/Placement');



router.get('/', (req, res)=>{
    Placement.findAll()
    .then(questions=>{
        console.log(questions);
        res.status(200).json(questions);
    })
    .catch(err=>{
        console.log(err);
    })
});

router.get('/addPlacement', (req, res)=>{
    const data = {
        name:"Shivam",
        company: "SOAL",
       
    };
    let {name, company} = data;
    Placedin.create({
        name,
        company
    })
    .then(placedin=>res.redirect('/placement'))
    .catch(err=>console.log(err));

});

module.exports = router;