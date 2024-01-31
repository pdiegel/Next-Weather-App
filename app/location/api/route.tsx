import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const location = req.nextUrl.searchParams.get("location");

  console.log(`Fetching location for: ${location}`);
  const response = await fetch(`https://geocode.maps.co/search?q=${location}`, {
    headers: { "User-Agent": "weather-app" },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    console.log("Invalid response from maps.co!");
    return Response.json({});
  }

  const data = await response.json();
  if (!data || !data.length) {
    console.log("Invalid response from maps.co!");
    return Response.json({});
  }
  const newLocation = data[0];
  console.log(`New Location: ${newLocation.lat}, ${newLocation.lon}`);

  return Response.json({
    latitude: newLocation.lat,
    longitude: newLocation.lon,
  });
}
