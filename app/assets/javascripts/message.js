$(function() {
  function buildHTML(message){
    var image = message.image.url ? `<img id="message__image" src="${message.image.url}"/>` : "";
    var html =  `<div class='message' 'data-message_id=${message.id}'>
                  <div class='info'>
                    <p class='info__user'>
                    ${message.user_name}
                    </p>
                    <p class='info__date'>
                      ${message.created_at}
                    </p>
                  </div>
                  <div class='message__text'>
                    <p class='lower-message__content'>
                    ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  };

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    });
  });

  var buildMessageHTML = function(message) {
    var image = message.image.url ? `<img src="${message.image.url}" class="lower-message__image" />` : "";
    var html = `<div class="message new-message" data-message_id="${message.id}">
                  <div class="info">
                    <p class="info__user">${message.user_name}</p>
                    <p class="info__date">${message.created_at}</p>
                  </div>
                  <div class="message__text">
                    <p class="lower-message__content">${message.content}</p>
                    ${image}
                  </div>
                </div>`
    return html;
    };


  var reloadMessages = function() {
    last_message_id = $('.message:last').data('message_id');
    path = location.pathname;
    url = path.replace('messages', 'api/messages')
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insartHTML = '';
      messages.forEach(function(message){
          insartHTML = buildMessageHTML(message);
          $(".messages").append(insartHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      });
    })
    .fail(function() {
    });
  };

  $(function(){
  if (location.pathname.match(/messages/)) {
    setInterval(reloadMessages, 5000);
  } else {
    clearInterval(reloadMessages);
  };
  });
});
