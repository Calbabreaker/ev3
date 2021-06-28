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
    if (degrees < 180) {
        ROBOT.motor.tank(-speed, speed, ROBOT.rotationsPerDegree * degrees, MoveUnit.Rotations);
    } else {
        const mappedDegrees = Math.map(degrees, 0, 360, 180, 0);
        ROBOT.motor.tank(speed, -speed, ROBOT.rotationsPerDegree * mappedDegrees, MoveUnit.Rotations);
    }
}

interface IProgram {
    // the name of the program
    name: string;
    // function that will be called every time the middle button is pressed
    // put run robot stuff here
    run: Function;
    // funciton that will be called the first time the middle button is pressed 
    // put event listners stuff here (function is optional)
    setup?: Function;
}

const programs: IProgram[] = [
    {
        name: "light sensor",
        run: () => {
            moveForward(Infinity);
        },
        setup: () => {
            ROBOT.csensor.setThreshold(Light.Dark, 10);
            ROBOT.csensor.onLightDetected(LightIntensityMode.Reflected, Light.Dark, () => {
                if (!ROBOT.motor.isReady()) {
                    ROBOT.motor.stop();
                    moveForward(-10);
                    turn(90);
                    if (ROBOT.csensor.light(LightIntensityMode.Reflected) > ROBOT.csensor.threshold(Light.Dark)) {
                        moveForward(Infinity);
                    }
                }
            });
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

let currentPrintLine = 1;
function println(message: string) {
    brick.showString(message, currentPrintLine);
    currentPrintLine++;
}

function clearScreen() {
    brick.clearScreen();
    currentPrintLine = 1;
}

let selectedProgramIndex = 0;
function drawProgramMenu() {
    clearScreen();
    println("Choose a program: ");
    programs.forEach((program, i) => {
        let output = program.name;
        if (selectedProgramIndex == i) 
            output = "> " + output;

        println(output);
    });
}

let programRunning = false;
brick.buttonEnter.onEvent(ButtonEvent.Pressed, () => {
    const program = programs[selectedProgramIndex];
    ROBOT.motor.stop();
    clearScreen();
    println(`Running ${program.name}...`);
    
    if (!programRunning) {
        if (program.setup) program.setup();
    }

    brick.setStatusLight(StatusLight.Green);
    control.waitMicros(1000 * 100);
    brick.setStatusLight(StatusLight.Off);
    program.run();
});

brick.buttonUp.onEvent(ButtonEvent.Pressed, () => {
    selectedProgramIndex--;
    if (selectedProgramIndex < 0) 
        selectedProgramIndex = programs.length - 1;
    drawProgramMenu();
});

brick.buttonDown.onEvent(ButtonEvent.Pressed, () => {
    selectedProgramIndex++;
    if (selectedProgramIndex >= programs.length)
        selectedProgramIndex = 0;
    drawProgramMenu();
});

drawProgramMenu();
