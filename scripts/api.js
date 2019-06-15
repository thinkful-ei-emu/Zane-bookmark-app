'use strict';

/* global Item */
// eslint-disable-next-line no-unused-vars



const api=(function(){

  const BASE_URL='https://thinkful-list-api.herokuapp.com/zanekuehn/bookmarks';
  const listApiFetch = function(...args) {
    
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          
          error = { code: res.status };
  
          if (!res.headers.get('content-type').includes('json')) {
            error.message = res.statusText;
            return Promise.reject(error);
          }
        }
  
          
        return res.json();
      })
      .then(data => {
        
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
  
        return data;
      });
  };

  const getItems=function(){
    return listApiFetch(`${BASE_URL}`);
  };
  const createItems=function(obj){
    console.log(obj);

    const newItem=JSON.stringify(obj);
    return listApiFetch(`${BASE_URL}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: newItem
    });};

  const deleteItems=function(id){
    return listApiFetch(`${BASE_URL}/${id}`,{
      method:'DELETE'
    });
  };

  


  
  return {
    getItems,
    createItems,
    listApiFetch,
    deleteItems
  };
  
}) ();


