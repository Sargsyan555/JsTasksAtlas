"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isObject = function (value) {
    return typeof value === 'object'
        && value !== null
        && !Array.isArray(value)
        && !(value instanceof RegExp)
        && !(value instanceof Date)
        && !(value instanceof Set)
        && !(value instanceof Map);
};
// console.log(depthOfNull(testObj));
function checkPrototypeChain(obj) {
    var depth = 0;
    var currentObj = Object.getPrototypeOf(obj);
    while (currentObj !== null) {
        depth++;
        currentObj = Object.getPrototypeOf(currentObj);
    }
    return depth;
}
//   console.log(checkPrototypeChain(exampleObj)); 
function analyzeSparseArray(arr) {
    var obj = {
        countElem: 0,
        countNull: 0,
        countUndef: 0,
        countMissSpace: 0
    };
    var i = 0;
    for (; i < arr.length; i++) {
        console.log(i, arr[i]);
        if (arr[i] === null) {
            obj.countNull++;
        }
        if (arr[i] === undefined) {
            if (arr.hasOwnProperty(i)) {
                obj.countUndef++;
            }
            else {
                obj.countMissSpace++;
            }
        }
    }
    obj.countElem = i - obj.countMissSpace;
    return obj;
}
// console.log(analyzeSparseArray([1,2,,3,,,,, undefined,undefined, null]));
function traverse(obj) {
}
function testJSONSerialization(obj) {
    return JSON.stringify(obj, function (key, value) { return value === undefined ? null : value; });
}
console.log(testJSONSerialization({ name: undefined, b: { name: undefined } }));
function deepDiffChecker(obj1, obj2) {
    for (var key in obj1) {
        if (!obj2.hasOwnProperty(key)) {
            console.log("obj2 dont have ".concat(key, " propery which is in obj1"));
            continue;
        }
        if (obj1[key] === null && obj2[key] === undefined) {
            console.log("Property is null in obj1 but undefined in obj2");
            continue;
        }
        else if (obj1[key] === undefined && obj2[key] === null) {
            console.log("Property is undefined in obj1 but null in obj2");
            continue;
        }
        if (isObject(obj1[key]) && isObject(obj2[key])) {
            deepDiffChecker(obj1[key], obj2[key]);
        }
    }
    for (var key in obj2) {
        if (!obj1.hasOwnProperty(key)) {
            console.log("obj2 dont have ".concat(key, " propery"));
        }
    }
}
var object1 = {
    a: 5,
    b: null,
    c: {
        d: 4
    }
};
var object2 = {
    a: 5,
    b: undefined,
    c: {
        e: 10
    }
};
deepDiffChecker(object1, object2);
