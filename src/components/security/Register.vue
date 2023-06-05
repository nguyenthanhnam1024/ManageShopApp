!<template>
  <div class="container">
    <div class="wrapper">
      <AlertSecurityPopup
        :activeAlertSecurityPopup="activeAlertSecurityPopup"
        :messageAlertSecurityPopup="messageAlertSecurityPopup"
        @alertOke="alertOke"
      />
      <ConfirmPopupOfRegisterSecurity
        :activeConfirmPopupOfSecurity="activeConfirmPopupOfSecurity"
        @oke="oke"
        @cancel="cancel"
      />
      <div class="row">
        <div class="col-md-6 account">
          <h2>Register account</h2>
          <form>
            <div class="form-group">
              <p class="messageError">
                {{ fieldsErrorMap.userNames }}
              </p>
              <label for="username"
                >User name:<span class="messageError">
                  {{ fieldsErrorMap.userName }}</span
                ></label
              >
              <input
                type="text"
                class="form-control"
                id="username"
                name="username"
                required
                v-model="request.userName"
              />
            </div>
            <div class="form-group">
              <label for="password"
                >Password:<span class="messageError">{{
                  fieldsErrorMap.password
                }}</span></label
              >
              <input
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                id="password"
                name="password"
                required
                v-model="request.password"
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
              <label for="select-option"
                >Select shop:<span class="messageError">
                  {{ fieldsErrorMap.idShop }}</span
                ><span class="messageError">
                  {{ fieldsErrorMap.idShops }}</span
                ></label
              >
              <select id="select-option" v-model="request.idShop">
                <option
                  v-for="shop in shopList"
                  :key="shop.id"
                  :value="shop.id"
                >
                  {{ shop.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="fullname"
                >Your full name:<span class="messageError">
                  {{ fieldsErrorMap.name }}</span
                ><span class="messageError">{{
                  fieldsErrorMap.names
                }}</span></label
              >
              <input
                type="text"
                class="form-control"
                id="fullname"
                name="fullname"
                required
                v-model="request.name"
              />
            </div>
            <div class="form-group">
              <label for="age"
                >Age:<span class="messageError">
                  {{ fieldsErrorMap.age }}</span
                ></label
              >
              <input
                type="number"
                class="form-control"
                id="age"
                name="age"
                required
                v-model="request.age"
              />
            </div>
            <div class="form-group">
              <label for="phone"
                >Phone number:<span class="messageError">{{
                  fieldsErrorMap.phoneNumber
                }}</span></label
              >
              <input
                type="text"
                class="form-control"
                id="phone"
                name="phone"
                required
                v-model="request.phoneNumber"
              />
            </div>
            <div class="form-group">
              <label for="email"
                >Email:<span class="messageError">{{
                  fieldsErrorMap.email
                }}</span></label
              >
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                required
                v-model="request.email"
              />
            </div>
            <div class="form-group">
              <label for="address"
                >Address:<span class="messageError">{{
                  fieldsErrorMap.address
                }}</span></label
              >
              <input
                type="text"
                class="form-control"
                id="address"
                name="address"
                required
                v-model="request.address"
              />
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-3">
          <button type="submit" class="btn btn-primary" @click="register">
            Đăng ký
          </button>
        </div>
        <div class="col-md-7">
          <a href="http://localhost:8080/">Click a here to login</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import AlertSecurityPopup from "./AlertSecurityPopup.vue";
import ConfirmPopupOfRegisterSecurity from "./ConfirmPopupOfRegisterSecurity.vue";
import Common from "../common/Common";

export default {
  name: "Register-vue",
  data() {
    return {
      request: {
        userName: "",
        password: "",
        idShop: null,
        name: "",
        age: null,
        email: "",
        phoneNumber: "",
        address: "",
      },
      shopList: [],
      activeAlertSecurityPopup: false,
      messageAlertSecurityPopup: "",
      activeConfirmPopupOfSecurity: false,
      showPassword: false,
    };
  },
  methods: {
    ...mapActions("SecurityModule", ["registerUser"]),
    ...mapActions("ShopModule", ["fetchShopList"]),
    ...mapMutations("SecurityModule", [
      "setRequestRegister",
      "setFieldsErrorMap",
    ]),
    ...mapMutations("AppVueModule", ["setInactiveNavbar"]),
    async getShops() {
      this.fetchShopList();
      this.shopList = this.getShopList;
    },
    async register() {
      this.setRequestRegister(JSON.parse(JSON.stringify(this.request)));
      const response = await this.registerUser();
      if (response.status == 200) {
        this.activeConfirmPopupOfSecurity = true;
      } else {
        if (response.status == 1000) {
          this.setFieldsErrorMap(response.data);
        } else {
          this.activeAlertSecurityPopup = true;
          this.messageAlertSecurityPopup = response.data;
        }
      }
    },
    oke() {
      this.activeConfirmPopupOfSecurity = false;
      this.$router.push({ path: "/" });
      this.request = {
        userName: "",
        password: "",
        idShop: null,
        name: "",
        age: null,
        email: "",
        phoneNumber: "",
        address: "",
      };
      this.setFieldsErrorMap([]);
    },
    cancel() {
      this.activeConfirmPopupOfSecurity = false;
    },
    setIdShop(idShopNew) {
      this.user.idShop = idShopNew;
      return this.user.idShop;
    },
    alertOke() {
      this.activeAlertSecurityPopup = false;
    },
    getURL() {
      const currentURL = window.location.href;
      if (
        currentURL == "http://localhost:8080/register" ||
        currentURL == "http://localhost:8080/"
      ) {
        this.setInactiveNavbar(true);
      } else {
        this.setInactiveNavbar(false);
      }
    },
    setMapError() {
      this.setFieldsErrorMap([]);
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
  },
  created() {
    // this.getURL();
    this.getShops();
    this.setMapError();
    const common = new Common();
    common.redirectByJwtAndUrl();
  },
  computed: {
    ...mapGetters("SecurityModule", ["getFieldsErrorMap"]),
    ...mapGetters("ShopModule", ["getShopList"]),
    fieldsErrorMap() {
      return JSON.parse(JSON.stringify(this.getFieldsErrorMap));
    },
  },
  components: {
    AlertSecurityPopup,
    ConfirmPopupOfRegisterSecurity,
  },
};
</script>

<style scoped>
.password-toggle {
  position: absolute;
  top: 39%;
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
  position: absolute;
  width: 1200px;
  padding: 25px;
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