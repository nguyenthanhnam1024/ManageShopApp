<template>
  <div>
    <div></div>
    <div class="corver">
      <span>Danh sách hóa đơn</span>
      <div class="wrapper-search">
        <input class="form-control mr-sm-2" type="date" v-model="date" />
        <button
          class="btn btn-outline-success my-2 my-sm-0"
          type="button"
          @click="searchOrderByDate"
        >
          Search
        </button>
        <button
          class="btn btn-outline-success my-2 my-sm-0 margin-btn-refetch"
          type="button"
          @click="refetchOrder"
        >
          refetch
        </button>
      </div>
      <div class="table-wrapper">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">stt</th>
              <th scope="col">date</th>
              <th scope="col">shop name</th>
              <th scope="col">seller</th>
              <th scope="col">product</th>
              <th scope="col">quantity</th>
              <th colspan="2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in getOrderList" :key="order.id">
              <td>{{ index + 1 }}</td>
              <td>{{ order.date }}</td>
              <td>{{ order.shop.name }}</td>
              <td>{{ order.seller.name }}</td>
              <td>{{ order.product.name }}</td>
              <td>{{ order.quantity }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-warning"
                  @click="buttonUpdateOrder(order)"
                >
                  edit
                </button>
              </td>
              <td :class="statteBtnDelete">
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="deleteOrderButton(order.id)"
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
        <button type="button" class="btn-create" @click="buttonCreateOrder">
          Create order
        </button>
      </div>
    </div>
    <FormCreateAndUpdateOrder />
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
import Common from "../common/Common";
import "../common/BuildTable.css";
import AlertCommon from "../common/AlertCommon.vue";
import ConfirmCommon from "../common/ConfirmCommon.vue";
import FormCreateAndUpdateOrder from "./FormCreateAndUpdateOrder.vue";

export default {
  name: "Order-Vue",

  components: {
    AlertCommon,
    ConfirmCommon,
    FormCreateAndUpdateOrder,
  },

  data() {
    return {
      keyword: null,
      activeAlertCommon: false,
      messageAlertCommon: null,
      activeConfirmCommon: false,
      messageConfirmCommon: null,
      date: Date,
    };
  },
  methods: {
    ...mapActions("OrderModule", [
      "fetchListOrder",
      "getOrderById",
      "deleteOrder",
      "searchOrder",
    ]),
    ...mapMutations("OrderModule", [
      "setActiveFormOrder",
      "setStateBtnSaveFormOrder",
      "setStateBtnUpdateFormOrder",
      "setIdOrder",
      "setOrder",
      "setDate",
    ]),
    ...mapMutations("AppVueModule", ["setRestartRouterView"]),

    refetchOrder() {
      this.fetchListOrder();
    },
    async searchOrderByDate() {
      this.setDate(this.date);
      this.searchOrder();
    },

    ClickOkeFromAlertCommon() {
      this.activeAlertCommon = false;
    },

    async confirmYesFromConfirmCommon() {
      const response = await this.deleteOrder();
      if (response.status == 200) {
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

    buttonCreateOrder() {
      this.setOrder({
        date: null,
        shop: this.getShop,
        seller: {
          id: this.getUser.id,
          name: this.getUser.name,
        },
        product: {
          id: 0,
        },
        quantity: null,
      });
      this.setActiveFormOrder(true);
      this.setStateBtnSaveFormOrder(false);
      this.setStateBtnUpdateFormOrder(true);
    },

    async buttonUpdateOrder(order) {
      if (order.seller.id != this.getUser.id && this.getUser.role == "STAFF") {
        this.activeAlertCommon = true;
        this.messageAlertCommon = "you only update your order";
      } else {
        this.setIdOrder(order.id);
        await this.getOrderById();
        this.setActiveFormOrder(true);
        this.setStateBtnSaveFormOrder(true);
        this.setStateBtnUpdateFormOrder(false);
      }
    },

    deleteOrderButton(orderId) {
      this.setIdOrder(orderId);
      this.activeConfirmCommon = true;
      this.messageConfirmCommon = "you sure delete order ?";
    },
  },
  created() {
    const common = new Common();
    common.redirectByJwtAndUrl();
    this.fetchListOrder();
  },
  computed: {
    ...mapGetters("OrderModule", ["getOrderList"]),
    ...mapGetters("AppVueModule", ["getRestartRouterView"]),
    ...mapGetters("SecurityModule", ["getUser", "getShop"]),

    statteBtnDelete() {
      if (this.getUser.role == "STAFF") {
        return {
          "display-none": true,
        };
      }
      return {
        "display-none": false,
      };
    },
  },
};
</script>
  
  <style scoped>
.display-none {
  display: none;
}
.margin-btn-refetch {
  margin: 8px;
}
</style>