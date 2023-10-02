const request = require('supertest');
const app = require('../src');

let authToken; 

describe('Authentication Routes', () => {

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/account/register')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should log in an existing user', async () => {
    const response = await request(app)
      .post('/account/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');

    authToken = response.body.token;
  });

  it('should return an error when registering with an existing username', async () => {
    const response = await request(app)
      .post('/account/register')
      .send({ username: 'testuser', password: 'testpassword' });
  
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Username already exists');
  });
  
  it('should return an error when logging in with invalid credentials', async () => {
    const response = await request(app)
      .post('/account/login')
      .send({ username: 'nonexistentuser', password: 'invalidpassword' });
  
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid username or password');
  });

  it('should return validation errors when registering with missing fields', async () => {
    const response = await request(app)
      .post('/account/register')
      .send({});
  
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(3);
  });

});

describe('Task Routes', () => {
    
    it('should create a new task', async () => {
      const response = await request(app)
        .post('/task/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Test Task', description: 'Description' });
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'Test Task');
    });
  
    it('should assign a task to a staff member', async () => {
      const createResponse = await request(app)
        .post('/task/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Test Task', description: 'Description' });
  
      const taskId = createResponse.body.id;
  
      const assignResponse = await request(app)
        .put(`/task/assign/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ assignedTo: 1 });
  
      expect(assignResponse.status).toBe(200);
      expect(assignResponse.body).toHaveProperty('assignedTo', 1);
    });
  
    it('should delete a task', async () => {
      const createResponse = await request(app)
        .post('/task/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Test Task', description: 'Description' });
  
      const taskId = createResponse.body.id;
  
      const deleteResponse = await request(app)
        .delete(`/task/delete/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`);
  
      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body).toHaveProperty('message', 'Task deleted successfully');
    });
  
    it('should mark a task as completed', async () => {
      const createResponse = await request(app)
        .post('/task/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Test Task', description: 'Description' });
  
      const taskId = createResponse.body.id;
  
      const completeResponse = await request(app)
        .put(`/task/complete/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`);
  
      expect(completeResponse.status).toBe(200);
      expect(completeResponse.body).toHaveProperty('completed', true);
    });
  
    it('should return an error when trying to assign a non-existent task', async () => {
      const assignResponse = await request(app)
        .put(`/task/assign/nonexistenttaskId`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ assignedTo: 1 });
    
      expect(assignResponse.status).toBe(404);
      expect(assignResponse.body).toHaveProperty('message', 'Task not found');
    });
    
    it('should return an error when trying to complete a non-existent task', async () => {
      const completeResponse = await request(app)
        .put(`/task/complete/nonexistenttaskId`)
        .set('Authorization', `Bearer ${authToken}`);
    
      expect(completeResponse.status).toBe(404);
      expect(completeResponse.body).toHaveProperty('message', 'Task not found');
    });
  
    it('should return validation errors when creating a task with missing fields', async () => {
      const response = await request(app)
        .post('/task/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({});
    
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Server error');
    });
    
  });
  