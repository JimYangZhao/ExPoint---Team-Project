saveEditorLevel = function (key, level){

    var socket = io();

    levelToSave = new editorLevel(key,level.cols,level.rows,level.tsize,level.layers,level.playerPos);

    socket.emit("saveLevel",levelToSave);
}