<script lang="ts">
import {ref, reactive,watch} from 'vue'
  export default {
    emits: ['hello'],
    setup(props, context) {
      const msg = ref('hello')

      function changeMsg() {
        msg.value = msg.value + ' ' + 'world!'
      }
      function sendMessage() {
        context.emit('hello', 'lee how')
      }

      const person = reactive({
        name: 'John',
        age: 19,
        hobby: {
          h1: {
            money: 13
          }
        }
      })

      watch(person, (value, oldValue) => {
        console.log(value, oldValue)
      }, { deep: false })

      return {
        msg,
        changeMsg,
        sendMessage,
        person
      }
    }
  }
</script>


<template>
  <h1>{{msg}}</h1>

  <button @click="changeMsg">change msg</button>
  <button @click="sendMessage">触发自定义事件</button>
  <button @click="person.name += '~',person.age += 1,person.hobby.h1.money++">
    change person info
  </button>
  <hr/>
  <span>{{ person.name }}</span> - <span>{{ person.age }}</span>
  <span>{{ person.hobby.h1.money }}</span>
</template>

