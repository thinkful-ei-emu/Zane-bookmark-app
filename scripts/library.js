'use strict';

/* global Item */
// eslint-disable-next-line no-unused-vars

const library=(function(){

  
  const addNewItem=function(item){
    console.log('Add New Item Ran');
    item.isExpanded=false;
    this.books.push(item);
    console.log(this.books);
  };

  const findById=function(id){
    return this.books.find(item=>item.id ===id);
  };

  const findAndDelete = function(id) {
    this.books = this.books.filter(item => item.id !== id);
  };

  
  
  
  
  
  
  
  
  
  
  
  
  return {
    books:[],
    newFormClicked:false,
    filteredItem:1,
    addNewItem,
    findById,
    findAndDelete

  };
})();