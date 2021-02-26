class Predator {
    constructor() {
        this.oldPosition = createVector(random(width), random(height));
        this.position = createVector(this.oldPosition.x, this.oldPosition.y);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = maxForceSlider.value();

        // growth while eating
        this.maxSpeed = maxSpeedSlider.value() / 6;
        this.size = 4;
    }

    edges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        } else if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    update() {
        this.oldPosition.x = this.position.x;
        this.oldPosition.y = this.position.y;
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }

    increasePower() {
        this.size += 0.15;
        this.maxSpeed += 0.025;
    }

    goToNearestBoidAndDestroyIfNeeded(boids) {
        if (boids.length == 0) return;
        let nearestBoid = boids[0];
        let shortestDistance = 999;

        for (let i = 0; i < boids.length; i++) {
            let boid = boids[i];
            let distance = dist(this.position.x, this.position.y, boid.position.x, boid.position.y);
            if (distance < shortestDistance) {
                nearestBoid = boid;
                shortestDistance = distance;
            }

            if (distance < this.size) {
                boids.splice(i, 1);
                this.increasePower();
            }
        }

        let delta = p5.Vector.sub(nearestBoid.position, this.position);
        delta.setMag(this.maxSpeed);
        this.velocity.add(delta);
    }

    show() {
        strokeWeight(this.size);
        stroke(255);
        point(this.position.x, this.position.y);

        stroke('red');
        point(this.oldPosition.x, this.oldPosition.y);
    }
}
