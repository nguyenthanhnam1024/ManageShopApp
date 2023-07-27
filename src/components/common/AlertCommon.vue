<template>
  <div class="wrapper-popup" :class="active">
    <div class="content">
      <h3>{{ messageAlertCommon }}</h3>
      <div>
        <button class="btn button-oke" @click="oke">oke</button>
      </div>
    </div>
  </div>
</template>
        
        <script>
export default {
  name: "AlertCommonVue",
  props: {
    activeAlertCommon: { type: Boolean },
    messageAlertCommon: { type: String },
  },
  methods: {
    oke() {
      this.$emit("ClickOkeFromAlertCommon");
    },
  },
  computed: {
    active() {
      return {
        "open-popup": this.activeAlertCommon,
      };
    },
  },
};
</script>
        
  <style scoped>
button {
  width: 80px;
  height: 45px;
  text-align: center;
  margin: 30px;
}

h3 {
  margin-top: 40px;
  height: 120px;
  padding: 10px;
  overflow-y: scroll;
}

.button-oke {
  background-color: rgb(81, 246, 10);
}
.content {
  text-align: center;
  border: 4px solid rgb(54, 53, 55);
  border-radius: 20px;
  width: 490px;
  height: 280px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  background-color: #fff;
}
.wrapper-popup {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.16);
}
.wrapper-popup.open-popup {
  opacity: 1;
  visibility: visible;
}
</style>