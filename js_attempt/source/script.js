function formCollect(event){
    event.preventDefault();
    const instanceElement = document.getElementById("instance");
    const instance = instanceElement.value;
    instance == "" ? alert("Please enter an instance") : apiCall(instance)
}

function apiCall(instance){
    const queryString = `https://${instance}/api/v1/timelines/public`;
    fetch(queryString)
    .then (response => {
            if (!response.ok){
                throw new Error('Invalid Instance')
            }
            return response.json()
        }
    )
    .then(data => console.log(data))    
    .catch(error => console.error(error));
}