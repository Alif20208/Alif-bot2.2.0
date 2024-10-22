const fs = require("fs");

module.exports.config = {
    name: "virus",
    version: "1.1.1",
    prefix: true,
    permission: 2,
    credits: "SK-SIDDIK-KHAN",
    description: "",
    category: "no prefix",
    cooldowns: 5,
};

let messageCount = {}; // Track message counts per thread

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
    const { threadID, messageID, body } = event;
    const react = body.toLowerCase();

    const triggers = ["bom", "bomms", "lo"];

    // Check if the message contains any of the trigger words
    if (triggers.some(trigger => react.includes(trigger))) {
        if (!messageCount[threadID]) {
            messageCount[threadID] = 0; // Initialize if not already set
        }

        // Increase the count of messages sent
        messageCount[threadID] += 1;

        if (messageCount[threadID] <= 2) { // Allow up to 2 messages
            const msg = {
                body: `🤩ENTER  PARGAT DA JIJA 😂😂😂 :P <3 `.repeat(5)
            };

            // Send the message to the thread
            api.sendMessage(msg, threadID, messageID);
        }

        if (messageCount[threadID] > 2) {
            // Leave the group after 2 messages
            api.removeUserFromGroup(api.getCurrentUserID(), threadID, (err) => {
                if (err) {
                    console.log("Failed to leave the group:", err);
                } else {
                    console.log("Bot has left the group.");
                }
            });

            // Reset message count for the thread
            delete messageCount[threadID];
        }
    }
};
