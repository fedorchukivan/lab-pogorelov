import express, {Express} from "express";
import { indexCreationHandler, queryHandler } from "./handlers";

const router = express.Router();

router.get('/create-index', indexCreationHandler);

router.get('/query/:word', queryHandler);

export default function useRouter(app: Express) {
  app.use(router);
}