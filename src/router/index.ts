import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AnnotatedResources from "../views/AnnotatedResources.vue";
import CreateText from "../views/CreateText.vue";
import ResourceAnnotationMode from "@/views/ResourceAnnotationMode.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Annotated Resources",
    component: AnnotatedResources,
  },
  {
    path: "/resource/:id",
    name: "Resource",
    component: ResourceAnnotationMode,
  },
  {
    path: "/create",
    name: "Create Text",
    component: CreateText,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
