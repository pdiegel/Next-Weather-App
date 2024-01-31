import Image from 'next/image';
import { getFormattedDate } from '@/helpers/DateFuncs';

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function WeatherForecastCard({ weatherForecast }) {
    if (!weatherForecast) {
        return (<div></div>);
    }

    const earlyForecast = weatherForecast[0];
    const nightForecast = weatherForecast[1];

    const today = new Date().getDay();
    const chanceToRain = earlyForecast.probabilityOfPrecipitation.value;
    const forecastTimeframe = earlyForecast.name;

    // Ensure the forecast timeframe is a weekday (not "Today" or "Tonight", etc.)
    const day = WEEKDAYS.includes(forecastTimeframe) ? forecastTimeframe : WEEKDAYS[today]

    const date = getFormattedDate(new Date(earlyForecast.startTime));


    return (
        <div className="basis-1/3 min-w-1/3 flex-auto text-center flex flex-col items-center bg-white/40 rounded shadow-md p-2 md:basis-1/4 md:min-w-1/4">
            <p>{day} ({date})</p>
            <Image src={`${earlyForecast.icon}`} alt={`${earlyForecast.shortForecast}-icon`} height={75} width={75} />
            <p>
                {earlyForecast.shortForecast}
                <br />
                <span className='text-xl'>H: {earlyForecast.temperature}°</span>
                <br />
                <span className='text-xl'>L: {nightForecast.temperature}°</span>
                <br />
                Rain: {chanceToRain ? chanceToRain : '0'}%
            </p>
        </div>
    );



};