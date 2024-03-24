//Xu li an/ hien password

let hiddenBtn = document.getElementById("hidden")
let openBtn = document.getElementById("open")
let password = document.getElementById("password")

hiddenBtn.addEventListener('click', function(){
    password.type = "text"
    hiddenBtn.style.display = "none"
    openBtn.style.display = "block"
})

openBtn.addEventListener('click', function(){
    password.type = "password"
    hiddenBtn.style.display = "block"
    openBtn.style.display = "none"
})

//Xu li logic
function loginLogic(){
    let emailValue = document.getElementById("email").value
    let passValue = password.value
    let loginData = {
        login: emailValue,
        password: passValue
    }

    fetch('http://docs.recruitment-api.pyt1.stg.jmr.pl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then (response => {
        if (response.status !== 200){
            throw new Error('Failed')
        }
        else
            return response.json();
    })
    .then (data =>{
        console.log("Thanh cong");
        console.log(data)
    })
    .catch(error => {
        console.log("Loi", error)
    })
}

