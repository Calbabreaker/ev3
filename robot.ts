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
    ROBOT.motor.tank(
        -speed,
        speed,
        ROBOT.rotationsPerDegree * degrees,
        MoveUnit.Rotations
    );
}

let currentPrintLine = 1;

/**
 * Prints a line of text to the robot screen.
 * 
 * @param message - The message to print.
 */
function println(message: string): void {
    brick.showString(message, currentPrintLine);
    currentPrintLine++;
}

/**
 * Clears the robot screen.
 */
function clearScreen(): void  {
    brick.clearScreen();
    currentPrintLine = 1;
}

/**
 * Blinks a status light by the specified milliseconds.
 * 
 * @param statusLight - The status light to blink. Eg: `StatusLight.Red`.
 * @param durationMillis - The duration of the blink in milliseconds.
 */
function blinkLight(statusLight: StatusLight, durationMillis: number) {
    brick.setStatusLight(statusLight);
    control.waitMicros(durationMillis * 1000);
    brick.setStatusLight(StatusLight.Off);
}

/**
 * Interface representing a program object to use to select and run.
 */
interface IProgram {
    /**
     * The name of the program.
     */
    name: string;
    /**
     * Function that will be called every when the program is selected.
     * Put the robot instructions here.
     */
    run: () => void;
}
