let forecast_location=document.getElementById('forecast_location')
let forecast_temp=document.getElementById('forecast_temp')
let forecast_situation=document.getElementById('forecast_situation')
let img_icon_temp=document.getElementById('img_icon_temp')
let weather_umberella=document.getElementById('weather_umberella')
let weather_wind=document.getElementById('weather_wind')
let weather_compass=document.getElementById('weather_compass')
let forecast_temps=Array.from(document.getElementsByClassName('forecast_temps'))
let forecast_temps_super=Array.from(document.getElementsByClassName('forecast_temps_super'))
let forecast_situations=Array.from(document.getElementsByClassName('forecast_situations'))
let forecast_imgs=Array.from(document.getElementsByClassName('forecast_imgs'))
let forecast_number=document.getElementById('forecast_number')
let forecast_month=document.getElementById('forecast_month')
let forecast_day=document.getElementById('forecast_day')
let forecast_days=document.getElementsByClassName('forecast_days')
let searchinput=document.getElementById('searchinput')




 async function api (city){
 let weather_Response= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c7be99ccaea74cb3baf134631241901&q=${city}&days=3`)
let data = await weather_Response.json()
if(!data.error){
    console.log(data.error)
    displayweather(data)
    displaynextday(data)
}
}
api('new-york')
function displayweather(data){

    forecast_location.innerHTML=data.location.name
    forecast_temp.innerHTML=data.current.temp_c +'<span class="sup"><sup>o</sup>c<span1/>'
    forecast_situation.innerHTML=data.current.condition.text
    img_icon_temp.setAttribute('src',data.current.condition.icon)
    weather_umberella.innerHTML=data.current.humidity +'%'
    weather_wind.innerHTML=data.current.wind_kph +'km/h'
    weather_compass.innerHTML=data.current.wind_dir
    let date_api=new Date()
    forecast_number.innerHTML=date_api.getDate()
    forecast_month.innerHTML=date_api.toLocaleDateString('en-us',{month:'long'})
    forecast_day.innerHTML=date_api.toLocaleDateString('en-us',{weekday:'long'})
}
function displaynextday(data){
    for(let i=0;i<forecast_temps.length;i++){
    let nextdate= new Date(data.forecast.forecastday[i+1].date)
        forecast_days[i].innerHTML=nextdate.toLocaleDateString('en-us',{weekday:'long'})
        forecast_temps[i].innerHTML=data.forecast.forecastday[i+1].day.maxtemp_c+'<span class="sup"><sup>o</sup>c<span1/>'
        forecast_temps_super[i].innerHTML=data.forecast.forecastday[i+1].day.mintemp_c
        forecast_situations[i].innerHTML=data.forecast.forecastday[i+1].day.condition.text  
        forecast_imgs[i].setAttribute('src',data.forecast.forecastday[i+1].day.condition.icon)
    }
}
searchinput.addEventListener('keyup',function(){
    api(searchinput.value)
})