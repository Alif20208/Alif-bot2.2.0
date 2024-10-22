module.exports = {
  config: {
    name: "out2",
    version: "1.0.5",
    credits: "Rahad",
    prefix: false,
    permission: 2,
    description: "out bot with a delay",
    category: "admin",
    cooldowns: 5
  },

  start: async function({ nayan, events, args }) {
    const delayMinutes = parseInt(args[0]);


    if (!args[0] || isNaN(delayMinutes)) {
      return nayan.removeUserFromGroup(nayan.getCurrentUserID(), events.threadID);
    }


    nayan.reply(`Goodbye! I'll leave the group in ${delayMinutes} minutes.`, events.threadID);


    setTimeout(() => {
      nayan.removeUserFromGroup(nayan.getCurrentUserID(), events.threadID);
    }, delayMinutes * 60 * 1000);
  }
}
