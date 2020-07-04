import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ElementUI from 'element-ui'
import vueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/table.css'
import axios from 'axios'

Vue.use(vueResource, vueResource)
Vue.use(Router)
Vue.use(ElementUI)
Vue.prototype.$axios = axios // 全局注册，使用方法为:this.$axios
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = 'csrftoken'

export default new Router({
  proxyTable: {
    '/': {
      target: 'http://127.0.0.1:8000/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
