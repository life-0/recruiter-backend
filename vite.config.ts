import { UserConfigExport } from "vite"
import path, { resolve } from "path"
import vitePluginImp from "vite-plugin-imp"
import vue from "@vitejs/plugin-vue"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

/** 配置项文档：https://vitejs.dev/config */
export default (): UserConfigExport => {
  return {
    /** build 打包时根据实际情况修改 base */
    base: "./",
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        "@": resolve(__dirname, "./src")
      },
      extensions: [".js", ".vue", ".json", ".scss", "ts", "*"]
    },
    server: {
      /** 是否开启 https */
      https: false,
      /** host 设置为 true 才可以使用 network 的形式，以 ip 访问项目 */
      host: true, // host: "0.0.0.0"
      /** 端口号 */
      port: 4455,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      // /** 设置热更新*/
      // hmr:true,
      /** 接口代理 */
      // 代理
      proxy: {
        //这里是通过请求/api 来转发到 https://api.pingping6.com/
        //假如你要请求https://api.*.com/a/a
        //那么axios的url，可以配置为 /api/a/a
        "/api": {
          target: "http://localhost:9090/", //实际请求地址
          changeOrigin: true, // 是否允许跨域
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
      // proxy: {
      //   "/mock-api": {
      //     target: "https://vue-typescript-admin-mock-server-armour.vercel.app/mock-api",
      //     ws: true,
      //     /** 是否允许跨域 */
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace("/mock-api", "")
      //   }
      // }
    },
    build: {
      brotliSize: false,
      /** 消除打包大小超过 500kb 警告 */
      chunkSizeWarningLimit: 2000,
      /** vite 2.6.x 以上需要配置 minify: terser，terserOptions 才能生效 */
      minify: "terser",
      /** 在 build 代码时移除 console.log、debugger 和 注释 */
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ["console.log"]
        },
        output: {
          /** 删除注释 */
          comments: false
        }
      },
      /** 打包后静态资源目录 */
      assetsDir: "static"
    },
    /** vite 插件 */
    plugins: [
      vue(),
      /** svg */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
        symbolId: "icon-[dir]-[name]"
      }),
      vitePluginImp({
        libList: [
          // 已配置了全局的element-plus
          {
            libName: "element-plus",
            style: () => {
              return `element-plus/dist/index.css`
            }
          }
        ]
      })
      // AutoImport({
      //   dts: "./types/auto-imports.d.ts",
      //   /** 自动按需导入 element-plus 相关函数，比如 ElMessage */
      //   resolvers: [ElementPlusResolver()],
      //   /** 根据自动按需导入的相关 api，生成 .eslintrc-auto-import.json 文件供 eslint 识别 */
      //   eslintrc: {
      //     enabled: true, // 默认 false
      //     filepath: "./types/.eslintrc-auto-import.json", // 默认 "./.eslintrc-auto-import.json"
      //     globalsPropValue: true // 默认 true (true | false | "readonly" | "readable" | "writable" | "writeable")
      //   }
      // }),
      // Components({
      //   dts: "./types/components.d.ts",
      //   /** 自动按需导入 element-plus 组件 */
      //   resolvers: [ElementPlusResolver()]
      // })
    ]
  }
}
