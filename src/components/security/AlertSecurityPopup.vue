<template>
    <div class="wrapper-popup" :class="saveConfirmtPopup">
      <div class="content">
        <h3>{{ messageAlertSecurityPopup }}</h3>
        <div class="buttons-control">
          <button class="btn button-no" @click="oke">oke</button>
        </div>
      </div>
    </div>
  </template>
      
      <script>
  export default {
    name: "AlertPopup",
    props: {
        activeAlertSecurityPopup: {type: Boolean},
        messageAlertSecurityPopup: {type: String}
    },
    methods: {
        oke() {
        this.$emit('alertOke')
      },
    },
    computed: {
      saveConfirmtPopup() {
        return {
          "open-popup": this.activeAlertSecurityPopup,
        };
      },
  }
}  
  </script>
      
      <style scoped>
  .buttons-control button {
      width: 80px;
      height: 45px;
      text-align: center;
      margin:5px;
  }
  .buttons-control {
      margin-top: 50px;
  }    
  h3 {
    margin-top: 40px;
    height: 130px;
    padding: 10px;
    overflow-y: scroll;
  }
  .button-no {
    background-color: rgb(251, 129, 15);
    
  }
  .content {
    text-align: center;
    border: 4px solid rgb(54, 53, 55);
    border-radius: 20px;
    width: 400px;
    height: 300px;
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
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .wrapper-popup.open-popup {
    opacity: 1;
    visibility: visible;
  }
  </style>