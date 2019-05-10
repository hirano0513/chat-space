$(function() {
  function buildHTML(message){
    var image = message.image.url ? <img id="message__image" src="${message.image.url}" /> : "";
    var html =  `<div class='message'>
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
  }

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
    })
  })
});
