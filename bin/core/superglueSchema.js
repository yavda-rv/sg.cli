const {TYP_OBJ, verify, TYP_STRING_ARR, TYP_STRING} = require("../lib/schema");

const schema = TYP_OBJ({
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

/**
 * 
 * @param {object} JSON object, read from superglue.json file
 */
function verifySchema(json) {
    return verify(schema, json);
}

module.exports = {
    verify: verifySchema
};