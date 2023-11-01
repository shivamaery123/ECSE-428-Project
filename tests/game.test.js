const game_controller = require("../../backend/controllers/game_controller");
const service = require('../../backend/services/game_services');
const sinon = require('sinon');
  
  const flushPromises = () => new Promise(setImmediate);
  
  describe('62536251', () => {
    afterEach(() => {
      sinon.restore();
    });
    it('should create', async () => {
      const mResult = 'success';
      sinon.stub(service, 'create').resolves(mResult);
      const mReq = { body: 
        { game_name: "testGame", 
        game_creator: "Myself", 
        game_type: "Action"
        } };

      const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
      game_controller.create(mReq, mReply);
      await flushPromises();


      sinon.assert.calledWith(status, 'Success');
      sinon.assert.calledWith(message, "Game created successfully");
      sinon.assert.calledWith(data, "Game created successfully");
    });
  
    it('should handle error', async () => {
      const mError = new Error('network');
      sinon.stub(service, 'create').rejects(mError);
      const mReq = { body: {} };
      const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
      game_controller.create(mReq, mReply);
      await flushPromises();
      sinon.assert.calledWith(mReply.send, mError);
    });
  });