// code the program select down here
let selectedProgramIndex = 0;
function drawProgramMenu() {
    clearScreen();
    println("Choose a program: ");
    println(`${programs[1].name}`);
    programs.forEach((program, i) => {
        const beginChar = selectedProgramIndex == i ? ">" : " ";
        println(`${beginChar} ${program.name}`);
    });
}

brick.buttonEnter.onEvent(ButtonEvent.Pressed, () => {
    const program = programs[selectedProgramIndex];
    clearScreen();
    println(`Running ${program.name}...`);
    blinkLight(StatusLight.Green, 100);
    
    // unregister these events to prevent user from iteracting with menu 
    // while program is running
    brick.buttonEnter.onEvent(ButtonEvent.Pressed, () => {});
    brick.buttonUp.onEvent(ButtonEvent.Pressed, () => {});
    brick.buttonDown.onEvent(ButtonEvent.Pressed, () => {});
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
