var g = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
var l = [];
var time = 0;
var n = 0;

do {
	ri = Math.floor(Math.random()*(g.length));
	r = g[ri];

	if(r!=-1) {
		l.push(r);
		g[ri] = -1;
		n+=1;
	}

} while(n<16);


function drawPuzzle() {
	for(i=0;i<16;i++) {
		document.getElementsByTagName('td')[i].innerHTML = '<img src="./assets/images/data/cut/'+l[i]+'.png"/>';
  }
  if(time >= 30){
    window.alert("timeout")
  }else{
    chkWin();
  }
}


function keyPressed(e) {
	k = e.keyCode;
	if(k==38) {mvUp();}
	if(k==40) {mvDown();}
	if(k==37) {mvLeft();}
	if(k==39) {mvRight();}
}

function mvDown() {
	if(l.indexOf(0)>4) {
		i = l.indexOf(0);
		j = i - 4;
		t = l[i];
		l[i] = l[j];
		l[j] = t;
		drawPuzzle();
	}
}
function mvUp() {
	if(l.indexOf(0)<12) {
		i = l.indexOf(0);
		j = i + 4;
		t = l[i];
		l[i] = l[j];
		l[j] = t;
		drawPuzzle();
	}
}
function mvRight() {
	i = l.indexOf(0);
	if(!(i==0 || i==4 || i==8 || i==12)) {
		j = i - 1;
		t = l[i];
		l[i] = l[j];
		l[j] = t;
		drawPuzzle();
	}
}
function mvLeft() {
	i = l.indexOf(0);
	if(!(i==3 || i==7 || i==11 || i==15)) {
		j = i + 1;
		t = l[i];
		l[i] = l[j];
		l[j] = t;
		drawPuzzle();
	}
}

function incre(){
  time += 1
}
function chkWin() {
	var a = 1;
	for(i=0;i<14;i++) {
		if(l[i]!=i+1) {a = 0;}
	}
	if(a==1) {alert('You Won !');}
}
drawPuzzle()
setTimeout(incre(),1000)
