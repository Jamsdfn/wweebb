var Site = /** @class */ (function () {
    function Site(age) {
        this.age = age;
    }
    Site.prototype.name = function () {
        console.log("Runoob");
    };
    return Site;
}());
var obj = new Site(12);
obj.name();
console.log(obj.age);
