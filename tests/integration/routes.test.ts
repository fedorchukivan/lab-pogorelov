import config from "../../config";
import { request } from "./helpers";
import fs from "fs";

describe('API Routes', () => {

  describe('Create-index route', () => {
    it('should return positive response with 200 code', async () => {
      const {body: data} = await request.get('/create-index?filenames=test-filenames&index=test-index').expect(200);
      expect(data.message).toBe('Index file was created successfully!');
    });
    it('should add relevant files to artifacts directory', () => {
      const files = fs.readdirSync(config.files_loc + 'artifacts');
      expect(files).toContain(['filenames.json', 'test-index.json']);
    });
    it('should have appropriate content in resulting files', () => {
      const buff = fs.readFileSync(config.files_loc + 'artifacts/test-filenames.json').toString();
      const files = JSON.parse(buff);
      expect(files.files).toEqual(['file1.txt', 'file2.txt', 'file3.txt']);
    });
  });

});