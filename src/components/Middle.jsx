import React, { useEffect, useState, useRef } from "react";
import { TbCloudSearch } from "react-icons/tb";
import toast from 'react-hot-toast';
import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri";

const Middle = () => {
  const [isCelsius, setIsCelsius] = useState(true);
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const [originalData, setOriginalData] = useState(null); 


  const search = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API}`
      );
      const data = await response.json();
      console.log(data);
      if (data.cod && data.cod !== 200) {
        toast.error('This city does not exist. Please try again.');
        return;
      }
      let iconUrl = "";
      if (data.weather && data.weather[0]) {
        const iconCode = data.weather[0].icon;
        iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      }

      const originalTemps = {
        maxTemp: data.main.temp_max,
        minTemp: data.main.temp_min,
        currentTemp: data.main.temp,
      };

      setOriginalData(originalTemps);
      
      setWeatherData({
        maxTemp: Math.ceil(data.main.temp_max),
        minTemp: Math.floor(data.main.temp_min),
        currentTemp: Math.ceil(data.main.temp),
        location: data.name,
        description: data.weather[0].description,
        icon: iconUrl,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };
  
  const getWeatherBg = () => {
  if (weatherData.currentTemp>=20) return "src/images/sunny.jpg";
  if (weatherData.currentTemp>10 && weatherData.currentTemp<20) return "src/images/cloudy.png";
  if (weatherData.currentTemp>0 && weatherData.currentTemp<10) return "src/images/grim.jpg";
  if (weatherData.currentTemp<=0) return "src/images/Snowy.jpg";
  return "/images/default.jpg";
};

  const handleTemp = () => {
    if (!weatherData || !originalData) return;
    
    if (isCelsius) {
      setWeatherData(prevData => ({
        ...prevData,
        maxTemp: Math.ceil((originalData.maxTemp * 9/5) + 32),
        minTemp: Math.floor((originalData.minTemp * 9/5) + 32),
        currentTemp: Math.ceil((originalData.currentTemp * 9/5) + 32),
      }));
    } else {
      setWeatherData(prevData => ({
        ...prevData,
        maxTemp: Math.ceil(originalData.maxTemp),
        minTemp: Math.floor(originalData.minTemp),
        currentTemp: Math.ceil(originalData.currentTemp),
      }));
    }
    setIsCelsius(!isCelsius);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const city = inputRef.current.value;
    if (city) {
      search(city);
    }
  };

  useEffect(() => {
    search("Cairo");
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-cover bg-center flex flex-col text-white text-2xl font-bold m-4 sm:m-6 rounded-2xl h-auto min-h-[500px] w-full max-w-4xl mx-auto" style={{ backgroundImage: `url(${getWeatherBg()})` }}>
 
          <div className="flex flex-col sm:flex-row justify-center w-full p-4 sm:p-6 lg:p-9 items-center gap-4">
            <form 
              className="flex items-center relative w-full max-w-md" 
              onSubmit={handleSubmit}
            >
              <input
                ref={inputRef}
                className="rounded-full p-3 text-white border-white border-2 w-full pl-12 pr-12 sm:pr-16 bg-transparent placeholder-white text-sm sm:text-base cursor-text"
                type="text"
                placeholder="Enter City"
              />
              
              <button
                className="absolute right-3 text-white font-bold text-2xl sm:text-3xl lg:text-4xl z-2 cursor-pointer hover:scale-110 transition-transform duration-200"
                type="submit"
              >
                <TbCloudSearch />
              </button>
            </form>

            <div className='bg-[url("./src/images/logo.png")] bg-cover bg-center w-12 h-12 sm:w-15 sm:h-15 shrink-0 cursor-default'></div>
          </div>

          {weatherData && (
            <>
            
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold flex flex-col sm:flex-row items-center justify-center gap-4 my-4 sm:my-5 px-4 sm:px-6 lg:px-9 text-center">
                <div className="flex items-center gap-3 sm:gap-5">

                  <h2 className="cursor-default text-center">
               
                        <div className="text-7xl"> {weatherData.currentTemp}
                          °{isCelsius ? 'C' : 'F'}
                         </div>   
                   </h2>
                    
                  <button 
                    className="rounded-full p-2 sm:p-3 text-sm sm:text-base border border-white hover:text-black hover:bg-white hover:bg-opacity-2 transition-all duration-200 cursor-pointer flex items-center justify-center"
                    onClick={handleTemp}
                  >
                    {isCelsius ? (
                      <RiFahrenheitFill className="text-xl sm:text-2xl" />
                    ) : (
                      <RiCelsiusFill className="text-xl sm:text-2xl" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center my-8 sm:my-12 lg:my-15 gap-3">
                <h2 className="text-xl sm:text-2xl font-bold px-4 sm:px-5 text-center cursor-default">
                  {weatherData.location}
                </h2>
              </div>

              <div className="flex flex-col items-center text-lg sm:text-xl mt-4 gap-3 sm:gap-4 px-4 sm:px-6">
                <h2 className="capitalize flex flex-col sm:flex-row items-center gap-2 text-center cursor-default">
                  {weatherData.description}
                  <img
                    src={weatherData.icon}
                    alt="weather icon"
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 cursor-default"
                  />
                </h2>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 text-base sm:text-lg opacity-90 text-center cursor-default">
                  <span>Min: {weatherData.minTemp}°{isCelsius ? 'C' : 'F'}</span>
                  <span>Max: {weatherData.maxTemp}°{isCelsius ? 'C' : 'F'}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Middle;