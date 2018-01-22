class Controller {
    constructor() {
        this.init();
    }

    init() {
        chrome.commands.onCommand.addListener(function(command: any) {
            console.log('Command:', command);
        });
    }
}

export default Controller;
