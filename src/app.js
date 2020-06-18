import { http } from './http';
import { ui } from './ui';

// Get Posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
// Using event delegation
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// now this is where we use our http module

// Get Posts
function getPosts() {
  //we pass our fake API here, remember the get method takes in a url
  // since get is an async method it will return a promise so we handle it with .then()
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
    // (data =>console.log(data))
  .catch(err => console.log(err))
}

// Add Post
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = {
    // ES2015 syntax same as title: title
    title,
    body
  }

  // Create Post request - submit data to be processed to a specified resource
  // in this case we post the inputted data to the our JSON object API
  http.post('http://localhost:3000/posts', data)
  .then(data => {
    //show alert we pass in the message and classes
    ui.showAlert('Post added', 'alert alert-success');
    ui.clearFields();
    getPosts();
    // once we add the post, then we want to see it added, need to use getPosts again
    // which will get the post including the new one that we just added
    getPosts();
  })
  .catch(err => console.log(err));
}

// Delete Post
function deletePost(e) {
  // using event delegation to get the target element delete
  // TEST-console.log(e.target) to check the target, the element the event happens on
  // TEST-console.log(e.target.parentElement) - give us the 'a' link tag
  // so we check if the a tag contains delete
  if(e.target.parentElement.classList.contains('delete')){
    
    // once we get the element with class delete we want to create an id variable
    // when we look in the ui.js where this element is generated we have a data id attribute
    // and thats how we can tell which post to delete, so we get the id below
    // get id for a tag
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')){
      // delete the item with the target id
      http.delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        ui.showAlert('Post Removed', 'alert alert-success');
        // get the posts again not the item has removed
        getPosts();
      })
      .catch(err => console.log(err));
    }
  }
  // prevent default link action
  e.preventDefault();
}

// Enable Edit State
function enableEdit(e) {
 // console.log(e.target) - we get the pencil icon when we click on edit button
 // so we need to go one above to get the a tag, then get the class edit
 if(e.target.parentElement.classList.contains('edit')){
  // TEST - console.log(e.target.parentElement); gets the a tag like delete
  // get the id attribute again like delete
  const id = e.target.parentElement.dataset.id;
  // TEST - to get post body content console.log(e.target.parentElement.previousElementSibling.textContent);
  // if we did parentElement.parentElement it would take us to cardBody
  const body = e.target.parentElement.previousElementSibling.textContent;
  // To get the title we go up another sibling
  const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

  const data = {
    id,
    body,
    title
  
  }

  // Fill form with current post
  ui.fillForm(data);
 }

 e.preventDefault();

}