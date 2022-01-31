import express, { Request, Response, Application } from "express";
import path from "path";
import hbs from "hbs";

import { weatherController } from "./weather.controller";
import {config} from './config';

const app: Application = express();

// Define paths for Express config
const publicDirectoryPath: string = path.join(__dirname, "../public");
const viewsPath: string = path.join(__dirname, "../templates/views");
const partialsPath: string = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", weatherController.renderHome.bind(weatherController));
app.get("/about", weatherController.renderAbout.bind(weatherController));
app.get("/help", weatherController.renderHelp.bind(weatherController));
app.get("/weather", weatherController.getWeather.bind(weatherController));

app.get("/help/*", (req: Request, res: Response): void => {
  res.render("404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req: Request, res: Response): void => {
  res.render("404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Page not found.",
  });
});

const port = config.app.port;

app.listen(port, (): void => {
  console.log(`Server is up on port ${port}`);
});
