
//Cart
let carts = document.querySelectorAll('.add-to-cart');

let products = [
        {
            name: 'THE ROUGH GUIDE TO SRILANKA',
            tag: 'product1',
            price: 800,
            inCart: 0
        },
        {
            name: '101 AMAZING THINGS TO DO IN SRILANKA',
            tag: 'product2',
            price: 1000,
            inCart: 0
        },
        {
            name: 'SRILANKA',
            tag: 'product3',
            price: 1200,
            inCart: 0
        },
        {
            name: 'SRILANKA (Lonely planet)',
            tag: 'product4',
            price: 850,
            inCart: 0
        },
        {
            name: 'Sri Lanka',
            tag: 'product5',
            price: 600,
            inCart: 0
        },
        {
            name: 'Sri Lanka (72 maps)',
            tag: 'product6',
            price: 1500,
            inCart: 0
        },
        {
            name: 'Unisex Tshirt',
            tag: 'product7',
            price: 950,
            inCart: 0
        },
        {
            name: 'Unisex Tshirt',
            tag: 'product8',
            price: 900,
            inCart: 0
        },
        {
            name: 'Sticker',
            tag: 'product9',
            price: 150,
            inCart: 0
        },
        {
            name: 'Mask Sticker',
            tag: 'product10',
            price: 300,
            inCart: 0
        },
        {
            name: 'Printed bag',
            tag: 'product11',
            price: 2500,
            inCart: 0
        },
        {
            name: 'Rock Art Poster',
            tag: 'product12',
            price: 680,
            inCart: 0
        },
        {
            name: 'SriLanka Art Sticker',
            tag: 'product13',
            price: 150,
            inCart: 0
        },
        {
            name: 'Srilanka Natural image',
            tag: 'product14',
            price: 720,
            inCart: 0
        },
    ]


for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNum(products[i]);
        totalCost(products[i]);
    }) 
}

function CartNumberLoad(){
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if (productNumbers){
        document.querySelector('.count-icon span').textContent = productNumbers;
    }
}

let totalItems;
function cartNum(products) {
    
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        CartNumberLoad()
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.count-icon span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.count-icon span').textContent = 1;
    }

    itemSet(products);   
}

function itemSet(products){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null){
        if (cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1;
    } else {
        products.inCart = 1;
        cartItems = {
            [products.tag]: products
        }
    }
    
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	(cartItems);
}

function totalCost(products){
    let cartCost = localStorage.getItem('totalCost');
    
    if (cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + products.price);
    } else {
        localStorage.setItem("totalCost", products.price);
    }
}

function deleteItem(cartItem){
    let cartItems = localStorage.getItem("productsInCart")
    let total = localStorage.getItem("totalCost")
    let cartNumbers = localStorage.getItem("cartNumbers")
    cartItems = JSON.parse(cartItems);

    cartNumbers -= cartItems[cartItem].inCart
    total -= (cartItems[cartItem].price*cartItems[cartItem].inCart)

    delete cartItems[cartItem]

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    localStorage.setItem("cartNumbers", cartNumbers);
    localStorage.setItem("totalCost", total);
    location.reload();
}

function reduceOneItem(cartItem){
    let cartItems = localStorage.getItem("productsInCart")
    let total = parseFloat(localStorage.getItem("totalCost"))
    let cartNumbers = parseInt(localStorage.getItem("cartNumbers"))
    cartItems = JSON.parse(cartItems);

    if(parseInt(cartItems[cartItem].inCart) === 1) {
        delete cartItems[cartItem]
    } else {
        cartItems[cartItem].inCart -= 1
        cartNumbers -= 1
    }
    total -= parseFloat(cartItems[cartItem].price)

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    localStorage.setItem("cartNumbers", cartNumbers.toString());
    localStorage.setItem("totalCost", total.toString());
    location.reload();
}

function addOneItem(cartItem){
    let cartItems = localStorage.getItem("productsInCart")
    let total = parseFloat(localStorage.getItem("totalCost"))
    let cartNumbers = parseInt(localStorage.getItem("cartNumbers"))
    cartItems = JSON.parse(cartItems);

    cartNumbers += 1
    cartItems[cartItem].inCart += 1
    total += parseFloat(cartItems[cartItem].price)

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    localStorage.setItem("cartNumbers", cartNumbers.toString());
    localStorage.setItem("totalCost", total.toString());
    location.reload();
}


function proceed(){
    let total = parseFloat(localStorage.getItem("totalCost"));
    if(total==0){
        alert("Select atleast one item to proceed.");
    }
    else{
        window.location.href="cart.html";
    }
}

function displayCartMain() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');

    let productContainer = document.querySelector(".cart-products")
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="item-title">
                <div class="product-img">
                <i class="fas fa-trash" onclick="deleteItem('${item.tag}')"></i>
                   
                    
                    <img src ="img/product-images/${item.tag}.png">
                </div>
                <span>${item.name}</span>
            </div>
            <div class="item-ammount">$${item.price}.00</div>
            <div class="item-units">
                <i class="fas fa-plus-circle" onclick="addOneItem('${item.tag}')"></i>
                <span>${item.inCart}</span>
                <i class="fas fa-minus-circle" onclick="reduceOneItem('${item.tag}')"></i>
            </div>
            <div class="amount-total">
                $${item.inCart * item.price}.00
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h3 class="basketTotalTitle">
                 Total Amount
                </h3>
                <h3 class="basketTotal">
                    $${cartCost}.00
                </h3>
            </div>
        `;
    }
}

function displayCartModal() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');

    let productContainer = document.querySelector(".modal-cart-products")
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="item-title">
                <div class="product-img">
                    <img src ="img/product-images/${item.tag}.png">
                </div>
                <span>${item.name}</span>
            </div>
            <div class="item-ammount">$${item.price}.00</div>
            <div class="item-units">
                <span>${item.inCart}</span>
            </div>
            <div class="amount-total">
                $${item.inCart * item.price}.00
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h2 class="basketTotalTitle">
                Total Cost
                </h2>
                <h2 class="basketTotal">
                    $${cartCost}.00
                </h2>
            </div>
        `;
    }
}

function colorFirstName(){
	document.getElementById("first-name").classList.add("tick");
}

function colorLastName(){
	document.getElementById("last-name").classList.add("tick");
}

function colorNum(){
	document.getElementById("mobile-num").classList.add("tick");
}

function colorMail(){
	document.getElementById("email-address").classList.add("tick");
}

function colorAddress(){
	document.getElementById("bill-address").classList.add("tick");
}

function colorCity(){
	document.getElementById("place").classList.add("tick");
}

function colorCountry(){
	document.getElementById("nation").classList.add("tick");
}

function colorZip(){
	document.getElementById("zip-code").classList.add("tick");
}	

function colorCard(){
	 document.getElementById("mark1").classList.add("tick");
}	

function colorCode(){
	document.getElementById("mark2").classList.add("tick");
}	

function colorName(){
	document.getElementById("mark3").classList.add("tick");
}	

function checkBox(para,access){
	if(para=="" || para==null){
		access.classList.add("tick");
	}
    else{
		access.classList.remove("tick");
	}
}	
	
//Validation
function formValidation(){
	
	let input_fname=document.getElementById("fname");
	input_fname.addEventListener("click",colorFirstName);
	let input_lname=document.getElementById("lname");
	input_lname.addEventListener("click",colorLastName);
	let input_num=document.getElementById("mnum");
	input_num.addEventListener("click",colorNum);
	let input_mail=document.getElementById("email");
	input_mail.addEventListener("click",colorMail);
	let input_address=document.getElementById("address");
	input_address.addEventListener("click",colorAddress);
	let input_city=document.getElementById("city");
	input_city.addEventListener("click",colorCity);
	let input_country=document.getElementById("country");
	input_country.addEventListener("click",colorCountry);
	let input_zip=document.getElementById("zipcode");
	input_zip.addEventListener("click",colorZip);
	
	let firstName = document.getElementById('first-name');
    let lastName = document.getElementById('last-name');
    let billAddress = document.getElementById('bill-address');
    let city = document.getElementById('place');
    let country = document.getElementById('nation');

    let f = document.getElementById('fname').value;
    let l = document.getElementById('lname').value;
    let e = document.getElementById('email').value;
    let m = document.getElementById('mnum').value;
    let a = document.getElementById('address').value;
    let c = document.getElementById('city').value;
    let co = document.getElementById('country').value;
    let zip = document.getElementById('zipcode').value;

    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers == 0 || productNumbers == null){
        alert('Cart Empty, please add one or more items from shop!');
        return false;
    }
	
	checkBox(f,firstName);
	checkBox(l,lastName);
	checkBox(a,billAddress);
	checkBox(c,city);
	checkBox(co,country);

	let count=0;
	if(m=="" || m==null){
		document.getElementById("mobile-num").classList.add("tick");
	}else{
		if (isNaN(m) || m.toString().length!=10) {
			count=1;
			document.getElementById("mobile-num").classList.remove("tick");
			document.getElementById("mobile-num").src="cross.png";
		}else{
			document.getElementById("mobile-num").classList.remove("tick");
			document.getElementById("mobile-num").src="checked.png";
		}
	}
	
	if(zip=="" || zip==null){
		document.getElementById("zip-code").classList.add("tick");
    }else{	
		if (isNaN(zip) || zip.toString().length!=5) {
			count=2;
			document.getElementById("zip-code").classList.remove("tick");
			document.getElementById("zip-code").src="cross.png";
		}else{
			document.getElementById("zip-code").classList.remove("tick");
			document.getElementById("zip-code").src="checked.png";
		}
    }
	
    if(e=="" || e==null){	
		document.getElementById("email-address").classList.add("tick");
		console.log("fd");
	}else{	
        if (e.includes("@") || e.includes(".")) {
			document.getElementById("email-address").classList.remove("tick");
			document.getElementById("email-address").src="checked.png";
		}else{
			count=3;
			document.getElementById("email-address").classList.remove("tick");
			document.getElementById("email-address").src="cross.png";
		}		
	}

    if (f == '' || f == null || l == '' || l == null || e == '' || e == null || m == '' || m == null || a == '' || a == null || c == '' || c == null || co == '' || co == null || zip == '' || zip == null){
        alert('Please fill all the fields to continue!');
        return false;
    } 
	
	else if(count>=1 && count<=3){
		return false;
	}
	
	else {
        
        let userName = document.getElementById('fname').value;
            
        if (userName){
            document.querySelector('.userName').textContent = userName; 
        };
        
        if (f){
            document.querySelector('.fname-span').textContent = f; 
        };

        if (l){
            document.querySelector('.lname-span').textContent = l; 
        };

        if (m){
            document.querySelector('.mnum-span').textContent = m; 
        };

        if (e){
            document.querySelector('.email-span').textContent = e; 
        };

        if (a){
            document.querySelector('.address-span').textContent = a; 
        };

        if (c){
            document.querySelector('.city-span').textContent = c; 
        };

        if (co){
            document.querySelector('.country-span').textContent = co; 
        };

        if (zip){
            document.querySelector('.zip-span').textContent = zip; 
        }	  
	
        if (true) {
            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];

            modal.style.display = "block";

            span.onclick = function () {
                modal.style.display = "none";
            }

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
	    let input_cardnum=document.getElementById("card-num");
        input_cardnum.addEventListener("click",colorCard);
	    let input_code=document.getElementById("sec-code");
		input_code.addEventListener("click",colorCode);
		let input_name=document.getElementById("card-name");
		input_name.addEventListener("click",colorName);
        
        return false;  
    }
}


//Done
function paymentDone (){
	let count=0;
	let cardNumber = document.getElementById("card-num").value;
    let cardName = document.getElementById('card-name').value;
    let expiryDate = document.getElementById('exp-date').value;
    let sec_code = document.getElementById("sec-code").value;
	
	if(cardNumber=="" || cardNumber==null){
		document.getElementById("mark1").classList.add("tick");
	}
	else{
		if (isNaN(cardNumber) || cardNumber.toString().length!=16) {
			count=1;
			document.getElementById("mark1").classList.remove("tick");
			document.getElementById("mark1").src="cross.png";
		}else{
			document.getElementById("mark1").classList.remove("tick");
			document.getElementById("mark1").src="checked.png";
		}
	}
	if(cardName=="" || cardName==null){
		document.getElementById("mark3").classList.add("tick");
	}else{
		document.getElementById("mark3").classList.remove("tick");
	}
	if(sec_code=="" || sec_code==null){
		document.getElementById("mark2").classList.add("tick");
	}
	else{
		if (isNaN(sec_code) || sec_code.toString().length!=3) {
			count=2;
			document.getElementById("mark2").classList.remove("tick");
			document.getElementById("mark2").src="cross.png";
		}else{
			document.getElementById("mark2").classList.remove("tick");
			document.getElementById("mark2").src="checked.png";
		}
	}
	
	if(cardNumber=="" || cardNumber==null || cardName=="" || cardName==null || expiryDate=="" || expiryDate==null || sec_code=="" || sec_code==null){
		alert("Please fill all input fields.");
		return false;
	}	
	
    if(count>=1 && count<=2){
        return false;
    }else{
		let modal = document.getElementById("myModal");
		modal.style.display = "none";

		let donemodal = document.getElementById("doneModal");

		donemodal.style.display = "block";

		setTimeout(function(){
			donemodal.style.display = "block";
			window.location.href = 'shop.html';}, 2200);
		localStorage.clear();
	}	
	
    return false;
}

CartNumberLoad();
displayCartMain();
displayCartModal();


