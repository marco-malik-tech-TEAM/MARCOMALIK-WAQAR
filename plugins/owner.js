// ============================================
// 👑 OWNER - §࿐ PRIYANKA ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶
// 👑 Developer: MARCO MALIK-ᴍᴅ
// 💖 Boys Power Mode: ON
// 📌 Owner info + Developer commands
// ============================================

const { waqar } = require('../waqar');
const { sendInteractiveMessage } = require('gifted-btns');
const config = require('../config');
const fs = require('fs');
const path = require('path');
const { runtime, sleep } = require('../lib/functions');

// ============================================
// 📌 DEVELOPER INFO
// ============================================
const DEV_INFO = {
    name: "Priyanka-MD",
    number: "919696889063",
    channel: "https://whatsapp.com/channel/0029VaAdfelLo4hmxqa7l72g",
    group: "https://chat.whatsapp.com/Cv2Bg7co5v8EVe0CyEcdSw?s=cl&p=a&mlu=4&ilr=4&iam=2",
    github: "https://whatsapp.com/channel/0029VaAdfelLo4hmxqa7l72g",
    telegram: "https://t.me/sp.king9839",
};

// ============================================
// 👑 OWNER / DEVELOPER INFO COMMAND
// ============================================
waqar({
    pattern: "owner",
    alias: ["creator", "dev", "developer", "about"],
    desc: "🌸 Get developer/owner information",
    category: "info",
    react: "👑",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const uptime = runtime(process.uptime());
        const botName = config.BOT_NAME || "🌸 §࿐ PRIYANKA ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 🌸";

        const text = `
╭═══✿══════════════╗
│  ✿ 👑 𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥 ✿
│  ✿━━━━━━━━━━━━━━━✿
│  ✿ 🤖 Bot: ${botName}
│  ✿ 👤 Name: ${DEV_INFO.name}
│  ✿ 📱 Contact: ${DEV_INFO.number}
│  ✿ ⏳ Uptime: ${uptime}
╰═══✿══════════════╝

💖 *Contact Developer:*
wa.me/${DEV_INFO.number}

💖 *Join Channel:*
${DEV_INFO.channel}

💖 *Join Group:*
${DEV_INFO.group}

💖 *GitHub:*
${DEV_INFO.github}

💖 *Website:*
${DEV_INFO.website}

🌸 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 §࿐ PRIYANKA ♞ᴮᴼˢˢ 𝗠𝗗 𝗠𝗶𝗻𝗶 💖
        `.trim();

        // ── Send with Buttons ──
        await sendInteractiveMessage(conn, from, {
            text: text,
            footer: `💖 ${botName}`,
            interactiveButtons: [
                {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: '📱 CONTACT OWNER',
                        url: `https://wa.me/${DEV_INFO.number}`
                    })
                },
                {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: '🎀 CHANNEL',
                        url: DEV_INFO.channel
                    })
                },
                {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: '👥 GROUP',
                        url: DEV_INFO.group
                    })
                },
                {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: '💻 GITHUB',
                        url: DEV_INFO.github
                    })
                },
                {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: '🌐 WEBSITE',
                        url: DEV_INFO.website
                    })
                }
            ]
        });

    } catch (error) {
        console.error('🌸 Owner Error:', error);
        reply(`❌ Error: ${error.message}`);
    }
});

// ============================================
// 👑 SHUTDOWN / RESTART COMMAND
// ============================================
waqar({
    pattern: "shutdown",
    alias: ["restart", "reboot"],
    desc: "👑 Restart the bot (Owner only)",
    category: "owner",
    react: "🔄",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("🌸 *Access Denied!* 💕\n\nOnly owner can use this command.");

    await reply("🔄 *Restarting bot...* Please wait! 💖");
    await sleep(2000);
    process.exit(0);
});
