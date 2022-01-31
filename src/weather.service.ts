import axios from "axios";
import type { Axios } from "axios";
import { config } from "./config";

export class WeatherService {
  constructor(private axiosInstance: Axios) {}

  public async getWeather(address: string): Promise<any> { // TODO replace any with defined interface
    const { latitude, longitude, location } = await this.getGeocodingData(
      address
    );

    const forecast = await this.getForecastMsg(latitude, longitude);

    return {
      forecast,
      location,
    };
  }

  private async getGeocodingData(address: string): Promise<any> { // TODO replace any with defined interface
    const encodedAddress = encodeURIComponent(address);
    const { accessToken, host } = config.weather.geoCoding;
    const url = `${host}/geocoding/v5/mapbox.places/${encodedAddress}.json`;

    const { data } = await this.axiosInstance.get(url, {
      params: {
        access_token: accessToken,
        limit: 1,
      },
    });

    const [features] = data.features;
    const [longitude, latitude] = features.center;
    const location = features.place_name;

    return {
      latitude,
      longitude,
      location,
    };
  }

  private async getForecastMsg(latitude: number, longitude: number): Promise<string> {
    const { accessToken, host } = config.weather.forecast;

    const url = `${host}/current`;

    const { data } = await this.axiosInstance.get(url, {
      params: {
        access_key: accessToken,
        query: `${longitude},${latitude}`,
      },
    });

    const { temperature, weather_descriptions } = data.current;

    return `${weather_descriptions[0]}. It is currently ${temperature} degrees out."`;
  }
}

export const weatherService = new WeatherService(axios);
