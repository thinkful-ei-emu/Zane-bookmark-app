'use strict';
/* global shoppingList, store, Item */
// eslint-disable-next-line no-unused-vars
$(document).ready(function() {
  bookMarkHandlers.bindEventListeners();
  bookMarkHandlers.render();
  api.getItems()
    .then((items)=>{
      items.forEach((item)=>library.addNewItem(item));
      bookMarkHandlers.render();
    });
 
});
