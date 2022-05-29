import express from 'express';
import path from 'path';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

//settings

const setReloadBrowser = async () => {
	console.log('reload browser');
	const livereload = (await import('livereload')).default;
	const connectLivereload = (await import('connect-livereload')).default;
	// open livereload high port and start to watch public directory for changes
	const liveReloadServer = livereload.createServer();
	liveReloadServer.watch(path.join(__dirname, 'src' , 'public'));

	// ping browser on Express boot, once browser has reconnected and handshaken
	liveReloadServer.server.once("connection", () => {
		console.log("Livereload server connected");
		setTimeout(() => {
			liveReloadServer.refresh("/");
		}, 100);
	});

	// monkey patch every served HTML so they know of changes
	app.use(connectLivereload());
}

if (process.env.NODE_ENV === 'development') {
	setReloadBrowser();
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
