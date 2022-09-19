/**
 * Name: 刷羊了个羊前端交互
 * Author: Prk
 * Website: https://imprk.me/
 * Date: 2022-09-18 (GMT+8)
 * Time: 05:02 (AM, GMT+8)
 * Location: People's Republic of China
 */

/*===========================================

大部分内容已经在 GitHub 仓库中介绍的清清楚楚了
如果看不到请检查视力

地址：
https://github.com/BiliPrk/yanglegeyang

===========================================*/

// 定义可变变量
var num = 0;
var success = 0;
var fail = 0;

// 将可能用到的 本地存储 的值存储变量
let token = localStorage.getItem('prk_ylgy_token');
let uid = localStorage.getItem('prk_ylgy_uid');

// 将变量的值放入输入框
document.getElementById('token').value = token;
document.getElementById('uid').value = uid;

// UID 获取 Token 逻辑函数
function getToken() {
    // 直接用原生 fetch 发起网络请求，我的 API 没有那么矫情
    fetch(`https://api.cprk.cc/ylgy?uid=${document.getElementById('uid').value}`)
        .then(res => res.json())
        .then(json => {
            // 如果成功或失败 失败就把返回的失败原因提示出来
            if (0 === json.code) {
                // 修改输入框的值
                document.getElementById('token').value = json.data;
                // 将获取到的内容存起来，存一个月
                localStorage.setItem('prk_ylgy_token', json.data);
                // 再将 UID 存起来，存一个月0
                localStorage.setItem('prk_ylgy_uid', document.getElementById('uid').value);
                // 提示用户已经获取成功了
                alert('获取成功');
            } else alert(json.msg);
        });
}

// 发起请求函数
var sendReq = function() {
    // 每当有访问请求就加一次总次数
    num++;
    // 使用 jQuery 的 Ajax 发起请求
    $.ajax({
        url: `https://cat-match.easygame2021.com/sheep/v1/game/game_over?rank_score=1&rank_state=1&rank_time=0&rank_role=1&skin=1&t=${document.getElementById('token').value}&content-type=application%2Fjson&User-Agent=Mozilla%2F5.0%20(iPhone%3B%20CPU%20iPhone%20OS%2015_6%20like%20Mac%20OS%20X)%20AppleWebKit%2F605.1.15%20(KHTML%2C%20like%20Gecko)%20Mobile%2F15E148%20MicroMessenger%2F8.0.28(0x18001c26)%20NetType%2FWIFI%20Language%2Fzh_CN`,
        type: "GET",
        dataType: 'json',
        timeout: 3000,
        success: function(data) {
            // 成功了加一次成功此时
            if (0 === json.err_code) success++;
            // 失败了加一次失败次数
            else fail++;
        }
    });
    // 将最新的总次数写在页面上
    document.getElementById('content_alert').innerHTML = `我们的程式以为您完成了&nbsp;<b>${num}</b>&nbsp;次`;
    // 将最新的成功与失败次数写在页面上
    document.getElementById('alert').innerHTML = `最新战况<br />成功&nbsp;<b>${success}</b>&nbsp;次&nbsp;|&nbsp;失败&nbsp;<b>${fail}</b>&nbsp;次`;
    // 函数结束为了达到循环效果而调用自身
    setTimeout(sendReq(), 1000);
}

// 点击开始按钮
function start() {
    // 检查有没有 TOKEN 没有 TOKEN 提示用户不能为空
    if ('' === document.getElementById('token').value) return alert('TOKEN 不能为空！');
    // 有 TOKEN 开始循环
    else sendReq();
}