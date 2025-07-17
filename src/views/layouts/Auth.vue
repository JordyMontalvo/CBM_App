<template>
  <div class="login-container">
    <div class="login-left">
      <div class="overlay"></div>
      <div class="login-left-content">
        <img src="@/assets/img/logo-CBM-2.png" class="logo-login" />
        <h1>Hola <br>Mundo.</h1>
        <h2>Compañía Brillante Mundial</h2>
      </div>
    </div>
    <div class="login-right">
      <div class="content">
        <div class="form">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    fb() { return this.$store.state.fb },
    is() { return this.$store.state.is },
    tk() { return this.$store.state.tk },
    yt() { return this.$store.state.yt },
  },
};
</script>

<style scoped>
.logo-login {
  width: 300px;
  display: flex;
  flex-direction:column-reverse;
  margin-left: -55px;
}
.login-container {
  display: flex;
  height: 100vh;
}
.login-left {
  position: relative;
  width: 75%;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Cambiado de center a flex-start */
  color: white;
  overflow: hidden;
  padding-left: 70px;
  margin-left: 0;
}
.login-left .overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: url('../../assets/img/back.jpg') center center/cover no-repeat;
  z-index: 1;
}
.login-left-content {
  position: relative;
  z-index: 2;
  text-align: left;
  padding-left: 0;
  margin-left: 0; /* Asegura que no haya margen */
}
.login-left .logo {
  width: 120px;
  margin-bottom: 30px;
}
.login-left h1 {
  font-size: 6em;
  font-weight: bold;
  margin: 0;
  line-height:1; 
}
.login-left h2 {
  color: #ffd600;
  font-size: 1.5em;
  margin-top: 10px;
}
.login-right {
  width:55%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
body {
  margin: 0;
  padding: 0;
}
@media (max-width: 900px) {
  .login-container {
    flex-direction: column;
    height: auto;
  }
  .login-left, .login-right {
    width: 100%;
    min-height: 220px;
    padding-left: 0;
    margin-left: 0;
    justify-content: center;
    text-align: center;
  }
  .login-left-content {
    text-align: center;
    margin: 0 auto;
  }
  .logo-login {
    width: 180px;
    margin-left: 0;
  }
  .login-left h1 {
    font-size: 2.5em;
  }
  .login-right {
    min-height: 400px;
    padding: 20px 0;
  }
}
</style>
