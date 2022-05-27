/**
* 脚本综合@congcong大佬与@fishingworld大佬，参考文件地址：https://github.com/congcong0806/surge-list/blob/master/Script/ipcheck.js与https://github.com/fishingworld/something/blob/main/PanelScripts/net_info.js
*感谢大佬们的智慧
*/
;(async () => {
let url = "http://ip-api.com/json/?lang=zh-CN"
let params = getParams($argument)
//获取根节点名
let proxy = await httpAPI("/v1/policy_groups");
let allGroup = [];
for (var key in proxy){
   allGroup.push(key)
    }
let group = params.group
let rootName = (await httpAPI("/v1/policy_groups/select?group_name="+encodeURIComponent(group)+"")).policy;
while(allGroup.includes(rootName)==true){
	rootName = (await httpAPI("/v1/policy_groups/select?group_name="+encodeURIComponent(rootName)+"")).policy;
}

$httpClient.get(url, function(error, response, data){
    let jsonData = JSON.parse(data)
    let country = jsonData.country
    let emoji = getFlagEmoji(jsonData.countryCode)
    let city = jsonData.city
    let isp = jsonData.isp
    let ip = jsonData.query
    let datacentre = jsonData.org
  body = {
    title: rootName,
    content: `地理位置: ${country} - ${city}\n` + `IP信息: ${ip}\n` + `运营商: ${isp}\n` + `数据中心: ${datacentre}\n`,
    icon: params.icon,
    "icon-color":params.color
  }
  $done(body);
});
})();

function httpAPI(path = "", method = "GET", body = null) {
    return new Promise((resolve) => {
        $httpAPI(method, path, body, (result) => {
            resolve(result);
        });
    });
};

function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function getParams(param) {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
