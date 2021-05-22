class Player extends Block{
    constructor(x,y,w,h,world,type){
        super(x,y,w,h,world,type);
        this.keyUp=false;
        this.keyLeft=false;
        this.keyRight=false;
        this.canJump=true;
        this.max=5;
    }
    update(){
        if(this.keyLeft){
            let v=this.body.GetLinearVelocity();
            v.x-=1;
            if(v.x<-this.max)v.x=-this.max;
            this.body.SetLinearVelocity(v);
        }
        if(this.keyRight){
            let v=this.body.GetLinearVelocity();
            v.x+=1;
            if(v.x>this.max)v.x=this.max;
            this.body.SetLinearVelocity(v);
        }
        if(this.keyUp&&this.canJump){
            let v=this.body.GetLinearVelocity();
            v.y=-10;
            this.canJump=false;
            this.body.SetLinearVelocity(v);
        }
    }
}