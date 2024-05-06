//show/hide password
const toggle = document.querySelector(".toggle"),
      input = document.querySelector("input.password");

toggle.addEventListener("click", () => {
    if (input.type === "text") {
        input.type = "password";
        toggle.classList.replace("uil-eye", "uil-eye-slash");
    } else {
        input.type = "text";
        toggle.classList.replace("uil-eye-slash", "uil-eye");
    }
});


//xu li dung sai
let btn = document.getElementById('click');
let account = document.getElementById('account');
let password = document.getElementById('password');
let wrong = document.getElementById('wrong');

btn.addEventListener('click', function(event){
    event.preventDefault();
    let accountValue = account.value;
    let passwordValue = password.value;
    let acc = true, pas = true;

    //acc space 
    if (accountValue.includes(' ')) {
        acc = false; 
    }
    //acc special character
    let specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialChars.test(accountValue)) {
        acc = false;
    }

    //pass length
    if (passwordValue.length < 8)
        pas = false;
    //pass lowercase
    if (!/[a-z]/.test(passwordValue)) {
        pas = false;
    }
    //pass upper case
    if (!/[A-Z]/.test(passwordValue)) {
        pas = false; 
    }
    //pass number
    if (!/[0-9]/.test(passwordValue))
        pas = false;
    //pass special
    if (!specialChars.test(passwordValue)) {
        pas = false;
    }
    wrong.style.display = 'none';
    if (pas === false || acc === false)
        wrong.style.display = 'block';
    else
    {
        alert("Login Complete!");
    }
})