import { IndexList } from "./linked-list";
import path from "path";
import config from "./config";
import fs from 'fs';

export function getFileNames() {
  const buff = fs.readFileSync(path.resolve(config.filenames_path), 'utf-8');
  return JSON.parse(buff).files;
}

export function scanFile(index: IndexList, filename: string, file_position: number) {
  const text = fs.readFileSync(path.resolve(config.files_dir_path, filename));
  const words = wordsToFormat(text.toString().split(' '));
  for (const word of words) {
    index.incrementWord(word, file_position);
  }
  return index;
}

function leaveOnlyLetters(word: string) {
  return word.match(/[A-Za-z]/g)?.join('');
}

export function wordsToFormat(words: string[]) {
  const res = words
                .map(w => leaveOnlyLetters(w))
                .filter(w => w !== undefined);
  return res.map(w => String(w).toLowerCase());
}

export function getWordCountsInFiles(word: string) {
  return [{file: '', counts: 0}, {file: '', counts: 0}];
}