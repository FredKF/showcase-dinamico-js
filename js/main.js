var draggable = document.querySelectorAll('[draggable]')
var targets = document.querySelectorAll('[data-drop-target]');
var container = document.getElementsByClassName("container");
var rows = document.getElementsByClassName("row");
var rowNode = rows[0];
let quantity = 0;
var quantityElement = document.getElementById("quantity");
let images = document.getElementsByClassName("image");

for(var i = 0; i < draggable.length; i++) {
    draggable[i].addEventListener("dragstart", handleDragStart);
}

for(var i = 0; i < targets.length; i++) {
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
    let imageInCartCount = 0;
    var draggedId = e.dataTransfer.getData("text");
    var draggedElement = document.getElementById(draggedId); 
    let shoppingCartNode = document.getElementById("shopping-cart");
    let shopingCartChildren = shoppingCartNode.children;

    


    if(this.id == "shopping-cart")
    {        
        if(draggedElement.parentNode.id != this.id){
            quantity++;
            quantityElement.innerHTML = quantity;
        }
        draggedElement.parentNode.removeChild(draggedElement);
        this.appendChild(draggedElement);
    }else if(this.id == "product-container" && this.children.length === 0){
          if(draggedElement.parentNode.id == "shopping-cart"){
          quantity--;
          quantityElement.innerHTML = quantity;
        }        
        draggedElement.parentNode.removeChild(draggedElement);
        this.appendChild(draggedElement); 
    }
}