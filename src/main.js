import './style.scss'

document.querySelector('#app').innerHTML = `
 <header class="container d-flex justify-content-center">
    <img class="img-fluid" style="width: 24vw; " src="src/images/logo.png" alt="logotipo de tabela flash">
	</header>

	<section class="container-fluid table-generator">
		
    <form id="tableForm" class="card row text-center formtabela align-items-center">
      <div class="mb-3 col-12 col-md-4">
        <label for="rows" class="form-label">Quantidade de linhas:</label>
        <input type="number" id="rows" class="form-control inputflash" min="1" required >
      </div>

      <div class="mb-3 col-12 col-md-4">
        <label for="cols" class="form-label">Quantidade de colunas:</label>
        <input type="number" id="cols" class="form-control inputflash" min="1" required >
      </div>

      <div class="mb-3 col-12 col-md-4 row align-items-center">
        <button type="submit" class="btn btngerar">Gerar tabela</button>
      </div>
    </form>


		<div class="row mt-5 mb-5">
			<div class="col-12">
			  <div id="tableResult" class="table-responsive"></div>
			</div>
		</div>
	</section>

  <div id="whatsapp-float" class="whatsapp-float" >
    <span class="material-symbols-outlined">file_save</span>
</div>


  


	<footer class="footer mb-5>
		
	</footer>
`
// No final do body ou no seu script
document.addEventListener('DOMContentLoaded', function () {
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl, {
    trigger: 'click',          // ou 'focus', 'hover'
    container: 'body'          // evita problemas de posicionamento
  }));
});