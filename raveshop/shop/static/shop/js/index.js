/* eslint-env browser */
document.addEventListener('DOMContentLoaded', () => {
  const basketButton = document.querySelector('#basket_button');
  const addProductButton = document.querySelector('.add_product_button');
  const productNum = document.querySelector('#product_num');
  const addButtons = document.querySelectorAll('.add_button');


  //localStorage.removeItem("basket");

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

  for (let i = 0; i < addButtons.length; i += 1) {
    addButtons[i].addEventListener('click', (event) => {

      const id = parseInt(event.target.parentElement.id.slice(5), 10);
      console.log(id);

      const addToBasketTitle = document.querySelector('#addToBasketTitle');
      const addToBasketImg = document.querySelector('#addToBasketImg');
      const addToBasketPrice = document.querySelector('#addToBasketPrice');

      const productBlock = event.target.parentElement;
      const productImgP = productBlock.children[0].children[0];
      const productTitle = productBlock.children[0].children[1];
      const productPrice = productBlock.children[1];

      addToBasketTitle.innerHTML = productTitle.innerHTML;
      addToBasketImg.setAttribute('src', productImgP.children[0].src);
      addToBasketPrice.innerHTML = productPrice.innerHTML;

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
  }
});
