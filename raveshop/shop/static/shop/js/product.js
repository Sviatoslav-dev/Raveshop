/* eslint-env browser */
document.addEventListener('DOMContentLoaded', () => {
  const basketButton = document.querySelector('#basket_button');
  const addButtons = document.querySelectorAll('.add_button')[0];
  const addProductButton = document.querySelector('.add_product_button');
  const productNum = document.querySelector('#product_num');

  basketButton.addEventListener('click', () => {
    let basket = localStorage.getItem('basket');
    if (basket !== null) {
      basket = JSON.parse(basket);

      let count = 0;
      Object.keys(basket).forEach(() => {
        count += 1;
      });

      if (count > 0) {
        document.location.href = `/basket`;
      }
    }
  });

  addButtons.addEventListener('click', (event) => {
    let id = parseInt(event.target.id.slice(4), 10);

    addProductButton.addEventListener('click', () => {
      let basket = localStorage.getItem('basket');
      if (basket !== null) {
        basket = JSON.parse(basket);
      } else {
        basket = {};
      }
      basket[id] = productNum.value;
      localStorage.setItem('basket', JSON.stringify(basket));
    });
  });
});
