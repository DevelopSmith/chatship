var io = require('socket.io')();
const pathToRegexp = require('path-to-regexp')

const chats = [
    {
        id: 'J2596248',
        name: 'Jon Snow',
        avatar: 'http://placehold.it/50/55C1E7/fff&text=J',
        lastMsg: 'How are you?',
    },
    {
        id: 'A59sg248',
        name: 'Arya Stark',
        avatar: 'http://placehold.it/50/55C1E7/fff&text=A',
        lastMsg: 'Tomorrow is fine',
    },
    {
        id: 'S5632as8',
        name: 'Sansa Stark',
        avatar: 'http://placehold.it/50/55C1E7/fff&text=S',
        lastMsg: 'Thanks!',
    },
    {
        id: 'H569s848',
        name: 'The Hound',
        avatar: 'http://placehold.it/50/55C1E7/fff&text=T',
        lastMsg: 'I will come with Arya!',
    },
];

const messages = [
    {
        sender: 'me',
        body: 'Hello buddy, how are you doing?',
        sentOn: '12 mins ago',
    },
    {
        sender: 'other',
        body: 'Hey Jon, I am fine. What about you?',
        sentOn: '13 mins ago',
    },
    {
        sender: 'me',
        body: 'I am good. Thanks!',
        sentOn: '14 mins ago',
    },
    {
        sender: 'other',
        body: 'Are you coming tonight?',
        sentOn: '15 mins ago',
    },
];

function chatship(options) {
    var opts = options || {};
    var collectionPrefix = opts.collectionPrefix || 'chatship';
    // console.log('********', opts);

    const chatSocket = io.of(opts.chatUrl);
    io.attach(opts.server);

    chatSocket.on('connection', socket => {
        console.log('******** MAIN ROOM CONNECTION  ********');
    });

    return function chatship(req, res, next) {
        var url = req.url;

        const re = pathToRegexp(opts.apiPrefix + '/messages/:id');
        const tokens = re.exec(url);
 
        if(tokens){
            if(opts.apiPrefix + '/messages/' + tokens[1] == tokens[0]){
                messages[0].body = `Hello ${tokens[1]}, how are you doing?`;
                sendResJSON(res, 200, messages);
            }else{
                next();
            }
        }else if(url === opts.apiPrefix + '/contacts'){
            sendResJSON(res, 200, chats);
        }else{
            next();
        }
    }
}

var sendResJSON = function(res, status, content) {
    res.status(status);
    res.json(content);
};


exports = module.exports = chatship;

/*class Chatship {
    constructor(configs) {
        this.dbUrl = configs.dbUrl || null;
        this.chatUrl = configs.chatUrl || null;
        this.server = configs.server || null;

        const chatSocket = io.of(this.chatUrl);
        io.attach(this.server);

        dispatcher.onGet("/wait/dude", function(req, res) {
            console.log('555');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('<h1>Hey, this is the homepage of your server</h1>');
        });


        chatSocket.on('connection', socket => {
            console.log('******** MAIN ROOM CONNECTION  ********');
        });
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

    // --
}

module.exports = Chatship;*/