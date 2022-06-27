document.addEventListener('DOMContentLoaded', () => {
    const basketButton = document.querySelector('#basket_button'),
        add_buttons = document.querySelectorAll('.add_button');

    localStorage.removeItem('basket');

    basketButton.addEventListener('click', () => {
        let basket = localStorage.getItem('basket');
        console.log(basket);
        if (basket !== null) {
            basket = JSON.parse(basket);

            let count = 0;
            for(let key in basket) {
                count++;
            }

            if (count > 0) {
                let get_body = '?';
                for (var key in basket) {
                    get_body += key.toString() + '=';
                    get_body += basket[key].toString();
                    get_body += '&';
                }
                get_body = get_body.slice(0, -1);
                console.log(get_body);
                document.location.href = '/basket' + get_body;
            }
        }
    });


    for (let i = 0; i < add_buttons.length; i++) {
        add_buttons[i].addEventListener('click', (event) => {
            var count = prompt("Please enter amount", "1");
            count = parseInt(count);

            let id = parseInt(event.target.id.slice(7));

            let basket = localStorage.getItem('basket');
            if (basket !== null) {
                basket = JSON.parse(basket);
            } else {
                basket = {};
            }
            basket[id] = count;
            localStorage.setItem('basket', JSON.stringify(basket));
        });
    }
});