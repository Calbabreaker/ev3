const programLightSensor: IProgram = {
    name: "light sensor",
    run: () => {
        let mode = Light.Dark;
        const detectFunc = () => {
            // don't do it if the robot is not moving
            if (ROBOT.motor.isReady()) return;

            ROBOT.motor.stop();
            moveForward(-10);
            turn(45);
            if (
                ROBOT.csensor.light(LightIntensityMode.Reflected) >
                ROBOT.csensor.threshold(mode)
            ) {
                moveForward(Infinity);
            }
        }

        const setMode = (newMode: Light) => {
            mode = newMode;
            ROBOT.csensor.onLightDetected(LightIntensityMode.Reflected, mode, detectFunc);
            brick.showString(`Reflected Mode: ${mode == Light.Dark ? "Dark" : "Bright"}`, currentPrintLine + 2);
        }

        brick.buttonEnter.onEvent(ButtonEvent.Pressed, () => {
            if (!ROBOT.motor.isReady()) return;
            blinkLight(StatusLight.Green, 100);
            moveForward(Infinity);
        });

        brick.buttonDown.onEvent(ButtonEvent.Pressed, () => {
            const threshold = mode == Light.Dark ? 5 : -5;
            const calibratedLight = ROBOT.csensor.reflectedLight() + threshold;
            blinkLight(StatusLight.Orange, 100);
            ROBOT.csensor.setThreshold(mode, calibratedLight);
            brick.showString(`Calibrated: ${calibratedLight}`, currentPrintLine + 1);
        });

        brick.buttonLeft.onEvent(ButtonEvent.Pressed, () => {
            setMode(Light.Dark);
        });

        brick.buttonRight.onEvent(ButtonEvent.Pressed, () => {
            setMode(Light.Bright);
        });

        clearScreen();
        println("Press down to calibrate light sensor.");
        println("Press enter to start program.");
        println("Press left use Dark mode and right to use Bright.");
        setMode(Light.Dark);
    },
};
