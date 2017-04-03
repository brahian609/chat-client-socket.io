let socket = io('http://192.168.81.32:3001');

var socket_id;

socket.on('connect', () => {
  socket_id = socket.id;
  this.setChannel(socket_id);
  socket.emit('channel', socket_id);
  $('#send').click(function () {
    let name = $("#name").val(),
      email = $("#email").val(),
      message = $("#message_contact").val(),
      date = new Date(),
      hour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      data = {
        name: name,
        email: email,
        message: message,
        channel: socket_id
      };
    socket.emit('new_chat', data, (response) => {
      if (response) {
        $("#contact").hide();
        $('#message').show();

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
      }
    });
  });
});

setTimeout(function () {
  let channel = this.getChannel();
  console.log('channel');
  console.log(channel);
  let socketChannel = io(`http://192.168.81.32:3001/channel-${channel}`);

  $('#message').on('keyup', function (event) {
    if (event.which === 13) {
      let message = $(this).val(),
        date = new Date(),
        hour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        data = {
          message: message
        };
      socketChannel.emit('send_message', data);

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

  socketChannel.on('receiveMessage', (data) => {
    let $chat = $("#chat"),
      date = new Date(),
      hour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    $chat.append(`
       <div class="row msg_container base_receive">
          <div class="col-xs-10 col-md-10">
              <div class="messages msg_receive">
                  <p>${data.message}</p>
                  <time datetime="2009-11-13T20:00">${hour}</time>
              </div>
          </div>
       </div>
     `);
  });

}, 200);

function setChannel(channel) {
  this.channel = channel;
}

function getChannel() {
  return this.channel;
}