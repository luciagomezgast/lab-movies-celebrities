// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")

// all your routes here


router.get('/new-celebritie', (req,res,next) =>{
    res.render('celebrities/new-celebritie')
})

router.post('/new-celebritie', (req, res, next)=>{
    let celebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPrashe: req.body.catchPrashe,  
    };
    Celebrity.create(celebrity)
    .then(result =>
       res.redirect('/celebrities'))
    .catch (err=> res.redirect('/celebrities/new-celebritie'))
    }) 


router.get('/', (req,res,next)=>{
 
    Celebrity.find()
    .then(celebrity=>{
       res.render('celebrities/celebrities',{celebrity:celebrity})
    })
    .catch(err=>next(err))
})


module.exports = router;