import config from "../../config";
import { request } from "./helpers";
import fs from "fs";

describe('API Routes', () => {

  describe('Create-index route', () => {
    it('should return positive response with 200 code', async () => {
      const {body: data} = await request.get('/create-index?filenames=test-filenames&index=test-index').expect(200);
      expect(data.message).toBe('Index file test-index.json was created successfully! Filenames are stored in test-filenames.json file.');
    });
    it('should add relevant files to artifacts directory', () => {
      const files = fs.readdirSync(config.files_loc + 'artifacts');
      expect(files).toContain('test-filenames.json');
      expect(files).toContain('test-index.json');
    });
    it('should have appropriate content in resulting files', () => {
      const buff = fs.readFileSync(config.files_loc + 'artifacts/test-filenames.json').toString();
      const files = JSON.parse(buff);
      expect(files.files).toEqual(['file1.txt', 'file2.txt', 'file3.txt']);
      const index_buff = fs.readFileSync(config.files_loc + 'artifacts/test-index.json').toString();
      const index = JSON.parse(index_buff);
      expect(index[0]).toEqual({ word: 'chamber', freq: [3,1,1] });
      expect(index[5]).toEqual({ word: 'talking', freq: [1] });
    });
    it('should return 409 code if directory doesn\'t exist', async () => {
      await request.get('/create-index?dirname=non_existing_directory').expect(409);
    });
  });

  describe('Query route', () => {
    it('should return correct data with 200 code', async () => {
      const {body: data} = await request.get('/query?word=talking&index=test-index').expect(200);
      expect(data.length).toBe(1);
      expect(data).toEqual([{ file: 'file1.txt', counts: 1 }]);
    });
    it('should return 400 code when word for query isn\'t specified', async () => {
      await request.get('/query').expect(400);
    });
    it('should return 409 code if index file or filenames doesn\'t exist', async () => {
      await request.get('/query?word=a&filenames=qqqqq').expect(409);
      await request.get('/query?word=a&index=qqqqq').expect(409);
    });
  });
});