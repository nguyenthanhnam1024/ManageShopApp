<template>
    <div class="wrapper-popup" :class="activeFormPopup">
      <div class="box">
        <form>
          <p>Information role</p>
          <div>
            <label for="name"
              >Role name:
              <span class="messageFieldError">{{
                fieldsErrorMap.roleName
              }}</span></label
            >
            <input
              type="text"
              id="name"
              placeholder="should capital"
              v-model="getRole.roleName"
            />
          </div>
          <button
            type="button"
            class="btn btn-success button-save"
            :class="stateBtnSave"
            @click="confirmSave"
          >
            Save
          </button>
          <button type="button" class="btn button-comback" @click="comeBack">
            Comback
          </button>
        </form>
      </div>
      <ConfirmCommon
        :activeConfirmCommon="activeConfirmCommon"
        :messageConfirmCommon="messageConfirmCommon"
        @confirmNoFromConfirmCommon="confirmNoFromConfirmCommon"
        @confirmYesFromConfirmCommon="confirmYesFromConfirmCommon"
      />
      <AlertCommon 
        :activeAlertCommon="activeAlertCommon"
        :messageAlertCommon="messageAlertCommon"
        @ClickOkeFromAlertCommon="ClickOkeFromAlertCommon"
      />
    </div>
  </template>
    
    <script>
  import { mapGetters } from "vuex";
  import { mapMutations } from "vuex";
  import ConfirmCommon from "../common/ConfirmCommon.vue";
  import { mapActions } from "vuex";
  import AlertCommon from "../common/AlertCommon.vue";
  
  export default {
    name: "FormShopPopup",
  
    components: {
      ConfirmCommon,
      AlertCommon,
    },
  
    data() {
      return {
        activeConfirmCommon: false,
        messageConfirmCommon: null,
        activeAlertCommon: false,
        messageAlertCommon: null,
      };
    },
  
    methods: {
      ...mapMutations("RoleModule", ["setActiveOfPopup", "setRole"]),
      ...mapActions("RoleModule", ["saveRole"]),
      ...mapMutations("AppVueModule", ["setRestartRouterView", "setFieldsErrorMap"]),

      ClickOkeFromAlertCommon() {
        this.activeAlertCommon = false
      },
  
      resetForm() {
        this.setRole({
          id: null,
          roleName: null,
        })
        this.setFieldsErrorMap([]);
      },
  
      async confirmYesFromConfirmCommon() {
        const response = await this.saveRole();
        console.log(response.data)
        this.activeConfirmCommon = false;
        if (response.status == 200) {
          this.setActiveOfPopup(false);
          this.setRestartRouterView(!this.getRestartRouterView);
          this.resetForm();
        } else {
          if (response.status == 1000) {
            this.setFieldsErrorMap(response.data);
          } else {
            this.activeAlertCommon = true;
            this.messageAlertCommon = response.data;
          }
        }
      },
  
      confirmNoFromConfirmCommon() {
        this.activeConfirmCommon = false;
      },
  
      comeBack() {
        this.setActiveOfPopup(false);
        this.resetForm();
      },
  
      confirmSave() {
        this.activeConfirmCommon = true;
        this.messageConfirmCommon = "you sure want save ?";
      },
    },
  
    computed: {
      ...mapGetters("RoleModule", ["getActiveOfPopup", "getRole"]),
      ...mapGetters("SecurityModule", ["getUser"]),
      ...mapGetters("AppVueModule", ["getRestartRouterView", "getFieldsErrorMap"]),
  
      fieldsErrorMap() {
        return JSON.parse(JSON.stringify(this.getFieldsErrorMap));
      },
  
      activeFormPopup() {
        return {
          "open-popup": this.getActiveOfPopup,
        };
      },
    },
  };
  </script>
    
    <style scoped>
  div div form p {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 50px;
  }
  div div form div input {
    font-size: 12px;
    height: 22px;
  }
  div div form div label {
    font-size: 15px;
    color: rgb(14, 88, 217);
  }
  .button-save {
    width: 90px;
    margin-left: 40px;
    margin-top: 80px;
  }
  .button-comback {
    margin-left: 60px;
    width: 90px;
    background-color: rgb(237, 187, 127);
    margin-top: 80px;
  }
  .box form div label span {
    color: red;
    font-size: 80%;
  }
  .box form div {
    margin-bottom: 10px;
    font-size: 80%;
    display: flex;
    flex-direction: column;
  }
  .box {
    width: 350px;
    height: 350px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1.4);
    background-color: #fff;
    position: absolute;
    font-family: Arial, Helvetica, sans-serif;
    box-shadow: 0px 0px 10px #000;
    border-radius: 5px;
  }
  div form {
    margin: 10px;
  }
  .wrapper-popup {
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