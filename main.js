let cartButtons = document.querySelectorAll('.add-to-cart');
let addNumber = document.querySelector('.products-number');
let DncrBtn=document.getElementsByClassName("decrease");
let IncrBtn=document.getElementsByClassName("increase");
let DeletBtn = document.getElementsByClassName("fa-trash-can");
let deltall=document.querySelector('.Clear')
let total=document.querySelector(".subtotal + p");

if (sessionStorage.length>0){
    addNumber.textContent=JSON.parse(sessionStorage.add);
}


let addNum = function() {
    let currentNumber = parseInt(addNumber.textContent);
    addNumber.textContent = currentNumber + 1;
    sessionStorage.add= JSON.stringify(addNumber.textContent);
};

let delnumm = function() {
    let currentNumber = parseInt(addNumber.textContent);
    addNumber.textContent = currentNumber - 1;
};

cartButtons.forEach(button => {
    button.addEventListener('click', addNum);
});

let deltcart = function (buttons) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            let productArticle = buttons[i].closest('article.product');
                if (productArticle) {
                    productArticle.remove();
                    delnumm();
                }
            };
        }
};

deltcart(DeletBtn);

let addcart = function (buttons) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            let currentCount = parseInt(buttons[i].previousElementSibling.textContent);
            let newCount = currentCount + 1;
            buttons[i].previousElementSibling.textContent = newCount.toString();
            let priceElement = buttons[i].parentNode.previousElementSibling;
            let price = parseInt(priceElement.textContent.replace('$', ''));
            let subtotal = parseInt(total.textContent.replace('$', ''));
            let newTotal = subtotal + price;
            total.textContent = `$${newTotal}`;
        };
    }
};
let removecart = function(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            let currentCount = parseInt(buttons[i].nextElementSibling.textContent);
            let newCount = currentCount - 1;

            if (newCount > 0) {
                buttons[i].nextElementSibling.textContent = newCount.toString();
            } else if (newCount == 0) {
                let productArticle = buttons[i].closest('article.product');
                if (productArticle) {
                    productArticle.remove();
                    delnumm(); 
                }
            }

            let priceElement = buttons[i].parentNode.previousElementSibling;
            let price = parseInt(priceElement.textContent.replace('$', ''));
            let subtotal = parseInt(total.textContent.replace('$', ''));
            let newTotal = subtotal - price;
            total.textContent = `$${newTotal}`;
        };
    }
};
addcart(IncrBtn);
removecart(DncrBtn);

removall=function(butt){
    for(let i=0;i<butt.length;i++){
        butt.onclick=function(){
            butt[i].previousElementSibling.innerHTML="";

        }
    }
}