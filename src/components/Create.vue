<template>
  <div class="create">
    <h1>Create</h1>
    <user-form
      :user="user"
      @submit="onSubmit"
      @changeInput="onChangeInput"
    />
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';
  import UserForm from './common/UserForm';

  // モジュール読み込み
  import userFormModule from '@/store/userForm';

  // 使うモジュールの名前
  const moduleName = 'userForm';

  export default {
    name: 'Create',
    components: {
      UserForm
    },
    computed: {
      ...mapState(moduleName, ['user']),
      ...mapGetters(moduleName, ['isEdited'])
    },
    created () {
      const store = this.$store;
      // 動的にモジュールを登録
      store.registerModule(moduleName, userFormModule);
      // 登録したモジュールの初期化
      this.initialize()
    },
    beforeRouteLeave (to, from, next) {
      const store = this.$store;
      store.unregisterModule(moduleName);
      next();
    },
    methods: {
      ...mapActions(moduleName, [
        'initialize',
        'updateValue',
        'createSubmit'
      ]),
      onSubmit () {
        this.createSubmit();
        this.$router.push({
          name: 'Home'
        });
      },
      onChangeInput ({ e, prop }) {
        this.updateValue({ prop, value: e.target.value })
      }
    }
  }
</script>
