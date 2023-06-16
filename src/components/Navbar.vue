<template>
  <div>
    <Alert
      :activeAlertVue="activeAlertVue"
      :messageAlertVue="messageAlertVue"
      @alertOke="alertOke"
    />
    <Confirm
      :activeConfirm="activeConfirm"
      @confirmYes="confirmYes"
      @confirmNo="confirmNo"
    />
    <div class="header">
      <div class="header-left">
        <h1>{{ getShop.name }}</h1>
        <h5 :class="setActiveInfoShopByIdShop">
          Address: {{ getShop.address }}
        </h5>
      </div>
      <div class="header-right">
        <h4 :class="setActiveInfoShopByIdShop">
          Hotline: {{ getShop.hotline }}
        </h4>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-style">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li
            class="nav-item"
            :class="[
              setActiveBtnNavbarByRoleMANAGE,
              setActiveBtnNavbarByRoleSTAFF,
              setActiveBtnNavbarByRoleADMINInShop,
            ]"
          >
            <router-link
              to="/shop"
              class="nav-link"
              :class="{ afterClickBtn: activeHoverBtnShop }"
              @click="BtnShop"
              >Shops</router-link
            >
          </li>
          <li class="nav-item" :class="setActiveBtnNavbarByRoleADMIN">
            <router-link
              to="/product"
              class="nav-link"
              :class="{ afterClickBtn: activeHoverBtnProduct }"
              @click="BtnProduct"
              >Product</router-link
            >
          </li>
          <li class="nav-item" :class="[setActiveBtnNavbarByRoleSTAFF]">
            <router-link
              to="/user"
              class="nav-link"
              :class="{ afterClickBtn: activeHoverBtnUser }"
              @click="BtnUser"
              >Users</router-link
            >
          </li>
          <li class="nav-item" :class="setActiveBtnNavbarByRoleADMIN">
            <router-link
              to="/receipt"
              class="nav-link"
              :class="{ afterClickBtn: activeHoverBtnReceipt }"
              @click="BtnReceipt"
              >Receipt</router-link
            >
          </li>
          <li class="nav-item" :class="setActiveBtnNavbarByRoleADMIN">
            <router-link
              to="/deliveryBill"
              class="nav-link"
              :class="{ afterClickBtn: activeHoverBtnDeliveryBill }"
              @click="BtnDeliveryBill"
              >Delivery bill</router-link
            >
          </li>
          <li class="nav-item" :class="setActiveBtnNavbarByRoleADMIN">
            <router-link
              to="/order"
              class="nav-link"
              :class="{ afterClickBtn: activeHoverBtnOrder }"
              @click="BtnOrder"
              >Order</router-link
            >
          </li>
          <li class="nav-item" :class="setActiveBtnNavbarByRoleADMIN">
            <router-link
              to="/statisticalProduct"
              class="nav-link"
              :class="{ afterClickBtn: activeHoverBtnStatisticalProduct }"
              @click="BtnStatisticalProduct"
              >Statistical product</router-link
            >
          </li>
          <li
            class="nav-item"
            :class="[
              setActiveBtnNavbarByRoleADMIN,
              setActiveBtnNavbarByRoleSTAFF,
            ]"
          >
            <router-link
              to="/revenueProfit"
              class="nav-link"
              :class="{ afterClickBtn: activeHoverBtnRevenueProfit }"
              @click="BtnRevenueProfit"
              >Revenue profit</router-link
            >
          </li>
          <li
            class="nav-item"
            :class="[
              setActiveBtnNavbarByRoleMANAGE,
              setActiveBtnNavbarByRoleSTAFF,
              setActiveBtnNavbarByRoleADMINInShop,
            ]"
          >
            <router-link
              to="/role"
              class="nav-link"
              :class="{ afterClickBtn: activeHoverBtnRole }"
              @click="BtnRole"
              >Roles</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/account"
              class="nav-link"
              :class="{ afterClickBtn: activeHoverBtnAccount }"
              @click="BtnAccount"
              >Accounts</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item logout">
            <button class="button-login" @click="clickLogout">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import Alert from "./Alert.vue";
import Confirm from "./Confirm.vue";

export default {
  name: "NavbarMain",

  components: {
    Alert,
    Confirm,
  },

  data() {
    return {
      activeHoverBtnShop: false,
      activeHoverBtnProduct: false,
      activeHoverBtnReceipt: false,
      activeHoverBtnDeliveryBill: false,
      activeHoverBtnOrder: false,
      activeHoverBtnUser: false,
      activeHoverBtnStatisticalProduct: false,
      activeHoverBtnRevenueProfit: false,
      activeHoverBtnRole: false,
      activeHoverBtnAccount: false,
      activeAlertVue: false,
      messageAlertVue: "",
      activeConfirm: false,
    };
  },

  methods: {
    ...mapActions("SecurityModule", ["logout"]),

    clickLogout() {
      this.activeConfirm = true;
    },

    async confirmYes() {
      const response = await this.logout();
      if (response.status == 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("shop");
        this.$router.push({ path: "/" });
      } else {
        this.activeAlertVue = true;
        this.messageAlertVue = response.data;
      }
      this.activeConfirm = false;
    },

    alertOke() {
      this.activeAlertVue = false;
    },

    confirmNo() {
      this.activeConfirm = false;
    },

    BtnProduct() {
      this.activeHoverBtnShop = false;
      this.activeHoverBtnProduct = true;
      this.activeHoverBtnReceipt = false;
      this.activeHoverBtnDeliveryBill = false;
      this.activeHoverBtnOrder = false;
      this.activeHoverBtnUser = false;
      this.activeHoverBtnStatisticalProduct = false;
      this.activeHoverBtnRevenueProfit = false;
      this.activeHoverBtnRole = false;
      this.activeHoverBtnAccount = false;
    },
    BtnShop() {
      this.activeHoverBtnShop = true;
      this.activeHoverBtnProduct = false;
      this.activeHoverBtnReceipt = false;
      this.activeHoverBtnDeliveryBill = false;
      this.activeHoverBtnOrder = false;
      this.activeHoverBtnUser = false;
      this.activeHoverBtnStatisticalProduct = false;
      this.activeHoverBtnRevenueProfit = false;
      this.activeHoverBtnRole = false;
      this.activeHoverBtnAccount = false;
    },
    BtnReceipt() {
      this.activeHoverBtnShop = false;
      this.activeHoverBtnProduct = false;
      this.activeHoverBtnReceipt = true;
      this.activeHoverBtnDeliveryBill = false;
      this.activeHoverBtnOrder = false;
      this.activeHoverBtnUser = false;
      this.activeHoverBtnStatisticalProduct = false;
      this.activeHoverBtnRevenueProfit = false;
      this.activeHoverBtnRole = false;
      this.activeHoverBtnAccount = false;
    },
    BtnDeliveryBill() {
      this.activeHoverBtnShop = false;
      this.activeHoverBtnProduct = false;
      this.activeHoverBtnReceipt = false;
      this.activeHoverBtnDeliveryBill = true;
      this.activeHoverBtnOrder = false;
      this.activeHoverBtnUser = false;
      this.activeHoverBtnStatisticalProduct = false;
      this.activeHoverBtnRevenueProfit = false;
      this.activeHoverBtnRole = false;
      this.activeHoverBtnAccount = false;
    },
    BtnOrder() {
      this.activeHoverBtnShop = false;
      this.activeHoverBtnProduct = false;
      this.activeHoverBtnReceipt = false;
      this.activeHoverBtnDeliveryBill = false;
      this.activeHoverBtnOrder = true;
      this.activeHoverBtnUser = false;
      this.activeHoverBtnStatisticalProduct = false;
      this.activeHoverBtnRevenueProfit = false;
      this.activeHoverBtnRole = false;
      this.activeHoverBtnAccount = false;
    },
    BtnUser() {
      this.activeHoverBtnShop = false;
      this.activeHoverBtnProduct = false;
      this.activeHoverBtnReceipt = false;
      this.activeHoverBtnDeliveryBill = false;
      this.activeHoverBtnOrder = false;
      this.activeHoverBtnUser = true;
      this.activeHoverBtnStatisticalProduct = false;
      this.activeHoverBtnRevenueProfit = false;
      this.activeHoverBtnRole = false;
      this.activeHoverBtnAccount = false;
    },
    BtnStatisticalProduct() {
      this.activeHoverBtnShop = false;
      this.activeHoverBtnProduct = false;
      this.activeHoverBtnReceipt = false;
      this.activeHoverBtnDeliveryBill = false;
      this.activeHoverBtnOrder = false;
      this.activeHoverBtnUser = false;
      this.activeHoverBtnStatisticalProduct = true;
      this.activeHoverBtnRevenueProfit = false;
      this.activeHoverBtnRole = false;
      this.activeHoverBtnAccount = false;
    },
    BtnRevenueProfit() {
      this.activeHoverBtnShop = false;
      this.activeHoverBtnProduct = false;
      this.activeHoverBtnReceipt = false;
      this.activeHoverBtnDeliveryBill = false;
      this.activeHoverBtnOrder = false;
      this.activeHoverBtnUser = false;
      this.activeHoverBtnStatisticalProduct = false;
      this.activeHoverBtnRevenueProfit = true;
      this.activeHoverBtnRole = false;
      this.activeHoverBtnAccount = false;
    },
    BtnRole() {
      this.activeHoverBtnShop = false;
      this.activeHoverBtnProduct = false;
      this.activeHoverBtnReceipt = false;
      this.activeHoverBtnDeliveryBill = false;
      this.activeHoverBtnOrder = false;
      this.activeHoverBtnUser = false;
      this.activeHoverBtnStatisticalProduct = false;
      this.activeHoverBtnRevenueProfit = false;
      this.activeHoverBtnRole = true;
      this.activeHoverBtnAccount = false;
    },
    BtnAccount() {
      this.activeHoverBtnShop = false;
      this.activeHoverBtnProduct = false;
      this.activeHoverBtnReceipt = false;
      this.activeHoverBtnDeliveryBill = false;
      this.activeHoverBtnOrder = false;
      this.activeHoverBtnUser = false;
      this.activeHoverBtnStatisticalProduct = false;
      this.activeHoverBtnRevenueProfit = false;
      this.activeHoverBtnRole = false;
      this.activeHoverBtnAccount = true;
    },
  },

  computed: {
    ...mapGetters("SecurityModule", ["getUser", "getShop"]),

    setActiveBtnNavbarByRoleADMIN() {
      if (this.getUser.role == "ADMIN" && this.getShop.id == 0) {
        return {
          displayNoneForBtn: true,
        };
      }
      return {
        displayNoneForBtn: false,
      };
    },

    setActiveBtnNavbarByRoleADMINInShop() {
      if (this.getShop.id != 0 ) {
        return {
          displayNoneForBtn: true,
        };
      }
      return {
        displayNoneForBtn: false,
      };
    },

    setActiveBtnNavbarByRoleMANAGE() {
      if (this.getUser.role == "MANAGE") {
        return {
          displayNoneForBtn: true,
        };
      }
      return {
        displayNoneForBtn: false,
      };
    },

    setActiveBtnNavbarByRoleSTAFF() {
      if (this.getUser.role == "STAFF") {
        return {
          displayNoneForBtn: true,
        };
      }
      return {
        displayNoneForBtn: false,
      };
    },
    setActiveInfoShopByIdShop() {
      if (this.getShop.id == 0) {
        return {
          displayNoneForBtn: true,
        };
      }
      return {
        displayNoneForBtn: false,
      };
    },
  },
};
</script>

<style scoped>
.displayNoneForBtn {
  display: none;
}

.afterClickBtn {
  background-color: #e5bcef;
  border-radius: 8px;
}

h1 {
  color: rgb(56, 56, 246);
  margin: 0;
}

h5 {
  margin-top: 10px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: #e4f6da;
  height: 120px;
}

.header-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.header-right {
  display: flex;
  align-items: center;
  color: #850a5c;
  margin-top: 50px;
}

.navbar-style {
  margin: 5px;
  height: 50px;
  border-bottom: 1px #3e3e3e solid;
}

.navbar-nav .nav-item {
  margin-right: 10px;
}

.navbar-nav .nav-item:last-child {
  margin-right: 0;
}

.nav-item .nav-link {
  color: #3a57fc;
  font-size: 16px;
  font-weight: bold;
}

.nav-item .nav-link:hover {
  color: #bb08c2;
  background-color: #e5bcef;
  border-radius: 8px;
}

.logout {
  display: flex;
  align-items: center;
}

.logout .button-login {
  font-size: 20px;
  border-radius: 4px;
  background-color: #f39e00;
  color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.logout .button-login:hover {
  background-color: #f42929;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-left {
    margin-bottom: 10px;
  }

  .header-right {
    margin-top: 10px;
    justify-content: flex-end;
    width: 100%;
  }

  .navbar-style {
    margin: 5px;
    height: 50px;
    border-bottom: 1px #3e3e3e solid;
    flex-direction: column;
  }

  .navbar-collapse {
    justify-content: space-between;
  }

  .navbar-nav .nav-item {
    margin-right: 0;
    margin-bottom: 5px;
  }

  .navbar-nav .nav-item:last-child {
    margin-bottom: 0;
  }
}
</style>
