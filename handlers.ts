import { Request, Response } from "express";
import config from "./config";
import { getFileNames, scanFile } from "./helpers";
import { IndexList } from "./linked-list";
import fs from 'fs';
import path from "path";

export function indexCreationHandler(req: Request, res: Response) {
  let dirname = config.files_loc;
  dirname += req.query.dirname ? req.query.dirname : config.files_dir_path;
  const files = getFileNames(dirname);
  let index = new IndexList();
  for (let i = 0; i < files.length; i++) {
    scanFile(index, files[i], i);
  }
  const indexJSON = JSON.stringify(index);
  let index_path = config.files_loc;
  index_path += req.query.index ? req.query.index : config.index_default;
  fs.writeFileSync(path.resolve(index_path), indexJSON);
  res.status(200).send({ message: 'Index file was created successfully!' });
}

export function queryHandler(req: Request, res: Response) {
  console.log('Extracting index results for word ' + req.params.word);
}