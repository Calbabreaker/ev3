programs.push(
    new Program("square", () => {
        for (let i = 0; i < 4; i++) {
            moveForward(20);
            turn(90);
        }
    })
);
