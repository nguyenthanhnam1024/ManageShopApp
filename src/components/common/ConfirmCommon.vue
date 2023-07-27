<template>
  <div class="wrapper-popup" :class="saveConfirmtPopup">
    <div class="in-wrapper-popup">
      <h3>{{ messageConfirmCommon }}</h3>
      <div class="buttons-control">
        <button class="btn button-yes" @click="yes">Yes</button>
        <button class="btn button-no" @click="no">No</button>
      </div>
    </div>
  </div>
</template>
      
      <script>
export default {
  name: "ConfirmCommonVue",
  props: {
    activeConfirmCommon: { type: Boolean },
    messageConfirmCommon: {type: String},
  },
  methods: {
    yes() {
      this.$emit("confirmYesFromConfirmCommon");
    },
    no() {
      this.$emit("confirmNoFromConfirmCommon");
    },
  },
  computed: {
    saveConfirmtPopup() {
      return {
        "open-popup": this.activeConfirmCommon,
      };
    },
  },
};
</script>
      
      <style scoped>
.buttons-control button {
  width: 80px;
  height: 45px;
  text-align: center;
  margin: 30px;
}
.buttons-control {
  margin-top: 50px;
}
h3 {
  margin-top: 40px;
  height: 20px;
  padding: 10px;
}
.button-no {
  background-color: rgb(251, 129, 15);
  margin-right: auto;
}
.button-yes {
  background-color: rgb(81, 246, 10);
}
.in-wrapper-popup {
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