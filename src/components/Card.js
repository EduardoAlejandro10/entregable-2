import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Card.css'

function kelvinToCelsius(temp) {
    return Math.round(temp - 273.15);
}

function celsiusToFahrenheit(celsius) {
    return Math.round((celsius * 1.8) + 32);
}

function fahrenheitToCelsius(fahrenheit) {
    return Math.round((fahrenheit -32) / 1.8);
}

const Card = () => {
    
    const [weather, setWeather] = useState({})
    const [temperature, setTemperature] = useState()
    const [isCelsius, setIsCelsius] = useState(true);
     const success = pos =>{
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
     
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e914da852a5cc6a3bba2e72befe628fc`)
        .then(res => setWeather(res.data)
     )
        
       
    }
   
    useEffect(() => {
        setTemperature(kelvinToCelsius(weather.main?.temp));
    }, [weather])
      
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
                <p>{temperature}{isCelsius ? '°C' : '°F'}</p>               
                <button className="button" onClick={() => {
                    if (isCelsius) {
                        setTemperature(celsiusToFahrenheit(temperature));
                        setIsCelsius(!isCelsius);
                    }
                    if (!isCelsius) {
                        setTemperature(fahrenheitToCelsius(temperature));
                        setIsCelsius(!isCelsius);
                    }
                }}> Convertion </button>
                </section>
        </div>
    );
};

export default Card;