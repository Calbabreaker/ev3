/**
 * Interface representing a program object to use in the program select menu to run.
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

const programs = [
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
    programLightSensor,
]
