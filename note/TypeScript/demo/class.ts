class Site {
    age:number;
    constructor(age:number) {
        this.age = age
    }
    name():void {
        console.log("Runoob")
    }
}
var obj = new Site(12);
obj.name();
console.log(obj.age)
