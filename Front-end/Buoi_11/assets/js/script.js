
let contacts = [
    {
        name: "Duong Van Chi Bao",
        phone: "0795629257",
        mail: "baodugw@gmail.com"
    },
    {
        name: "ABCDSSS",
        phone: "049848965",
        mail: "asoasfoi@gmail.com"
    }
]

if (localStorage.getItem("contacts"))
{
    contacts = JSON.parse(localStorage.getItem("contacts"))
}

let cards = document.querySelector(".cards")
let popUp = document.querySelector(".popup-container")
let createBtn = document.getElementById("create-btn")
let popMain = document.querySelector(".popup-main")
let popMainUpdate = document.querySelector(".popup-main-update")
let deleteBtn = document.querySelector("#delete")
let popUpdate = document.querySelector(".popup-container-update")
let currentIndex;


//Open pop up
createBtn.addEventListener('click', function(){
    let popUp = document.querySelector(".popup-container")
    popUp.classList.toggle("active")
})


//Close popUp
popUp.addEventListener('click', function(){
    let popUp = document.querySelector(".popup-container")
    let alert = document.querySelector(".alert")
    document.getElementById("field-name").value = ""
    document.getElementById("field-phone").value = ""
    document.getElementById("field-mail").value = ""


    popUp.classList.toggle("active")

    alert.innerHTML = ""
})

//Prevent close
popMain.addEventListener('click', function(){
    event.stopPropagation()
})

//delete
function onDelete(index){
    console.log("hiihi")
    contacts.splice(index, 1);

    localStorage.setItem("contacts", JSON.stringify(contacts))
    render()
}


//Oncreate
function onCreate(name, phone, mail)
{ 
    contacts.push(
        {
            name: name,
            phone: phone,
            mail: mail
        }
    )
    // console.log(name, phone, mail)
    localStorage.setItem("contacts", JSON.stringify(contacts))
    popUp.classList.toggle("active")
    let alert = document.querySelector(".alert")
    alert.innerHTML = ""
    render()
    document.getElementById("field-name").value = ""
    document.getElementById("field-phone").value = ""
    document.getElementById("field-mail").value = ""
}
//onCreateAlert
function onCreateAlert()
{
    let name = document.getElementById("field-name").value
    let phone = document.getElementById("field-phone").value
    let mail = document.getElementById("field-mail").value
    let alert = document.querySelector(".alert")

    let myPromise = new Promise(function(resolve, reject){
        if (name === ""){
            alert.innerHTML = "*Tên không được để trống!"
            reject()
        }
        else 
            resolve()
            
    })
    myPromise.then(() =>{
        if (phone === "" || phone.length != 10){
            alert.innerHTML = "*Số điện thoại có định dạng không hợp lệ!"
            return Promise.reject()
        }
        else
        return Promise.resolve()
    })
    .then (() =>{
        if (mail.indexOf("@gmail.com") === -1){
            alert.innerHTML = "*Email có định dạng không hợp lệ!"
            return Promise.reject()
        }
        else
        return Promise.resolve()
    })
    .then(() =>{
        onCreate(name, phone, mail)
    })
    .catch((error) =>{
        console.log("Da xay ra loi", error);
    })
}





//Open pop up update
function onUpdate(index){
    let popUpdate = document.querySelector(".popup-container-update")
    currentIndex = index;
    // console.log(contacts[index].name, contacts[index].phone, contacts[index].mail )
    
    document.getElementById("field-name-update").value = contacts[index].name
    document.getElementById("field-phone-update").value = contacts[index].phone
    document.getElementById("field-mail-update").value = contacts[index].mail

    
    popUpdate.classList.toggle("active")

}

//Close pop update 
popUpdate.addEventListener('click', function(){
    let popUpdate = document.querySelector(".popup-container-update")
    let alert = document.querySelector(".alert-update")
    alert.innerHTML = ""

    popUpdate.classList.toggle("active")
})

// //popUpdate prevent close
popMainUpdate.addEventListener('click', function(){
    event.stopPropagation()
})

//onCreateUpdate
function onCreateUpdate(name, phone, mail, index)
{
    contacts[index].name = name
    contacts[index].phone = phone
    contacts[index].mail = mail

    localStorage.setItem("contacts", JSON.stringify(contacts))
    popUpdate.classList.toggle("active")
    let alert = document.querySelector(".alert-update")
    alert.innerHTML = ""
    render()
}

//onUPdatealert
function onUpdateAlert(){
    {
        let name = document.getElementById("field-name-update").value
        let phone = document.getElementById("field-phone-update").value
        let mail = document.getElementById("field-mail-update").value
        let alert = document.querySelector(".alert-update")

        // console.log(index)
    
        let myPromise = new Promise(function(resolve, reject){
            if (name === ""){
                alert.innerHTML = "*Tên không được để trống!"
                reject()
            }
            else 
                resolve()
                
        })
        myPromise.then(() =>{
            if (phone === "" || phone.length != 10){
                alert.innerHTML = "*Số điện thoại có định dạng không hợp lệ!"
                return Promise.reject()
            }
            else
            return Promise.resolve()
        })
        .then (() =>{
            if (mail.indexOf("@gmail.com") === -1){
                alert.innerHTML = "*Email có định dạng không hợp lệ!"
                return Promise.reject()
            }
            else
            return Promise.resolve()
        })
        .then(() =>{
            onCreateUpdate(name, phone, mail, currentIndex)
        })
        .catch((error) =>{
            console.log("Da xay ra loi", error);
        })
    }
}


function render()
{
    let card = contacts.map(function(item){
        return`
        <div class="card">
            <div class="card-item">
                <i class="fas fa-address-book"></i>
                <span id="name">${item.name}</span>
            </div>
            <div class="card-item">
                <i class="fas fa-phone"></i>
                <span id="phone">${item.phone}</span>
            </div>
            <div class="card-item">
                <i class="fas fa-envelope"></i>
                <span id="mail">${item.mail}</span>
            </div>
            <div class="action">
                <i id="delete" onclick = "onDelete(${contacts.indexOf(item)})" class="fas fa-trash"></i>
                <i id="update" onclick = "onUpdate(${contacts.indexOf(item)})" class="fas fa-pen"></i>
            </div>
        </div>
        `
    })
    cards.innerHTML = card.join("")
}
render()