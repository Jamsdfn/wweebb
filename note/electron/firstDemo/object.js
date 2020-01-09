var oMap = document.querySelector(".map");
// console.log(window.innerHeight)
//食物
(function () {
    var elements = [];//存放小方块食物
    function Food(x, y, width, height, color) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || "green";
    };
    Food.prototype.init = function (map) {
        //先清空食物
        remove();
        var div = document.createElement("div");
        map.appendChild(div);
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.backgroundColor = this.color;

        div.style.position = "absolute";
        this.x = parseInt(Math.random() * map.offsetWidth / this.width) * this.width;
        this.y = parseInt(Math.random() * map.offsetHeight / this.height) * this.height;

        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';


        //把食物div放到elements中
        elements.push(div);
    }

    function remove() {
        //elements中有这个食物
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            //找到这个子元素的父级元素，然后删掉这个子元素
            ele.parentNode.removeChild(ele);
            //再次把elements中的子元素也删掉
            elements.splice(i, 1);

        }
    }



    //把Food暴露给window，外部可以使用
    window.Food = Food;
}());
//小蛇
(function () {
    var elements = [];//存放小蛇身体
    function Snake(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;

        this.body = [
            { x: 3, y: 2, color: "red" },
            { x: 2, y: 2, color: "orange" },
            { x: 1, y: 2, color: "orange" }
        ];


        this.direction = direction || "right";
    };
    Snake.prototype.init = function (map) {
        //删除旧蛇
        remove();
        for (var i = 0; i < this.body.length; i++) {
            var obj = this.body[i];
            var div = document.createElement("div");

            map.appendChild(div);
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            div.style.backgroundColor = obj.color;


            elements.push(div);
        }
    };


    Snake.prototype.move = function (food, map) {
        var i = this.body.length - 1;
        //蛇身移动
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //蛇头移动，改变方向
        switch (this.direction) {
            case "right": this.body[0].x += 1; break;
            case "left": this.body[0].x -= 1; break;
            case "top": this.body[0].y -= 1; break;
            case "bottom": this.body[0].y += 1; break;
        }
        var headX = this.body[0].x * this.width;
        var headY = this.body[0].y * this.height;
        if (headX == food.x && headY == food.y) {
            //把蛇最后复制一份
            var last = this.body[this.body.length - 1];
            //把复制好的蛇放到蛇身上
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            food.init(map);
        }


    }

    function remove() {
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            var ele = elements[i];
            //地图中删掉蛇
            ele.parentNode.removeChild(ele);
            //存放小蛇的数组中删掉蛇
            elements.splice(i, 1);
        }
    }

    window.Snake = Snake;



}());
//游戏开始
(function () {
    var that = null;
    function Game() {
        this.food = new Food();
        this.snake = new Snake();
        this.map = oMap;
        that = this;
    }

    Game.prototype.init = function () {
        this.food.init(this.map);
        this.snake.init(this.map);
        this.runSnake(this.food, this.map);
        this.bindKey();
    }

    Game.prototype.runSnake = function (food, map) {
        //setInterval 不能用this，因为this指向是windows，所以重新定义一个that
        //用bind改变this的指向
        var timeId = setInterval(function () {
            this.snake.move(food, map);
            this.snake.init(map);
            var maxX = map.offsetWidth / this.snake.width;
            var maxY = map.offsetHeight / this.snake.height;
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            if (headX < 0 || headX >= maxX) {
                clearInterval(timeId);
                alert("Game Over!");
            }
            if (headY < 0 || headY >= maxY) {
                clearInterval(timeId);
                alert("Game Over!");
            }
        }.bind(that), 150);
    }

    Game.prototype.bindKey = function () {
        //this是document对象，所以也要改this指向
        document.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case 37: this.snake.direction = "left"; break;
                case 38: this.snake.direction = "top"; break;
                case 39: this.snake.direction = "right"; break;
                case 40: this.snake.direction = "bottom"; break;
            }
        }.bind(that), false);
    }
    window.Game = Game;
}());

var gm = new Game();
gm.init();

