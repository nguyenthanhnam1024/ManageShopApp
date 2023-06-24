<template>
  <div class="wrapper-popup" :class="activeFormProductPopup">
    <div class="box">
      <form>
        <p><b>Information Order</b></p>
        <div>
          <label for="date"
            >date:
            <span class="messageFieldError">{{
              fieldsErrorMap.date
            }}</span></label
          >
          <input type="date" id="date" v-model="getOrder.date" />
        </div>
        <div>
          <label for="shop"
            >shop:
            <span class="messageFieldError">{{
              fieldsErrorMap.shop
            }}</span></label
          >
          <input
            class="no-input"
            type="text"
            id="shop"
            v-model="getOrder.shop.name"
          />
        </div>
        <div>
          <label for="seller"
            >seller:
            <span class="messageFieldError">{{
              fieldsErrorMap.seller
            }}</span></label
          >
          <input
            class="no-input"
            type="text"
            id="seller"
            v-model="getOrder.seller.name"
          />
        </div>
        <div>
          <p>
            <label for="select-option"
              >Select product:<span class="messageError">
                {{ getFieldsErrorMap.product }}</span
              ></label
            >
          </p>
          <select id="select-option" class="select" v-model="getOrder.product">
            <option
              v-for="(product, index) in getProductList"
              :key="index"
              :value="product"
            >
              {{ product.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="quantity"
            >quantity:
            <span class="messageFieldError">{{
              fieldsErrorMap.quantity
            }}</span></label
          >
          <input type="number" id="quantity" v-model="getOrder.quantity" />
        </div>
        <button
          type="button"
          class="btn btn-success button-save"
          :class="setClassDisplayForSaveSave"
          @click="btnSaveFromProduct"
        >
          Save
        </button>
        <button
          type="button"
          class="btn btn-success button-save"
          :class="setClassDisplayForButtonUpdate"
          @click="buttonUpdateProduct"
        >
          Update
        </button>
        <button type="button" class="btn button-comback" @click="comeBack">
          Comback
        </button>
      </form>
    </div>
    <ConfirmCommon
      :activeConfirmCommon="activeConfirmCommon"
      :messageConfirmCommon="messageConfirmCommon"
      @confirmYesFromConfirmCommon="confirmYesFromConfirmCommon"
      @confirmNoFromConfirmCommon="confirmNoFromConfirmCommon"
    />
    <AlertCommon
      :activeAlertCommon="activeAlertCommon"
      :messageAlertCommon="messageAlertCommon"
      @ClickOkeFromAlertCommon="ClickOkeFromAlertCommon"
    />
  </div>
</template>
  
  <script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import ConfirmCommon from "../common/ConfirmCommon.vue";
import AlertCommon from "../common/AlertCommon.vue";

export default {
  name: "FormOrderPopup",

  components: {
    ConfirmCommon,
    AlertCommon,
  },

  data() {
    return {
      activeConfirmCommon: false,
      messageConfirmCommon: null,
      activeAlertCommon: false,
      messageAlertCommon: null,
    };
  },

  created() {
    this.fetchProductList();
  },

  methods: {
    ...mapMutations("OrderModule", ["setActiveFormOrder", "setOrder"]),
    ...mapActions("OrderModule", ["saveOrder", "updateOrder"]),
    ...mapMutations("AppVueModule", [
      "setRestartRouterView",
      "setFieldsErrorMap",
    ]),
    ...mapActions("ProductModule", ["fetchProductList"]),

    resetInfo() {
      this.setOrder({
        date: null,
        shop: {},
        seller: {},
        product: {},
        quantity: null,
      });
      this.setFieldsErrorMap([]);
    },

    ClickOkeFromAlertCommon() {
      this.activeAlertCommon = false;
      this.activeConfirmCommon = false;
    },

    async confirmYesFromConfirmCommon() {
      let response = null;
      if (this.getStateBtnSaveFormOrder == false) {
        response = await this.saveOrder();
      }
      if (this.getStateBtnUpdateFormOrder == false) {
        response = await this.updateOrder();
      }
      if (response.status == 200) {
        this.setRestartRouterView(!this.getRestartRouterView);
        this.resetInfo();
        this.setActiveFormOrder(false);
      } else {
        if (response.status == 400) {
          this.messageAlertCommon = response.data;
          this.activeAlertCommon = true;
        } else {
          if (response.status == 1000) {
            this.setFieldsErrorMap(response.data);
          } else {
            this.messageAlertCommon =
              "error " + response.data.status + " :" + response.data.message;
            this.activeAlertCommon = true;
          }
        }
      }
      this.activeConfirmCommon = false;
    },

    confirmNoFromConfirmCommon() {
      this.activeConfirmCommon = false;
    },

    comeBack() {
      this.setActiveFormOrder(false);
      this.resetInfo();
    },

    btnSaveFromProduct() {
      this.activeConfirmCommon = true;
      this.messageConfirmCommon = "you sure create product ?";
    },

    buttonUpdateProduct() {
      this.activeConfirmCommon = true;
      this.messageConfirmCommon = "you sure update product ?";
    },
  },
  computed: {
    ...mapGetters("OrderModule", [
      "getActiveFormOrder",
      "getStateBtnSaveFormOrder",
      "getStateBtnUpdateFormOrder",
      "getOrder",
    ]),
    ...mapGetters("AppVueModule", [
      "getRestartRouterView",
      "getFieldsErrorMap",
    ]),
    ...mapGetters("ProductModule", ["getProductList"]),

    activeFormProductPopup() {
      return {
        "open-popup": this.getActiveFormOrder,
      };
    },
    setClassDisplayForSaveSave() {
      return {
        "display-none": this.getStateBtnSaveFormOrder,
      };
    },
    setClassDisplayForButtonUpdate() {
      return {
        "display-none": this.getStateBtnUpdateFormOrder,
      };
    },
    fieldsErrorMap() {
      return this.getFieldsErrorMap;
    },
  },
};
</script>
  
  <style scoped>
select {
  margin-top: -10px;
  height: 23px;
}
option {
  font-size: 18px;
}
.no-input {
  pointer-events: none;
  user-select: none;
}
.messageFieldError {
  font-size: 13px;
}
div div form div input {
  font-size: 12px;
  height: 22px;
}
div div form div label {
  font-size: 12px;
}
.button-save {
  width: 90px;
  margin-left: 40px;
}
.display-none {
  display: none;
}
.button-comback {
  margin-left: 60px;
  width: 90px;
  background-color: rgb(237, 187, 127);
}
.box form span {
  color: red;
}
.box form div label {
  color: rgb(14, 88, 217);
}
.box form div {
  margin-bottom: 10px;
  font-size: 80%;
  display: flex;
  flex-direction: column;
}
.box {
  width: 350px;
  height: 420px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.4);
  background-color: #fff;
  position: absolute;
  font-family: Arial, Helvetica, sans-serif;
  box-shadow: 0px 0px 10px #000;
  border-radius: 5px;
}
div form {
  margin: 10px;
}
.wrapper-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.16);
}
.wrapper-popup.open-popup {
  opacity: 1;
  visibility: visible;
}
</style>