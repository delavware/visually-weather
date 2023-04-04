import React, { useState } from 'react'

const Temperature = ({weather, temp}) => {

  const [isCel, setIsCel] = useState(true)

  const toggleTemp = () => {
    setIsCel(!isCel)
  }
  
  return (
    <header className='container max-w-[400px] mx-auto py-8 grid grid-cols-9 grid-rows-[0.5fr_0.5fr_0.5fr_0.25fr_0.5fr_0.3fr]'>
      <p className=' px-3 bg-white/40 rounded-full text-black/70 font-bold  col-[6_/_span_4] text-center text-sm my-[0.2rem] lg:col-[7_/_span_3]'>11:58 p.m</p>
      <div className='col-[3_/_span_5] relative'>
        <p className='text-5xl font-semibold text-center'>{isCel? temp.cel: temp.far}°</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" className='absolute top-[-40%] right-[-4rem] '/>
      </div>

      <p className=' font-bold text-sm flex justify-end row-start-3 col-[6_/_span_4] mt-4'>{weather.weather[0].description}</p>
      <button onClick={toggleTemp} className=' bg-[#FF2E3C] px-5 py-1 rounded-full flex justify-center items-center row-start-5  col-[6_/_span_4] my-2 gap-2 lg:col-[7_/_span_3] hover:bg-[#FD7429] '>
        <span class="material-symbols-outlined ">
          restart_alt
        </span>
        <p className='font-bold text-md'>To {isCel? '°F': '°C'}</p>
      </button>

    </header>
  )
}

export default Temperature