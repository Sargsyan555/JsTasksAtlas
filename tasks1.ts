
type Result = { [key: string]: boolean };

function hasProperties(obj: object, array: string[]): Result {
    const result: Result = {};  
        function traverse(currentObj: any): void {
        for (const key in currentObj) {
            if (array.includes(key)) {
                result[key] = true;
            }
            if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
                traverse(currentObj[key]);
            }
        }
    }
    traverse(obj);
        for (const key of array) {
        if (!(key in result)) {
            result[key] = false;
        }
    }

    return result;
}

// const obj = {
//     name: "hello",
//     surname: "mello",
//     inner: {
//         outer: 5
//     }
// };

// console.log(hasProperties(obj, ["name", "surname", "inner", "outer", "esim"]));





function deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) {
        return true;
    }

    if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
        return false;
    }

    for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            if (!(key in obj2)) {
                return false;
            }
            if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
                if (!deepEqual(obj1[key], obj2[key])) {
                    return false;
                }
            } else if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
    }

    for (const key in obj2) {
        if (obj2.hasOwnProperty(key) && !(key in obj1)) {
            return false;
        }
    }

    return true;
}

const obj1 = {
    name: "hello",
    surname: "mello",
    inner: {
        outer: 5
    }
};

const obj2 = {
    name: "hello",
    surname: "mello",
    inner: {
        outer: 5
    }
};

// console.log(deepEqual(obj1, obj2)); // true
function filterFalsyValues(array: any[]):any[] {
    const res:any[] = [];
    for (let i = 0; i < array.length; i++) {
        if(array[i]){
            res.push(array[i])
        }
    }
    return res;
}

function mapToBoolean(array:any[]){
    return array.map(elem => !!elem);
}
// console.log(mapToBoolean([0, "hello", "", NaN, 42, {}, []]));

