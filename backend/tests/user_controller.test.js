const {createUser} = require('../controllers/user_controller');

describe('User Creation', () => {
    test('createUser should create the user', async () => {

      const req = {
        body: { username: 'testuser', email: 'test@email.com', password: 'testpassword'},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createUser(req, res);
  
      //assertions
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ status: 'Success', message: 'User created successfully', data:{user: expect.any(Object)}});

    });

    test('createUser should not create the user: req body invalid', async () => {

      const req = {
        body: { email: 'test@email.com', password: 'testpassword'},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createUser(req, res);
  
      //assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ status: 'Failed', message: expect.stringMatching(/^User was not created/)});

    });
  });
