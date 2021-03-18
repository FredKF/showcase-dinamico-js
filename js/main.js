var draggables = document.querySelectorAll('[draggable]')
var targets = document.querySelectorAll('[data-drop-target]');
let productQuantity = 0;
var quantityNode = document.getElementById("quantity");
const shoppingCartId = "shopping-cart";
const productContainerId = "product-container";

for(var i = 0; i < draggables.length; i++) {
    draggables[i].addEventListener("dragstart", handleDragStart);
}

for(var i = 0; i < targets.length; i++) 
{
    targets[i].addEventListener("dragover", handleOverDrop);
    targets[i].addEventListener("drop", handleOverDrop);
}

function handleDragStart(e) {
    e.dataTransfer.setData("text", this.id);
}

function handleOverDrop(e) {
    e.preventDefault(); 
    if (e.type != "drop") {
        return;
    }
    var draggedId = e.dataTransfer.getData("text");
    var draggedElement = document.getElementById(draggedId); 

    if(this.id == shoppingCartId)
    {        
        if(draggedElement.parentNode.id != this.id)
        {
            productQuantity++;
            quantityNode.innerHTML = productQuantity;
        }

        draggedElement.parentNode.removeChild(draggedElement);
        this.appendChild(draggedElement);
    }
    else if(this.id == productContainerId && this.children.length === 0)
    {
        if(draggedElement.parentNode.id == shoppingCartId)
        {
            productQuantity--;
            quantityNode.innerHTML = productQuantity;
        }    

        draggedElement.parentNode.removeChild(draggedElement);
        this.appendChild(draggedElement); 
    }
}