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
              <td>{{ index+1 }}</td>
              <td>{{ shop.name }}</td>
              <td>{{ shop.address }}</td>
              <td>{{ shop.hotline }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-warning"
                  @click="buttonUpdateShop()"
                >
                  edit
                </button>
              </td>
              <td class="box-contain-button">
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="deleteShopButton(product.id)"
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
  </div>
</template>

<script>
import Common from "../common/Common";
import "../common/BuildTable.css";
import { mapActions, mapMutations } from "vuex";
import { mapGetters } from "vuex";
import FormSaveAndEditShopPopup from "./FormSaveAndEditShopPopup.vue";

export default {
  name: "ShopVue",

  components: {
    FormSaveAndEditShopPopup,
  },

  data() {
    return {
      count:0,
      keyword: "",
    }
  },

  methods: {
    ...mapActions("ShopModule", ["fetchShopList", "searchShopByKeyword"]),
    ...mapMutations("AppVueModule", ["setRestartRouterView"]),
    ...mapMutations("ShopModule", ["setActiveOfPopup", "setStateBtnSaveOfForm", "setStateBtnUpdateOfForm"]),

    addCount() {
      return this.count++;
    },

    async searchByKeyword() {
      const data = {
        keyword: this.keyword, 
        user: JSON.parse(JSON.stringify(this.getUser))
      }
      if (this.keyword != null && this.keyword != "") {
        await this.searchShopByKeyword(data);
      } else {
        this.setRestartRouterView(!this.getRestartRouterView);
      }
    },

    keywordNull() {
      if (this.keyword == null || this.keyword == "") {
        this.setRestartRouterView(!this.getRestartRouterView);
      }
    },

    buttonUpdateShop() {
      this.setActiveOfPopup(true)
      this.setStateBtnSaveOfForm(true)
      this.setStateBtnUpdateOfForm(false)
    },

    buttonCreateShop() {
      this.setActiveOfPopup(true)
      this.setStateBtnSaveOfForm(false)
      this.setStateBtnUpdateOfForm(true)
    },
  },

  created() {
    const common = new Common();
    common.redirectByJwtAndUrl();
    this.fetchShopList();
  },

  computed: {
    ...mapGetters("ShopModule", ["getShopList"]),
    ...mapGetters("SecurityModule", ["getUser"]),
    ...mapGetters("AppVueModule", ["getRestartRouterView"]),

    shopList() {
      return this.getShopList;
    },

    user() {
      return this.getUser;
    },
  }
};
</script>

<style scoped>
.box-contain-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>