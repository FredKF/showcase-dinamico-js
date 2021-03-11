const productContents = document.querySelectorAll('.image');
const shoppingCart = document.querySelector('.shopping-cart');

shoppingCart.addEventListener('dragover', dragOver);
shoppingCart.addEventListener('dragenter', dragEnter);
shoppingCart.addEventListener('dragleave', dragLeave);
shoppingCart.addEventListener('drop', dragDrop);

for (const productContent of productContents ){
    productContent.addEventListener('dragstart', dragStart);
    productContent.addEventListener('dragend', dragEnd);    
}  

function dragStart(theEvent) {
    theEvent.dataTransfer.setData("Text", theEvent.target.id);        
    this.className += ' hold';
    setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
  this.className = 'product-content';
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.className += ' hovered';
}

function dragLeave() {
//   this.className = 'empty-box';
}

function dragDrop() {  
     // this.className += '';
     theEvent.dataTransfer.getData("Text");
    //  this.append(productContent);
}
