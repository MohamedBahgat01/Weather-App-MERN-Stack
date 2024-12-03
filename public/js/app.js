const weatherApi = "http://api.weatherapi.com/v1/current.json?key=2f0711095c15423abd5214049240112&q=";
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");
const tempElement = document.querySelector(".temprature span");

const locationElement = document.querySelector(".place");
const dateElement = document.querySelector(".date");

// إعداد التاريخ الحالي
const currentDate = new Date();
const options = { month: "long" };
const monthName = currentDate.toLocaleDateString("en-US", options);

dateElement.textContent = currentDate.getDate() + " - " + monthName + " - " + currentDate.getFullYear();

// الاستماع للنموذج عند الإرسال
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // إعادة تعيين العناصر
    locationElement.textContent = "Loading...";
    weatherIcon.className = "";
    tempElement.textContent = "";
    weatherCondition.textContent = "";

    // استدعاء دالة البحث عن البيانات
    showData(search.value);
});

function showData(city) {
    getWeatherData(city, (result) => {
        if (result && result.current) {
            weatherIcon.className = "wi wi-day-cloudy";
            locationElement.textContent = result?.location?.name; // عرض اسم المدينة
            tempElement.textContent = result.current.temp_c + "°C";
            weatherCondition.textContent = result?.current?.condition?.text?.toUpperCase();
        } else {
            locationElement.textContent = "City not found";
        }
    });
}

function getWeatherData(city, callback) {
    // تأكد من استخدام encodeURIComponent لتحويل المدينة بشكل صحيح في الرابط
    const locationApi = `${weatherApi}${encodeURIComponent(city)}`; // مثل "Cairo" أو "Cairo,EG"
    
    fetch(locationApi)
        .then(response => {
            if (!response.ok) {
                throw new Error('API response error');
            }
            return response.json();
        })
        .then(response => {
            callback(response);
        })
        .catch(err => {
            console.error("Error:", err);  // طباعة الخطأ في حالة فشل الفيتش
            locationElement.textContent = "Error: " + err.message;
        });
}
