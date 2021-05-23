var   b2Vec2 = Box2D.Common.Math.b2Vec2
         	,	b2BodyDef = Box2D.Dynamics.b2BodyDef
         	,	b2Body = Box2D.Dynamics.b2Body
         	,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
         	,	b2Fixture = Box2D.Dynamics.b2Fixture
         	,	b2World = Box2D.Dynamics.b2World
         	,	b2MassData = Box2D.Collision.Shapes.b2MassData
         	,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
         	,	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
         	,	b2DebugDraw = Box2D.Dynamics.b2DebugDraw
            ;
let b2DistanceJointDef=Box2D.Dynamics.Joints.b2DistanceJointDef;
let ContactListener=Box2D.Dynamics.b2ContactListener;

let canvas;
let context;

let w;
let h;
let world;
let scale;
let blokovi;
let player;
let mousedown;
let k=-0.05;
let pocetak={
    x:0,
    y:0
};
let trenutno={
    x:0,
    y:0
};


let camera={
    x:0,
    y:0,
    zoom:1
}

function load(){
    mousedown=false;
    scale=30;
    document.body.style.margin="0";
    canvas=document.getElementById("canvas");
    context=canvas.getContext("2d");
    w=800;
    h=500;
    canvas.width=w;
    canvas.height=h;

    document.body.addEventListener("mousedown",down);
    document.body.addEventListener("mousemove",move);
    document.body.addEventListener("mouseup",up);
    document.body.addEventListener("keypress",function(event){
        if(event.key=="a")camera.x+=3;
        if(event.key=="d")camera.x-=3;
        if(event.key=="w")camera.zoom+=0.03;
        if(event.key=="s")camera.zoom-=0.03;
    })
   
    world=new b2World(new b2Vec2(0,9.8));
    blokovi=[];
    blokovi.push(new Block(0,h-10,w,10,world,b2Body.b2_staticBody));
    
    postaviNivo(20);

    var debugDraw = new b2DebugDraw();
			debugDraw.SetSprite(context);
			debugDraw.SetDrawScale(scale);
			debugDraw.SetFillAlpha(0.3);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			world.SetDebugDraw(debugDraw);

    loop();
}

function loop(){
    requestAnimationFrame(loop);
    
    world.Step(1/60,10,10);

    context.fillStyle="#fff";
    context.fillRect(0,0,w,h);

   // world.DrawDebugData();

    if(mousedown){
        nacrtajPutanju();
    }
    context.scale(camera.zoom,camera.zoom);
    for(let i=0;i<blokovi.length;i++){
        blokovi[i].draw(context,camera);
    }
    context.scale(1/camera.zoom,1/camera.zoom);
}

function postaviNivo(n){
    let a=10;
    for(let i=n-1;i>=0;i--){
        for(let j=0;j<=i;j++){
            let x=j*2*a+(n-i)*a+300;
            let y=(h-n*a*2-10)+i*2*a;
            blokovi.push(new Block(x,y,a*0.9,a,world,b2Body.b2_dynamicBody));
        }
    }
}
function nacrtajPutanju(){
    let f=new b2Vec2(trenutno.x-pocetak.x,trenutno.y-pocetak.y);
    f.Multiply(k);

    for(let i=0;i<10;i++){
        let t=i*3;
        let novoX=pocetak.x+f.x*t;
        let novoY=pocetak.y+f.y*t-(-10/scale*t*t)/2;
        context.fillStyle="#000";
        context.beginPath();
        context.arc(novoX,novoY,3,0,Math.PI*2);
        context.closePath();
        context.fill();
    }
}

function down(event){
    pocetak={
        x:event.clientX,
        y:event.clientY
    };
    mousedown=true;
}
function move(event){
    trenutno.x=event.clientX;
    trenutno.y=event.clientY;
}
function up(event){
    mousedown=false;
    console.log("ee");
    let x=event.clientX;
    let y=event.clientY;
    let v=new b2Vec2(x-pocetak.x,y-pocetak.y);
    v.Multiply(k);
    blokovi.push(new Circle(pocetak.x,pocetak.y,10,world,b2Body.b2_dynamicBody));
    blokovi[blokovi.length-1].body.SetLinearVelocity(v);
}