class Boid {
    constructor() {
        this.oldPosition = createVector(random(width), random(height));
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = maxForceSlider.value();
        this.maxSpeed = maxSpeedSlider.value();
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

    align(boids) {
        let perceptionRadius = alignSliderRadius.value();
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && distance < perceptionRadius) {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    // todo factorize it with align()
    cohesion(boids) {
        let perceptionRadius = cohesionSliderRadius.value();
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && distance < perceptionRadius) {
                steering.add(other.position);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    separation(boids) {
        let perceptionRadius = separationSliderRadius.value();
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && distance < perceptionRadius) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(distance);
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    flock(boids) {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);

        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        separation.mult(separationSlider.value());

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    update() {
        this.oldPosition.x = this.position.x;
        this.oldPosition.y = this.position.y;
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }

    show() {
        strokeWeight(4);
        stroke(255);
        point(this.position.x, this.position.y);

        stroke('orange');
        point(this.oldPosition.x, this.oldPosition.y);
    }
}
