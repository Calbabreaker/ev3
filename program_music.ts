// notes generated from https://midi-note-gen.calbabreaker.repl.co/
const notes: [number, number][] = [[62, 198], [0, 202], [69, 198], [0, 202], [73, 198], [0, 202], [82, 198], [0, 202], [92, 198], [0, 202], [73, 198], [0, 202], [92, 398], [0, 402], [87, 198], [0, 202], [69, 198], [0, 202], [87, 398], [0, 402], [82, 198], [0, 202], [65, 198], [0, 202], [82, 398], [0, 402], [62, 198], [0, 202], [69, 198], [0, 202], [73, 198], [0, 202], [82, 198], [0, 202], [92, 198], [0, 202], [73, 198], [0, 202], [92, 198], [0, 202], [123, 198], [0, 202], [110, 198], [0, 202], [92, 198], [0, 202], [73, 198], [0, 202], [92, 198], [0, 202], [110, 1598], [62, 186], [0, 189], [69, 186], [0, 189], [73, 186], [0, 189], [82, 186], [0, 189], [92, 186], [0, 189], [73, 186], [0, 189], [92, 373], [0, 377], [87, 186], [0, 189], [69, 186], [0, 189], [87, 373], [0, 377], [82, 186], [0, 189], [65, 186], [0, 189], [82, 373], [0, 377], [62, 186], [0, 189], [69, 186], [0, 189], [73, 186], [0, 189], [82, 186], [0, 189], [92, 186], [0, 189], [73, 186], [0, 189], [92, 186], [0, 189], [123, 186], [0, 189], [110, 186], [0, 189], [92, 186], [0, 189], [73, 186], [0, 189], [92, 186], [0, 189], [110, 1498], [92, 175], [0, 178], [104, 175], [0, 178], [117, 175], [0, 178], [123, 175], [0, 178], [139, 175], [0, 178], [117, 175], [0, 178], [139, 351], [0, 354], [147, 175], [0, 178], [117, 175], [0, 178], [147, 351], [0, 354], [139, 175], [0, 178], [117, 175], [0, 178], [139, 351], [0, 354], [92, 175], [0, 178], [104, 175], [0, 178], [117, 175], [0, 178], [123, 175], [0, 178], [139, 175], [0, 178], [117, 175], [0, 178], [139, 351], [0, 354], [147, 175], [0, 178], [117, 175], [0, 178], [147, 351], [0, 354], [139, 1410], [92, 165], [0, 168], [104, 165], [0, 168], [117, 165], [0, 168], [123, 165], [0, 168], [139, 165], [0, 168], [117, 165], [0, 168], [139, 332], [0, 335], [147, 165], [0, 168], [117, 165], [0, 168], [147, 332], [0, 335], [139, 165], [0, 168], [117, 165], [0, 168], [139, 332], [0, 335], [92, 157], [0, 159], [104, 157], [0, 159], [117, 157], [0, 159], [123, 157], [0, 159], [139, 157], [0, 159], [117, 157], [0, 159], [139, 314], [0, 317], [147, 157], [0, 159], [117, 157], [0, 159], [147, 314], [0, 317], [139, 1262]];

const speedSpeedupMult = 1.5;
const freqSpeedupMult = 2;

let speedMult = 1;
let freqMult = 2;

const programMusic: IProgram = {
    name: "music",
    run: () => {
        control.runInParallel(() => {
            while (true) {
                notes.forEach((note) => {
                    let duration = note[1] / speedMult;
                    if (duration < 10) return;

                    // 0 freq means a rest
                    if (note[0] == 0) {
                        music.rest(note[1] / speedMult);
                    } else {
                        music.playTone(note[0] * freqMult, note[1] / speedMult);
                    }
                });

                speedMult *= speedSpeedupMult;
                freqMult *= freqSpeedupMult;
            }
        });

        const getMotorSpeed = () => Math.map(speedMult, 1, 1.5 ** 4, 10, 100);

        while (true) {
            brick.setStatusLight(StatusLight.Green);
            moveForward(10, getMotorSpeed());
            brick.setStatusLight(StatusLight.Orange);
            moveForward(-10, getMotorSpeed());
            brick.setStatusLight(StatusLight.Red);
            turn(-90, getMotorSpeed());
        }
    },
} 