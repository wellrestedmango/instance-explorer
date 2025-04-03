let postElement = document.createElement('article');
let postCardHolder = document.getElementById('card-holder');

function formCollect(event){
    event.preventDefault();
    const instanceElement = document.getElementById("instance");
    const instance = instanceElement.value;
    instance == "" ? alert("Please enter an instance") : apiCall(instance);
}

function apiCall(instance){
    const queryString = `https://${instance}/api/v1/timelines/public`;
    fetch(queryString)
    .then (response => {
            if (!response.ok){
                throw new Error('Invalid Instance');
            }
            return response.json();
        }
    )
    .then(data => createView(data))    
    .catch(error => console.error(error));
}

function createView(posts){
    console.log(posts);

    for (let post in posts){
        console.log(posts[post]['account'].acct);

        postElement.innerHTML = `<header>${posts[post]['account'].acct}</header>
        <p>${posts[post]['content']}</p>`;
        postCardHolder.appendChild(postElement.cloneNode(true));

    }
}