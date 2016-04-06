/* FileName: sbfeedbackDAL.js
 * Purpose: Link between DB and facade
 * Revision History
 * 		Steven Bulgin, 2016.03.20: Created
 *      Steven Bulgin, 2016.03.20: Added all crud Plus other stuff. Don't
 *						think it's right.
 *      Steven Bulgin, 2016.03.22: Had wrong number of values in sbupdate, fixed
 */




var Type = {
	sbselectAll: function (callback) {
		 var options = [];
		 function txFunction (tx) {
		 	 var sql = "SELECT * FROM type;";

		  	 tx.executeSql(sql, options, callback, errorHandler); 
		 }
		 db.transaction(txFunction, errorHandler, successTransaction);

	},
	insert: function (options) {
		function txFunction (tx) {
			function successInsert () {
			   console.info("Inserted types"); 
			}

			var sql = "INSERT INTO type(name) " +
		 		   "VALUES(?); " ;
 		    
 		    tx.executeSql(sql, options, successInsert, errorHandler);
		}
		db.transaction(txFunction, errorHandler, successTransaction);		 
	},
	drop: function () {
 		 function successDrop () {
 		 	 console.info("Drop worked"); 
 		 }

 		 function txFunction (tx) {
 		  	 var options = [];
 		  	 console.info("drop type");
 		  	 var sql = "DROP TABLE IF EXISTS type;";
 		  	 tx.executeSql(sql, options, successDrop, errorHandler); 
 		  }
 		  db.transaction(txFunction, errorHandler, successTransaction);
 	} 
};

var Review = {
	sbinsert: function (options) {
		function txFunction (tx) {
			 var sql = "INSERT INTO review(businessName, typeId, reviewerEmail, " +
		 		   "reviewerComments, reviewDate, hasRating, rating1, " +
		 		   "rating2, rating3) " +
		 		   "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?); " ; 

		 	 function successInsert() {
                console.info("Success: Insert successful.");
                alert("New Feedback Added.");
            }
            tx.executeSql(sql, options, successInsert, errorHandler);
		}
		db.transaction(txFunction, errorHandler, successTransaction); 		
	},
	sbselect: function (options, callback) {		 
        function txFunction(tx) {
            var sql = "SELECT * FROM review WHERE id=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
	},
	sbselectAll: function (callback) {
		 var options = [];
		 function txFunction (tx) {
		  	 var sql = "SELECT * FROM review;";

		  	 tx.executeSql(sql, options, callback, errorHandler); 
		  } 
		  db.transaction(txFunction, errorHandler, successTransaction);
	},
	sbupdate: function (options) {
		 function txFunction (tx) {
		  	 var sql = "UPDATE review " +
		  	 		   "SET businessName=?, typeId=?, reviewerEmail=?, " +
		  	 		   "reviewerComments=?, reviewDate=?, hasRating=?, " +
		  	 		   "rating1=?, rating2=?, rating3=? " +
		  	 		   "WHERE id=?;"; 
		  	 function successUpdate() {
                console.info("Success: Update successful");
                alert("Record updated successfully");
            }
            tx.executeSql(sql, options, successUpdate, errorHandler);
		 } 
		 db.transaction(txFunction, errorHandler, successTransaction);
	},
	sbdelete: function (options) {
		 function txFunction (tx) {
		  	 var sql = "DELETE FROM review WHERE id = ?;";

	  	     function successDelete() {
                 console.info("Success: Delete successful");
                 alert("Record deleted successfully");
            }
            tx.executeSql(sql, options, successDelete, errorHandler);
		 }
		 db.transaction(txFunction, errorHandler, successTransaction); 
	}
};