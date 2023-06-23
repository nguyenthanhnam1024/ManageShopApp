<template>
  <div>
    <div></div>
    <div class="corver">
      <span>Danh sách sản phẩm</span>
      <div class="wrapper-search">
        <input
          class="form-control mr-sm-2"
          type="text"
          v-model="keyword"
          placeholder="keyword..."
          @input="keywordNull"
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
              <th scope="col">price</th>
              <th scope="col">described</th>
              <th scope="col">date of manufacture</th>
              <th scope="col">expiry</th>
              <th scope="col">origin</th>
              <th colspan="2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in productList" :key="product.id">
              <td>{{ index+1 }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }} vnđ</td>
              <td>{{ product.described }}</td>
              <td>{{ product.dateOfManufacture }}</td>
              <td>{{ product.expiry }}</td>
              <td>{{ product.origin }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-warning"
                  @click="buttonUpdateProduct(product.id)"
                >
                  edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="deleteProductButton(product.id, product.name)"
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
        <button type="button" class="btn-create" @click="buttonCreateProduct">
          Create product
        </button>
      </div>
      <FormProductPopupVue />
    </div>
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
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import FormProductPopupVue from "./FormProductPopup.vue";
import Common from "../common/Common";
import "../common/BuildTable.css";
import AlertCommon from "../common/AlertCommon.vue";
import ConfirmCommon from "../common/ConfirmCommon.vue";

export default {
  name: "Product-Vue",

  components: {
    FormProductPopupVue,
    AlertCommon,
    ConfirmCommon,
  },

  data() {
    return {
      keyword: null,
      activeAlertCommon: false,
      messageAlertCommon: null,
      activeConfirmCommon: false,
      messageConfirmCommon: null,
    };
  },
  methods: {
    ...mapActions("ProductModule", [
      "fetchProductList",
      "deleteProduct",
      "searchProduct",
      "getProductById",
    ]),
    ...mapMutations("ProductModule", [
      "setActiveFormProduct",
      "setStateBtnSaveFormProduct",
      "setStateBtnUpdateFormProduct",
      "setIdProduct",
      "setKeywordForSearchProduct",
    ]),
    ...mapMutations("AppVueModule", ["setRestartRouterView"]),

    ClickOkeFromAlertCommon() {
      this.activeAlertCommon = false;
    },

    async confirmYesFromConfirmCommon() {
      const response = await this.deleteProduct();
      if(response.status == 200) {
        this.setRestartRouterView(!this.getRestartRouterView);
      } else {
        this.activeAlertCommon = true;
        this.messageAlertCommon = response.data;
      }
      this.activeConfirmCommon = false;
    },

    confirmNoFromConfirmCommon() {
      this.activeConfirmCommon = false;
    },

    buttonCreateProduct() {
      this.setActiveFormProduct(true);
      this.setStateBtnSaveFormProduct(false);
      this.setStateBtnUpdateFormProduct(true);
    },
    async buttonUpdateProduct(idProduct) {
      this.setIdProduct(idProduct);
      await this.getProductById();
      this.setActiveFormProduct(true);
      this.setStateBtnSaveFormProduct(true);
      this.setStateBtnUpdateFormProduct(false);
    },

    deleteProductButton(productId, productName) {
      this.setIdProduct(productId);
      this.activeConfirmCommon = true;
      this.messageConfirmCommon = "you sure delete product: " + productName;
    },

    searchByKeyword() {
      if (this.keyword != null && this.keyword != "") {
        this.setKeywordForSearchProduct(this.keyword);
        this.searchProduct();
      }
    },
    keywordNull() {
      if (this.keyword == null || this.keyword == "") {
        this.setRestartRouterView(!this.getRestartRouterView);
      }
    },
  },
  created() {
    const common = new Common();
    common.redirectByJwtAndUrl();
    this.fetchProductList();
  },
  computed: {
    ...mapGetters("ProductModule", ["getProductList", "getRestartRouterView"]),
    ...mapGetters("AppVueModule", ["getRestartRouterView"]),

    productList() {
      return this.getProductList;
    },
  },
};
</script>

<style scoped>
</style>