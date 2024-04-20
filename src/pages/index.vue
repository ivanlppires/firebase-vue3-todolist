<template>

  <!-- make a todolist with vuetify components -->
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <h2>Todo List</h2>
            </v-card-title>
            <v-card-text>
              <!-- focus this field at edit moment -->
              <v-text-field v-if="todoi" autofocus v-model="editedTodo" label="Edit todo" outlined
                @keyup.enter="editTodo"></v-text-field>
              <v-text-field v-else v-model="newTodo" label="Add new todo" outlined
                @keyup.enter="addTodo"></v-text-field>
              <v-list>
                <v-list-item v-for="(todo, index) in todos" :key="index">
                  - {{ todo.title }}
                  <v-icon color="red" class="ml-2" @click="deleteTodo(todo.id)">mdi-delete</v-icon>
                  <v-icon color="yellow" class="ml-2" @click="loadTodo(todo.id)">mdi-pencil</v-icon>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>

</template>

<script setup>
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, onMounted } from 'vue'
import db from '@/firebase'

// make a new todo and a list of todos
const newTodo = ref('')
const todos = ref([])
const todosCollection = collection(db, 'todos')
const todoi = ref(false)
const editedTodo = ref('')

onMounted(() => {
  onSnapshot(todosCollection, (snapshot) => {
    todos.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
});

// add a new todo
const addTodo = async () => {
  if (newTodo.value.trim() === '') return
  await addDoc(todosCollection, { title: newTodo.value })
  newTodo.value = ''
};

const deleteTodo = async (id) => {
  console.log(id)
  await deleteDoc(doc(todosCollection, id))
};

const loadTodo = (id) => {
  newTodo.value = todos.value.find(todo => todo.id === id);
  editedTodo.value = newTodo.value.title;
  todoi.value = true;
}

const editTodo = async () => {  
  await updateDoc(doc(todosCollection, newTodo.value.id), { title: editedTodo.value })
  newTodo.value = ''
  todoi.value = false;
  editedTodo.value = ''
};

/* ******
  DESAFIO: Faça a ordenação dos todos por ordem temporal
  Insira a data e tempo de criação da tarefa
  Insira um campo de checkbox para marcar as tarefas já realizadas
  USEM O BANCO DE VOCêS PARA FAZER ISSO
*/

</script>
