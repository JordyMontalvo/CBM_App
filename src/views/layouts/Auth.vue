<template>
  <div class="login-container">
    <!-- Navigation Tabs at the top -->
    <div class="nav-tabs">
      <router-link to="/login" class="nav-tab" :class="{ active: $route.path === '/login' }">
        INICIO
      </router-link>
      <router-link to="/register" class="nav-tab" :class="{ active: $route.path === '/register' }">
        REGISTRO
      </router-link>
    </div>
    
    <div class="login-left">
      <div class="overlay"></div>
      <div class="login-left-content">
        <img src="@/assets/img/logo-CBM-2.png" class="logo-login" />
        <h3 class="welcome-text">{{ $route.path === '/register' ? 'REGISTRATE' : 'BIENVENIDO' }}</h3>
        <h1 class="desktop-text">Hola <br>Mundo.</h1>
        <h2 class="desktop-text">Compañía Brillante Mundial</h2>
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
.nav-tabs {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  z-index: 10;
  width: 10%;
  margin-left: 250px;
}

.nav-tab {
  flex: 1;
  padding: 20px 40px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 18px;
  transition: all 0.3s ease;
  border: none;
  text-align: center;
  border-radius: 0;
}

.nav-tab:hover {
  background: rgba(255, 255, 255, 0.3);
  color: white;
}

.nav-tab.active {
  background: #ffd600;
  color: black;
}


.logo-login {
  width: 300px;
  display: flex;
  flex-direction:column-reverse;
  margin-left: -55px;
  filter: hue-rotate(240deg) saturate(1.5) brightness(0.8); /* Cambia el color a morado */
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

.login-left .overlay::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(67, 7, 140, 0.5); /* Overlay morado #43078C */
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

.welcome-text {
  display: none;
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0 0 0;
  text-align: center;
}

.desktop-text {
  display: block;
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
  .nav-tabs {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .nav-tab {
    padding: 15px 20px;
    font-size: 16px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .logo-login {
    width: 180px;
    margin-left: 0;
  }
  .welcome-text {
    font-size: 1.5em;
    display: block;
    font-size: 1.5em;
    margin: -15px 0 0 0;
  }
  .desktop-text {
    display: none;
  }
  .login-right {
    min-height: 400px;
    padding: 20px 0;
  }
}
@media (max-width: 900px) {
  .nav-tabs {
    display:none;
  }
}
</style>
