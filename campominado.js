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


/*---------------------- JOGO ------------------------*/

var grid = document.getElementById("grid");
var testMode = false; //Turn this variable to true to see where the mines are
generateGrid();

function generateGrid() {
  //generate 10 by 10 grid
  grid.innerHTML="";
  for (var i=0; i<10; i++) {
    row = grid.insertRow(i);
    for (var j=0; j<10; j++) {
      cell = row.insertCell(j);
      cell.onclick = function() { clickCell(this); };
      var mine = document.createAttribute("data-mine");       
      mine.value = "false";             
      cell.setAttributeNode(mine);
    }
  }
  addMines();
}

function addMines() {
  //Add mines randomly
  for (var i=0; i<20; i++) {
    var row = Math.floor(Math.random() * 10);
    var col = Math.floor(Math.random() * 10);
    var cell = grid.rows[row].cells[col];
    cell.setAttribute("data-mine","true");
    if (testMode) cell.innerHTML="X";
  }
}

function revealMines() {
    //Highlight all mines in red
    for (var i=0; i<10; i++) {
      for(var j=0; j<10; j++) {
        var cell = grid.rows[i].cells[j];
        if (cell.getAttribute("data-mine")=="true") cell.className="mine";
      }
    }
    setTimeout(function() {// Hides the highllighted mines after 5 seconds
      for (var i=0; i<10; i++) {
        for(var j=0; j<10; j++) {
          var cell = grid.rows[i].cells[j];
          if (cell.getAttribute("data-mine")=="true") cell.className="hidden";
        }
      }
    }, 5000);
}

function checkLevelCompletion() {
  var levelComplete = true;
    for (var i=0; i<10; i++) {
      for(var j=0; j<10; j++) {
        if ((grid.rows[i].cells[j].getAttribute("data-mine")=="false") && (grid.rows[i].cells[j].innerHTML=="")) levelComplete=false;
      }
  }
  if (levelComplete) {
    alert("You Win!");
    revealMines();
  }
}

function clickCell(cell) {
  //Check if the end-user clicked on a mine
  if (cell.getAttribute("data-mine")=="true") {
    revealMines();
    alert("Game Over");
  } else {
    cell.className="clicked";
    //Count and display the number of adjacent mines
    var mineCount=0;
    var cellRow = cell.parentNode.rowIndex;
    var cellCol = cell.cellIndex;
    //alert(cellRow + " " + cellCol);
    for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {
      for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) {
        if (grid.rows[i].cells[j].getAttribute("data-mine")=="true") mineCount++;
      }
    }
    cell.innerHTML=mineCount;
    if (mineCount==0) { 
      //Reveal all adjacent cells as they do not have a mine
      for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,9); i++) {
        for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,9); j++) {
          //Recursive Call
          if (grid.rows[i].cells[j].innerHTML=="") clickCell(grid.rows[i].cells[j]);
        }
      }
    }
    checkLevelCompletion();
  }
}
