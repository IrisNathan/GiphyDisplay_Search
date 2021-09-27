const { response } = require('express');
// foundation
const express = require('express');
const app = express();
const $fetch = require('node-fetch');

const PORT = process.env.PORT || 3000;

// css
app.use(express.static('public'));

// set view engine
app.set('view engine', 'ejs');

// trending route
app.get('/', (req, res) => {
  $fetch(
    'https://api.giphy.com/v1/gifs/trending?api_key=73H9V6lKlhDik4GLmoJG2CeTj9eTRuUS'
  )
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      // for json response
      return response.json();
    })
    .then((data) => res.render('home.ejs', { data: data.data }))
    .catch((error) => console.error('Error from the api: ', error));
});

// search route
app.get('/search', (req, res) => {
  // getting the value of the user input
  let search = req.query.searchGiphy;
  $fetch(
    `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=73H9V6lKlhDik4GLmoJG2CeTj9eTRuUS&q`
  )
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    // data from json array is data
    .then((results) => res.render('results.ejs', { data: results.data }))
    .catch((error) => console.error('Error from api: ', error));
});

// listener
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));
