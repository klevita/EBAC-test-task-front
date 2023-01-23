<template>
    <div class="home">
        <div class="card">
            <h2>My tasks</h2>
            <div v-show="tasksList" class="list">
                <TaskComponent @completed="completeTask(task.id)" @removed="removeTask(task.id)" v-for="task in tasksList" :title="task.title"
                    :key="task.id" :completed="task.completed" />
            </div>
        </div>
        <ControlPanelComponent />
    </div>
</template>

<script lang="ts" setup> 
import TaskComponent from '@/components/TaskComponent.vue';
import { onMounted, ref } from 'vue';
import TasksService, { Task } from "@/services/TasksService"
import ControlPanelComponent from '@/components/ControlPanelComponent.vue';

const tasksList = ref<null | Task[]>(null)

onMounted(async () => {
    tasksList.value = await TasksService.getTasksByUserId(1)
    sortTasks()
})

function completeTask(id: number) {
    tasksList.value?.every(t => {
        if (t.id === id) {
            t.completed = !t.completed
            return false
        }
        return true
    })
    sortTasks()
}

function removeTask(id: number) {
    if (tasksList.value) {
        tasksList.value = tasksList.value.filter(t => {
            return t.id !== id
        })
    }
    sortTasks()
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
</style>