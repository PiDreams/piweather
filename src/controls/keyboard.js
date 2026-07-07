const readline = require("readline");


function startKeyboard(callbacks) {

    readline.emitKeypressEvents(process.stdin);

    if (process.stdin.isTTY) {
        process.stdin.setRawMode(true);
    }


    process.stdin.on("keypress", (str, key) => {

        if (!key) return;


        if (key.name === "q") {
            process.exit(0);
        }


        if (key.name === "left") {
            callbacks.previous();
        }


        if (key.name === "right") {
            callbacks.next();
        }


        if (key.name === "t") {
            callbacks.add();
        }


        if (key.name === "l") {
            callbacks.list();
        }


        if (key.name === "r") {
            callbacks.remove();
        }

    });

}


module.exports = {
    startKeyboard
};
