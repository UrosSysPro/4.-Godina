class Quad{
    constructor(x,y,w,h){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;

        this.niz=[];
        this.podeljen=false;
        this.quads=[];
    }
    sadrziTacku(x,y){
        let sadrzi=true;
        if(x<this.x||x>this.x+this.w)sadrzi=false;
        if(y<this.y||y>this.y+this.h)sadrzi=false;
        return sadrzi;
    }
}
class Point{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}