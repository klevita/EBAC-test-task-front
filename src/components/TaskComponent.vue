<template>
    <div @click="emit('completed')" class="card-mini" :class="{ 'card-completed': completed }">
        <div class="title">
            {{ title }}
        </div>
        <div class="card-remove" @click="emit('removed')">+</div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
defineProps({
    title: {
        required: true,
        type: String
    },
    completed: {
        required: true,
        type: Boolean
    },
})

const emit = defineEmits(['completed','removed'])
</script>

<style scoped lang="scss">
$card-pd: 8px;

.card-mini {
    position: relative;
    padding: $card-pd;
    background-color: #A6A7FA;
    width: calc(100% - $card-pd*2);
    border-radius: 8px;
    height: 92px;

    .title {
        width: 100%;
        height: 100%;
        text-align: left;
        overflow: hidden;
        color: #0B0B4D;
        font-size: 20px;
        word-break: break-all;
    }

    &:hover {
        cursor: pointer;
    }

    .card-remove {
        border-radius: 100%;
        position: absolute;
        top: -20px;
        left:96%;
        height:40px;
        width:40px;
        background-color: #5A5AF6;
        line-height:40px;
        font-size: 54px;
        font-weight: 400;
        color:white;
        transform: rotate(0.125turn);
        &:hover{
            color:red;
            outline:2px solid red
        }
    }
}

.card-completed {
    opacity: 0.5;
}
</style>