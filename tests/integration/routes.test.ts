import { request } from "./helpers";

describe('API Routes', () => {

  describe('Create-index route', () => {
    it('should return positive response with 200 code', async () => {
      const {body: data} = await request.get('/create-index').expect(200);
      expect(data.message).toBe('Index file was created successfully!');
    });
  });

});