import { Request, Response } from "express";

import { weatherService } from "./weather.service";
import type { WeatherService } from "./weather.service";

class WeatherController {
  constructor(private weatherService: WeatherService) {}

  public renderHome(req: Request, res: Response): void {
    res.render("index", {
      title: "Weather",
      name: "Vlad Zazhyrko",
    });
  }

  public renderAbout(req: Request, res: Response): void {
    res.render("about", {
      title: "About Me",
      name: "Vlad Zazhyrko",
    });
  }

  public renderHelp(req: Request, res: Response): void {
    res.render("help", {
      helpText: "This is some helpful text.",
      title: "Help",
      name: "Vlad Zazhyrko",
    });
  }

  public async getWeather(req: Request, res: Response): Promise<void> {
    const { address } = req.query;

    if (!address) {
      res.send({
        error: "You must provide address",
      });

      return;
    }

    const weatherData = await this.weatherService.getWeather(address as string);

    res.send({
      ...weatherData,
      address
    });
  }
}

export const weatherController = new WeatherController(weatherService);
