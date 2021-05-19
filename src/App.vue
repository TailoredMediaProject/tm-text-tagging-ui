<template>
  <Header />
  <main class="container mt-3 mb-5">
    <router-view />
  </main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  components: {
    Header,
    Footer,
  },
  computed: {
    currentRouteName(): string {
      return this.$route.name as string;
    },
  },
});
</script>

<style lang="scss">
@import "./assets/bootstrap.scss";
* {
  box-sizing: border-box;
}

#selected-text-create-annotation {
  background: rgb(255 237 189);
  margin: 0 1px;
}
::selection {
  background: rgb(255 237 189);
}
::-moz-selection {
  background: rgb(255 237 189);
}
.annotation {
  padding-bottom: 5px;
  border-bottom: 10px solid rgba($primary, 0.2);
}
.active-annotation {
  border-color: $warning;
}
</style>
