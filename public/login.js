function login(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if(data.error){
            alert(data.error);
        }else{
            alert(data.message)
        }
    })
    .catch(error => {
        console.error("Error: ", error)
        alert("An error occured. Please try again")
    })
}