//Hien email, password da luu neu remember me
if (localStorage.getItem("emailValue")){
    
    document.getElementById("email").value = JSON.parse(localStorage.getItem("emailValue"))
}

if (localStorage.getItem("passValue")){
    document.getElementById("password").value = JSON.parse(localStorage.getItem("passValue"))
}

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
//correct_login@example.com
//C0rr3Ct_P@55w0rd
function loginLogic(){
    let emailValue = document.getElementById("email").value
    let passValue = password.value
    let loginData = {
        login: emailValue,
        password: passValue
    }

    fetch('https://recruitment-api.pyt1.stg.jmr.pl/login', {
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
        let warning = document.querySelector(".warning")
        if (data.status === "ok"){
            warning.innerText = "Login complete!"
            warning.style.color = "green"
        }
        else{
            warning.innerText = "*Incorrect account or password"
        }
    })
    .catch(error => {
        console.log("Loi", error)
    })
}


//Xu li remember me
let alreadyRemember = false
let checkboxBtn = document.getElementById("checkbox")
checkboxBtn.addEventListener('change', function(){
    if (this.checked === true)
    {
        alreadyRemember = true

        let loginBtn = document.getElementById("login")
    }
})

let loginBtn = document.getElementById("login")
loginBtn.addEventListener('click', function(){
    if (alreadyRemember === true)
    {
        let emailValue = document.getElementById("email").value
        let passValue = password.value

        localStorage.setItem("emailValue", JSON.stringify(emailValue))
        localStorage.setItem("passValue", JSON.stringify(passValue))
    }

    alreadyRemember = false
})