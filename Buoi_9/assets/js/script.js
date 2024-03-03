let a = document.getElementById('a');
let b = document.getElementById('b');
let cong = document.getElementById('plus');
let tru = document.getElementById('tru');
let nhan = document.getElementById('nhan');
let chia = document.getElementById('chia');
let result = document.getElementById('result');

cong.addEventListener('click', function(){
    let ans = Number(a.value) + Number(b.value);
    result.innerHTML = 'Ket qua la: ' + ans;
})
tru.addEventListener('click', function(){
    let ans = Number(a.value) - Number(b.value);
    result.innerHTML = 'Ket qua la: ' + ans;
})
nhan.addEventListener('click', function(){
    let ans = Number(a.value) * Number(b.value);
    result.innerHTML = 'Ket qua la: ' + ans;
})
chia.addEventListener('click', function(){
    let ans = Number(a.value) / Number(b.value);
    result.innerHTML = 'Ket qua la: ' + ans;
})