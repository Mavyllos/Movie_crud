var express = require('express');
var router = express.Router();
var db = require('../db/connection.js')

/* GET home page. */
router.get('/', (req, res, next) => {
  db('movies').select('*').then(movies => {
    res.render('movies/index', { movies });
  }).catch(err => {
    console.log(err);
  })
});

// make sure the new is above the :id or it will cause issues
router.get('/new', (req, res, next) => {
  res.render('movies/new');
});

router.get('/:id', (req, res, next) => {
  var id = req.params.id
  db('movies').where({ id }).first().then(movie => {
    res.render('movies/show', { movie });
  }).catch(err => {
    console.log(err);
  })
});

router.post('/', (req, res, next) => {
  var year = parseInt(req.body.year)
  var movie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    my_rating: req.body.my_rating,
    poster_url: req.body.poster_url
  }
  if (Number.isNaN(year) || year < 1878) {
    res.render('movies/new', { error: 'Year is incorrect', movie })
  } else {
    db('movies').insert(movie, '*').then(newMovie => {
      var id = newMovie[0].id;
      res.redirect(`/movies/${id}/`)
    })
  }
});


router.delete('/:id', (req, res, next) => {
  var id = req.params.id
  db('movies').del().where({ id }).then(() => {
    res.redirect(`/movies`)
  })
});

router.put('/:id', (req, res, next) => {
  var id = req.params.id
  var year = parseInt(req.body.year)
  var movie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    my_rating: req.body.my_rating,
    poster_url: req.body.poster_url
  }
  if (Number.isNaN(year) || year < 1878) {
    res.render('movies/new', { error: 'Year is incorrect', movie })
  } else {
    db('movies').update(movie, '*').where({ id }).then(updatedMovie => {
      var id = updatedMovie[0].id;
      res.redirect(`/movies/${id}/`)
    }).catch(err => {
      console.log(err);
    })
  }
});

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id
  db('movies').select('*').where({ id }).first().then(movie => {
  res.render('movies/edit', { movie })
  })
});

module.exports = router;
