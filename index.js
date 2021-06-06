//Conexão MongoDB

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost", {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"))

db.once("open", function(){
   console.log("Estamos conectados ao MongoDB")
})

//Criar Schema

const pessoaSchema = new mongoose.Schema({
   nome: String,
   idade: Number,
   profissao: String
});


// Criar Model

const Pessoa = mongoose.model("Pessoa", pessoaSchema);

const karlla = new Pessoa({
   nome: "Karlla",
   idade: 29,
   profissao: "Jornalista"
})

console.log(karlla.nome)
console.log(karlla.idade)
console.log(karlla.profissao)

// Inserir dados 

karlla.save(function(err){
   if (err) {
      console.log(err)
   }
});

const gabi = new Pessoa({
   nome: "Gabi",
   idade: 26,
   profissao: "Assistente Social"
})

gabi.save(function(err){
   if (err) {
      console.log(err)
   }
});

console.log(gabi.nome)
console.log(gabi.idade)
console.log(gabi.profissao)

// Encontrando dados

Pessoa.findOne({nome: "Karlla"}, function(err, pessoa){
   console.log(pessoa)
})

// Inserindo diversos dados

Pessoa.insertMany([
   {nome: "Ladjane", idade: 56, profissao: "Cozinheira"},
   {nome: "Yoda", idade: 2},
   {nome: "Carlos", profissao: "mecânico"}
]);

async function getPessoa(){
   const pessoas = await Pessoa.find({}).exec()
   console.log(pessoas)
}

getPessoa()

//Deletar dados

async function getPessoa(nome) {
   const pessoa = await Pessoa.find({nome: nome}).exec();
   if(pessoa.length === 0) {
      console.log("Esta pessoa não existe!")
   } else{
      console.log(pessoa)
   }
}

getPessoa("Carlos")

Pessoa.deleteOne({nome: "Carlos"}).exec()

getPessoa("Carlos")

//Atualizar dados

Pessoa.updateOne({nome: "gabi"}, {profissao: "Cientista de dados"}).exec()

getPessoa("gabi")

//Utilizando o Where

async function getPessoaNomeIdade (nome, idade) {
   const pessoa = await Pessoa
                        .where("idade").gte(idade)
                        .where("nome", nome)
                        .exec()
   if(pessoa.length === 0 ) {
      console.log("Esta pessoa não existe!")
   } else {
      console.log(pessoa)
   }
}

getPessoaNomeIdade("Karlla", 25);