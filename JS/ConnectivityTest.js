const REQUEST_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
  'Accept-Language': 'en',
}
setInterval("ping++",1);
;(async () => {
  let panel_result = {
    title: '网络连通性测试',
    content: '',
    icon: 'play.circle',
    'icon-color': '#00BC12',
  }
  await Promise.all([check_baidu(), check_youtube()])
    .then((result) => {
      let content = result.join('   ')
      panel_result['content'] = content
    })
    .finally(() => {
      $done(panel_result)
    })
})()

async function check_youtube() {
  let inner_check = () => {
    return new Promise((resolve, reject) => {
      let option = {
        url: 'https://www.youtube.com',
        headers: REQUEST_HEADERS,
      }
      ping = 0
      $httpClient.get(option, function (error, response, data) {      
      })
      let delay = ''
      delay = '${ping}ms$'
    })
  }

  let youtube_check_result = ''

  youtube_check_result += 'Youtube：' + delay


  return youtube_check_result
}

async function check_netflix() {
  let inner_check = (filmId) => {
    return new Promise((resolve, reject) => {
      let option = {
        url: 'https://www.netflix.com/title/' + filmId,
        headers: REQUEST_HEADERS,
      }
      $httpClient.get(option, function (error, response, data) {
        if (error != null) {
          reject('Error')
          return
        }

        if (response.status === 403) {
          reject('Not Available')
          return
        }

        if (response.status === 404) {
          resolve('Not Found')
          return
        }

        if (response.status === 200) {
          let url = response.headers['x-originating-url']
          let region = url.split('/')[3]
          region = region.split('-')[0]
          if (region == 'title') {
            region = 'us'
          }
          resolve(region)
          return
        }

        reject('Error')
      })
    })
  }

  let netflix_check_result = ''

  await inner_check(81215567)
    .then((code) => {
      if (code === 'Not Found') {
        return inner_check(80018499)
      }
      netflix_check_result += '奈飞解锁：' + code.toUpperCase()
      return Promise.reject('BreakSignal')
    })
    .then((code) => {
      if (code === 'Not Found') {
        return Promise.reject('Not Available')
      }

      netflix_check_result += '奈飞自制 ➟ ' + code.toUpperCase()
      return Promise.reject('BreakSignal')
    })
    .catch((error) => {
      if (error === 'BreakSignal') {
        return
      }
      if (error === 'Not Available') {
        netflix_check_result += '奈飞无法观看'
        return
      }
      netflix_check_result += '检测失败'
    })

  return netflix_check_result
}
