const programs: IProgram[] = [
    {
        name: "light sensor",
        run: () => {
            moveForward(Infinity);
        },
        setup: () => {
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
];

// code the program select down here
let selectedProgramIndex = 0;
function drawProgramMenu() {
    clearScreen();
    println("Choose a program: ");
    programs.forEach((program, i) => {
        let output = program.name;
        if (selectedProgramIndex == i) output = "> " + output;

        println(output);
    });
}

let programRunning = false;
brick.buttonEnter.onEvent(ButtonEvent.Pressed, () => {
    const program = programs[selectedProgramIndex];
    ROBOT.motor.stop();
    clearScreen();
    println(`Running ${program.name}...`);

    if (!programRunning && program.setup) program.setup();

    blinkLight(StatusLight.Green, 100)
    program.run();
});

brick.buttonUp.onEvent(ButtonEvent.Pressed, () => {
    selectedProgramIndex--;
    if (selectedProgramIndex < 0) selectedProgramIndex = programs.length - 1;
    drawProgramMenu();
});

brick.buttonDown.onEvent(ButtonEvent.Pressed, () => {
    selectedProgramIndex++;
    if (selectedProgramIndex >= programs.length) selectedProgramIndex = 0;
    drawProgramMenu();
});

drawProgramMenu();
