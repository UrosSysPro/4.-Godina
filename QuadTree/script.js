let canvas;
let context;
let w;
let h;
let tree;

function load(){
    canvas=document.getElementsByTagName("canvas")[0];
    context=canvas.getContext("2d");
    w=500;
    h=500;
    document.body.style.margin="0";
    canvas.width=w;
    canvas.height=h;
    canvas.addEventListener("click",click);
    canvas.addEventListener("mousemove",move);
    tree=new QuadTree(w,h);
    tree.draw(tree.root,context);
}
function click(event){
    tree.add(tree.root,event.clientX,event.clientY);
    tree.draw(tree.root,context);
}
function move(event){
    context.clearRect(0,0,w,h);
    tree.draw(tree.root,context);
    let x=event.clientX;
    let y=event.clientY;
    context.strokeRect(x-20,y-20,40,40);

    let tacke=tree.pretrazi(tree.root,x-20,y-20,40,40);
    for(let i=0;i<tacke.length;i++){
        context.fillStyle="#00ef7f";
        context.fillRect(tacke[i].x,tacke[i].y,3,3);
    }
    context.fillStyle="#000";
}