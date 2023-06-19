$(document).ready(function(){
  setInterval(() => {
    $('#saveBtn').click();
  }, 1);
});
// modal = document.getElementById('orientation');
// showBtn = document.getElementById('showBtn');
// showBtn.onclick = function () {
//   modal.style.display = "block";
// }
header_input = document.getElementById('header-input')
header_input.onchange = function () {
document.getElementById("header").innerHTML = header_input.value;
document.getElementById("header").classList.add('lg2:p-2','p-1.5');
}