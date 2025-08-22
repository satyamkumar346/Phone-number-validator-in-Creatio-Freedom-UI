"validators": {
                        "LengthValidator": {
                            "type": Terrasoft.ViewModelValidatorTypes.CUSTOM,
                            "params": {
                                "validationFn": function (value) {
                                    if (value && value.length > 10) {
                                        return {
                                            invalidMessage: "Phone number must not exceed 10 characters."
                                        };
                                    }
                                    return null;
                                }
                            }
                        }
}
