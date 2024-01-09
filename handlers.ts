import { Request, Response } from "express";
import config from "./config";
import { getFileNames, getWordCountsInFiles, scanFile } from "./helpers";
import { IndexList } from "./linked-list";
import fs from 'fs';
import path from 'path';

function writeFile(_path: string, contents: string) {
  fs.mkdir(path.dirname(_path), { recursive: true }, () => {
    fs.writeFileSync(_path, contents);
  });
}

export function indexCreationHandler(req: Request, res: Response) {
  const dirname = req.query.dirname
                  ? req.query.dirname
                  : config.files_dir_path;
  const dir_path = config.files_loc + dirname;
  if (!fs.existsSync(dir_path)) {
    res.statusMessage = `Directory with '${dirname}' don't exist.`;
    res.sendStatus(409);
    return;
  }
  const files = getFileNames(dir_path);

  const filesJSON = JSON.stringify({files}, null, 2);
  const filenames = req.query.filenames
                  ? req.query.filenames + '.json'
                  : config.filenames_default;
  writeFile(config.files_loc + 'artifacts/' + filenames, filesJSON);

  let index = new IndexList();
  for (let i = 0; i < files.length; i++) {
    scanFile(index, files[i], i);
  }
  const indexJSON = JSON.stringify(index.serialize(), null, 2);
  const index_name = req.query.index
                  ? req.query.index + '.json'
                  : config.index_default;
  writeFile(config.files_loc + 'artifacts/' + index_name, indexJSON);
  res.status(200).send({ message: `Index file ${index_name} was created successfully! Filenames are stored in ${filenames} file.` });
}

export function queryHandler(req: Request, res: Response) {
  if (!req.query.word) {
    res.statusMessage = "Word for performing query was not found!";
    res.sendStatus(400);
    return;
  }
  const word = String(req.query.word);
  const filenames = req.query.filenames
                  ? req.query.filenames + '.json'
                  : config.filenames_default;
  const index_name = req.query.index
                  ? req.query.index + '.json'
                  : config.index_default;
  const queryResult = getWordCountsInFiles(word, index_name, filenames);

  if (queryResult) {
    res.status(200).send(queryResult);
  }
  else {
    res.statusMessage = 'Filenames or index file with such name doesn\'t exist in system.'
    res.sendStatus(409);
  }
}