<template>
  <div class="product-corver">
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
    <div class="table-product">
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
    <div class="div-create-product">
      <button
        type="button"
        class="btn-create-product"
        @click="buttonCreateProduct"
      >
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
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import ConfirmDeleteProductPopup from "./ConfirmDeleteProductPopup.vue";
import FormProductPopupVue from "./FormProductPopup.vue";

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
      this.activeConfirmDeleteProductPopup = false;
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
    }
  },
  computed: {
    ...mapGetters("ProductModule", ["getProductList", "getRestartRouterView"]),
    productList() {
      return this.getProductList;
    },
  },
  created() {
    this.fetchProductList(this.idShop);
  },
  components: {
    ConfirmDeleteProductPopup,
    FormProductPopupVue,
  },
};
</script>

<style scoped>
.wrapper-search input {
  width: 220px;
  margin-left: auto;
}
.wrapper-search {
  text-align: right;
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
  margin-bottom: 10px;
}
.div-create-product {
  margin: 5px;
}
div span {
  font-size: 140%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: blue;
  margin-left: 0%;
}
.btn-create-product {
  color: #fff;
  background-color: rgb(3, 145, 18);
  padding: 5px;
  width: 150px;
  border: hidden;
  border-radius: 9px;
  font-size: 130%;
}
.product-corver {
  margin-left: 25px;
  margin-right: 25px;
}
.table-product {
  height: 400px;
  overflow-y: scroll;
  border: 1px solid greenyellow;
}
</style>