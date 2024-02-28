let place_order = document.getElementById("place_order");
let name = document.getElementById("name");
let city = document.getElementById("city");
let num = document.getElementById("num");
let email = document.getElementById("email");
let saddress = document.getElementById("saddress");

function placeOrder(){
    if(name.value && city.value && num.value && email.value && saddress.value){
        alert("Place order successfully");
        window.location.href = "index.html";
    }
    else{
        alert("Please Fill Out All The Fields");
    }

}

place_order.addEventListener("click", placeOrder);