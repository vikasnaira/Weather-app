import React, { useState , useRef } from 'react'
import Input from './Input';
import { CiCloudSun } from "react-icons/ci";
import { FaWind } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa6";
import Loading from './Loading';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP); 
 

const Page = () => {

  useGSAP(()=>{
    gsap.from(animRef.current, {
      y:700,
      duration:.7,
      scale:0.3,
      delay:1,
      ease:"back.out(2)",

    })
  })  

  const animRef = useRef(null);
  const [loading, setloading] = useState(false)
  const [input, setinput] = useState("")
  const [forecast, setForecast] = useState([]);
  let [windspeed, setwindspeed] = useState("")
  let [info, setinfo] = useState("")
  let [temprature, settemprature] = useState("")

    const dataHandler = async()=>{
       setloading(true);
      try{
          const response = await fetch(`http://goweather.xyz/weather/${input}`);
          if (!response.ok) {
            alert("No data found please try again with a valid location");
            setinput.placeholder("wrong location")
          }
          else{
          const data = await response.json();
          console.log(data);
          setinfo(data.description);
          settemprature(data.temperature);
          setwindspeed(data.wind);
          setForecast(data.forecast)
          console.log([forecast]);
      }}
      catch(err){
          console.error("Error fetching data:", err);
        }
        finally { setloading(false);}
    }    
  return (
   <div className='h-full w-full flex items-center py-10 justify-center backdrop-blur-3xl'  >
    <div className='wrapper md:w-[80%] w-full h-full  backdrop-blur-xs flex  items-center ' ref={animRef} style={{boxShadow:" 1px 1px 5px black", transform:"transtion all-linear"}}>
{/* left side  */}
{
  loading ? <Loading /> :(
    <div className="left flex items-end gap-3 relative   text-white p-10 h-full md:w-[70%] bg-[url(https://cdn.pixabay.com/photo/2017/03/28/22/55/night-photograph-2183637_1280.jpg)] bg-cover">
         <div className="heading absolute top-30 left-25"><h1 className='text-5xl font-stretch-extra-condensed  font-sans font-extrabold'>welcome to weather app</h1></div>
        <p className='font-extralight'>TODAY</p>
        <h1 className='text-4xl uppercase' defaultValue={"location "}>{input || "location"}</h1>
        <h4 className='text-sm font-extralight flex gap-1 items-center'><FaWind />{windspeed || "windspeed"}</h4>
        <h4 className='text-sm font-extralight flex gap-1 items-center' ><FaTemperatureHigh />{temprature || "temprature"}</h4>
        <h1 className='text-sm font-extralight  flex items-center gap-1'><CiCloudSun />{info ||"sky"}</h1>
      </div> 
      )}
      
      {/* right side of the card */}
      <div className="right w-[30%]  absolute right-0 bg-indigo-800-500/10 h-full  flex flex-col items-center py-10 gap-4">
      <Input input={input} setinput={setinput} onClick={dataHandler}/>
     
          {forecast.length > 0 && (
     <div className="  h-full w-full px-7  text-white p-4 flex flex-col justify-between">
     <h2 className="text-xl font-bold">Next 3 Days Forecast</h2>
      {forecast.map((day, index) => (
      <div key={index} className=" text-sm">
        <p className='border-b-1 py-3 w-1/2'>Day {day.day}</p>
        <p className='flex p-2 items-center'><FaTemperatureHigh /> Temp: {day.temperature}</p>
        <p className='flex py-2  items-center'><FaWind />  Wind: {day.wind}</p>
      </div>
    ))}
  </div>
)}
      </div>
    </div>
   </div>
  )
}

export default Page
