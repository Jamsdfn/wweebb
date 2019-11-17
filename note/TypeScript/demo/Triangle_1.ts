/// <reference path = "IShape_1.ts" />
namespace Drawing {
    export class Triangle implements IShape {
        public draw() {
            console.log("Triangle is drawn");
        }
    }
}
