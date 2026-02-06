window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = ''; // Exibe aquele alerta padrão do navegador: "Deseja sair?"
});
