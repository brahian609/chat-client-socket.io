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
    $("#contact").hide();
    $('#message').show();
  });

  $('#message').on('keyup', function (event) {
    if (event.which === 13) {
      let message = $(this).val(),
        date = new Date(),
        hour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        data = {
          message: message
        };
      socket.emit('send_message', data);

      let $chat = $("#chat");
      $chat.show();

      $chat.append(`
        <div class="row msg_container base_sent">
            <div class="col-xs-10 col-md-10">
                <div class="messages msg_sent">
                    <p>${message}</p>
                    <time datetime="2009-11-13T20:00">${hour}</time>
                </div>
            </div>
        </div>
      `);

      $(this).val('');
      return false;
    }
  });
});