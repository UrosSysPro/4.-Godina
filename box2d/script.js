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
let c;

function load(){
    scale=30;
    document.body.style.margin="0";
    canvas=document.getElementsByTagName("canvas")[0];
    context=canvas.getContext("2d");
    w=500;
    h=500;
    canvas.width=w;
    canvas.height=h;
    canvas.addEventListener("click",klik);
    document.body.addEventListener("keydown",keydown);
    document.body.addEventListener("keyup",keyup);

    world=new b2World(new b2Vec2(0,9.8));
    blokovi=[];
    blokovi.push(new Block(0,h-10,w,10,world,b2Body.b2_staticBody));
    
    for(let i=0;i<3;i++){
        y=h-i*100-50;
        x=Math.random()*(w-100);
        blokovi.push(new Block(x,y,50,5,world,b2Body.b2_staticBody));
    }
    
    
    // blokovi.push(new Block(0,h-10,w,10,world,b2Body.b2_staticBody));
    // blokovi.push(new Block(0,h-10,w,10,world,b2Body.b2_staticBody));
    player=new Player(w/2,h-40,10,10,world,b2Body.b2_dynamicBody);

    let listener=new ContactListener();
    listener.BeginContact=function(contact){
        let b1=contact.GetFixtureA().GetUserData();
        let b2=contact.GetFixtureB().GetUserData();
        if(b1==player||b2==player){
            player.canJump=true;
        }
    }
    listener.EndContact=function(contact){
        let b1=contact.GetFixtureA().GetUserData();
        let b2=contact.GetFixtureB().GetUserData();
        if(b1==player||b2==player){
            player.canJump=false;
            console.log("ee");
        }
    }
    world.SetContactListener(listener);
    var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(context);
	debugDraw.SetDrawScale(scale);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);
    
    // new Most(300,500,100,20,world);

    loop();
}

function loop(){
    requestAnimationFrame(loop);
    
    world.Step(1/60,10,10);
    player.update();
    world.DrawDebugData();
}
function klik(event){
    // console.log(event);
    // new PovezaniBlokovi(event.clientX,event.clientY,world);
    let x=event.clientX;
    let y=event.clientY;
    // blokovi.push(new Block(x,y,20,20,world,b2Body.b2_dynamicBody));
}

function keydown(event){
    // console.log(event);
    if(event.key=="ArrowUp")player.keyUp=true;
    if(event.key=="ArrowLeft")player.keyLeft=true;
    if(event.key=="ArrowRight")player.keyRight=true;
}
function keyup(event){
    if(event.key=="ArrowUp")player.keyUp=false;
    if(event.key=="ArrowLeft")player.keyLeft=false;
    if(event.key=="ArrowRight")player.keyRight=false;
}