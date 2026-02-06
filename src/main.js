import './style.scss'

document.querySelector('#app').innerHTML = `
 <header class="topo">
    <img class="logo" src="src/images/logo.png" alt="logotipo de tabela flash">
    <div class="table-generator">
      <form id="tableForm" class="formtabela">
        <div class="qt">
          <label for="rows" class="form-label">Quantidade de linhas:</label>
          <input type="number" id="rows" class="inputflash" min="1" required >
        </div>

        <div class="qt">
          <label for="cols" class="form-label">Quantidade de colunas:</label>
          <input type="number" id="cols" class="inputflash" min="1" required >
        </div>

        <div class="">
          <button type="submit" class="btngerar">Gerar/alterar tabela</button>
        </div>
      </form>
    </div>
  </header>

  <section>
        <div id="tableResult" class="tabelagerada">A sua tabela será gerada aqui.......</div>
  </section>

  <div id="whatsapp-float" class="whatsapp-float" >
    <span class="material-symbols-outlined">file_save</span>
  </div>


  
`
