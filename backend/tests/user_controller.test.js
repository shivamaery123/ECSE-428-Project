const {registerUser, remove_all_users} = require('../controllers/user_controller');

describe('User Creation', () => {
    test('registerUser should create the user', async () => {
      const req_remove = {};
      const res_remove = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await remove_all_users(req_remove, res_remove);

      const req = {
        body: { username: 'testuser10', email: 'test10@email.com', password: 'testpassword'},
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
        body: { email: 'test2@email.com', password: 'testpassword'},
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
        body: { username: null, email: 'test3@email.com', password: 'testpassword'},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await registerUser(req, res);
  
      //assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ status: 'Failed', 
      message: "Email, password and username cannot be empty"});

    });

    test('registerUser should not create the user: email null', async () => {

      const req = {
        body: { username: 'testuser2', email: null, password: 'testpassword'},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await registerUser(req, res);
  
      //assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ status: 'Failed', 
      message: "Email, password and username cannot be empty"});

    });

    test('registerUser should not create the user: password null', async () => {

      const req = {
        body: { username: 'testuser3', email: 'test4@email.com', password: null},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await registerUser(req, res);
  
      //assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ status: 'Failed', 
      message: "Email, password and username cannot be empty"});

    });

    test('registerUser should not create the user: password empty', async () => {

      const req = {
        body: { username: 'testuser5', email: 'test5@email.com', password: ''},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await registerUser(req, res);
  
      //assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ status: 'Failed', 
      message: 'Email, password and username cannot be empty'});

    });
    
  });
