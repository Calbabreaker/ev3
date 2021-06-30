const programLightSensor: IProgram = {
    name: "light sensor",
    run: () => {
        ROBOT.csensor.setThreshold(Light.Dark, 10);
        ROBOT.csensor.onLightDetected(LightIntensityMode.Reflected, Light.Dark, () => {
            // don't do it if the robot is not moving
            if (ROBOT.motor.isReady()) return;

            ROBOT.motor.stop();
            moveForward(-10);
            turn(90);
            if (
                ROBOT.csensor.light(LightIntensityMode.Reflected) >
                ROBOT.csensor.threshold(Light.Dark)
            ) {
                moveForward(Infinity);
            }
        });

        brick.buttonEnter.onEvent(ButtonEvent.Pressed, () => {
            if (!ROBOT.motor.isReady()) return;
            blinkLight(StatusLight.Green, 100);
            moveForward(Infinity);
        });

        brick.buttonDown.onEvent(ButtonEvent.Pressed, () => {
            blinkLight(StatusLight.Orange, 100);
            ROBOT.csensor.setThreshold(Light.Dark, ROBOT.csensor.reflectedLight() + 5);
        });

        println("Press up to calibrate light sensor.");
        println("Press enter to start program.");
    },
};
