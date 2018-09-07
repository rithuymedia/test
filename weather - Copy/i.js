(function(){
    const appKey = "319bc4bc2a3d2cf7b258b9742a7bb0b2";
    var searchButton = document.getElementById("search-btn");
    var searchInput = document.getElementById("search-txt");
    var cityName = document.getElementById("city-name");
    var temperature = document.getElementById("temp");
    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");
    var main = document.getElementById("main");
    var img = document.getElementById("img");
    
    searchButton.addEventListener("click", findWeatherDetails);

    var searchLink;
    navigator.geolocation.getCurrentPosition(yes, no);
    function yes(position){
        console.log("Yes");
        searchLink = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude +"&lon=" + position.coords.longitude + "&appid="+appKey;
        httpRequestFunc(searchLink, theResponse);
        
    }
    function no(){
        console.log("No");
    }

    function findWeatherDetails() {
      if (searchInput.value === "") {
        console.log("Empty Input");
      }else {
        searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+appKey;
        //var searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+appKey;
       httpRequestFunc(searchLink, theResponse);
      }
     }
     
     function theResponse(response) {
      var jsonObject = JSON.parse(response);
      cityName.innerHTML = "City : " + jsonObject.name;
      temperature.innerHTML = "Temperature : " + parseFloat(jsonObject.main.temp) + "K";
      latitude.innerHTML = "Latitude: " + parseFloat(jsonObject.coord.lat);
      longitude.innerHTML = "Latitude: " + parseFloat(jsonObject.coord.lon);
      main.style.height = "510px";
      img.style.display = "block";
      var source = "ghostwhite url(" +"https://openweathermap.org/img/w/"+ jsonObject.weather[0].icon  + ".png"+ ") no-repeat center";
      img.style.background = source;
      img.style.borderRadius = "50%";
      
    }
    function httpRequestFunc(url, callback)
    {
        var httpRequest = new XMLHttpRequest();
        if(!httpRequest){
            console.log("Doesn't support");
        }
        httpRequest.onreadystatechange = function() { 
            if (httpRequest.readyState == 4 && httpRequest.status == 200)
                callback(httpRequest.responseText);
        }
        httpRequest.open("GET", url, true);
        httpRequest.send();
    }
    })();