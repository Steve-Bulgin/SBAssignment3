/* FileName: sbdatabase.js
 * Purpose: Holds db functions for SBFeedbackA3
 * Revision History
 * 		Steven Bulgin, 2016.03.19: Created
 *      Steven Bulgin, 2016.03.19: Added sbCreateDatabase, DB creating
 *      Steven Bulgin, 2016.03.20: Added dropTables
 */

 var db;

 function errorHandler(tx, error) {
    console.error("SQL error: " + tx + " (" + error.code + ") " + 
    	error.message);
 }

 function successTransaction() {
    console.info("Success: You got it working");
 }


 var DB = {
 	sbCreateDatabase: function () {
 		 var shortName = "SBFeedbackA3DB";
 		 var version = "1.0";
 		 var displayName = "SBFeedbackA3 DB";
 		 var dbSize = 2*1024*1024;

 		 console.info("Making db");
 		 db = openDatabase(shortName, version, displayName, dbSize, 
 		 	dbCreateSuccess);

 		 function dbCreateSuccess () {
 		 	 console.info("DB Made"); 
 		 }
 	},
 	sbCreateTables: function () {
 		 function successCreate () {
 		  	 console.info("Tables made"); 
 		  }

 		  function txFunction(tx) {
 		  	var options = [];
 		  	console.info("Making tables");
 		  	var sql = "CREATE TABLE IF NOT EXISTS type(" +
 		  		"id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
 		  		"name VARCHAR(20) NOT NULL); ";
 		  	tx.executeSql(sql, options, successCreate, errorHandler);

 		  	/* Create for review */

 		  	sql = "CREATE TABLE IF NOT EXISTS review(" +
 		  		  "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
 		  		  "businessName VARCHAR(30) NOT NULL, " +
 		  		  "typeId INTEGER NOT NULL, " +
 		  		  "reviewerEmail VARCHAR(30), " +
 		  		  "reviewerComments TEXT, " +
 		  		  "reviewDate DATE, " +
 		  		  "hasRating VARCHAR(1), " +
 		  		  "rating1 INTEGER, " +
 		  		  "rating2 INTEGER, " +
 		  		  "rating3 INTEGER, " +
 		  		  "FOREIGN KEY(typeId) REFERENCES type(id));";
 		  	tx.executeSql(sql, options, successCreate, errorHandler);
 		  }
 		  db.transaction(txFunction, errorHandler, successTransaction) 		 
 	},

 	dropTables: function () {
 		 
 		 function successDrop () {
 		 	 console.info("Drop worked"); 
 		 }

 		 function txFunction (tx) {
 		  	 var options = [];
 		  	 console.info("drop reviews");
 		  	 var sql = "DROP TABLE IF EXISTS review;";
 		  	 tx.executeSql(sql, options, successDrop, errorHandler);

 		  	 /* drop for type */ 

 		  	 console.info("drop type");
 		  	 sql = "DROP TABLE IF EXISTS type;";
 		  	 tx.executeSql(sql, options, successDrop, errorHandler); 
 		  }
 		  db.transaction(txFunction, errorHandler, successTransaction); 
 	}

 };