import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Weather.css'

const Weather = () => {
  const [dataa, setData]= useState({})
  const [location, setLocation]= useState('')

  // useEffect to display the information on page by default
  useEffect (()=>{
    const fetchDefaultLocation= async ()=>{
      // const defaultLocation = 'Noida'
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Noida&units=Metric&appid=ef8de9ed4daebef1cd7c38d314974b90`
      const response= await axios.get(url)
      setData(response.data)
    }
    fetchDefaultLocation()
  },[])

  const search = async () =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=ef8de9ed4daebef1cd7c38d314974b90`
    try{
      // after the request get complete it store the value in the variable
    const response = await axios.get(url)
    if(response.data.cod !== 200){
      setData({notFound: true})
    }else{
      setData(response.data)
    // need to clear searchbar once the search is done so setLocatin with empty string
    setLocation('')
    }
    }catch(error){
      if(error.response && error.response.status === 404){
        setData({notFound: true})
      }else{
        console.log("an unexpected error occured:", error.message)
      }
    } 
    console.log(dataa)
  }

  const handleInputChange =(e)=>{
    setLocation(e.target.value)
  }

  const handleKeyDown =(e)=>{
    if(e.key === 'Enter'){
      search()
    }
  }

  const getWeatherIcon = (weatherType)=>{
    switch(weatherType){
      case 'Clear': return <i className="bx bxs-sun"></i>
      case 'Clouds': return <i className="bx bxs-cloud"></i>
      case 'Rain': return <i className="bx bxs-cloud-rain"></i>
      case 'Thunderstorm': return <i className="bx bxs-cloud-lightnig"></i>
      case 'Snow': return <i className="bx bxs-cloud-snow"></i>
      case 'Haze':
        case 'Mist': return <i className="bx bxs-cloud"></i>
        default : return <i className="bx bxs-cloud"></i>
    }
  }
  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{dataa.name}</div>
        </div>
        <div className="search-location">
          <input type="text" placeholder='Enter location' 
          value={location} 
          // update every time when user change/update things onChange
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}/>
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>
      {dataa.notFound ? (<div className='not-found'>Not found 😒</div>) :
       (<div className="weather-data">
      {dataa.weather && dataa.weather[0] && getWeatherIcon 
      (dataa.weather[0].main)}
      <div className="weather-type">{dataa.weather ?  dataa.weather[0].main : null}</div>
      <div className="temp">{dataa.main ? 
      `${Math.floor(dataa.main.temp)}°` : null}</div>
      </div>)}
      
    </div>
  )
}

export default Weather