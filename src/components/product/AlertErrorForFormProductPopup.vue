<template>
    <div class="wrapper-popup" :class="saveConfirmtPopup">
      <div class="wrapper-box">
        <h3>{{ messageAlertPopup }}</h3>
        <button class="btn button-yes" @click="Oke">Oke</button>
      </div>
    </div>
  </template>
        
        <script>
  import { mapGetters } from "vuex";
  import { mapMutations } from "vuex";
  
  export default {
    name: "AlertForFormProductPopup",
    methods: {
      ...mapMutations("ProductModule", ["setActiveAlertForFormProductPopup"]),
      Oke() {
        this.setActiveAlertForFormProductPopup(false);
      },
    },
    computed: {
      ...mapGetters("ProductModule", [
        "getActiveAlertForFormProductPopup",
        "getMessageAlertForFormProductPopup",
      ]),
      saveConfirmtPopup() {
        return {
          "open-popup": this.getActiveAlertForFormProductPopup,
        };
      },
      messageAlertPopup() {
        return this.getMessageAlertForFormProductPopup;
      },
    },
  };
  </script>
        
        <style scoped>
  h3 {
    margin-top: 40px;
    height: 110px;
    padding: 10px;
    overflow-y: scroll;
  }
  .button-yes {
    width: 80px;
    height: 45px;
    text-align: center;
    background-color: rgb(81, 246, 10);
  }
  .wrapper-box {
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    visibility: hidden;
  }
  .wrapper-popup.open-popup {
    opacity: 1;
    visibility: visible;
  }
  </style>