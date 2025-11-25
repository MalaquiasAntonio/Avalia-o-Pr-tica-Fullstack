CREATE DATABASE IF NOT EXISTS me_organiza;

CREATE TABLE IF NOT EXISTS cliente(
	idCliente int primary key not null auto_increment,
    nome varchar(450) not null,
    celular char(14) not null ,
    CEP char(8) not null
);

CREATE TABLE IF NOT EXISTS profissional(
	idProfissional int primary key not null auto_increment,
    nome varchar(450) not null,
    celular char(14) not null,
    disponibilidade varchar(25)
);

CREATE TABLE IF NOT EXISTS agendamento(
	idAgendamento int primary key not null auto_increment,
    idDoCliente int not null,
    idDoProfissional int not null,
    dat DATE not null,
    hora varchar(45) not null,
    constraint FK_idDoCliente
	FOREIGN KEY (idDoCliente)
    REFERENCES cliente (idCliente),
    constraint FK_idDoProfissional
	FOREIGN KEY (idDoProfissional)
    REFERENCES profissional (idProfissional)
);


CREATE TABLE IF NOT EXISTS serviço(
	idServico int primary key not null auto_increment,
    tipo varchar(45) not null,
    descricao TEXT not null,
    situacao varchar(45) not null
);

CREATE TABLE IF NOT EXISTS servicos_has_agendamento(
	agendamento_id int not null,
    servico_id int not null,
    constraint PK_servicos_has_agendamento
    primary key(agendamento_id,servico_id),
    constraint FK_servico
    foreign key (servico_id)
    references serviço(idServico),
    constraint FK_agendamento
    foreign key (agendamento_id)
    references agendamento(idAgendamento)
);

CREATE TABLE IF NOT EXISTS usuario(
	idUsuario int auto_increment primary key not null,
    email varchar(650) not null unique,
    senha varchar(15) not null unique
);

INSERT INTO usuario(email,senha) VALUES
('antoniomarcos@hotmail.com','1234');

INSERT INTO cliente(nome,celular,CEP) VALUES
('Antonio','554799194-7795','89253710'),
('Roberto','554712345-6789','89253710'),
('Marcos','554754321-9876','89253710');

INSERT INTO profissional(nome,celular,disponibilidade) VALUES
('Charmes','554712345-6789',TRUE),
('Carlos','554754321-9876',TRUE),
('Ricardo','554798765-4321',FALSE);

INSERT INTO agendamento(idDoCliente,idDoProfissional,dat,hora) VALUES
((SELECT idCliente FROM cliente WHERE idCliente = 1),(SELECT idProfissional FROM profissional WHERE idProfissional =3),'2025-10-05','14:30'),
((SELECT idCliente FROM cliente WHERE idCliente = 2),(SELECT idProfissional FROM profissional WHERE idProfissional =2),'2025-12-07','8:00'),
((SELECT idCliente FROm cliente WHERE idCliente = 3 ),(SELECT idProfissional FROM profissional WHERE idProfissional =1),'2025-04-02','13:15');


INSERT INTO serviço(tipo,descricao,situacao) VALUES
('instalação','Ir e fazer a  instalação', 'Agendado'),
('manutenção elétrica','Fazer a manutenção elétrica','Cancelado'),
('pequenos reparos residenciais','Fazer os equenos reparos residenciais','Concluido');


INSERT INTO servicos_has_agendamento(agendamento_id,servico_id) VALUES 
((SELECT idServico FROM serviço WHERE idServico = 1),(SELECT idAgendamento FROM agendamento WHERE idAgendamento = 1)),
((SELECT idServico FROM serviço WHERE idServico = 2),(SELECT idAgendamento FROM agendamento WHERE idAgendamento =2)),
((SELECT idServico FROM serviço WHERE idServico = 3),(SELECT idAgendamento FROm agendamento WHERE idAgendamento =3));