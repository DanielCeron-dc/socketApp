import express from 'express';
import path from 'path';
import  {Server} from 'socket.io';

const app = express();

//settings

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
