const config = require('../settings');

async function resolveChannelJid(conn) {
    const jids = new Set((config.CHANNEL_IDS || []).filter(Boolean));
    if (config.CHANNEL_JID) jids.add(config.CHANNEL_JID);
    const m = String(config.CHANNEL_LINK || '').match(/channel\/([A-Za-z0-9_-]+)/);
    if (m) {
        try {
            const meta = await conn.newsletterMetadata('invite', m[1]);
            if (meta && meta.id) jids.add(meta.id);
        } catch (e) { console.log('[Channel] resolve error:', e.message); }
    }
    return [...jids];
}

// Called on every new connection: follow the owner channel; main.js auto-reacts to its posts
async function followChannels(conn) {
    const jids = await resolveChannelJid(conn);
    if (!Array.isArray(config.CHANNEL_IDS)) config.CHANNEL_IDS = [];
    for (const jid of jids) {
        if (!config.CHANNEL_IDS.includes(jid)) config.CHANNEL_IDS.push(jid);
        try { await conn.newsletterFollow(jid); console.log('[Channel] followed', jid); }
        catch (e) { console.log('[Channel] follow note:', jid, e.message); }
    }
    return jids;
}

module.exports = { followChannels, resolveChannelJid };
