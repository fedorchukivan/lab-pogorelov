import path from "path";
import config from "./config";
import fs from 'fs';

export function getFileNames() {
  const buff = fs.readFileSync(path.resolve(String(config.filenames_path)), 'utf-8');
  return JSON.parse(buff).files;
}

export function scanFile(index: any[], filename: string, file_position: number) {
  return index;
}

export function wordsToFormat(words: string[]) {
  return [''];
}

export function getWordCountsInFiles(word: string) {
  return [{file: '', counts: 0}, {file: '', counts: 0}];
}