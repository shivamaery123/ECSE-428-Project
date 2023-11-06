const {registerUser} = require('../controllers/user_controller');

describe('User Creation', () => {
    test('registerUser should create the user', async () => {

      const req = {
        body: { username: 'testuser', email: 'test@email.com', password: 'testpassword'},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await registerUser(req, res);
  
      //assertions
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ status: 'Success', message: 'User registered successfully', data:{user: expect.any(Object)}});

    });

    test('registerUser should not create the user: req body invalid', async () => {

      const req = {
        body: { email: 'test@email.com', password: 'testpassword'},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await registerUser(req, res);
  
      //assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ status: 'Failed', message: expect.stringMatching(/^User was not created/)});

    });

    test('registerUser should not create the user: username null', async () => {

      const req = {
        body: { username: null, email: 'test@email.com', password: 'testpassword'},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await registerUser(req, res);
  
      //assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ status: 'Failed', message: expect.stringMatching(/^User was not created/)});

    });

    test('registerUser should not create the user: email null', async () => {

      const req = {
        body: { username: 'testuser', email: null, password: 'testpassword'},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await registerUser(req, res);
  
      //assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ status: 'Failed', message: expect.stringMatching(/^User was not created/)});

    });

    test('registerUser should not create the user: password null', async () => {

      const req = {
        body: { username: 'testuser', email: 'test@email.com', password: null},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await registerUser(req, res);
  
      //assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ status: 'Failed', message: expect.stringMatching(/^User was not created/)});

    });

    test('registerUser should create the user: password empty', async () => {

      const req = {
        body: { username: 'testuser', email: 'test@email.com', password: ''},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await registerUser(req, res);
  
      //assertions
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ status: 'Success', message: 'User registered successfully', data:{user: expect.any(Object)}});

    });
    
  });
