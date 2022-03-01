const $addToppingBtn = document.querySelector('#add-topping');
const $pizzaForm = document.querySelector('#pizza-form');
const $customToppingsList = document.querySelector('#custom-toppings-list');

const handleAddTopping = event => {
  event.preventDefault();

  const toppingValue = document.querySelector('#new-topping').value;

  if (!toppingValue) {
    return false;
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'topping';
  checkbox.value = toppingValue;
  checkbox.id = toppingValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const label = document.createElement('label');
  label.textContent = toppingValue;
  label.htmlFor = toppingValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const divWrapper = document.createElement('div');

  divWrapper.appendChild(checkbox);
  divWrapper.appendChild(label);
  $customToppingsList.appendChild(divWrapper);

  toppingValue.value = '';
};

const handleUserSubmit = event => {
  event.preventDefault();

  const userName = $pizzaForm.querySelector('#pizza-name').value;
  const createdBy = $pizzaForm.querySelector('#created-by').value;
  const size = $pizzaForm.querySelector('#pizza-size').value;
  const toppings = [...$pizzaForm.querySelectorAll('[name=topping]:checked')].map(topping => {
    return topping.value;
  });

  if (!userName || !createdBy || !toppings.length) {
    return;
  }

  const formData = { userName, createdBy, size, toppings };

  fetch('/api/pizzas', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(postResponse => {
      console.log(postResponse);
    })
    .catch(err => {
      console.log(err);
      saveRecord(formData);
      // DO INDEXED DB STUFF HERE
    });
};

$pizzaForm.addEventListener('submit', handleUserSubmit);
$addToppingBtn.addEventListener('click', handleAddTopping);