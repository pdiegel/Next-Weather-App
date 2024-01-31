"use client";

import WeatherCard from "@/components/WeatherCard";
import WeatherForecastCard from "@/components/WeatherForecastCard";
import { useState, useEffect, useCallback } from "react";
import { FindClosestData } from "@/helpers/WeatherFinder";
import PartlyCloudyImg from "@/public/weather-backgrounds/partly-cloudy.jpg";
import MostlyCloudyImg from "@/public/weather-backgrounds/mostly-cloudy.jpg";
import HeavyRainImg from "@/public/weather-backgrounds/heavy-rain.jpg";
import LightRainImg from "@/public/weather-backgrounds/light-rain.jpg";
import SunnyImg from "@/public/weather-backgrounds/sunny.jpg";
import MostlySunnyImg from "@/public/weather-backgrounds/mostly-sunny.jpg";
import PartlySunnyImg from "@/public/weather-backgrounds/partly-sunny.jpg";
import ScatteredSnowShowersImg from "@/public/weather-backgrounds/scattered-snow-showers.jpg";
import IndecisiveWeatherImg from "@/public/weather-backgrounds/indecisive.jpg";
import { WeatherMap, WeatherImageMap, Forecast } from "@/interfaces/weather";

const WEATHER_BACKGROUNDS: WeatherImageMap = {
  "Partly Cloudy": PartlyCloudyImg,
  "Mostly Cloudy": MostlyCloudyImg,
  "Heavy Rain": HeavyRainImg,
  "Sunny": SunnyImg,
  "Mostly Sunny": MostlySunnyImg,
  "Partly Sunny": PartlySunnyImg,
  "Mostly Cloudy then Scattered Snow Showers": ScatteredSnowShowersImg,
  "Scattered Snow Showers": ScatteredSnowShowersImg,
  "Rain then Drizzle Likely": HeavyRainImg,
  "Mostly Cloudy then Slight Chance Drizzle": MostlyCloudyImg,
  "Rain Likely": HeavyRainImg,
  "Chance Light Rain": LightRainImg,
  "Unknown": IndecisiveWeatherImg,
};

export default function Home() {
  const [weather, setWeather] = useState({} as WeatherMap);
  const [userPosition, setUserPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null as string | null);

  useEffect(() => {
    if (navigator.geolocation) {
      console.log(`Geolocation is supported!`);
      navigator.geolocation.getCurrentPosition((position) => {
        setUserPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log(`Geolocation is not supported!`);
    }
  }, []);

  useEffect(() => {
    if (!userPosition.latitude || !userPosition.longitude) {
      return;
    }

    fetch(`/api?lat=${userPosition.latitude}&long=${userPosition.longitude}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(
          `Fetching weather for: ${userPosition.latitude}, ${userPosition.longitude}`
        );
        console.log(data);
        if (Object.keys(data).length === 0) {
          console.log("Invalid response from weather API!");
          setError("Could not retrieve weather data!");
          setIsLoading(false);
          return;
        }
        setWeather(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error retrieving weather data!");
        console.log(err);
        setError("Error retrieving location data!");
      });
  }, [userPosition]);

  const UpdateWeather = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement> | React.FormEvent) => {
      setError(null);
      setIsLoading(true);
      if ("key" in e) e.preventDefault();
      console.log("Updating weather!");

      if (!location.trim()) {
        console.log("No location provided!");
        return;
      }

      fetch(`/location/api/?location=${location}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(`Fetching location: ${location}`);
          if (
            data.latitude === userPosition.latitude &&
            data.longitude === userPosition.longitude
          ) {
            console.log("Same location as current location!");
            setIsLoading(false);
            setError("Same location as current location!");
            return;
          }
          setUserPosition({
            latitude: data.latitude,
            longitude: data.longitude,
          });
        })
        .catch((err) => {
          console.log("Error retrieving location data!");
          console.log(err);
          setError("Error retrieving location data!");
          setIsLoading(false);
        });
    },
    [location, userPosition]
  );

  if (!weather || !weather.weather || !weather.forecasts) {
    console.log(weather);
    console.log("No weather data!");
    return <div></div>;
  }

  const handleUpdateWatherOnEnter = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      UpdateWeather(e);
    }
  };

  const handleUpdateWeatherOnClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    UpdateWeather(e);
  };

  const weatherForecast = FindClosestData(weather.forecasts, "startTime");

  let dailyForecast: Forecast[] = [];

  return (
    <div
      style={{
        backgroundImage:
          weatherForecast?.shortForecast &&
          Object.keys(WEATHER_BACKGROUNDS).includes(
            weatherForecast.shortForecast
          )
            ? `url(${WEATHER_BACKGROUNDS[weatherForecast.shortForecast].src})`
            : `url(${WEATHER_BACKGROUNDS["Unknown"].src})`,
      }}
      className="bg-div bg-cover bg-center bg-no-repeat bg-fixed"
    >
      <main className="p-4">
        <div className="bg-white/80 rounded p-4 mb-8 shadow-md">
          <label htmlFor="location-input">
            Enter a U.S. based location:
            <br />
          </label>
          <input
            type="text"
            id="location-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyUp={handleUpdateWatherOnEnter}
            className="shadow p-1 m-2 ml-0 w-1/2 rounded"
          />
          <button onClick={handleUpdateWeatherOnClick} className="base-btn">
            Get Weather
          </button>
          {error && <p className="">{error}</p>}
          {isLoading && <p className="">Loading...</p>}
        </div>
        <WeatherCard weather={weather} />
        <div className="bg-white/80 rounded p-4 my-8 shadow-md">
          <h2 className="text-2xl mb-4">Daily Forecasts</h2>
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-4">
            {weather.forecasts.map((forecast, index) => {
              dailyForecast.push(forecast);
              if (index % 2 !== 0) {
                const completeForecast = dailyForecast;
                dailyForecast = [];
                return (
                  <WeatherForecastCard
                    key={index}
                    weatherForecast={completeForecast}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </main>
      <footer className="bg-white/80 p-4 text-center shadow-md">
        <p>Created by Philip Diegel, 2024</p>
      </footer>
    </div>
  );
}
