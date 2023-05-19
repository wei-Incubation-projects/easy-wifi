import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      uni(),
      AutoImport({
        imports: ['vue', 'uni-app'],
        dts: './auto-imports.d.ts' // 安装好依赖后，重新运行编译即可自动在根目录下生成此声明文件
      })
    ],
    server: {
      proxy: {
        '/api': {
          //'/api'是自行设置的请求前缀
          target: env.VITE_APP_URL,
          changeOrigin: true, //用于控制请求头中的host值
          rewrite: (path) => path.replace(/^\/api/, '') //路径重写，（正则）匹配以api开头的路径为空（将请求前缀删除）
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src') // 路径别名配置
      }
    },
    build: {
      // transpileDependencies: [/prequest/],
      rollupOptions: {
        external: ['/node_modules/(?!prequest)/']
      }
    }
  })
}
