const Discord = require('discord.js'),
      client = new Discord.Client();

const settings = require("./settings.json");
const chatBot = require("./plugins/chatbot.js");

const prefix = ["hey sherly ", "hi sherly ", "sherly "];

//Used to control command cooldown
const recentMsg = new Set();

var canTalk = true,
    nextRndNum;

var chatResponse = {
    '(\\byour|\\bur) ping': message => {
        message.channel.send("Pong pong!");
        message.channel.send("Right now, my ping is \`" + client.ping+ "\`ms"); //Is this even accurate?
    },

    '(\\bme|\bus)*(a|\\bthe\\b)*.meme': message => {
        let memes = require("./memes.json").Memes;
        if(nextRndNum === undefined) nextRndNum = Math.floor(Math.random() * memes.length);
        message.channel.send(memes[++nextRndNum % memes.length]);
    },

    'love.*(you|u|ya|\\bme)': message => {
        let arr1 = ["kule", "I mean, I like you as a friend :3", "Nice dood", "No you don't...", "Thanks for letting me know :p", "I ain't a trap", "NANII?!?", ":weary: :ok_hand:"];
        let arr2 = ["Luv u too senpai :blush:", "Aww, ur too much :3", "Staaahhppp :blush:", "\:heart\:"];
        if(message.author.id == 200042113814102016)
            message.channel.send(arr2[Math.floor(Math.random() * arr2.length)]);
        else
            message.channel.send(arr1[Math.floor(Math.random() * arr1.length)]);
    },

    '(\\bur.*gay|\\bu.*gay)': message => {
        message.channel.send("It\'s not gay if you say no homo");
    },

    'im not the one*': message => {
        message.channel.send("OI! Let me just get this straight.\nIt's really not a problem if you just say \'no homo\'\nSorry I really wanted to get that out there");
    },

    'u (suk|suck|succ)': message => {
        message.channel.send(":cry:\nI\'m still young so don\'t get any ideas boi. Senpai is working hard to make me the \'Sherly\' he wants me to be. I can only do so much...");
        setTimeout(() => {
            message.channel.send("RANSUCCER-SENPAI, WORK FASTER TO MAKE ME BETTER!!!");
        }, 3200);
    },

    '(\\bur.*thot|\\bu.*thot)': message => {
        message.channel.send("I gay now, okay?");
    },

    //Greetings
    '(what(\'s|s)* up|how(\'s|s)* it goin|\\bhi|\\bhey|\\bhiya|ello|how are (\\byou|u))': message => {
        let temp = ["OOOH SHEEIITT", "What up my dood", "KKK", "T H I C C", "\:hehe\:"];
        message.reply(temp[Math.floor(Math.random() * temp.length)]);
    },

    '(fuck|fuk) (you|u|me)': message => {
        message.channel.send("https://pbs.twimg.com/media/DTPxl0yVAAA_QmW.jpg"/*"https://cdn.discordapp.com/attachments/397568125132079104/397639803501281292/gucci.gif"*/);
    },

    'u.* neet': message => {
        message.channel.send("Hey, I went outside once.... sometimes...");
    },

    '^am i\?': message => {
        message.channel.send("...");
        setTimeout(() => {
            message.channel.send("Sure...");
        }, 3200);
    },

    '(u (like|love) (\\bransackers|\\bransuccers))': message => {
        message.channel.send("Well, he is my senpai \:smile\:");
    },

    'u (like|love) (\\bsteven)': message => {
        message.channel.send("https://comedycentral.mtvnimages.com/images/shows/tds/videos/season_14/14067/ds_14067_03_v6.jpg");
    },

    'just monika': message => {
        message.channel.send("https://www.youtube.com/watch?v=w0RA_LZC0Jg");
    },

    '(your|ur) senpai': message => {
        message.channel.send("why Ransackers of course \:blush\:\:heart\:");
    },

    'stop talking': message => {
        if(message.author.id == 200042113814102016) {
            message.channel.send("U got it senpai :3");
            canTalk = !canTalk;
            message.channel.send(`\`Chat: ${canTalk}\``);
        } else
            message.channel.send("OI u can\'t do that");
    },

    '(bai|bye).*': message => {
        message.reply("I\'ll miss u :D");
        // message.channel.send({embed:
        //     {
        //         color: 0x00ff00,
        //         author: {
        //             name: client.user.username,
        //             icon_url: message.guild.iconURL
        //         },
        //         title: "This is an embed",
        //         url: "http://google.com",
        //         description: "This is a test embed to showcase what they look like and what they can do.",
        //         fields: [{
        //                 name: "Fields",
        //                 value: "They can have different fields with small headlines."
        //             },
        //             {
        //                 name: "Masked links",
        //                 value: "You can put [masked links](http://google.com) inside of rich embeds."
        //             },
        //             {
        //                 name: "Markdown",
        //                 value: "You can put all the *usual* **__Markdown__** inside of them.\n\`\`\`As well as code blocks\`\`\`"
        //             }
        //         ],
        //         timestamp: new Date(),
        //         footer: {
        //             icon_url: client.user.avatarURL,
        //             text: "© Example"
        //         }
        //     }
        // });
    },

	'kek': message => {
		message.channel.send("https://www.youtube.com/watch?v=AiosKUO7oqo");
	}
};

client.on("ready", () => {
    console.log("Sherly bot is now online\nVersion: " + settings.version + "\nDiscord version: " + Discord.version);
    client.user.setGame("I swear, I\'m not gay");
});

client.on("disconnect", event => {
    console.log("Sherly bot is now offline\nCode: " + event.code);
});

client.on("message", message => {
    if(!prefix.some(element => { return message.content.toLowerCase().startsWith(element) }))
        return;
    else if(message.author.bot)
        return;
    else if(recentMsg.has(message.author.id)) //Checks user to see if he already executed a command/message
        return;
    else{
        //Splits the our message into two parts, removing the 'sherly' bit and return an array thats either ["", <message>] or ["hey/hi", <message>]
        const content = message.content.toLowerCase().split("sherly ")[1];

        if(content.length > 700){
            message.channel.send("...Yea, too lazy to read that :3");
            return;
        }

        let isResponseFailed = true;
        for(let obj in chatResponse) {
            let check = new RegExp(obj, 'i');

            if(canTalk && check.test(content)) {
                chatResponse[obj](message);
                isResponseFailed = false;
            } else if(!canTalk)
                if(message.author.id == 200042113814102016 && /start talking/i.test(content)) {
                    chatResponse['stop talking'](message);
                    isResponseFailed = false;
                }
        }

        if(canTalk && isResponseFailed){
            console.log("Sending ", content, " to cleverbot");
            chatBot.askBot(message, content);
        }

        //Adds user to the set so they can't talk for 3 seconds
        recentMsg.add(message.author.id);
        setTimeout(() => {
            //After 3 seconds, user is removed from set
            recentMsg.delete(message.author.id);
        }, 3000);
    }
});

client.login(settings.token);
