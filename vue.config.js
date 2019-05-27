const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('views', resolve('src/views'))
      .set('api', resolve('src/api'))
  },
  devServer: {
    proxy: {
      '/recommend': {
        target: 'https://c.y.qq.com',   // 需要请求的地址
        changeOrigin: true,  // 是否跨域
        headers: {
          referer: 'https://y.qq.com',
          host: 'c.y.qq.com'
        },
        pathRewrite: {
          '^/recommend': '/'  // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
        }
      },
      '/disc': {
        target: 'https://c.y.qq.com',   // 需要请求的地址
        changeOrigin: true,  // 是否跨域
        headers: {
          referer: 'https://y.qq.com/n/yqq/playsquare',
          host: 'c.y.qq.com'
        },
        pathRewrite: {
          '^/disc': '/'  // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
        }
      },
      '/rank': {
        target: 'https://c.y.qq.com',   // 需要请求的地址
        changeOrigin: true,  // 是否跨域
        headers: {
          referer: 'https://m.y.qq.com',
          host: 'c.y.qq.com'
        },
        pathRewrite: {
          '^/rank': '/'  // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
        }
      },
      '/singer': {
        target: 'https://szc.y.qq.com',   // 需要请求的地址
        changeOrigin: true,  // 是否跨域
        headers: {
          referer: 'https://y.qq.com/portal/singer_list.html',
          host: 'c.y.qq.com'
        },
        pathRewrite: {
          '^/singer': '/'  // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
        }
      },
      '/vkey': {
        target: 'https://u.y.qq.com',   // 需要请求的地址
        changeOrigin: true,  // 是否跨域
        headers: {
          referer: 'https://y.qq.com/portal/singer_list.html',
          host: 'c.y.qq.com'
        },
        pathRewrite: {
          '^/vkey': '/'  // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
        }
      }
    }
  }
}
