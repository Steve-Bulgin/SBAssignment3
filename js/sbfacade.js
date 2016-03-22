/* FileName: sbfacade.js
 * Purpose: Link between DB and view
 * Revision History
 * 		Steven Bulgin, 2016.03.19: Created
 *      Steven Bulgin, 2016.03.20: Added clearDatabase function 
 *      Steven Bulgin, 2016.03.20: Added insert and drop function for type tbl
 *						Don't think it's right.
 *      Steven Bulgin, 2016.03.20: Insert works. sbaddFeedback added but 
 *						default on the select is being a pest
 *      Steven Bulgin, 2016.03.22: Added sbgetReviews to display listview
 *						Added function overallValue checks 'hasRating' if
 *						true calculates avg false returns 0
 *      Steven Bulgin, 2016.03.22: Added basic shell to call the review details
 *						but it doesn't work right yet.
 *      Steven Bulgin, 2016.03.22: Added a refresh on menu. Now drop down works
 *						(Defaults on 'Others')
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
		 $('#foodtype').selectmenu();
	     $("#foodtype").selectmenu('refresh', true);

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

function sbgetReviews () {
	function sbsuccessSelectAll (tx, results) {
		var code = "";

		for (var i = 0; i < results.rows.length; i++) {
			var row = results.rows[i];

			code += "<li data-icon=\"false\">" +
                    	"<a href=\"#\" data-row-id=" + row['id'] + ">" +
                    		"<h2>Business Name: " + row['businessName'] + "</h2>" +
                    		"<p>Reviewer email: " + row['reviewerEmail'] + "</p>" +
                    		"<p>Comments: " + row['reviewerComments'] + "</p>" +
                    		"<p>Overall Rating: " + 
                    			overallValue(row['hasRating'], 
                    						 row['rating1'],
                    						 row['rating2'],
                    						 row['rating3']) + 
                    		"/100</p>" +
                    	"</a>" +
                    "</li>";
		}
		var lv = $("#reviewList");
		lv = lv.html(code);
		lv.listview("refresh");
		$("#reviewList a").on("click", listview_click);

		function listview_click () {
			 localStorage.setItem("id", $(this).attr("data-row-id"));
			 $(location).prop('href', "#sbEditFeedbackPage"); 
		}


		function overallValue (check, val1, val2, val3) {
			if (check) {
				var avg = Math.round(((val1 + val2 + val3)/15)*100);
				return avg;
			}
			else {
				return 0;
			}  
		}		 
	}
	Review.sbselectAll(sbsuccessSelectAll)	   
}

