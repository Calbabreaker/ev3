const ROBOT = {
    motor: motors.largeBC,
    rotationsPerCM: 1 / 17.6,
    rotationsPerDegree: 0.5 / 90,
    csensor: sensors.color3,
}

function moveForward(cm: number, speed: number = 50) {
    const motorSpeed = cm < 0 ? -speed : speed;
    ROBOT.motor.tank(speed, speed, cm * ROBOT.rotationsPerCM, MoveUnit.Rotations);
}

function turn(degrees: number, speed: number = 50) {
    const motorA = degrees > 180 ? speed : -speed;
    const motorB = degrees > 180 ? -speed : speed;
    const mappedDegrees = degrees > 180 ? Math.map(degrees, 0, 360, 180, 0) : degrees;
    ROBOT.motor.tank(motorA, motorB, ROBOT.rotationsPerDegree * mappedDegrees, MoveUnit.Rotations);
}

brick.buttonEnter.onEvent(ButtonEvent.Pressed, () => {
    moveForward(10000);
});

ROBOT.csensor.setThreshold(Light.Dark, 10);
ROBOT.csensor.onLightDetected(LightIntensityMode.Reflected, Light.Dark, () => {
    if (!ROBOT.motor.isReady()) {
        ROBOT.motor.stop();
        moveForward(-30);
        turn(90);
        moveForward(10000);
    }
});
