const fs = require("fs");
const settingsPath = "./settings.json";

module.exports = {
  name: "autoreact",
  alias: ["ar"],
  desc: "Toggle AutoReact On/Off",
  type: "config",
  exec: async (sock, m, args) => {
    try {
      let settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
      if (args[0] === "on") {
        settings.AUTO_REACT = true;
      } else if (args[0] === "off") {
        settings.AUTO_REACT = false;
      } else {
        return m.reply("❌ Usage: .autoreact on / off");
      }

      fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
      m.reply(`✅ AutoReact is now *${settings.AUTO_REACT ? "ON" : "OFF"}*`);
    } catch (e) {
      console.error(e);
      m.reply("❌ Error while toggling AutoReact!");
    }
  }
};
