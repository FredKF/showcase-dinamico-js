const quantityElement = document.getElementById("quantity");
let quantity = 0;

function allowDrop(ev){
    ev.preventDefault();    
}

function drag(ev){
    ev.dataTransfer.setData("data", ev.target.id);
}

function drop(ev){
    ev.preventDefault();
    quantityElement.innerHTML = quantity++;
    var data = ev.dataTransfer.getData("data"); 
    ev.target.appendChild(document.getElementById(data));        
}