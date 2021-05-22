class PovezaniBlokovi{
    constructor(x,y,world){
        this.block1=new Circle(x,y+20,10,world,b2Body.b2_dynamicBody);
        this.block2=new Circle(x,y-20,10,world,b2Body.b2_dynamicBody);
        let def=new b2DistanceJointDef();
        def.bodyA=this.block1.body;
        def.bodyB=this.block2.body;
        def.length=1;
        def.frequencyHz=4;
        def.dampingRatio=0.5;
        world.CreateJoint(def);
        blokovi.push(this.block1);
        blokovi.push(this.block2);
    }
}