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
          @click="buttonSaveProduct"
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
    <ConfirmSaveProductPopup
      :activeConfirmSaveProductPopup="activeConfirmSaveProductPopup"
      :productName="productName"
      @haveSaveProduct="haveSaveProduct"
      @confirmNoSave="confirmNoSave"
    />
    <ConfirnUpdateProductPopup
      :activeConfirmUpdateProductPopup="activeConfirmUpdateProductPopup"
      :productName="productName"
      @confirmNoUpdate="confirmNoUpdate"
      @haveUpdateProduct="haveUpdateProduct"
    />
    <AlertProductPopup />
    <AlertErrorForFormProductPopup />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import ConfirmSaveProductPopup from "./ConfirmSaveProductPopup.vue";
import ConfirnUpdateProductPopup from "./ConfirnUpdateProductPopup.vue";
import AlertProductPopup from "./AlertProductPopup.vue";
import AlertErrorForFormProductPopup from "./AlertErrorForFormProductPopup.vue";

export default {
  name: "FormProductPopup",
  data() {
    return {
      activeConfirmSaveProductPopup: false,
      activeConfirmUpdateProductPopup: false,
      productName: "",
    };
  },
  methods: {
    ...mapMutations("ProductModule", [
      "setActiveFormProductPopup",
      "setActiveAlertProductPopup",
      "setMessageAlertProductPopup",
      "setRestartRouterView",
      "setFieldsErrorMap",
      "setActiveAlertForFormProductPopup",
      "setMessageAlertForFormProductPopup",
    ]),
    ...mapActions("ProductModule", ["saveProduct", "updateProduct"]),
    comeBack() {
      this.setActiveFormProductPopup(false);
    },
    buttonSaveProduct() {
      if (
        this.getProduct.name == "" &&
        this.getProduct.price == null &&
        this.getProduct.described == "" &&
        this.getProduct.dateOfManufacture == "" &&
        this.getProduct.expiry == "" &&
        this.getProduct.origin == ""
      ) {
        this.setActiveAlertForFormProductPopup(true)
        this.setMessageAlertForFormProductPopup("write info product prior save !")
      } else {
        this.productName = this.getProduct.name;
        this.activeConfirmSaveProductPopup = true;
      }
    },
    buttonUpdateProduct() {
      this.productName = this.getProduct.name;
      this.activeConfirmUpdateProductPopup = true;
    },
    confirmNoSave() {
      this.activeConfirmSaveProductPopup = false;
    },
    async haveSaveProduct() {
      const response = await this.saveProduct();
      if (response.status == 200) {
        this.setRestartRouterView(!this.getRestartRouterView);
        this.setMessageAlertProductPopup("Save success !");
        this.setActiveAlertProductPopup(true);
      } else {
        if (response.status == 400) {
          this.setMessageAlertForFormProductPopup(response.data);
          this.setActiveAlertForFormProductPopup(true);
        } else {
          if (response.status == 1000) {
            this.setFieldsErrorMap(response.data);
          } else {
            this.setMessageAlertForFormProductPopup("error "+response.data.status +" :"+response.data.error);
            this.setActiveAlertForFormProductPopup(true);
          }
        }
      }
      this.activeConfirmSaveProductPopup = false;
    },
    confirmNoUpdate() {
      this.activeConfirmUpdateProductPopup = false;
    },
    async haveUpdateProduct() {
      const response = await this.updateProduct();
      if (response.status == 200) {
        this.setRestartRouterView(!this.getRestartRouterView);
        this.setMessageAlertProductPopup("Update success !");
        this.setActiveAlertProductPopup(true);
      } else {
        if (response.status == 400) {
          this.setMessageAlertForFormProductPopup(response.data);
          this.setActiveAlertForFormProductPopup(true);
        } else {
          if (response.status == 1000) {
            this.setFieldsErrorMap(response.data);
          } else {
            this.setMessageAlertForFormProductPopup("error :"+response.data.status +" :"+response.data.error);
            this.setActiveAlertForFormProductPopup(true);
          }
        }
      }
      this.activeConfirmUpdateProductPopup = false;
    },
  },
  computed: {
    ...mapGetters("ProductModule", [
      "getActiveFormProductPopup",
      "getButtonCreateInFormProductPopup",
      "getButtonUpdateInFormProductPopup",
      "getProductEdit",
      "getRestartRouterView",
      "getFieldsErrorMap",
    ]),
    activeFormProductPopup() {
      return {
        "open-popup": this.getActiveFormProductPopup,
      };
    },
    setClassDisplayForSaveSave() {
      return {
        "display-none": this.getButtonCreateInFormProductPopup,
      };
    },
    setClassDisplayForButtonUpdate() {
      return {
        "display-none": this.getButtonUpdateInFormProductPopup,
      };
    },
    getProduct() {
      return this.getProductEdit;
    },
    fieldsErrorMap() {
      return this.getFieldsErrorMap;
    },
  },
  components: {
    ConfirmSaveProductPopup,
    ConfirnUpdateProductPopup,
    AlertProductPopup,
    AlertErrorForFormProductPopup,
  },
};
</script>

<style scoped>
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
  height: 490px;
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
  background-color: rgba(0, 0, 0, 0.4);
}
.wrapper-popup.open-popup {
  opacity: 1;
  visibility: visible;
}
</style>