<template>
  <div class="edit">
    <h1>Edit</h1>
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
    name: 'Edit',
    components: {
      UserForm
    },
    computed: {
      ...mapState(moduleName, ['user']),
      ...mapGetters(moduleName, ['isEdited'])
    },
    created () {
      const store = this.$store;
      const { uid } = this.$route.query || {};
      // 動的にモジュールを登録
      store.registerModule(moduleName, userFormModule);
      // 登録したモジュールの初期化
      this.initialize({ uid });
    },
    beforeRouteLeave (to, from, next) {
      const store = this.$store;

      // 編集しているか確認
      if (this.isEdited) {
        if (window.confirm('編集してるけどよい？')) {
          store.unregisterModule(moduleName);
          next();
        }
      } else {
        store.unregisterModule(moduleName);
        next();
      }
    },
    methods: {
      ...mapActions(moduleName, [
        'initialize',
        'updateValue',
        'editSubmit'
      ]),
      onSubmit () {
        // 編集をサブミット
        this.editSubmit();
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
