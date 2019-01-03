class Chatship {
    constructor(configs) {
        this.dbUrl = configs.dbUrl || null;
        this.chatUrl = configs.chatUrl || null;
    }

    getConfigs(){
        return {
            chatUrl: this.chatUrl,
            dbUrl: this.dbUrl
        };
    }

    sendToOther(msg, sender, receiver){
        console.log('Send to other', msg, sender, receiver);
    }
}

module.exports = Chatship;