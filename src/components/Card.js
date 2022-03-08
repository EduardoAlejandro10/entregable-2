import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Card.css'

const Card = () => {
    
    const [weather, setWeather] = useState({})
     const success = pos =>{
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
     
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e914da852a5cc6a3bba2e72befe628fc`)
        .then(res => setWeather(res.data)
     )
        
       
    }
   
      
    useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);

    }, [])
    

  
   
    


    return (
        <div className="card-container">
            <section className="card">
                <h1 className="title">Weather App</h1>
                <h3>{weather.name}, {weather.sys?.country}</h3>
               <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
                <p>{weather.weather?.description}</p>
                <p>{`wind speed: ${weather.wind?.speed}km/h`}</p>
                <p>{`Clouds: ${weather.clouds?.all}%`}</p>
                <p>{`Pressure: ${weather.main?.pressure} mb`}</p>
                <p>{Math.round(weather.main?.temp -273.15)}°C</p>               
                <button className="button"> Convertion </button>
                </section>
        </div>
    );
};

export default Card;