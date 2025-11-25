const borda = document.getElementById('borda');
const user = document.getElementById('user');
const login = document.getElementById('login');
const entrar = document.getElementById('entrar');
const senha = document.getElementById('senha');
const errou = document.getElementById('errou');
const cliente = document.getElementById('cliente');
const servico = document.getElementById('servico');
const profi = document.getElementById('profi');
const agendamentos = document.getElementById('agendamentos');

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
        errou.style.visibility ='hidden';
        return;
    }
    login.style.visibility = 'visible';
    return;
});

function logar(){
    console.log(senha.value)
    if(!senha.value){
        errou.style.visibility ='visible';
    }
}

let dados = document.getElementsByClassName('dados');
    fetch(`http://localhost:3000/get/clientes`)
        .then((response) =>{                           
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }                       
        return response.json(); 
    })
    .then(data =>{
        console.log('dados recebidos',data);
        for(let x = 0; x < data.length; x++){
            dados[x].innerHTML = `<p>${data[x].nome}</p> <p>${data[x].celular}</p> <p>${data[x].CEP}</p>`;
        }
    })                         
    .catch(error=>{
        console.error('Erro ao buscar dados:', error);
    });           
    console.log('Aqui'); 