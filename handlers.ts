import { Request, Response } from "express";
import config from "./config";

export function indexCreationHandler(req: Request, res: Response) {
  console.log('Index creating for files from ' + config.files_dir_path + ' directory');
}

export function queryHandler(req: Request, res: Response) {
  console.log('Extracting index results for word ' + req.params.word);
}