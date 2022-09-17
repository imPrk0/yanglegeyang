# 刷羊了个羊

因该游戏仅限中共国，所以文档使用中文。
**Since the game is limited to People's Republic China, the documentation is in Chinese.**


## 使用方法

自己研究。


## 原理

### 一、UID 获取 TOKEN 的方法

构造 `GET` 网络请求到下面地址：

``` url
https://cat-match.easygame2021.com/sheep/v1/game/user_info
```

然后传入 Query 参数（直接用 `?` 补在地址即可）

| 参数名         | 参数固定值 | 说明                      |
| :-----------: | :-------: | :----------------------: |
| uid           | *不固定*   | 你要查询 TOKEN 的账号 UID |
| t             | *不固定*   | 懒得解释  |
| content-type  | `application/json`  | 你可以试试别的值，比如 `application/javascript` 我反正懒的试 |
| User-Agent    | `Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.28(0x18001c26) NetType/WIFI Language/zh_CN`| 微信的 UA |
