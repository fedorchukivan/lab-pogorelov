import { getFileNames, getWordCountsInFiles, scanFile, wordsToFormat } from "../../helpers";

describe('Index creation helpers', () => {
  const filenames = ['file1.txt', 'file2.txt', 'file3.txt'];

  describe('Reading file names', () => {
    it('should return correct filenames array', () => {
      const names = getFileNames();
      expect(names).toEqual(filenames);
    });
  });

  describe('Words formatting', () => {
    const res = ['abc', 'abc', 'abc'];
    const punctuationInWords = [',abc', 'abc!', 'abc.'];
    const uppercaseInWords = ['Abc', 'aBc', 'ABC'];
    const nonLettersWords = ['abc', 'abc', 'abc', '\"!\"'];
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
    let index: any[] = [];
    it('should add objects to index array', () => {
      index = scanFile(index, 'file1.txt', 0);
      expect(index.length).toBeGreaterThan(0);
    });
    it('should add words in alphabetic order', () => {
      expect(index.length).toBe(3);
      expect(index[0]?.word).toBe('chamber');
      expect(index[2]?.word).toBe('talking');
    });
    it('should add correct counts of words to index', () => {
      expect(index.length).toBe(3);
      expect(index[0]?.freq[0]).toBe(3);
    });
    it('should correctly process more than one file', () => {
      index = scanFile(index, 'file2.txt', 1);
      expect(index.length).toBe(5);
      expect(index[0]?.word).toBe('chamber');
      expect(index[4]?.word).toBe('talking');
      expect(index[0]?.freq.length).toBe(2);
      expect(index[0]?.freq[1]).toBe(1);
    });
  });
});

describe('Query helpers', () => {
  describe('Getting word counts', () => {
    it('should return correct amount of files', () => {
      expect(getWordCountsInFiles('chamber').length).toBe(3);
      expect(getWordCountsInFiles('find').length).toBe(1);
    });
    it('should return appropriate file and counts for word', () => {
      const res = getWordCountsInFiles('chamber');
      expect(res[0].file).toBe('file1.txt');
      expect(res[0].counts).toBe(3);
    });
  });
});