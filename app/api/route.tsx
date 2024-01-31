import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const latitude = req.nextUrl.searchParams.get("lat");
  const longitude = req.nextUrl.searchParams.get("long");

  const response = await fetch(
    `https://api.weather.gov/points/${latitude},${longitude}`,
    {
      headers: { "User-Agent": "weather-app" },
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    console.log("Invalid initial response from weather.gov!");
    return Response.json({});
  }
  const data = await response.json();
  const location = data?.properties?.relativeLocation?.properties;
  console.log(`Location: ${location?.city}, ${location?.state}`);

  const weatherResponse = await fetch(data?.properties?.forecast, {
    headers: { "User-Agent": "weather-app" },
    next: { revalidate: 3600 },
  });

  const rawWeatherResponse = await fetch(data?.properties?.forecastGridData, {
    headers: { "User-Agent": "weather-app" },
    next: { revalidate: 3600 },
  });

  if (!rawWeatherResponse.ok || !weatherResponse.ok) {
    console.log("Invalid raw or general weather response from weather.gov!");
    return Response.json({});
  }

  const weatherJson = await weatherResponse.json();
  const rawWeatherJson = await rawWeatherResponse.json();

  const weatherData = weatherJson?.properties;
  const weatherForecast = rawWeatherJson?.properties;

  return Response.json({
    location: `${location?.city}, ${location?.state}`,
    weather: weatherForecast,
    forecasts: weatherData?.periods,
  });
}
