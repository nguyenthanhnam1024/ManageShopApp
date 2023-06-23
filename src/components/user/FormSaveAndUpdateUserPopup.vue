!<template>
  <div class="bg-screen" :class="activeFormPopup">
    <div class="wrapper">
      <div class="row">
        <div class="col-md-6 account">
          <h2>Account information</h2>
          <form>
            <div class="form-group">
              <label for="username"
                >User name:<span class="messageError">
                  {{ getFieldsErrorMap.userName }}</span
                >
                <span class="messageError">
                  {{ getFieldsErrorMap.userNames }}</span
                ></label
              >
              <input
                type="text"
                class="form-control"
                id="username"
                name="username"
                required
                v-model="getRequestUser.userName"
                :class="noInput"
              />
            </div>
            <div class="form-group">
              <label for="password"
                >Password:<span class="messageError">
                  {{ getFieldsErrorMap.password }}</span
                ></label
              >
              <input
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                id="password"
                name="password"
                required
                v-model="getRequestUser.password"
                :class="noInput"
              />
              <span class="password-toggle" @click="toggleShowPassword">
                <i
                  :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                ></i>
              </span>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <h2>User information</h2>
          <form>
            <div>
              <p>
                <label for="select-option"
                  >Select shop:<span class="messageError">
                    {{ getFieldsErrorMap.idShop }}</span
                  ><span class="messageError">
                    {{ getFieldsErrorMap.idShops }}</span
                  ></label
                >
              </p>
              <select
                id="select-option"
                class="select"
                v-model="getRequestUser.idShop"
              >
                <option :value="0">As is ADMIN</option>
                <option
                  v-for="(shop, index) in getShopList"
                  :key="index"
                  :value="shop.id"
                >
                  {{ shop.name }} ({{ shop.address }})
                </option>
              </select>
            </div>
            <div>
              <p>
                <label for="select-option"
                  >Select role:<span class="messageError">
                    {{ getFieldsErrorMap.roleName }}</span
                  ></label
                >
              </p>
              <select
                id="select-option"
                class="select"
                v-model="getRequestUser.roleName"
              >
                <option
                  v-for="(roleName, index) in getRoleNames"
                  :key="index"
                  :value="roleName"
                >
                  {{ roleName }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="fullname"
                >Your full name:<span class="messageError">
                  {{ getFieldsErrorMap.name }}</span
                ><span class="messageError">
                  {{ getFieldsErrorMap.names }}</span
                ></label
              >
              <input
                type="text"
                class="form-control"
                id="fullname"
                name="fullname"
                required
                v-model="getRequestUser.name"
                :class="noInput"
              />
            </div>
            <div class="form-group">
              <label for="email"
                >Email:<span class="messageError">
                  {{ getFieldsErrorMap.email }}</span
                ></label
              >
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                required
                v-model="getRequestUser.email"
                :class="noInput"
              />
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-2">
          <button
            type="submit"
            class="btn btn-success"
            :class="stateBtnSave"
            @click="register"
          >
            register
          </button>
          <button
            type="submit"
            class="btn btn-success"
            :class="stateBtnUpdate"
            @click="update"
          >
            update
          </button>
        </div>
        <div class="col-md-2">
          <button type="submit" class="btn btn-warning" @click="cancel">
            cancel
          </button>
        </div>
        <div class="col-md-8"></div>
      </div>
    </div>
    <AlertCommon
      :activeAlertCommon="activeAlertCommon"
      :messageAlertCommon="messageAlertCommon"
      @ClickOkeFromAlertCommon="ClickOkeFromAlertCommon"
    />
    <ConfirmCommon 
      :activeConfirmCommon="activeConfirmCommon"
      :messageConfirmCommon="messageConfirmCommon"
      @confirmYesFromConfirmCommon="confirmYesFromConfirmCommon"
      @confirmNoFromConfirmCommon="confirmNoFromConfirmCommon"
    />
  </div>
</template>

<script>
import Common from "../common/Common";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import AlertCommon from "../common/AlertCommon.vue";
import ConfirmCommon from "../common/ConfirmCommon.vue";

export default {
  name: "SaveAndUpdateUserVue",

  components: {
    AlertCommon,
    ConfirmCommon,
  },

  data() {
    return {
      showPassword: false,
      activeAlertCommon: false,
      messageAlertCommon: null,
      activeConfirmCommon: false,
      messageConfirmCommon: null,
    };
  },

  methods: {
    ...mapMutations("AppVueModule", ["setRestartRouterView", "setFieldsErrorMap"]),
    ...mapMutations("UserModule", ["setActiveOfPopup", "setRequestUser"]),
    ...mapActions("UserModule", ["saveUserFromAdmin", "updateUserFromADMIN"]),
    ...mapActions("ShopModule", ["fetchShopList"]),
    ...mapActions("RoleModule", ["fetchRoleNames"]),

    confirmNoFromConfirmCommon() {
      this.activeConfirmCommon = false;
    },
    
    async confirmYesFromConfirmCommon() {
      let response = null;
      if (this.getInactiveBtnSaveOfPopup == false) {
        response = await this.saveUserFromAdmin();
      }
      if (this.getInactiveBtnUpdateOfPopup == false) {
        response= await this.updateUserFromADMIN();
      }
      this.activeConfirmCommon = false;
      if (response.status == 200) {
        this.setActiveOfPopup(false);
        this.setRestartRouterView(!this.getRestartRouterView);
        this.resetAsStatusEqual200();
      } else {
        if (response.status == 1000) {
          this.setFieldsErrorMap(response.data);
        } else {
          this.activeAlertCommon = true;
          this.messageAlertCommon = response.data;
        }
      }
    },

    resetAsStatusEqual200() {
      this.setFieldsErrorMap([]);
      this.setRequestUser({
        userName: null,
        password: null,
        idShop: null,
        roleName: null,
        name: null,
        age: 100,
        phoneNumber: "0000000000",
        email: null,
        address: "new address",
      });
    },

    ClickOkeFromAlertCommon() {
      this.activeAlertCommon = false;
    },

    register() {
      this.activeConfirmCommon = true;
      this.messageConfirmCommon = "you sure register user ?";
    },

    update() {
      this.activeConfirmCommon = true;
      this.messageConfirmCommon = "you sure want update user ?";
    },

    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },

    cancel() {
      this.setActiveOfPopup(false);
      this.resetAsStatusEqual200();
    },
  },

  created() {
    const common = new Common();
    common.redirectByJwtAndUrl();
    this.fetchShopList();
    this.fetchRoleNames();
  },

  computed: {
    ...mapGetters("AppVueModule", ["getRestartRouterView", "getFieldsErrorMap"]),
    ...mapGetters("UserModule", [
      "getActiveOfPopup",
      "getInactiveBtnSaveOfPopup",
      "getInactiveBtnUpdateOfPopup",
      "getRequestUser",
    ]),
    ...mapGetters("ShopModule", ["getShopList"]),
    ...mapGetters("RoleModule", ["getRoleNames"]),

    noInput() {
      if (this.getInactiveBtnUpdateOfPopup == false) {
        return {
          "no-input": true,
        };
      }
      return {
        "no-input": false,
      };
    },

    activeFormPopup() {
      return {
        "open-popup": this.getActiveOfPopup,
      };
    },

    stateBtnSave() {
      return {
        "display-none": this.getInactiveBtnSaveOfPopup,
      };
    },

    stateBtnUpdate() {
      return {
        "display-none": this.getInactiveBtnUpdateOfPopup,
      };
    },
  },
};
</script>

<style scoped>
.no-input {
  pointer-events: none; /* Ngăn người dùng tương tác với ô input */
  user-select: none; /* Ngăn người dùng chọn nội dung trong ô input */
}
.select {
  width: 300px;
  height: 40px;
  border-radius: 5px;
  margin-left: 18px;
  margin-bottom: 10px;
}
.display-none {
  display: none;
}
.bg-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.16);
}

.bg-screen.open-popup {
  opacity: 1;
  visibility: visible;
}
.password-toggle {
  position: absolute;
  top: 49%;
  right: 120px;
  transform: translateY(-50%);
  cursor: pointer;
}
.messageError {
  color: red;
  font-weight: normal;
  font-size: 20px;
}
.wrapper {
  margin-top: 10px;
  border: 2px solid rgb(125, 3, 105);
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1200px;
  padding: 25px;
  background-color: #fff;
  position: absolute;
}
h2 {
  margin-bottom: 40px;
  color: #2e3cfa;
}
div div div {
  text-align: justify;
}
label {
  font-weight: bold;
  font-size: 20px;
  margin-left: 5px;
}
input {
  width: 450px;
  height: 45px;
  border-radius: 5px;
  margin-left: 20px;
}
button {
  width: 100px;
  height: 50px;
  margin-right: 20px;
}
a {
  font-size: 20px;
}
.account {
  border: 1px solid, black;
  border-radius: 10px;
}
</style>