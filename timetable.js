//define the variables for the table and the row and column headers
let table = $("<table></table>");
let rowHeaders = [];
let colHeaders = ["Day/Time"];

//create the header row with column headers
let headerRow = $("<tr></tr>");
for (let i = 0; i < colHeaders.length; i++) {
    headerRow.append($("<th>" + colHeaders[i] + "</th>"));
}
table.append($("<thead></thead>").append(headerRow));

//create the body of the table
let tableBody = $("<tbody></tbody>");
for (let i = 0; i < rowHeaders.length; i++) {
    let row = $("<tr></tr>");
    row.append($("<th>" + rowHeaders[i] + "</th>"));
    for (let j = 0; j < colHeaders.length; j++) {
        row.append($("<td></td>").attr("id", i + "-" + j));
    }
    tableBody.append(row);
}
table.append(tableBody);

//add the table to the page
$("#table-container").append(table);

//dynamically add a row to the table
$("#add-row-form").submit(function(e) {
    e.preventDefault();
    let newRowHeader = $("#row-header-input").val();
    rowHeaders.push(newRowHeader);
    let newRow = $("<tr></tr>");
    newRow.append($("<th>" + newRowHeader + "</th>"));
    for (let i = 1; i <colHeaders.length; i++) {
        newRow.append($("<td></td>").attr("id", (rowHeaders.length - 1) + "-" + i));
        }
        tableBody.append(newRow);
        $("#row-select").append($("<option value='" + (rowHeaders.length - 1) + "'>" + newRowHeader + "</option>"));
        $("#row-header-input").val("");
        });
        
        //dynamically add a column to the table
        $("#add-col-form").submit(function(e) {
        e.preventDefault();
        let newColHeader = $("#col-header-input").val();
        colHeaders.push(newColHeader);
        headerRow.append($("<th>" + newColHeader + "</th>"));
        for (let i = 0; i < rowHeaders.length; i++) {
        let row = $("tr:eq(" + i + ")", tableBody);
        row.append($("<td></td>").attr("id", i + "-" + (colHeaders.length - 1)));
        }
        $("#col-select").append($("<option value='" + (colHeaders.length - 1) + "'>" + newColHeader + "</option>"));
        $("#col-header-input").val("");
        });
        
        //add an agenda item to the table
        $("#add-agenda-form").submit(function(e) {
        e.preventDefault();
        let selectedRow = $("#row-select").val();
        let selectedCol = $("#col-select").val();
        let agenda = $("#agenda-input").val();
        let cell = $("#" + selectedRow + "-" + selectedCol);
        if (cell.text() === "") {
        cell.text(agenda);
        let deleteIcon = $("<span class='delete-icon'>X</span>");
        cell.append(deleteIcon);
        deleteIcon.click(function() {
        cell.text("");
        $(this).hide();
        });
        } else {
        alert("Agenda item already exists in this cell. Please select another cell.");
        }
        $("#agenda-input").val("");
        });
        
        //populate the row and column select dropdowns
        for (let i = 0; i < rowHeaders.length; i++) {
        $("#row-select").append($("<option value='" + i + "'>" + rowHeaders[i] + "</option>"));
        }
        for (let i = 0; i < colHeaders.length; i++) {
        $("#col-select").append($("<option value='" + i + "'>" + colHeaders[i] + "</option>"));
        }
