// Jest tests for recipeRoutes.js
const request = require('supertest');
const app = require('../../../backend/server');
const Recipe = require('../../../backend/models/recipe');

describe('Recipe Routes', () => {
  let recipeId;

  afterAll(async () => {
    await Recipe.deleteMany({});
  });

  test('POST /recipes - create recipe', async () => {
    const newRecipe = { title: 'Pasta', ingredients: ['Flour', 'Water'], instructions: 'Mix and cook.' };
    const res = await request(app).post('/recipes').send(newRecipe);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Pasta');
    recipeId = res.body._id;
  });

  test('POST /recipes - fail on missing required fields', async () => {
    const res = await request(app).post('/recipes').send({});
    expect(res.statusCode).toBe(400);
  });

  test('GET /recipes - get all recipes', async () => {
    const res = await request(app).get('/recipes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /recipes/:id - get by id', async () => {
    const res = await request(app).get(`/recipes/${recipeId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(recipeId);
  });

  test('PUT /recipes/:id - update recipe', async () => {
    const res = await request(app).put(`/recipes/${recipeId}`).send({ title: 'Lasagna' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Lasagna');
  });

  test('DELETE /recipes/:id - delete recipe', async () => {
    const res = await request(app).delete(`/recipes/${recipeId}`);
    expect(res.statusCode).toBe(204);
  });

  // Model validation 
  test('Recipe model - required fields validation', async () => {
    const recipe = new Recipe({});
    const err = recipe.validateSync();
    expect(err.errors.title).toBeDefined();
    expect(err.errors.ingredients).toBeDefined();
  });
});