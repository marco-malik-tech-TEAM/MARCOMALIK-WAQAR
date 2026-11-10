var commands = [];

function waqar(info, func) {
    var data = info;
    data.function = func;
    if (!data.pattern && data.cmdname) data.pattern = data.cmdname;
    if (!data.alias) data.alias = [];
    if (!data.dontAddCommandList) data.dontAddCommandList = false;
    if (!data.desc) data.desc = '';
    if (!data.fromMe) data.fromMe = false;
    if (!data.category) data.category = 'misc';
    commands.push(data);
    return data;
}

module.exports = { waqar, cmd: waqar, AddCommand: waqar, Function: waqar, commands };
