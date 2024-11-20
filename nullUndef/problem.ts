const isObject = (value:unknown):value is object => {
    return typeof value === 'object'
    && value !== null
    && !Array.isArray(value)
    && !(value instanceof RegExp)
    && !(value instanceof Date)
    && !(value instanceof Set)
    && !(value instanceof Map)
  }


function checkPrototypeChain(obj: object): number {
    let depth = 0;
    let currentObj = Object.getPrototypeOf(obj);
  
    while (currentObj !== null) {
      depth++;
      currentObj = Object.getPrototypeOf(currentObj);
    }
  
    return depth;
}
type IObj = {
    countElem:number,
    countUndef: number,
    countNull: number,
    countMissSpace: number

}
//   console.log(checkPrototypeChain(exampleObj)); 
function analyzeSparseArray(arr: any[]):IObj{
    const obj:IObj = {
        countElem: 0,
        countNull: 0,
        countUndef: 0,
        countMissSpace: 0
    }
    let  i = 0
    for (; i < arr.length; i++) {
        console.log(i, arr[i]);
        
        if (arr[i] === null) {
            obj.countNull++;
        }
        if (arr[i] === undefined) {
            if (arr.hasOwnProperty(i)) {
                obj.countUndef++;
            } else {
                obj.countMissSpace++;
            }
        }
    }
    obj.countElem = i - obj.countMissSpace;
    return obj;
}


// console.log(analyzeSparseArray([1,2,,3,,,,, undefined,undefined, null]));



function testJSONSerialization(obj: object):string {
    return JSON.stringify(obj, (key, value) => value === undefined ? null : value);
}
// console.log(testJSONSerialization({name: undefined, b: {name: undefined}}));

function deepDiffChecker(obj1: any, obj2: any, path: string = ''): void {
    if (typeof obj1 === 'object' && obj1 !== null && typeof obj2 === 'object' && obj2 !== null) {
        for (let key in obj1) {
            const newPath = path ? `${path}.${key}` : key;
            if (!(key in obj2)) {
                console.log(`Property missing in obj2: ${newPath}`);
            } else {
                deepDiffChecker(obj1[key], obj2[key], newPath);
            }
        }

        for (let key in obj2) {
            const newPath = path ? `${path}.${key}` : key;
            if (!(key in obj1)) {
                console.log(`Property missing in obj1: ${newPath}`);
            }
        }
    } else {
        if (obj1 === null && obj2 === undefined) {
            console.log(`Not same null and undefined at: ${path}`);
        } else if (obj1 === undefined && obj2 === null) {
            console.log(`Not same undefined and null at: ${path}`);
        } else if (obj1 !== obj2) {
            console.log(`Mismatch at ${path}: ${obj1} !== ${obj2}`);
        }
    }
}

const obj1 = {
    a: 1,
    b: null,
    c: { d: 2, e: undefined },
    f: { g: { h: 3 } }
};

const obj2 = {
    a: 1,
    b: undefined,
    c: { d: 2, e: 3 },
    f: { g: { h: 4 } }
};

// deepDiffChecker(obj1, obj2);

// function deepDiffChecker(obj1: object, obj2: object): void {

//     for (const key in obj1) {
//         if (!obj2.hasOwnProperty(key)) {
//             console.log(`obj2 dont have ${key} propery which is in obj1`);
//             continue;
//         }
//         if (obj1[key] === null && obj2[key] === undefined) {
//             console.log(`Property is null in obj1 but undefined in obj2`);
//             continue
//           } else if (obj1[key] === undefined && obj2[key] === null) {
//             console.log(`Property is undefined in obj1 but null in obj2`);
//             continue
//           }
//         if (isObject(obj1[key]) && isObject(obj2[key])) {
//             deepDiffChecker(obj1[key], obj2[key]);
//         }
//     }
//     for (const key in obj2) {
//         if (!obj1.hasOwnProperty(key)) {
//             console.log(`obj2 dont have ${key} propery`);
//         }
//     }

// }


function Node(value, )