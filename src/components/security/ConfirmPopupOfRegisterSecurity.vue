<template>
  <div class="wrapper-popup" :class="saveConfirmtPopup">
    <div class="save-product-popup">
      <h3></h3>
      <div class="buttons-control">
        <button class="btn button-yes" @click="oke">oke</button>
        <button class="btn button-no" @click="cancel">cancel</button>
      </div>
    </div>
  </div>
</template>
      
      <script>
export default {
  name: "ConfirmPopupOfSecurity",
  props: {
    activeConfirmPopupOfSecurity: { type: Boolean },
  },
  methods: {
    oke() {
      this.$emit("oke");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
  computed: {
    saveConfirmtPopup() {
      return {
        "open-popup": this.activeConfirmPopupOfSecurity,
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
.save-product-popup {
  text-align: center;
  border: 4px solid rgb(54, 53, 55);
  border-radius: 20px;
  width: 400px;
  height: 230px;
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
  background-color: rgba(0, 0, 0, 0.4);
}
.wrapper-popup.open-popup {
  opacity: 1;
  visibility: visible;
}
</style>