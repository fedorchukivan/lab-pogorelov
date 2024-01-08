import { Request, Response } from "express";
import config from "./config";
import { getFileNames, scanFile } from "./helpers";
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
                  ? req.query.dirname + '.json'
                  : config.files_dir_path;
  const files = getFileNames(config.files_loc + dirname);

  const filesJSON = JSON.stringify({files});
  const filenames = req.query.filenames
                  ? req.query.filenames + '.json'
                  : config.filenames_default;
  writeFile(config.files_loc + 'artifacts/' + filenames, filesJSON);

  let index = new IndexList();
  for (let i = 0; i < files.length; i++) {
    scanFile(index, files[i], i);
  }
  const indexJSON = JSON.stringify(index);
  const index_name = req.query.index
                  ? req.query.index + '.json'
                  : config.index_default;
  writeFile(config.files_loc + 'artifacts/' + index_name, indexJSON);
  res.status(200).send({ message: 'Index file was created successfully!' });
}

export function queryHandler(req: Request, res: Response) {
  console.log('Extracting index results for word ' + req.params.word);
}