(function(){
    var input = document.querySelectorAll("input");
    var name = input[0];
    var number = input[1];
    var para = document.querySelector("p");
    var button = document.querySelector("button");

    var myModal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    var obj = {
        person1 : {
            name : "ramesh",
            no : 12345
        },
        person2 : {
            name : "suresh",
            no : 23456
        }
    }

    
    


    button.onclick = function(){

        (function checkEmpty(){
            if(name.value == ""){
                para.innerHTML = "Name is empty";
                return;
            }
            else if(number.value == ""){
                para.innerHTML = "Number is empty";
                return;
            }
            else{
                validate();
            }
        }());

        function validate(){
            let flag = 0;
            if(!isNaN(Number(name.value))){
                para.innerHTML = "Name cannot be number";
                return;
            }
            if(isNaN(Number(number.value))){
                para.innerHTML = "Phone no must be a number";
                return;
            }
            for(let person in obj){

                if(obj[person].name === name.value && obj[person].no === Number(number.value)){
                    flag=1;
                    break;
                }
            }
            if(flag === 1){
                myModal.style.display = "block";
                document.querySelector("h2").innerHTML = "Welcome back " + name.value;
                
            }else{
                myModal.style.display = "block";
                document.querySelector("h2").innerHTML = "Invalid User";
                // setTimeout(function(){
                //     document.querySelector("h2").innerHTML = "Invalid User";
                // }, 300);
            }
            
        }
    }
    span.onclick = function(){
        myModal.style.display="none";  
        name.value="";
        number.value=""; 
    }
    
}());