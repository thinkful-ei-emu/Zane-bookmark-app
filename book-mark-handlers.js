'use strict';

/* global store, $ */

// eslint-disable-next-line no-unused-vars
const bookMarkHandlers=(function(){

  function handleNewBookMarkButtonClick(){
    $('body').on('click','.new-bookmark-button',event=>{
      event.preventDefault();
      library.newFormClicked=true;
      render();
      
    });}
  //When a form is submitted the  function will take all the values and place them in an object,and pass the obj to the api.
  function handleNewItemSubmit() { 
    $('body').on('submit','#new-bookmark-form',function (event) {
      event.preventDefault();
      const title = $('.title-input').val();
      
      const rating=$('select.select-rating option:checked').val();
  
      const url=$('.url-input').val();
     
      const desc=$('.description-input').val();
      
      library.newFormClicked=false;
    
      

      const newItem={
        title,
        rating,
        url,
        desc
      };

      
      
      console.log('Handle new submit items ran');
      const pushedData= api.createItems(newItem)
        .then((item)=>{
          library.addNewItem(item);
          render();

        });
      console.log(`I am ${pushedData}`);
    });
  }

  function render(){
  
    let books=[...library.books];
    console.log('render ran');

    // This takes an array of objects and converts it to an array of strings
   
    //converts array of ojects into an array of strings   
    const bookMarkStrings=books.map((element)=>generateHtmlString(element));
    //Turns array into string with no spaces between
    const strings=  bookMarkStrings.join('');
      
       
    //Renders Directly to DOM
    $('.bookmarks').html(strings);
    const form=generateFormString();
    console.log(form);
    $('.new-book-section').html(form);
    
 
  } //render function end bracket
  // This function returns strings with key value pairs inside.
  function generateHtmlString(obj){
    console.log(`generate return string ran ${JSON.stringify(obj)}`);
    
    if(!obj.isExpanded)
    {return `<li class="full-bookmark" item-id="${obj.id}">
            <span class='book-Title-Js'>${obj.title}</span>
            <span class='book-rating'>${obj.rating}Stars</span>
            <span><button type="button" class="expand-button">Expand</button></span>
            <span><button type="button" class="delete-button">Delete</button></span>`;}
    else{
      return `<li class="full-bookmark" item-id="${obj.id}">
              <span class='book-Title-Js'>${obj.title}</span>
              <span class='book-rating'>${obj.rating}Stars</span>
              
                                          
              <div class='book-description'>
                  <span>${obj.desc}</span><br>
                  <span><a href=${obj.url}>Visit Here</a></span>
                  <span><button type="button" class="collapse-button">Collapse</button></span>
                  <span><button type="button" class="delete-button">Delete</button></span>
                  
                              
               </div></li>`;

              
            
         
    }  
                                        
            
  
  

  }

  function generateFormString(){
    if(library.newFormClicked){return `<form id="new-bookmark-form" name="new-bookmark-form"  class="new-bookmark-form">
    <label for="Title">Title</label>
    <span><input type="text" class='title-input'name='title-input' placeholder="Enter Title Here" required 
    minlength="1"></span>
    <label for="url-input">Insert url http://.....</label>
        <span><input type="text" class='url-input' name="url-input"value='http://'required minlength="8"></span>
        <label for="Rating">Rate Your Book</label>
    <span><select class='select-rating' name='select-rating'></span>
        <option value='1 Star'>1 Star</option>
        <option value='2 Stars'>2 Stars</option>
        <option value='3 Stars'>3 Stars</option>
        <option value='4 Stars'>4 Stars</option>
        <option value='5 Stars'>5 Stars</option>
    </select>
    <br>
    <label for='description' name='description'>Book Description</label>
    <input type='text' class='description-input'name='desc-input' placeholder="Enter Description of Your Book"required 
    minlength="1">
    <button type='submit' class="submit button">Submit</button>
    <button type='button' class='form-gone-button >Hide Form</button>`
    ;}
    else{
      return '<button type="button"class="new-bookmark-button" > Add New BookMark!</button>';
    }
  }

  // function handleHideFormButton(){
  //   $('body').on('click','.form-gone-button',event=>{
  //     event.preventDefault();
  //     $('#new-bookmark-form').toggle();
  //     $('.new-bookmark-button').toggle();});
    

  // }
  function getItemIdFromElement(item){
    console.log (item);
    console.log($(item)
      .closest('.full-bookmark'));
    return $(item)
      .closest('.full-bookmark')
      .attr('item-id');
      
      
  }
  function handleDeleteClickButton(){
    $('.bookmark-container-section').on('click','.delete-button', event =>{
      
      const  id= getItemIdFromElement(event.currentTarget);
      console.log(id);
      api.deleteItems(id)
        .then(()=>{
          library.findAndDelete(id);
          render();
        });
      console.log(id);});
  
    render();  }
  function handleExpandClick(){
    $('.bookmarks').on('click','.expand-button', event =>{
      const id = getItemIdFromElement(event.currentTarget);
      const currentBook=library.findById(id);
      currentBook.isExpanded=true;
      console.log('handle expand ran');
      render ();

    
    });
  }
  function collapseClick(){
    $('.bookmarks').on ('click','.collapse-button',event =>{
      const id = getItemIdFromElement(event.currentTarget);
      const currentBook=library.findById(id);
      currentBook.isExpanded=false;
      render();
    });
  }

  


  




  const bindEventListeners=function(){
    handleNewItemSubmit();
    handleNewBookMarkButtonClick();
    //handleHideFormButton();
    handleDeleteClickButton();
    handleExpandClick();
    collapseClick();
  };
  



  return{
    render:render,
    bindEventListeners:bindEventListeners

  };

})();
