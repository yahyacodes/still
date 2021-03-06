// 1st Modal
const btn = document.querySelector('.btn');
const modal = document.querySelector('.modal');
const btnClose = document.querySelector('.btn-close');
const btnClose2 = document.querySelector('.close');
const check = document.querySelector('#check');
// 2nd Modal
const modal2 = document.querySelector('#modal');
const close = document.querySelector('#close');
const cancel = document.querySelector('#cancel');
const save = document.querySelector('#save');

// section1
const section = document.querySelector('#section');
const select = document.querySelector('#select-service');
const providers = document.querySelector('#select-provider');
const locationInput = document.querySelector('#select-location');
const addbtn = document.querySelector('#button-addon');
const input = document.querySelector('#input');
const dataPrice = document.querySelector('#select-value');
const priceData = dataPrice.getAttribute('data-price');
const alertMss = document.querySelector('.alert');
const message = document.querySelector('.message');
// section2
let amount = document.querySelector('#amount');
const discount = document.querySelector('#discount');
const piadinitial = document.querySelector('#paid-initial');
const balance = document.querySelector('#balance');
localStorage.setItem('services', null);
localStorage.setItem('totalAmount', 0);

btn.onclick = function () {
  modal.style.display = 'block';
};

btnClose.onclick = function () {
  modal.style.display = 'none';
};

btnClose2.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  } else if (event.target === modal2) {
    modal2.style.display = 'none';
  }
};

// 2nd Modal
check.onclick = function () {
  modal2.style.display = 'block';
  modal.style.display = 'none';
  section.style.display = 'block';
};

close.onclick = function () {
  modal2.style.display = 'none';
};

cancel.onclick = function () {
  modal2.style.display = 'none';
};

modal.addEventListener('show.bs.modal', event => {
  return event.preventDefault();
});

save.onclick = function () {
  modal2.style.display = 'none';
};

section.style.display = 'none';

// dropdown selected option
select.addEventListener('change', () => {
  const priceValue = select.options[select.selectedIndex].dataset.price;

  input.value = priceValue;
  message.innerHTML = select.value;
});

// Amount calculation
piadinitial.addEventListener('input', function (e) {
  e.preventDefault();
  let amountPaid = parseFloat(piadinitial.value);
  let totalVal = parseFloat(localStorage.getItem('totalAmount'));
  let balanceVal = amount.innerHTML - amountPaid;
  balance.innerHTML = balanceVal;
});

discount.addEventListener('input', function (e) {
  e.preventDefault();
  let amountPaid = parseFloat(piadinitial.value);
  let discountMade = parseFloat(discount.value);
  let totalVal = parseFloat(localStorage.getItem('totalAmount'));
  amount.innerHTML = totalVal - discountMade;
  balance.innerHTML = amount.innerHTML;
  piadinitial.value = totalVal - discountMade;
});

// Table display on UI
class Services {
  constructor(service, provider, priceValue) {
    this.service = service;
    this.provider = provider;
    this.priceValue = priceValue;
  }
}

class UI {
  static displayService() {
    const services = Store.getServices();

    services.forEach(service => UI.addServiceToList(service));
  }
  static addServiceToList(service) {
    const list = document.querySelector('#service-list');

    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${service.service}</td>
    <td>${service.provider}</td>
    <td>${service.priceValue}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete" data-service="${service.service}">X</a></td>
    `;
    list.appendChild(row);
  }
  static deleteServices(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
      Store.removeService(el.dataset.service);
      const totalAmount = Store.getAmount();
      amount.innerHTML = totalAmount;
      piadinitial.value = totalAmount;
      balance.innerHTML = totalAmount;
    }
  }
}

//Local Storage
class Store {
  static getServices() {
    return JSON.parse(localStorage.getItem('services')) || [];
  }

  static addService(service) {
    const services = Store.getServices();

    services.push(service);

    localStorage.setItem('services', JSON.stringify(services));
  }

  //Add amount on UI
  static getAmount() {
    let totalAmount = parseFloat(localStorage.getItem('totalAmount'));
    if (!totalAmount) {
    }
    return totalAmount;
  }

  static addAmount(total) {
    const totalAmount = Store.getAmount() + total;
    return localStorage.setItem('totalAmount', totalAmount);
  }

  // Remove Items from UI
  static removeService(serviceName) {
    const services = Store.getServices();
    const removedService = services.find(
      service => service.service === serviceName
    );

    localStorage.setItem(
      'services',
      JSON.stringify(
        services.filter(service => service.service !== serviceName)
      )
    );

    if (removedService) {
      const currentTotal = parseFloat(localStorage.getItem('totalAmount'));
      let newTotal = currentTotal - parseFloat(removedService.priceValue);
      localStorage.setItem('totalAmount', newTotal);
    }
  }
}

//Table rows display on UI
addbtn.addEventListener('click', function () {
  amount.innerHTML = input.value; // <= Amount display on UI

  let service = select.value;
  const provider = document.querySelector('#select-provider').value;
  const price = select.options[select.selectedIndex].dataset.price;

  if (service === '' || provider === '' || price === '') {
    alert('Please choose from selectors');
  } else {
    const service5 = new Services(service, provider, price);

    //Assisted (Thanks to Muad)
    let serviceItems = JSON.parse(localStorage.getItem('services'));

    if (serviceItems) {
      const serviceArray = serviceItems.find(s => s.service === service);

      if (serviceArray) {
        alert('Service already added');

        return;
      }
    }

    Store.addService(service5);
    UI.addServiceToList(service5);
    Store.addAmount(parseFloat(input.value));
    const totalAmount = Store.getAmount();
    amount.innerHTML = totalAmount;
    piadinitial.value = totalAmount;
    balance.innerHTML = totalAmount;
  }
});

// Remove table rows from UI
document.querySelector('#service-list').addEventListener('click', e => {
  UI.deleteServices(e.target);
});
