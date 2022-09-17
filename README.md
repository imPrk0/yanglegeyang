# 刷羊了个羊

###### Author: Prk
###### 开源许可：`MIT`

因该游戏仅限中共国，所以文档使用中文。  
**Since the game is limited to People's Republic China, the documentation is in Chinese.**


## 使用方法

自己研究。


## 原理

t的默认值：

``` text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQzMjcyNDYsIm5iZiI6MTY2MzIyNTA0NiwiaWF0IjoxNjYzMjIzMjQ2LCJqdGkiOiJDTTpjYXRfbWF0Y2g6bHQxMjM0NTYiLCJvcGVuX2lkIjoiIiwidWlkIjo4MzU0MzAxNCwiZGVidWciOiIiLCJsYW5nIjoiIn0.5qpiRRjxwUmN1U8Qst8dFBMWMQyWi26DcfTgHIITZds
```

### 一、UID 获取 TOKEN 的方法

#### 0. 序言

为了方便大家，我为此封装了一个 API。  
大家只需要传参 `uid` 使用 `GET` 或 `POST` 请求方法到下面地址

``` url
https://api.cprk.cc/ylgy
```

一定是响应 JSON 格式  
如果返回的 JSON 中 `code` 的值是 `0` (Int) 那就是成功，`data` 的值就是 TOKEN (Str)  
否则就要看 JSON 中 `msg` 的值即报错信息 (Str)  
_我的 API 通常会对你的内容进行缓存 12 小时_

#### 1. 构造 `GET` 网络请求到下面地址：

``` url
https://cat-match.easygame2021.com/sheep/v1/game/user_info
```

#### 2. 然后传入 Query 参数（直接用 `?` 补在地址即可）

| 参数名         | 参数固定值 | 说明                      |
| :-----------: | :-------: | :----------------------: |
| uid           | _不固定_   | 你要查询 TOKEN 的账号 UID |
| t             | **请看上方“t的默认值”** | 含义不明 |
| content-type  | `application/json`  | 你可以试试别的值，比如 `application/javascript` 我反正懒的试 |
| User-Agent    | `Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.28(0x18001c26) NetType/WIFI Language/zh_CN`| 微信的 UA |

#### 3.响应内容

~_说实话响应头里的内容一点屁用都没有_~

##### 一、【**正常**】返回用户数据的情况

> 请拿 JSON 里面 `data` 里的 `wx_open_id` 的值并继续请求

``` json
{
  "err_code": 0,
  "err_msg": "",
  "data": {
    "id": "abcd1234",
    "created_at": "2022-13-32T25:60:60.666Z",
    "updated_at": "2022-13-32T25:60:60.666Z",
    "role": 2,
    "uid": 1234567,
    "gender": 0,
    "nick_name": "傻缺",
    "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/abcd1234/132",
    "wx_open_id": "oOYg25G_abcd1234",
    "wx_union_id": "abcd1234",
    "last_login_time": null,
    "last_logout_time": null,
    "charge_first_time": 0,
    "charge_last_time": 0,
    "charge_total": 0,
    "charge_times": 0
  }
}
```


##### 二、【**错误**】用户不存在的情况

> 其实到这里你也可以看到传回了两个 JSON
> 
> 我个人认为这是开发者在处理回调的时候没有做好
> 
> 因为传回的 JSON 的 KEY => VALUE 的 KEY 都是一样的
> 
> 你大可以直接解析传回的第一个 JSON 中的数据即可
> 
> 比如说出现了错误，错误的原因就可以 alert(res.err_msg)
> 
> 只有 `err_code` 不是 `0` 的情况下才会是错误的

``` json
{
  "err_code": 10007,
  "err_msg": "用户不存在",
  "data": null
}
{
  "err_code": 0,
  "err_msg": "",
  "data": null
}
```


**下面才是获取 TOKEN。所以你必须要保证刚刚已经成功获取！**

#### 4. 梅开二度

再次发起一个网络请求，只不过本次是 `POST` 请求到下面的地址：

``` url
https://cat-match.easygame2021.com/sheep/v1/user/login_tourist
```

并发送下面的表单数据

| 参数名         | 参数固定值 | 说明                      |
| :-----------: | :-------: | :----------------------: |
| uuid           | _不固定_   | 上一步你获取到的微信的 UUID ，也就是 `data` 中 `wx_open_id` 的值 |
| t             | **请看上方“t的默认值”** | 含义不明 |
| content-type  | `application/json`  | 你可以试试别的值，比如 `application/javascript` 我反正懒的试 |
| User-Agent    | `Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.28(0x18001c26) NetType/WIFI Language/zh_CN`| 微信的 UA |

_也就意味着你的请求头需要是 `content-type: application/x-www-form-urlencoded; charset=UTF-8`_

_因为到这一步我比较懒，所以只测试了成功情况下的响应值如下_

**这一步 `data` 里的 `token` 就是要拿的值**

``` json
{
  "err_code": 0,
  "err_msg": "",
  "data": {
    "openid": "oOYg25G_abcd1234",
    "token": "efbygc9823f6cg168923ecdfgx9843f",
    "uid": 123456
  }
}
```

### 二、开始无限刷次数

下面还是要发起网络请求，只需要同样的值重复提交即可。  
他们的狗屎服务器应该不会限制吧？  
如果限制了只能说明他妈死了，OK？

``` url
https://cat-match.easygame2021.com/sheep/v1/game/game_over
```

这也是 `GET` 请求，传 Query 参数。依旧意味着你可以通过 `?` 后补全参数

传值如下（懒的做表）：

`rank_score`    =>  `1`  
`rank_state`    =>  `1`  
`rank_time`     =>  `0`  
`rank_role`     =>  `1`  
`skin`          =>  `1`  
`t`             =>  **这里就是获取到的 TOKEN 的值**  
`content-type`  =>  `application/json`  
`User-Agent`    =>  `Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.28(0x18001c26) NetType/WIFI Language/zh_CN`

通常会返回：

``` json
{
  "err_code": 0,
  "err_msg": "",
  "data": 0
}
```

我依旧懒的去试失败
