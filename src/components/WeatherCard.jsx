import React, { useState } from 'react'
import './styles/weatherCard.css'

const WeatherCard = ({weather, temp}) => {
    const [isCel, setIsCel] = useState(true)

    const handleTemp = () => {
        setIsCel(!isCel)
    }

    return (
        <div className='weatherCard'>
            <h1 className='weatherCard__title'>Weather app</h1>
            <h2 className='weatherCard__city'>{weather?.name}, {weather?.sys.country}</h2>
            <section className='weatherCard__body'> 
                <figure className='weatherCard__img'>
                    <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="weather image" />
                </figure>
                <article className='weatherCard__data'>
                    <h3 className='weatherCard__description'>"{weather?.weather[0].description}"</h3>
                    <ul className='weatherCard__list'>
                        <li className='weatherCard__item'><span>wind speed</span><span>{weather?.wind.speed} m/s</span></li>
                        <li className='weatherCard__item'><span>clouds</span><span>{weather?.clouds.all} %</span></li>
                        <li className='weatherCard__item'><span>pressure</span><span>{weather?.main.pressure} hPa</span></li>
                    </ul>
                </article>
            </section>
            <h2 className='weatherCard__temp'>
                {isCel ? 
                    temp?.cel + ' °C'
                    : 
                    temp?.fah + ' °F'
                } 
            </h2>
            <button className='weatherCard__btn' onClick={handleTemp}>
                Change to {isCel? '°F' : '°C'}
            </button>
        </div>
    )
}

export default WeatherCard