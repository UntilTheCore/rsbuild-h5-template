import { createApp } from 'vue';
import App from './App.vue';
import '@unocss/reset/tailwind.css'
import './index.css';
import router from "@/router";
import Pinia from "@/store";

const app = createApp(App);

app
  .use(router)
  .use(Pinia)

app
  .mount("#root");

export default app;
