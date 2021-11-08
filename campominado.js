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

var grid = document.getElementById("grid");
var testMode = false; // Vira True quando clicamos no botão trapaça
var ganhador;
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
  txtDimensao = sessionStorage.getItem("dimensao");
  document.getElementById("dimensaoX").innerHTML = txtDimensao;
  document.getElementById("dimensaoY").innerHTML = txtDimensao;

  var txtBombas = document.getElementById("bombas");
  txtBombas = sessionStorage.getItem("bombas");
  document.getElementById("bombas").innerHTML = txtBombas;

  document.getElementById("modalidade").innerHTML = sessionStorage.getItem("modalidade");

  if (sessionStorage.getItem("modalidade") == "rivotril") {
    txtRivotril = "Rivotril: ";
    document.getElementById("rivotril").innerHTML = txtRivotril;
  }
}


function start() {
  if (sessionStorage.getItem("modalidade") == "rivotril") {
    switch (true) {
      case (dimensao <= 2):
        minutosRivotril = 0;
        break;
      case (dimensao <= 4):
        minutosRivotril = 2;
        break;
      case (dimensao <= 6):
        minutosRivotril = 4;
        break;
      case (dimensao <= 8):
        minutosRivotril = 6;
        break;
      case (dimensao <= 10):
        minutosRivotril = 9;
        break;
      case (dimensao <= 20):
        minutosRivotril = 14;
        break;
      default:
        minutosRivotril = 19;
        break;
    }
    segundosRivotril = 60;
    intervaloRivotril = setInterval(timerRivotril, 1000);
  }
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


function timerRivotril() {        
  const cronometroRivotril = document.getElementById('tempoRivotril');
  segundosRivotril--;
  segundosRivotril = segundosRivotril < 10 ? '0' + segundosRivotril : segundosRivotril;

  if ((minutosRivotril == 0) && (segundosRivotril == 0)) {
    revealMines();
    endGame();
    clearInterval(intervalo);
    clearInterval(intervaloRivotril);
    alert("GAME OVER");
    saveResult();
    sessionStorage.setItem("resultado", "perdeu");
    setTimeout(function() {window.location.href='historico.html?'}, 4000);
  } 
  else if (segundosRivotril == 0) {
    minutosRivotril--;
    segundosRivotril = 60;
    minutosRivotril = minutosRivotril < 10 ? '0' + minutosRivotril : minutosRivotril;
  }
  
  cronometroRivotril.innerHTML = `${minutosRivotril}:${segundosRivotril}`;
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
    
    // caso o primeiro clique seja uma bomba
    typeof intervalo !== 'undefined' ? clearInterval(intervalo) : 
    document.getElementById('tempo').innerHTML = "00:00";
    
    if (sessionStorage.getItem("modalidade") == "rivotril") {
      if (typeof intervaloRivotril !== 'undefined') {
        clearInterval(intervaloRivotril);
      }
      else {
        document.getElementById('tempo').innerHTML = "00:00";
      }
    }

    alert("VITÓRIA");
    saveResult();
    sessionStorage.setItem("resultado", "ganhou");
    setTimeout(function() {window.location.href='historico.html?'}, 4000);
  }
}


function clickCell(cell) {
  //Check if the end-user clicked on a mine
  if (cell.getAttribute("data-mine") == "true") {
    revealMines();
    endGame();

    // caso o primeiro clique seja uma bomba
    typeof intervalo !== 'undefined' ? clearInterval(intervalo) : 
    document.getElementById('tempo').innerHTML = "00:00";
    
    if (sessionStorage.getItem("modalidade") == "rivotril") {
      if (typeof intervaloRivotril !== 'undefined') {
        clearInterval(intervaloRivotril);
      }
    }

    alert("GAME OVER");
    saveResult();
    sessionStorage.setItem("resultado", "perdeu");
    setTimeout(function() {window.location.href='historico.html?'}, 4000);
  } else {
    cell.className = "clicked";
    //Count and display the number of adjacent mines
    var mineCount = 0;
    var cellRow = cell.parentNode.rowIndex;
    var cellCol = cell.cellIndex;
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


function saveResult() {
  let tempo = document.querySelector("#tempo").innerText
  sessionStorage.setItem("tempo", tempo); 
}


/*------------------- RANKING ---------------------*/


function ranking() {
  registers = JSON.parse(sessionStorage.getItem("registros"));

  let n = sessionStorage.getItem("nome");  
  let d = sessionStorage.getItem("dimensao"); 
  let t = sessionStorage.getItem("tempo");
  let r = sessionStorage.getItem("resultado");
  var numLinhas = 0;

  myCreateFunction(registers);
}

function myCreateFunction(registers) {
  //ordenação da coluna tempo
  var table = document.getElementById("rankingTable");
  ordenar();

  registers.forEach(function(registro){
    for (var i = 0; i < 10; i++) {
      var row = table.insertRow(-1);       
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);

      cell1.innerHTML = registro.nome;
      cell2.innerHTML = registro.dimensao;
      cell3.innerHTML = registro.tempo;
    }

  })
  }


  function ordenar() {
    try {
      bubbleSort(registers);
    } catch (err) {
        alert("Erro: " + err);
    }
  }


  function bubbleSort(vetor) {
    var aux;
    for (var i = vetor.length - 1; i >= 0; i--) {
      for (var j = 0; j < i; j++) {
        if (registers[j].resultado == "ganhou") {
          if (registers[j].dimensao > registers[i].dimensao) {
            aux = registers[j];
            registers[j] = registers[i];
            registers[i] = aux;
          } 
          else if (registers[j].dimensao == registers[i].dimensao) {
              if (registers[j].tempo > registers[i].tempo) {
                aux = registers[j];
                registers[j] = registers[i];
                registers[i] = aux;
              }
          }
      
        }
        else {
          continue;
        }
        
        
      }
	  }  
  }