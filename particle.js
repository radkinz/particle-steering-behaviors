function Particle(x, y) {
    this.pos = createVector(randomOutsideofBounds(width), randomOutsideofBounds(height));
    this.vel = p5.Vector.random2D();
    this.target = createVector(x, y);
    this.acc = createVector();
    this.maxSpeed = 5;
    this.maxForce = 0.3;
}

function randomOutsideofBounds(boundary) {
    if (random(1) < 0.5) {
        return (random(-300, 0))
    } 

    return (random(boundary, boundary+300))
}

Particle.prototype.behaviors = function () {
    var seek = this.arrive(this.target);
    seek.mult(1);
    this.acc.add(seek);

    //repel from mouse
    var mouse = createVector(mouseX, mouseY);
    var repel = this.repel(mouse, 100);
    repel.mult(5);
    this.acc.add(repel);
}

Particle.prototype.update = function () {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
}

Particle.prototype.arrive = function (target) {
    //get vector from position to target
    var desired = p5.Vector.sub(target, this.pos);

    //desired vel is max speed
    var dist = desired.mag();
    var speed = this.maxSpeed;
    if (dist < 100) {
        speed = map(dist, 0, 100, 0, this.maxSpeed);
    }
    desired.setMag(speed);

    //get steering force
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
}

Particle.prototype.show = function () {
    stroke(255);
    strokeWeight(8);
    point(this.pos.x, this.pos.y);
}

Particle.prototype.repel = function (target, radius) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < radius) {
      desired.setMag(this.maxSpeed);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(random(0.5));
      return steer;
    } else {
      return createVector(0, 0);
    }
}
