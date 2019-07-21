$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
      // var insertImage = '';
      // if (message.image.url) {
      //     insertImage = `<img src="${message.image.url}">`;
      // }
      // var insertImage = (message.image)? `<image class="lower-message__image" src="${message.image}">`:"";
      // var image = ""
      // message.image ? image = `<img src="${message.image}">` : image = ""

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
    // $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight }, 'fast');
    // $('.chat__contents').animate({ scrollTop: $(".chat__contents")[0].scrollHeight }, 'fast');
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
      .done(function (data) {
        var html = buildHTML(data);
        $('.chat__contents').append(html);
        // scroll_view()
        $('#message_content').val("");
        $('#new_message')[0].reset();
        // $('.form').val("");
        // $('.form__textfield').val('');
        $('.form__submit').prop('disabled', false);
        $('.chat__contents').animate({ scrollTop: $(".chat__contents")[0].scrollHeight }, 'fast');
    })
    .fail(function () {
        alert('エラーが発生したためメッセージは送信できませんでした。');
    });
  })
  // return false;
});