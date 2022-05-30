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
