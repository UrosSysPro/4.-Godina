class QuadTree{
    constructor(w,h){
        this.root=new Quad(0,0,w,h);
        this.max=5;
    }
    add(quad,x,y){
        if(!quad.sadrziTacku(x,y))return;

        if(quad.podeljen){
            for(let i=0;i<4;i++){
                this.add(quad.quads[i],x,y);
            }
        }else{
            quad.niz.push(new Point(x,y));
            if(quad.niz.length>this.max)this.podeli(quad);
        }
    }
    podeli(quad){
        quad.podeljen=true;
        let x=quad.x;
        let y=quad.y;
        let w=quad.w;
        let h=quad.h;
        quad.quads.push(new Quad(x,y,w/2,h/2));
        quad.quads.push(new Quad(x+w/2,y,w/2,h/2));
        quad.quads.push(new Quad(x,y+h/2,w/2,h/2));
        quad.quads.push(new Quad(x+w/2,y+h/2,w/2,h/2));
        for(let i=0;i<quad.niz.length;i++){
            for(let j=0;j<4;j++){
                this.add(quad.quads[j],quad.niz[i].x,quad.niz[i].y);
            }
        }
    }
    draw(quad,context){
        if(quad.podeljen){
            for(let j=0;j<4;j++){
                this.draw(quad.quads[j],context);
            }
        }else{
            context.strokeRect(quad.x,quad.y,quad.w,quad.h);
            for(let i=0;i<quad.niz.length;i++){
                context.fillRect(quad.niz[i].x,quad.niz[i].y,3,3);
            }
        }
    }
    pretrazi(quad,x,y,w,h){
        let niz=[];
        if(x>quad.x+quad.w||x+w<quad.x)return niz;
        if(y>quad.y+quad.h||y+h<quad.y)return niz;

        if(quad.podeljen){
            for(let i=0;i<4;i++){
                niz=niz.concat(this.pretrazi(quad.quads[i],x,y,w,h));
            }
            return niz;
        }else{
            for(let i=0;i<quad.niz.length;i++){
                if(!(quad.niz[i].x>x&&quad.niz[i].x<x+w))continue;
                if(!(quad.niz[i].y>y&&quad.niz[i].y<y+h))continue;
                niz.push(quad.niz[i]);
            }
            return niz;
        }
    }
}