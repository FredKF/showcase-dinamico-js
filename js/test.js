var draggable = document.querySelectorAll('[draggable]')
var targets = document.querySelectorAll('[data-drop-target]');
var container = document.getElementsByClassName("container");
var rows = document.getElementsByClassName("row");
var rowNode = rows[0];
let quantity = 0;
var quantityElement = document.getElementById("quantity");

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
    var draggedId = e.dataTransfer.getData("text");
    var draggedElement = document.getElementById(draggedId);
    var result = this.parentNode.isEqualNode(rowNode);    

    if(this.id == "shopping-cart" || this.id == draggedElement.id)
    {
        draggedElement.parentNode.removeChild(draggedElement);
        this.appendChild(draggedElement);
        quantity++;
        quantityElement.innerHTML = quantity;
    }  

    if(this.id == draggedElement.id + "-container")
    {
        draggedElement.parentNode.removeChild(draggedElement);
        this.appendChild(draggedElement); 
        quantity--;
        quantityElement.innerHTML = quantity;
    }
}