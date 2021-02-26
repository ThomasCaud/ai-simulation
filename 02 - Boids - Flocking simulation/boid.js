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

    flock(boids) {
        let perceptionRadiusAlign = alignSliderRadius.value();
        let perceptionRadiusCohesion = cohesionSliderRadius.value();
        let perceptionRadiusSeparation = separationSliderRadius.value();

        let steeringAlign = createVector(), steeringCohesion = createVector(), steeringSeparation = createVector();
        let totalAlign = 0, totalCohesion = 0, totalSeparation = 0;

        for (let other of boids) {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this) {
                if(distance < perceptionRadiusAlign) {
                    steeringAlign.add(other.velocity);
                    totalAlign++;
                }
                if (distance < perceptionRadiusCohesion) {
                    steeringCohesion.add(other.position);
                    totalCohesion++;
                }

                if (distance < perceptionRadiusSeparation) {
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
