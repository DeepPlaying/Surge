!(async () => {
    let panel = { title: "Connectivity TestS" },
        showServer = true,
        dnsCache;
    if (typeof $argument != "undefined") {
        let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=")));
        if (arg.title) panel.title = arg.title;
        if (arg.icon) panel.icon = arg.icon;
        if (arg.color) panel["icon-color"] = arg.color;
        if (arg.server == "false") showServer = false;
    }
    if ($trigger == "button") delay = measureBW();
    let delay = measureBW();
    panel.content = `Delay: ${delay}ms`;
    $done(panel);
})();

function httpAPI(path = "", method = "POST", body = null) {
    return new Promise((resolve) => {
        $httpAPI(method, path, body, (result) => {
            resolve(result);
        });
    });
}

function measureBW() {
    var startTime, endTime, fileSize;

    var xhr = new XMLHttpRequest();
    startTime = Date.now();
    xhr.open('GET', 'www.baidu.com', true);
    endTime = Date.now();
    delay = endTime - startTime;
    return delay
}

