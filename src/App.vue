<template>
    <BaseLayout>
        <router-view />
    </BaseLayout>
</template>

<script lang="ts" setup>
import BaseLayout from './layouts/BaseLayout.vue';

</script>

<style lang="scss">
#app {
    font-family: Nunito, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
body{
    margin:0;
}
</style>
