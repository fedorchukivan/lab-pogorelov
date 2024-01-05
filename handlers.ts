import { Request, Response } from "express";

export function indexCreationHandler(req: Request, res: Response) {
  console.log('Index creating...');
}

export function queryHandler(req: Request, res: Response) {
  console.log('Extracting index results for word ' + req.params.word);
}