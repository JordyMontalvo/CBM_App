<template>
  <App :session="session" :office_id="office_id">
    <div class="shop">
      <nav class="shop-tabs">
        <router-link to="/activation">Comprar</router-link>
        <router-link to="/activations" v-if="!office_id">Historial</router-link>
        <div class="shop-tabs-pts">◆ Puntos <span>{{ current_points || 0 }}</span></div>
      </nav>

      <i class="load" v-if="loading"></i>

      <div class="shop-layout" v-if="!loading">
        <div>
          <h1 class="shop-title">Selecciona tus productos</h1>
          <div class="shop-bar shop-bar-top">
            <input class="shop-search" v-model="search" placeholder="🔍 Búsqueda...">
          </div>

          <div class="shop-cats">
            <span class="shop-cat shop-cat-clear" v-if="filters_active" @click="clear_filters">✕ Limpiar</span>
            <span class="shop-cat" :class="{ on: selected.length == 0 }" @click="selected = []">Todos</span>
            <span class="shop-cat" v-for="category in categories" :key="category" :class="{ on: selected.includes(category) }" @click="toggle_category(category)">{{ category }}</span>
          </div>

          <div class="shop-summary">
            <div class="shop-summary-tot">
              <div>Monto: <b>$ {{ price }}</b></div>
              <div>Puntos: <b>{{ points }} pts</b></div>
            </div>
            <button class="shop-summary-btn" @click="go_cart">🛒 Ver carrito<span v-if="total"> ({{ total }})</span></button>
          </div>

          <div class="shop-count">Mostrando {{ filtered.length }} de {{ products.length }} productos</div>

          <div class="shop-grid">
            <article class="shop-card" v-for="product in filtered" :key="product.id" :class="{ sel: product.total > 0 }" @click="product_touch(product)">
              <span class="shop-badge" v-if="product.points">★ {{ product.points }} pts</span>
              <div class="shop-img"><img :src="product.img" :alt="product.name"></div>
              <div class="shop-body">
                <div class="shop-name">{{ product.name }}</div>
                <div class="shop-type">{{ product.type }}</div>
                <div class="shop-row">Val. a comisionar <b>{{ product.val ? product.val : product.price }}</b></div>
                <div class="shop-price">$ {{ product.price }}</div>
              </div>
              <div class="shop-qty" v-if="product.total > 0">
                <button @click.stop="less(product)">−</button>
                <b>{{ product.total }}</b>
                <button @click.stop="more(product)">+</button>
              </div>
              <button class="shop-add" v-else @click.stop="more(product)">🛒 Agregar</button>
            </article>
          </div>
        </div>

        <aside class="shop-cart" ref="cart">
          <h2>🛒 Carrito de compras</h2>
          <div class="shop-hint">Puedes hacer scroll para ver todos tus productos.</div>

          <div class="shop-items">
            <div class="shop-empty" v-if="!total">Tu carrito está vacío.<br><small>Agrega productos para comenzar.</small></div>
            <div class="shop-it" v-for="product in cart" :key="product.id">
              <div class="shop-th"><img :src="product.img"></div>
              <div class="n"><b>{{ product.name }}</b><small>$ {{ product.price }}<span v-if="product.points"> · {{ product.points }} pts</span></small></div>
              <div class="shop-mini"><button @click="less(product)">−</button>{{ product.total }}<button @click="more(product)">+</button></div>
              <b>$ {{ (product.price * product.total).toFixed(2) }}</b>
            </div>
          </div>

          <div class="shop-sum">
            <h4>Resumen</h4>
            <div class="shop-row">Total productos <b>{{ total }} items</b></div>
            <div class="shop-row">Subtotal <b>$ {{ (price - IGV).toFixed(2) }}</b></div>
            <div class="shop-row">Impuesto <b>$ {{ IGV.toFixed(2) }}</b></div>
            <div class="shop-row">A comisionar <b>{{ commission }}</b></div>
            <div class="shop-tot">Total <span>$ {{ price }}</span></div>
            <div class="shop-row" v-if="has_points">Puntos totales <b>{{ points }}</b></div>
          </div>

          <label class="shop-lbl">Oficina</label>
          <select class="shop-inp" v-model="office" v-if="!pending">
            <option value="null" disabled>Oficina</option>
            <option v-for="office in offices" :value="office">{{ office.name }}</option>
          </select>
          <div class="shop-office" v-if="office && office.name">{{ office.address }}<br>{{ office.accounts }}</div>

          <label class="shop-check"><input type="checkbox" v-model="check"> Deseo usar mi saldo</label>
          <div class="shop-bal" v-show="check">
            <div class="shop-row">Saldo no disponible <b>{{ _balance }}</b></div>
            <div class="shop-row">Saldo disponible <b>{{ balance }}</b></div>
            <div class="shop-row" v-if="remaining > 0">Restan <b>{{ remaining }}</b></div>
          </div>

          <div v-show="!(check && remaining == 0)">
            <label class="shop-lbl">Medio de pago</label>
            <div class="shop-row" v-if="check">Cash <b>{{ _balance + balance }}</b></div>
            <div class="shop-pm">
              <label class="shop-opt" :class="{ on: pay_method == 'bank' }"><input type="radio" :value="'bank'" v-model="pay_method"> Banco</label>
              <label class="shop-opt" :class="{ on: pay_method == 'cash' }"><input type="radio" :value="'cash'" v-model="pay_method"> Efectivo</label>
            </div>

            <div class="shop-row" style="margin-top:8px" v-if="pay_method">Monto <b>{{ remaining }}</b></div>

            <div v-if="pay_method == 'bank'">
              <div class="shop-g2">
                <input class="shop-inp" v-model="bank" placeholder="Banco">
                <input class="shop-inp" v-model="date" placeholder="Fecha" type="date">
              </div>
              <input class="shop-inp" style="margin-top:8px" v-model="voucher_number" placeholder="Número de Voucher" oninput="this.value=this.value.replace(/(?![0-9])./gmi,'')">
              <label class="shop-up">
                <span v-show="!voucher">⬆ Subir comprobante de pago</span>
                <img v-show="voucher" :src="voucher">
                <input type="file" @change="onFileChange">
              </label>
            </div>
          </div>

          <small class="shop-error" v-if="error">{{ error }}</small>

          <button class="shop-btn" v-show="!sending" @click="POST">Ordenar productos</button>
          <button class="shop-btn" v-show="sending" disabled>Enviando orden ...</button>
        </aside>
      </div>

      <div class="shop-modal" v-if="success" @click.self="success = false">
        <div class="shop-modal-box">
          <div class="shop-modal-icon">✓</div>
          <h2>¡Pedido enviado!</h2>
          <p>Tu orden quedó <b>pendiente de aprobación</b>. Cuando la oficina confirme tu pago se sumarán tus puntos y podrás ver tu boleta en el historial.</p>
          <div class="shop-modal-btns">
            <button class="shop-btn light" @click="success = false">Seguir comprando</button>
            <router-link class="shop-btn" to="/activations">Ver historial</router-link>
          </div>
        </div>
      </div>
    </div>
  </App>
</template>

<script>
import App from '@/views/layouts/App'
import api from '@/api'
import lib from '@/lib'

export default {
  components: {
    App,
  },
  data() {
    return {
      current_points: null,
      current_profit: null,
      products: null,
      product:  null,
      balance:  null,
     _balance:  null,
     //  office:   null,
      check:    false,
      voucher:  null,

      error: null,

      file:    null,
      office:  null,
      offices: null,

      loading: true,
      sending: false,
      success: false,

      pending: false,

      selected: [],

      pay_method: null,

      bank: null,
      date: null,
      voucher_number: null,

      search: '',
    }
  },
  computed: {
    session()   { return this.$store.state.session   },
    office_id() { return this.$store.state.office_id },

    price()   {
      console.log('price')
      let price = this.products.reduce((a, b) => a + b.price * b.total * 1.00, 0.00)
      return price.toFixed(2)
    },
    points() { return this.products.reduce((a, b) => a + (Number(b.points) || 0) * b.total, 0) },
    commission() { return this.products.reduce((a, b) => a + (b.val ? b.val : b.price) * b.total, 0) },
    total()  { return this.products.reduce((a, b) => a + b.total, 0) },

    _price()  { return `Total: $ ${this.price}` },
    _points() { return `A comisionar: ${this.commission}` },

    // IGV()     { return this.price - this.price / 1.18 },
    IGV()     { return this.price - this.price / 1.15 },

    remaining() {
      if(this.check) {
        let ret = this.price - (this.balance + this._balance)

        return ret > 0 ? ret : 0

      } else {
        return this.price
      }
    },

    filtered() {
      const q = this.search.trim().toLowerCase()
      return this.products.filter(p => (this.selected.length == 0 || this.selected.includes(p.type)) && (!q || p.name.toLowerCase().includes(q)))
    },
    filters_active() { return this.selected.length > 0 || this.search.trim() != '' },
    cart() { return this.products.filter(p => p.total > 0) },
    has_points() { return this.products.some(p => p.points) },

    categories() {
      const arr = this.products.map(function(x) { return x.type })

      let ret = arr.filter(function (v, i, self) {
        return i == self.indexOf(v);
      })

      return ret
    }
  },
  async created() {
    // GET data
    const { data } = await api.Activation.GET(this.session); console.log({ data })

    this.loading = false

    // error
    if(data.error && data.msg == 'invalid session') this.$router.push('/login')

    // success
    this.$store.commit('SET_NAME',       data.name)
    this.$store.commit('SET_LAST_NAME',  data.lastName)
    this.$store.commit('SET_AFFILIATED', data.affiliated)
    this.$store.commit('SET_ACTIVATED',  data.activated)
    this.$store.commit('SET__ACTIVATED', data._activated)
    this.$store.commit('SET_PLAN',       data.plan)
    this.$store.commit('SET_COUNTRY',    data.country)
    this.$store.commit('SET_PHOTO',      data.photo)
    this.$store.commit('SET_TREE',       data.tree)

    this.current_points = data.points
    this.current_profit = data.profit
    this.products = data.products.map(a => ({ ...a, total: 0 }))
    this.product  = this.products[0]

    this.balance  = data.balance
    this._balance = data._balance

    if(this.office_id) this.office = this.office_id

    this.offices = data.offices

    this.selected = []

  },
  methods: {
    toggle_category(category) {
      const i = this.selected.indexOf(category)
      if (i > -1) this.selected.splice(i, 1)
      else this.selected.push(category)
    },
    go_cart() {
      const el = this.$refs.cart
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    clear_filters() {
      this.selected = []
      this.search = ''
    },
    touch(i) {
      this.product = this.products[i]
    },
    product_touch(product) {
      this.product = product
    },
    more(product) {

      if (product.total == 30) return
      product.total += 1
    },
    less(product) {
      if (product.total == 0) return
      product.total -= 1
    },
    onFileChange(e) {

      this.file = e.target.files[0]

      const reader = new FileReader()
      reader.onload = (e) => { this.voucher = e.target.result }

      reader.readAsDataURL(this.file)

    },
    reset() {
      console.log('reset ...')

      this.products.forEach(product => {
        product.total = 0
      })
    },
    async POST() {

      let { products, office, check, voucher, pay_method, bank, date, voucher_number } = this

      if (pay_method == 'bank') {
        if (!bank) {
          this.error = 'Nombre de banco'
          return
        }
        if (!date) {
          this.error = 'Fecha de voucher'
          return
        }
        if (!voucher_number) {
          this.error = 'Número de voucher'
          return
        }
        if (!voucher) {
          this.error = 'Voucher de pago'
          return
        }
      }

      if(!this.total) {
        this.error = 'Seleccione productos'
        return
      }

      if(!office) {
        this.error = 'Seleccione oficina'
        return
      }

      if(!check && !pay_method) {
        this.error = 'Seleccione Medio de Pago'
        return
      }

      if(check && this.remaining && !pay_method) {
        this.error = 'Seleccione Medio de Pago'
        return
      }

      this.error = null

      // POST Affiliation
      this.sending = true

      if(voucher) voucher = await lib.upload(this.file, this.file.name, 'activations')

      const { data } = await api.Activation.POST(this.session, {
        products,
        voucher,
        office: office.id,
        check,
        pay_method,
        bank,
        date,
        voucher_number,
      })

      this.sending = false

      this.success = true

      this.reset()
    },
  },
}
</script>


<style src="../../assets/style/shop.css"></style>
