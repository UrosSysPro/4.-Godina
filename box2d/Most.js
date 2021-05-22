class Most{
    constructor(x1,x2,y,n,world){
        this.krugovi=[];
        for(let i=0;i<n;i++){
            let x=x1*i/(n-1)+(1-i/(n-1))*x2;
            console.log(x);
            this.krugovi.push(new Circle(x,y,10,world,b2Body.b2_dynamicBody));
        }
        for(let i=0;i<n-1;i++){
            let def=new b2DistanceJointDef();
            def.bodyA=this.krugovi[i].body;
            def.bodyB=this.krugovi[i+1].body;
            def.length=1;
            def.frequencyHz=4;
            def.dampingRatio=0.5;
            world.CreateJoint(def);
        }

    }
}