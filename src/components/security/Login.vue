!<template>
  <div>
    <AlertSecurityPopup
      :activeAlertSecurityPopup="activeAlertSecurityPopup"
      :messageAlertSecurityPopup="messageAlertSecurityPopup"
      @alertOke="alertOke"
    />
    <div class="form">
      <form>
        <h1>Login</h1>
        <p>{{ messageError }}</p>
        <div class="form-group">
          <label for="exampleInputEmail1">User name:</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="accountLogin.userName"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password:</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            class="form-control"
            id="exampleInputPassword1"
            v-model="accountLogin.password"
          />
          <span class="password-toggle" @click="toggleShowPassword">
            <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
          </span>
        </div>
        <button type="button" class="btn btn-primary" @click="confirmLogin">
          login
        </button>
        <div>
          <a href="http://localhost:8080/register">Click a here to register</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import AlertSecurityPopup from "./AlertSecurityPopup.vue";
import Common from "@/Common";

export default {
  name: "Login-vue",
  data() {
    return {
      messageError: null,
      activeAlertSecurityPopup: false,
      messageAlertSecurityPopup: null,
      showPassword: false,
    };
  },
  methods: {
    ...mapActions("SecurityModule", ["login"]),
    ...mapMutations("SecurityModule", ["setAcconutLogin"]),
    ...mapMutations("AppVueModule", ["setInactiveNavbar"]),
    async confirmLogin() {
      const response = await this.login();
      if (response.status == 200) {
        this.setAcconutLogin({
          userName: "",
          password: "",
        });
        if (response.data.role == "ADMIN") {
          this.$router.push({ path: "/shop" });
        } else {
          this.$router.push({ path: "/product" });
        }
      } else {
        if (response.status == 1000) {
          this.messageError = response.data;
        } else {
          this.activeAlertSecurityPopup = true;
          this.messageAlertSecurityPopup = response.data;
        }
      }
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
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
  },
  created() {
    const common = new Common();
    common.redirectByJwtAndUrl();
  },
  computed: {
    ...mapState("SecurityModule", ["accountLogin"]),
  },
  components: {
    AlertSecurityPopup,
  },
};
</script>

<style scoped>
.password-toggle {
  position: absolute;
  top: 54%;
  right: 45px;
  transform: translateY(-50%);
  cursor: pointer;
}
.password-toggle i {
  color: #a46b6b;
}
.password-toggle:hover i {
  color: #724949;
}
a {
  font-size: 130%;
  margin-left: 145px;
  margin-top: 160px;
  display: flex;
}
p {
  color: red;
  text-align: center;
  font-size: large;
}
.form {
  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  display: block;
  border-radius: 20px;
  border: 1px solid black;
}
h1 {
  margin-top: 15px;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 20px 20px 0 0;
  height: 80px;
}
label {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 5px;
  margin-left: 5px;
}
input {
  width: 450px;
  height: 45px;
  border-radius: 5px;
  margin-left: 20px;
}
button {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  margin-top: 150px;
  width: 120px;
  height: 55px;
  font-size: 20px;
  border-radius: 7px;
}
.register {
  border-radius: 0 0 20px 20px;
}
</style>