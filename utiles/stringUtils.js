
let testData = { one_One: "one", one_two: { two_one: "2_a", twoTwo: "tt" } };
const keySnakeToCamel = (target) => {
    let nextTraget = null;
    if (!target) return target;
    if (target instanceof Array) {
        return target.map(value => keySnakeToCamel(value));
    }
    else if (target instanceof Object) {
        let objectArray = Object.entries(target);
        return Object.fromEntries(objectArray.map(([key,value])=>[toCamelCase(key),keySnakeToCamel(value)]));
    }
    else return target;
}
const toCamelCase = (str)=>{
    return str.replace(/_([a-zA-Z])/g,(_,letter)=>letter.toUpperCase());
}

module.exports={keySnakeToCamel};