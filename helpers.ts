import { IndexList } from "./linked-list";
import config from "./config";
import fs from 'fs';

export function getFileNames(dirname: string) {
  const filenames = fs.readdirSync(dirname);
  return filenames;
}

export function scanFile(index: IndexList, filename: string, file_position: number) {
  const text = fs.readFileSync(config.files_loc + config.files_dir_path + '/' + filename);
  const words = wordsToFormat(text.toString().split(' '));
  for (const word of words) {
    index.incrementWord(word, file_position);
  }
  return index;
}

function leaveOnlyLetters(word: string) {
  return word.match(/[A-Za-z0-9]/g)?.join('');
}

export function wordsToFormat(words: string[]) {
  const res = words
                .map(w => leaveOnlyLetters(w))
                .filter(w => w !== undefined);
  return res.map(w => String(w).toLowerCase());
}

export function getWordCountsInFiles(word: string, index: string, filenames: string) {
  return [{file: '', counts: 0}, {file: '', counts: 0}];
}