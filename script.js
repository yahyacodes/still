const btn = document.querySelector(".btn");
const modal = document.querySelector(".modal");
const btnClose = document.querySelector(".btn-close");
const btnClose2 = document.querySelector(".close");
const check = document.querySelector("#check");
const modal2 = document.querySelector("#modal");
const close = document.querySelector("#close");
const cancel = document.querySelector("#cancel");
const save = document.querySelector("#save");

btn.onclick = function () {
  modal.style.display = "block";
};

btnClose.onclick = function () {
  modal.style.display = "none";
};

btnClose2.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  } else if (event.target === modal2) {
    modal2.style.display = "none";
  }
};

check.onclick = function () {
  modal2.style.display = "block";
  modal.style.display = "none";
  section.style.display = "block";
  // btnClose.click();
};

close.onclick = function () {
  modal2.style.display = "none";
};

cancel.onclick = function () {
  modal2.style.display = "none";
};

modal.addEventListener("show.bs.modal", (event) => {
  return event.preventDefault();
});

save.onclick = function () {
  modal2.style.display = "none";
};

// section1
const section = document.querySelector("#section");
const select = document.querySelector("#select-service");
const providers = document.querySelector("#select-provider");
const locationInput = document.querySelector("#select-location");
const addbtn = document.querySelector("#button-addon");
const input = document.querySelector("#input");
const dataPrice = document.querySelector("#select-value");
const priceData = dataPrice.getAttribute("data-price");
const alertMss = document.querySelector(".alert");
const message = document.querySelector(".message");

// section2
const amount = document.querySelector("#amount");
const discount = document.querySelector("#discount");
const piadinitial = document.querySelector("#paid-initial");
const balance = document.querySelector("#balance");

select.addEventListener("change", () => {
  const priceValue = select.options[select.selectedIndex].dataset.price;

  input.value = priceValue;
  message.innerHTML = select.value;
});

// section.style.display = "none";

addbtn.addEventListener("click", function () {
  amount.innerHTML = input.value;
});

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

    services.forEach((service) => UI.addServiceToList(service));
  }
  static addServiceToList(service) {
    const list = document.querySelector("#service-list");

    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${service.service}</td>
    <td>${service.provider}</td>
    <td>${service.priceValue}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }
  static deleteServices(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
}

// document.addEventListener("DOMContentLoaded", UI.displayService);
document.querySelector("#button-addon").addEventListener("click", (e) => {
  class Store {
    static getServices() {
      let services;
      if (localStorage.getItem("services") === null) {
        services = [];
      } else {
        services = JSON.parse(localStorage.getItem("services"));
      }
      return services;
    }

    static addService(service) {
      const services = Store.getServices();

      services.push(service);

      localStorage.setItem("services", JSON.stringify(services));
    }
    static removeService(dataPrice) {
      const services = Store.getServices();

      services.forEach((service, index) => {
        if (services.priceValue === priceValue) {
          services.splice(index, 1);
        }
      });
      localStorage.removeItem("services", JSON.stringify(services));
    }

    static getAmount() {
      let totalAmount = parseFloat(localStorage.getItem("totalAmount"));
      if (!totalAmount) {
      }
      return totalAmount;
    }

    static addAmount(total) {
      const totalAmount = Store.getAmount() + total;
      return localStorage.setItem("totalAmount", totalAmount);
    }
  }

  const service = document.querySelector("#select-service").value;
  const provider = document.querySelector("#select-provider").value;
  const price = select.options[select.selectedIndex].dataset.price;

  if (service === "" || provider === "" || price === "") {
    alert("Please choose from selectors");
  } else {
    const service5 = new Services(service, provider, price);

    UI.addServiceToList(service5);
    Store.addAmount(parseFloat(input.value));
    const totalAmount = Store.getAmount();
    amount.innerHTML = totalAmount;
  }
});

document.querySelector("#service-list").addEventListener("click", (e) => {
  UI.deleteServices(e.target);

  Store.removeService(Services);
});
