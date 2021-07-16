var font;
var particles = [];

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(600, 300);
  background(0);

  var points = font.textToPoints('penis', 100, 200, 192, {
    sampleFactor: 0.25
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    particles.push(new Particle(pt.x, pt.y));
  }
}

function draw() {
  background(51);
  for (var i = 0; i < particles.length; i++) {
    particles[i].behaviors();
    particles[i].update();
    particles[i].show();
  }
}

function mousePressed() {
  var mouse = createVector(mouseX, mouseY);

  for (let i = 0; i < particles.length; i++) {
    var repel = particles[i].repel(mouse);
    repel.mult(20);

    particles[i].acc.add(repel);
  }
}