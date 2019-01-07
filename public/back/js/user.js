$(function () {

    var currentId;  // 当前操作的用户id
    var isDelete; // 当前需要修改用户的状态

    // 1. 一进入页面, 发送 ajax 请求, 获取数据, 进行模板引擎渲染
    var currentPage = 1;
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                //var htmlStr = template("模板id", "数据对象")
                var htmlStr = template("tpl", info);
                $('tbody').html(htmlStr);


                // 分页初始化
                $('#paginator').bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),
                    // 添加页码点击事件
                    onPageClicked: function (a, b, c, page) {
                        // 更新到 page 页
                        currentPage = page;
                        // 重新调用 render() 渲染
                        render();
                    }
                })
            }
        });
    }


    $('tbody').on('click', '.btn', function () {

        $('#userModal').modal('show');

        currentId = $(this).parent().data('id');

        isDelete = $(this).hasClass('btn-danger') ? 0 : 1;

    })

    $('#submitBtn').click(function () {
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id: currentId,
                isDelete: isDelete
            },
            dataType: 'json',
            success: function (info) {
                if (info.success) {
                    $('#userModal').modal('hide');

                    render();
                }
            }
        })

    })


})


