/**
 * EasyHTTP Library
 * Library for making HTTP requests
 *
 * @version 2.5.0
 * @author  Marc Pulumbarit
 * @license MIT
 *
 **/


// asynchronous with promise
class EasyHTTP {

    // Make a HTTP GET Request
    //async version much compact
     async get(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
     }
    

     // Make a HTTP POST Request
     async post(url, data) {
    
           const response = await fetch(url, {
               method: 'POST',
               headers: {
                   'Content-type': 'application/json'
               },
               body: JSON.stringify(data)
           });

           const resData = await response.json();
           return resData;
          
     }




    // Make a HTTP PUT Request - pretty much the same as POST
    async put(url, data) {
        const response = await fetch(url, {
                   method: 'PUT',
                   headers: {
                       'Content-type': 'application/json'
                   },
                   body: JSON.stringify(data)
               });

               const resData = await response.json();
               return resData;

    }



    // Make a HTTP DELETE Request - doesnt need data + remove the body
    async delete(url) {
        const response =  await fetch(url, {
                       method: 'DELETE',
                       headers: {
                           'Content-type': 'application/json'
                       }

                   });

                   // Instead of response.json(), deleted message in string format
                   const resData = await 'Resource Deleted...';
                   return resData;
    
    }

}

// Instantiate the class

export const http = new EasyHTTP();