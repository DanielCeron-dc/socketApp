import express from 'express';
import path from 'path';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

/* import livereload from 'livereload';
import connectLivereload from 'connect-livereload'; */

dotenv.config();


const app = express();

//settings

const setAutoReloadBrowser = async () => {
	//imports
	const livereload = require('livereload');
	const connectLivereload = require('connect-livereload');


	// open livereload high port and start to watch public directory for changes
	const publicDir = path.join(__dirname, 'public');
	const liveReloadServer = livereload.createServer();
	liveReloadServer.watch(publicDir);
	
	// ping browser on Express boot, once browser has reconnected and handshaken
	liveReloadServer.server.once("connection", () => {
		setTimeout(() => {
			liveReloadServer.refresh("/");
		}, 100);
	});
	
	// monkey patch every served HTML so they know of changes
	app.use(connectLivereload());
}

if (process.env.NODE_ENV === 'development') {
	setAutoReloadBrowser();
}



app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

// start server
const server = app.listen(app.get('port'), () => {
		console.log('Server on port', app.get('port'));
});


// socket.io
const io = new Server(server);

io.on('connection', (socket) => {
	console.log('new connection', socket.id);
})
