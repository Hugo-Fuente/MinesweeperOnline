/* --------------- CADASTRO ------------------- */

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

    sessionStorage.setItem("nome", dados.nome);
    sessionStorage.setItem("telefone", dados.telefone);
    sessionStorage.setItem("email", dados.email);
    sessionStorage.setItem("senha", dados.senha);
    sessionStorage.setItem("nascimento", dados.nascimento);
    sessionStorage.setItem("cpf", dados.CPF);
    sessionStorage.setItem("username", dados.username);

    alert("Cadastro concluído");
    forms.reset(); // resetando o forms para a inserção de novos dados
    window.location.href = "index.html";
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

    var Ucadastrado = sessionStorage.getItem("username")
    var Scadastrada = sessionStorage.getItem("senha");

    if(dados.username != Ucadastrado)
    {
        alert("username");
        alert(dados.username);
    }
    else if (dados.senha != Scadastrada)
        alert("senha");
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
      'senha': forms["senha"].value
  }

  sessionStorage.setItem("nome", dados.nome);
  sessionStorage.setItem("telefone", dados.telefone);
  sessionStorage.setItem("email", dados.email);
  sessionStorage.setItem("senha", dados.senha);

  alert("Alteração realizada com sucesso");
  forms.reset(); // resetando o forms
  return false;
}


/*---------------------- JOGO ------------------------*/

var grid = document.getElementById("grid");
var testMode = false; // Vira True quando clicamos no botão trapaça
dimensao = parseInt(sessionStorage.getItem("dimensaoX"));
generateGrid();


function configs() {
  var modo = document.getElementById("modalidade");
  var forms = document.forms["formulario"];
  var dados = {
    'dimensaoX': forms["dimensaoX"].value,
    'dimensaoY': forms["dimensaoY"].value,
    'bombas': forms["bombas"].value,
    'modalidade': modo.value
  }

  if (checagem(dados.dimensaoX, dados.dimensaoY, dados.bombas)) {
    sessionStorage.setItem("dimensaoX", dados.dimensaoX);
    sessionStorage.setItem("dimensaoY", dados.dimensaoY);
    sessionStorage.setItem("bombas", dados.bombas);
    sessionStorage.setItem("modalidade", dados.modalidade);
  
    forms.reset();
    window.location.href = "jogo.html";
    return false;
  } else {
    document.getElementById("invalido").innerHTML = 
    "O número de bombas deve respeitar o tamanho do grid";
    return false;
  }
}


function checagem(x, y, bombas) {
  if (bombas > x*y) {
    return false;
  } else {
    return true;
  }
}


function generateGrid() {
  grid.innerHTML = "";
  for (var i = 0; i < dimensao; i++) {
    row = grid.insertRow(i);
    for (var j = 0; j < dimensao; j++) {
      cell = row.insertCell(j);
      cell.onclick = function() { clickCell(this); };
      var mine = document.createAttribute("data-mine");       
      mine.value = "false";             
      cell.setAttributeNode(mine);
    }
  }
  infos();
  addMines();
}


function infos() {
  var txtDimensaoX = document.getElementById("dimensao");
  var txtDimensaoY = document.getElementById("dimensao");
  txtDimensaoX = sessionStorage.getItem("dimensaoX");
  txtDimensaoY = sessionStorage.getItem("dimensaoY");
  document.getElementById("dimensao").innerHTML = txtDimensaoX + "x" + txtDimensaoY;

  var txtBombas = document.getElementById("bombas");
  txtBombas = sessionStorage.getItem("bombas");
  document.getElementById("bombas").innerHTML = txtBombas;

  document.getElementById("modalidade").innerHTML = sessionStorage.getItem("modalidade");

  //var txtRivotril = document.getElementById("rivotril");
  //document.getElementById("rivotril").innerHTML = 2;
}


// criando o cronometro do jogo
let segundos = 0;
let minutos = 0;
setInterval(function(){ tempo() }, 1000);

function tempo() {        
  const cronometro = document.getElementById('tempo');
  segundos++;
  segundos = segundos < 10 ? '0' + segundos : segundos;

  if(segundos == 60) {
    minutos++;
    segundos = 0;
    minutos = minutos < 10 ? '0' + minutos : minutos;
  }
  cronometro.innerHTML = `${minutos}:${segundos}`;
}


function inciarRivotril(){
  if (sessioStorage.getItem("modalidade") == 'rivotril') {
    const comecarMinutos = 10;
    let temporestante = comecarMinutos * 60;
    const temporizadorEl = document.getElementById('rivotril');
    setInterval(timerRivotril, 1000); 
  }
}


function timerRivotril() {
  let minutos = Math.floor(temporestante / 60);
  minutos = minutos < 10 ? '0' + minutos : minutos; //se minutos < 10, adicionar 0 a esquerda. Ex: 07:23

  let segundos = temporestante % 60;
  segundos = segundos < 10 ? '0' + segundos : segundos; //se segundos < 10, adicionar 0 a esquerda. Ex: 02:09

  temporizadorEl.innerHTML = `${minutos}:${segundos}`;

  temporestante--;
  temporestante = temporestante < 0 ? 0 : temporestante; //impedir que o temporizador passe para numeros negativos
}


function addMines() {
  for(var i = 0; i < parseInt(sessionStorage.getItem("bombas")); i++) {
    var row = Math.floor(Math.random() * dimensao);
    var col = Math.floor(Math.random() * dimensao);
    var cell = grid.rows[row].cells[col];
    cell.setAttribute("data-mine","true");
    if (testMode) {
      cell.innerHTML = "X";
    }
  }
}


function revealMines() {
  //Highlight all mines in red
  for (var i = 0; i < dimensao; i++) {
    for (var j = 0; j < dimensao; j++) {
      var cell = grid.rows[i].cells[j];
      if (cell.getAttribute("data-mine") == "true") cell.className = "mine", cell.innerHTML="💣";
    }
  }
}

function checkLevelCompletion() {
  var levelComplete = true;
    for(var i = 0; i < dimensao; i++) {
      for(var j = 0; j < dimensao; j++) {
        if((grid.rows[i].cells[j].getAttribute("data-mine") == "false") 
        && (grid.rows[i].cells[j].innerHTML == "")) {
          levelComplete = false;
        }
      }
  }

  if (levelComplete) {
    alert("VITÓRIA");
    revealMines();
  }
}


function clickCell(cell) {
  //Check if the end-user clicked on a mine
  if (cell.getAttribute("data-mine") == "true") {
    revealMines();
    alert("Game Over");
  } else {
    cell.className = "clicked";
    //Count and display the number of adjacent mines
    var mineCount = 0;
    var cellRow = cell.parentNode.rowIndex;
    var cellCol = cell.cellIndex;
    //alert(cellRow + " " + cellCol);
    for (var i = Math.max(cellRow-1,0); i <= Math.min(cellRow+1, dimensao-1); i++) {
      for(var j = Math.max(cellCol-1,0); j <= Math.min(cellCol+1, dimensao-1); j++) {
        if (grid.rows[i].cells[j].getAttribute("data-mine") == "true"){
          mineCount++;
        } 
      }
    }

    cell.innerHTML = mineCount;
    if (mineCount == 0) { 
      //Reveal all adjacent cells as they do not have a mine
      for (var i = Math.max(cellRow-1,0); i <= Math.min(cellRow+1, dimensao-1); i++) {
        for(var j = Math.max(cellCol-1,0); j <= Math.min(cellCol+1, dimensao-1); j++) {
          //Recursive Call
          if (grid.rows[i].cells[j].innerHTML==""){
            clickCell(grid.rows[i].cells[j]);
          }
        }
      }
    }
    checkLevelCompletion();
  }
}


function cheatButton() {
  //Highlight all mines in red (different from revealMines, due to the bomb img)
  for (var i = 0; i < dimensao; i++) {
    for (var j = 0; j < dimensao; j++) {
      var cell = grid.rows[i].cells[j];
      if (cell.getAttribute("data-mine") == "true") cell.className = "mine";
    }
  }
  setTimeout(function() { // Hides the highlighted mines after 5 seconds
    for (var i = 0; i < dimensao; i++) {
      for(var j = 0; j < dimensao; j++) {
        var cell = grid.rows[i].cells[j];
        if (cell.getAttribute("data-mine")=="true") cell.className="hidden";
      }
    }
  }, 5000);
}
