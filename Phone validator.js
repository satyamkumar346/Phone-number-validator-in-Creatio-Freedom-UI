//Handler------------
{
			    request: "crt.HandleViewModelAttributeChangeRequest",
			    handler: async (request, next) => {
			
			        if (request.attributeName === "LeadDS_UifBorrowerCellNumber_2ogqa3k") {
			
			            const phone = await request.$context.LeadDS_UifBorrowerCellNumber_2ogqa3k;
			            if (!phone) {
			                return next?.handle(request);
			            }
			
			            const value = phone.toString().trim();
			            console.log("Phone Change Triggered --> ", value);
			
			            // If contains any alphabet or non-digit → block immediately
			            const hasNonDigit = /[^0-9]/.test(value);
			            if (hasNonDigit) {
			
			                request.$context.LeadDS_UifBorrowerCellNumber_2ogqa3k = null;
			
			                request.$context.executeRequest({
			                    type: "crt.ShowDialogRequest",
			                    $context: request.$context,
			                    dialogConfig: {
			                        data: {
			                            message: phone + " - Phone number must contain digits only",
			                            actions: [{
			                                key: "OK",
			                                config: { color: "primary", caption: "OK" }
			                            }]
			                        }
			                    }
			                });
			
			                return next?.handle(request);
			            }
			
			            //Do not validate until 10 digits entered
			            if (value.length < 10) {
			                return next?.handle(request);
			            }
			
			            // Final 10-digit validation
			            const isValid = /^[0-9]{10}$/.test(value);
			            if (!isValid) {
			
			                request.$context.LeadDS_MobilePhone_tmwm16h = null;
			
			                request.$context.executeRequest({
			                    type: "crt.ShowDialogRequest",
			                    $context: request.$context,
			                    dialogConfig: {
			                        data: {
			                            message: phone + " - Enter a valid 10-digit mobile number",
			                            actions: [{
			                                key: "OK",
			                                config: { color: "primary", caption: "OK" }
			                            }]
			                        }
			                    }
			                });
			            }
			        }
			
			        return next?.handle(request);
			    }
			}




"validators": {
    "PhoneNumberValidator": {
        "type": Terrasoft.ViewModelValidatorTypes.CUSTOM,
        "params": {
            "validationFn": function(value) {
                // If empty - return message (optional, remove if not required)
                if (!value) {
                    return {
                        invalidMessage: "Phone number is required."
                    };
                }

                // Remove spaces/dashes for validation
                var cleanedValue = value.replace(/[\s-]/g, "");

                // Must be only digits
                if (!/^\d+$/.test(cleanedValue)) {
                    return {
                        invalidMessage: "Phone number must contain only digits."
                    };
                }

                // Must be exactly 10 digits
                if (cleanedValue.length !== 10) {
                    return {
                        invalidMessage: "Phone number must be exactly 10 digits."
                    };
                }

                return null; // Passed
            }
        }
    }
}
