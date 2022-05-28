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
    return new Promise((resolve) => {
      let option = {
        url: 'https://www.youtube.com',
        headers: REQUEST_HEADERS,
      }
      $httpClient.get(option, function (error, response, data) {
        resolve('1')
      })
    })
  }

  youtube_check_result =  'YouTube：' 
  startTime = Date.now()
  await inner_check()
    .then((code) => {
      endTime = Date.now()
      Delay = endTime-startTime +""
      if (code === '1') {
        youtube_check_result += Delay + 'ms'
      }
    })
  
  return youtube_check_result
}
