<template>
  <div>
    <div></div>
    <div class="corver">
      <span>Danh sách cửa hàng</span>
      <div class="wrapper-search">
        <input
          class="form-control mr-sm-2"
          type="text"
          v-model="keyword"
          placeholder="keyword..."
          @keyup="keywordNull"
        />
        <button
          class="btn btn-outline-success my-2 my-sm-0"
          type="button"
          @click="searchByKeyword"
        >
          Search
        </button>
      </div>
      <div class="table-wrapper">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">stt</th>
              <th scope="col">name</th>
              <th scope="col">address</th>
              <th scope="col">hotline</th>
              <th colspan="2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(shop, index) in shopList" :key="shop.id">
              <td>{{ index + 1 }}</td>
              <td class="shop-name" @click="clickInShop(shop)">{{ shop.name }}</td>
              <td>{{ shop.address }}</td>
              <td>{{ shop.hotline }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-warning"
                  @click="buttonUpdateShop(shop.id)"
                >
                  edit
                </button>
              </td>
              <td class="box-contain-button">
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="deleteShopButton(shop.id, shop.name)"
                >
                  delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <div class="div-create-object">
        <button type="button" class="btn-create" @click="buttonCreateShop">
          Create shop
        </button>
      </div>
    </div>
    <FormSaveAndEditShopPopup />
    <AlertCommon
      :activeAlertCommon="activeAlertCommon"
      :messageAlertCommon="messageAlertCommon"
      @ClickOkeFromAlertCommon="ClickOkeFromAlertCommon"
    />
    <ConfirmCommon 
      :activeConfirmCommon="activeConfirmCommon"
      :messageConfirmCommon="messageConfirmCommon"
      @confirmNoFromConfirmCommon="confirmNoFromConfirmCommon"
      @confirmYesFromConfirmCommon="confirmYesFromConfirmCommon"
    />
  </div>
</template>

<script>
import Common from "../common/Common";
import "../common/BuildTable.css";
import { mapActions, mapMutations } from "vuex";
import { mapGetters } from "vuex";
import FormSaveAndEditShopPopup from "./FormSaveAndEditShopPopup.vue";
import AlertCommon from "../common/AlertCommon.vue";
import ConfirmCommon from "../common/ConfirmCommon.vue";

export default {
  name: "ShopVue",

  components: {
    FormSaveAndEditShopPopup,
    AlertCommon,
    ConfirmCommon,
  },

  data() {
    return {
      keyword: "",
      activeAlertCommon: false,
      messageAlertCommon: null,
      activeConfirmCommon: false,
      messageConfirmCommon: null,
    };
  },

  methods: {
    ...mapActions("ShopModule", [
      "fetchShopList",
      "searchShopByKeyword",
      "getShopById",
      "deleteShop",
    ]),
    ...mapMutations("AppVueModule", ["setRestartRouterView"]),
    ...mapMutations("ShopModule", [
      "setActiveOfPopup",
      "setStateBtnSaveOfForm",
      "setStateBtnUpdateOfForm",
      "setIdShopAsDelete",
    ]),
    ...mapMutations("SecurityModule", ["setShop"]),

    clickInShop(shop) {
      this.setShop(shop);
      this.$router.push("/product")
    },

    async confirmYesFromConfirmCommon() {
      const response = await this.deleteShop();
      if (response.status != 200) {
        this.activeAlertCommon = true;
        this.messageAlertCommon = response.data;
      } else {
        this.setRestartRouterView(!this.getRestartRouterView);
      }
      this.activeConfirmCommon = false;
    },

    confirmNoFromConfirmCommon() {
      this.activeConfirmCommon = false;
    },

    deleteShopButton(id, name) {
      this.activeConfirmCommon = true;
      this.messageConfirmCommon = "you want delete shop : "+name;
      this.setIdShopAsDelete(id);
    },

    async searchByKeyword() {
      if (this.keyword != null && this.keyword != "") {
        await this.searchShopByKeyword(this.keyword);
      }
    },

    keywordNull() {
      if (this.keyword == null || this.keyword == "") {
        this.setRestartRouterView(!this.getRestartRouterView);
      }
    },

    async buttonUpdateShop(id) {
      const response = await this.getShopById(id);
      if (response.status == 200) {
        this.setActiveOfPopup(true);
        this.setStateBtnSaveOfForm(true);
        this.setStateBtnUpdateOfForm(false);
      } else {
        this.activeAlertCommon = true;
        this.messageAlertCommon = "Error! can not edit";
      }
    },

    ClickOkeFromAlertCommon() {
      this.activeAlertCommon = false;
    },

    buttonCreateShop() {
      this.setActiveOfPopup(true);
      this.setStateBtnSaveOfForm(false);
      this.setStateBtnUpdateOfForm(true);
    },
  },

  created() {
    const common = new Common();
    common.redirectByJwtAndUrl();
    this.fetchShopList();
  },

  computed: {
    ...mapGetters("ShopModule", ["getShopList"]),
    ...mapGetters("AppVueModule", ["getRestartRouterView"]),

    shopList() {
      return this.getShopList;
    },
  },
};
</script>

<style scoped>
.shop-name {
  color: blue;
  font-size: 18px;
  background-color: #fff;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.shop-name:hover {
  box-shadow: inset 0 0 10px 5px rgba(21, 130, 239, 0.3)
}
.box-contain-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>