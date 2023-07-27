<template>
  <div class="wrapper-popup" :class="activeFormPopup">
    <div class="box">
      <form>
        <p>Profile</p>
        <div>
          <label for="name"
            >Name:
            <span class="messageFieldError">{{
              getFieldsErrorMap.name
            }}</span></label
          >
          <input type="text" id="name" v-model="getRequestUpdateUser.name" />
        </div>
        <div>
          <label for="name"
            >Age:
            <span class="messageFieldError">{{
              getFieldsErrorMap.age
            }}</span></label
          >
          <input type="text" id="name" v-model="getRequestUpdateUser.age" />
        </div>
        <div>
          <label for="name"
            >Email:
            <span class="messageFieldError">{{
              getFieldsErrorMap.email
            }}</span></label
          >
          <input type="text" id="name" v-model="getRequestUpdateUser.email" />
        </div>
        <div>
          <label for="name"
            >Phone number:
            <span class="messageFieldError">{{
              getFieldsErrorMap.phoneNumber
            }}</span></label
          >
          <input
            type="text"
            id="name"
            v-model="getRequestUpdateUser.phoneNumber"
          />
        </div>
        <div>
          <label for="Address"
            >Address:
            <span class="messageFieldError">{{
              getFieldsErrorMap.address
            }}</span></label
          >
          <input
            type="text"
            id="Address"
            v-model="getRequestUpdateUser.address"
          />
        </div>
        <button
          type="button"
          class="btn btn-success button-save"
          @click="confirmUpdate"
        >
          Update
        </button>
        <button type="button" class="btn button-comback" @click="comeBack">
          Comback
        </button>
      </form>
    </div>
    <ConfirmCommonVue
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
import { mapActions } from "vuex";
import ConfirmCommonVue from "../common/ConfirmCommon.vue";
import AlertCommon from "../common/AlertCommon.vue";

export default {
  name: "FormUpdateProfile",

  components: {
    ConfirmCommonVue,
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
    ...mapMutations("AccountModule", ["setStateOfConfirmUpdateProfile"]),
    ...mapActions("AccountModule", ["updateProfile"]),
    ...mapMutations("AppVueModule", ["setRestartRouterView", "setFieldsErrorMap"]),
    ...mapMutations("SecurityModule", ["setUser"]),

    confirmUpdate() {
      this.activeConfirmCommon = true;
      this.messageConfirmCommon = "you sure want update progile ?";
    },

    ClickOkeFromAlertCommon() {
      this.activeAlertCommon = false;
    },

    async confirmYesFromConfirmCommon() {
      const response = await this.updateProfile();
      this.activeConfirmCommon = false;
      if (response.status == 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        this.setUser(response.data);
        this.setStateOfConfirmUpdateProfile(false);
        this.setRestartRouterView(!this.getRestartRouterView);
        this.setFieldsErrorMap([]);
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
      this.setStateOfConfirmUpdateProfile(false);
      this.$emit("combackFromFormUpdateProfile");
      this.setFieldsErrorMap([]);
    },
  },

  computed: {
    ...mapGetters("AccountModule", [
      "getRequestUpdateUser",
      "getStateOfConfirmUpdateProfile",
    ]),
    ...mapGetters("SecurityModule", ["getUser"]),
    ...mapGetters("AppVueModule", ["getRestartRouterView", "getFieldsErrorMap"]),

    activeFormPopup() {
      return {
        "open-popup": this.getStateOfConfirmUpdateProfile,
      };
    },
  },
};
</script>
    
    <style scoped>
div div form p {
  font-size: 20px;
  font-weight: bold;
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
}
.button-comback {
  margin-left: 60px;
  width: 90px;
  background-color: rgb(237, 187, 127);
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
  width: 380px;
  height: 450px;
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