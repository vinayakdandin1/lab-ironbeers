const { log } = require('console');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then((beers) => {
      res.render('beers.hbs', {beers})
    })
    .catch(error => console.log(error));
    
})

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then((beer) => {
      res.render('random-beer.hbs', {beer})
    })
    .catch(error => console.log(error));
})

app.get('/:id', (req, res) => {
  let id = req.params.id
  punkAPI.getBeer(id)
    .then((id) => {
      res.render('selectedbeer.hbs', {id})
    })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));