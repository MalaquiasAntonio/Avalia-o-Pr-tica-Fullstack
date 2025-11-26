
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
const nome = document.getElementById('name');
let noma = localStorage.getItem('dados.nome');
let session = localStorage.getItem('dados.session');

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
    }else if(!session){
        login.style.visibility = 'visible';
        return;
    }
    login.innerHTML = '<button type="submit" id="entrar" onclick="logar()">Sair</button>';
    login.style.visibility = 'visible';
});
let dados = {};
async function logar (){
    if(!session){
        let email = document.getElementById('email');
        dados = {
            email: email.value,
            senha: senha.value
        };
        if(!senha.value || !email.value){
            errou.style.visibility ='visible';
            return;
        }
        await fetch('http://localhost:3000/get/usuario',{
            method:'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
           body: JSON.stringify(dados)
        })
            .then((response)=>{
                if(!response.ok){
                    throw new Error(`Erro HTTP: ${response.status}`);
                }
                return response.json(); 
            })
            .then(data =>{
                console.log('dados recebidos',data);
                dados = {
                    session: data.sessionId,
                    email: data.email,
                    nome: data.nome
                }
            })                         
            .catch(error=>{
                console.error('Erro ao buscar dados:', error);
            });
       if(!dados.session){
            errou.style.visibility ='visible';
            return ;
       }
        login.style.visibility = 'hidden';
        errou.style.visibility ='hidden';
        nome.innerText = `Bem vindo, ${dados.nome}`;
        nome.style.visibility = 'visible';
        localStorage.setItem('dados.nome',dados.nome);
        localStorage.setItem('dados.session',dados.session);
        return;
    }
    fetch('http://localhost:3000/logout',{
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session}`,
        }
    })
        .then(response =>{
            if(!response.ok){
                throw new Error('Erro.');
            }
            return response.json();
        })
        .then(dadosEnviados=>{
            console.log(dadosEnviados);
        })
        .catch(error=>{
            console.error('Falha na requisição:', error);
        });
}


document.addEventListener('DOMContentLoaded',()=>{
    if(session){
        nome.innerText = `Bem vindo, ${noma}`;
        nome.style.visibility = 'visible';
        return;
    }
});