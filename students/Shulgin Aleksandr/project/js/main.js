//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];


//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
var userCart = [];
var list = fetchData();


class Catalog {
    constructor() {
        this.products = []
        this.container = '.products'
        this._init ()
    }
    _init () {
        list.forEach(el => { 
            this.products.push (new Product (el))
    })
    this.render ()
}
    render () {
        let trg = document.querySelector(this.container)
        let str = ''
        this.products.forEach (prod =>{
            str += prod.render()
        })
        trg.innerHTML = str 
    }
}


class Product {
    constructor (prod) {
        this.id = prod.id
        this.title = prod.title
        this.price = prod.price
        this.img = prod.img
       
    }
    render () {
            return `<div class="product-item" data-id="${this.id}">
                        <img src="${this.img}" alt="Some img">
                        <div class="desc">
                            <h3>${this.title}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-id="${this.id}"
                            data-name="${this.title}"
                            data-image="${this.img}"
                            data-price="${this.price}">Купить</button>
                        </div>
                    </div>`

    }
}

class Catr {
    //hw
}

class CartItem {
    //hw
}

let catalog = new Catalog ()

//кнопка скрытия и показа корзины
//document.querySelector('.btn-cart').addEventListener('click', () => {
    //document.querySelector('.cart-block').classList.toggle('invisible');
//});
//кнопки удаления товара (добавляется один раз)
//document.querySelector('.cart-block').addEventListener('click', (evt) => {
    //if (evt.target.classList.contains('del-btn')) {
        //removeProduct(evt.target);
    //}
//})
//кнопки покупки товара (добавляется один раз)
//document.querySelector('.products').addEventListener('click', (evt) => {
    //if (evt.target.classList.contains('buy-btn')) {
        //addProduct(evt.target);
    //}
//})

//создание массива объектов - имитация загрузки данных с сервера
function fetchData() {
    let arr = [];
    for (let i = 0; i < items.length; i++) {
        arr.push(createProduct(i));
    }
    return arr
};

//создание товара
function createProduct(i) {
    return {
        id: ids[i],
        title: items[i],
        price: prices[i],
        img: image,

    }
};

//рендер списка товаров (каталога)


//CART

// Добавление продуктов в корзину
function addProduct(product) {
    let productId = +product.dataset['id'];
    let find = userCart.find(element => element.id === productId);
    if (!find) {
        userCart.push({
            name: product.dataset['name'],
            id: productId,
            img: cartImage,
            price: +product.dataset['price'],
            quantity: 1
        })
    } else {
        find.quantity++
    }
    renderCart()
}

//удаление товаров
function removeProduct(product) {
    let productId = +product.dataset['id'];
    let find = userCart.find(element => element.id === productId);
    if (find.quantity > 1) {
        find.quantity--;
    } else {
        userCart.splice(userCart.indexOf(find), 1);
        document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
    }
    renderCart();
}

//перерендер корзины
function renderCart() {
    let allProducts = '';
    for (el of userCart) {
        allProducts += `<div class="cart-item" data-id="${el.id}">
                            <div class="product-bio">
                                <img src="${el.img}" alt="Some image">
                                <div class="product-desc">
                                    <p class="product-title">${el.name}</p>
                                    <p class="product-quantity">Quantity: ${el.quantity}</p>
                                    <p class="product-single-price">$${el.price} each</p>
                                </div>
                            </div>
                            <div class="right-block">
                                <p class="product-price">${el.quantity * el.price}</p>
                                <button class="del-btn" data-id="${el.id}">&times;</button>
                            </div>
                        </div>`
    }

    document.querySelector(`.cart-block`).innerHTML = allProducts;
}