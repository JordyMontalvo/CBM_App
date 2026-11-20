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

          <!-- Alerta de ajuste dinámico de promociones -->
          <div class="shop-promo-alert" v-if="promo_notification">
            <span>ℹ️ {{ promo_notification }}</span>
            <button type="button" class="shop-promo-alert-close" @click="promo_notification = null">✕</button>
          </div>

          <!-- Sección de Promociones de la Quincena -->
          <div class="shop-promo-section" v-if="promotions && promotions.length > 0">
            <div class="shop-promo-header">
              <h2 class="shop-promo-title">✨ Promociones en Tienda</h2>
              <div class="shop-promo-quota-pill">
                Acumulado: ${{ total_eligible.toFixed(2) }} ({{ current_tramos }} tramo{{ current_tramos == 1 ? '' : 's' }} de $100)
              </div>
            </div>
            <div class="shop-grid">
              <article
                class="shop-card promo-card"
                v-for="promo in promotions"
                :key="promo.id"
                :class="{ 'is-blocked': promo_quota(promo).available === 0, sel: promo.total > 0 }"
              >
                <span class="shop-badge" :class="{ 'promo-badge-blocked': promo_quota(promo).available === 0 }">
                  {{ promo_quota(promo).available > 0 ? '★ PROMOCIÓN' : '🔒 BLOQUEADA' }}
                </span>
                <div class="shop-img">
                  <img v-if="promo.img && !promo.img_error" :src="promo.img" :alt="promo.name" @error="$set(promo, 'img_error', true)">
                  <span v-else class="shop-noimg" aria-label="Sin imagen">🎁</span>
                </div>
                <div class="shop-body">
                  <div class="shop-name">{{ promo.name }}</div>
                  <div class="shop-type">1 tramo = {{ promo.units_per_100 || 1 }} unid.</div>
                  <div class="shop-price">$ {{ Number(promo.price).toFixed(2) }}</div>
                  <div class="shop-promo-hint" :class="promo_quota(promo).available > 0 ? 'available' : 'blocked'">
                    {{ promo_status_text(promo) }}
                  </div>
                </div>

                <div class="shop-qty" v-if="promo.total > 0">
                  <button type="button" @click.stop="less_promo(promo)">−</button>
                  <b>{{ promo.total }}</b>
                  <button type="button" @click.stop="more_promo(promo)" :disabled="promo.total >= promo_quota(promo).available">+</button>
                </div>
                <button
                  type="button"
                  class="shop-add promo-blocked"
                  v-else-if="promo_quota(promo).available === 0"
                  disabled
                >
                  🔒 Bloqueada
                </button>
                <button
                  type="button"
                  class="shop-add"
                  v-else
                  @click.stop="more_promo(promo)"
                >
                  🛒 Agregar
                </button>
              </article>
            </div>
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
              <div class="shop-img"><img v-if="product.img && !product.img_error" :src="product.img" :alt="product.name" @error="$set(product, 'img_error', true)"><span v-else class="shop-noimg" aria-label="Sin imagen">🖼</span></div>
              <div class="shop-body">
                <div class="shop-name">{{ product.name }}</div>
                <div class="shop-type">{{ product.type }}</div>
                <!-- Oculto temporalmente: su nueva ubicación se definirá luego. Para mostrarlo, poner show_card_commission en true. -->
                <div class="shop-row" v-show="show_card_commission">Val. a comisionar <b>{{ product.val ? product.val : product.price }}</b></div>
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

        <BodyPortal :active="cart_open" active-class="shop shop-cart-pop" @backdrop="cart_open = false">
        <aside class="shop-cart" ref="cart">
          <button class="shop-cart-close" v-if="cart_open" @click="cart_open = false" aria-label="Cerrar carrito">✕</button>
          <h2>🛒 Carrito de compras</h2>
          <div class="shop-hint">Puedes hacer scroll para ver todos tus productos.</div>

          <div class="shop-items">
            <div class="shop-empty" v-if="!total">Tu carrito está vacío.<br><small>Agrega productos para comenzar.</small></div>
            <div class="shop-it" v-for="product in cart" :key="product.id">
              <div class="shop-th"><img v-if="product.img && !product.img_error" :src="product.img" @error="$set(product, 'img_error', true)"><span v-else class="shop-noimg sm">🖼</span></div>
              <div class="n">
                <b>
                  {{ product.name }}
                  <span class="shop-tag-promo" v-if="product.is_promo">Promo</span>
                </b>
                <small>$ {{ Number(product.price).toFixed(2) }}<span v-if="product.points"> · {{ product.points }} pts</span></small>
              </div>
              <div class="shop-mini">
                <button type="button" @click="product.is_promo ? less_promo(product) : less(product)">−</button>
                {{ product.total }}
                <button
                  type="button"
                  @click="product.is_promo ? more_promo(product) : more(product)"
                  :disabled="product.is_promo && product.total >= promo_quota(product).available"
                >+</button>
              </div>
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
              <div class="shop-vlbl">Voucher 1</div>
              <input class="shop-inp" v-model="voucher_number" placeholder="Código de operación" oninput="this.value=this.value.replace(/(?![0-9])./gmi,'')">
              <label class="shop-up">
                <span v-show="!voucher">⬆ Subir comprobante de pago</span>
                <img v-show="voucher" :src="voucher">
                <input type="file" accept="image/*" @change="onFileChange">
              </label>

              <div class="shop-vlbl">Voucher 2 <small>(opcional)</small>
                <button type="button" class="shop-vclear" v-if="voucher2 || voucher_number2" @click="clear_voucher2">✕ Quitar</button>
              </div>
              <input class="shop-inp" v-model="voucher_number2" placeholder="Código de operación" oninput="this.value=this.value.replace(/(?![0-9])./gmi,'')">
              <label class="shop-up">
                <span v-show="!voucher2">⬆ Subir segundo comprobante</span>
                <img v-show="voucher2" :src="voucher2">
                <input type="file" accept="image/*" ref="file2" @change="onFileChange2">
              </label>
            </div>
          </div>

          <small class="shop-error" v-if="error">{{ error }}</small>

          <button class="shop-btn" v-show="!sending" @click="POST">Ordenar productos</button>
          <button class="shop-btn" v-show="sending" disabled>Enviando orden ...</button>
        </aside>
        </BodyPortal>
      </div>

      <BodyPortal :active="true" active-class="shop" v-if="success">
      <div class="shop-modal" @click.self="success = false">
        <div class="shop-modal-box">
          <div class="shop-modal-icon">✓</div>
          <h2>¡Gracias por tu compra!</h2>
          <p>Tu orden quedó <b>pendiente de aprobación</b>. Cuando la oficina confirme tu pago se sumarán tus puntos y podrás ver tu boleta en el historial.</p>
          <div class="shop-modal-btns one">
            <router-link class="shop-btn" to="/dashboard">Ir al inicio</router-link>
          </div>
        </div>
      </div>
      </BodyPortal>
    </div>
  </App>
</template>

<script>
import App from '@/views/layouts/App'
import api from '@/api'
import lib from '@/lib'
import BodyPortal from '@/components/BodyPortal'

export default {
  components: {
    App,
    BodyPortal,
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
      show_card_commission: false,
      cart_open: false,

      pay_method: null,

      bank: null,
      date: null,
      voucher_number: null,

      voucher2: null,
      file2: null,
      voucher_number2: null,

      search: '',

      promotions: [],
      previous_eligible_amount: 0,
      promo_notification: null,
    }
  },
  computed: {
    session()   { return this.$store.state.session   },
    office_id() { return this.$store.state.office_id },

    price()   {
      let regPrice = (this.products || []).reduce((a, b) => a + (Number(b.price) || 0) * (b.total || 0), 0)
      let promoPrice = (this.promotions || []).reduce((a, b) => a + (Number(b.price) || 0) * (b.total || 0), 0)
      return (regPrice + promoPrice).toFixed(2)
    },
    points() {
      let regPoints = (this.products || []).reduce((a, b) => a + (Number(b.points) || 0) * (b.total || 0), 0)
      let promoPoints = (this.promotions || []).reduce((a, b) => a + (Number(b.val) || 0) * (b.total || 0), 0)
      return regPoints + promoPoints
    },
    commission() {
      let regComm = (this.products || []).reduce((a, b) => a + ((b.val !== undefined && b.val !== null ? Number(b.val) : Number(b.price)) * (b.total || 0)), 0)
      let promoComm = (this.promotions || []).reduce((a, b) => a + ((Number(b.val) || 0) * (b.total || 0)), 0)
      return regComm + promoComm
    },
    total()  {
      let regTotal = (this.products || []).reduce((a, b) => a + (b.total || 0), 0)
      let promoTotal = (this.promotions || []).reduce((a, b) => a + (b.total || 0), 0)
      return regTotal + promoTotal
    },

    cart_eligible_amount() {
      return (this.products || [])
        .filter(p => p.total > 0 && !p.is_promo)
        .reduce((sum, p) => sum + ((Number(p.price) || 0) * (p.total || 0)), 0)
    },
    total_eligible() {
      return Math.round(((this.previous_eligible_amount || 0) + this.cart_eligible_amount) * 100) / 100
    },
    current_tramos() {
      return Math.floor(this.total_eligible / 100)
    },
    amount_to_next_tramo() {
      const rem = Math.round((this.total_eligible % 100) * 100) / 100
      return rem === 0 ? 100 : Math.round((100 - rem) * 100) / 100
    },

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
      return (this.products || []).filter(p => (this.selected.length == 0 || this.selected.includes(p.type)) && (!q || p.name.toLowerCase().includes(q)))
    },
    filters_active() { return this.selected.length > 0 || this.search.trim() != '' },
    cart() {
      const reg = (this.products || []).filter(p => p.total > 0)
      const pro = (this.promotions || []).filter(p => p.total > 0)
      return [...reg, ...pro]
    },
    has_points() { return (this.products || []).some(p => p.points) || (this.promotions || []).some(p => p.val) },

    categories() {
      const arr = (this.products || []).map(function(x) { return x.type })

      let ret = arr.filter(function (v, i, self) {
        return i == self.indexOf(v);
      })

      return ret
    }
  },
  watch: {
    cart_open(open) {
      document.body.style.overflow = open ? 'hidden' : ''
    },
    total_eligible() {
      this.check_promo_quotas()
    },
  },
  beforeDestroy() {
    document.body.style.overflow = ''
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
    this.products = (data.products || []).map(a => ({ ...a, total: 0 }))
    this.product  = this.products[0]

    this.previous_eligible_amount = Number(data.previous_eligible_amount) || 0
    this.promotions = (data.promotions || []).map(p => ({
      ...p,
      total: 0,
      is_promo: true,
      promo_id: p.id,
    }))

    this.balance  = data.balance
    this._balance = data._balance

    if(this.office_id) this.office = this.office_id

    this.offices = data.offices

    this.selected = []

  },
  methods: {
    promo_quota(promo) {
      const unitsPer100 = Math.max(1, parseInt(promo.units_per_100, 10) || 1)
      const totalEarned = this.current_tramos * unitsPer100
      const usedUnits = Number(promo.used_units) || 0
      const available = Math.max(0, totalEarned - usedUnits)
      const remaining = Math.max(0, available - (promo.total || 0))
      return { available, remaining, totalEarned, usedUnits }
    },
    promo_status_text(promo) {
      const quota = this.promo_quota(promo)
      if (quota.available === 0) {
        const rem = this.amount_to_next_tramo
        if (quota.usedUnits > 0) {
          return `Agotaste tu cupo (${quota.usedUnits} usada${quota.usedUnits > 1 ? 's' : ''}). Faltan $${rem.toFixed(2)} para el siguiente tramo.`
        }
        return `Te faltan $${rem.toFixed(2)} en compras para habilitar.`
      }
      return `Disponibles: ${quota.remaining} de ${quota.available} cupo(s).`
    },
    more_promo(promo) {
      const quota = this.promo_quota(promo)
      if (promo.total >= quota.available) return
      promo.total += 1
    },
    less_promo(promo) {
      if (promo.total <= 0) return
      promo.total -= 1
    },
    check_promo_quotas() {
      if (!this.promotions || this.promotions.length === 0) return
      for (const promo of this.promotions) {
        const quota = this.promo_quota(promo)
        if (promo.total > quota.available) {
          const oldQty = promo.total
          promo.total = quota.available
          if (quota.available === 0) {
            this.promo_notification = `La promoción "${promo.name}" se retiró del carrito porque tu compra ya no alcanza el tramo de US$100 requerido.`
          } else {
            this.promo_notification = `La cantidad de "${promo.name}" se redujo de ${oldQty} a ${quota.available} según tu cupo disponible.`
          }
        }
      }
    },
    toggle_category(category) {
      const i = this.selected.indexOf(category)
      if (i > -1) this.selected.splice(i, 1)
      else this.selected.push(category)
    },
    go_cart() {
      this.cart_open = true
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
    onFileChange2(e) {
      const file = e.target.files[0]
      if (!file) return
      this.file2 = file
      const reader = new FileReader()
      reader.onload = (ev) => { this.voucher2 = ev.target.result }
      reader.readAsDataURL(file)
    },
    clear_voucher2() {
      this.voucher2 = null
      this.file2 = null
      this.voucher_number2 = null
      if (this.$refs.file2) this.$refs.file2.value = ''
    },
    reset() {
      console.log('reset ...')

      ;(this.products || []).forEach(product => {
        product.total = 0
      })
      ;(this.promotions || []).forEach(promo => {
        promo.total = 0
      })

      this.voucher = null
      this.file = null
      this.voucher_number = null
      this.clear_voucher2()
      this.promo_notification = null
    },
    async POST() {

      let { office, check, voucher, pay_method, bank, date, voucher_number } = this
      const selectedProducts = [
        ...(this.products || []).filter(p => p.total > 0),
        ...(this.promotions || []).filter(p => p.total > 0),
      ]

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
        // Voucher 2 es opcional, pero si se usa debe tener imagen y código.
        if (this.voucher2 && !this.voucher_number2) {
          this.error = 'Código de operación del voucher 2'
          return
        }
        if (this.voucher_number2 && !this.voucher2) {
          this.error = 'Comprobante del voucher 2'
          return
        }
      }

      if(!this.total || selectedProducts.length === 0) {
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

      const use_voucher2 = pay_method == 'bank' && this.voucher2 && this.file2
      let voucher2 = null
      let voucher_number2 = use_voucher2 ? this.voucher_number2 : null

      let data
      try {
        if(voucher) voucher = await lib.upload(this.file, this.file.name, 'activations')
        if(use_voucher2) voucher2 = await lib.upload(this.file2, this.file2.name, 'activations')

        const res = await api.Activation.POST(this.session, {
          products: selectedProducts,
          voucher,
          office: office.id,
          check,
          pay_method,
          bank,
          date,
          voucher_number,
          voucher2,
          voucher_number2,
        })
        data = res.data
      } catch (e) {
        this.sending = false
        this.error = 'No se pudo enviar la orden. Revisa tu conexión e inténtalo de nuevo.'
        return
      }

      this.sending = false

      // Solo confirmar si el servidor aceptó la orden; si no, el carrito se conserva.
      if (!data || data.error) {
        this.error = (data && data.msg) || 'No se pudo enviar la orden. Inténtalo de nuevo.'
        return
      }

      this.cart_open = false
      this.success = true

      this.reset()
    },
  },
}
</script>


<style src="../../assets/style/shop.css"></style>
