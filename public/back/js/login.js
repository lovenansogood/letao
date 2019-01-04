

$(function () {

    // 进行校验表单初始化
    $('#form').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },



        fields: {
            username: {
                // 校验规则
                validators: {
                    // 非空校验
                    notEmpty: {
                        message: '用户名不能为空'
                    },

                    // 长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须是2-6位'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                // 校验规则
                validators: {
                    // 非空校验
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    // 长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须是2-6位'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
            
        }

    })



    // 2.我们需要用到插件的校验功能,所以要用submit按钮
    // ,所以需要注册表单校验成功事件,在事件中,组织默认的提交(防止跳转),通过ajax提交即可

    // 注册表单校验成功时间

    $('#form').on('success.form.bv', function (e) {

        // 阻止默认的提交
        e.preventDefault();

        // 通过ajax提交

        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $('#form').serialize(),
            dataType: "json",
            success: function (info) {
                if (info.error === 1000) {
                    // alert('用户名不存在');
                    // 调用插件实例方法 更新校验状态成失败,提示用户
                    $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                    return;
                }
                if (info.error === 1001) {
                    // alert('密码错误');
                    $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');

                    return;
                }
                if (info.success) {
                    location.href = 'index.html';
                    return;
                }
            }
        });

    })


    // 3.重置功能.
    //  默认 type='reset' 按钮, 只会重置表单内容
    // 此时,内容和校验状态都需要重置,需要调用插件的实例方法
    // $('#form').data('bootstrapValidator')创建插件实例
    // resetForm() 不传参  只重置校验状态
    // resetForm(true) 传true , 内容和状态都重置

    $('[type="reset"]').click(function () {

        $('#form').data('bootstrapValidator').resetForm();

    })

});