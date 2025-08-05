<template>
  <Auth>
    <section style="text-align: center;">
      <div style="display: flex; justify-content: center">
        <router-link
          to="/login"
          class="tab-login"
          :class="{ active: $route.path === '/login' }"
        >
          INICIO
        </router-link>
        <router-link
          to="/register"
          class="tab-login"
          :class="{ active: $route.path === '/register' }"
        >
          REGISTRO
        </router-link>
      </div>     
      <br>
      <h1
          style="
            font-size: 30px;
            font-style: roboto;
            color: rgba(137, 136, 141, 1);
            margin-bottom: 10px;
          "
        >
          REGÍSTRATE
        </h1>
      <div class="input-container">
        <i class="icon fa fa-flag"></i>
        <select class="input" v-model="country"
          :class="{'error': error.country}"
          @change="reset('country')">
          <option value="null" disabled>País</option>
          <option value="Ecuador"   >🇪🇨 Ecuador</option>
          <option value="Perú"      >🇵🇪 Perú</option>
          <option value="Argentina" >🇦🇷 Argentina</option>
          <option value="Bolivia"   >🇧🇴 Bolivia</option>
          <option value="Colombia"  >🇨🇴 Colombia</option>
          <option value="Costa Rica">🇨🇷 Costa Rica</option>
          <option value="Chile"     >🇨🇱 Chile</option>
        </select>
      </div> <br>

      <div class="input-container">
        <i class="icon fa fa-id-card"></i>
        <input class="input" placeholder="Documento de identidad"
        oninput="this.value=this.value.replace(/(?![0-9])./gmi,'')"
        v-model="dni"
        :class="{'error': error.dni}"
        @keydown="reset('dni')">
      </div> <br>

      <div class="input-container">
        <i class="icon fa-solid fa-user-tie"></i>
        <input class="input" placeholder="Nombre"
        v-model="name"
        :class="{'error': error.name}"
        @keydown="reset('name')"
        :disabled="country == 'Perú' && !younger">
      </div> <br>

      <div class="input-container">
        <i class="icon fa-solid fa-user-tie"></i>
        <input class="input" placeholder="Apellidos"
        v-model="lastName"
        :class="{'error': error.lastName}"
        @keydown="reset('lastName')"
        :disabled="country == 'Perú' && !younger">
      </div> <br>

      <!-- <i class="icon fa fa-calendar"></i>
      <input type="date" class="input" placeholder="Fecha de Nacimiento"
      v-model="date"> <br> -->

      <div class="input-container">
        <i class="icon fa-solid fa-mobile-retro" v-if="!country"></i>
        <small v-if="country" style="display:flex">{{ prefix }}</small>
        <input class="input" placeholder="Celular" maxlength="12"
        v-model="phone">
      </div> <br>
<!-- 
      <i class="icon fa-solid fa-envelope-open"></i>
      <input class="input" placeholder="Correo"
      v-model.trim="email"> <br> -->

      <div class="input-container">
        <input :type="show ? 'text' : 'password'" class="input pass" placeholder="Contraseña"
        v-model="password"
        :class="{'error': error.password}"
        @keydown="reset('password')">
        <i class="show far fa-eye" @click="show = !show"></i>
      </div> <br>

      <div class="input-container">
        <i class="icon fa-solid fa-paper-plane"></i>
        <input class="input" placeholder="Código de patrocinador" :disabled="disabled"
        v-model="code"
        :class="{'error': error.code}"
        @keydown="reset('code')">
      </div> <br><br>

      <p class="alert">{{ alert | alert }}</p>


      <small><input type="checkbox" v-model="check">Acepto los <a href="" target="_blank" style="color: #351251;font-weight: 600;">términos de uso</a></small> <br>


      <button class="login-button" v-show="!sending" @click="submit">Registrarme</button>
      <button class="login-button" v-show= "sending" disabled>Creando cuenta ...</button> <br>
    </section>
    <footer>
      
      <!-- <router-link to="/welcome" class="route">Regresar</router-link> -->
      <header>
        <div class="social">
          <!-- <a class="fab fa-facebook-square" :href="fb" target="_blank"></a>
          <a class="fab fa-instagram"       :href="is" target="_blank"></a>
          <a class="fab fa-tiktok"          :href="tk" target="_blank"></a>
          <a class="fab fa-youtube"         :href="yt" target="_blank"></a> -->
          <a class="fab fa-facebook-square social-icon facebook" :href="fb" target="_blank"></a>
          <a
            class="fab fa-whatsapp social-icon whatsapp"
            :href="wsp_ec"
            target="_blank"
          ></a>
          <!-- <a class="fab fa-instagram"       :href="is" target="_blank"></a> -->
          <a class="fab fa-tiktok social-icon tiktok"          target="_blank"></a>
          <a class="fab fa-youtube social-icon youtube"         target="_blank"></a>
        </div>
      </header>
    </footer>
    <small style="color: rgba(137, 136, 141, 1); margin-left: 60px;"
        >¿Olvidaste tu contraseña?
        <router-link to="/remember" style="color: #43078C"
          >Ingresa Aquí</router-link
        ></small>
  </Auth>
</template>

<script>
import Auth from '@/views/layouts/Auth'
import api  from '@/api'

export default {
  components: { Auth },
  data() {
    return {
      // country: 'Perú',
      // country: 'Bolivia',
      // country: 'Ecuador',
      country: null,

      // younger: false,
      younger: true,
      dni:      null,
      name:     null,
      lastName: null,
      // username: null,
      date:     null,
      email:    null,
      phone:    null,
      password: "123456",
      code:     null,
      check:    false,
      error: {
        country:  false,
        dni:      false,
        name:     false,
        lastName: false,
        // username: false,
        email:    false,
        phone:    false,
        password: false,
        code:     false,
      },
      sending:  false,
      alert:    null,
      disabled: false,
      show:     false,
    }
  },
  filters: {
    alert(msg) {
      // if (msg == 'username already use') return 'El usuario ya existe'
      if (msg == 'dni already use') return 'El documento ya existe'
      if (msg == 'code not found')  return 'El código de invitación no existe'
    },
  },
  computed: {

    // social
    fb() { return this.$store.state.fb },
    is() { return this.$store.state.is },
    tk() { return this.$store.state.tk },
    yt() { return this.$store.state.yt },

    prefix() {
      if(this.country == 'Ecuador')    return '+593'
      if(this.country == 'Perú')       return '+51'
      if(this.country == 'Argentina')  return '+54'
      if(this.country == 'Bolivia')    return '+591'
      if(this.country == 'Colombia')   return '+57'
      if(this.country == 'Costa Rica') return '+506'
      if(this.country == 'Chile')      return '+56'
    },
  },
  created() {
    this.code = this.$route.params.code

    if(this.code) this.disabled = true
  },
  watch: {
    async dni(dni) {
      if(this.country != 'Perú' || this.younger) return

      if(dni.length < 8) return

      const response = await fetch(`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhhbnNldmFuZ2VsaXN0YUBnbWFpbC5jb20ifQ.Fa2w9sYLXtcgMbtM58YRiwYvomChYwwMAoIDmYmo1H8`)

      var data = await response.json()
      console.log(data)

      if(data.success == false) {
        console.log('person not found ...')
        this.error.name = true
        return
      }

      this.error.name = false

      this.name     = data.nombres
      this.lastName = data.apellidoPaterno + ' ' + data.apellidoMaterno
    }
  },
  methods: {
    async submit() {

      // const { name, lastName, username, email, password, phone, code, check } = this
      const { country, dni, name, lastName, date, email, password, phone, code, check } = this

      // valid fields
      if(!country)  { return this.error.country  = true }
      if(!dni)      { return this.error.dni      = true }
      if(!name)     { return this.error.name     = true }
      if(!lastName) { return this.error.lastName = true }
      // if(!username) { return this.error.username = true }
      // if(!email)    { return this.error.email    = true }
      if(!password) { return this.error.password = true }
      // if(!phone)    { return this.error.phone    = true }
      if(!code)     { return this.error.code     = true }
      if(!check)    { return }

      // POST Register
      this.sending = true

      // const { data } = await api.register({ name, lastName, username, email, password, phone, code }); console.log({ data })
      const { data } = await api.register({ country, dni, name, lastName, date, email, password, phone, code }); console.log({ data })

      this.sending = false

      // error
      if(data.error) return this.alert = data.msg


      // logout
      const session = localStorage.getItem('session')
      if(session) {
        localStorage.removeItem('session')
        api.logout(this.session)
      }

      // login
      this.$store.commit('SET_SESSION', data.session)

      // routing
      this.$router.push('/dashboard')

    },
    reset(name) {
      this.alert = null

      if(name == 'country')  this.error.country  = false
      if(name == 'dni')      this.error.dni      = false
      if(name == 'name')     this.error.name     = false
      if(name == 'lastName') this.error.lastName = false
      // if(name == 'username') this.error.username = false
      // if(name == 'email')    this.error.email    = false
      if(name == 'password') this.error.password = false
      if(name == 'code')     this.error.code     = false
    },
  },
};
</script>
<style>
.input-container {
  position: relative;
  display: inline-block;
  width: 330px;
}

.input-container .icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  color: #43078C;
  font-size: 16px;
  margin-right: 0;
}

.input-container .input {
  padding-right: 50px;
  width: 100%;
  box-sizing: border-box;
}

.social {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.social-icon {
  margin-right: 10px;
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 13px;
  text-align: center;
  line-height: 40px;
  font-size: 24px;
  transition: box-shadow 0.2s, background 0.2s;
  background: #9C5AD8;
  color: #fff;
}

@media (max-width: 900px) {
  .social-icon {
    width: 35px;
    height: 35px;
    border-radius: 10px;
    line-height: 35px;
    font-size: 20px;
    margin: 0 5px;
  }
  
  .input-container {
    width: 90vw;
    max-width: 320px;
  }
  
  .input-container .input {
    width: 100%;
    height: 45px;
    border-radius: 8px;
    border: 1px solid #9C5AD8;
    padding: 0 15px;
    font-size: 16px;
    margin-bottom: 15px;
  }
  
  .input-container .icon {
    right: 12px;
    font-size: 18px;
  }
  
  .login-button {
    width: 90vw;
    max-width: 320px;
    margin-left: 0;
    border-radius: 25px;
    height: 45px;
    font-size: 16px;
  }
  
  .tab-login {
    font-size: 16px;
    padding: 12px 25px;
    margin: 0 10px;
  }
  
  .tab-login.active {
    color: #43078C;
    border-bottom: 3px solid #ffd600;
    font-weight: bold;
  }
}
.social-icon:hover {
  box-shadow: 0 2px 8px rgba(67, 7, 140, 0.15);
  background: #f3eaff;
  color: #9C5AD8;
}
.login-button {
  border-radius: 29px;
  width: 345px;
  height: 50px;
  background: #43078C;
  color: white; /* Color del texto */
  border: none; /* Sin borde */
  cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
  transition: background 0.3s ease;
  margin-left: 13px;
  transition: all 0.3s ease;
  margin-top: 20px;/* Transición suave para el hover */
}
.tab-login {
  font-size: 15px;
  color: rgba(137, 136, 141, 1);
  text-decoration: none;
  padding: 10px 20px;
  border-bottom: solid 2px rgba(137, 136, 141, 1);
  transition: all 0.3s ease;
}

.tab-login.active {
  color: #4b2e12; /* marrón oscuro */
  border-bottom: solid 2px #ffb57a; /* naranja claro */
  font-weight: bold;
  transition: all 0.1s ease;
}
@media (min-width: 900px) {
  .tab-login {
    display: none;
  }
}
</style>
