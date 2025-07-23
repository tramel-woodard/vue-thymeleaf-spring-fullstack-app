<template>
  <v-app>
    <v-main>
      <v-container class="pa-6" min-width="600">
        <v-card>
          <v-card-title>Todo List</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="newTodo"
              label="Add a New Todo"
              variant="outlined"
              density="compact"
              clearable
            />
            <v-btn color="primary" @click="addTodo" class="mt-4">
              Add
            </v-btn>
            <v-divider class="my-4" />
            <v-list>
              <v-list-item
                v-for="todo in todos"
                :key="todo.id"
              >
                <template #prepend>
                  <v-list-item-title>{{ todo.title }}</v-list-item-title>
                </template>
                <template #append>
                  <v-btn color="error" variant="elevated" @click="deleteTodo(todo.id)">
                    Delete
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

  const todos = ref([]);
  const newTodo = ref('');

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      todos.value = await response.json();
    } catch (error) {
      console.error('Failed to load todos:', error);
    }
  };

  const addTodo = async () => {
    const title = newTodo.value.trim();
    if (!title) return;

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, completed: false })
      });

      const saved = await response.json();
      todos.value.push(saved);
      newTodo.value = '';
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      });
      todos.value = todos.value.filter(todo => todo.id !== id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  onMounted(fetchTodos);
</script>

<style scoped>
  .v-container {
    min-width: 600px;
  }

  .v-list {
    overflow-x: hidden;
    width: 100%;
    box-sizing: border-box;
  }

  .v-list-item {
    min-width: 0;
  }

  .v-list-item-title {
    min-width: 0;
    overflow-wrap: break-word;
  }
</style>
