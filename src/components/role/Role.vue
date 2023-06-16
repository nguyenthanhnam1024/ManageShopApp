<template>
  <div>
    <div></div>
    <div class="corver">
      <span>Danh sách role</span>
      <div class="table-wrapper">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">stt</th>
              <th scope="col">role name</th>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(role, index) in roleList" :key="role.id">
              <td>{{ index + 1 }}</td>
              <td>{{ role.roleName }}</td>
              <td class="box-contain-button">
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="deleteShopButton(role.id, role.roleName)"
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
        <button type="button" class="btn-create" @click="buttonCreateRole">
          Create shop
        </button>
      </div>
    </div>
    <FormSaveAndEditShopPopup />
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
    <FormSaveRolePopup />
  </div>
</template>

<script>
import Common from "../common/Common";
import "../common/BuildTable.css";
import { mapActions} from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import AlertCommon from "../common/AlertCommon.vue";
import ConfirmCommon from "../common/ConfirmCommon.vue";
import FormSaveRolePopup from "./FormSaveRolePopup.vue";

export default {
  name: "RoleVue",

  components: {
    AlertCommon,
    ConfirmCommon,
    FormSaveRolePopup,
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
    ...mapActions("RoleModule", ["fetchRoleList", "deleteRole"]),
    ...mapMutations("RoleModule", ["setActiveOfPopup", "setRoleIdAsDelete"]),
    ...mapMutations("AppVueModule", ["setRestartRouterView"]),
    
    async confirmYesFromConfirmCommon() {
      const response = await this.deleteRole();
      if (response.status == 200 ) {
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

    deleteShopButton(id, roleName) {
        this.activeConfirmCommon = true;
        this.messageConfirmCommon = "you sure delete role: " + roleName;
        this.setRoleIdAsDelete(id);
    },

    ClickOkeFromAlertCommon() {
      this.activeAlertCommon = false;
    },

    buttonCreateRole() {
      this.setActiveOfPopup(true);
    },
  },

  created() {
    const common = new Common();
    common.redirectByJwtAndUrl();
    this.fetchRoleList();
  },

  computed: {
    ...mapGetters("RoleModule", ["getListRole"]),
    ...mapGetters("AppVueModule", ["getRestartRouterView"]),

    roleList() {
      return this.getListRole;
    },
  },
};
</script>

<style scoped>
.box-contain-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>