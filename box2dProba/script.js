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

let debugCanvas;
let debugContext;

let canvas;
let context;

let w;
let h;
let world;
let blokovi;
let scale;

let slika;

function load(){
    scale=30;
    w=500;
    h=500;
    debugCanvas=document.getElementById("debugCanvas");
    debugContext=debugCanvas.getContext("2d");
    debugCanvas.width=w;
    debugCanvas.height=h;
    debugCanvas.addEventListener("click",click);

    canvas=document.getElementById("canvas");
    context=canvas.getContext("2d");
    canvas.width=w;
    canvas.height=h;

    world=new b2World(new b2Vec2(0,9.8));
    blokovi=[];

    blokovi.push(new Block(w/2,10,w,20,b2Body.b2_staticBody,world));
    blokovi.push(new Block(10,h/2,20,h,b2Body.b2_staticBody,world));
    blokovi.push(new Block(w-10,h/2,20,h,b2Body.b2_staticBody,world));
    blokovi.push(new Block(w/2,h-10,w,20,b2Body.b2_staticBody,world));

    var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(debugContext);
	debugDraw.SetDrawScale(30);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);
    
    slika=new Image();
    slika.src="brick.png";
    loop();
}

function loop(){
    requestAnimationFrame(loop);
    world.Step(1/60,10,10);
    world.DrawDebugData();

    context.fillStyle="#fff";
    context.fillRect(0,0,w,h);

    for(let i=0;i<blokovi.length;i++){
        blokovi[i].draw(context);
    }
}

function click(event){
    let x=event.clientX;
    let y=event.clientY;
    blokovi.push(new Block(x,y,50,50,b2Body.b2_dynamicBody,world));
}