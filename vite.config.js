import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

console.log(process.env.NODE_ENV);
console.log(process.env.NODE_ENV == "production");

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    publicPath: process.env.NODE_ENV == "production" ? "/vue-todo-app/" : "/",
});
