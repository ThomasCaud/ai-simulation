class Boid {
    constructor() {
        this.oldPosition = createVector(random(width), random(height));
        this.position = createVector(this.oldPosition.x, this.oldPosition.y);
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

    normalizeAndUpdateAcceleration(steering, multiplier) {
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
        steering.mult(multiplier);
        this.acceleration.add(steering);
    }

    updateSteeringAlign(steering, total) {
        if (total > 0) {
            steering.div(total);
            this.normalizeAndUpdateAcceleration(steering, alignSlider.value());
        }
    }

    updateSteeringCohesion(steering, total) {
        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            this.normalizeAndUpdateAcceleration(steering, cohesionSlider.value());
        }
    }

    updateSteeringSeparation(steering, total) {
        if (total > 0) {
            steering.div(total);
            this.normalizeAndUpdateAcceleration(steering, separationSlider.value());
        }
    }

    updateSteeringPredators(steering, total) {
        if (total > 0) {
            steering.div(total);
            this.normalizeAndUpdateAcceleration(steering, 0.3);
        }
    }

    move(boids) {
        // if we have to avoid predator...
        // ...it's the panic!
        // So we don't stay in group anymore.
        if (this.avoidPredators(predators) == 0) {
            this.flock(boids);
        }
    }

    flock(boids) {
        let steeringAlign = createVector(),
            steeringCohesion = createVector(),
            steeringSeparation = createVector();
        let totalAlign = 0,
            totalCohesion = 0,
            totalSeparation = 0;

        for (let other of boids) {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this) {
                if (distance < alignSliderRadius.value()) {
                    steeringAlign.add(other.velocity);
                    totalAlign++;
                }
                if (distance < cohesionSliderRadius.value()) {
                    steeringCohesion.add(other.position);
                    totalCohesion++;
                }

                if (distance < separationSliderRadius.value()) {
                    let diff = p5.Vector.sub(this.position, other.position);
                    diff.div(distance);
                    steeringSeparation.add(diff);
                    totalSeparation++;
                }
            }
        }

        this.updateSteeringAlign(steeringAlign, totalAlign);
        this.updateSteeringCohesion(steeringCohesion, totalCohesion);
        this.updateSteeringSeparation(steeringSeparation, totalSeparation);
    }

    avoidPredators(predators) {
        let steering = createVector();
        let total = 0;
        for (let other of predators) {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (distance < avoidPredatorRadiusSlider.value()) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(distance);
                steering.add(diff);
                total++;
            }
        }
        this.updateSteeringPredators(steering, avoidPredatorsSlider.value());
        return total;
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
