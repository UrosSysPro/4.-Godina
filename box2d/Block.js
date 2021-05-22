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
        fixtureDef.friction=0.2;
        fixtureDef.restitution = 0.2;

        this.body=world.CreateBody(bodyDef);
        this.fixture=this.body.CreateFixture(fixtureDef);
        this.fixture.SetUserData(this);
    }
    draw(context){

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
        fixtureDef.density=1;
        fixtureDef.friction=0.8;
        fixtureDef.restitution = 0.2;

        this.body=world.CreateBody(bodyDef);
        this.fixture=this.body.CreateFixture(fixtureDef);
    }
    draw(context){

    }
}