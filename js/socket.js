let socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('connect');
  $('#send').click(function () {
    let name = $("#name").val(),
      email = $("#email").val(),
      data = {
        name: name,
        email: email
      };
    socket.emit('new_chat', data);
  });

  $('#send_message').click(function () {
    let message = $("#message").val(),
      data = {
        message: message
      };
    socket.emit('send_message', data);
    $("#message").val("");
  });
});