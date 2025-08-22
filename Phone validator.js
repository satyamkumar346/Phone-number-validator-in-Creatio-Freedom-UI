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
