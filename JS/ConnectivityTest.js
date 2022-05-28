const REQUEST_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
  'Accept-Language': 'en',
}

!(async () => {
    let panel = { title: "网络连通性测试" };
    if (typeof $argument != "undefined") {
        let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
        if (arg.title) panel.title = arg.title;
        if (arg.icon) panel.icon = arg.icon;
        if (arg.color) panel["icon-color"] = arg.color;
        if (arg.server == "false") showServer = false;
    }

    if ($trigger == "button") await httpAPI("/v1/dns/flush");
    let delay = ((await httpAPI("/v1/test/dns_delay")).delay * 1000).toFixed(0);
    panel.content = `delay: ${delay}ms`;
    $done(panel);
})();

function httpAPI(path = "", method = "POST", body = null) {
    return new Promise((resolve) => {
        $httpAPI(method, path, body, (result) => {
            resolve(result);
        });
    });
}

