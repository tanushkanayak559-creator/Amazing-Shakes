/* =========================
   CART
========================= */

let cart = [];

let lastReasonIndex = -1;

let burgerAction = "";


/* =========================
   ADD TO CART
========================= */

function addToCart(name, price) {

    const existingItem = cart.find(
        item => item.name === name
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    openCart();
}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach(item => {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;

    });


    cartCount.textContent =
        totalItems;

    cartTotal.textContent =
        totalPrice;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                Your cart is empty.
            </div>
        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        const div =
            document.createElement("div");


        div.className =
            "cart-item";


        div.innerHTML = `

            <div>

                <h3>
                    ${item.name}
                </h3>

                <div class="cart-item-price">
                    ₹${itemTotal}
                </div>

            </div>


            <div class="cart-item-actions">

                <button
                    class="quantity-button"
                    onclick="decreaseQuantity(${index})">
                    −
                </button>


                <span class="quantity-number">
                    ${item.quantity}
                </span>


                <button
                    class="quantity-button"
                    onclick="increaseQuantity(${index})">
                    +
                </button>


                <button
                    class="remove-button"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(div);

    });

}


/* =========================
   QUANTITY
========================= */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();
}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


/* =========================
   CART
========================= */

function openCart() {

    document
        .getElementById("cartPanel")
        .classList.add("active");


    document
        .getElementById("cartOverlay")
        .classList.add("active");
}


function closeCart() {

    document
        .getElementById("cartPanel")
        .classList.remove("active");


    document
        .getElementById("cartOverlay")
        .classList.remove("active");
}


/* =========================
   BUY NOW
========================= */

function buyNow(name, price) {

    openPayment(name, price);

}


/* =========================
   CHECKOUT CART
========================= */

function checkoutCart() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    let total = 0;


    cart.forEach(item => {

        total +=
            item.price * item.quantity;

    });


    const names = cart
        .map(
            item =>
                `${item.name} × ${item.quantity}`
        )
        .join(", ");


    openPayment(
        names,
        total
    );

}


/* =========================
   OPEN PAYMENT
========================= */

function openPayment(name, price) {

    const overlay =
        document.getElementById(
            "paymentOverlay"
        );


    const product =
        document.getElementById(
            "paymentProduct"
        );


    product.textContent =
        `${name} — ₹${price}`;


    overlay.classList.add(
        "active"
    );


    resetPaymentForm();

}


/* =========================
   CLOSE PAYMENT
========================= */

function closePayment() {

    document
        .getElementById(
            "paymentOverlay"
        )
        .classList.remove(
            "active"
        );


    resetPaymentForm();

}


/* =========================
   PAYMENT FORM
========================= */

function showPaymentForm(type) {

    const form =
        document.getElementById(
            "paymentForm"
        );


    const fields =
        document.getElementById(
            "formFields"
        );


    const title =
        document.getElementById(
            "formTitle"
        );


    const stock =
        document.getElementById(
            "stockMessage"
        );


    const orderStatus =
        document.getElementById(
            "orderStatus"
        );


    form.classList.add("active");

    stock.classList.remove("active");

    orderStatus.classList.remove("active");

    fields.innerHTML = "";


    /* =========================
       UPI
    ========================= */

    if (type === "upi") {

        title.textContent =
            "Choose UPI App";


        fields.innerHTML = `

            <div class="upi-apps">

                <button
                    type="button"
                    class="upi-app"
                    onclick="selectUPI(this, 'Google Pay')">

                    <img
                        src="https://cdn.simpleicons.org/googlepay"
                        alt="Google Pay">

                    <span>
                        Google Pay
                    </span>

                </button>


                <button
                    type="button"
                    class="upi-app"
                    onclick="selectUPI(this, 'PhonePe')">

                    <img
                        src="https://cdn.simpleicons.org/phonepe"
                        alt="PhonePe">

                    <span>
                        PhonePe
                    </span>

                </button>


                <button
                    type="button"
                    class="upi-app"
                    onclick="selectUPI(this, 'Paytm')">

                    <img
                        src="https://cdn.simpleicons.org/paytm"
                        alt="Paytm">

                    <span>
                        Paytm
                    </span>

                </button>

            </div>


            <p class="form-note">
                Demo checkout only. Do not enter real
                financial information.
            </p>


            <input
                class="payment-input"
                id="upiDemo"
                type="text"
                placeholder="example@upi"
                autocomplete="off">

        `;

    }


    /* =========================
       CARD
    ========================= */

    else if (type === "card") {

        title.textContent =
            "Card Details";


        fields.innerHTML = `

            <p class="form-note">
                Demo checkout only. Do not enter real
                financial information.
            </p>


            <input
                class="payment-input"
                type="text"
                inputmode="numeric"
                maxlength="19"
                placeholder="Demo card number"
                autocomplete="off">


            <input
                class="payment-input"
                type="text"
                maxlength="7"
                placeholder="MM / YY"
                autocomplete="off">


            <input
                class="payment-input"
                type="text"
                placeholder="Name on card"
                autocomplete="off">

        `;

    }


    /* =========================
       EMI
    ========================= */

    else if (type === "emi") {

        title.textContent =
            "Select EMI Bank";


        fields.innerHTML = `

            <select
                class="payment-select">

                <option value="">
                    Select Bank
                </option>

                <option>
                    HDFC Bank
                </option>

                <option>
                    ICICI Bank
                </option>

                <option>
                    State Bank of India
                </option>

                <option>
                    Axis Bank
                </option>

                <option>
                    Kotak Mahindra Bank
                </option>

                <option>
                    Other Bank
                </option>

            </select>

        `;

    }


    /* =========================
       COD
    ========================= */

    else if (type === "cod") {

        title.textContent =
            "Cash on Delivery";


        fields.innerHTML = `

            <p class="form-note">
                Your order will be paid for when it arrives.
            </p>

        `;

    }

}


/* =========================
   SELECT UPI
========================= */

function selectUPI(button, appName) {

    const allApps =
        document.querySelectorAll(
            ".upi-app"
        );


    allApps.forEach(app => {

        app.classList.remove(
            "selected"
        );

    });


    button.classList.add(
        "selected"
    );


    const input =
        document.getElementById(
            "upiDemo"
        );


    if (input) {

        input.placeholder =
            `Enter your ${appName} UPI ID`;

    }

}


/* =========================
   RANDOM STOCK REASON
========================= */

function getRandomStockReason() {

    const reasons = [

        "We ran out of sugar.",

        "We're currently out of fresh milk.",

        "Fresh ingredients are temporarily unavailable.",

        "We're out of the ingredients needed for this item.",

        "Our fresh stock just ran out.",

        "We're temporarily out of this flavour.",

        "Our ingredient supply has run out for today.",

        "We're currently restocking our ingredients."

    ];


    let randomIndex;


    do {

        randomIndex =
            Math.floor(
                Math.random() *
                reasons.length
            );

    } while (
        randomIndex === lastReasonIndex
    );


    lastReasonIndex =
        randomIndex;


    return reasons[randomIndex];

}


/* =========================
   SUBMIT PAYMENT
========================= */

function submitPayment() {

    const form =
        document.getElementById(
            "paymentForm"
        );


    const fields =
        document.getElementById(
            "formFields"
        );


    const stock =
        document.getElementById(
            "stockMessage"
        );


    const paymentOptions =
        document.getElementById(
            "paymentOptions"
        );


    const orderStatus =
        document.getElementById(
            "orderStatus"
        );


    fields.innerHTML = "";


    form.classList.remove(
        "active"
    );


    stock.classList.remove(
        "active"
    );


    paymentOptions.style.display =
        "none";


    orderStatus.classList.add(
        "active"
    );


    const randomReason =
        getRandomStockReason();


    setTimeout(function() {

        orderStatus.classList.remove(
            "active"
        );


        stock.classList.add(
            "active"
        );


        stock.innerHTML = `

            <div class="stock-icon">
                !
            </div>


            <div>

                <strong>
                    Sorry, Item Currently Out of Stock
                </strong>


                <p>
                    ${randomReason}
                </p>

            </div>

        `;

    }, 3000);

}


/* =========================
   RESET PAYMENT
========================= */

function resetPaymentForm() {

    const form =
        document.getElementById(
            "paymentForm"
        );


    const fields =
        document.getElementById(
            "formFields"
        );


    const stock =
        document.getElementById(
            "stockMessage"
        );


    const paymentOptions =
        document.getElementById(
            "paymentOptions"
        );


    const orderStatus =
        document.getElementById(
            "orderStatus"
        );


    form.classList.remove(
        "active"
    );


    stock.classList.remove(
        "active"
    );


    orderStatus.classList.remove(
        "active"
    );


    paymentOptions.style.display =
        "flex";


    fields.innerHTML = "";

}


/* =========================
   BURGER OPTIONS
========================= */

function openBurgerOptions(action) {

    burgerAction = action;


    document
        .getElementById(
            "burgerOptionsOverlay"
        )
        .classList.add(
            "active"
        );

}


/* =========================
   CLOSE BURGER OPTIONS
========================= */

function closeBurgerOptions() {

    document
        .getElementById(
            "burgerOptionsOverlay"
        )
        .classList.remove(
            "active"
        );

}


/* =========================
   SELECT BURGER CHEESE
========================= */

function selectBurgerCheese(addCheese) {

    let burgerName;

    let burgerPrice;


    if (addCheese) {

        burgerName =
            "Classic Burger + Cheese";

        burgerPrice =
            150;

    } else {

        burgerName =
            "Classic Burger";

        burgerPrice =
            120;

    }


    closeBurgerOptions();


    /* =========================
       BUY NOW
    ========================= */

    if (burgerAction === "buy") {

        buyNow(
            burgerName,
            burgerPrice
        );

    }


    /* =========================
       ADD TO CART
    ========================= */

    else if (burgerAction === "cart") {

        addToCart(
            burgerName,
            burgerPrice
        );

    }

}


/* =========================
   ESC KEY
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeCart();

            closePayment();

            closeBurgerOptions();

        }

    }
);


/* =========================
   INITIALIZE
========================= */

updateCart();