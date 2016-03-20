/* FileName: sbglobal.js
 * Purpose: Event handler js file
 * Revision History
 * 		Steven Bulgin, 2016.03.01: Created
 *      Steven Bulgin, 2016.03.01: Added ready event
 *      Steven Bulgin, 2016.03.01: Added function 'sbCbxChecker' that takes two
 *						params, checkbox id and id to hide.
 *      Steven Bulgin, 2016.03.01: Added btn event for Save, Update, and Save 
 *						Defaults
 *					*** Add Some validation on the default email ***
 *      Steven Bulgin, 2016.03.19: Added InitDB function that creates db on startup
 */

function sbCbxChecker(cbxid, elmid) {
	$("#" + cbxid).change(function() {
		if(!$("#" + cbxid).is(":checked")){
			$("#" + elmid).hide();
		}
		else{
			$("#" + elmid).show();
		}
	});
}

function btnUpdate_click() {
	if(sbValidate_sbEditForm()) {
		var service = parseInt($("#editservice").val());
		var valuerating = parseInt($("#editvalrating").val());
		var food = parseInt($("#editfoodquality").val());
		console.info("Tesy: " + food);
		var avg = Math.round(((food + service + valuerating)/15)*100);
		$("#editrating").val(avg + "%");

	}
}

function btnSave_click() {
	if(sbValidate_sbAddForm()) {
		var service = parseInt($("#service").val());
		var valuerating = parseInt($("#valrating").val());
		var food = parseInt($("#foodquality").val());
		var avg = Math.round(((food + service + valuerating)/15)*100);
		$("#rating").val(avg + "%");

	}
}

function btnSaveDefaults_click() {
	if(sbValidateDefaults()){
		localStorer();
	}
}

function btnDatabaseClear_click () {
	 clearDatabase(); 
}

function init() {
 	sbCbxChecker("chkReview", "rating-grp");
 	sbCbxChecker("chkEditReview", "rating-edit-grp");

 	$("#btnUpdate").on('click', btnUpdate_click);
	$("#btnSave").on('click', btnSave_click);
 	$("#btnSaveDefaults").on("click", btnSaveDefaults_click);
 	$("#btnDatabaseClear").on("click", btnDatabaseClear_click);
}

function initDB() {
	 console.info("Creating db");
	 try {
	  	DB.sbCreateDatabase();
	  	if (db) {
	  		console.info("making the tables");
	  		DB.sbCreateTables();
	  	}
	  } catch(e) {
	  	console.error("Error: (Fatal) Error in initDB. Can not proceed");
	  } 
}

$(document).ready(function() {
 	init();
 	initDB();
});