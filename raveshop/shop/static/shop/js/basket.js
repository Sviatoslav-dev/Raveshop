/* eslint-env browser */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('customer_data');
  form.addEventListener('submit', SubmitEntry);

  function countTotalCost() {
    const totalCostText = document.querySelector('#total_cost');
    const prices = document.querySelectorAll('.price');
    const counts = document.querySelectorAll('.count');

    let totalCost = 0;

    for (let i = 0; i < prices.length; i += 1) {
      totalCost += parseInt(prices[i].innerHTML) * parseInt(counts[i].value);
    }
    totalCostText.innerHTML = 'Total cost: ' + totalCost.toString() + ' $';
  }

  function inputCountChange (event) {
    let id = event.target.parentElement.parentElement.id;
    id = parseInt(id.slice(5), 10);
    let basket = localStorage.getItem('basket');
    if (basket !== null) {
      basket = JSON.parse(basket);
    } else {
      basket = {};
    }
    basket[id] = event.target.value;
    localStorage.setItem('basket', JSON.stringify(basket));
    countTotalCost();
  }

  function showBasket(products, basket) {
    const basketContainer = document.querySelector('#basket_container');
    for (let i = 0; i < products.length; i += 1) {
      const row = document.createElement('div');
      row.setAttribute('class', 'row mt-3');
      row.setAttribute('id', `item_${products[i].id}`);

      const img_col = document.createElement('div');
      img_col.setAttribute('class', 'col');
      const img = document.createElement('img');
      img.setAttribute('src', products[i].img_url);
      img.setAttribute('width', '100');
      img.setAttribute('height', '100');
      img_col.appendChild(img);
      row.appendChild(img_col);

      const url_col = document.createElement('div');
      url_col.setAttribute('class', 'col');
      const url = document.createElement('a');
      url.appendChild(document.createTextNode(products[i].name));
      url.setAttribute('href', '/product/' + products[i].id.toString());
      url_col.appendChild(url);
      row.appendChild(url_col);

      const price_col = document.createElement('div');
      price_col.setAttribute('class', 'col');
      const priceP = document.createElement('p');
      const priceText = document.createElement('h5');
      priceText.setAttribute('class', 'price');
      priceText.innerHTML = products[i].price.toString() + ' $';
      priceP.appendChild(priceText);
      price_col.appendChild(priceP);
      row.appendChild(price_col);

      const num_col = document.createElement('div');
      num_col.setAttribute('class', 'col');
      const inputCount = document.createElement('input');
      inputCount.setAttribute('type', 'number');
      inputCount.setAttribute('step', '1');
      inputCount.setAttribute('min', '1');
      inputCount.setAttribute('max', '100');
      inputCount.setAttribute('value', basket[products[i].id]);
      inputCount.setAttribute('class', 'count');
      inputCount.addEventListener('change', inputCountChange);
      const span = document.createElement('span');
      span.innerHTML = ' шт.';
      num_col.appendChild(inputCount);
      num_col.appendChild(span);
      row.appendChild(num_col);

      const delete_col = document.createElement('div');
      delete_col.setAttribute('class', 'col');
      const delete_button = document.createElement('button');
      delete_button.setAttribute('id', `remove_button_${products[i].id}`);
      delete_button.appendChild(document.createTextNode('Remove'));
      delete_button.setAttribute('class', 'remove_button btn btn-danger');
      delete_col.appendChild(delete_button);
      row.appendChild(delete_col);

      basketContainer.appendChild(row);
    }

    const totalCostRow = document.createElement('div');
    totalCostRow.setAttribute('class', 'row mt-5');
    const totalCostCol = document.createElement('div');
    totalCostRow.setAttribute('class', 'col');
    const totalCostText = document.createElement('h3');
    totalCostText.setAttribute('id', 'total_cost');
    totalCostText.setAttribute('class', 'text-center');
    totalCostCol.appendChild(totalCostText);
    totalCostRow.appendChild(totalCostCol);
    basketContainer.appendChild(totalCostRow);

    countTotalCost();
  }

  function getProducts() {
    let basket = localStorage.getItem('basket');
    if (basket !== null) {
      console.log(basket);
      basket = JSON.parse(basket);

      let count = 0;
      Object.keys(basket).forEach(() => {
        count += 1;
      });

      if (count > 0) {
        let products = '';
        Object.keys(basket).forEach((key) => {
          products += key.toString() + ' ';
        });

        console.log(products);
        fetch('/basket/get_products', {
          method: 'POST',
          cache: 'no-cache',
          headers: new Headers({
            'content-type': 'application/json',
          }),
          body: JSON.stringify({'products': products})
        }).then(response =>
          response.json()
        ).then(text => {
          console.log(text);
          showBasket(text, basket);
          setDelButtons();
        }).catch(e => {
          //console.log(e.text);
          //toast(e, false);
        });
      }
    }
  }

  getProducts();

  function setDelButtons () {
    const removeButtons = document.querySelectorAll('.remove_button');

    for (let i = 0; i < removeButtons.length; i += 1) {
      removeButtons[i].addEventListener('click', (event) => {
        const item = event.target.parentElement.parentElement;
        console.log(item.id);
        const id = parseInt(item.id.slice(5), 10);
        console.log(id);

        let basket = localStorage.getItem('basket');
        if (basket !== null) {
          basket = JSON.parse(basket);
        } else {
          basket = {};
        }
        delete basket[id];
        localStorage.setItem('basket', JSON.stringify(basket));
        console.log(localStorage.getItem('basket'));
        item.remove();
      });
    }
  }

  function SubmitEntry(e) {
    let basketData = document.getElementById('basket_data');
    basketData.value = localStorage.getItem('basket').toString();
    // alert(basketData.value);

    //e.preventDefault();

    // if (validation(form.elements)) {
    //   const entry = Object.fromEntries(Array.from(form.elements).map(el => [el.name, el.value]));
    //   entry['basket'] = localStorage.getItem('basket');

      // form.classList.add('sending');
      // fetch('/contact', {
      //   method: 'POST',
      //   body: JSON.stringify(entry),
      //   cache: 'no-cache',
      //   headers: new Headers({
      //     'content-type': 'application/json',
      //   }),
      // }).then(response => {
      //   if (response.status === 200) {
      //     return Promise.resolve(response);
      //   } else {
      //     return Promise.reject(new Error(response.statusText));
      //   }
      // }).then(() => {
      //   form.reset();
      //   toast('Message sent successfully');
      // }).catch(error => {
      //   toast(error, false);
      // }).then(() => {
      //   form.classList.remove('sending');
      // });
    // } else {
    //   //toast('Wrong input', false);
    // }
  }
});
