
if(document.getElementById('plus')) {
    document.getElementById('plus').addEventListener('click', (event) => {
        event.preventDefault();

        let priceValue = parseFloat(document.getElementById('priceValue').value)
        let quantity = parseInt(document.getElementById('quantity').value)
        let priceHidden = parseFloat(document.getElementById('priceHidden').value)

        priceValue += priceHidden;
        quantity += 1;

        document.getElementById('quantity').value = quantity;
        document.getElementById('priceValue').value = priceValue.toFixed(2);
        document.getElementById('total').innerHTML = quantity;
    })
}

if(document.getElementById('minus')) {
    document.getElementById('minus').addEventListener('click', (event) => {
        event.preventDefault();

        let priceValue = parseFloat(document.getElementById('priceValue').value)
        let quantity = parseInt(document.getElementById('quantity').value)
        let priceHidden = parseFloat(document.getElementById('priceHidden').value)

        if(quantity === 1) {
            quantity = 1;
            priceValue = priceHidden;
            return;
        } else {
            priceValue -= priceHidden;
            quantity -= 1;
        }

        document.getElementById('quantity').value = quantity;
        document.getElementById('priceValue').value = priceValue.toFixed(2);
        document.getElementById('total').innerHTML = quantity;
    })
}