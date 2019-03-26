window.onload = function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
   
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
    var clearRadius = 10
    var save = document.getElementById('save')
    
    /*设置canvas大小，包括监听window改变大小*/
    autoSetCanvasSize()

    formatCanvas()
    
    canvas.ontouchstart = function(e){
        var x = e.touches[0].clientX
        var y = e.touches[0].clientY
        prePoint = { 'x': x, 'y': y }
        using = true
        if(eraserEnabled){
            clearCircle(x,y,clearRadius)
        }else{
            drawCircle(x,y,radius)
        }
    }
    canvas.ontouchmove = function(e){
        if (using) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            var newPoint = {'x':x,'y':y}
            x1 = prePoint.x
            y1 = prePoint.y
            x2 = newPoint.x
            y2 = newPoint.y
            if(eraserEnabled){
                clearCircle(x,y,clearRadius) 
            }else{
                drawCircle(x,y,radius)
                drawLine(x1,y1,x2,y2)
            }
            prePoint = newPoint
        }
    }
    canvas.ontouchend = function(){
        using = false
    }
    
    /*mouse事件*/
    canvas.onmousedown = function (e) {
        var x = e.clientX
        var y = e.clientY
        prePoint = { 'x': x, 'y': y }
        using = true
        if(eraserEnabled){
            clearCircle(x,y,clearRadius)
        }else{
            drawCircle(x,y,radius)
        }
    }
    canvas.onmousemove = function (e) {
        if (using) {
            var x = e.clientX
            var y = e.clientY
            var newPoint = {'x':x,'y':y}
            x1 = prePoint.x
            y1 = prePoint.y
            x2 = newPoint.x
            y2 = newPoint.y
            if(eraserEnabled){
                clearCircle(x,y,clearRadius) 
            }else{
                drawCircle(x,y,radius)
                drawLine(x1,y1,x2,y2)
            }
            prePoint = newPoint
        }
    }
    canvas.onmouseup = function () {
        using = false
    }

    /*设置*/
    useEraser()
    usePencil()
    savePic() 
    clearPic()

   
    /*下面是功能函数*/
    function setCanvasSize(){
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
    function autoSetCanvasSize(){
        setCanvasSize()
        window.onresize = function(){
            setCanvasSize()
        }
    }
    function formatCanvas(){
        context.fillStyle = '#fafafa';
        context.fillRect(0,0,canvas.width,canvas.height); 
    }
    function useEraser(){
        eraser.onclick = function(){
            eraserEnabled = true;
            eraser.classList.add('active')
            pencil.classList.remove('active')
            clear.classList.remove('active')
        }
        eraserBig.onclick = function(){
            clearRadius = 10
        }
        eraserSmall.onclick = function(){
            clearRadius = 5
        }
    }
   
    function usePencil(){
        pencil.onclick = function(){
            eraserEnabled = false
            pencil.classList.add('active')
            eraser.classList.remove('active')
            clear.classList.remove('active')
            save.classList.remove('active')
        }
        setLineWidth()
        setColor()
   }
   function savePic(){
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
    }
    function clearPic(){
        clear.onclick = function(){
            context.clearRect(0,0,canvas.width,canvas.height)
            formatCanvas()
        }
    }
    function setColor(){
        for(var i=0;i<color.length;i++){
            color[i].onclick = function(){
                paintingColor = this.id;
            }
        }
    }
    function setLineWidth(){
        for(var i=0;i<line.length;i++){
            line[i].index = i;
        }
        for(var i=0;i<line.length;i++){
            line[i].onclick = function(){
                lineWidth = arrLine[this.index];
                radius = arrLine[this.index]/2
            }
        }
    }
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
    function clearCircle(x,y,clearRadius){
        context.beginPath();
        context.fillStyle = '#fafafa';
        context.arc(x, y, clearRadius, 0, Math.PI * 2);
        context.fill();
    }
}

