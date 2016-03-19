/* FileName: sbdatabase.js
 * Purpose: Holds db functions for SBFeedbackA3
 * Revision History
 * 		Steven Bulgin, 2016.03.19: Created
 *      Steven Bulgin, 2016.03.19: Added sbCreateDatabase, DB creating
 */

 var db;

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
 	}

 };