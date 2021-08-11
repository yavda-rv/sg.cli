const ajv = require("ajv");

/**
 * Types defined by schema
 */
const TYPES = {
    object: "object",
    string: "string",
    array: "array",
};

/** String type */
const TYP_STRING = { type: TYPES.string };

/**
 * String type array
 */
const TYP_STRING_ARR = { type: TYPES.array, items: TYP_STRING };

/** Function to create Object types in json schema pass properties only. All properties are required. */
const TYP_OBJ = (obj) => {
    return {
        type: TYPES.object,
        additionalProperties: false,
        required: Object.keys(obj),
        properties: obj
    }
}


function transform(errors) {
    if (!errors || errors.length == 0) {
        return []
    }
    return errors.map(err => {
        if(err.keyword == "additionalProperties")
            return `'${err.instancePath}' ${err.message}. Found: ${err.params.additionalProperty}`;

        return `'${err.instancePath}' ${err.message}.`;
    });
}

/**
 * verfiy json against the passed schema.
 * @param {*} schema 
 * @param {*} json 
 * @returns {{isValid: boolean, errors: string[]}}
 */
function verify(schema, json) {
    const validate = (new ajv()).compile(schema);
    const valid = validate(json);
    if (!valid) {
        return { isValid: false, errors: transform(validate.errors) };
    }
    return { isValid: true, errors: undefined };
}

module.exports = {
    TYP_OBJ,
    TYP_STRING,
    TYP_STRING_ARR,
    verify    
};