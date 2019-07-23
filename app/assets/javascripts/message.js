$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
      var image = (message.image.url)? `<img class="lower-message__image" src="${message.image.url}">`:"";
      var html =`<div class="chat__contents__content" data-message-id=${message.id}>
                  <div class="chat__contents__content-top">
                    <div class="chat__contents__content-top__user">
                      ${message.user_name}
                    </div>
                    <div class="chat__contents__content-top__timestamp">
                      ${message.created_at}
                    </div>
                    <div class="chat__contents__content-top__text">
                      <p class="chat__contents__content-top__image">
                        ${message.content}
                      </p>
                    </div>
                    ${image}
                  </div>
                </div>`;
      return html;
  }
  function scroll_view() {
  }

  //メッセージ非同期
  $('#new_message').on('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr("action");

      $.ajax({
          url: url,
          type: "POST",
          data: formData,
          dataType: 'json',
          processData: false,
          contentType: false
      })
      .done(function (messages) {
        var html = buildHTML(messages);
        $('.chat__contents').append(html);
        $('#message_content').val("");
        $('#new_message')[0].reset();
        $('.form__submit').prop('disabled', false);
        $('.chat__contents').animate({ scrollTop: $(".chat__contents")[0].scrollHeight }, 'fast');
    })
    .fail(function () {
        alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  });

        //自動更新
    var reloadMessages = setInterval(function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.chat__contents__content:last').data('message-id')
        var group_id = $('.chat__info-left__name').data('id');
        var href = "/groups/" + group_id + "/api/messages";
        $.ajax({
          url: href,
          type: "GET",
          data: {last_id: last_message_id},
          dataType: "json",
        })
        .done(function(messages) {
          messages.forEach(function(message) {
            var insertHTML = buildHTML(message)
            $('.chat__contents').append(insertHTML)
            $('.chat__contents').animate({scrollTop: $('.chat__contents')[0].scrollHeight}, 'fast');
          })
        })
          .fail(function(messages) {
            alert('自動更新に失敗しました');
            // console.log("自動更新失敗しました")
          });
        } else {
            clearInterval(reloadMessages);
          }
    } , 5000 );
  });