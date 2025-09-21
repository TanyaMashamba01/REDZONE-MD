const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');

cmd({
  pattern: "autoreact",
  desc: "Enable or disable AutoReact system (anyone can use)",
  category: "general",
  use: "<on/off>"
}, async (conn, m, { text }) => {
  try {
    if (!text) return m.reply("⚙️ Use: .autoreact on or .autoreact off");

    const value = text.trim().toLowerCase();
    if (value !== "on" && value !== "off") {
      return m.reply("⚙️ Use: .autoreact on or .autoreact off");
    }

    // Path to config.env
    const envPath = path.join(__dirname, '../config.env');
    let envFile = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : "";

    if (value === "on") {
      if (envFile.includes("AUTO_REACT=false")) {
        envFile = envFile.replace("AUTO_REACT=false", "AUTO_REACT=true");
      } else if (!envFile.includes("AUTO_REACT")) {
        envFile += "\nAUTO_REACT=true";
      }
      m.reply("✅ AutoReact has been *ENABLED*");
    } else {
      if (envFile.includes("AUTO_REACT=true")) {
        envFile = envFile.replace("AUTO_REACT=true", "AUTO_REACT=false");
      } else if (!envFile.includes("AUTO_REACT")) {
        envFile += "\nAUTO_REACT=false";
      }
      m.reply("🚫 AutoReact has been *DISABLED*");
    }

    fs.writeFileSync(envPath, envFile, 'utf8');

    // Update current session env
    process.env.AUTO_REACT = value === "on" ? "true" : "false";

  } catch (e) {
    console.error(e);
    m.reply("❌ Error while toggling AutoReact!");
  }
});
