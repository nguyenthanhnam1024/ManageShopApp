<template>
  <div class="row">
    <div class="col-md-1"></div>
    <div class="col-md-5">
      <h3>Profile user</h3>
      <p><b>Name:</b>{{ getRequestUpdateUser.name }}</p>
      <p><b>Age:</b>{{ getRequestUpdateUser.age }}</p>
      <p><b>Phone number:</b>{{ getRequestUpdateUser.phoneNumber }}</p>
      <p><b>Email:</b>{{ getRequestUpdateUser.email }}</p>
      <p><b>Address:</b>{{ getRequestUpdateUser.address }}</p>
      <button type="button" class="btn btn-success" @click="btnEditProfile">
        Edit profile
      </button>
      <button type="button" class="btn btn-success" @click="changePassword">
        Change password
      </button>
    </div>
    <div class="col-md-4" :class="[getActiveBlockUpdatePassword]">
      <h3>Update password</h3>
      <div class="form-group">
        <label for="address"
          >Old password:<span>{{ getFieldsErrorMap.oldPassword }}</span></label
        >
        <input
          type="password"
          class="form-control"
          required
          v-model="getRequestAccount.oldPassword"
        />
      </div>
      <div class="form-group">
        <label for="address"
          >New password:<span>{{ getFieldsErrorMap.newPassword }}</span></label
        >
        <input
          :type="showPassword ? 'text' : 'password'"
          class="form-control"
          required
          v-model="getRequestAccount.newPassword"
        />
        <span class="password-toggle" @click="toggleShowPassword">
          <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
        </span>
      </div>
      <button type="button" class="btn btn-success" @click="editPassword">
        Update pasword
      </button>
      <button
        type="button"
        class="btn btn-secondary"
        @click="cancelBlockUpdatePassword"
      >
        Cancel
      </button>
    </div>
    <div class="col-md-2"></div>
    <FormUpdateProfileVue
      @combackFromFormUpdateProfile="combackFromFormUpdateProfile"
    />
    <AlertCommon
      :activeAlertCommon="activeAlertCommon"
      :messageAlertCommon="messageAlertCommon"
      @ClickOkeFromAlertCommon="ClickOkeFromAlertCommon"
    />
  </div>
</template>

<script>
import Common from "../common/Common";
import { mapActions, mapMutations } from "vuex";
import { mapGetters } from "vuex";
import FormUpdateProfileVue from "./FormUpdateProfile.vue";
import AlertCommon from "../common/AlertCommon.vue";

export default {
  name: "AcountVue",

  data() {
    return {
      activeAlertCommon: false,
      messageAlertCommon: null,
      showPassword: false,
    };
  },

  components: {
    FormUpdateProfileVue,
    AlertCommon,
  },

  created() {
    const common = new Common();
    common.redirectByJwtAndUrl();
    this.setRequestEditUser();
  },

  methods: {
    ...mapMutations("AccountModule", [
      "setInActiveBlockUpdatePassword",
      "setRequestUpdateUser",
      "setStateOfConfirmUpdateProfile",
      "setRequestAccount",
    ]),
    ...mapActions("AccountModule", ["updatePassword"]),
    ...mapMutations("SecurityModule", ["setFieldsErrorMap"]),

    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },

    ClickOkeFromAlertCommon() {
      this.activeAlertCommon = false;
    },

    async editPassword() {
      const response = await this.updatePassword();
      if (response.status == 200) {
        this.activeAlertCommon = true;
        this.messageAlertCommon = "Change password succress";
        this.setRequestAccount({
          nameOfUser: this.getUser.name,
          userNameOfAccount: this.getUser.userNameOfAccount,
          oldPassword: null,
          newPassword: null,
        });
      } else {
        if (response.status == 1000) {
          this.setFieldsErrorMap(response.data);
        } else {
          this.activeAlertCommon = true;
          this.messageAlertCommon = response.data;
        }
      }
    },

    combackFromFormUpdateProfile() {
      this.setRequestEditUser();
    },

    btnEditProfile() {
      this.setStateOfConfirmUpdateProfile(true);
    },

    changePassword() {
      this.setInActiveBlockUpdatePassword(false);
      this.setRequestAccount({
        nameOfUser: this.getUser.name,
        userNameOfAccount: this.getUser.userNameOfAccount,
        oldPassword: null,
        newPassword: null,
      });
    },

    cancelBlockUpdatePassword() {
      this.setInActiveBlockUpdatePassword(true);
      this.setFieldsErrorMap([]);
    },

    setRequestEditUser() {
      let request = {
        shop: this.getUser.shop,
        role: this.getUser.role,
        name: this.getUser.name,
        oldName: this.getUser.name,
        userNameOfAccount: this.getUser.userNameOfAccount,
        age: this.getUser.age,
        email: this.getUser.email,
        phoneNumber: this.getUser.phoneNumber,
        address: this.getUser.address,
      };
      this.setRequestUpdateUser(request);
    },
  },

  computed: {
    ...mapGetters("AccountModule", [
      "getInActiveBlockUpdatePassword",
      "getRequestUpdateUser",
      "getRequestAccount",
    ]),
    ...mapGetters("SecurityModule", ["getUser", "getFieldsErrorMap"]),

    getActiveBlockUpdatePassword() {
      return {
        "dislay-none": this.getInActiveBlockUpdatePassword,
      };
    },
  },
};
</script>

<style scoped>
.password-toggle {
  color: blueviolet;
  margin-left: 420px;
}
label {
  font-weight: bold;
  font-size: 20px;
}
span {
  color: red;
  font-weight: lighter;
  font-size: 18px;
}
.dislay-none {
  display: none;
}

h3 {
  margin-bottom: 40px;
}
p {
  font-size: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
}
b {
  width: 180px;
  display: inline-block;
}
button {
  margin: 50px;
}
</style>