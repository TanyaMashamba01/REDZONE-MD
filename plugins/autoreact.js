const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');

const settingsPath = path.join(__dirname, '../settings.json');

// Function to load settings
function loadSettings() {
  try {
    return JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  } catch (e) {
    return { AUTO_REACT: true }; // default
  }
}

// Function to save settings
function saveSettings(data) {
  fs.writeFileSync(settingsPath, JSON.stringify(data, null, 2));
}

cmd({
  pattern: "autoreact",
  desc: "Enable or disable AutoReact system",
  category: "general",
  use: "<on/off>"
}, async (conn, m, { text }) => {
  try {
    if (!text) return m.reply("⚙️ Use: *.autoreact on* or *.autoreact off*");

    const value = text.trim().toLowerCase();
    if (value !== "on" && value !== "off") {
      return m.reply("⚙️ Use: *.autoreact on* or *.autoreact off*");
    }

    let settings = loadSettings();
    settings.AUTO_REACT = value === "on" ? true : false;
    saveSettings(settings);

    if (settings.AUTO_REACT) {
      m.reply("✅ AutoReact has been *ENABLED*");
    } else {
      m.reply("🚫 AutoReact has been *DISABLED*");
    }

  } catch (e) {
    console.error(e);
    m.reply("❌ Error while toggling AutoReact!");
  }
});

module.exports = {};
