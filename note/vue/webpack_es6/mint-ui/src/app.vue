<template>
  <div>
    <mt-header title="multiple button">
        <mt-button icon="back">back</mt-button>
        <mt-button @click="handleClose">close</mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-switch v-model="value"></mt-switch>
    <button @click="myClick"> 点我 </button>
  </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "app.vue",
        data: function () {
            return {
                value : false
            }
        },
        methods: {
            handleClose(){},
            myClick: function () {
                this.value = !this.value
                Toast('asd')
            }
        }
    }
</script>

<style scoped>

</style>