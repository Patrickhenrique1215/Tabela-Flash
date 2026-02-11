
document.addEventListener("DOMContentLoaded", () => {
  function getTableData() {
        const table = document.querySelector(".tableflash");
        const rows = table.querySelectorAll("tr");

        return Array.from(rows).map(row => {
            const cells = row.querySelectorAll("td");
            return Array.from(cells).map(cell => cell.innerText.trim());
        });
    }

    function downloadFile(content, filename, mime) {
        const blob = new Blob([content], { type: mime });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();

        URL.revokeObjectURL(url);
    }

    //TXT
    function exportTXT(data) {
        const content = data.map(row => row.join("\t")).join("\n");
        downloadFile(content, "tabelaflash.txt", "text/plain");
    }

    //MD
    function exportMD(data) {
        const header = data[0];
        const separator = header.map(() => "---");

        const rows = [
            header.join(" | "),
            separator.join(" | "),
            ...data.slice(1).map(row => row.join(" | "))
        ];

        downloadFile(rows.join("\n"), "tabelaflash.md", "text/markdown");
    }

    //HTML
    function exportHTML() {
        const table = document.querySelector(".tableflash").outerHTML;
        downloadFile(table, "tabelaflash.html", "text/html");
    }

    // XLSX
    function exportXLSX(data) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Tabela");

        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        downloadFile(blob, "tabelaflash.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }

    // ODS
    function exportODS(data) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Tabela");

        const wbout = XLSX.write(wb, { bookType: "ods", type: "array" });
        const blob = new Blob([wbout], { type: "application/vnd.oasis.opendocument.spreadsheet" });

        downloadFile(blob, "tabelaflash.ods", "application/vnd.oasis.opendocument.spreadsheet");
    }

    //CSV
    function exportCSV(data) {
        const content = data.map(row => 
            row.map(cell => `"${cell}"`).join(",")
        ).join("\n");

        downloadFile(content, "tabelaflash.csv", "text/csv");
    }

    //JSON
    function exportJSON(data) {
        const content = JSON.stringify(data, null, 2);
        downloadFile(content, "tabelaflash.json", "application/json");
    }

    // NDJSON 
    function exportNDJSON(data) {
        const content = data.map(row => JSON.stringify(row)).join("\n");
        downloadFile(content, "tabelaflash.ndjson", "application/x-ndjson");
    }

    // JSONL
    function exportJSONL(data) {
        const content = data.map(row => JSON.stringify(row)).join("\n");
        downloadFile(content, "tabelaflash.jsonl", "application/json");
    }

    // XML
    function exportXML(data) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<tabela>\n';

        data.forEach((row, rowIndex) => {
            xml += `  <linha index="${rowIndex}">\n`;
            row.forEach((cell, cellIndex) => {
                xml += `    <coluna index="${cellIndex}">${cell}</coluna>\n`;
            });
            xml += "  </linha>\n";
        });

        xml += "</tabela>";

        downloadFile(xml, "tabelaflash.xml", "application/xml");
    }

    // SQL
    function exportSQL(data) {
        // Usar a primeira linha como cabeçalho (nomes das colunas)
        const headers = data[0];
        const rows = data.slice(1);

        let sql = "CREATE TABLE tabela (\n";
        sql += headers.map(h => `  ${h} TEXT`).join(",\n");
        sql += "\n);\n\n";

        rows.forEach(row => {
            const values = row.map(v => `'${v.replace(/'/g, "''")}'`).join(", ");
            sql += `INSERT INTO tabela (${headers.join(", ")}) VALUES (${values});\n`;
        });

        downloadFile(sql, "tabelaflash.sql", "application/sql");
    }


    

  

    document.querySelectorAll(".download-btn").forEach(button => {
        button.addEventListener("click", () => {

            const format = button.dataset.format;
            const data = getTableData();

            switch (format) {
                
                case "txt":
                    exportTXT(data);
                break;

                case "md":
                    exportMD(data);
                break;

                case "html":
                    exportHTML();
                break;

                case "xlsx":
                    exportXLSX(data);
                break;

                case "ods":
                    exportODS(data);
                break;

                case "csv":
                    exportCSV(data);
                break;

                case "json":
                    exportJSON(data);
                break;

                case "ndjson":
                    exportNDJSON(data); 
                break; 
                
                case "jsonl": 
                    exportJSONL(data); 
                break;

                case "xml":
                    exportXML(data);
                break;

                case "sql":
                     exportSQL(data);
                break;



                default:
                    alert("Formato ainda não implementado.");
            }
        });
    });

});

