<template>
  <div>
    <div></div>
    <div class="corver">
      <span>Danh sách user</span>
      <div class="wrapper-search">
        <div class="div-select-role" :class="setStateForBlockSelectRole">
          <select
            id="select-option"
            class="form-control select-role"
            v-model="getDataRequestAsSearch.roleName"
            @input="keywordNull"
          >
            <option disabled selected value="">Select role ...</option>
            <option value="">( none )</option>
            <option
              v-for="(roleName, index) in getRoleNames"
              :key="index"
              :value="roleName"
            >
              {{ roleName }}
            </option>
          </select>
        </div>
        <input
          class="form-control mr-sm-2"
          type="text"
          v-model="getDataRequestAsSearch.keyword"
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
              <th scope="col">age</th>
              <th scope="col">email</th>
              <th scope="col">phone number</th>
              <th scope="col">address</th>
              <th colspan="2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in listUser" :key="user.id">
              <td>{{ index + 1 }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.age }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phoneNumber }}</td>
              <td>{{ user.address }}</td>
              <td :class="disabledEdit">
                <button
                  type="button"
                  class="btn btn-warning"
                  @click="buttonUpdateUser(user.id)"
                >
                  edit
                </button>
              </td>
              <td class="box-contain-button">
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="deleteUserButton(user.id, user.name)"
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
        <button type="button" class="btn-create" @click="buttonCreateUser">
          Create user
        </button>
      </div>
    </div>
    <FormSaveAndUpdateUserPopup />
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
import Common from "../common/Common";
import "../common/BuildTable.css";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import FormSaveAndUpdateUserPopup from "./FormSaveAndUpdateUserPopup.vue";
import ConfirmCommon from "../common/ConfirmCommon.vue";
import AlertCommon from "../common/AlertCommon.vue";

export default {
  name: "UserVue",

  components: {
    FormSaveAndUpdateUserPopup,
    ConfirmCommon,
    AlertCommon,
  },

  data() {
    return {
      activeAlertCommon: false,
      messageAlertCommon: null,
      activeConfirmCommon: false,
      messageConfirmCommon: null,
    };
  },

  methods: {
    ...mapActions("UserModule", [
      "fetchListUser",
      "searchByKeyword",
      "deleteUser",
      "getByIdAndSetToFormEdit",
    ]),
    ...mapActions("RoleModule", ["fetchRoleNames"]),
    ...mapMutations("AppVueModule", ["setRestartRouterView"]),
    ...mapMutations("UserModule", [
      "setActiveOfPopup",
      "setInactiveBtnSaveOfPopup",
      "setInactiveBtnUpdateOfPopup",
      "setIdUser",
    ]),

    ClickOkeFromAlertCommon() {
      this.activeAlertCommon = false;
    },

    async confirmYesFromConfirmCommon() {
      const response = await this.deleteUser();
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

    deleteUserButton(idUser, name) {
      this.activeConfirmCommon = true;
      this.messageConfirmCommon = "you sure delete user " + name;
      this.setIdUser(idUser);
    },

    buttonCreateUser() {
      this.setActiveOfPopup(true);
      this.setInactiveBtnSaveOfPopup(false);
      this.setInactiveBtnUpdateOfPopup(true);
    },

    buttonUpdateUser(id) {
      this.setActiveOfPopup(true);
      this.setInactiveBtnSaveOfPopup(true);
      this.setInactiveBtnUpdateOfPopup(false);
      this.setIdUser(id);
      this.getByIdAndSetToFormEdit();
    },

    keywordNull() {
      if (
        this.getDataRequestAsSearch.keyword == null ||
        this.getDataRequestAsSearch.keyword == "" ||
        this.getDataRequestAsSearch.roleName == null ||
        this.getDataRequestAsSearch.roleName == ""
      ) {
        this.setRestartRouterView(!this.getRestartRouterView);
      }
    },

    async searchByKeywordo() {
      await this.searchByKeyword();
    },
  },

  created() {
    const common = new Common();
    common.redirectByJwtAndUrl();
    this.fetchListUser();
    this.fetchRoleNames();
  },

  computed: {
    ...mapGetters("UserModule", [
      "getListUser",
      "getDataRequestAsSearch",
    ]),
    ...mapGetters("RoleModule", ["getRoleNames"]),
    ...mapGetters("AppVueModule", ["getRestartRouterView"]),
    ...mapGetters("SecurityModule", ["getUser", "getShop"]),

    setStateForBlockSelectRole() {
      if (this.getShop.id == 0) {
        return {
          "display-none": false,
        };
      }
      return {
        "display-none": true,
      };
    },

    disabledEdit() {
      if (this.getUser.role == "MANAGE") {
        return {
          "display-none": true,
        };
      }
      return {
        "display-none": false,
      };
    },

    listUser() {
      return this.getListUser;
    },
  },
};
</script>
  
  <style scoped>
.display-none {
  display: none;
}
.box-contain-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.select-role {
  width: 180px;
}
.div-select-role {
  position: absolute;
  margin-right: 310px;
}
</style>