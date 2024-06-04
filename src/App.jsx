import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
const key = '897a1b8d16758da0690e9765b605dfb4'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const success = (pos) => {
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []) 

  useEffect(() => {
    if (coords) {
      const {lat, lon} = coords
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
      axios.get(url)
        .then(res => {
          const kel = res.data.main.temp
          const cel = (kel - 273.15).toFixed(2)
          const fah = (cel * 9/5  + 32).toFixed(2)
          setTemp({cel: cel, fah: fah})
          setWeather(res.data)
        })
        .catch (err => console.log(err))
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false)
          })
        })     
    }
  }, [coords])

  return (
    <div className='app'>
      {isLoading?
          <figure className='app__img'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif" alt="is loading" />
          </figure>
          :
          <WeatherCard
            weather = {weather}
            temp = {temp}
          />
      }
    </div>
  )
}

export default App
