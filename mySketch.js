var fires = [];

function setup() {
    createCanvas(700,300);
    colorMode(HSB, 360, 100, 100, 100);
    background(240,100,20);
    blendMode(SCREEN);
    noStroke();
}

function draw() {
    for (var i = 0; i < fires.length; i++) {
        var fire = fires[i];
        if (fire.fin()) fires.splice(i,1);
        else fire.drawF();
    }
    var blurN = 0;
    switch (Math.floor(Math.pow(random(256), .25))) {
        case 0:
            blurN = 3;
        break;
        case 1 :
            blurN = 2;
        break;
        case 2 :
            blurN = 0;
        break;
        case 3 :
            blurN = 1;
        break;
    }
    filter(BLUR,blurN);
}

function mousePressed() {
    var layer = 3 + random(3);
    var clH = random(360);
    for (var l = 0; l < layer; ++l) {
        var scat = 4+5*l + random(6);
        for (var i = 0; i < scat; ++i) {
            fires.push(new Fire(mouseX, mouseY, 
                (.6)*(l+1)+random(-1,1)/(l+1), //sp
                i*2*PI/scat+random(-1,1)/10, //rad
                2, //size
                clH+random(-20,20), // h
                100*(l+2)/(layer+1))); //s
        }
        if (random(1)<.3) clH += 180;
        clH += 360+random(-60,60);
        clH %= 360;
    }
}

class Fire {
    constructor(x, y, spAbs, rad, nr, nh, ns) {
      this.pos = [];
      this.pos[0] = x;
      this.pos[1] = y;
      this.sp = [];
      this.sp[0] = spAbs*cos(rad);
      this.sp[1] = spAbs*sin(rad);;
      this.r = nr;
      this.h = nh;
      this.s = ns;
      this.t = 100;
    }
    drawF() {
        this.sp[0] /= 1.04;
        this.sp[1] /= 1.04;
        this.sp[1] += 0.03;
        for (var i = 0; i < 2; ++i) this.pos[i] += this.sp[i];
        this.t--;
        fill(this.h, this.s, 99, this.t);
        ellipse(this.pos[0], this.pos[1], this.r, this.r);
    }
    fin() {
        return this.pos[1]>height || this.t<0;
    }
}