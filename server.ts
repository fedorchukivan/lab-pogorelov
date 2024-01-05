import express from "express";
import useRouter from "./router";

const app = express();
const port = 5000;

useRouter(app);

app.listen(port, () => {
  console.log('Application server listening on port ' + port);
});