import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, BorderStyle } from 'docx';

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


    // PDF
    function exportPDF(data) {
        // Verificar se as libs estão carregadas
    if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF !== 'function') {
            alert('Biblioteca jsPDF não carregada corretamente!');
            return;
        }

        // Extração correta
        const { jsPDF } = window.jspdf;

        const doc = new jsPDF({
            orientation: 'landscape', // Melhor para tabelas largas
            unit: 'mm',
            format: 'a4'
        });

        // Extrair cabeçalho e dados
        const headers = data[0];
        const rows = data.slice(1);

        // Gerar tabela com autoTable
        doc.autoTable({
            head: [headers],
            body: rows,
            styles: {
                fontSize: 9,
                cellPadding: 3,
                lineColor: [200, 200, 200],
                lineWidth: 0.1,
                valign: 'middle',
                halign: 'center',
                overflow: 'linebreak', // Quebra texto automaticamente
            },
            headStyles: {
                fillColor: [51, 51, 51], // Cinza escuro
                textColor: [255, 255, 255], // Branco
                fontStyle: 'bold',
                halign: 'center',
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245], // Cinza claro
            },
            margin: { top: 20, right: 10, bottom: 20, left: 10 },
            showHead: 'everyPage', // Repetir cabeçalho em todas as páginas
            tableWidth: 'auto',
            horizontalPageBreak: true, // Quebra horizontal se tabela for muito larga
            horizontalPageBreakRepeat: 0, // Repete primeira coluna na quebra horizontal
        });

        // Adicionar título
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Tabela Flash', 14, 15);
        
        // Adicionar data e hora
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        const dataHora = new Date().toLocaleString('pt-BR');
        doc.text(`Gerado em: ${dataHora}`, 14, 285);

        // Salvar o PDF
        doc.save('tabelaflash.pdf');
    }



    //DOCX
    async function exportDOCX(data) {
        // Mapear os dados para o formato da tabela do docx
        const rows = data.map((row, rowIndex) => {
            const isHeader = rowIndex === 0;
            
            return new TableRow({
                children: row.map(cell => {
                    return new TableCell({
                        children: [
                            new Paragraph({
                                text: cell,
                                bold: isHeader, // Negrito no cabeçalho
                                alignment: isHeader ? 'center' : 'left',
                            })
                        ],
                        borders: {
                            top: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
                            bottom: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
                            left: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
                            right: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
                        },
                        shading: isHeader ? { fill: "f2f2f2" } : undefined, // Fundo cinza no cabeçalho
                        width: { size: 100 / data[0].length, type: WidthType.PERCENTAGE },
                    });
                }),
            });
        });

        // Criar o documento com a tabela
        const doc = new Document({
            creator: "Tabela Flash Export",
            title: "Tabela Exportada",
            description: "Tabela exportada do sistema Tabela Flash",
            sections: [{
                properties: {
                    page: {
                        margin: { top: 1000, bottom: 1000, left: 1000, right: 1000 }, // Margens
                    },
                },
                children: [
                    new Table({
                        rows: rows,
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        layout: 'autofit',
                    })
                ],
            }],
        });

        // Gerar o arquivo e fazer download
        const blob = await Packer.toBlob(doc);
        
        // Usar sua função downloadFile existente ou criar link
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "tabelaflash.docx";
        a.click();
        URL.revokeObjectURL(url);
    }

    //ODT
    function exportODT(data) {
        // Criar estrutura XML do ODT
        let odt = `<?xml version="1.0" encoding="UTF-8"?>
    <office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
        xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
        xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0">
        <office:body>
            <office:text>
                <table:table table:name="TabelaFlash">`;
        
        // Adicionar cabeçalho
        odt += `
                    <table:table-row>`;
        data[0].forEach(header => {
            odt += `
                        <table:table-cell>
                            <text:p>${escapeXML(header)}</text:p>
                        </table:table-cell>`;
        });
        odt += `
                    </table:table-row>`;
        
        // Adicionar linhas de dados
        data.slice(1).forEach(row => {
            odt += `
                    <table:table-row>`;
            row.forEach(cell => {
                odt += `
                        <table:table-cell>
                            <text:p>${escapeXML(cell)}</text:p>
                        </table:table-cell>`;
            });
            odt += `
                    </table:table-row>`;
        });
        
        // Fechar estrutura
        odt += `
                </table:table>
            </office:text>
        </office:body>
    </office:document-content>`;
        
        downloadFile(odt, "tabelaflash.odt", "application/vnd.oasis.opendocument.text");
    }

    // Função auxiliar para escapar XML
    function escapeXML(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    //TXT
    function exportTXT(data) {
        const content = data.map(row => row.join("\t")).join("\n");
        downloadFile(content, "tabelaflash.txt", "text/plain");
    }

    //RTF
    function exportRTFSimple(data) {
        let rtf = "{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Courier New;}}\n";
        rtf += "\\f0\\fs20 \n";
        
        data.forEach((row, index) => {
            if (index === 0) {
                // Cabeçalho em negrito
                rtf += "\\b " + row.join("\\tab ") + "\\b0\\line\n";
            } else {
                rtf += row.join("\\tab ") + "\\line\n";
            }
        });
        
        rtf += "}";
        
        downloadFile(rtf, "tabelaflash.rtf", "application/rtf");
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

                case "pdf":
                    exportPDF(data);
                break;

                case "docx":
                     exportDOCX(data);
                break;    

                case "odt":
                    exportODT(data);  
                break;
                
                case "txt":
                    exportTXT(data);
                break;

                case "rtf":
                    exportRTFSimple(data);
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

