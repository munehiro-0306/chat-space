$(function(){
  function buildHTML(message){
    if ( message.image ) {
     var html =
      `<div class="main__message-list" data-message-id=${message.id}>
         <div class="main__message-list__header">
           <div class="main__message-list__header__name">
             ${message.user_name}
           </div>
           <div class="main__message-list__header__date">
             ${message.created_at}
           </div>
         </div>
         <div class="main__message-list__text">
           <p class="lower-message__image">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="main__message-list" data-message-id=${message.id}>
         <div class="main__message-list__header">
           <div class=main__message-list__header__name>
             ${message.user_name}
           </div>
           <div class="main__message-list__header__date">
             ${message.created_at}
           </div>
         </div>
         <div class="main__message-list__text">
           <p class="lower-message__image">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
  };

   var reloadMessages = function(){
    var last_message_id = $('.main__message-list:last').data("message-id");
    console.log(last_message_id);
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
        $('.main').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
      })
    .fail(function(){
      alert('error');
    });
  };

$('#new_message').on('submit', function(e){
  console.log()
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    console.log(data)
    var html = buildHTML(data);
    $('.main').append(html);
    $('form')[0].reset();
    $('.main').animate({ scrollTop: $('.main')[0].scrollHeight});
    $(".submit-btn").prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
    });
  })

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
