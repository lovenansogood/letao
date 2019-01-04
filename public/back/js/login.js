import { invalid } from "moment";

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
                    }
                }
            }
        }

    })


    

});