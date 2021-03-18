let draggables = document.querySelectorAll('[draggable]')
let targets = document.querySelectorAll('[data-drop-target]');
let productQuantity = 0;
let quantityNode = document.getElementById("quantity");
const shoppingCartId = "shopping-cart";
let shoppingCart = document.getElementById(shoppingCartId);
const productsContainerId = "product-container";
let productContainer = document.getElementById(productsContainerId);
let totalPriceNode = document.getElementById("total-price");
let totalPrice = 0;

for(draggable of draggables) 
{
    draggable.addEventListener("dragstart", handleDragStart);
}

for(target of targets) 
{
    target.addEventListener("dragover", handleOverDrop);
    target.addEventListener("drop", handleOverDrop);
}

function handleDragStart(e) {
    e.dataTransfer.setData("text", this.id);
}

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
        totalPriceNode.innerHTML = totalPrice.toString();
    }
    else if(this.id == productsContainerId && this.children.length === 0)    
    {
        if(draggedElement.parentNode.id == shoppingCartId)
        {
            productQuantity--;
            quantityNode.innerHTML = productQuantity;
            totalPrice = totalPrice - Number(draggedElement.getAttribute("price"));
            totalPriceNode.innerHTML = totalPrice.toString();
        }
        currentPriceElement.className = "visible product-price";
        draggedElement.parentNode.removeChild(draggedElement);               
        this.appendChild(draggedElement);
        this.appendChild(currentPriceElement);
        draggedElement.className = "image";
    }
}