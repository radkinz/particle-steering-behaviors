var font;
var particles = [];
var img;
var song;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
  img = loadImage('bjAlex.jpg');
  song = loadSound("FEVER.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  song.play();
  fft = new p5.FFT(0.5, 64);

  var points = font.textToPoints('Fever', 50, (height/2)+100, width*0.35, {
    sampleFactor: 0.25
  });
  for (let i = 0; i < points.length; i++) {
    particles.push(new Particle(points[i].x, points[i].y));
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

  //get song spectrum and freq avg
  var spectrum = fft.analyze();
  var freq_avg = 0;
  for (let i = 0; i < spectrum.length; i++) {
    freq_avg += spectrum[i]
  }
  freq_avg = freq_avg/spectrum.length

  //create repulsion based on music if loud enough
  if (pow(freq_avg, 2) < 16000) {
      repelParticles(map(pow(freq_avg, 4), 0, 500000000, 0, width/4));
  } else {
      repelParticles(width/2);
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