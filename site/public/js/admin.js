

$(function () {
  $.ajax({
    type: 'get',
    url: '/user',
    success: function (data) {
      data.forEach(function (v) {
        $('<tr data-id="' + v.id + '"><td>' + v.id + '</td><td><input  type="text" class="form-control name" value="' + v.name + '"/></td><td><input type="text" class="form-control phone" value="' + v.phone + '"/></td><td class="delete">x</td></tr>')
          .appendTo('tbody');
      })
    }
  });
  $('#plus').on('click', function () {
    $.ajax({
      url: '/user',
      type: 'post',
      success: function (data) {
        $('<tr data-id="' + data.id + '"><td>' + data.id + '</td><td><input  type="text" class="form-control name" value=""/></td><td><input type="text" class="form-control phone" value=""/></td><td class="delete">x</td></tr>')
          .appendTo('tbody');
      }
    })
  });
  var t;
  $('tbody').on('keyup', '.form-control', function () {
    var data = {};
    data.id = $(this).closest('tr').attr('data-id');
    if ($(this).hasClass('name')) {
      data.name = $.trim($(this).val());
    } else if ($(this).hasClass('phone')) {
      data.phone = $.trim($(this).val());
    } else {
    }
    // 节流
    clearTimeout(t);
    t = setTimeout(function () {
      $.ajax({
        url: '/user',
        type: 'put',
        data: data,
        success: function (r) {
          console.log('更新成功');
        }
      })
    }, 200);
  });

     $('tbody').on('click', '.delete', function () {
       var tr = $(this).closest('tr');
       $.ajax({
         url: '/user',
         type: 'delete',
         data: {id: tr.attr('data-id')},
         success: function (data) {
           if (data.state === 'ok') {
             tr.remove();
           }
         }
       })
     });
});

