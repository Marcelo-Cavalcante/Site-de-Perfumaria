if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    const removeProductButton = document.getElementsByClassName("button-delete");
    for (let i = 0; i < removeProductButton.length; i++) {
        removeProductButton[i].addEventListener("click", removeProduct);
    }

    const botoesMais = document.querySelectorAll(".botao-maior");
    const botoesMenos = document.querySelectorAll(".botao-menor");

    botoesMais.forEach(botao => {
        botao.addEventListener("click", () => {
            const span = botao.parentElement.querySelector(".number-quant");
            let valor = parseInt(span.textContent);
            span.textContent = valor + 1;
            updateTotal();
        });
    });

    botoesMenos.forEach(botao => {
        botao.addEventListener("click", () => {
            const span = botao.parentElement.querySelector(".number-quant");
            let valor = parseInt(span.textContent);
            if (valor > 1) {
                span.textContent = valor - 1;
                updateTotal();
            }
        });
    });

    const addToCartButton = document.getElementsByClassName("buy-button");
    for (let i = 0; i < addToCartButton.length; i++) {
        addToCartButton[i].addEventListener("click", addProductToCart);
    }
}

function addProductToCart(event) {
    const button = event.target;
    const productInfos = button.closest(".product-card"); // Ajuste conforme sua estrutura
    const productImage = productInfos.querySelector(".product-image").src;
    const productTitle = productInfos.querySelector(".product-title").innerText;
    const productPrice = productInfos.querySelector(".product-price").innerText;

    const productsCartName = document.querySelectorAll(".info h4");
    for (let i = 0; i < productsCartName.length; i++) {
        if (productsCartName[i].innerText === productTitle) {
            alert("Produto já está no carrinho");
            return;
        }
    }

    const newCartProduct = document.createElement("li");
    newCartProduct.classList.add("carrinho-item");

    newCartProduct.innerHTML = `
        <div class="imagem">
            <img src="${productImage}" alt="${productTitle}">
        </div>
        <div class="info">
            <h4>${productTitle}</h4>
            <div class="detalhe">
                <div class="tempo">
                    <i class="bx bxs-timer"></i>
                    <span>15 min</span>
                </div>
                <div class="status">
                    <i class="bx bxs-package"></i>
                    <span>Pronto</span>
                </div>
                <div class="btn-remove">
                    <button class="button-delete"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#757575"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
                </div>
            </div>
            <div class="preco-produt">
                <p class="preco">${productPrice}</p>
                <div class="contador">
                    <i class="bx bx-minus botao-menor"></i>
                    <span class="number-quant">1</span>
                    <i class="bx bx-plus botao-maior"></i>
                </div>
            </div>
        </div>
    `;

    const cartContainer = document.querySelector(".cart-product");
    cartContainer.appendChild(newCartProduct);

    // Reaplicar eventos
    ready();
    updateTotal();
}

function removeProduct(event) {
    const item = event.target.closest(".carrinho-item");
    item.remove();
    updateTotal();
}

function updateTotal() {
    let totalAmount = 0;
    const cartItems = document.getElementsByClassName("carrinho-item");
    for (let i = 0; i < cartItems.length; i++) {
        const preco = cartItems[i].querySelector(".preco").innerText.replace("R$", "").replace(",", ".");
        const quantidade = cartItems[i].querySelector(".number-quant").innerText;

        totalAmount += parseFloat(preco) * parseInt(quantidade);
    }

    document.querySelector(".pagar span").innerText = "R$" + totalAmount.toFixed(2).replace(".", ",");
}
