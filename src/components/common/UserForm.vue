<template>
  <form @submit.prevent="onSubmit">
    <table>
      <tr>
        <th>name</th>
        <td><input type="text" :value="user.name" @keyup="(e) => onChangeInput(e, 'name')"></td>
      </tr>
      <tr>
        <th>tel</th>
        <td><input type="text" :value="user.tel" @keyup="(e) => onChangeInput(e, 'tel')"></td>
      </tr>
      <tr>
        <th>email</th>
        <td><input type="text" :value="user.email" @keyup="(e) => onChangeInput(e, 'email')"></td>
      </tr>
    </table>
    <button>Submit</button>
  </form>
</template>

<script>
  export default {
    name: 'UserForm',
    props: [
      'user'
    ],
    methods: {
      onSubmit() {
        this.$emit('submit');
      },
      onChangeInput (e, prop) {
        this.$emit('changeInput', { e, prop });
      }
    }
  }
</script>