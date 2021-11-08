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
    window.location.href = "login.html";
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

var ganhador;

var grid = document.getElementById("grid");
var testMode = false; // Vira True quando clicamos no botão trapaça
dimensao = parseInt(sessionStorage.getItem("dimensao"));

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
sessionStorage.setItem("dateTime", dateTime);
let segundos = 0;
let minutos = 0;

generateGrid();

function configs() {
  var modo = document.getElementById("modalidade");
  var forms = document.forms["formulario"];
  var dados = {
    'dimensao': forms["dimensao"].value,
    'bombas': forms["bombas"].value,
    'modalidade': modo.value
  }

  if (checagem(dados.dimensao, dados.bombas)) {
    sessionStorage.setItem("dimensao", dados.dimensao);
    sessionStorage.setItem("bombas", dados.bombas);
    sessionStorage.setItem("modalidade", dados.modalidade);
  
    forms.reset();
    window.location.href = "jogo.html";
    return false;
  } else {
    return false;
  }
}


function buildParam() {
  window.location.href='historico.html';
}


function checagem(dimensao, bombas) {
  if (dimensao <= 0 || bombas < 0) {
    document.getElementById("invalido2").innerHTML = 
    "<br><br>O tamanho do grid e/ou a quantidade de bombas não podem ser números negativos";
    return false;
  }
  else if (bombas > dimensao**2) {
    document.getElementById("invalido").innerHTML = 
    "O número de bombas deve respeitar o tamanho do grid";
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
  txtDimensaoX = sessionStorage.getItem("dimensao");
  txtDimensaoY = sessionStorage.getItem("dimensao");
  document.getElementById("dimensao").innerHTML = txtDimensaoX + "x" + txtDimensaoY;

  var txtBombas = document.getElementById("bombas");
  txtBombas = sessionStorage.getItem("bombas");
  document.getElementById("bombas").innerHTML = txtBombas;

  document.getElementById("modalidade").innerHTML = sessionStorage.getItem("modalidade");

  //var txtRivotril = document.getElementById("rivotril");
  //document.getElementById("rivotril").innerHTML = 2;
}


function start() {
  intervalo = setInterval(tempo, 1000);
}


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


function iniciarRivotril(){
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
      if (cell.getAttribute("data-mine") == "true") cell.className = "mine", cell.innerHTML = "💣";
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
    revealMines();
    endGame();
    clearInterval(intervalo);
    hideButton();
    alert("VITÓRIA");
    //novoRegisto();
    saveResult();
    sessionStorage.setItem("resultado", "ganhou");
  }
}

function clickCell(cell) {
  //Check if the end-user clicked on a mine
  if (cell.getAttribute("data-mine") == "true") {
    revealMines();
    endGame();
    clearInterval(intervalo);
    hideButton();
    alert("GAME OVER");
    //novoRegisto();
    saveResult();
    sessionStorage.setItem("resultado", "perdeu")
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
  //show all the cells except the ones that were already revealed when the cheat button was pressed
  for (var i = 0; i < dimensao; i++) {
    for (var j = 0; j < dimensao; j++) {
      //if it was not revealed before and it is a mine, reveal it
      if ((grid.rows[i].cells[j].innerHTML == "") && (grid.rows[i].cells[j].getAttribute("data-mine") == "true")) {
        grid.rows[i].cells[j].className = "mine";
        grid.rows[i].cells[j].innerHTML = "💣";
      } 
      //else if it was not revealed before and it is not a mine, reveal it
      else if ((grid.rows[i].cells[j].innerHTML == "") && (grid.rows[i].cells[j].getAttribute("data-mine") == "false")) {
        grid.rows[i].cells[j].className = "clicked";
        grid.rows[i].cells[j].innerHTML = "";
      }
    }
  }
 
  //hide all the cells except the ones that were already revealed after 5 seconds
  setTimeout(function() {
    for (var i = 0; i < dimensao; i++) {
      for (var j = 0; j < dimensao; j++) {
        if (grid.rows[i].cells[j].innerHTML == "") {
          grid.rows[i].cells[j].className = "";
          grid.rows[i].cells[j].innerHTML = "";
        }
        else if (grid.rows[i].cells[j].getAttribute("data-mine") == "true") {
          grid.rows[i].cells[j].className = "";
          grid.rows[i].cells[j].innerHTML = "";
        }
      }
    }
  }, 5000);
}


function endGame() {
  //create an function that will block the user from clicking on the grid 
  for(var i = 0; i < dimensao; i++) {
    for(var j = 0; j < dimensao; j++) {
      grid.rows[i].cells[j].onclick = function() { return false; };
    }
  }
}

function  hideButton() {
  document.getElementById('trapaca').disabled = 'true';
}


function saveResult(){
  let tempo = document.querySelector("#tempo").innerText
  let dimensao = document.querySelector("#dimensao").innerText
  let bombas = document.querySelector("#bombas").innerText
  let modalidade = document.querySelector("#modalidade").innerText

  sessionStorage.setItem("tempo", tempo);
  sessionStorage.setItem("dimensao", dimensao);
  sessionStorage.setItem("bombas", bombas);
  sessionStorage.setItem("modalidade", modalidade);
  }



/*------------------- RANKING ---------------------*/
