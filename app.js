let w_cityName=document.querySelector(".city_name");
let W_dateTime=document.querySelector(".weather_date_time");
let W_forCast=document.querySelector(".show");
let W_icon=document.querySelector(".weather_icon");
let W_temparature=document.querySelector(".temparature");
let W_min=document.querySelector(".weather_min");
let W_max=document.querySelector(".weather_max");
let feelsLike=document.querySelector(".feels_like");
let humidity=document.querySelector(".Humi");
let windSpeed=document.querySelector(".wind_speed");
let pressure=document.querySelector(".pressure");
let citySearch=document.querySelector(".search");

//actual country name
const getCountry=(code)=>{
return  new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
}

// get date and time

const getDateTime=(dt)=>{


    const curDate=new Date(dt*1000) // convert second to milisecond
    
    const option={
    weekday:"long",
    year:"numeric",
    month:"long",
    day:"numeric",
    hour:"numeric",
    minute:"numeric"
    };
    
    let formattDate=new Intl.DateTimeFormat('en-US',option);
    let format=formattDate.format(curDate);
    
    return format;

}

let city="pune";


citySearch.addEventListener("submit",(e)=>{
    e.preventDefault();
   let cityName=document.querySelector(".city_search");
   console.log(cityName.value);

   city=cityName.value;
    getWeatherData();
    cityName.value="";
    
})





const getWeatherData = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=7259e507b76ac2f5a34e436cf9b4eaca`; // fixed the 'httpss' typo
    try {
        const response = await axios.get(weatherUrl);
        const { main, name, weather, wind, sys, dt } = response.data; // destructure from response.data
        console.log(response.data);
        
        w_cityName.innerHTML = `${name}, ${getCountry(sys.country)}`; // using name and sys.country properly


        W_dateTime.innerHTML=getDateTime(dt);

        //forcast status

        W_forCast.innerText=`${weather[0].main}`;

        //icons status

        W_icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" style="width: 100px;
    height: 100px; ">`;

    //temparature
    W_temparature.innerHTML=`${main.temp.toFixed()}&#176`;

    W_max.innerHTML=`Max:${main.temp_max.toFixed()}&#176`;
    W_min.innerHTML=`Min:${main.temp_min.toFixed()}&#176`;

    //feelslike
    feelsLike.innerHTML=`${main.feels_like.toFixed()}&#176`;
    humidity.textContent=`${main.humidity}%`;
    windSpeed.textContent=`${wind.speed}m/s`;
    pressure.textContent=`${main.pressure}hpa`

    } catch (err) {
        console.error("ERROR:",err);
    }
};




document.body.addEventListener("load",getWeatherData());
