/* FileName: sbfacade.js
 * Purpose: Link between DB and view
 * Revision History
 * 		Steven Bulgin, 2016.03.19: Created
 *      Steven Bulgin, 2016.03.20: Added clearDatabase function 
 *      Steven Bulgin, 2016.03.20: Added insert and drop function for type tbl
 *						Don't think it's right.
 *      Steven Bulgin, 2016.03.20: Insert works. sbaddFeedback added but 
 *						default on the select is being a pest
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
            var row = results.rows[i];

            if (row['name'] != "Others") {
            	code += "<option value=\"" + row['id'] + "\">" + 
		 			 row['name'] + "</option>";	
            }
            else {
            	code += "<option selected=\"selected\" value=\"" + row['id'] + 
            		 "\">" + 
		 			 row['name'] + "</option>";	

		 		// $('#foodtype').val() = row['id'];

		 			 
            }		 		  	
		 }
		 var list = $("#foodtype");
		 list = list.html(code);
	}
	Type.sbselectAll(sbsuccessSelectAll); 

}

function sbaddFeedback () {
	 if(sbValidate_sbAddForm()) {

	 	var business = $("#business").val();
	 	var foodtype = $("#foodtype").val();
	 	var email = $("#email").val();
	 	var comments = $("#comments").val();
	 	var reviewdate = $("#reviewdate").val();
	 	var hashrating = $("#chkReview").is(':checked');

	 	if ($("#chkReview").is(":checked")) {
	 		var foodquality = $("#foodquality").val();
	 		var service = $("#service").val();
	 		var valrating = $("#valrating").val();
	 	}
	 	else{
	 		var foodquality = "";
	 		var service = "";
	 		var valrating = "";
	 	}

	 	var options = [business, foodtype, email, comments, reviewdate, hashrating,
	 				   foodquality, service, valrating];

	 	Review.sbinsert(options);
	 	

	 }
}

