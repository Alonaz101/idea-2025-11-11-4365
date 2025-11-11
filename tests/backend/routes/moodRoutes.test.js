// Jest tests for moodRoutes.js
const request = require('supertest');
const app = require('../../../backend/server');
const Mood = require('../../../backend/models/mood');

// Mock database setup here if needed

describe('Mood Routes', () => {
  let moodId;

  afterAll(async () => {
    // Cleanup test moods if any created
    await Mood.deleteMany({});
  });

  test('POST /moods - should create a new mood', async () => {
    const res = await request(app).post('/moods').send({ name: 'Happy' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Happy');
    moodId = res.body._id;
  });

  test('POST /moods - should fail without required fields', async () => {
    const res = await request(app).post('/moods').send({});
    expect(res.statusCode).toBe(400);
  });

  test('GET /moods - should get all moods', async () => {
    const res = await request(app).get('/moods');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /moods/:id - should get mood by id', async () => {
    const res = await request(app).get(`/moods/${moodId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(moodId);
  });

  test('GET /moods/:id - should respond 404 for invalid id', async () => {
    const res = await request(app).get('/moods/123456789012345678901234'); // likely non-existent
    expect(res.statusCode).toBe(404);
  });

  test('PUT /moods/:id - should update mood', async () => {
    const res = await request(app).put(`/moods/${moodId}`).send({ name: 'Sad' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Sad');
  });

  test('PUT /moods/:id - should respond 400 with invalid data', async () => {
    const res = await request(app).put(`/moods/${moodId}`).send({ name: '' });
    expect(res.statusCode).toBe(400);
  });

  test('DELETE /moods/:id - should delete mood', async () => {
    const res = await request(app).delete(`/moods/${moodId}`);
    expect(res.statusCode).toBe(204);
  });

  test('DELETE /moods/:id - respond 404 on deleting non-existent', async () => {
    const res = await request(app).delete(`/moods/${moodId}`);
    expect(res.statusCode).toBe(404);
  });

  // Model validation tests
  test('Mood model - required name validation', async () => {
    const mood = new Mood({});
    const err = mood.validateSync();
    expect(err.errors.name).toBeDefined();
  });

  // Add uniqueness tests if required by schema
});