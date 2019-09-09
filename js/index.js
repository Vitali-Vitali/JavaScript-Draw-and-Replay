//initialization of canvas and variables
var canv = document.getElementById('canvas');
var ctx  = canv.getContext('2d') ;
var isMouseDown;
var coords = [];
var crd = [];

canv.width = window.innerWidth;
canv.height = window.innerHeight;

//grab a color, 'black' is default
var color = colorSelect();

//drawing a circle onclick
canv.addEventListener('click',function(e) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(e.clientX, e.clientY, 10 ,0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
});

canv.addEventListener('mousedown',function() {
    isMouseDown = true;
});

//does not drawing when mouseup and storing all coords
canv.addEventListener('mouseup', function() {
    isMouseDown = false;
    ctx.beginPath();
    coords.push('mouseIsUp');
});

ctx.lineWidth = 2*10;
//drawing lines between circles
canv.addEventListener('mousemove', function(e) {
    if(isMouseDown){
        coords.push([color, e.clientX, e.clientY]);
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, 10 ,0, Math.PI*2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
});

//selecting color, 'black' is default
function colorSelect(param){
    if (param === undefined){
        color = 'black';
        return color;
    }
    color = param;
    return color;
}

function save(){
    localStorage.setItem('coords', JSON.stringify(coords));
}

function clearCanvas(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canv.width,canv.height);
    ctx.beginPath();
    ctx.fillStyle = 'black';
}

function replay(){
    coords = JSON.parse(localStorage.getItem('coords'));
    clearCanvas();
    var timer = setInterval(function(){
        if(!coords.length){
            clearInterval(timer);
            return;
        }
        crd = coords.shift();
        var e = {clientX : crd["1"], clientY : crd["2"]};
        ctx.fillStyle = crd["0"];
        ctx.strokeStyle = crd["0"];
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, 10 ,0, Math.PI*2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }, 10)
}

//using "C,R,S" key codes to enable actions with keyboard
document.addEventListener('keydown', function(e) {
    if(e.keyCode == 67){
        clearCanvas();
    }
    if(e.keyCode == 82){
        replay();
    }
    if(e.keyCode == 83){
        save();
    }
});

//popup code to open and close
var modal = document.getElementById("modalWindow");
var span = document.getElementsByClassName("close")[0];

//showing modal window
window.onload = function() {
    modal.style.display = "block";
};

//when the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

//when the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

