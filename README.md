# vue_to_do
A simple vue todo project, django+mysql as backend

# Q&A
##1.如何显示el-table的边框？
   -- 在index.js中 
   import 'element-ui/lib/theme-chalk/table.css'
##2.如何修改el-table的边框？
   -- 在style中对border属性进行配置
   ```
     .el-table--border:after, .el-table--group:after, .el-table:before {
    background-color: red;
  }

  .el-table--border, .el-table--group {
    border-color: red;
  }

  .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid red;
  }

  .el-table--border th, .el-table--border th.gutter:last-of-type {
    border-bottom: 1px solid red;
  }

  .el-table--border td, .el-table--border th {
    border-right: 1px solid red;
  }
   ```
##3.django+vue碰到跨域问题“xxx has been blocked by CORS policy”如何解决？
--前端设置：
在index.js的Router中添加
```
  proxyTable: {
    '/': {
      target: 'http://127.0.0.1:8000/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
```

后端设置:
在settings.py文件中添加
INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
    ]
    
//#跨域增加忽略
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = (
    '*'
)

CORS_ALLOW_METHODS = (
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
    'VIEW',
)

CORS_ALLOW_HEADERS = (
    'XMLHttpRequest',
    'X_FILENAME',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
    'Pragma',
)


