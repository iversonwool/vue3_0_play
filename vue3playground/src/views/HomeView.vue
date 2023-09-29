<script setup lang="ts">
import LkPlayground from '@/components/LkPlayground.vue';
import TheWelcome from '../components/TheWelcome.vue'

function sayHello(str: string) {
  alert('hello, ' + str);
}
</script>

<template>
  <main>
    <TheWelcome />

    <LkPlayground @hello="sayHello" />
  </main>
</template>
