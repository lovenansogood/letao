$(function () {

  render();

  function getHistory() {
    var jsonStr = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(jsonStr);

    return arr;
  }

  function render() {
    var arr = getHistory();

    var htmlStr = template('searchTpl', {arr: arr});

    $('.lt_history').html(htmlStr);
  }


  $('.lt_history').on('click', '.btn_empty', function () {

    mui.confirm("你确定要清空历史记录吗?", "文星提示", ["取消", "确认"], function (e) {
      console.log(e);
      // e.index 就是点击的按钮的下标
      if (e.index === 1) {
        // 确认
        // 清空历史
        localStorage.removeItem("search_list");
        // 重新渲染
        render();
      }
    })

  })


  $('.lt_history').on('click', '.btn_delete', function () {

    var index = $(this).data('index');

    var arr = getHistory();

    arr.splice(index, 1);

    localStorage.setItem('search_list', JSON.stringify(arr));

    render();


  })



  $('.search_btn').click(function () {

    var key = $('.search_input').val().trim();

    if (key === '') {
      mui.toast('请输入搜索关键字');
      return;
    }

    var arr = getHistory();

    var index = arr.indexOf(key);

    if (index !== -1) {
      arr.splice(index, 1);
    }

    if (arr.length >= 10) {
      arr.pop();
    }

    arr.unshift(key);

    localStorage.setItem('search_list', JSON.stringify(arr));

    render();

    $('.search_input').val('');


  })


})

