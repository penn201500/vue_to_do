import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ElementUI from 'element-ui'
import vueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/table.css'

Vue.use(vueResource, vueResource)
Vue.use(Router)
Vue.use(ElementUI)

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
