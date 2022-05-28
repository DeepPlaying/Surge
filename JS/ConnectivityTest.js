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

    if ($trigger == "button") await httpapi();
    let delay = ((await httpapi()).delay * 1000).toFixed(0);
    panel.content = `Youtube: ${delay}ms`;
    $done(panel);
})();

function httpapi() {
    return new Promise((resolve) => {
      let option = {
        url: 'https://www.youtube.com',
        headers: REQUEST_HEADERS,
      };
      $httpClient.get(option, function (error, response, data) {
        resolve(data);
      });
    });
}

