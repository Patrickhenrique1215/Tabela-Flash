document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("tableForm");
    const tableResult = document.getElementById("tableResult");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const rows = parseInt(document.getElementById("rows").value);
        const cols = parseInt(document.getElementById("cols").value);
        const totalCells = rows * cols;

        if(totalCells > 100000){
            alert("Tabela muito grande! Máximo 100 mil células.");
            return;
        }

        tableResult.innerHTML = `
            <table class="tableflash">
                <tbody></tbody>
            </table>
        `;

        const tbody = tableResult.querySelector("tbody");
        let cellIndex = 0;
        const CHUNK_SIZE = 500;

        function generateChunk (){
            const fragment = document.createDocumentFragment();
            const start = cellIndex;
            const end = Math.min(start + CHUNK_SIZE, totalCells);

            for (let i = Math.floor(start / cols); i < rows && cellIndex < end; i++){
                const tr = document.createElement("tr");
                for ( let j = 0; j < cols; j++){
                    if (cellIndex >= end) break;
                    const td = document.createElement("td");
                    td.contentEditable = true;
                    tr.appendChild(td);
                    cellIndex++;
                }
                fragment.appendChild(tr);
            }
            tbody.appendChild(fragment);

            if (cellIndex < totalCells){
                requestAnimationFrame(generateChunk);
            } else {
                console.log("Tabela completa");
            }

        }

        requestAnimationFrame(generateChunk)






        /*let table = `
            <table class="tableflash">
            <tbody>
        `;

        for (let i = 0; i < rows; i++) {
            table += "<tr>";
            for (let j = 0; j < cols; j++) {
                table += `<td contenteditable></td>`;
            }
            table += "</tr>";
        }

        table += `
            </tbody>
            </table>
        `;

        tableResult.innerHTML = table;
    });*/
    });
});    
