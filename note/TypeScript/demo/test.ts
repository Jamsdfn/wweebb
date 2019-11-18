function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");

enum Color {Red, Green, Blue}
let c: Color = Color.Blue

console.log(c)

interface IPerson {
    firstName:string,
    lastName:string,
    sayHi: ()=>string
}

var customer:IPerson = {
    firstName:"Tom",
    lastName:"Hanks",
    sayHi: ():string => "Hi there"
}

console.log("Customer 对象 ")
console.log(customer.firstName)
console.log(customer.lastName)
console.log(customer.sayHi())

var employee:IPerson = {
    firstName:"Jim",
    lastName:"Blakes",
    sayHi: ():string => "Hello!!!"
}

console.log("Employee  对象 ")
console.log(employee.firstName)
console.log(employee.lastName)

interface ILoan {
    interest:number
}

class AgriLoan implements ILoan {
    interest:number
    rebate:number

    constructor(interest:number,rebate:number) {
        this.interest = interest
        this.rebate = rebate
    }
}

var obj = new AgriLoan(10,1)
console.log("利润为 : "+obj.interest+"，抽成为 : "+obj.rebate )


function identity<T>(arg: T): T {
    return arg;
}

//let myIdentity: <T>(arg: T) => T = identity;

let antzone: (webName:string, age:number) => string=
    function(webName: string, age: number): string {
        return webName+"已经成立"+age+"年了";
    }
interface GenericIdentityFn {
    <T>(arg: T): T;
}


let myIdentity: GenericIdentityFn = identity;
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "14";
stringNumeric.add = function(x, y) { return x + y; };

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
loggingIdentity("sss")
