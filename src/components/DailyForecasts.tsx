import type { ForecastResponse, DailyForecast } from '../types/Forecast';
import type { UnitOption } from '../types/UnitOptions';
import { motion } from 'framer-motion';

type Forecasts = {
    weatherData: ForecastResponse;
    units: UnitOption;
    dailyForecasts: DailyForecast[];
};

const DailyForecasts = ({ weatherData, units, dailyForecasts }: Forecasts) => {
  return (
    <div className='daily-forecasts'>
        <div className='current-forecast'>
            <motion.h3
              key={units}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Current Temp: {Math.round(weatherData.list[0].main.temp)}°{units === 'metric' ? 'C' : 'F'}
            </motion.h3>
            <p>{weatherData.list[0].weather[0].description}</p>
        </div>

      <h3 style={{ marginTop: '1rem' }}>Forecast for the next few days:</h3>
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
        className='daily-forecast-list'>
        {dailyForecasts.map((day) => (
          <motion.li
            key={day.date}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            >
            {new Date(day.date).toLocaleDateString()}: {day.temp}°
            {units === 'metric' ? 'C' : 'F'} – {day.description}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}

export default DailyForecasts;