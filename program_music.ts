const programMusic: IProgram = {
    name: "music",
    run: () => {
        music.playTone(Note.C, 100);
        music.playTone(Note.E, 100);
        music.playTone(Note.G, 100);
    },
} 