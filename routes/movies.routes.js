// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('../models/movie.model')
const Celebrity = require('../models/Celebrity.model')


// all your routes here
router.get('/create', (req, res, next) => {
    Celebrity.find()
        .then(result => {
            res.render('movies/new-movie', { result: result })
        })
        .catch(err =>next(err))
})




router.post('/create', (req, res, next) => {

    let newMovie = {
        title: req.body.name,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    Movie.create(newMovie)
        .then(movie => {
            console.log(movie)
            console.log(movie)
            res.redirect('/movies/create')
        })
        .catch(err =>next(err))
})

router.get('/', (req, res, next) => {
    Movie.find()
        .populate("cast")
        .then((movies) => {
            console.log("movies:", movies)
            res.render('movies/movies', { movies: movies })
            /* res.json (movies) */
        })
        .catch(err =>next(err))
})

router.get("/:id", (req, res, next) => {
    console.log("req.params:", req.params)
    const {id} = req.params
    console.log("id:", id)
    Movie.findById(id)
        .populate("cast")
        .then((movie) => {
            console.log("MovieId:", movie)
            /* res.json(movie) */

            res.render("movies/movie-details", { movie: movie })
        })
        .catch(err => next(err))
})

router.post('/:_id/delete', (req, res, next) => {
    const _id = req.params

    Movie.findByIdAndDelete(_id)
        .then(result => {
            res.redirect('/movies')
        })
        .catch(err => next(err))

})

router.get('/:_id/edit', (req,res,next)=>{
    const _id = req.params;
    let celebrities = ""
    Celebrity.find()
    .then(result=>{
     celebrities = result
    })
    console.log("celebrities:", celebrities)
    
    Movie.findById(_id)
    .populate('cast')
    .then(result=>{
        console.log("result", result)
        /* res.json(result) */
         res.render('movies/edit-movie', {movies:result, celebrities:celebrities}) 
    })
    .catch(err=> next(err))
})

router.post('/:_id/edit', (req,res,next)=>{
 const {title,genre, plot, cast} = req.body
 const _id = req.params;
 Movie.findByIdAndUpdate(_id, {title,genre, plot, cast}, {new:true})
 .then(result=>{
   res.redirect('/:_id', result)
 })

})

module.exports = router;