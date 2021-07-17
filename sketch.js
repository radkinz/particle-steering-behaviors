var font;
var particles = [];
var img;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
  img = loadImage('bjAlex.jpg')
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  var points = [];
  img.resize(width, height)
  img.loadPixels();
  for (let x = 0; x < img.width; x+=10) {
    for (let y = 0; y < img.height; y+=10) {
      let index = 4*(y*width+x);
      let avg = (img.pixels[index] + img.pixels[index+1] + img.pixels[index+2])/3;
      console.log(img.pixels[index], y, avg)
      if (avg < 100) {
        particles.push(new Particle(x, y));
      }
    }
  }
}

function draw() {
  background(0);
  //image(img, 0, 0);
  for (var i = 0; i < particles.length; i++) {
    particles[i].behaviors();
    particles[i].update();
    particles[i].show();
  }
}

function mousePressed() {
  var mouse = createVector(width/2, height/2);

  for (let i = 0; i < particles.length; i++) {
    var repel = particles[i].repel(mouse, random(max(width/2, height/2)));
    repel.mult(20);

    particles[i].acc.add(repel);
  }
}