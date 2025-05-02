let postElement = document.createElement('article');
let postCardHolder = document.getElementById('card-holder');
let peerHolder = document.getElementById('peer-holder');
let peerMessage = document.getElementById('peer-message');
let peerElement = document.createElement('article');
let currentInstanceMessage = document.getElementById('current-instance-message');
let instanceInformation = document.getElementById('instance-information');

let currentInstance = '';

function formCollect(event){
    event.preventDefault();
    const instanceElement = document.getElementById("instance");
    const instance = instanceElement.value;
    instanceElement.value = "";
    instance == "" ? alert("Please enter an instance") : apiCall(instance);
}

function apiCall(instance){
    console.log(instance);

    currentInstance = instance;
    currentInstanceMessage.removeAttribute('hidden');
    currentInstanceMessage.innerText = `Your current instance is: ${currentInstance}`;

    const postQueryString = `https://${instance}/api/v1/timelines/public?limit=100`;
    fetch(postQueryString)
    .then (response => {
            if (!response.ok){
                throw new Error('Invalid Instance');
            }
            return response.json();
        }
    )
    .then(data => createPostView(data))    
    .catch(error => console.error(error));

    const peerQueryString = `https://${instance}/api/v1/instance/peers`;
    fetch(peerQueryString)
    .then (response => {
            if (!response.ok){
                throw new Error('Invalid Instance');
            }
            return response.json();
        }
    )
    .then(data => createPeerView(data))
    .catch(error => console.error(error));

    const instanceInformationString = `https://${instance}/api/v1/instance`;
    fetch(instanceInformationString)
    .then (response => {
            if (!response.ok){
                throw new Error('Invalid Instance');
            }
            return response.json();
        }
    )
    .then(data => createInstanceInformationView(data))
    .catch(error => console.error(error));
}

function createPostView(posts){
    console.log(posts);

    postElement.innerHTML = '';
    postCardHolder.innerHTML = '';

    for (let post in posts){  

        let avatar = posts[post]['account']['avatar_static']; 
        postElement.innerHTML = `<header><img src="${avatar}" width="75rem" height="75rem" class="pico-border-radius">${posts[post]['account'].acct}</header>
        <p>${posts[post]['content']}</p>`;
        postCardHolder.appendChild(postElement.cloneNode(true));

    }
}

function createPeerView(peers){
    console.log(peers);

    peerElement.innerHTML = '';
    peerHolder.innerHTML = '';

    peerMessage.removeAttribute('hidden');

    //create an array here of 50 at most random numbers between 0 and the length of the peers array
    //only render the peers that correspond to those locations in the array and change the wording to a random sampling of peers
    let i = 0;
    for (let peer in peers){
        if (i < 75){
            peerElement.innerHTML = `<div role="button" onclick="apiCall('${peers[peer]}')">${peers[peer]}</div>`;
            peerHolder.appendChild(peerElement.cloneNode(true));
        }
        i += 1;
    }
}

function createInstanceInformationView(data){
    console.log(data);

    instanceInformation.innerHTML = "";

    instanceInformation.innerHTML = `<summary class="secondary" role="button">Learn about ${data['title']}</summary>`;
    data['description'] == "" ? instanceInformation.innerHTML += `<p>${data['short_description']}</p>` : instanceInformation.innerHTML += `<p>${data['description']}</p>`;
    instanceInformation.innerHTML += `<p>User count: ${data['stats']['user_count']}</p>`;
    instanceInformation.removeAttribute('hidden');
}

