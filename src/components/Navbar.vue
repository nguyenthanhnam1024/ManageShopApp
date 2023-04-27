<template>
  <div>
    <div class="header">
      <h1>new app</h1>
      <h3>address</h3>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-style">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/">Product</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/order">Order</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/user">Users</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/account">Account</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/statisticalProduct"
              >Statistical product</router-link
            >
          </li>
          <li class="nav-item active">
            <router-link to="/revenueProfit">Revenue profit</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/roles">Roles</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/accounts">Accounts</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavbarMain",
};
</script>

<style scope>
.header {
  text-align: center;
}
.navbar-style {
  margin: 5px;
  height: 50px;
  border-bottom: 1px #3e3e3e solid;
}
div nav div ul li {
  border-radius: 7px;
  background: #e0cbe6;
  margin: 3px;
}
div nav div ul li:hover {
  background: #3a57fc;
  color: #fff;
}
div nav div ul li a {
  color: rgb(131, 1, 125);
  text-decoration: none;
  margin: 8px;
  font-size: 120%;
}
div nav div ul li:hover a {
  color: #fff;
  text-decoration: none;
}
</style>