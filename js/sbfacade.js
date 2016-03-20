/* FileName: sbfacade.js
 * Purpose: Link between DB and view
 * Revision History
 * 		Steven Bulgin, 2016.03.19: Created
 *      Steven Bulgin, 2016.03.20: Added clearDatabase function 
 *      Steven Bulgin, 2016.03.20: Added insert and drop function for type tbl
 *						Don't think it's right.
 */

 function clearDatabase () {
    var result = confirm("Are you sure? All data will be lost");
    try {
        if (result) {
            DB.dropTables();
            alert("Database cleared!");
        }

    } catch (e) {
        alert(e);
    }
}

function insertTypes () {
	 Type.insert(); 
}

function dropTypeTbl () {
	 Type.drop(); 
}

function sbupdateTypesDropdown () {
	function sbsuccessSelectAll (tx, results) {
		 console.info("test");
		 var code = "";

		 for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i]; // results.rows.item(i) also works
            console.info("id: " + row['id'] + " name: " + row['name']);

		 	console.info("test");

		 	code += "<option value=\"" + row['id'] + "\">" + 
		 			 row['name'] + "</option>";		  	
		 }
		 var list = $("#foodtype");
		 list = list.html(code);
	}
	Type.sbselectAll(sbsuccessSelectAll); 
}