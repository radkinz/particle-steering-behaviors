var font;
var particles = [];

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  var points = font.textToPoints('Saints', 50, (height/2)+100, width*0.25, {
    sampleFactor: 0.25
  });
  for (let i = 0; i < points.length; i++) {
    particles.push(new Particle(points[i].x, points[i].y));
  }
}

function draw() {
  background("#793140");
  
  for (var i = 0; i < particles.length; i++) {
    particles[i].behaviors();
    particles[i].update();
    particles[i].show();
  }
}

function repelParticles(radius) {
  var center = createVector(width/2, height/2);

  for (let i = 0; i < particles.length; i++) {
    var repel = particles[i].repel(center, radius);
    repel.mult(20);

    particles[i].acc.add(repel);
  }
}