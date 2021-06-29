// this file contains robot utility functions

const ROBOT = {
    motor: motors.largeBC,
    rotationsPerCM: 1 / 17.6,
    rotationsPerDegree: 0.5 / 90,
    csensor: sensors.color3,
};

function moveForward(cm: number, speed: number = 50) {
    ROBOT.motor.tank(speed, speed, cm * ROBOT.rotationsPerCM, MoveUnit.Rotations);
}

function turn(degrees: number, speed: number = 50) {
    ROBOT.motor.tank(
        -speed,
        speed,
        ROBOT.rotationsPerDegree * degrees,
        MoveUnit.Rotations
    );
}

let currentPrintLine = 1;
function println(message: string) {
    brick.showString(message, currentPrintLine);
    currentPrintLine++;
}

function clearScreen() {
    brick.clearScreen();
    currentPrintLine = 1;
}

function blinkLight(statusLight: StatusLight, durationMillis: number) {
    brick.setStatusLight(statusLight);
    control.waitMicros(durationMillis * 1000);
    brick.setStatusLight(StatusLight.Off);
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
