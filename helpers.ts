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

export function getWordCountsInFiles(word: string, index: string, filenames: string): any[] | null {
  const files_path = config.files_loc + 'artifacts/' + filenames;
  if (!fs.existsSync(files_path)) {
    return null;
  }
  const files_buff = fs.readFileSync(files_path).toString();
  const files: string[] = JSON.parse(files_buff).files;
  
  const index_path = config.files_loc + 'artifacts/' + index;
  if (!fs.existsSync(index_path)) {
    return null;
  }
  const index_buff = fs.readFileSync(index_path).toString();
  const index_arr: any[] = JSON.parse(index_buff);
  const word_value = index_arr.find(w => w.word === word)
  const freq: number[] = word_value ? word_value.freq : [];
  const res: any[] = [];
  for (const i in freq) {
    if (freq[i] > 0) res.push({ file: files[i], counts: freq[i] });
  }
  return res;
}