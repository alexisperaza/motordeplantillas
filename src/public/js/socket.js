const socket = io()

socket.emit('message', 'hola me estoy comunicando desde un webSocket');

socket.on('evento_para_socket_individual', data => console.log(data))

socket.on('evento_para_todos_menos_el_socket_actual', data => console.log(data))