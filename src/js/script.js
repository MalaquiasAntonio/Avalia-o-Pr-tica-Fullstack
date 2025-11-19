const borda = document.getElementById('borda');
const user = document.getElementById('user');
const login = document.getElementById('login');

borda.addEventListener('mouseover',()=>{
    borda.style.backgroundColor = 'white';
    borda.style.borderColor = 'white';
    user.style.color = 'black';
});
borda.addEventListener('mouseout',()=>{
    borda.style.backgroundColor = 'black';
    borda.style.borderColor = 'black';
    user.style.color = 'white';
});
borda.addEventListener('click',()=>{
    if(login.style.visibility == 'visible'){
        login.style.visibility = 'hidden';
        return;
    }
    login.style.visibility = 'visible';
    return;
});