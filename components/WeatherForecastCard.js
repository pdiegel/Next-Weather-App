import Image from 'next/image';

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



    return (
        <div className="basis-1/3 flex-1 text-center flex flex-col justify-center items-center bg-white rounded shadow-md p-2">
            <p className='text-xl'>{day}</p>
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