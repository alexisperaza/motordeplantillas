import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'

const app = express();

app.use(express.urlencoded({ extended: true }))

//motor de plantilla que se usara
app.engine('handlebars', handlebars.engine());
//indicar en donde estaran las vistas
app.set('views', __dirname + '/views')
//indicar el motor de plantilla
app.set('view engine', 'handlebars');

//resetear la carpeta public
app.use(express.static(__dirname + '/public'));

app.use('/', viewsRouter);


//levantar el server
const httpServer = app.listen(8080, () => console.log('Server running in port 8080'))

const sockerServer = new Server(httpServer);


//conection socket
sockerServer.on('connection', socket => {
    console.log("nuevo cliente conectado")

    //activando un evento
    socket.on('message', data=> {
        console.log(data);
    })

    socket.emit('evento_para_socket_individual','Este mensaje solo lo debe recibir el cliente')

    socket.broadcast.emit('evento_para_todos_menos_el_socket_actual','Se conecto otro cliente')
})

