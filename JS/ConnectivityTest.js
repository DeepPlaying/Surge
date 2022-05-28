const REQUEST_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
  'Accept-Language': 'en',
}

;(async () => {
  let panel_result = {
    title: '网络连通性测试',
    content: '',
    icon: 'play.circle',
    'icon-color': '#00BC12',
  }
  await Promise.all([test_youtube()])
    .then((result) => {
      let content = result.join('   ')
      panel_result['content'] = content
    })
    .finally(() => {
      $done(panel_result)
    })
})()

async function test_youtube() {
  let inner_check = () => {
    return new Promise((resolve, reject) => {
      let option = {
        url: 'https://www.youtube.com',
        headers: REQUEST_HEADERS,
      }
      startTime = (new Date()).getTime()
      $httpClient.get(option, function (error, response, data) {
        if (error != null || response.status !== 200) {
          reject('Error')
          return
        }
        Time = (new Date()).getTime() - startTime
        let delay = '5ms'
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
        youtube_check_result += '油管解锁：' + delay
      }
    })
    .catch((error) => {
      youtube_check_result += '检测失败'
    })

  return youtube_check_result
}
