/// <reference path = "IShape_1.ts" />
/// <reference path = "Circle_1.ts" />
/// <reference path = "Triangle_1.ts" />
function drawAllShapes(shape:Drawing.IShape) {
    shape.draw();
}
drawAllShapes(new Drawing.Circle());
drawAllShapes(new Drawing.Triangle());
