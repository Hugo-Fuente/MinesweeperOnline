dadosCadastrais = [];

function cadastrar() {
    var forms = document.forms["formulario"];
    var dados = {
        'nome': forms["nome"].value,
        'telefone': forms["telefone"].value,
        'email': forms["email"].value,
        'senha': forms["senha"].value,
        'nascimento': forms["nascimento"].value,
        'CPF': forms["cpf"].value,
        'username': forms["username"].value
    }
    dadosCadastrais.push(dados);
    alert("Cadastro concluído");
    forms.reset(); // resetando o forms para a inserção de novos dados
    return false;
}

function login() {
    var forms = document.forms["formulario"];
    var dados = {
        'username': forms['username'],
        'senha': forms["senha"].value
    }
    var txt = document.getElementById("invalido");
    var txt = "";

    if(dados.username == dadosCadastrais[0].username &&
        dados.senha == dadosCadastrais[0].senha)
        window.location.href("index.html");
    else
        txt += "Username e/ou senha inválidos";
        document.getElementById("invalido").innerHTML = txt;

    return false;
}

function alterar() {
    var forms = document.forms["formulario"];
    var dados = {
        'nome': forms["nome"].value,
        'telefone': forms["telefone"].value,
        'email': forms["email"].value,
        'senha': forms["senha"].value,
        'nascimento': dadosCadastrais['nascimento'],
        'CPF': dadosCadastrais['CPF'],
        'username': dadosCadastrais['username']
    }
    dadosCadastrais.push(dados);
    alert("Seu perfil foi alterado");
    forms.reset();
    return false;
}

function mostrarAlunos() {
    document.getElementById("alunos_cadastrados").innerHTML = "Alunos Cadastrados";
    var tamanho = dadosCadastrais.length;    
    var i;
    var txt = document.getElementById("cadastros");
    var txt = "";

    for (i = 0; i < tamanho; i++) {
        // imprimindo os dados dos alunos já cadastrados
        txt += "<b>Aluno " + (i+1) + ": </b>" + dadosCadastrais[i].nome + "<br>" +
               "<b>RA: </b>" + dadosCadastrais[i].RA + "<br>" +
               "<b>Sexo: </b>" + dadosCadastrais[i].sexo + "<br>" +
               "<b>Idade: </b>" + dadosCadastrais[i].idade + "<br>" +              
               "<b>Endereço: </b>" + dadosCadastrais[i].endereco + "<br>" +
               "<b>Telefone: </b>" + dadosCadastrais[i].telefone + "<br>" +
               "<b>E-mail: </b>" + dadosCadastrais[i].email + "<br><br><br>";
    }
    document.getElementById("cadastros").innerHTML = txt;
    alert("Os alunos cadastrados estão na parte inferior do site");
    return false;
}