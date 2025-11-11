// Jest tests for userRoutes.js
const request = require('supertest');
const app = require('../../../backend/server');
const User = require('../../../backend/models/user');

describe('User Routes', () => {
  let userId;

  afterAll(async () => {
    await User.deleteMany({});
  });

  test('POST /users - create user', async () => {
    const newUser = { username: 'testuser', email: 'test@example.com', password: 'password123' };
    const res = await request(app).post('/users').send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.username).toBe('testuser');
    userId = res.body._id;
  });

  test('POST /users - fail with missing fields', async () => {
    const res = await request(app).post('/users').send({});
    expect(res.statusCode).toBe(400);
  });

  test('GET /users - get all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /users/:id - get user by id', async () => {
    const res = await request(app).get(`/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(userId);
  });

  test('PUT /users/:id - update user', async () => {
    const res = await request(app).put(`/users/${userId}`).send({ username: 'updateduser' });
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('updateduser');
  });

  test('DELETE /users/:id - delete user', async () => {
    const res = await request(app).delete(`/users/${userId}`);
    expect(res.statusCode).toBe(204);
  });

  // Model validation
  test('User model - required validations', async () => {
    const user = new User({});
    const err = user.validateSync();
    expect(err.errors.username).toBeDefined();
    expect(err.errors.email).toBeDefined();
    expect(err.errors.password).toBeDefined();
  });

  test('User model - unique email validation', async () => {
    // create user
    const user1 = new User({ username: 'user1', email: 'unique@example.com', password: 'pass1' });
    await user1.save();
    // create user duplicate email
    const user2 = new User({ username: 'user2', email: 'unique@example.com', password: 'pass2' });
    let err;
    try {
      await user2.save();
    } catch(e) {
      err = e;
    }
    expect(err).toBeDefined();
  });
});