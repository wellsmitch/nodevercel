const {doGet,doAdd,doUpdate,doDelete} = require("./commonCreateHttp")
const tableNames = [
 'codeList', 'ExternalLib', 'indexData','myInfo','OnlineUser','Role','x6List'
]

tableNames.forEach(tableName=> {
 doGet(tableName);
 doAdd(tableName);
 doUpdate(tableName);
 doDelete(tableName);
})