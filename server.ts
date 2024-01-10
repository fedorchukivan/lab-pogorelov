import { get } from "./app";
import config from "./config";

const port = config.port;

get().listen(port, () => {
  console.log('Application server listening on port ' + port);
});