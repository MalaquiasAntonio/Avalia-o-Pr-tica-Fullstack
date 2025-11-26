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
let nome = document.getElementById('name')

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
    let email = document.getElementById('email');
    console.log(senha.value);
    if(!senha.value || !email.value){
        errou.style.visibility ='visible';
        return;
    }
    fetch('http://localhost:3000/get/usuario')
        .then((response)=>{
            if(!response.ok){
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json(); 
        })
        .then(data =>{
            console.log('dados recebidos',data);
        })                         
        .catch(error=>{
            console.error('Erro ao buscar dados:', error);
        });           
}





let dados = document.getElementsByClassName('dados');
let block = document.getElementById('block');
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
            if(dados.length < data.length){
                block.innerHTML += '<div class="dados"><p>Antonio</p><p>554799194-7795</p><p>89253710</p></div>';
            }
            dados[x].innerHTML = `<p>${data[x].nome}</p>`;
            dados[x].innerHTML += `<p>${data[x].celular}</p>`;
            dados[x].innerHTML += `<p>${data[x].CEP}</p>`;

        }
    })                         
    .catch(error=>{
        console.error('Erro ao buscar dados:', error);
    });
    
    document.addEventListener('DOMContentLoaded',()=>{
        let name = localStorage.getItem('dados.nome');
        let session = localStorage.getItem('dados.session');
        if(session){
            nome.innerText = `Bem vindo, ${name}`;
            nome.style.visibility = 'visible';
            return;
        }
    });