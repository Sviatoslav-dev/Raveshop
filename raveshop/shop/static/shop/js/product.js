/* eslint-env browser */
document.addEventListener('DOMContentLoaded', () => {
  const addButtons = document.querySelectorAll('.add_button')[0];
  const addProductButton = document.querySelector('.add_product_button');
  const productNum = document.querySelector('#product_num');

  addButtons.addEventListener('click', (event) => {
    let id = parseInt(event.target.id.slice(4), 10);

    addProductButton.addEventListener('click', () => {
      console.log(productNum.value);
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
