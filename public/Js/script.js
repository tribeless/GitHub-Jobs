   'use strict';

   //lets use fetch api
let DATA_URL = 'https://jobguide.herokuapp.com/messages';

fetch(DATA_URL)
.then(response=>response.json())
.then(
  data=>{
 
       let current_page = 1;
       let rows_per_page = 10;
       let newD = document.getElementById("new");
       let btn = document.getElementById("pagination_btns");
       let active = document.querySelector(".active");

        function scrollToTop() {
          window.scrollTo(0, 0);
        }
       //just grouping my data into rows
       function arrangeMyList(wrapper,items, listrows, page) {

         page--;
         wrapper.innerHTML = "";
         let start = listrows * page;
         let end = start + listrows;
         let paginated_items = items.slice(start, end);
         let output = "";
         for (let i = 0; i < paginated_items.length; i++) {
           
          let item = paginated_items[i];


          output = `
              <div id ="main">

                <div class = "contents card blue-grey darken-1 con">
                <div class ="big-heading">${item.title}</div> 
                <a href = "${item.url}" class="description" target="blank" style="display:block;">Job Description</a> 
                <span class="company"><i class="fas fa-building"></i> ${item.company}</span> 
                <span class="ft-pt"><i class="fas fa-hourglass"></i> ${item.type}</span> 
                <span class="location"><i class="fas fa-search-location"></i> ${item.location}</span> 
                </div>

                </div>
          `;
          let another = document.createElement("div");
          another.classList.add("row");
          another.innerHTML=output;
          wrapper.appendChild(another)
              
         }

        }

        //determining the number of buttons to be displayed
        function paginateMyList(wrapper, items, listrows) {
          wrapper.innerHTML = "";
          let page_number = Math.ceil(items.length / listrows);

          for (let i=1;i<page_number+1;i++) {
                      
            let button = paginatedItems(i, items);
           
            wrapper.appendChild(button);
          }

        }

        //adding functionality to the buttons
        function paginatedItems(page, items) {
          let button = document.createElement("button");
          button.classList.add("btn-small");
          button.classList.add("btn");
          button.innerText = page;
          active.innerHTML = `Page 1`;
          button.addEventListener("click", () => {
              scrollToTop();
              current_page = page;
              arrangeMyList(newD, items, rows_per_page, current_page);
              active.innerHTML = `Page ${page}`;
          })
          return button;
        }

       

//calling my functions
arrangeMyList(newD,data, rows_per_page, current_page);
paginateMyList(btn, data, rows_per_page);
})
.catch(error=>{
  console.log(error);
})

