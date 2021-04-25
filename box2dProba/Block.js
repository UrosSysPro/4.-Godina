class Block{
    constructor(x,y,w,h,type,world){
        this.w=w;
        this.h=h;

        let bodyDef=new b2BodyDef();
        bodyDef.position.x=x/scale;
        bodyDef.position.y=y/scale;
        bodyDef.type=type;

        let fixtureDef=new b2FixtureDef();
        fixtureDef.shape = new b2PolygonShape();
        fixtureDef.shape.SetAsBox(w/2/scale,h/2/scale);
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;

        this.body=world.CreateBody(bodyDef);
        this.fixture=this.body.CreateFixture(fixtureDef);
    }

    draw(context){
        let ugao=this.body.GetAngle();
        let x=this.body.GetPosition().x*scale;
        let y=this.body.GetPosition().y*scale;
        context.fillStyle="crimson";
        context.translate(x,y);
        context.rotate(ugao);

        // context.fillRect(-this.w/2,-this.h/2,this.w,this.h);
        context.drawImage(slika,-this.w/2,-this.h/2,this.w,this.h);

        context.rotate(-ugao);
        context.translate(-x,-y);
    }
}