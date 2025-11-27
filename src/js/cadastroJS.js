
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
const blockCadastro = document.getElementsByClassName('blockCadastro');
const novo = document.getElementById('new');
const main = document.getElementById('main');
const fechar = document.getElementById('fechar');
const fechar2 = document.getElementById('fechar2');
const novoCliente = document.getElementById('novoCliente');
let verifica = false;
const nomeClienteEdit = document.getElementById('nomeClienteEdit');
const celularEdit = document.getElementById('celularEdit');
const CEPEdit = document.getElementById('CEPEdit');


const antes = '<form><label>Email</label><input type="text" placeholder="Email" id="email"><br><label>Senha</label><input type="password" placeholder="Senha" id="senha" required><p id="errou">Credenciais inválidas*</p></form><br><button type="submit" id="entrar" onclick="logar()">Entrar</button>';



novo.addEventListener('click',()=>{
    main.style.filter = 'blur(5px)';
    blockCadastro[0].style.visibility = 'visible';
});
fechar.addEventListener('click',()=>{
    blockCadastro[0].style.visibility = 'hidden'
    main.style.filter = 'blur(0px)';
});
fechar2.addEventListener('click',()=>{
    blockEdit.style.visibility = 'hidden'
    main.style.filter = 'blur(0px)';
});

novoCliente.addEventListener('click',()=>{
    let nomeCliente = document.getElementById('nomeCliente');
    let celular = document.getElementById('celular');
    let CEP = document.getElementById('CEP');

    let dados = {
        nome: nomeCliente.value,
        celular: celular.value,
        CEP: CEP.value
    }

    fetch('http://localhost:3000/post/cliente',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(dados)
    })

        .then(response=>{
            if(!response.ok){
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json(); 
        })
        .then(data=>{
            console.log(data);
            if(!data) return;
            blockCadastro[0].style.visibility = 'hidden';
            main.style.filter = 'blur(0px)';
            alert('Cliente Cadastrado');
            window.location.reload();
            return;
        })
        .catch(error=>{
            console.log('Deu ruim',error);
        })
    
});

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
        window.location.reload();
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
            window.location.reload();
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


let dades = document.getElementsByClassName('dados');
let block = document.getElementById('block');
     

const trash = document.getElementById('trash');
const blockEdit = document.getElementById('blockEdit');

const lixo = document.getElementsByClassName('lixo');
const clienteNome = document.getElementsByClassName('cliente'); 
const edit = document.getElementById('edit');
const nomeEdit = document.getElementsByClassName('editar');
let verificaEdit = false;
let idMuda = '';

edit.addEventListener('click',()=>{
    if(verifica) return;
    if(!verificaEdit){
        for(let x = 0; x < nomeEdit.length;x++){
            nomeEdit[x].style.visibility = 'visible';
        }
        return verificaEdit = true;
    } 
    for(let x = 0; x < nomeEdit.length; x++){
        nomeEdit[x].style.visibility = 'hidden';
    }
    return verificaEdit = false;

});

trash.addEventListener('click',()=>{
    if(verificaEdit) return;
    if(!verifica){
        for(let x = 0; x < lixo.length; x++){
            clienteNome[x].style.cursor = 'pointer';
            lixo[x].style.visibility = 'visible';
            
        }
        return verifica = true;
    } 
    for(let x = 0; x < lixo.length; x++){
            clienteNome[x].style.cursor = 'default';
            lixo[x].style.visibility = 'hidden';
        }
    return verifica = false;
});



let editarCliente = document.getElementById('editarCliente');

editarCliente.addEventListener('click',()=>{

    let novosDados = {
        nome: nomeClienteEdit.value,
        celular: celularEdit.value,
        CEP: CEPEdit.value 
    }


   fetch(`http://localhost:3000/put/cliente/${idMuda}`,{
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novosDados)
   })
        .then(response=>{
            if(!response.ok){
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            // return response.json()
        })
        .then(data=>{
            console.log(data);
            main.style.filter = 'blur(0px)';
            blockEdit.style.visibility = 'hidden';
            window.location.reload();
            return alert('Edição feita!');
        })
});

function pegarId (id){
    if(verificaEdit){
        main.style.filter = 'blur(3px)';
        blockEdit.style.visibility = 'visible';
        idMuda = id;

        fetch(`http://localhost:3000/get/cliente/${id}`)
            .then(response=>{
                if(!response.ok){
                    throw new Error(`Erro HTTP: ${response.status}`);
                }
                return response.json()
            })
            .then(data=>{
                nomeClienteEdit.value = data[0].nome;
                celularEdit.value = data[0].celular;
                CEPEdit.value = data[0].CEP;

            })
    }


    if(verifica){
        fetch(`http://localhost:3000/delete/${id}`,{
            method:'DELETE',
             headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             }
        })
            .then(response=>{
                if(!response.ok){
                    throw new Error(`Erro HTTP: ${response.status}`);
                }
                return response.json()
            })
            .then(data=>{
                console.log(data)
            })
            .catch(error=>{
                console.error('Erro', error)
            });
    
        window.location.reload();
        return alert('Cliente Deletado com sucesso!');
    }
}





document.addEventListener('DOMContentLoaded', async()=>{
    await fetch(`http://localhost:3000/get/clientes`)
        .then((response) =>{                           
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }                       
        return response.json(); 
    })
    .then(data =>{
        console.log('dados recebidos',data);
        for(let x = 0; x < data.length; x++){
            if(dades.length < data.length){
                block.innerHTML += '<div class="dados"><p>Antonio</p><p>554799194-7795</p><p>89253710</p></div>';
            }
            dades[x].innerHTML = `<p id="${data[x].idCliente}" class ="cliente"onclick="pegarId(id)">${data[x].nome}<i class="fa-solid fa-trash-can lixo"></i><i class="fa-solid fa-pen-to-square editar"></i></p>`;
            dades[x].innerHTML += `<p>${data[x].celular}</p>`;
            dades[x].innerHTML += `<p>${data[x].CEP}</p>`;

        }
    })                         
    .catch(error=>{
        console.error('Erro ao buscar dados:', error);
    });
    let name = localStorage.getItem('dados.nome');
    let session = localStorage.getItem('dados.session');
    if(session){
        nome.innerText = `Bem vindo, ${name}`;
        nome.style.visibility = 'visible';
        return;
    }
});