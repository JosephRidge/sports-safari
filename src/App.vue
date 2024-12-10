<script setup>
import { RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div class="mx-20 my-10">

    <div class="py-2 my-4">
      <!-- title -->
      <div class="text-blue-900 font-bold text-4xl text-start">
        Next Talent University Football team
      </div>
      <!-- Performance -->
    </div>
    <hr />
    <RouterView class></RouterView>
  </div>
</template>
