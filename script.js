document.addEventListener('DOMContentLoaded', function() {
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const input3 = document.getElementById('input3');
    const input4 = document.getElementById('input4');
    const input5 = document.getElementById('input5');
    const botaoir = document.getElementById('botaoir');
    const botaovoltar = document.getElementById('botaovoltar');
    const botaoconfirmar = document.getElementById('botaoconfirmar');
    const catalogo = document.getElementById('produtoscatalogo');

    let lista = loadFromLocalStorage() || [];

    function loadFromLocalStorage() {
        const data = localStorage.getItem('filmes');
        return data ? JSON.parse(data) : [];
    } 

    function saveToLocalStorage(lista) {
        localStorage.setItem('filmes', JSON.stringify(lista));
    } 

    if (botaoconfirmar) {
        botaoconfirmar.addEventListener('click', function() {
            const titulo = input1.value;
            const autor = input2.value;
            const ano = input3.value;
            const genero = input4.value;
            const sinopse = input5.value;
            lista.push({ titulo, autor, ano, genero, sinopse });
            saveToLocalStorage(lista);
            input1.value = "";
            input2.value = "";
            input3.value = "";
            input4.value = "";
            input5.value = "";
        });
    }

    if (botaoir) {
        botaoir.addEventListener('click', function() {
            window.location.href = 'catalogo.html';
        });
    }
    if (botaovoltar) {
        botaovoltar.addEventListener('click', function() {
            window.location.href = 'gestao.html';
        });
    }

    

    if (catalogo) {
        carregarcatalogo();
    }

    function carregarcatalogo() {
        let lista = loadFromLocalStorage(); 
        catalogo.innerHTML = "";
        let catalogoconcatenacao = "";
        for (let index = 0; index < lista.length; index++) {
            catalogoconcatenacao += `
              <tr>
                  <td>${lista[index].titulo}</td>
                  <td>${lista[index].autor}</td>
                  <td>${lista[index].ano}</td>
                  <td>${lista[index].genero}</td>
                    <td>${lista[index].sinopse}</td>
                  <td>
                      <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Editar</button>
                      <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Remover</button>
                  </td>
              </tr>
          `;
        }
        catalogo.innerHTML = `<table>
        <tr>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Ano</th>
            <th>Genero</th>
            <th>Sinopse</th>
            <th>Ações</th>
        </tr>
        ${catalogoconcatenacao}
      </table>`;

      //BOTAO REMOVER------------------------------------------------------------------------------------------------------
      const botaoRemover = document.querySelectorAll('.delete-btn');
      botaoRemover.forEach((btn) => {
          btn.addEventListener('click', function() {
              const index = this.getAttribute('data-index');
              remover(index);
          });
      });


      function remover(index) {
          lista.splice(index, 1);
          saveToLocalStorage(lista); 
          carregarcatalogo();
      }
      //BOTAO REMOVER------------------------------------------------------------------------------------------------------





      //BOTAO EDITAR------------------------------------------------------------------------------------------------------
      const botaoEditar = document.querySelectorAll('.edit-btn');
      botaoEditar.forEach((btn) => {
          btn.addEventListener('click', function() {
              const index = this.getAttribute('data-index');
              editar(index);
          });
      });
  }


  function editar(index) {
      const filme = lista[index];
      const novoTitulo = prompt("Editar Título:", filme.titulo);
      const novoAutor = prompt("Editar autor:", filme.autor);
      const novoAno = prompt("Editar Ano de Lançamento:", filme.ano);
      const novoGenero = prompt("Editar Gênero:", filme.genero);
      const novaSinopse = prompt("Editar Sinopse:", filme.sinopse);

      if (novoTitulo !== null && novoTitulo.trim() !== "" &&
          novoAutor !== null && novoAutor.trim() !== "" &&
          novoAno !== null && novoAno.trim() !== "" &&
          novoGenero !== null && novoGenero.trim() !== "" &&
          novaSinopse !== null && novaSinopse.trim() !== "") {
          lista[index] = { titulo: novoTitulo, autor: novoAutor, ano: novoAno, genero: novoGenero, sinopse: novaSinopse };
          saveToLocalStorage(lista); 
          carregarcatalogo();
      }
  }
  //BOTAO EDITAR------------------------------------------------------------------------------------------------------
});