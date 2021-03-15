var draggable = document.querySelectorAll('[draggable]')
var targets = document.querySelectorAll('[data-drop-target]');
var container = document.getElementsByClassName("container");
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

    draggedElement.parentNode.removeChild(draggedElement);
    this.appendChild(draggedElement); 
}