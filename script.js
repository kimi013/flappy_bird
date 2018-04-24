/**
 * Canvas动画
 * 就是一遍一遍地画了擦，擦了画
 */

/**
 * 图片对象
 * @type {{bg: *, grass: *, title: *, bird0: *, bird1: *, upBird0: *, upBird1: *, downBird0: *, downBird1: *, startBtn: *, upPipe: *, downPipe: *, score0: *, score1: *, score2: *, score3: *, score4: *, score5: *, score6: *, score7: *, score8: *, score9: *, loadImgs: imgs.loadImgs}}
 */
var imgs = {
    bg: new Image(),              // 背景
    grass: new Image(),           // 草地
    title: new Image(),           // 标题
    bird0: new Image(),           // 平飞小鸟0
    bird1: new Image(),           // 平飞小鸟1
    upBird0: new Image(),         // 上飞小鸟0
    upBird1: new Image(),         // 上飞小鸟1
    downBird0: new Image(),       // 下飞小鸟0
    downBird1: new Image(),       // 下飞小鸟1
    startBtn: new Image(),        // 开始按钮
    upPipe: new Image(),          // 上方水管
    upMod: new Image(),           // 上方管体
    downPipe: new Image(),        // 下方水管
    downMod: new Image(),         // 下方管体
    score0: new Image(),          // 分数0
    score1: new Image(),          // 分数1
    score2: new Image(),          // 分数2
    score3: new Image(),          // 分数3
    score4: new Image(),          // 分数4
    score5: new Image(),          // 分数5
    score6: new Image(),          // 分数6
    score7: new Image(),          // 分数7
    score8: new Image(),          // 分数8
    score9: new Image(),          // 分数9

    /**
     * 加载图片
     * @param fn 图片加载完成后执行的函数
     */
    loadImgs: function (fn) {
        this.bg.src = './imgs/bg.jpg';
        this.grass.src = './imgs/banner.jpg';
        this.title.src = './imgs/head.jpg';
        this.bird0.src = './imgs/bird0.png';
        this.bird1.src = './imgs/bird1.png';
        this.upBird0.src = './imgs/up_bird0.png';
        this.upBird1.src = './imgs/up_bird1.png';
        this.downBird0.src = './imgs/down_bird0.png';
        this.downBird1.src = './imgs/down_bird1.png';
        this.startBtn.src = './imgs/start.jpg';
        this.upPipe.src = './imgs/up_pipe.png';
        this.upMod.src = './imgs/up_mod.png';
        this.downPipe.src = './imgs/down_pipe.png';
        this.downMod.src = './imgs/down_mod.png';
        this.score0.src = './imgs/0.jpg';
        this.score1.src = './imgs/1.jpg';
        this.score2.src = './imgs/2.jpg';
        this.score3.src = './imgs/3.jpg';
        this.score4.src = './imgs/4.jpg';
        this.score5.src = './imgs/5.jpg';
        this.score6.src = './imgs/6.jpg';
        this.score7.src = './imgs/7.jpg';
        this.score8.src = './imgs/8.jpg';
        this.score9.src = './imgs/9.jpg';

        var self = this;

        var timer = setInterval(function () {
            // complete属性表示图片加载完成
            if (self.bg.complete
                && self.grass.complete
                && self.title.complete
                && self.bird0.complete
                && self.bird1.complete
                && self.upBird0.complete
                && self.upBird1.complete
                && self.downBird0.complete
                && self.downBird1.complete
                && self.startBtn.complete
                && self.upPipe.complete
                && self.downPipe.complete
                && self.score0.complete
                && self.score1.complete
                && self.score2.complete
                && self.score3.complete
                && self.score4.complete
                && self.score5.complete
                && self.score6.complete
                && self.score7.complete
                && self.score8.complete
                && self.score9.complete) {

                // 删除定时器
                clearInterval(timer);
                // 执行函数
                fn();
            }
        }, 50);
    }
};

/**
 * 小鸟对象
 * @type {{bird: [*], upBird: [*], downBird: [*], posX: number, posY: number, speed: number, index: number, alive: boolean, draw: bird.draw, fly: bird.fly, waveWings: bird.waveWings, die: bird.die}}
 */
var bird = {
    bird: [             // 平飞
        imgs.bird0,
        imgs.bird1
    ],
    upBird: [           // 上飞
        imgs.upBird0,
        imgs.upBird1
    ],
    downBird: [
        imgs.downBird0,
        imgs.downBird1
    ],
    posX: 100,
    posY: 200,
    speed: 0,
    index: 0,           // 翅膀挥动，切换图片的索引
    alive: true,        // 存活状态

    /**
     * 绘制小鸟
     * @param bird
     */
    draw: function (bird) {
        ctx.drawImage(bird, this.posX, this.posY);
    },

    /**
     * 飞行
     */
    fly: function () {
        // 纵坐标随速度改变
        this.posY += this.speed;
        // 加速度为1
        this.speed++;

        // 如果坠地，死亡
        if (this.posY >= 395) {
            this.speed = 0;
            this.draw(this.bird[this.index]);
            this.die();
        }

        // 如果撞顶，弹回来
        if (this.posY <= 0) {
            this.speed = 6;
        }

        // 如果速度为正，则向下
        // 为负，则向上
        // 为0，则水平
        if (this.speed > 0) {
            this.draw(this.downBird[this.index]);
        } else if (this.speed < 0) {
            this.draw(this.upBird[this.index]);
        } else {
            this.draw(this.bird[this.index]);
        }

        // 确保坠落速度不会太快
        if (this.speed > 6) {
            this.speed = 6;
        }
    },

    /**
     * 挥动翅膀
     */
    waveWings: function () {
        this.index++;
        if (this.index > 1) {
            this.index = 0;
        }
    },

    /**
     * 死亡
     */
    die: function () {
        this.alive = false;
    }
};

/**
 * 水管类
 * @param upPipe
 * @param upMod
 * @param downPipe
 * @param downMod
 * @constructor
 */
function Pipe(upPipe, upMod, downPipe, downMod) {
    this.upPipe = upPipe;         // 上方水管
    this.upMod = upMod;           // 上方管体
    this.downPipe = downPipe;     // 下方水管
    this.downMod = downMod;       // 下方管体
    this.upHeight = Math.floor(Math.random() * 60);         // 随机生成上方水管高度
    this.downHeight = (60 - this.upHeight) * 3;             // 保证所有上下水管距离相同
    this.posX = 300;              // 横坐标
    this.upPosY = this.upHeight * 3 + this.upPipe.height;   // 上水管纵坐标
    this.downPosY = 362 - this.downHeight;                  // 下水管纵坐标
    this.hadSkipped = false;           // 是否被越过
    this.hadSkippedChange = false;     // 去重
}


/**
 * 绘制水管
 */
Pipe.prototype.drawPipes = function () {
    ctx.drawImage(this.upPipe, this.posX, this.upHeight * 3);
    ctx.drawImage(this.downPipe, this.posX, 362 - this.downHeight);
};


/**
 * 绘制管体
 */
Pipe.prototype.drawMods = function () {
    for (var i = 0; i < this.upHeight; i++) {
        ctx.drawImage(this.upMod, this.posX, i * 3);
    }

    for (var j = 0; j < this.downHeight; j++) {
        ctx.drawImage(this.downMod, this.posX, 362 - this.downHeight + this.downPipe.height + j);
    }
};


/**
 * 移动水管
 */
Pipe.prototype.move = function () {
    this.posX -= 6;
    this.drawMods();
    this.drawPipes();
};


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var canvasWidth = canvas.width,
    canvasHeight = canvas.height;

var v = 0;                // 草坪滚动的增量
var shake = true;         // 标题抖动的状态
var startTimer = null;    // 开始界面的计时器
var startTime = 0;        // 开始界面定时器运行的次数
var gameTimer = null;     // 游戏界面的计时器
var gameTime = 0;         // 游戏界面定时器运行的次数
var pipes = [];           // 存放水管
var index = 0;            // pipes的下标

var score = 0;            // 当前得分
var scoreImgs = [         // 分数图片
    imgs.score0,
    imgs.score1,
    imgs.score2,
    imgs.score3,
    imgs.score4,
    imgs.score5,
    imgs.score6,
    imgs.score7,
    imgs.score8,
    imgs.score9
];

// 绑定点击开始按钮事件
canvas.addEventListener('click', startBtnClick, false);

init();

/**
 * 初始化
 */
function init() {
    imgs.loadImgs(startLayer);
}


/**
 * 绘制背景
 */
function drawBg() {
    ctx.drawImage(imgs.bg, 0, 0);
}


/**
 * 绘制开始按钮
 */
function drawSTartBtn() {
    ctx.drawImage(imgs.startBtn, 130, 300);
}


/**
 * 绘制草坪
 */
function drawGrass() {
    // 每次运行横坐标向左移
    ctx.drawImage(imgs.grass, v * 3, 423);
    v--;
    ctx.drawImage(imgs.grass, 337 + v * 3, 423);
    v--;

    if (v * 3 < -343) {
        v = 0;
    }
}


/**
 * 标题抖动
 */
function titleShake() {
    if (shake) {
        ctx.drawImage(imgs.title, 53, 97);
        ctx.drawImage(imgs.bird0, 250, 137);
    } else {
        ctx.drawImage(imgs.title, 53, 103);
        ctx.drawImage(imgs.bird1, 250, 143);
    }
}


/**
 * 绘制当前得分
 */
function drawScore() {
    // 每绘制一位数，向右移23，绘制下一位数
    for (var i = 0, len = score.toString().length; i < len; i++) {
        ctx.drawImage(scoreImgs[parseInt(score.toString().substr(i, 1))],
            147 + i * 23, 40);
    }
}


/**
 * 清空画布
 */
function clean() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}


/**
 * 开始界面
 */
function startLayer() {
    startTimer = setInterval(function () {
        clean();
        drawBg();
        drawSTartBtn();
        drawGrass();
        titleShake();

        startTime++;
        // 定时器每运行7次改变标题和小鸟的位置
        if (startTime >= 7) {
            shake = !shake;
            startTime = 0;
        }
    }, 24);
}


/**
 * 游戏界面
 */
function gameLayer() {
    gameTimer = setInterval(function () {
        clean();
        drawBg();
        drawGrass();
        if (gameTime % 5 === 0) {
            if (gameTime === 50) {
                createPipes();
                gameTime = 0;
            }
            bird.waveWings();
        }
        gameTime++;

        for (var i = 0, len = pipes.length; i < len; i++) {
            pipes[i].move();
            isHit(pipes[i]);
            isSkipped(pipes[i]);
        }
        drawScore();
        bird.fly();
        // 如果小鸟死了
        if (!bird.alive) {
            // 游戏结束
            gameOver();
            // 重置数据
            reset();
        }
    }, 24);
}


/**
 * 创建水管
 */
function createPipes() {
    var pipe = new Pipe(imgs.upPipe, imgs.upMod, imgs.downPipe, imgs.downMod);
    // 添加进pipes中，如果已经有三个水管，则依次替换
    if (pipes.length < 3) {
        pipes.push(pipe);
    } else {
        pipes[index] = pipe;
        index++;
        if (index >= 3) {
            index = 0;
        }
    }
}


/**
 * 判断是否碰撞
 * @param oPipe
 */
function isHit(oPipe) {
    if (bird.posX + bird.bird[0].width > oPipe.posX
        && bird.posX < oPipe.posX + oPipe.downPipe.width) {
        if (bird.posY < oPipe.upPosY || bird.posY + 30 > oPipe.downPosY) {
            bird.die();
        }
    }
}


/**
 * 判断是否越过水管
 * @param oPipe
 */
function isSkipped(oPipe) {
    if (bird.posX > oPipe.posX + oPipe.downPipe.width) {
        // 水管以被超过
        oPipe.hadSkipped = true;
        // 确保水管只被越过一次
        if (!oPipe.hadSkippedChange && oPipe.hadSkipped) {
            // 分数加一
            score++;
            oPipe.hadSkippedChange = true;
        }
    }
}


/**
 * 键盘点击事件
 * @param e
 */
function kd(e) {
    if (e.keyCode === 32) {
        bird.speed = -10;
    }
}


/**
 * 触屏事件
 */
function ts() {
    bird.speed = -10;
}


/**
 * start按钮点击事件
 * @param e
 */
function startBtnClick(e) {
    // 判断点击位置
    if (e.clientX > canvas.offsetLeft + canvas.width / 2 - imgs.startBtn.width / 2
        && e.clientX < canvas.offsetLeft + canvas.width / 2 + imgs.startBtn.width / 2
        && e.clientY < canvas.offsetTop + 300 + imgs.startBtn.height
        && e.clientY > canvas.offsetTop + 300) {
        clean();
        // 清除开始界面定时器
        clearInterval(startTimer);
        gameLayer();
        // 添加响应事件
        window.addEventListener('keydown', kd, false);
        window.addEventListener('touchstart', ts, false);
        // 删除start按钮响应事件
        canvas.removeEventListener('click', startBtnClick, false);
    }
}


/**
 * 游戏结束
 */
function gameOver() {
    // 清除定时器
    clearInterval(gameTimer);
    // 清除窗口响应事件
    window.removeEventListener('keydown', kd, false);
    window.removeEventListener('touchstart', ts, false);
    // 绘制GAME OVER
    ctx.font = "50px blod";
    ctx.fontWeight = '1000';
    ctx.fillStyle = 'white';
    ctx.fillText('GAME OVER', 20, 200);
    drawSTartBtn();
}


/**
 * 重置数据
 */
function reset() {
    bird.posY = 200;
    bird.speed = 0;
    bird.alive = true;
    pipes = [];
    score = 0;
    canvas.addEventListener('click', startBtnClick, false);
}