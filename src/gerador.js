
const form = document.getElementById("tableForm");
const tableResult = document.getElementById("tableResult");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);

    let table = `
        <table class="table table-bordered table-striped tableflash" >
        <tbody>
    `;

    for (let i = 0; i < rows; i++) {
        table += "<tr>";
        for (let j = 0; j < cols; j++) {
        table += `<td contenteditable="true" ></td>`;
        }
        table += "</tr>";
    }

    table += `
        </tbody>
        </table>
    `;

    tableResult.innerHTML = table;
});

