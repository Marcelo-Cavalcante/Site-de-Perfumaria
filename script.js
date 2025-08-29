const list = document.querySelector('.produtos')
const buttonShowAll = document.querySelector('.show-all')
const parfunAll = document.querySelector('.parfan-all')
const corporalAll = document.querySelector('.corporal-all')
const kitAll = document.querySelector('.kit-all')


function showAll(productArray) {
    let myLi = ''

    productArray.forEach((product) => {

        myLi += `
    <div class="product-card">
                <img class="product-image" src="${product.src}">
                <div class="product-info">
                    <h2 class="product-title">${product.nome}</h2>
                    <p class="product-description">${product.description}</p>
                    <span class="product-price">${product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                    <button class="buy-button">Comprar</button>
                </div>
            </div>
    `
    })

    list.innerHTML = myLi;

}

function parfunAllItens() {
    const filterParfan = menuOptions.filter((product) => product.tipo === "perfume")

    showAll(filterParfan)
}

function corporalAllItens() {
    const filterCorporal = menuOptions.filter((product) => product.tipo === "corporal")

    showAll(filterCorporal)
}

function kitAllItens() {
    const filterKit = menuOptions.filter((product) => product.tipo === "kit")

    showAll(filterKit)
}


buttonShowAll.addEventListener('click', () => showAll(menuOptions))

parfunAll.addEventListener('click', parfunAllItens)

corporalAll.addEventListener('click', corporalAllItens)

kitAll.addEventListener('click', kitAllItens)





