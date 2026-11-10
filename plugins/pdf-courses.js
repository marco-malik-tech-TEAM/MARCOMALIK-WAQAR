// ============================================
// 📚 PDF COURSES - lookup course links from data/courses.json
// 👑 Developer: MARCO MALIK MD | Bot made for WAQAR
// Commands: pdfsettings, pdfurl <name>, pdflist [page], metaverify
// ============================================
const path = require('path');
const fs = require('fs');
const { waqar } = require('../waqar');
const config = require('../settings');

const DATA = path.join(__dirname, '..', 'data', 'courses.json');
let courses = [];
try { courses = JSON.parse(fs.readFileSync(DATA, 'utf8')); }
catch (e) { console.log('[PDF] courses.json load error:', e.message); }

const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9\u0600-\u06ff ]+/g, ' ').replace(/\s+/g, ' ').trim();
const BRAND = `> Priyanka| ${config.OWNER_NAME || 'Priyanka MD'}`;

function search(q) {
    const words = norm(q).split(' ').filter(Boolean);
    if (!words.length) return [];
    return courses
        .map(c => {
            const n = norm(c.name);
            const hit = words.filter(w => n.includes(w)).length;
            return { c, hit, exact: n.includes(norm(q)) };
        })
        .filter(x => x.hit === words.length || x.exact)
        .sort((a, b) => (b.exact - a.exact) || (a.c.name.length - b.c.name.length))
        .map(x => x.c);
}

waqar({
    pattern: 'pdfsettings',
    alias: ['pdfmenu', 'pdfcmds', 'menu_pdf'],
    desc: 'Show all PDF course commands',
    category: 'pdf',
    react: '📚',
    filename: __filename
}, async (conn, mek, m, { reply, prefix }) => {
    const p = prefix || config.PREFIX || '.';
    reply(`╭───〔 📚 *PDF SETTINGS* 〕───◇
│ Total courses: *${courses.length}*
│
│ ${p}pdfsettings — ye menu (saari PDF commands)
│ ${p}pdfurl <course name> — course ka link
│    misal: ${p}pdfurl youtube automation
│ ${p}pdflist [page] — saare courses ki list
│ ${p}metaverify — Meta Verification link
╰────────────────○

${BRAND}`);
});

waqar({
    pattern: 'pdfurl',
    alias: ['pdf', 'courseurl'],
    desc: 'Get course link by name from the PDF list',
    category: 'pdf',
    react: '🔗',
    filename: __filename
}, async (conn, mek, m, { q, reply, prefix }) => {
    const p = prefix || config.PREFIX || '.';
    if (!q) return reply(`📚 Course ka naam likhein.\nMisal: *${p}pdfurl youtube automation*\nSaari list: *${p}pdflist*`);
    const res = search(q);
    if (!res.length) return reply(`❌ "${q}" naam ka course nahi mila.\n*${p}pdflist* se list dekhein.`);
    const top = res.slice(0, 5);
    const body = top.map((c, i) => `*${i + 1}. ${c.name}*\n🔗 ${c.url}`).join('\n\n');
    reply(`📚 *PDF URL* — ${res.length} result${res.length > 1 ? 's' : ''}\n\n${body}${res.length > 5 ? `\n\n➕ ${res.length - 5} aur — naam thoda lamba likhein.` : ''}\n\n${BRAND}`);
});

waqar({
    pattern: 'pdflist',
    alias: ['courselist'],
    desc: 'List all courses (paged)',
    category: 'pdf',
    react: '📋',
    filename: __filename
}, async (conn, mek, m, { q, reply, prefix }) => {
    const p = prefix || config.PREFIX || '.';
    const per = 25;
    const pages = Math.max(1, Math.ceil(courses.length / per));
    const page = Math.min(Math.max(parseInt(q) || 1, 1), pages);
    const list = courses.slice((page - 1) * per, page * per)
        .map((c, i) => `${(page - 1) * per + i + 1}. ${c.name}`).join('\n');
    reply(`📋 *COURSES* (page ${page}/${pages})\n\n${list}\n\nAgla page: *${p}pdflist ${Math.min(page + 1, pages)}*\nLink ke liye: *${p}pdfurl <name>*\n\n${BRAND}`);
});

waqar({
    pattern: 'metaverify',
    alias: ['metaverified', 'metaverification'],
    desc: 'Meta Verification link',
    category: 'pdf',
    react: '✅',
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const res = search('meta verification');
    if (!res.length) return reply('❌ Meta Verification entry nahi mili.');
    reply(`✅ *META VERIFICATION*\n\n🔗 ${res[0].url}\n\n${BRAND}`);
});
