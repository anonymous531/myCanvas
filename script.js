window.onload = function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    var eraser = document.getElementById('eraser')
    var pencil = this.document.getElementById('pencil')
    var using = false
    var prePoint = { 'x': undefined, 'y': undefined }
    var radius = 5
    var eraserEnabled = false
    var color = document.getElementsByClassName('color')
    var paintingColor = 'black'
    var lineWidth = 10
    var arrLine = [20,10,5]
    var line = document.getElementsByClassName('line')
    var clear = document.getElementById('clear')
    var eraserBig = document.getElementById('big');
    var eraserSmall = document.getElementById('small')
    var eraserWidth = 20
    var eraserHeight = 20
    var save = document.getElementById('save')
    

    canvas.width = pageWidth
    canvas.height = pageHeight

    document.onmousedown = function (e) {
        x = e.clientX
        y = e.clientY
        prePoint = { 'x': x, 'y': y }
        using = true
        if(eraserEnabled){
            context.clearRect(x,y,eraserWidth,eraserHeight)
        }else{
            drawCircle(x,y,radius)
        }
    }
 
    document.onmousemove = function (e) {
        if (using) {
            var x = e.clientX
            var y = e.clientY
            var newPoint = {'x':x,'y':y}
            x1 = prePoint.x
            y1 = prePoint.y
            x2 = newPoint.x
            y2 = newPoint.y
            if(eraserEnabled){
                context.clearRect(x,y,eraserWidth,eraserHeight) 
            }else{
                drawCircle(x,y,radius)
                drawLine(x1,y1,x2,y2)
            }
            prePoint = newPoint
        }
    }
    document.onmouseup = function () {
        using = false
    }
    eraser.onclick = function(){
        eraserEnabled = true;
        eraser.classList.add('active')
        pencil.classList.remove('active')
        clear.classList.remove('active')
    }
    eraserBig.onclick = function(){
        eraserWidth = 20
        eraserHeight = 20
        console.log(eraserWidth)
        save.classList.remove('active')
    }
    eraserSmall.onclick = function(){
        eraserWidth = 10
        eraserHeight = 10
        console.log(eraserWidth)
    }
    pencil.onclick = function(){
        eraserEnabled = false
        pencil.classList.add('active')
        eraser.classList.remove('active')
        clear.classList.remove('active')
        save.classList.remove('active')
    }
    save.onclick = function(){
        save.classList.add('active')
        pencil.classList.remove('active')
        eraser.classList.remove('active')
        clear.classList.remove('active')
        var url = canvas.toDataURL("image/png");
        var a = document.createElement("a");
        document.body.appendChild(a)
        a.href = url;
        a.download = '我的画'
        a.target = '_blank'
        a.click()
    }
    clear.onclick = function(){
        context.clearRect(0,0,canvas.width,canvas.height)
    }
    for(var i=0;i<color.length;i++){
        color[i].onclick = function(){
            paintingColor = this.id;
        }
    }

    for(var i=0;i<line.length;i++){
        line[i].index = i;
    }
    for(var i=0;i<line.length;i++){
        line[i].onclick = function(e){
            lineWidth = arrLine[this.index];
            radius = arrLine[this.index]/2
        }
    }

    /*下面是功能函数*/

    function drawCircle(x,y,radius){
        context.beginPath();
        context.fillStyle = paintingColor;
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
    }
    function drawLine(x1,y1,x2,y2){
        context.beginPath();
        context.strokeStyle = paintingColor;
        context.moveTo(x1,y1);
        context.lineWidth = lineWidth;
        context.lineTo(x2,y2);
        context.stroke();
        context.closePath();
    }
}

