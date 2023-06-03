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
            <tr v-for="product in productList" :key="product.id">
              <td>{{ count }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.expiry }}</td>
              <td>{{ product.origin }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-warning"
                  @click="buttonUpdateShop(product.id)"
                >
                  edit
                </button>
              </td>
              <td>
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
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Common from "@/Common";
import "@/BuildTable.css";

export default {
  name: "ShopVue",
  methods: {
    ...mapMutations("AppVueModule", ["setInactiveNavbar"]),
  },
  created() {
    const common = new Common();
    common.redirectByJwtAndUrl();
  },
};
</script>

<style scoped>
</style>