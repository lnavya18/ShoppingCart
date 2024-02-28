// define variables
let renderData = document.querySelector(".renderData");
let renderCartData = document.querySelector(".renderCartData");
let dynamic_count = document.querySelector(".dynamic-count");
let tcontainer = document.querySelector(".tcontainer");
let line = document.querySelector(".line");
let cItems = document.querySelector(".cItems");
let emptyCart = document.querySelector(".emptyCart");
let total_price = document.getElementById("total_price");
let emptyC = false;
let arr = [];
let calculateTotal = [];
let myTotal = 0;
// get data from API

async function getData(){
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    // render the data
    data.map((ele) => {
        let productMainDiv = document.createElement("div");
        // create image element and append when rendering data
        let createImgEle = document.createElement("img");
        // create title for each element
        let createTitle = document.createElement("p");
        let createTextTitle = document.createTextNode(`${ele.title.slice(0,35)}...`);
        // create price for each element 
        let createPriceEle = document.createElement("p");
        let createPriceText = document.createTextNode(`Price : $${ele.price}`);
        // create button for each element
        let btnEle = document.createElement("button");
        let btntext = document.createTextNode("Add to cart");
        btnEle.setAttribute("class",'btn-element');
        createImgEle.setAttribute("src", ele.image);
        createImgEle.setAttribute("class","myImage");
        productMainDiv.setAttribute("class","box-main");
        createTitle.appendChild(createTextTitle);
        createTitle.setAttribute("class",'productTitle');
        createPriceEle.appendChild(createPriceText);
        createPriceEle.setAttribute("class",'price-element');
        btnEle.appendChild(btntext);
        // append with html body
        productMainDiv.appendChild(createImgEle);
        productMainDiv.appendChild(createTitle);
        productMainDiv.appendChild(createPriceEle);
        productMainDiv.appendChild(btnEle);
        renderData.appendChild(productMainDiv);

        function addToCart(img, price){
            arr.push({ii : img, p : price});
            alert("Product Added to cart");
            if(dynamic_count.innerHTML == 0){
                calculateTotal = [];
            }
            dynamic_count.innerHTML++;
            emptyC = true;
            if(emptyC){
                cItems.style.display = "flex";
                emptyCart.style.display = "none";
            }
            let cartDiv = document.createElement("div");
            cartDiv.setAttribute("class","cart-styling");
            let cartImgEle = document.createElement("img");
            cartImgEle.setAttribute("src", ele.image);
            cartImgEle.setAttribute("class","cartImages");

            let cartPriceEle = document.createElement("p");
            let cartPriceText = document.createTextNode(`$${price}`);
            cartPriceEle.setAttribute("class", "cart-price");
            cartPriceEle.appendChild(cartPriceText);

            tcontainer.style.display = "flex";
            line.style.display = "block";
            let cartTrashBtn = document.createElement("i");
            cartTrashBtn.setAttribute("class","fa-solid fa-trash");
            cartTrashBtn.addEventListener("click",() => deleteItem(price));
            

            cartDiv.appendChild(cartImgEle);
            cartDiv.appendChild(cartPriceEle);
            cartDiv.appendChild(cartTrashBtn);
            renderCartData.appendChild(cartDiv);
            calculateTotal.push(price);    
            console.log("dyncount",dynamic_count.innerHTML);        
            myTotal = calculateTotal.reduce((accum, curVal) => {
                return accum + curVal
            })
            total_price.innerHTML = `Total Price: $${myTotal.toFixed(2)}`
            function deleteItem(pr){
                cartDiv.remove();
                console.log("cprice",price);
                myTotal = myTotal - pr;
                dynamic_count.innerHTML--;
                if(dynamic_count.innerHTML == 0){
                    myTotal = 0;
                }
                total_price.innerHTML = `Total Price: $${myTotal.toFixed(2)}`
            }
        }
        btnEle.addEventListener("click", () => addToCart(ele.image, ele.price)); 
    }); 
}

getData();