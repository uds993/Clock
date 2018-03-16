var canvas,ctx,rad;

function init()
{
   canvas = document.querySelector("#myCanvas");
   ctx = canvas.getContext("2d");
   rad = canvas.height/2;
   ctx.translate(rad,rad);
    rad =rad * 0.90;
    //drawClock();
    setInterval(drawClock,1000);
}

function drawClock()
{
    drawFace(rad,ctx);
    drawNumbers(rad,ctx);
    drawTime(rad,ctx);
}

function drawFace( rad , ctx){
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, rad, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,rad*0.95, 0,0,rad*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = rad*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, rad*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(rad , ctx)
{
    var ang;
    var num;
    ctx.font = rad*0.15 +"px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for(num=1;num<13;num++)
        {
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -rad*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, rad*0.85);
    ctx.rotate(-ang); 
        }
}
function drawTime(rad,ctx)
{
    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    
    hour = hour%12;
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minutes*Math.PI/(6*60))+
    (seconds*Math.PI/(360*60));
    
    minutes=(minutes*Math.PI/30)+(seconds*Math.PI/(30*60));
    
     seconds=(seconds*Math.PI/30);
    
    
    drawHands(ctx, hour, rad*0.5, rad*0.07);
    drawHands(ctx, minutes, rad*0.7, rad*0.07);
    drawHands(ctx, seconds, rad*0.9, rad*0.02);
    
    
}

function drawHands(ctx,pos,length,width)
{
    ctx.beginPath();
    ctx.lineWidth= width;
    ctx.lineCap= "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0,-length);
    ctx.stroke();
    ctx.rotate(-pos);
}

init();