let productQuantity = 0;
let totalPrice = 0;
const shoppingCartId = "shopping-cart";
const productsContainerId = "product-container";
let draggables = document.querySelectorAll('[draggable]')
let targets = document.querySelectorAll('[data-drop-target]');
let quantityNode = document.getElementById("quantity");
let shoppingCart = document.getElementById(shoppingCartId);
let productContainer = document.getElementById(productsContainerId);
let totalPriceNode = document.getElementById("total-price");
let orderTextNode = document.getElementById("order-text");
let shoppingCartHeaderNode = document.getElementById("shopping-cart-header");

for(draggable of draggables) 
{
    draggable.addEventListener("dragstart", handleDragStart);
}

for(target of targets) 
{
    target.addEventListener("dragover", handleOverDrop);
    target.addEventListener("drop", handleOverDrop);
}

function handleDragStart(e) 
{
    e.dataTransfer.setData("text", this.id);
} 

function emptyCartStyles()
{
   shoppingCart.className = "shopping-cart order-container";
   orderTextNode.innerHTML ="Drag your items here!";
   quantityNode.className = "invisible";
   totalPriceNode.className = "invisible";
   shoppingCartHeaderNode.className = "shopping-cart-header centered";
}

function defaultCartStyles()
{
   shoppingCart.className = "shopping-cart";
   orderTextNode.innerHTML ="Your Order";
   quantityNode.className = "visible";
   totalPriceNode.className = "quantity total-price visible";
   shoppingCartHeaderNode.className = "shopping-cart-header";
}

if(productQuantity == 0) emptyCartStyles()

function handleOverDrop(e) {
    e.preventDefault(); 
    if (e.type != "drop") {
        return;
    }
    let draggedId = e.dataTransfer.getData("text");
    let draggedElement = document.getElementById(draggedId); 
    let currentPriceElement = document.getElementById(draggedElement.id + "-price");    

    if(this.id == shoppingCartId)
    {   
        if(draggedElement.id != this.id)
        {
            productQuantity++;
            quantityNode.innerHTML = productQuantity;
            draggedElement.className = "cart-dropped";
        }        
        currentPriceElement.className="invisible";
        draggedElement.parentNode.removeChild(currentPriceElement);
        draggedElement.parentNode.removeChild(draggedElement);        
        draggedElement.appendChild(currentPriceElement);
        this.appendChild(draggedElement);     
        totalPrice = totalPrice + Number(draggedElement.getAttribute("price"));
        totalPriceNode.innerHTML = "$" + totalPrice.toString();
        productQuantity == 0 ? emptyCartStyles() : defaultCartStyles()
    }
    else if(this.id == productsContainerId && this.children.length === 0)    
    {
        if(draggedElement.parentNode.id == shoppingCartId)
        {
            productQuantity--;
            quantityNode.innerHTML = productQuantity;
            totalPrice = totalPrice - Number(draggedElement.getAttribute("price"));
            totalPriceNode.innerHTML = "$" + totalPrice.toString();
        }
        currentPriceElement.className = "visible product-price";
        draggedElement.parentNode.removeChild(draggedElement);               
        this.appendChild(draggedElement);
        this.appendChild(currentPriceElement);
        draggedElement.className = "image";
        productQuantity == 0 ? emptyCartStyles() : defaultCartStyles()
    }
}