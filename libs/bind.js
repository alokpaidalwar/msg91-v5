
function BindToClass(functionsObject, thisClass) {
    for (let [ functionKey, functionValue ] of Object.entries(functionsObject)) {
        thisClass[functionKey] = functionValue.bind(thisClass);
    }
}

module.exports = BindToClass;