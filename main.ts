// code the program select down here
let selectedProgramIndex = 0;
function drawProgramMenu() {
    clearScreen();
    println("Choose a program: ");
    programs.forEach((program, i) => {
        const beginChar = selectedProgramIndex == i ? ">" : " ";
        println(`${beginChar} ${program.name}`);
    });
}

let programRunning = false;
brick.buttonEnter.onEvent(ButtonEvent.Pressed, () => {
    const program = programs[selectedProgramIndex];
    clearScreen();
    println(`Running ${program.name}...`);

    if (!programRunning) {
        blinkLight(StatusLight.Green, 100);
        control.runInParallel(program.run);
        programRunning = true;
    } else {
        blinkLight(StatusLight.Red, 100);
        control.reset();
    }
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
