var stompClient = null;


function connect() {
    var socket = new SockJS('/stompendpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);

        stompClient.subscribe('/topic/JugarSala', function (data) {

            $.get("/salas/tablero", function (data) {
                console.log(data);
                var tablero = data[0];
                
                for (i = 0; i < tablero.length; i++) {
                    for (j = 0; j < tablero[i].length; j++) {
                        if (tablero[i][j] === "3") {
                            var myObstacle = new bloque(20, 20, "blue", j * 20, i * 20);
                            myObstacle.update();

                        } else if (tablero[i][j] === "1") {
                            var myObstacle = new circle(3, 20, 20, "white", (j * 20) + 10, (i * 20) + 10);
                            myObstacle.update();

                        } else if (tablero[i][j] === "2") {
                            var myObstacle = new circle(5, 20, 20, "white", (j * 20) + 10, (i * 20) + 10);
                            myObstacle.update();

                        } else if (tablero[i][j] === "A") {
                            console.log(tablero[i][j]);
                            console.log(tablero[i][j] === "A");
                            var myObstacle = new pacman(20, 20, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pacman.svg/2000px-Pacman.svg.png", j * 20, i * 20, "image");
                            jugadorpacman = myObstacle;
                            myObstacle.update();
                        } else if (tablero[i][j] === "B") {
                            var myObstacle = new pacman(20, 20, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pacman.svg/2000px-Pacman.svg.png", j * 20, i * 20, "image");
                            myObstacle.update();
                        } else if (tablero[i][j] === "C") {
                            var myObstacle = new pacman(20, 20, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pacman.svg/2000px-Pacman.svg.png", j * 20, i * 20, "image");
                            myObstacle.update();
                        } else if (tablero[i][j] === "D") {
                            var myObstacle = new pacman(20, 20, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pacman.svg/2000px-Pacman.svg.png", j * 20, i * 20, "image");
                            myObstacle.update();
                        } else if (tablero[i][j] === "a") {
                            var myObstacle = new ghost(20, 20, "https://static.giantbomb.com/uploads/scale_small/8/87790/2469743-orange.png", j * 20, i * 20, "image");
                            jugadorfantasma = myObstacle;
                            myObstacle.update();
                        } else if (tablero[i][j] === "b") {
                            var myObstacle = new ghost(20, 20, "https://static.giantbomb.com/uploads/scale_small/8/87790/2469743-orange.png", j * 20, i * 20, "image");
                            myObstacle.update();
                        } else if (tablero[i][j] === "c") {
                            var myObstacle = new ghost(20, 20, "https://static.giantbomb.com/uploads/scale_small/8/87790/2469743-orange.png", j * 20, i * 20, "image");
                            myObstacle.update();
                        } else if (tablero[i][j] === "d") {
                            var myObstacle = new ghost(20, 20, "https://static.giantbomb.com/uploads/scale_small/8/87790/2469743-orange.png", j * 20, i * 20, "image");
                            myObstacle.update();
                        }




                    }
                }
            }
            );
        });
        stompClient.subscribe('/topic/actualizarJuego', function (data) {

            console.log("hooooooooooooooooo");
            console.log(data);
            var tablero = JSON.parse(data.body);
            globall=data;
            console.log(globall);
            for (i = 0; i < tablero.length; i++) {
                if (tablero[i].key ==="B"){
                    console.log("holaa33sdsadsa");
                    var myObstacle = new pacman(20,20, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pacman.svg/2000px-Pacman.svg.png",20*tablero[i].y,20*tablero[i].x, "image");
                    myposx = tablero[i].x;
                    myposy = tablero[i].y;
                    myObstacle.update();
                }
                else if (tablero[i].key ==="b"){
                    var myObstacle = new ghost(20,20, "https://static.giantbomb.com/uploads/scale_small/8/87790/2469743-orange.png",20*tablero[i].y,20*tablero[i].x, "image");
                    myposx = tablero[i].x;
                    myposy = tablero[i].y;
                    myObstacle.update();
                }
                else if (tablero[i].key ==="0"){
                    var myObstacle = new bloque(20, 20, "black",20*tablero[i].y, 20*tablero[i].x);
                    myObstacle.update();
                }
                else if (tablero[i].key ==="1"){
                    var myObstacle = new bloque(20, 20, "black",20*tablero[i].y, 20*tablero[i].x);
                    myObstacle.update();
                    var myObstacle = new circle(3, 20, 20, "white", (20*tablero[i].y) + 10, (20*tablero[i].x) + 10);
                    myObstacle.update();
                    
                }
            }

        });


    });
}


function ghost(width, height, color, x, y, type) {
    this.type = type;
    if (type === "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        //var canvas = document.getElementById('cnv');
        //var ctx = canvas.getContext('2d');
        if (type === "image") {
            ctx.drawImage(this.image,
                    this.x,
                    this.y,
                    this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashRight = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crashleft = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crashleft = false;
        }
        return crashleft;
    }
}



function pacman(width, height, color, x, y, type) {
    this.type = type;
    if (type === "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        //var canvas = document.getElementById('cnv');
        //var ctx = canvas.getContext('2d');
        if (type === "image") {
            ctx.drawImage(this.image,
                    this.x,
                    this.y,
                    this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashRight = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crashleft = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crashleft = false;
        }
        return crashleft;
    }
}

function isUpperCase(str) {
    return str === str.toUpperCase();
}



function bloque(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        //var canvas = document.getElementById('cnv');
        //var ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);



    }
    this.crashRight = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crashleft = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crashleft = false;
        }
        return crashleft;
    }
}

function circle(radio, width, height, color, x, y) {
    this.radio = radio;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function () {

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, radio, 0, 2 * Math.PI);
        ctx.fill();



    }
    this.crashRight = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crashleft = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crashleft = false;
        }
        return crashleft;
    }
}









function create() {

    stompClient.send("/app/JugarSala", {});

}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    //setConnected(false);
    console.log("Disconnected");
}

function controlarpacman() {
    myplayer = "B";
    myposx = 1;
    myposy = 1;
}


function controlarfantasma() {
    myplayer = "b";
    myposx = 1;
    myposy = 34;
}

function moverPersonaje(key) {
    if (36 < key && key < 41) {
        stompClient.send("/app/mover",{}, JSON.stringify( {x: myposx, y: myposy, k: key}));
    }

}

$(document).ready(
        function () {
            console.info('loading script!...');
            connect();
            canvas = document.getElementById('cnv');
            ctx = canvas.getContext('2d');

            window.addEventListener('keydown', function (e) {
                key = e.keyCode;
                moverPersonaje(key);
                console.log(key);
            })
            window.addEventListener('keyup', function (e) {
                key = false;
            })

        }
);










