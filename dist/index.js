"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var socket_io_1 = require("socket.io");
var app = (0, express_1.default)();
app.set('port', process.env.PORT || 3000);
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
var server = app.listen(app.get('port'), function () {
    console.log('Server on port', app.get('port'));
});
var io = new socket_io_1.Server(server);
io.on('connection', function (socket) {
    console.log('new connection', socket.id);
});
