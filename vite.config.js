import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

console.log(process.env.NODE_ENV);
console.log(process.env.NODE_ENV == "production");

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    // publicPath: process.env.NODE_ENV == "production" ? "/vue-todo-app/" : "/dist/",
    // publicPath: "http://127.0.0.1:5500/dist",
    base: "./",
});
