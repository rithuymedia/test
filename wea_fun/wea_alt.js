var yourApp = (function(){
    
    var FunConstructor = function() {

        this.appKey =  "319bc4bc2a3d2cf7b258b9742a7bb0b2";
        this.searchButton = document.getElementById("search-btn");
        this.searchInput = document.getElementById("search-txt");
        this.cityName = document.getElementById("city-name");
        this.main = document.getElementById("main");
        this.temperature = document.getElementById("temp");
        this.latitude = document.getElementById("latitude");
        this.longitude = document.getElementById("longitude");
        this.img = document.getElementById("img");
        this.url = "";
    }
    FunConstructor.prototype.init = function(){

        navigator.geolocation.getCurrentPosition(yes, no);
        var self = this;
        function yes(position){

            console.log("Yes");
            self.url = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude +"&lon=" + position.coords.longitude + "&appid=" + self.appKey;
            self.xmlObj();
            
        }

        function no(){
            console.log("No");
        }
    }
    

    FunConstructor.prototype.xmlObj = function(){
        var httpObj = new XMLHttpRequest();
        if(!httpObj){
            console.log("Doesn't support");
        }
        var self = this;
        httpObj.onreadystatechange = function(){

                if (httpObj.readyState === XMLHttpRequest.DONE) {
                    if(httpObj.status === 200) {
                        self.display(httpObj.responseText);
                    } else {
                        self.failure();
                    }
                }

        }
        httpObj.open("GET", this.url, true);
        httpObj.send();
    }

    FunConstructor.prototype.display = function(data){
        var jsonObject = JSON.parse(data);
        this.cityName.innerHTML = "City : " + jsonObject.name;
        this.temperature.innerHTML = "Temperature : " + parseFloat(jsonObject.main.temp) + "K";
        this.latitude.innerHTML = "Latitude: " + parseFloat(jsonObject.coord.lat);
        this.longitude.innerHTML = "Latitude: " + parseFloat(jsonObject.coord.lon);
        this.main.style.height = "510px";
        this.img.style.display = "block";
        var source = "ghostwhite url(" +"https://openweathermap.org/img/w/"+ jsonObject.weather[0].icon  + ".png"+ ") no-repeat center";
        this.img.style.background = source;
        this.img.style.borderRadius = "50%";
    }
    FunConstructor.prototype.failure = function(){
        console.log("Unable to display the content");
    }

    var obj = new FunConstructor();
    obj.searchButton.onclick = function(){
        if(obj.searchInput.value == ""){
            console.log("Input empty");
        } else {
            obj.url = "https://api.openweathermap.org/data/2.5/weather?q=" + obj.searchInput.value + "&appid="+ obj.appKey;
            obj.xmlObj();
        }
        
        
    }
    return {
        init : obj.init(),

    }
    
})();

yourApp.init;    


