let subject
let target
let Obstacles = []
let checker

function Start() {
    myGameArea.stop()
    myGameArea.start()
    Obstacles = []
    GenerateDimensions(50,50)
    subject = new component (40,40,"white","black", x, y)
    GenerateDimensions(50,50)
    target = new component (40,40,"red","black", x, y)
    CreateObstacles()
    Path()
}

function GenerateDimensions(width,height) {
    canvas = document.getElementById("myCanvas")
    x = Math.floor(Math.random() * (canvas.width - width))
    y = Math.floor(Math.random() * (canvas.height - height))
    while (x % 50 != 0) {
        x = Math.floor(Math.random() * (canvas.width - width))
    }
    while (y % 50 != 0) {
        y = Math.floor(Math.random() * (canvas.height - height))
    }
    return x, y
}

function CreateObstacles() {
    for (i = 0; i < 20; i ++) {
        confirm = 0
        while (confirm == 0) {
            GenerateDimensions(100,100)
            Obstacles[i] = new component (100,100,"black","black", x, y)
            if (Obstacles[i].objectCheck(subject) && Obstacles[i].objectCheck(target)) {
                confirm = 1
            }
        }
    }
}

let myGameArea = {
    canvas: document.getElementById("myCanvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 1000;
        this.context = this.canvas.getContext("2d")
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
        this.interval = setInterval(updateGameArea, 20)
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    stop : function() {
        clearInterval(this.interval)
    }
}

function updateGameArea() {
    subject.update()
    target.update()
    checker.update()

    for (i = 0; i < Obstacles.length; i ++) {
        Obstacles[i].update()
    }
}

function component(width, height, color, border, x, y) {
    this.width = width
    this.height = height
    this.speedX = 0
    this.speedY = 0
    this.x = x
    this.y = y
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.strokeStyle = border
        ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
    this.newPos = function() {
        this.x += this.speedX
        this.y += this.speedY
    }
    this.objectCheck = function(object) {
        let playerLeft = this.x
        let playerRight = this.x + (this.width)
        let playerTop = this.y
        let playerBottom = this.y + (this.height)
        let objectLeft = object.x
        let objectRight = object.x + (object.width)
        let objectTop = object.y
        let objectBottom = object.y + (object.height)
        collision = false
        if ((playerBottom < objectTop) ||
            (playerTop > objectBottom) ||
            (playerRight < objectLeft) ||
            (playerLeft > objectRight)) {
                collision = true
        }
        return collision
    }
}

function Path() {
    let coords = [
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
    ["_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_","_"],
]
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    checker = new component (25,25,"green","green", 12, 12)
    complete = 0
    num = 0
    console.log("E CHECK")
    for (c = 0; c < 20; c++) {
        for (r = 0; r < 20; r++) {
            checker.x = (r * 50) + 12
            checker.y = (c * 50) + 12
            for (i = 0; i < Obstacles.length; i++) {
                if (!checker.objectCheck(Obstacles[i])) {
                    coords[c][r] = "X"
                }
            }
            if (!checker.objectCheck(subject)) {
                coords[c][r] = "S"
                start = [c,r]
            }
            if (!checker.objectCheck(target)) {
                coords[c][r] = "E"
                end = [c,r]
            }
        }
    }
    console.log("E DONE",end)
    console.log(coords)
    console.log("Complete")
    queue = [[end[0],end[1],0]]
    startFound = 0
    foundcoord = []
    while (startFound == 0) {
        for (i = 0; i < queue.length; i++) {
            adjacent = [[queue[i][0]+1,queue[i][1],queue[i][2]+1], [queue[i][0]-1,queue[i][1],queue[i][2]+1], [queue[i][0],queue[i][1]+1,queue[i][2]+1], [queue[i][0],queue[i][1]-1,queue[i][2]+1]]
            for (y = 0; y < adjacent.length; y++) {
                if (adjacent[y][0] == 20 || adjacent[y][0] == -1 || adjacent[y][1] == -1 || adjacent[y][1] == 20) {
                    adjacent.splice(y,1)
                    console.log("remove")
                }
            }
            console.log("Adjacent:")
            console.log(adjacent)
            for (x = 0; x < adjacent.length; x++) {
                complete = 1
                for (z = 0; z < queue.length; z++) {
                    if ((adjacent[x][0] == queue[z][0]) && (adjacent[x][1] == queue[z][1])) {
                        complete = 0
                    }
                }
                if (coords[adjacent[x][0]][adjacent[x][1]] == "S") {
                    startFound = 1
                    console.log("FOUND")
                    foundcoord = adjacent[x]
                }
                else if (coords[adjacent[x][0]][adjacent[x][1]] == "_" && complete == 1) {
                    console.log("add")
                    queue.splice(-1,0,adjacent[x])
                }
            }
            if (startFound == 1) {
                break
            }
        }

    }

    console.log(queue)
    for (i = 0; i < queue.length; i++) {
        coords[queue[i][0]][queue[i][1]] = queue[i][2]
    }
    console.log(coords)
    current = foundcoord
    console.log(current[2])
    line = []
    num = 0
    while (current[2] > 0) {
        console.log("Checking: "+current)
        mark = new component (25,25, "blue", "blue", (current[1]*50)+7,(current[0]*50)+7)
        Obstacles.splice(-1,0,mark)
        adjacent = []
        for (i = 0; i < queue.length; i++) {
            if ((queue[i][0]+1 == current[0] && queue[i][1] == current[1]) || (queue[i][0]-1 == current[0] && queue[i][1] == current[1]) || (queue[i][0] == current[0] && queue[i][1]+1 == current[1]) || (queue[i][0] == current[0] && queue[i][1]-1 == current[1])) {
                adjacent.splice(0,0,queue[i])
                console.log("Adjacent Found")
            }
        }
        console.log(adjacent)
        console.log("Current: "+line)
        chosen = [0,0,10000000]
        for (i = 0; i < adjacent.length; i++) {
            if (adjacent[i][2] < chosen[2]) {
                chosen = adjacent[i]
            }
        }
        line.splice(0,0,chosen)
        console.log("Added: "+chosen)
        console.log("Current: "+line)
        current = line[0]
        num++
    }
}
