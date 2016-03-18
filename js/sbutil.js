/* FileName: sbutil.js
 * Purpose: Util, used for validation etc.
 * Revision History
 * 		Steven Bulgin, 2016.03.01: Created
 *      Steven Bulgin, 2016.03.01: Added function 'sbValidate_sbAddForm' with 
 *					validation rules for Add feedback page. Added own method
 *					'sbrangecheck' to test the range of inputs
 *      Steven Bulgin, 2016.03.01: Added 'sbValidate_sbEditForm' function
 *					Same sort of validation for edit page.
 *      Steven Bulgin, 2016.03.03: Moved local storage from global.js to
 *					sbutil.js localStorer function. Added validation for
 *					default email
 */


 function localStorer() {
	 var email = $("#defaultemail").val();
	 console.info(email);
	 localStorage.setItem('email', email);
	 alert(localStorage.getItem('email') + " saved as defualt reviewer email");
 }

 function sbValidateDefaults() {
	 var form = $("#sbDefaults");
	 form.validate({
		 rules:{
			 defaultemail:{
				 required: true,
				 emailthingy: true
			 }
		 },
		 messages:{
			 defaultemail: {
				 required: "Please enter a valid email before saving."
			 }
		 }
	 });
	 return form.valid();
 }

 function sbValidate_sbAddForm() {
 	var form = $("#sbAddForm");
 	form.validate({
		rules:{
			business:{
				required: true,
				rangelength: [2,20]
			},
			email:{
				required: true,
				email: true
			},
			reviewdate: {
				required: true
			},
			foodquality:{
				required: true,
				sbrangecheck: true
			},
			service:{
				required: true,
				sbrangecheck: true
			},
			valrating:{
				required: true,
				sbrangecheck: true
			}	 	        
	    },
	    messages:{
	    	business:{
	    		required: "Length must be 2-20 characters long",
	    		rangelength: "Length must be 2-20 characters long"
	    	},
	    	email:{
	    		required: "Please enter a valid email address.",
	    		email: "Please enter a valid email address."
	    	},
	    	reviewdate:{
	    		required: "Review date is required"
	    	},
	    	foodquality:{
	    		required: "Value must be between 0-5."
	    	},
	    	service:{
	    		required: "Value must be between 0-5."
	    	},
	    	valrating:{
	    		required: "Value must be between 0-5."
	    	}
	    }
    });
    return form.valid();
}

function sbValidate_sbEditForm() {
 	var form = $("#sbEditForm");
 	form.validate({
		rules:{
			business:{
				required: true,
				rangelength: [2,20]
			},
			email:{
				required: true,
				email: true
			},
			reviewdate: {
				required: true
			},
			editfoodquality:{
				required: true,
				sbrangecheck: true
			},
			editservice:{
				required: true,
				sbrangecheck: true
			},
			editvalrating:{
				required: true,
				sbrangecheck: true
			}	 	        
	    },
	    messages:{
	    	business:{
	    		required: "Length must be 2-20 characters long",
	    		rangelength: "Length must be 2-20 characters long"
	    	},
	    	email:{
	    		required: "Please enter a valid email address.",
	    		email: "Please enter a valid email address."
	    	},
	    	reviewdate:{
	    		required: "Review date is required"
	    	},
	    	editfoodquality:{
	    		required: "Value must be between 0-5."
	    	},
	    	editservice:{
	    		required: "Value must be between 0-5."
	    	},
	    	editvalrating:{
	    		required: "Value must be between 0-5."
	    	}
	    }
    });
    return form.valid();
}

jQuery.validator.addMethod("sbrangecheck",
    function (value, element) {
        if (value > -1 && value <6) {
        	return true;

        }
        return false;
    },
    "Value must be between 0-5.");

jQuery.validator.addMethod("emailthingy",
	function (value, element) {
		var regex = /.+\@.+\..+/;
		return this.optional(element) || regex.test(value);
	},
	"Please enter a valid email before saving.");