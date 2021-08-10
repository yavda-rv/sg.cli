const ajv = require("ajv");

const TYPES = {
    object: "object",
    string: "string",
    array: "array",
};

const TYP_STRING = { type: TYPES.string };
const TYP_STRING_ARR = { type: TYPES.array, items: TYP_STRING };
const TYP_OBJ = (obj) => {
    return {
        type: TYPES.object,
        additionalProperties: false,
        required: Object.keys(obj),
        properties: obj
    }
}

//schema starts from here.
const sgJson = TYP_OBJ({
    release: TYP_OBJ({
        preId: TYP_STRING,
        main: TYP_STRING,
        package: TYP_OBJ({
            include: TYP_STRING_ARR
        }),
        publish: TYP_OBJ({
            dir: TYP_STRING
        })
    })
});


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

function verify(json) {
    const validate = (new ajv()).compile(sgJson);
    const valid = validate(json);
    if (!valid) {
        console.log(validate.errors);
        return { isValid: false, errors: transform(validate.errors) };
    }
    return { isValid: true, errors: undefined };
}

module.exports = {
    verify    
};