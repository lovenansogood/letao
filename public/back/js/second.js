$(function () {

    // 定义当前页和总页数
    var currentPage = 1;
    var pageSize = 5;
    // 1. 一进入页面, 渲染第一页
    render();

    function render() {
        // 发送ajax, 进行渲染
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function( info ) {
                console.log( info );
                var htmlStr = template( "secondTpl", info );
                $('tbody').html( htmlStr );

                // 根据后台返回的数据, 进行分页初始化
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,  // 版本号
                    currentPage: info.page,  // 当前页
                    totalPages: Math.ceil( info.total / info.size ), // 总页数
                    onPageClicked: function( a, b, c, page ) {
                        // 更新当前页
                        currentPage = page;
                        // 重新渲染
                        render();
                    }
                })
            }
        })
    }


    $('#addBtn').click(function () {
        $('#addModal').modal('show');

        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (info) {
                var htmlStr = template('dropdownTpl', info);

                $('.dropdown-menu').html(htmlStr);
            }
        })
    })

    $('.dropdown-menu').on('click', 'a', function () {

        var txt = $(this).text();

        $('#dropdownText').text(txt);

    })

    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            var picUrl = data.result.picAddr;

            $('#imgBox img').attr('src', picUrl);
        }
    })







})