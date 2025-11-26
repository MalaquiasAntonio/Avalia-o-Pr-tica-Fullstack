
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
const escolha = document.getElementById('escolha');
const escolh = document.getElementById('escolh');
const escol = document.getElementById('escol');


const antes = '<form><label>Email</label><input type="text" placeholder="Email" id="email"><br><label>Senha</label><input type="password" placeholder="Senha" id="senha" required><p id="errou">Credenciais inválidas*</p></form><br><button type="submit" id="entrar" onclick="logar()">Entrar</button>';


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
        noma = localStorage.getItem('dados.nome');
        session = localStorage.getItem('dados.session');
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
            // return response.json();
        })
        .then(dadosEnviados=>{
            localStorage.removeItem('dados.session');
            localStorage.removeItem('dados.nome');
            session = null;
            nome.style.visibility = 'hidden';
            login.style.visibility = 'hidden';
            login.innerHTML = antes;
            console.log(dadosEnviados);
        })
        .catch(error=>{
            console.error('Falha na requisição:', error);
        });
    }
    // localStorage.removeItem('dados.session');
    // localStorage.removeItem('dados.nome');
    // session = null;
    // nome.style.visibility = 'hidden';
    // login.style.visibility = 'hidden';


document.addEventListener('DOMContentLoaded', async()=>{
    let dados2 = document.getElementsByClassName('dados');
    let block = document.getElementById('block');
    let dadosId = [];
    let dadosNome = [];


    


    await fetch('http://localhost:3000/get/clientes')
        .then(response=>{
            if(!response.ok){
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data=>{
            for(let i = 0; i < data.length; i++){
                dadosId.push(data[i].idCliente)
                dadosNome.push(data[i].nome)
            }
            console.log(dadosId,dadosNome);
        })
        .catch(error=>{
            console.error('Erro ao buscar dados:', error);
        });



    await fetch('http://localhost:3000/get/agendamento')
        .then(response=>{
            if(!response.ok){
                throw new Error(`Erro HTTP: ${response.status}`);
            }
                return response.json(); 
        })
        .then(data=>{
            console.log(data)
            for(let x = 0; x < data.length;x++){
                if(dados2.length < data.length){
                    block.innerHTML += '<div class="dados"><p>-</p><p>-</p><p>-</p></div>'
                }
                dados2[x].innerHTML = `<p>${data[x].dat.slice(0,-14)}</p>`;
                dados2[x].innerHTML += `<p>${data[x].hora}</p>`;
                if(dadosId[x] == data[x].idDoCliente){
                    dados2[x].innerHTML += `<p>${dadosNome[x]}</p>`;
                }
                
            }
        })
        .catch(error=>{
            console.error('Erro ao buscar dados:', error);
        })

    await fetch('http://localhost:3000/get/profissionais')
        .then(response=>{
            if(!response.ok){
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data=>{
            console.log(data)
            for(let v = 0; v < data.length;v++){
                console.log(data[v].tipo);
                escolh.innerHTML += `<option value=${data[v].nome}>${data[v].nome}</option>`
            } 
        })
        .catch(error=>{
            console.error('Deu ruim',error);
        })
    await fetch('http://localhost:3000/get/servicos')
        .then(response=>{
            if(!response.ok){
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data=>{
            console.log(data)
            for(let v = 0; v < data.length;v++){
                console.log(data[v].tipo);
                escol.innerHTML += `<option value=${data[v].tipo}>${data[v].tipo}</option>`
            } 
        })
        .catch(error=>{
            console.error('Deu ruim',error);
        })

    for(let v = 0; v < dadosNome.length;v++){
        escolha.innerHTML += `<option value=${dadosNome[v]}>${dadosNome[v]}</option>`
    } 


    if(session){
        nome.innerText = `Bem vindo, ${noma}`;
        nome.style.visibility = 'visible';
        return;
    }
});