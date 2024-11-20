function hasProperties(obj, array) {
    var result = {};
    function traverse(currentObj) {
        for (var key in currentObj) {
            if (array.includes(key)) {
                result[key] = true;
            }
            if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
                traverse(currentObj[key]);
            }
        }
    }
    traverse(obj);
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var key = array_1[_i];
        if (!(key in result)) {
            result[key] = false;
        }
    }
    return result;
}
var obj = {
    name: "hello",
    surname: "mello",
    inner: {
        outer: 5
    }
};
console.log(hasProperties(obj, ["name", "surname", "inner", "outer", "esim"]));
function deepEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }
    if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
        return false;
    }
    for (var key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            if (!(key in obj2)) {
                return false;
            }
            if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
                if (!deepEqual(obj1[key], obj2[key])) {
                    return false;
                }
            }
            else if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
    }
    for (var key in obj2) {
        if (obj2.hasOwnProperty(key) && !(key in obj1)) {
            return false;
        }
    }
    return true;
}
var obj1 = {
    name: "hello",
    surname: "mello",
    inner: {
        outer: 5
    }
};
var obj2 = {
    name: "hello",
    surname: "mello",
    inner: {
        outer: 5
    }
};
// console.log(deepEqual(obj1, obj2)); // true
function filterFalsyValues(array) {
    var res = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i]) {
            res.push(array[i]);
        }
    }
    return res;
}
function mapToBoolean(array) {
    return array.map(function (elem) { return !!elem; });
}
// console.log(mapToBoolean([0, "hello", "", NaN, 42, {}, []]));
