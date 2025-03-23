const Joi = require("joi");

exports.validateStudent = (data) => {
    const schema = Joi.object({
        id: Joi.number() // Allow id (optional for insert, required for update)
            .integer()
            .positive()
            .optional(),

        first_name: Joi.string()
            .regex(/^[A-Za-z\s]+$/)
            .max(255)
            .required()
            .messages({
                "string.pattern.base": "First name should contain only alphabets.",
            }),

        last_name: Joi.string()
            .regex(/^[A-Za-z\s]+$/)
            .max(255)
            .required()
            .messages({
                "string.pattern.base": "Last name should contain only alphabets.",
            }),

        email: Joi.string()
            .email()
            .max(100)
            .required(),

        phone_no: Joi.string()
            .pattern(/^\+?[1-9]\d{1,14}$/)
            .required()
            .messages({
                "string.pattern.base": "Phone number must be in a valid international format (e.g., +91XXXXXXXXXX).",
            }),

        dob: Joi.date()
            .max("now")
            .required()
            .messages({
                "date.max": "Date of birth cannot be in the future.",
            }),

        gender: Joi.string()
            .valid("Male", "Female", "Other")
            .required(),

        address: Joi.string()
            .max(500)
            .required(),

        city: Joi.string()
            .regex(/^[A-Za-z\s]+$/)
            .max(100)
            .required()
            .messages({
                "string.pattern.base": "City should contain only alphabets.",
            }),

        state: Joi.string()
            .max(100)
            .required(),

        pin_code: Joi.string()
            .pattern(/^\d{4,10}$/)
            .required()
            .messages({
                "string.pattern.base": "PIN/ZIP code must be between 4 to 10 digits.",
            }),

        country: Joi.string()
            .max(100)
            .required(),

        registration_date: Joi.date()
            .max("now")
            .required()
            .messages({
                "date.max": "Registration date cannot be in the future.",
            }),

        created_by: Joi.number()
            .integer()
            .positive()
            .required(),

        modified_by: Joi.number()
            .integer()
            .positive()
            .optional(),
    });

    return schema.validate(data);
};
