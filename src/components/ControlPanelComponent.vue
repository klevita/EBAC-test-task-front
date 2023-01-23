<template>
    <div class="control-panel">
        <h3>Add task</h3>
        <div class="form-group">
            <textarea :class="{ shake: disabledTitle }"  v-model="title" class="control-input-el"
                style="width:calc(100% - 6px); resize: vertical;"></textarea>
            <div class="control-group">
                <div style="display:flex;align-items:center;">
                    <label>Completed?</label>
                    <input style="width:16px;height:16px" type="checkbox" v-model="selected">
                </div>
                <a class="control-button" @click="setTitle()">GO!</a>
            </div>
        </div>
        <h3>Set userId</h3>

        <div class="control-group">
            <input type="number" :class="{ shake: disabledId }" style="width:34px" class="control-input-el" v-model.number="userId">
            <a class="control-button" @click="setId()">SET</a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue'
import { useStore } from 'vuex';

const store = useStore()
const emit = defineEmits(['taskAlter','userIdChange'])

const disabledId = ref(false)
const disabledTitle = ref(false)

const title = ref('')
const userId = ref(store.state.taskUserId)
const selected = ref(false)

function setId(){
    if(userId.value>0 && userId.value<=20){
        store.commit('setUserId', userId.value)
        emit('userIdChange')
    }else{
        userId.value=1
        disabledId.value=true
        setTimeout(()=>{
            disabledId.value=false
        },1200)
    }
    
}
function setTitle(){
    if (title.value.length) {
        store.commit('setTitle', title.value)
    }else{
        disabledTitle.value=true
        setTimeout(()=>{
            disabledTitle.value=false
        },1200)
    }
}
</script>

<style scoped lang="scss">
.control-panel {
    position: fixed;
    left: 14px;
    width: calc(calc(100vw - 760px) / 2);
    padding: 0px 14px 14px 14px;
    max-width: 90%;
    background: white;
    box-shadow: 0px 10px 30px rgba(210, 209, 222, 0.5);
    border-radius: 8px;
    text-align: left;

    .control-button {
        background-color: #5A5AF6;
        border-radius: 4px;
        border: none;
        color: white;
        padding: 3px 5px 3px 5px;

        &:hover {
            cursor: pointer;
        }
    }

    .control-input-el {
        &:focus-visible {
            border: solid #5A5AF6 1px !important;
        }
    }

    .control-group {
        height: 30px;
        align-items: center;
        justify-content: space-between;
        display: flex;
    }
}

.shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    border-color: red;
    transform: translate3d(0, 0, 0);
}

@keyframes shake {

    10%,
    90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
        transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
        transform: translate3d(4px, 0, 0);
    }
}
</style>