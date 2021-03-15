function allowDrop(ev){
    ev.preventDefault();    
}

function drag(ev){
    quantity--;
    quantityElement.innerHTML = quantity;
    ev.dataTransfer.setData("data", ev.target.id);
}

function drop(ev){    
    ev.preventDefault();
    quantityElement.innerHTML = quantity;
    var data = ev.dataTransfer.getData("data"); 
    ev.target.appendChild(document.getElementById(data));        
}

function dropOnCart(ev){
    quantity++;
    ev.preventDefault();

}