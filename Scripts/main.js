let todayName = document.getElementById("today-Date-day");
let todayDatee = document.getElementById("today-Date-Number");
let todayMonthDate = document.getElementById("Today-Date-Month");
let todayLoctaion = document.getElementById("loction-day");
let todayTemp = document.getElementById("today_temp");
let todayConditionImg = document.getElementById("today-condition-img");
let todayConditionText = document.getElementById("today-condition-text");
let tomorrowDate = document.getElementById("Tomorrow-Date");

let NextMaxTemp = document.getElementsByClassName("temp_icon-degree  ");
let IconText = document.getElementsByClassName("icon-text-next");
let nextMinTemp = document.getElementsByClassName("Next-min-temp "); 
let nextConditionImg = document.getElementsByClassName("next-condition-img"); 
let nextDayName = document.getElementsByClassName("next-day-name");


let serach = document.getElementById("search");
let date = new Date();



async function getWeather(city) {
    let Response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2b5bded6003e44c2996214250241501&q=${city}&days=3`);
    let weather = await Response.json();
    return weather;
}
/**Today Data */
function displayTodayData(data) {
    let todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleDateString("en-US", { weekday: "long" });
    todayDatee.innerHTML = todayDate.getDate();
    todayMonthDate.innerHTML=todayDate.toLocaleDateString("en-US",{month:"long"})
    todayLoctaion.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute("src", data.current.condition.icon);
    todayConditionText.innerHTML = data.current.condition.text;
}
/*NextDay Data */

function nextDayData(data) {
    let dataForcact = data.forecast.forecastday;
    for (let i = 0; i < 2; i++){
        let nextdate = new Date(dataForcact[i + 1].date);
        nextDayName[i].innerHTML = nextdate.toLocaleDateString("en-US", { weekday: "long" });
        nextMinTemp[i].innerHTML = dataForcact[i + 1].day.mintemp_c;
        NextMaxTemp[i].innerHTML = dataForcact[i + 1].day.maxtemp_c;
         nextConditionImg[i].setAttribute("src", dataForcact[i + 1].day.condition.icon);
        IconText[i].innerHTML = dataForcact[i + 1].day.condition.text;
       
        
    }
}


async function startUp(city="cairo") {
    let weatherData = await getWeather(city);
    displayTodayData(weatherData);
    nextDayData(weatherData);
}
startUp();


serach.addEventListener("input", function () {
    startUp(serach.value);
})