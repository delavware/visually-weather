import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header.jsx'
import Temperature from './Temperature.jsx'
import axios from 'axios'
import { getCode, getName } from 'country-list'

function App() {

  const [coords, setCoords] = useState([])
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [location, setLocation] = useState('')

 

  const success = (position) => {
    const currentCoords = {
      lat: position.coords.latitude,
      long: position.coords.longitude
    }
    setCoords(currentCoords)
  }

  const error = (err) => {
    alert('You must enable geolocation to use Visually Weather. On mobile, enable location. Please, refresh the site and accept.')
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error)
  }, [])

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL
    const API_KEY = import.meta.env.VITE_API_KEY
    const BASE_URL = `${API_URL}lat=${coords.lat}&lon=${coords.long}&appid=${API_KEY}`
    axios
    .get(BASE_URL)
    .then(res => {
      setWeather(res.data)
      const cel = (res.data.main.temp - 273.15).toFixed(1)
      const far = (cel *  (9/5) + 32).toFixed(1)
      const newTemp = {
        cel,
        far
      }
      setTemp(newTemp)

    })
    .catch(err => console.log(err))
  }, [coords])


   const searchLocation = e => {
    const API_URL = import.meta.env.VITE_API_URL
    const API_KEY = import.meta.env.VITE_API_KEY
    const SEARCH_URL = `${API_URL}q=${location}&appid=${API_KEY}`
    if (e.key === 'Enter') {
      axios.get(SEARCH_URL)
      .then(res => {
        setWeather(res.data)
        const cel = (res.data.main.temp - 273.15).toFixed(1)
        const far = (cel *  (9/5) + 32).toFixed(1)
        const newTemp = {
          cel,
          far
        }
        setTemp(newTemp)
       console.log(res.data)
    }).catch (err => {
      console.log(err)
    })
    }
  }



  if(!weather) return <img src="/img/loader/loading.gif" alt="" />

  return (
    <div className="App h-screen bg-city bg-cover object-cover" >
      <div className=" h-[70%] bg-gradient-to-t from-black/60 lg:h-[100%]">
        <Header />
        <main>
          <section>
            <article className='h-screen txt-main-color grid grid-cols-1 grid-rows-[0.5fr_1fr] lg:grid-cols-12 lg:grid-rows-[2fr_1fr_1.5fr_2fr] gap-5 '>
              <div className='mt-[60px] lg:row-start-2 lg:col-[3_/span_4] lg:mt-[0px]'>
                <Temperature weather={weather} temp={temp}/>
              </div>
              <div className='bg-gradient-to-b from-[#3459D8] to-[#067B8B] rounded-t-[80px] lg:row-start-2 lg:row-end-4 lg:col-[7_/span_4] lg:rounded-[60px] lg:max-h-[400px] 2xl:col-[7_/span_3]'>
                <div className="container grid gap-2 relative">
                  <span className="material-symbols-outlined  font-medium text-7xl absolute left-1/2 translate-x-[-50%] top-[-50px] fill-white lg:hidden">
                    distance
                  </span>
                  <div className='mb-7 mt-6 text-center'>
                    <h2 className='text-1xl'>{weather.name}</h2>
                    <h1 className='text-3xl font-bold'>{getName(weather.sys.country)}</h1>
                  </div>

                  <div className='flex justify-between items-baseline mb-7'>
                    <div className='flex flex-col items-center gap-2'>
                      <img src="/img/icons/wind-turbine.png?v1" alt="" className='h-10'/>
                      <p className='font-bold'>{weather.wind.speed} m/s</p>
                      <span className='px-4 py-1 bg-black/10 rounded-full'>Speed</span>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                      <img src="/img/icons/humidity-icon.png" alt="" className='h-10'/>
                      <p className='font-bold'>{weather.main.humidity}%</p>
                      <span className='px-4 py-1 bg-black/10 rounded-full'>Humidity</span>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                      <img src="/img/icons/feels-like.png" alt="" className='h-10'/>
                      <p className='font-bold'>{weather.main.feels_like}°</p>
                      <span className='px-4 py-1 bg-black/10 rounded-full'>Feels like</span>
                    </div>
                  </div>
                  <label className='relative'>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} onKeyPress={searchLocation} placeholder='Search only cities...' className='bg-black/10 w-full placeholder:text-slate-50 outline-none focus:font-bold px-5 py-2 rounded-full focus:bg-white focus:text-black/70 focus:shadow-2xl focus:shadow-black/90 transition duration-200' />
                    <button className='button-disabled absolute right-5 top-2 transition duration-200 input-icon'><span className="material-symbols-outlined font-medium">
                      search
                    </span></button>
                  </label>
                  <footer className="mt-4 text-center gap-1 pb-4 px-2">
                    <p>©Visually Weather by <a href='https://www.google.com' target='_blank' className='underline'>Jmdelav</a>.</p>
                  </footer>
                </div>
              </div>
            </article>
          </section>
        </main>
        <footer className='container relative invisible lg:visible'>
          <div className=' w-full grid grid-cols-1 grid-rows-2 text-white font-bold text-md absolute bottom-8 '>
            <p className='flex justify-end'>Centro Amazónico de Asunción</p>
            <p className='flex justify-end'>All rights reserved, 2023.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
