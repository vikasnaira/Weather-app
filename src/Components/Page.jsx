import React, { useState } from 'react'
import Input from './Input';
import { CiCloudSun } from "react-icons/ci";
import { FaWind, FaMapMarkerAlt } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa6";
import Loading from './Loading';

const Page = () => {
  const [loading, setloading] = useState(false)
  const [input, setinput] = useState("")
  const [forecast, setForecast] = useState([]);
  const [windspeed, setwindspeed] = useState("")
  const [info, setinfo] = useState("")
  const [temprature, settemprature] = useState("")
  
  const [country, setCountry] = useState("")
  const [region, setRegion] = useState("")
  const [area, setArea] = useState("")
  const [weatherIcon, setWeatherIcon] = useState("")

  const dataHandler = async () => {
    if (!input.trim()) return;
    setloading(true);
    
    try {
      const response = await fetch(`https://wttr.in/${input}?format=j1`);
      
      if (!response.ok) {
        alert("Location nahi mili! Kripya sahi naam dalein.");
      } else {
        const data = await response.json();
        console.log("Full Weather Data:", data);

        const current = data.current_condition[0];
        setinfo(current.weatherDesc[0].value);             
        settemprature(`${current.temp_C} °C`);             
        setwindspeed(`${current.windspeedKmph} km/h`);     
        setForecast(data.weather);
        
        if (current.weatherIconUrl && current.weatherIconUrl[0]) {
          setWeatherIcon(current.weatherIconUrl[0].value);
        }

        if (data.nearest_area && data.nearest_area[0]) {
          const loc = data.nearest_area[0];
          setCountry(loc.country[0].value);
          setRegion(loc.region[0].value);
          setArea(loc.areaName[0].value);
        }
        
        setinput(""); 
      }
    } catch (err) {
      alert("Error fetching data erro", err);
    } finally {
      setloading(false);
    }
  }    

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-slate-900/50">
      
      <article className='bg-black/20 h-auto min-h-[50vh] flex justify-between items-center flex-col
        rounded-3xl overflow-hidden backdrop-blur-md z-10 p-4 sm:p-6 lg:p-8
        gap-6 relative border-2 sm:border-3 shadow-2xl shadow-black border-gray-500/40 
        w-full max-w-[95%] sm:max-w-[75%] md:max-w-[50%] lg:max-w-[35%] transition-all duration-300'>

        <div className='h-48 w-48 sm:h-80 sm:w-80 bg-blue-700/50 -z-10 blur-3xl rounded-full absolute right-4 sm:right-10 bottom-0 pointer-events-none'></div>

        <div className="w-full z-20">
          <Input input={input} setinput={setinput} onClick={dataHandler}/>
        </div>
        
        <div className="w-full h-full flex flex-col justify-center items-center">
          {loading ? (
            <Loading />
          ) : (
            <div className="info flex flex-col text-white text-center gap-4 w-full">
              
              {weatherIcon && (
                <div className="flex justify-center items-center">
                  <img 
                    src={weatherIcon} 
                    alt="Weather Icon" 
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain filter drop-shadow-md animate-pulse duration-100"
                  />
                </div>
              )}

              {country && (
                <div className="bg-white/10 rounded-xl p-2 sm:p-3 text-xs sm:text-sm flex flex-col gap-1 items-center border border-white/5 mx-2">
                  <p className="flex items-center gap-1 font-semibold text-cyan-300">
                    <FaMapMarkerAlt size={12}/> Location Details
                  </p>
                  <p className="text-gray-200 break-words text-center leading-relaxed">
                    <span className="font-bold text-white text-sm sm:text-base">{area}</span>, <br className="sm:hidden"/> {region}, {country}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3 mt-1 px-4">
                <h1 className="flex items-center justify-center gap-3 bg-gray-500/50 py-2 rounded-2xl border backdrop-blur-sm shadow border-gray-500  text-lg sm:text-xl font-medium tracking-wide">
                  <FaTemperatureHigh className="text-red-400 text-xl sm:text-2xl" /> 
                  <span>Temp:</span> <span className="font-bold text-cyan-200">{temprature || "--"}</span>
                </h1>
                <h1 className="flex items-center justify-center bg-gray-500/50 py-2 rounded-2xl border backdrop-blur-sm shadow border-gray-500  gap-3 text-lg sm:text-xl font-medium tracking-wide">
                  <FaWind className="text-blue-300 text-xl sm:text-2xl" /> 
                  <span>Wind:</span> <span className="font-bold text-cyan-200">{windspeed || "--"}</span>
                </h1>
                <h1 className="flex items-center justify-center gap-3 bg-gray-500/50 py-2 rounded-2xl border backdrop-blur-sm shadow border-gray-500  text-lg sm:text-xl font-medium tracking-wide">
                  <CiCloudSun className="text-yellow-300 text-2xl sm:text-3xl" /> 
                  <span>Sky:</span> <span className="font-bold text-cyan-200 capitalize">{info || "--"}</span>
                </h1>
              </div>

            </div>
          )}
        </div>
      </article>
    </div>
  )
}

export default Page
