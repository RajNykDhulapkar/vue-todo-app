<script setup>
import { ref, onMounted, computed, watch } from "vue";

const todos = ref([]);
const name = ref("");

const input_content = ref("");
const input_category = ref("");

const todos_asc = computed(() =>
    todos.value.sort((a, b) => {
        return a.createdAt - b.createdAt;
    })
);

watch(name, (newValue) => {
    localStorage.setItem("name", newValue);
});

watch(
    todos,
    (newVal) => {
        localStorage.setItem("todos", JSON.stringify(newVal));
    },
    {
        deep: true,
    }
);

const addTodo = () => {
    if (input_content.value.trim() === "" || input_category.value === null) {
        return;
    }
    todos.value.push({
        content: input_content.value,
        category: input_category.value,
        done: false,
        editable: false,
        createdAt: new Date().getTime(),
    });
    input_content.value = "";
    input_category.value = null;
};

const removeTodo = (todo) => {
    todos.value = todos.value.filter((t) => t !== todo);
};

onMounted(() => {
    name.value = localStorage.getItem("name") || "";
    todos.value = JSON.parse(localStorage.getItem("todos")) || [];
});
</script>

<template>
    <main class="app">
        <section class="greeting">
            <h2 class="title">What's up,</h2>
            <input type="text" name="name" placeholder="Name here" v-model="name" id="name" />
        </section>

        <section class="create-todo">
            <h3>CREATE A TODO</h3>
            <form @submit.prevent="addTodo" id="new-todo-form">
                <h4>What's on your todo list?</h4>
                <input
                    type="text"
                    name="content"
                    placeholder="e.g. make a video"
                    v-model="input_content"
                    id="content"
                />

                <h4>Pick a category</h4>
                <div class="options">
                    <label for="category1">
                        <input
                            type="radio"
                            name="category"
                            id="category1"
                            value="business"
                            v-model="input_category"
                        />
                        <span class="bubble business"></span>
                        <div>Business</div>
                    </label>
                    <label for="category2">
                        <input
                            type="radio"
                            name="category"
                            id="category2"
                            value="personal"
                            v-model="input_category"
                        />
                        <span class="bubble personal"></span>
                        <div>Personal</div>
                    </label>
                </div>
                <input type="submit" value="Add todo" />
            </form>
        </section>

        <section class="todo-list">
            <h3>TODO LIST</h3>
            <div class="list" id="todo-list">
                <div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`">
                    <label for="cat">
                        <input type="checkbox" name="cat" id="cat" v-model="todo.done" />
                        <span
                            :class="`bubble ${
                                todo.category == 'business' ? 'business' : 'personal'
                            }`"
                        ></span>
                    </label>
                    <div class="todo-content">
                        <input type="text" v-model="todo.content" />
                    </div>
                    <div class="actions">
                        <button class="delete" @click="removeTodo(todo)">Delete</button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
