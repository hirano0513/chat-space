$(function() {

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.user_name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</div>
                </div>`
    return html
  }

  function appendMember(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    return html
  };

  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {search: input},
      dataType: 'json'
    })
    .done(function(data) {
      $("#user-search-result").empty();
      if (data.length !== 0 && input.length !== 0) {
        data.forEach(function(data) {
          var html = appendUser(data);
          $("#user-search-result").append(html);
        });
      }
      else {
        $("#user-search-result").append("一致するユーザーが見つかりません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $(document).on("click", ".user-search-add", function() {
    $(this).parent().remove();
    user_id = $(this).data("user-id");
    user_name = $(this).data("user-name");
    html = appendMember(user_id, user_name);
    $(".chat-group-users").append(html);
  });
  $(document).on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  });
});


