// this file contains robot utility functions

const ROBOT = {
    /**
     * The port of the colour sensor to use.
     */
    csensor: sensors.color3,
    /**
     * The port(s) of the motor to use.
     */
    motor: motors.largeBC,
    /**
     * The amount rotations needed to move 1cm.
     * 1 / circumference of wheel.
     */
    rotationsPerCM: 1 / 17.6,
    /**
     * The amount rotations needed to turn 1deg with both motors
     * moving the opposite way from each other.
     */
    rotationsPerDegree: 0.5 / 90,
    /**
     * The max collumns of the screen that can safely be shown.
     */
    screenWidth: 29,
    /**
     * The max rows of the screen that can safely be shown.
     */
    screenHeight: 12,
};

/**
 * Moves the robot forward by the specified amount in centimetres.
 *
 * @param cm - Centimetres to move forward by. Specifying a
 *             negative amount would move it backwards
 * @param speed - The speed to move by between 0 and 100.
 */
function moveForward(cm: number, speed: number = 50): void {
    ROBOT.motor.tank(speed, speed, cm * ROBOT.rotationsPerCM, MoveUnit.Rotations);
}

/**
 * Turns the robot right by the specified amount in degrees.
 *
 * @param degrees - Degrees to move forward by. Specifying a
 *                  negative amount would make it turn left.
 * @param speed - The speed to turn by between 0 and 100.
 */
function turn(degrees: number, speed: number = 50): void {
    ROBOT.motor.tank(-speed, speed, ROBOT.rotationsPerDegree * degrees, MoveUnit.Rotations);
}

let currentPrintLine = 1;

/**
 * Prints a line of text to the robot screen.
 * Stores the current line to print and increments it when it prints.
 * Handles line and screen wrap as well.
 *
 * @param message - The message to print.
 */
function println(message: string = ""): void {
    if (message.length > ROBOT.screenWidth) {
        println(message.substr(0, ROBOT.screenWidth));
        message = message.substr(ROBOT.screenWidth, message.length);
    }

    if (currentPrintLine > ROBOT.screenHeight) currentPrintLine = 1;

    brick.showString(message, currentPrintLine);
    currentPrintLine++;
}

/**
 * Clears the robot screen and sets the current print line to 1.
 */
function clearScreen(): void {
    brick.clearScreen();
    currentPrintLine = 1;
}

/**
 * Blinks a status light by the specified milliseconds.
 *
 * @param statusLight - The status light to blink. Eg. `StatusLight.Red`.
 * @param durationMillis - The duration of the blink in milliseconds.
 */
function blinkLight(statusLight: StatusLight, durationMillis: number) {
    brick.setStatusLight(statusLight);
    control.waitMicros(durationMillis * 1000);
    brick.setStatusLight(StatusLight.Off);
}

class Program {
    name: string;
    run: () => void;

    constructor(name: string, run: () => void) {
        this.name = name;
        this.run = run;
    }
}

const programs: Program[] = [];
