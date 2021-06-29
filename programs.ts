const programs: IProgram[] = [
    {
        name: "light sensor",
        run: () => {
            ROBOT.csensor.setThreshold(Light.Dark, 10);
            ROBOT.csensor.onLightDetected(
                LightIntensityMode.Reflected,
                Light.Dark,
                () => {
                    if (!ROBOT.motor.isReady()) {
                        ROBOT.motor.stop();
                        moveForward(-10);
                        turn(90);
                        if (
                            ROBOT.csensor.light(LightIntensityMode.Reflected) >
                            ROBOT.csensor.threshold(Light.Dark)
                        ) {
                            moveForward(Infinity);
                        }
                    }
                }
            );

            moveForward(Infinity);
        },
    },
    {
        name: "square",
        run: () => {
            for (let i = 0; i < 4; i++) {
                moveForward(20);
                turn(90);
            }
        },
    },
    programMusic,
];
