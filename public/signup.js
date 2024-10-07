function signup(){
    const usernameInput = document.getElementById("username").value
    const emailInput = document.getElementById("email").value
    const passwordInput = document.getElementById("password").value
    const passwordInput2 = document.getElementById("password2").value
    if(passwordInput === passwordInput2){
        const userData = {
            username: usernameInput,
            email: emailInput,
            password: passwordInput
        };

        fetch("/addUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if(response.ok){
                alert("User added successfully")
            }else{
                alert("Error adding user")
            }
        })
        .catch(error => {
            console.error("Error", error)
            alert("Error adding user")
        })
    }else{
        alert("Passwords Do Not Match")
    }
}