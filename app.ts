import express from "express";
import useRouter from "./router";

const app = express();

useRouter(app);

export function get() {
  return app;
};