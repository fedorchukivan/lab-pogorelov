import { Request, Response } from "express";
import config from "./config";
import { getFileNames, scanFile } from "./helpers";
import { IndexList } from "./linked-list";
import fs from 'fs';
import path from "path";

export function indexCreationHandler(req: Request, res: Response) {
  const files = getFileNames();
  let index = new IndexList();
  for (let i = 0; i < files.length; i++) {
    scanFile(index, files[i], i);
  }
  const indexJSON = JSON.stringify(index);
  fs.writeFileSync(path.resolve(config.index_path), indexJSON);
  res.status(200).send('Index file was created successfully!');
}

export function queryHandler(req: Request, res: Response) {
  console.log('Extracting index results for word ' + req.params.word);
}