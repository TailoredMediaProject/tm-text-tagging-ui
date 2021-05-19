<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img
          src="./../assets/logo.png"
          alt="Redlink Logo"
          height="30"
          class="d-inline-block align-text-top"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link
            :aria-current="
              currentRouteName === 'Annotated Resources' ? 'page' : null
            "
            :to="{ name: 'Annotated Resources' }"
            :class="{ active: currentRouteName === 'Annotated Resources' }"
            class="nav-link"
            >Annotated resources</router-link
          >
          <router-link
            :aria-current="currentRouteName === 'Create Text' ? 'page' : null"
            :to="{ name: 'Create Text' }"
            :class="{ active: currentRouteName === 'Create Text' }"
            class="nav-link"
            >Create Text
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  computed: {
    currentRouteName(): string {
      return this.$route.name as string;
    },
  },
});
</script>
