import { StaticImageData } from "next/image";

export interface WeatherMap {
  location: string;
  weather: Weather;
  forecasts: Forecast[];
}

export interface Forecast {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: TemperatureUnit;
  temperatureTrend: null | string;
  probabilityOfPrecipitation: Elevation;
  dewpoint: Elevation;
  relativeHumidity: Elevation;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

export interface Elevation {
  unitCode: UnitCode;
  value: number | null;
}

export enum UnitCode {
  WmoUnitDegC = "wmoUnit:degC",
  WmoUnitKM = "wmoUnit:km",
  WmoUnitM = "wmoUnit:m",
  WmoUnitPercent = "wmoUnit:percent",
}

export enum TemperatureUnit {
  F = "F",
}

export interface Weather {
  "@id": string;
  "@type": string;
  updateTime: string;
  validTimes: string;
  elevation: Elevation;
  forecastOffice: string;
  gridId: string;
  gridX: string;
  gridY: string;
  temperature: TartuGecko;
  dewpoint: TartuGecko;
  maxTemperature: TartuGecko;
  minTemperature: TartuGecko;
  relativeHumidity: TartuGecko;
  apparentTemperature: TartuGecko;
  wetBulbGlobeTemperature: TartuGecko;
  heatIndex: TartuGecko;
  windChill: TartuGecko;
  skyCover: TartuGecko;
  windDirection: TartuGecko;
  windSpeed: TartuGecko;
  windGust: TartuGecko;
  weather: LivingstoneSouthernWhiteFacedOwl;
  hazards: LivingstoneSouthernWhiteFacedOwl;
  probabilityOfPrecipitation: TartuGecko;
  quantitativePrecipitation: TartuGecko;
  iceAccumulation: LivingstoneSouthernWhiteFacedOwl;
  snowfallAmount: LivingstoneSouthernWhiteFacedOwl;
  snowLevel: LivingstoneSouthernWhiteFacedOwl;
  ceilingHeight: TartuGecko;
  visibility: TartuGecko;
  transportWindSpeed: TartuGecko;
  transportWindDirection: TartuGecko;
  mixingHeight: TartuGecko;
  hainesIndex: LivingstoneSouthernWhiteFacedOwl;
  lightningActivityLevel: LivingstoneSouthernWhiteFacedOwl;
  twentyFootWindSpeed: TartuGecko;
  twentyFootWindDirection: TartuGecko;
  waveHeight: TartuGecko;
  wavePeriod: TartuGecko;
  waveDirection: LivingstoneSouthernWhiteFacedOwl;
  primarySwellHeight: TartuGecko;
  primarySwellDirection: TartuGecko;
  secondarySwellHeight: LivingstoneSouthernWhiteFacedOwl;
  secondarySwellDirection: LivingstoneSouthernWhiteFacedOwl;
  wavePeriod2: LivingstoneSouthernWhiteFacedOwl;
  windWaveHeight: LivingstoneSouthernWhiteFacedOwl;
  dispersionIndex: LivingstoneSouthernWhiteFacedOwl;
  pressure: LivingstoneSouthernWhiteFacedOwl;
  probabilityOfTropicalStormWinds: LivingstoneSouthernWhiteFacedOwl;
  probabilityOfHurricaneWinds: LivingstoneSouthernWhiteFacedOwl;
  potentialOf15mphWinds: LivingstoneSouthernWhiteFacedOwl;
  potentialOf25mphWinds: LivingstoneSouthernWhiteFacedOwl;
  potentialOf35mphWinds: LivingstoneSouthernWhiteFacedOwl;
  potentialOf45mphWinds: LivingstoneSouthernWhiteFacedOwl;
  potentialOf20mphWindGusts: LivingstoneSouthernWhiteFacedOwl;
  potentialOf30mphWindGusts: LivingstoneSouthernWhiteFacedOwl;
  potentialOf40mphWindGusts: LivingstoneSouthernWhiteFacedOwl;
  potentialOf50mphWindGusts: LivingstoneSouthernWhiteFacedOwl;
  potentialOf60mphWindGusts: LivingstoneSouthernWhiteFacedOwl;
  grasslandFireDangerIndex: LivingstoneSouthernWhiteFacedOwl;
  probabilityOfThunder: LivingstoneSouthernWhiteFacedOwl;
  davisStabilityIndex: LivingstoneSouthernWhiteFacedOwl;
  atmosphericDispersionIndex: LivingstoneSouthernWhiteFacedOwl;
  lowVisibilityOccurrenceRiskIndex: LivingstoneSouthernWhiteFacedOwl;
  stability: LivingstoneSouthernWhiteFacedOwl;
  redFlagThreatIndex: LivingstoneSouthernWhiteFacedOwl;
}

export interface TartuGecko {
  uom: string;
  values: PurpleValue[];
}

export interface PurpleValue {
  validTime: string;
  value: ValueValueClass[] | number | null;
}

export interface ValueValueClass {
  coverage: null | string;
  weather: null | string;
  intensity: null | string;
  visibility: Elevation;
  attributes: any[];
}

export interface LivingstoneSouthernWhiteFacedOwl {
  values: PurpleValue[];
}

export interface WeatherImageMap {
  [key: string]: StaticImageData;
}
