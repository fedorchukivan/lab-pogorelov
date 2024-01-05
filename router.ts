import express, {Express, Request, Response} from "express";

const router = express.Router();

router.get('/create-index', (req: Request, res: Response) => {
  console.log('Index creating...');
});

router.get('/query/:word', (req: Request, res: Response) => {
  console.log('Extracting index results for word ' + req.params.word);
});

export default function useRouter(app: Express) {
  app.use(router);
}