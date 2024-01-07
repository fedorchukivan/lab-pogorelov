import { get } from "./app";

const port = 5000;

get().listen(port, () => {
  console.log('Application server listening on port ' + port);
});