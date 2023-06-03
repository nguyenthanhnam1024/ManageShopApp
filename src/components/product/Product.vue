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
              <th scope="col">price</th>
              <th scope="col">described</th>
              <th scope="col">date of manufacture</th>
              <th scope="col">expiry</th>
              <th scope="col">origin</th>
              <th colspan="2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in productList" :key="product.id">
              <td>{{ count }}</td>
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
                  @click="deleteProductButton(product.id)"
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
      <ConfirmDeleteProductPopup
        :productName="productName"
        :activeConfirmDeleteProductPopup="activeConfirmDeleteProductPopup"
        @confirmNoDelete="confirmNoDelete"
        @confirmDeleteProduct="confirmDeleteProduct"
      />
      <FormProductPopupVue />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import ConfirmDeleteProductPopup from "./ConfirmDeleteProductPopup.vue";
import FormProductPopupVue from "./FormProductPopup.vue";
import Common from "@/Common";
import "@/BuildTable.css";

export default {
  name: "Product-Vue",
  data() {
    return {
      keyword: null,
      idShop: 1,
      count: 0,
      productName: "",
      activeConfirmDeleteProductPopup: false,
      idProductDelete: null,
      idShopProductDelete: null,
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
      "setActiveFormProductPopup",
      "setButtonCreateFormProductPopup",
      "setButtonUpdateFormProductPopup",
      "setActiveAlertProductPopup",
      "setMessageAlertProductPopup",
      "setProductEdit",
      "setRestartRouterView",
      "setFieldsErrorMap",
    ]),
    buttonCreateProduct() {
      this.setProductEdit({
        id: null,
        name: "",
        idShop: 1,
        price: null,
        described: "",
        dateOfManufacture: "",
        expiry: "",
        origin: "",
      });
      this.setFieldsErrorMap([]);
      this.setActiveFormProductPopup(true);
      this.setButtonCreateFormProductPopup(false);
      this.setButtonUpdateFormProductPopup(true);
    },
    async buttonUpdateProduct(productId) {
      await this.getProductById(productId);
      this.setFieldsErrorMap([]);
      this.setActiveFormProductPopup(true);
      this.setButtonCreateFormProductPopup(true);
      this.setButtonUpdateFormProductPopup(false);
    },
    async deleteProductButton(productId) {
      await this.getProductById(productId);
      this.activeConfirmDeleteProductPopup = true;
    },
    confirmNoDelete() {
      this.activeConfirmDeleteProductPopup = false;
    },
    async confirmDeleteProduct() {
      const response = await this.deleteProduct();
      if (response.status == 200) {
        this.setRestartRouterView(!this.getRestartRouterView);
        this.setMessageAlertProductPopup("Delete success !");
      } else {
        if (response.status == 400) {
          this.setMessageAlertProductPopup(response.data);
        } else {
          this.setMessageAlertProductPopup(
            "error " + response.data.status + " :" + response.data.error
          );
        }
      }
      this.setActiveAlertProductPopup(true);
      this.activeConfirmDeleteProductPopup = false;
    },
    searchByKeyword() {
      if (this.keyword != null && this.keyword != "") {
        this.searchProduct(this.keyword);
      } else {
        this.setRestartRouterView(!this.getRestartRouterView);
      }
    },
    keywordNull() {
      if (this.keyword == null || this.keyword == "") {
        this.setRestartRouterView(!this.getRestartRouterView);
      }
    },
  },
  created() {
    this.fetchProductList(this.idShop);
    const common = new Common();
    common.redirectByJwtAndUrl();
  },
  computed: {
    ...mapGetters("ProductModule", ["getProductList", "getRestartRouterView"]),
    productList() {
      return this.getProductList;
    },
  },
  components: {
    ConfirmDeleteProductPopup,
    FormProductPopupVue,
  },
};
</script>

<style scoped>
</style>