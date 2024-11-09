
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

type SchemaDefinition = {
    type: 'string' | 'number' | 'boolean' | 'object' | 'array';
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    itemType?: 'string' | 'number' | 'boolean';
};

type Schema = {
    [key: string]: SchemaDefinition;
};

function validateSchema(obj: any, schema: Schema): boolean {
    for (const key in schema) {
        const rule = schema[key];

        if (rule.required && !(key in obj)) {
            return false;
        }

        const value = obj[key];

        if (!(key in obj) && !rule.required) {
            continue;
        }

        if (rule.type === "string") {
            if (typeof value !== "string") {
                return false;
            }
            if (rule.minLength && value.length < rule.minLength) {
                return false;
            }
            if (rule.maxLength && value.length > rule.maxLength) {
                return false;
            }
        } else if (rule.type === "number") {
            if (typeof value !== "number") {
                return false;
            }
            if (rule.min !== undefined && value < rule.min) {
                return false;
            }
            if (rule.max !== undefined && value > rule.max) {
                return false;
            }
        } else if (rule.type === "boolean") {
            if (typeof value !== "boolean") {
                return false;
            }
        } else if (rule.type === "object") {
            if (typeof value !== "object" || value === null) {
                return false;
            }
        } else if (rule.type === "array") {
            if (!Array.isArray(value)) {
                return false;
            }
            if (rule.itemType) {
                for (const item of value) {
                    if (typeof item !== rule.itemType) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

const schema = {
    name: { type: "string", minLength: 2 },
    age: { type: "number", min: 18 },
    isActive: { type: "boolean" },
    tags: { type: "array", itemType: "string" },
};

const obj = { name: "Alice", age: 25, isActive: true, tags: ["admin", "user"] };

// console.log(validateSchema(obj, schema)); // true
