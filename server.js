import express from 'express';
import path from 'path';
import morgan from 'morgan';
import sassMiddleware from 'node-sass-middleware';

const server = express();


//setting up express
server.use(morgan('dev'));

server.set('view engine', 'ejs');
server.use(express.static('public'));

server.use(sassMiddleware({
 src: path.join(__dirname, 'sass'),
 dest: path.join(__dirname, 'public'),
 debug: true 
}));


server.get('/upload', (req, res) => {
	res.render('index', {
        content: '...'
    });
});


server
.listen(8080, () => {
  console.info('Express listening on port', 8080);
});