const REQUEST_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
  'Accept-Language': 'en',
}
var startTime = Date.now()
console.log(startTime)

;(async () => {
  let panel_result = {
    title: '网络连通性测试',
    content: '',
    icon: 'play.circle',
    'icon-color': '#00BC12',
  }

  await Promise.all([check_youtube_premium()])
    .then((result) => {
      let content = result.join('   ')
      panel_result['content'] = content
    })
    .finally(() => {
      $done(panel_result)
    })
})()

async function check_youtube_premium() {
  let inner_check = () => {
    return new Promise((resolve, reject) => {
      let option = {
        url: 'https://www.youtube.com/premium',
        headers: REQUEST_HEADERS,
      }
      $httpClient.get(option, function (error, response, data) {
        var endTime = Date.now()
        console.log(endTime)
        console.log(endTime-startTime)
        if (error != null || response.status !== 200) {
          reject('Error')
          return
        }

        let region = ''
        let re = new RegExp('"countryCode":"(.*?)"', 'gm')
        let result = re.exec(data)
        if (result != null && result.length === 2) {
          region = result[1]
        } else if (data.indexOf('www.google.cn') !== -1) {
          region = 'CN'
        } else {
          region = 'US'
        }
        resolve(region)
      })
    })
  }

  let youtube_check_result = ''

  await inner_check()
    .then((code) => {
      if (code === 'Not Available') {
        youtube_check_result += '油管未解锁'
      } else {
        youtube_check_result += '油管解锁：' + code.toUpperCase()
      }
    })
    .catch((error) => {
      youtube_check_result += '检测失败'
    })

  return youtube_check_result
}
