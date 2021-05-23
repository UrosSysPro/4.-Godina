class Block{
    constructor(x,y,w,h,world,type){
        this.w=w;
        this.h=h;

        let bodyDef=new b2BodyDef();
        bodyDef.type=type;
       
        bodyDef.position.x=x/scale;
        bodyDef.position.y=y/scale;

        let fixtureDef=new b2FixtureDef();
        fixtureDef.shape=new b2PolygonShape();
        fixtureDef.shape.SetAsBox(w/scale,h/scale);
        // fixtureDef.shape=new b2CircleShape();
        // fixtureDef.shape.setRadius(w);
        fixtureDef.density=1;
        fixtureDef.friction=0.3;
        fixtureDef.restitution = 0.1;

        this.body=world.CreateBody(bodyDef);
        this.fixture=this.body.CreateFixture(fixtureDef);
        this.fixture.SetUserData(this);
    }
    draw(context,camera){
        let x=this.body.GetPosition().x*scale;
        let y=this.body.GetPosition().y*scale;
        let a=this.body.GetAngle();

        context.translate(camera.x,camera.y);

        context.translate(x,y);
        context.rotate(a);

        context.fillStyle="#000";
        context.fillRect(-this.w,-this.h,this.w*2,this.h*2);

        context.rotate(-a);
        context.translate(-x,-y);

        context.translate(-camera.x,-camera.y);
    }
}

class Circle{
    constructor(x,y,r,world,type){
        this.r=r;

        let bodyDef=new b2BodyDef();
        bodyDef.type=type;
       
        bodyDef.position.x=x/scale;
        bodyDef.position.y=y/scale;

        let fixtureDef=new b2FixtureDef();
        // fixtureDef.shape=new b2PolygonShape();
        // fixtureDef.shape.SetAsBox(w/scale,h/scale);
        fixtureDef.shape=new b2CircleShape();
        fixtureDef.shape.SetRadius(r/scale);
        fixtureDef.density=10;
        fixtureDef.friction=0.5;
        fixtureDef.restitution = 0.2;

        this.body=world.CreateBody(bodyDef);
        this.fixture=this.body.CreateFixture(fixtureDef);
    }
    draw(context,camera){
        let x=this.body.GetPosition().x*scale;
        let y=this.body.GetPosition().y*scale;
        let a=this.body.GetAngle();

        context.translate(camera.x,camera.y);

        context.translate(x,y);
        context.rotate(a);

        context.fillStyle="#000";
        // context.fillRect(-this.w,-this.h,this.w*2,this.h*2);
        context.beginPath();
        context.arc(0,0,this.r,0,Math.PI*2);
        context.closePath();
        context.fill();

        context.rotate(-a);
        context.translate(-x,-y);

        context.translate(-camera.x,-camera.y);
    }
}