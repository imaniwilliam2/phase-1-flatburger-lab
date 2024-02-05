// index.js
const restaurantMenu = document.getElementById('restaurant-menu') 

let currentlyDisplayedBurger 
// Callbacks
const displayBurgerDetails = (burger) => {
    currentlyDisplayedBurger = burger

    const nameElement = document.getElementById('name')
    nameElement.textContent = burger.name

    const burgerImage = document.getElementById('image')
    burgerImage.src = burger.image

    const numberInCart = document.getElementById('number-in-cart-count')
    numberInCart.textContent = burger.number_in_cart
};

const addToCart = () => {
    const cartForm = document.getElementById('add-to-cart-form')
    cartForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const inputElement = document.getElementById('number-to-add')
        const numberInCart = document.getElementById('number-in-cart-count')
        // numberInCart.textContent += inputElement.value
        numberInCart.textContent = Number(inputElement.value) + Number(numberInCart.textContent)
        // console.log(typeof numberInCart.textContent)
        // console.log(typeof inputElement.ariaValueMax)
    })
}

const addBurgerNamesToMenu = () => {
    return fetch('http://localhost:3000/burgers') 
    .then(res => res.json())
    .then(burgers => {
        burgers.forEach((burger) => {
            const spanElement = document.createElement('span')
            spanElement.textContent = burger.name

            const burgerDiv = document.createElement('div')
            const deleteButton = document.createElement('btn')
            deleteButton.textContent = 'DELETE'
            deleteButton.addEventListener('click', () => {
                deleteButton.parentNode.remove()
                if(currentlyDisplayedBurger.id === burger.id){
                    const defaultData = {
                        name: 'Name of Burger',
                        image: './assets/image-placeholder.jpg',
                        number_in_cart: '[X]'
                    }
                    displayBurgerDetails(defaultData)
                }
          })

            burgerDiv.appendChild(spanElement)
            burgerDiv.appendChild(deleteButton)
            restaurantMenu.appendChild(burgerDiv)


            spanElement.addEventListener('click', () => {
                displayBurgerDetails(burger)
             })
        }) 
        displayBurgerDetails(burgers[0])
        
    })
};

const main = () => {
    addBurgerNamesToMenu()
    addToCart()
}

main()

