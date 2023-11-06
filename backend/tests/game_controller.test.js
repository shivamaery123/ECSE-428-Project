const { createGame, get_all_games, get_game } = require('../controllers/game_controller');

describe('Game Creation', () => {
    test('createGame should create the game', async () => {

      const req = {
        body: { game_name: 'testgame', game_creator: 'testcreator', game_type: 'Action'},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createGame(req, res);
  
      //assertions
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ status: 'Success', message: 'Game created successfully', data:{game: expect.any(Object)}});

    });

    test('createGame should not create the game: req body invalid', async () => {

      const req = {
        body: { game_creator: 'testcreator', game_type: 'Action'},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createGame(req, res);
  
      //assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ status: 'Failed', message: expect.stringMatching(/^Game was not created/)});

    });

    test('createGame should not create the game: game_name null', async () => {

      const req = {
        body: { game_name: null, game_creator: 'testcreator', game_type: 'Action'},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createGame(req, res);
  
      //assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ status: 'Failed', message: expect.stringMatching(/^Game was not created/)});

    });

    test('createGame should not create the game: game_creator null', async () => {

      const req = {
        body: { game_name: 'testgame', game_creator: null, game_type: 'Action'},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createGame(req, res);
  
      //assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ status: 'Failed', message: expect.stringMatching(/^Game was not created/)});

    });
    
});


describe('Game Retrieval', () => {
    test('getGame should get the game by game_name', async () => {

      const req = {
        body: { game_name: 'testgame', game_creator: 'testcreator', game_type: 'Action'},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createGame(req, res);

      const req_get = {
        body: { game_name: 'testgame'},
      };
      const res_get = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await get_game(req_get, res_get);
  
      //assertions
      expect(res_get.status).toHaveBeenCalledWith(201);
      //expect(res_get.json.status).toHaveBeenCalledWith('Success');
      //expect(res_get.json.message).toHaveBeenCalledWith('Game retrieved successfully.');

    });

      test('invalid query for getGame', async () => {

        const req = {
          body: { game_name: 'testgame', game_creator: 'testcreator', game_type: 'Action'},
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    
        await createGame(req, res);
  
        const req_get = {
          body: { inv_query: "test"},
        };
        const res_get = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        await get_game(req_get, res_get);
    
        //assertions
        expect(res_get.status).toHaveBeenCalledWith(400);
        expect(res_get.json).toHaveBeenCalledWith({ 
          status: 'Failed', 
          message: 'Game was not successfuly fetched, Error: Invalid query'});
      });
      
      test('getGame that does not exists', async () => {
  
        const req_get = {
          body: { game_name: "test"},
        };
        const res_get = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        await get_game(req_get, res_get);
    
        //assertions
        expect(res_get.status).toHaveBeenCalledWith(404);
        expect(res_get.json).toHaveBeenCalledWith({ 
          status: 'Failed', 
          message: 'Game does not exist.'});
      });
    
});