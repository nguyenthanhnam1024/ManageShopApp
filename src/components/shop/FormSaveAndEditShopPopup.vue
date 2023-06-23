<template>
  <div class="wrapper-popup" :class="activeFormPopup">
    <div class="box">
      <form>
        <p>Information shop</p>
        <div>
          <label for="name"
            >Name Shop:
            <span class="messageFieldError">{{
              fieldsErrorMap.name
            }}</span></label
          >
          <input
            type="text"
            id="name"
            placeholder="Shop name"
            v-model="getShop.name"
          />
        </div>
        <div>
          <label for="Address"
            >Address:
            <span class="messageFieldError">{{
              fieldsErrorMap.address
            }}</span></label
          >
          <input type="text" id="Address" v-model="getShop.address" />
        </div>
        <div>
          <label for="hotline"
            >Hotline:
            <span class="messageFieldError">{{
              fieldsErrorMap.hotline
            }}</span></label
          >
          <input type="text" id="hotline" v-model="getShop.hotline" />
        </div>
        <button
          type="button"
          class="btn btn-success button-save"
          :class="stateBtnSave"
          @click="confirmSave"
        >
          Save
        </button>
        <button
          type="button"
          class="btn btn-success button-save"
          :class="stateBtnUpdate"
          @click="confirmUpdate"
        >
          Update
        </button>
        <button type="button" class="btn button-comback" @click="comeBack">
          Comback
        </button>
      </form>
    </div>
    <ConfirmCommonVue
      :activeConfirmCommon="activeConfirmCommon"
      :messageConfirmCommon="messageConfirmCommon"
      @confirmNoFromConfirmCommon="confirmNoFromConfirmCommon"
      @confirmYesFromConfirmCommon="confirmYesFromConfirmCommon"
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
import ConfirmCommonVue from "../common/ConfirmCommon.vue";
import { mapActions } from "vuex";
import AlertCommon from "../common/AlertCommon.vue";

export default {
  name: "FormShopPopup",

  components: {
    ConfirmCommonVue,
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
    ...mapMutations("ShopModule", ["setActiveOfPopup", "setShop"]),
    ...mapActions("ShopModule", ["saveShop", "updateShop"]),
    ...mapMutations("AppVueModule", ["setRestartRouterView", "setFieldsErrorMap"]),

    confirmUpdate() {
      this.activeConfirmCommon = true;
      this.messageConfirmCommon = "you sure want update ?";
    },

    ClickOkeFromAlertCommon() {
      this.activeAlertCommon = false
    },

    resetForm() {
      this.setShop({
        id: null,
        name: null,
        address: null,
        hotline: null,
      });
      this.setFieldsErrorMap([]);
    },

    async confirmYesFromConfirmCommon() {
      let response = null;
      if (this.getStateBtnSaveOfForm == false) {
        response = await this.saveShop()
      } 
      if (this.getStateBtnUpdateOfForm == false) {
        response = await this.updateShop()
      } 
      this.activeConfirmCommon = false;
      if (response.status == 200) {
        this.setActiveOfPopup(false);
        this.setRestartRouterView(!this.getRestartRouterView);
        this.resetForm();
      } else {
        if (response.status == 1000) {
          console.log(response.data)
          this.setFieldsErrorMap(response.data);
        } else {
          this.activeAlertCommon = true;
          this.messageAlertCommon = response.data;
        }
      }
    },

    confirmNoFromConfirmCommon() {
      this.activeConfirmCommon = false;
    },

    comeBack() {
      this.setActiveOfPopup(false);
      this.resetForm();
    },

    confirmSave() {
      this.activeConfirmCommon = true;
      this.messageConfirmCommon = "you sure want save ?";
    },
  },

  computed: {
    ...mapGetters("ShopModule", [
      "getActiveOfPopup",
      "getStateBtnSaveOfForm",
      "getStateBtnUpdateOfForm",
      "getShop",
    ]),
    ...mapGetters("SecurityModule", ["getUser"]),
    ...mapGetters("AppVueModule", ["getRestartRouterView", "getFieldsErrorMap"]),

    fieldsErrorMap() {
      return JSON.parse(JSON.stringify(this.getFieldsErrorMap));
    },

    activeFormPopup() {
      return {
        "open-popup": this.getActiveOfPopup,
      };
    },

    stateBtnSave() {
      return {
        "display-none": this.getStateBtnSaveOfForm,
      };
    },

    stateBtnUpdate() {
      return {
        "display-none": this.getStateBtnUpdateOfForm,
      };
    },
  },
};
</script>
  
  <style scoped>
div div form p {
  font-size: 20px;
  font-weight: bold;
}
div div form div input {
  font-size: 12px;
  height: 22px;
}
div div form div label {
  font-size: 15px;
  color: rgb(14, 88, 217);
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
.box form div label span {
  color: red;
  font-size: 80%;
}
.box form div {
  margin-bottom: 10px;
  font-size: 80%;
  display: flex;
  flex-direction: column;
}
.box {
  width: 350px;
  height: 350px;
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