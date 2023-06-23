<template>
  <div class="wrapper-popup" :class="activeFormProductPopup">
    <div class="box">
      <form>
        <p>Information product</p>
        <div>
          <label for="name"
            >Name product:
            <span class="messageFieldError">{{
              fieldsErrorMap.name
            }}</span></label
          >
          <input
            type="text"
            id="name"
            placeholder="product name"
            v-model="getProduct.name"
          />
        </div>
        <div>
          <label for="price"
            >Price(...vnđ):
            <span class="messageFieldError">{{
              fieldsErrorMap.price
            }}</span></label
          >
          <input
            type="number"
            id="price"
            placeholder="number >= 1"
            v-model="getProduct.price"
          />
        </div>
        <div>
          <label for="exampleFormControlTextarea1"
            >Described:
            <span class="messageFieldError">{{
              fieldsErrorMap.described
            }}</span></label
          >
          <textarea
            id="exampleFormControlTextarea1"
            rows="2"
            placeholder="paragraph less 1000 keyword"
            v-model="getProduct.described"
          ></textarea>
        </div>
        <div>
          <label for="price"
            >Date of manufacture:
            <span class="messageFieldError">{{
              fieldsErrorMap.dateOfManufacture
            }}</span></label
          >
          <input
            type="date"
            id="price"
            v-model="getProduct.dateOfManufacture"
          />
        </div>
        <div>
          <label for="price"
            >Expiry:
            <span class="messageFieldError">{{
              fieldsErrorMap.expiry
            }}</span></label
          >
          <input type="date" id="price" v-model="getProduct.expiry" />
        </div>
        <div>
          <label for="price"
            >Origin:
            <span class="messageFieldError">{{
              fieldsErrorMap.origin
            }}</span></label
          >
          <input
            type="text"
            id="price"
            placeholder="where production"
            v-model="getProduct.origin"
          />
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
  name: "FormProductPopup",

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
  methods: {
    ...mapMutations("ProductModule", ["setActiveFormProduct", "setProduct"]),
    ...mapActions("ProductModule", ["saveProduct", "updateProduct"]),
    ...mapMutations("AppVueModule", ["setRestartRouterView", "setFieldsErrorMap"]),

    resetInfo() {
      this.setProduct({
        id: null,
        name: null,
        idShop: 1,
        price: null,
        described: null,
        dateOfManufacture: null,
        expiry: null,
        origin: null,
      });
      this.setFieldsErrorMap([]);
    },

    ClickOkeFromAlertCommon() {
      this.activeAlertCommon = false;
      this.activeConfirmCommon = false;
    },

    async confirmYesFromConfirmCommon() {
      let response = null;
      if (this.getStateBtnSaveFormProduct == false) {
        response = await this.saveProduct();
      }
      if (this.getStateBtnUpdateFormProduct == false) {
        response = await this.updateProduct();
      }
      if (response.status == 200) {
        this.setRestartRouterView(!this.getRestartRouterView);
        this.resetInfo();
        this.setActiveFormProduct(false);
      } else {
        if (response.status == 400) {
          this.messageAlertCommon = response.data;
          this.activeAlertCommon = true;
        } else {
          if (response.status == 1000) {
            this.setFieldsErrorMap(response.data);
          } else {
            this.messageAlertCommon = "error " + response.data.status + " :" + response.data.message;
            this.activeAlertCommon = true;
          }
        }
      }
    },

    confirmNoFromConfirmCommon() {
      this.activeConfirmCommon = false;
    },

    comeBack() {
      this.setActiveFormProduct(false);
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
    ...mapGetters("ProductModule", [
      "getActiveFormProduct",
      "getStateBtnSaveFormProduct",
      "getStateBtnUpdateFormProduct",
      "getProduct",
    ]),
    ...mapGetters("AppVueModule", ["getRestartRouterView", "getFieldsErrorMap"]),

    activeFormProductPopup() {
      return {
        "open-popup": this.getActiveFormProduct,
      };
    },
    setClassDisplayForSaveSave() {
      return {
        "display-none": this.getStateBtnSaveFormProduct,
      };
    },
    setClassDisplayForButtonUpdate() {
      return {
        "display-none": this.getStateBtnUpdateFormProduct,
      };
    },
    fieldsErrorMap() {
      return this.getFieldsErrorMap;
    },
  },
};
</script>

<style scoped>
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
  height: 510px;
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