class UI {
    constructor(){
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.formState = 'add';
    }

    // will displays the posts in the UI
    // Show all posts
    showPosts(posts) {
        // console.log(posts);
        let output = '';

        posts.forEach((post) => {
            // need to access the id so we know which one to edit
            // so we use a data-attribute, HTML5 allows you to have custom attributes with prefix of "data-"
            output += `
            <div class ="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="edit card-link" data-id="${post.id}">
                        <i class="fa fa-pencil"></i>
                    </a>
                    <a href="#" class="delete card-link" data-id="${post.id}">
                    <i class="fa fa-remove"></i>
                </a>
                </div>
            </div>
            `
        });
        // this is where we put it inside of the div tags with class posts
        this.post.innerHTML = output;
    }

    // Show alert message
    showAlert(message, className) {
        this.clearAlert();

        // create div
        const div = document.createElement('div');
        // Add classes
        div.className = className
        // in that div we want to Add Text which will be the passed message
        div.appendChild((document.createTextNode(message)));

        // Now insert the above into the DOM
        // Get Parent
        const container = document.querySelector('.postsContainer');
        // Get posts
        const posts = document.querySelector('#posts');
        // Insert alert div - insert div before posts
        container.insertBefore(div, posts)

        // Timeout
        setTimeout(() => {
            this.clearAlert();
        }, 3000);

    }

    // Clear alert message
    clearAlert() {
       const currentAlert = document.querySelector('.alert');

       // test to see if theres an alert then remove it
       if(currentAlert){
           currentAlert.remove();
       }

    }

    // Clear all fields
    clearFields() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    // Fill form to edit
    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

    }

}

// export the module
export const ui = new UI();