import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import Primevue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);
app.use(router);
app.use(Primevue);

app.component("Button", Button);
app.component("InputText", InputText);

app.mount("#app");
