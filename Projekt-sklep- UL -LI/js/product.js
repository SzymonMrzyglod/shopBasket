const basket = new Basket();

const basketList = document.querySelector('.basket-list');
const productsSection = document.querySelector('.products');
const btns = [...document.querySelectorAll('button')];
const basketSection = document.querySelector('.basket');
const amountInBasket = document.querySelector('.amount');
const basketIcon = document.querySelector('.fa-shopping-basket');
const totalBasket = document.querySelector('.basket-total');
const totalBasketValue = document.querySelector('.basket-total-value')
const btnOrderBasket = document.querySelector('.basket-order-button');
const btnDelate = [];

//----------GET API----------
const getProducts = (btnClass) => {
    const url = `https://fakestoreapi.com/products/category/${btnClass}`;
    fetch(url)
        .then(response => response.json())
        .then(products => showProducts(products))
}

//----------SHOW PRODUCTS------------
const showProducts = (products) => {
    cleanDivs()
    products.forEach((product, id) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product')

        productDiv.innerHTML = `<h2 class="product-title">${product.title}</h2>
                                <img class="product-image"src="${product.image}">
                                <p class="product-price">${product.price} $</p>
                                <i class="product-btn-buy fas fa-plus-circle"></i>`;
        productsSection.appendChild(productDiv)
        findBtnBuy();
    });
}

//-----------------REMOVE ITEM----------------
const removeItem = (e) => {
    const idRemoveItem = e.target.parentNode.dataset.id;
    basket.removeItem(idRemoveItem);
    generateBasketList();
    getTotalValue();
}

const findBtnRemove = () => {
    btnDelate.forEach(btnDel => {
        btnDel.addEventListener('click', removeItem);
    })
}

//----------FIND BTN BUY----------
const findBtnBuy = () => {
    const btnsBuy = [...document.querySelectorAll('.product-btn-buy')];
    btnsBuy.forEach(btnBuy => btnBuy.addEventListener('click', addToBasket));
}

//----------ADD PRODUCT TO ARRAY IN CLASS BASKET---------
const addToBasket = (e) => {
    const title = e.target.parentNode.querySelector('.product-title').textContent;
    const price = Number(e.target.parentNode.querySelector('.product-price').textContent.slice(0, length - 2));
    const id = e.target.parentNode.dataset.id;
    basket.addItem(title, price);
    generateBasketList();
}
//----------GET TOTAL VALUE----------
const getTotalValue = () => {
    const totalValue = basket.totalValue();
    totalBasketValue.textContent = `Total: ${totalValue.toFixed(2)} $`;
    return totalValue;
}
//----------GET PRODUCTS FROM ARRAY IN CLASS BASKET AND ADD TO LIST IN SHOP----------
const generateBasketList = () => {
    basketList.innerHTML = "";
    btnDelate.length = 0;
    const basketItems = basket.getBasketItem();
    amountInBasket.style.display = "block";
    amountInBasket.innerHTML = `<p class="amount-num">${basketItems.length}</p>`;
    basketItems.forEach((basketItem, id) => {
        const newLi = document.createElement('li');
        newLi.classList.add('basket-li');
        newLi.setAttribute('data-id', id);
        const newBtn = document.createElement('button');
        newBtn.classList.add('basket-button-delate');
        newBtn.innerHTML = `<i class="fas fa-minus-circle"></i>`
        newLi.innerHTML = `<p class="basket-item-id">${id+1}.</p><p class="basket-item-title">${basketItem.title}</p> <p class="basket-item-price">${basketItem.price} $</p>`
        basketList.appendChild(newLi);
        newLi.appendChild(newBtn)
        btnDelate.push(newBtn);
    });

    if (basket.items.length > 0) {
        btnOrderBasket.classList.add('js-basket-order');
        getTotalValue();
    } else {
        totalBasketValue.textContent = `Basket is empty.`
    }
    findBtnRemove();
}

const basketDivPosition = () => {
    basketSection.classList.toggle('js-basket-position');
}
basketIcon.addEventListener('click', basketDivPosition)

// ----------CLEAN WINDOW---------
const cleanDivs = () => {
    productsSection.innerHTML = "";
};

//----------CHECK TYPE OF PRODUCTS----------
const buttonClassCheck = (e) => {
    const btnClass = e.target.classList.value;
    getProducts(btnClass)
}

btns.forEach(btn => {
    btn.addEventListener('click', buttonClassCheck)
});

//------------ORDER -----------------------
const orderBasket = (e) => {
    basketList.innerHTML = "";
    basket.cleanItems();
    basket.getBasketItem();
    basket.totalValue();
    generateBasketList();
    getTotalValue();
    btnOrderBasket.classList.remove("js-basket-order");
    totalBasketValue.textContent = `The order placed!`;
    getProducts("electronics");
    setTimeout(basketDivPosition, 1500);
}
btnOrderBasket.addEventListener('click', orderBasket);
getProducts("electronics");
generateBasketList();