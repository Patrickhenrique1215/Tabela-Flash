import './style.scss'
import './gerador.js'
import './mensagemdecarregamento.js'
import './botaosalvar.js'
import './modal.js'
import './salvar.js'

document.querySelector('#app').innerHTML = `
 <header class="topo">
    <img class="logo" src="/logo.png" alt="logotipo de tabela flash">
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

  <div class="overlayspinner">
    <div id="spinner" class="cxspinner">
      <div class="spinner"></div>
      <div class="textspinner">Aguarde...<br>Gerando tabela...</div>
    </div>
    
  </div>  

  <section>
    <div id="tableResult" class="tabelagerada"><span class="asua">A sua tabela será gerada aqui.......</span></div>
  </section>

  <div id="whatsapp-float" class="whatsapp-float" >
    <span id="openModal" class="material-symbols-outlined">file_save</span>
  </div>

  <div class="overlay" id="overlay">
    <div class="modal">
        <div class="divclose"><button class="close" id="closeModal">x</button></div>
         <div id="group-documents" class="download-group documents">
            <h3 class="group-title">📄 Documentos</h3>
            <div class="button-group">
                <button id="btn-pdf" class="download-btn doc" data-format="pdf">PDF</button>
                <button id="btn-docx" class="download-btn doc" data-format="docx">DOCX</button>
                <button id="btn-odt" class="download-btn doc" data-format="odt">ODT</button>
                <button id="btn-txt" class="download-btn doc" data-format="txt">TXT</button>
                <button id="btn-rtf" class="download-btn doc" data-format="rtf">RTF</button>
                <button id="btn-md" class="download-btn doc" data-format="md">MD</button>
                <button id="btn-html" class="download-btn doc" data-format="html">HTML</button>
            </div>
        </div>

        <div id="group-images" class="download-group images">
            <h3 class="group-title">🖼 Imagens</h3>
            <div class="button-group">
                <button id="btn-png" class="download-btn image" data-format="png">PNG</button>
                <button id="btn-jpg" class="download-btn image" data-format="jpg">JPG</button>
                <button id="btn-jpeg" class="download-btn image" data-format="jpeg">JPEG</button>
                <button id="btn-webp" class="download-btn image" data-format="webp">WEBP</button>
                <button id="btn-svg" class="download-btn image" data-format="svg">SVG</button>
            </div>
        </div>

        <div id="group-spreadsheets" class="download-group spreadsheets">
            <h3 class="group-title">📊 Planilhas</h3>
            <div class="button-group">
                <button id="btn-xlsx" class="download-btn sheet" data-format="xlsx">XLSX</button>
                <button id="btn-ods" class="download-btn sheet" data-format="ods">ODS</button>
                <button id="btn-csv" class="download-btn sheet" data-format="csv">CSV</button>
            </div>
        </div>

        <div id="group-data" class="download-group data">
            <h3 class="group-title">🗃 Dados</h3>
            <div class="button-group">
                <button id="btn-json" class="download-btn data" data-format="json">JSON</button>
                <button id="btn-ndjson" class="download-btn data" data-format="ndjson">NDJSON</button>
                <button id="btn-jsonl" class="download-btn data" data-format="jsonl">JSONL</button>
                <button id="btn-xml" class="download-btn data" data-format="xml">XML</button>
                <button id="btn-sql" class="download-btn data" data-format="sql">SQL</button>
            </div>
        </div>

        
    </div>
  </div>


  
`
