import config from "../../config";
import { getFileNames, getWordCountsInFiles, scanFile, wordsToFormat } from "../../helpers";
import { IndexList } from "../../linked-list";

describe('Index creation helpers', () => {
  const filenames = ['file1.txt', 'file2.txt', 'file3.txt'];

  describe('Reading file names', () => {
    it('should return correct filenames array', () => {
      const names = getFileNames(config.files_loc + config.files_dir_path);
      expect(names).toEqual(filenames);
    });
  });

  describe('Words formatting', () => {
    const res = ['a1bc', 'abc2', 'abc'];
    const punctuationInWords = [',a1bc', 'abc2!', 'abc.'];
    const uppercaseInWords = ['A1bc', 'aBc2', 'ABC'];
    const nonLettersWords = ['a1bc', 'abc2', 'abc', '\"!\"'];
    it('should remove punctuation characters', () => {
      const words = wordsToFormat(punctuationInWords);
      expect(words).toEqual(res);
    });
    it('should change uppercase letters to lowercase', () => {
      const words = wordsToFormat(uppercaseInWords);
      expect(words).toEqual(res);
    });
    it('should remove non letter sign combinations', () => {
      const words = wordsToFormat(nonLettersWords);
      expect(words).toEqual(res);
    });
  });

  describe('File scanning', () => {
    let index = new IndexList();
    it('should add objects to index array', () => {
      index = scanFile(index, 'file1.txt', 0);
      expect(index.size()).toBeGreaterThan(0);
    });
    it('should add correct counts of words to index', () => {
      expect(index.size()).toBe(3);
      expect(index.getWordFreq('chamber')[0]).toBe(3);
    });
    it('should correctly process more than one file', () => {
      index = scanFile(index, 'file2.txt', 1);
      expect(index.size()).toBe(5);
      expect(index.getWordFreq('chamber').length).toBe(2);
      expect(index.getWordFreq('chamber')[1]).toBe(1);
    });
  });
});

describe('Query helpers', () => {
  describe('Getting word counts', () => {
    it('should return correct amount of files', () => {
      const case1 = getWordCountsInFiles('chamber', 'test-index.json', 'test-filenames.json');
      const case2 = getWordCountsInFiles('find', 'test-index.json', 'test-filenames.json');
      expect(case1).not.toBe(null);
      expect(case2).not.toBe(null);
      if (case1 !== null) expect(case1.length).toBe(3);
      if (case2 !== null) expect(case2.length).toBe(1);
    });
    it('should return appropriate file and counts for word', () => {
      const res = getWordCountsInFiles('chamber', 'test-index.json', 'test-filenames.json');
      expect(res).not.toBe(null);
      if (res !== null) {
        expect(res[0].file).toBe('file1.txt');
        expect(res[0].counts).toBe(3);
      }
    });
    it('should return empty array if word isn\'t presented in files', () => {
      const res = getWordCountsInFiles('aaaaaa', 'test-index.json', 'test-filenames.json');
      expect(res).toEqual([]);
    });
  });
});