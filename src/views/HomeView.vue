<template>
    <div class="home">
        <div class="card">
            <h2>My tasks</h2>
            <div v-show="!tasksListLoading" class="list">
                <transition-group name="task-list">
                    <TaskComponent @completed="completeTask(task.id)" @removed="removeTask(task.id)"
                        v-for="task in tasksList" :title="task.title" :key="task.id" :completed="task.completed" />
                </transition-group>
            </div>
            <SpinnerComponent v-show="tasksListLoading" />
        </div>
        <ControlPanelComponent @taskAlter="addTask()" @userIdChange="updateTasksList()" />
    </div>
</template>

<script lang="ts" setup>
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import TaskComponent from '@/components/TaskComponent.vue';
import { onMounted, ref } from 'vue';
import TasksService, { Task } from "@/services/TasksService"
import ControlPanelComponent from '@/components/ControlPanelComponent.vue';
import { useStore } from 'vuex';

const store = useStore()

const tasksList = ref<null | Task[]>(null)
const tasksListLoading = ref(true)

onMounted(() => {
    updateTasksList()
})

function updateTasksList() {
    tasksListLoading.value=true
    TasksService.getTasksByUserId(store.state.taskUserId).then(v => {
        tasksList.value = v
        sortTasks()
        tasksListLoading.value=false
    })
}

function completeTask(id: number) {
    tasksList.value?.every(t => {
        if (t.id === id) {
            t.completed = !t.completed
            TasksService.completeTask(id, t.completed)
            return false
        }
        return true
    })
    sortTasks()
}

async function addTask() {
    await TasksService.alterTask(store.state.taskUserId, store.state.taskTitle, store.state.taskCompleted)
    updateTasksList()
}

function removeTask(id: number) {
    if (tasksList.value) {
        tasksList.value = tasksList.value.filter(t => {
            return t.id !== id
        })
    }
    TasksService.deleteTask(id)
}

function sortTasks() {
    if (tasksList.value) {
        const trueArr = [] as Task[];
        const falseArr = [] as Task[];
        tasksList.value.forEach((t) => {
            if (t.completed) {
                trueArr.push(t)
            } else {
                falseArr.push(t)
            }
        })
        tasksList.value = falseArr.concat(trueArr)
    }
}
</script>

<style scoped lang="scss">
.home {
    display: flex;
    justify-content: center;
    padding-top: 10px;

    .card {
        width: 600px;
        padding: 0px 14px 14px 14px;
        max-width: 90%;
        background: white;
        box-shadow: 0px 10px 30px rgba(210, 209, 222, 0.5);
        border-radius: 8px;

        .list {
            display: flex;
            flex-direction: column;
            align-items: center;

            &>* {
                margin-top: 12px;
            }
        }
    }
}

.task-list-enter-active,
.task-list-leave-active {
    transition: all 1s ease;
}

.task-list-enter-from,
.task-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>