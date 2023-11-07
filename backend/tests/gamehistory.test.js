const {registerUser,
    addGameToHistory, 
    //removeGameFromHistory,
    //clearGameHistory,
    //retrieveGameHistory,
    //deleteUser
} = require('../controllers/user_controller');

const httpMocks = require('node-mocks-http');

const {createGame} = require('../controllers/game_controller');

describe('Add Game to Game History', () => {
    test('add valid game to game history', async () => {
          
          const req = httpMocks.createRequest();
          req.body = { username: 'testuser', email: 'test@email.com', password: 'testpassword'};
          const res = httpMocks.createResponse();
          await registerUser(req, res); // create user


          const req_game = httpMocks.createRequest();
          req_game.body = { game_name: 'testgame', game_creator: 'testcreator', game_type: 'Action'};
          const res_game = httpMocks.createResponse();
          await createGame(req_game, res_game); // create game
    

          const req_history = {
            body: { username: 'testuser', game_name: 'testgame'},
          };
          const res_history = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };

          await addGameToHistory(req_history, res_history); // add game to user history
        //assertions
        expect(res_history.status).toHaveBeenCalledWith(200);
        expect(res_history.json).toHaveBeenCalledWith({ 
            status: 'Success', 
            message: 'Game added to history successfully.'});
  
      });

      test('add game that does not exist to game history', async () => {
          
        const req = httpMocks.createRequest();
        req.body = { username: 'testuser', email: 'test@email.com', password: 'testpassword'};
        const res = httpMocks.createResponse();
        await registerUser(req, res); // create user

        const req_history = {
          body: { username: 'testuser', game_name: 'invalid game'},
        };
        const res_history = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };

        await addGameToHistory(req_history, res_history); // add game to user history
      //assertions
      expect(res_history.status).toHaveBeenCalledWith(404);
      expect(res_history.json).toHaveBeenCalledWith({ 
          status: 'Failed', 
          message: 'Game not found.'});

    });

    test('add game to user that does not exist to game history', async () => {
          
        const req_game = httpMocks.createRequest();
        req_game.body = { game_name: 'testgame', game_creator: 'testcreator', game_type: 'Action'};
        const res_game = httpMocks.createResponse();
        await createGame(req_game, res_game); // create game

        const req_history = {
          body: { username: 'invalid user', game_name: 'testgame'},
        };
        const res_history = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };

        await addGameToHistory(req_history, res_history); // add game to user history
      //assertions
      expect(res_history.status).toHaveBeenCalledWith(404);
      expect(res_history.json).toHaveBeenCalledWith({ 
          status: 'Failed', 
          message: 'User not found.'});

    });
    
});

describe('Remove Game from Game History', () => {
    
});

describe('Clear Game History', () => {
    
});

describe('Get Game History', () => {
    
});