$(document).on('turbolinks:load', function() {
  function buildHTML(message) {

      var image = (message.image.url) ? `<img class="lower-message__image" src="${message.image.url}">`:"";

      var html =`<div class="chat__contents__content">
                  <div class="chat__contents__content-top">
                    <div class="chat__contents__content-top__user">
                      ${message.name}
                    </div>
                    <div class="chat__contents__content-top__timestamp">
                      ${message.date}
                    </div>
                    <div class="chat__contents__content-top__text">
                      <p class="chat__contents__content-top__image">
                        ${message.content}
                      </p>
                      ${image}
                    </div>
                  </div>
                </div>`;
      return html;
  }
  function scroll_view() {
  }


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
    });
  })
});