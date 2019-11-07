const express = require('express'); // Use the express module.
const bodyParser = require('body-parser');

const app = express(); // create an object of express.

app.use(bodyParser.json());

// Middleware to set headers.
app.use((req, res, next) => {
 res.setHeader("Access-Control-Allow-Origin", "*"); //thats is request coming from any domain is allowed
 res.setHeader(
   "Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept"
 );
 res.setHeader(
   "Access-Control-Allow-Methods",
   "GET, POST, PATCH, PUT, DELETE, OPTIONS"
 );
 next();
});

// Recipes Json array.
var posts = [
  {
    id: 1,
    name:'Chicken Masala',
    imagePath:'/assets/masala-chicken.jpg',
    indicator: 'veg',
    eatCount: 4,
    ingredients: [{'name': 'chicken'}, {'name': 'tomato'}, {'name': 'onion'},],
    instructions: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    creationDate: "04-11-2019 12:30"
  },
  {
    id: 2,
    name:'Pizaa',
    imagePath:'/assets/vegetables-italian-pizza-restaurant.jpg',
    indicator: 'nonveg',
    eatCount: 8,
    ingredients: [{'name': 'bread'}, {'name': 'cheese'},],
    instructions: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    creationDate: "04-11-2019 12:30"
  },
  {
    id: 3,
    name:'Pav Bhaji',
    imagePath:'/assets/pavbhaji.jpg',
    indicator: 'veg',
    eatCount: 10,
    ingredients: [{'name': 'bread'}, {'name': 'vegtables'},],
    instructions: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    creationDate: "04-11-2019 12:30"
  },
 ];

// Api to fetch recipes.
app.get('/api/getRecipes', (req, res) => {
  res.status(200).json({
        message: "Recipes fetch successfully!",
        recipes: posts
  });
});

// Api to add recipe.
app.post('/api/posts', (req, res) => {
  posts = req.body;
  res.status(201).json({
    message: "Posts saved successfully!",
  });  // 201 status code refers new resourse was created
});

// Api to delete single recipe.
app.delete('/api/recipes/:id', (req, res) => {

  let recipeId = req.params.id;

  let recipe = posts.filter(recipe => {
    return recipe.id == recipeId;
  })[0];

  const index = posts.indexOf(recipe);
  posts.splice(index, 1);
  res.json({
    message: `Recipe ${recipeId} deleted.`,
    remainingPost: posts
  });
});

// Api to update single recipe.
app.put('/api/recipesupdate/:id', (req, res) => {
  let recipeId = req.params.id;

  let recipe = posts.filter(recipe => {
    return recipe.id == recipeId;
  })[0];

  const index = posts.indexOf(recipe);

  let keys = Object.keys(req.body);
  keys.forEach(key => {
    recipe[key] = req.body[key];
  });

  posts[index] = recipe;
  res.json({ message: `User ${recipeId} updated.`});

});

// Api to get single recipe.
app.get('/api/recipes/:id', (req, res) => {

  let recipeId = req.params.id;

  let recipe = posts.filter(recipe => {
    return recipe.id == recipeId;
  });
  res.json(recipe[0]);
});

module.exports = app;

