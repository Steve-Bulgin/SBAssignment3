/* FileName: sbfacade.js
 * Purpose: Link between DB and view
 * Revision History
 * 		Steven Bulgin, 2016.03.19: Created
 */

 function clearDatabase () {
 	console.info("clrdb facade")
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