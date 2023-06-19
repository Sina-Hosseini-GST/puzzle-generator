function addRow() {
      var list = document.getElementById('words-input');
      markup =`
      <li class="flex lg2:p-2 p-1.5 items-center bg-gray-400 border-b border-white">
              <div class="flex-1 lg2:px-2 px-1.5">
                <input name="hint" type="text" class="w-full px-2 py-1 focus:outline-none bg-white border-2 border-gray-100 focus:bg-white focus:border-gray-900 text-center" placeholder="Hint">
              </div>
              <div class="flex-1 lg2:px-2 px-1.5">
                <input name="answer" type="text" class="w-full px-2 py-1 focus:outline-none bg-white border-2 border-gray-100 focus:bg-white focus:border-gray-900 text-center" placeholder="Answer">
              </div>
              <button onclick="removeList(this)" class="rounded-none lg2:mx-2 mx-1.5 p-1 focus:outline-none bg-c-red-5 hover:bg-c-red-3 transition-colors duration-200">
                <img src="Images/Icons/delete.png" alt="Delete!" class="lg4:w-6 w-5 h-auto">
              </button>
          </li>
      `
      list.insertAdjacentHTML('beforeend', markup);
    }
  
    function removeList(e) {
      e.parentElement.remove()
    }
    
    var header_input = document.getElementById('header-input')
    header_input.onchange = function () {
      document.getElementById("header").innerHTML = header_input.value;
      document.getElementById("header").classList.add('lg2:p-2','p-1.5');
    }