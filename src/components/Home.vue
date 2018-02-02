<template>
  <div class="home">
    <h1>Home</h1>
    <ul>
      <li v-for="user in all">
        name: {{ user.name }}<br>
        tel: {{ user.tel }}<br>
        email: {{ user.email }}<br>
        <button @click="onClickEdit(user.uid)">edit</button>
      </li>
    </ul>
    <button @click="onClickCreate">create</button>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'Home',
    computed: {
      ...mapState('user', [
        'all'
      ])
    },
    methods: {
      onClickEdit (uid) {
        this.$router.push({
          name: 'Edit',
          query: { uid }
        });
      },
      onClickCreate () {
        this.$router.push({
          name: 'Create'
        });
      }
    }
  }
</script>

<style scoped>
  li {
    padding: 20px 50px;
    list-style: none;
    border-bottom: 1px solid #ccc;
  }
</style>
