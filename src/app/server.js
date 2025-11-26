const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const db = require('./db');

app.use(express.json());
app.use(cors({origin:true,credentials:true}));


const sessions = new Map();
function generateSessionId() {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substr(2, 9);
    return timestamp + randomPart;
  }

function authenticate(req,res,next){
    const header = req.headers['authorization'];
    const token = header.slice(7);
    console.log(token);
    console.log(sessions);
    if(!token)  return res.status(401).send('Sessão não informada');
    const session = sessions.get(token);
    console.log('Passou ', session);
    if(!session) return res.status(401).send('Sessão inválida');
    req.user = {id: session.idUsuarios,email: session.email};
    next();
}



app.get('/get/clientes',async(req,res)=>{
    try {
        const [clientes] = await db.query('SELECT * FROM cliente');
        return res.status(201).send(clientes);
    } catch (error) {
        console.error('Vish',error);
        return res.status(500).send('Erro interno do servidor ao buscar cliente.')
    }
});
app.get('/get/profissionais',async(req,res)=>{
    try {
        const [profissionais] = await db.query('SELECT * FROM profissional');
        return res.status(201).send(profissionais);
    } catch (error) {
        console.error('Vish',error);
        return res.status(500).send('Erro interno do servidor ao buscar profissionais.')
    }
});

app.post('/get/usuario',async(req,res)=>{
    const {email,senha} = req.body;
    if(!email || !senha){
        return res.status(401).send('Falta Valores');
    }
    try {
        const [usuario] = await db.query('SELECT * FROM usuario WHERE email = ?',[email]);
        if(usuario[0].email !== email || usuario[0].senha !== senha){
            return res.status(400).send('Credenciais inválidas');
        }
        const user = usuario[0];
        const sessionId = generateSessionId();
        sessions.set(sessionId, {idUsuarios: user.idUsuario, email: user.email});
        return res.send({
            sessionId,
            user: user.idUsuario, nome: user.nome, email: user.email
        });
    } catch (error) {
        console.error('Vish',error);
        return res.status(500).send('Erro interno do servidor ao buscar.');
    }
});
app.post('/logout',authenticate,(req,res)=>{
    const header = req.headers['authorization'];
    const token = header.slice(7);
    if(token && sessions.has(token)) sessions.delete(token);
    console.log(sessions);
    return res.sendStatus(204);
});



// app.delete('/delete/:value',async(req,res)=>{
//     const value = req.params.value;
// });


app.listen(port,()=>{
    console.log(`Rodando na porta ${port}`);
});