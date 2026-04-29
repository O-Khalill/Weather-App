import React, { useEffect, useState, useRef } from "react";
import { TbCloudSearch } from "react-icons/tb";
import toast from "react-hot-toast";
import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri";

const Middle = () => {
     const [isCelsius, setIsCelsius] = useState(true);
     const inputRef = useRef();
     const [weatherData, setWeatherData] = useState(null);
     const [originalData, setOriginalData] = useState(null);
     const iconMap = {
          "01d": "/icons/sun.png",
          "01n": "/icons/moon.png",
          "02d": "/icons/cloud-sun.png",
          "02n": "/icons/cloud-moon.png",
          "03d": "/icons/cloud.png",
          "03n": "/icons/cloud.png",
          "04d": "/icons/broken-clouds.png",
          "04n": "/icons/broken-clouds.png",
          "09d": "/icons/rain.png",
          "09n": "/icons/rain.png",
          "10d": "/icons/rain-sun.png",
          "10n": "/icons/rain-night.png",
          "11d": "/icons/thunder.png",
          "11n": "/icons/thunder.png",
          "13d": "/icons/snow.png",
          "13n": "/icons/snow.png",
          "50d": "/icons/mist.png",
          "50n": "/icons/mist.png",
     };

     const search = async (city) => {
          try {
               const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API}`,
               );
               const data = await response.json();

               if (Number(data.cod) !== 200) {
                    toast.error("This city does not exist. Please try again.");
                    return;
               }

               const iconCode = data.weather?.[0]?.icon;
               const iconUrl = iconMap[iconCode] || "/icons/default.png";

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
          if (!originalData) return "/images/default.jpg";

          const temp = originalData.currentTemp;

          if (temp >= 20) return "src/images/sunny.jpg";
          if (temp > 10 && temp < 20) return "src/images/cloudy.png";
          if (temp > 0 && temp < 10) return "src/images/grim.jpg";
          if (temp <= 0) return "src/images/Snowy.jpg";

          return "/images/default.jpg";
     };

     const handleTemp = () => {
          if (!weatherData || !originalData) return;

          if (isCelsius) {
               setWeatherData((prev) => ({
                    ...prev,
                    maxTemp: Math.ceil((originalData.maxTemp * 9) / 5 + 32),
                    minTemp: Math.floor((originalData.minTemp * 9) / 5 + 32),
                    currentTemp: Math.ceil(
                         (originalData.currentTemp * 9) / 5 + 32,
                    ),
               }));
          } else {
               setWeatherData((prev) => ({
                    ...prev,
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
          if (city) search(city);
     };

     useEffect(() => {
          search("Cairo");
          console.log("ICON URL:", weatherData?.icon);
     }, []);

     return (
          <div className="flex flex-col items-center justify-center w-full px-4 lg:px-8 h-full overflow-hidden">
               <div
                    className="bg-cover bg-center flex flex-col text-white text-2xl font-bold m-4 overflow-scroll rounded-2xl min-h-[500px] w-full max-w-4xl mx-auto"
                    style={{ backgroundImage: `url(${getWeatherBg()})` }}
               >
                    <div className="flex flex-col sm:flex-row justify-center w-full p-4 sm:p-6 lg:p-9 items-center gap-4">
                         <form
                              className="flex items-center relative w-full max-w-md"
                              onSubmit={handleSubmit}
                         >
                              <input
                                   ref={inputRef}
                                   className="rounded-full p-3 text-white border-white border-2 w-full pl-12 pr-12 bg-transparent placeholder-white"
                                   type="text"
                                   placeholder="Enter City"
                              />

                              <button
                                   className="absolute right-3 text-3xl"
                                   type="submit"
                              >
                                   <TbCloudSearch />
                              </button>
                         </form>

                         <div className='bg-[url("./src/images/logo.png")] bg-cover bg-center w-12 h-12'></div>
                    </div>

                    {weatherData && (
                         <>
                              <div className="flex justify-center my-5">
                                   <div className="flex items-center gap-4">
                                        <div className="text-7xl">
                                             {weatherData.currentTemp}°
                                             {isCelsius ? "C" : "F"}
                                        </div>

                                        <button
                                             onClick={handleTemp}
                                             className="
                                            flex items-center justify-center
                                            p-3 rounded-full
                                            bg-white/10 backdrop-blur-md
                                            border border-white/30
                                            shadow-md
                                            hover:bg-white/20
                                            hover:scale-105
                                            transition-all duration-200
                                          "
                                        >
                                             {isCelsius ? (
                                                  <RiFahrenheitFill />
                                             ) : (
                                                  <RiCelsiusFill />
                                             )}
                                        </button>
                                   </div>
                              </div>

                              <div className="flex justify-center my-8">
                                   <h2>{weatherData.location}</h2>
                              </div>

                              <div className="flex flex-col items-center gap-4">
                                   <h2 className="capitalize flex items-center gap-2 ">
                                        {weatherData.description}
                                        <img
                                             src={weatherData.icon}
                                             alt="weather icon"
                                             className="w-16 h-16 rounded-[100%] shadow-2xl bg-white/2 backdrop-blur-9xl contain-content"
                                        />
                                   </h2>

                                   <div className="flex gap-5">
                                        <span>
                                             Min: {weatherData.minTemp}°
                                             {isCelsius ? "C" : "F"}
                                        </span>
                                        <span>
                                             Max: {weatherData.maxTemp}°
                                             {isCelsius ? "C" : "F"}
                                        </span>
                                   </div>
                              </div>
                         </>
                    )}
               </div>
          </div>
     );
};

export default Middle;
