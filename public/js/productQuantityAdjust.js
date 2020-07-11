const agnosticEventFunc = (event) => {
    event.preventDefault();

    let priceValue = parseFloat(document.getElementById('priceValue').value);
    let quantity = parseInt(document.getElementById('quantity').value);
    let priceHidden = parseFloat(document.getElementById('priceHidden').value);
    
    if (event.target.id === 'plus') {
        priceValue += priceHidden;
        quantity += 1;
    
    } else if (event.target.id === 'minus') {
        
        if(quantity === 1) {
            quantity = 1;
            priceValue = priceHidden;
            return;
        } else {
            
            priceValue -= priceHidden;
            quantity -= 1;
        }
    }
    

    document.getElementById('quantity').value = quantity;
    document.getElementById('priceValue').value = priceValue.toFixed(2);
    document.getElementById('total').innerHTML = quantity;
}


if(document.getElementById('plus')) {
    document.getElementById('plus').addEventListener('click', agnosticEventFunc)
}

if(document.getElementById('minus')) {
    document.getElementById('minus').addEventListener('click', agnosticEventFunc)
}