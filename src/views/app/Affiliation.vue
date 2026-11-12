<template>
  <App :session="session" :office_id="office_id">
    <div class="shop">
      <nav class="shop-tabs"><a class="on">Afiliación</a></nav>

      <i class="load" v-if="loading"></i>

      <section v-if="!loading">

        <div v-if="congrats">
          <img class="shop-congrats" src="https://ik.imagekit.io/asu/cbm/Trofeo__CdqGzykA.png">
        </div>

        <div v-else-if="pending" class="shop-cart" style="max-width:520px;position:static">
          <h2>◆ Mi afiliación</h2>
          <div class="shop-hint"><span class="shop-pend">● pendiente de aprobación</span></div>
          <div class="shop-row">Plan <b>{{ affiliation.plan.name }}</b></div>
          <div class="shop-row">Monto del plan <b>$ {{ affiliation.plan.amount }}</b></div>
          <div class="shop-items" style="margin-top:10px">
            <div class="shop-it" v-for="(product, i) in affiliation.products" v-if="product.total > 0" :key="i">
              <div class="n"><b>{{ product.name }}</b></div><span>× {{ product.total }}</span>
            </div>
          </div>
          <div class="shop-tot">Total <span>$ {{ affiliation.price }}</span></div>
        </div>

        <div v-else class="shop-layout">
          <div>
            <h1 class="shop-title">Elige tu paquete de afiliación</h1>
            <p class="shop-sub">Selecciona un plan, completa el monto con productos y envía tu afiliación para aprobación.</p>

            <div class="shop-plans">
              <div class="shop-plan" v-for="(plan, i) in plans" :key="plan.id" :class="{ on: selec_plan == plan }" @click="selec_plan = plan">
                <div class="gem">{{ '◆'.repeat(Math.min(i + 1, 4)) }}</div>
                <b>{{ plan.name }}</b>
                <div class="am">$ {{ plan.amount }}</div>
                <small>Kit de inicio $ {{ plan.kit }}</small>
              </div>
            </div>

            <div class="shop-kit">
              <div><b>Kit de inicio</b> <span style="color:var(--mut)">· incluido en tu afiliación</span></div>
              <b style="color:var(--pd)">$ {{ selec_plan.kit }} × 1</b>
            </div>

            <div class="shop-cats">
              <span class="shop-cat" :class="{ on: tab == null }" @click="tab = null">Todos</span>
              <span class="shop-cat" v-for="category in categories" :key="category" :class="{ on: tab == category }" @click="tab = category">{{ category }}</span>
            </div>

            <div class="shop-grid">
              <article class="shop-card" v-for="(product, i) in products" v-if="tab == null || product.type == tab" :key="product.id" :class="{ sel: product.total > 0 }" @click="touch(i)">
                <div class="shop-img"><img v-if="product.img" :src="product.img" :alt="product.name"><span v-else class="shop-noimg" aria-label="Sin imagen">🖼</span></div>
                <div class="shop-body">
                  <div class="shop-name">{{ product.name }}</div>
                  <div class="shop-type">{{ product.type }}</div>
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

            <div class="shop-box" v-if="affiliations && affiliations.length">
              <b>Mis boletas</b>
              <div class="shop-boletas">
                <a v-for="(affiliation, i) in affiliations" :key="i" :href="`${INVOICE_ROOT}?id=${affiliation.id}`" target="_blank">📄 Boleta {{ i + 1 }}</a>
              </div>
            </div>
          </div>

          <aside class="shop-cart">
            <h2>◆ Mi afiliación</h2>
            <div class="shop-hint">Plan seleccionado: <b>{{ selec_plan.name }} — $ {{ selec_plan.amount }}</b></div>

            <div class="shop-items">
              <div class="shop-it">
                <div class="shop-th">🎁</div>
                <div class="n"><b>Kit de inicio</b><small>Incluido en tu plan</small></div>
                <b>$ {{ selec_plan.kit }}</b>
              </div>
              <div class="shop-it" v-for="product in products" v-if="product.total > 0" :key="product.id">
                <div class="shop-th"><img v-if="product.img" :src="product.img"><span v-else class="shop-noimg sm">🖼</span></div>
                <div class="n"><b>{{ product.name }}</b><small>$ {{ product.price }}</small></div>
                <div class="shop-mini"><button @click="less(product)">−</button>{{ product.total }}<button @click="more(product)">+</button></div>
                <b>$ {{ (product.price * product.total).toFixed(2) }}</b>
              </div>
            </div>

            <div class="shop-sum">
              <div class="shop-tot" :class="{ red: parseFloat(price) < selec_plan.amount }">Total <span>$ {{ price }} <span v-if="final_plan_name">· {{ final_plan_name }}</span></span></div>
              <div class="shop-progress"><div :style="{ width: Math.min(100, parseFloat(price) / selec_plan.amount * 100) + '%' }"></div></div>
              <small class="shop-error" v-if="parseFloat(price) < selec_plan.amount">* Falta ${{ (selec_plan.amount - parseFloat(price)).toFixed(2) }} para el paquete {{ selec_plan.name }}</small>
            </div>

            <label class="shop-lbl">Oficina</label>
            <select class="shop-inp" v-model="office">
              <option value="null" disabled>Oficina</option>
              <option v-for="office in offices" :value="office">{{ office.name }}</option>
            </select>
            <div class="shop-office" v-if="office && office.name">{{ office.address }}<br>{{ office.accounts }}</div>

            <label class="shop-check"><input type="checkbox" v-model="check"> No deseo usar mi saldo</label>
            <div class="shop-bal" v-if="!check">
              <template v-if="plan == 'default'">
                <div class="shop-row">Saldo disponible <b>$ {{ balance }}</b></div>
                <div class="shop-row">Ganancias <b>$ {{ selec_plan.pay }}</b></div>
                <div class="shop-row">Restan <b>$ {{ remaining }}</b></div>
              </template>
              <template v-else>
                <div class="shop-row">Saldo no disponible <b>$ {{ _balance }}</b></div>
                <div class="shop-row">Saldo disponible <b>$ {{ balance }}</b></div>
                <div class="shop-row">Restan <b>$ {{ remaining }}</b></div>
              </template>
            </div>

            <label class="shop-lbl">Medio de pago</label>
            <div class="shop-row" v-if="!check">Cash <b>{{ plan == 'default' ? balance + selec_plan.pay : _balance + balance }}</b></div>
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
                <input type="file" @change="change" :disabled="pending">
              </label>
            </div>

            <small class="shop-error" v-if="error">{{ error }}</small>
            <small class="shop-error" v-if="error_price">Agregue más productos</small>
            <small class="shop-error" v-if="parseFloat(price) < selec_plan.amount">El monto no alcanza para el paquete {{ selec_plan.name }}</small>

            <button class="shop-btn dark" v-show="!sending" @click="POST">Enviar afiliación</button>
            <button class="shop-btn dark" v-show="sending" disabled>Enviando Voucher ...</button>
          </aside>
        </div>

        <div class="shop-box" v-if="(congrats || pending) && affiliations && affiliations.length">
          <b>Mis boletas</b>
          <div class="shop-boletas">
            <a v-for="(affiliation, i) in affiliations" :key="i" :href="`${INVOICE_ROOT}?id=${affiliation.id}`" target="_blank">📄 Boleta {{ i + 1 }}</a>
          </div>
        </div>
      </section>
    </div>
  </App>
</template>

<script>
import App from '@/views/layouts/App'
import api from '@/api'
import lib from '@/lib'

const INVOICE_ROOT = process.env.VUE_APP_INVOICE_ROOT
console.log({ INVOICE_ROOT })


export default {
  components: {
    App,
  },
  data() {
    return {
      loading: true,
      sending: false,

      plans:        null,
      selec_plan:   null,
      voucher:      null,
      voucher_file: null,
      office:       null,
      offices:      null,

      pay_method: null,

      pending:  false,
      congrats: false,

      check: false,
      INVOICE_ROOT,

      tab:      null,
      products: null,
      product:  null,

      error_price: false,

      error: null,

      bank: null,
      date: null,
      voucher_number: null,
    }
  },
  computed: {
    session()   { return this.$store.state.session   },
    office_id() { return this.$store.state.office_id },
    plan()      { return this.$store.state.plan      },

    categories() {
      return this.products
                 .map(x => x.type)
                 .filter((v, i, self) => i == self.indexOf(v))
    },
    price() {
      return (this.selec_plan.kit + this.products.reduce((a, b) => a + b.price * b.total * 1.00, 0.00)).toFixed(2)
    },

    final_plan() {
      let ret = null

      for(let plan of this.plans) if(this.price >= plan.amount) ret = plan.id

      return ret
    },

    final_plan_name() {
      for(let plan of this.plans) if(plan.id == this.final_plan) return plan.name
    },

    remaining() {
      if(!this.check) {
        if(this.plan == 'default') {

          if(this.selec_plan.pay == undefined) this.selec_plan.pay = 0

          if ((this.balance + this.selec_plan.pay) >= this.price) return 0
          return this.price - (this.balance + this.selec_plan.pay)

        } else {
          return this.price - (this.balance + this._balance)
        }
      } else {
        return this.price
      }
    },
  },
  watch:{
    selec_plan(){
      if(!this.selec_plan) return
      this.prices()
      this.totals()
    }
  },
  async created() {
    // GET data
    const { data } = await api.Afiliation.GET(this.session); console.log({ data })

    this.loading = false

    // error
    if(data.error && data.msg == 'invalid session') this.$router.push('/login')

    // success
    this.$store.commit('SET_NAME',       data.name)
    this.$store.commit('SET_LAST_NAME',  data.lastName)
    this.$store.commit('SET_AFFILIATED', data.affiliated)
    this.$store.commit('SET__ACTIVATED',  data._activated)
    this.$store.commit('SET_ACTIVATED',  data.activated)
    this.$store.commit('SET_PLAN',       data.plan)
    this.$store.commit('SET_COUNTRY',    data.country)
    this.$store.commit('SET_PHOTO',      data.photo)
    this.$store.commit('SET_TREE',       data.tree)

    this.plans      = data.plans
    this.selec_plan = this.plans[0]


    this.products = data.products
    this.products = data.products.map(a => ({ ...a, total: 0 }))
    this.product  = this.products[0]
    this.tab      = null


    this.balance  = data.balance
    this._balance = data._balance

    this.offices = data.offices
    // this.office  = this.offices[0]

    this.affiliation = data.affiliation

    if(this.affiliation &&
       this.affiliation.plan.id == 'master' &&
       this.affiliation.status == 'approved') this.congrats = true


    if(this.affiliation && this.affiliation.status == 'pending') this.pending = true


    this.affiliations = data.affiliations
  },

  methods: {

    prices() {

      const i = ['pre-basic', 'basic', 'standard', 'business', 'master'].findIndex(e => e == this.selec_plan.id)

      this.products.forEach(product => {
        product.price = product.aff_price[i]
      })
    },

    totals() {
      this.products.forEach(p => { p.total = 0 })

      for(let p of this.selec_plan.products) {
        const i = this.products.findIndex((e) => e.id == p.id)
        this.products[i].total = p.total
      }
    },

    touch(i) {
      this.product     = this.products[i]
      this.error_price = false
    },

    more(product) {
      if (product.total == 30) return
      console.log(product)

      product.total += 1
    },
    less(product) {
      if (product.total == 0) return
      product.total -= 1
    },

    change(e) {
      this.voucher_file = e.target.files[0]

      const reader = new FileReader()
      reader.onload = (e) => { this.voucher = e.target.result }

      reader.readAsDataURL(this.voucher_file)
    },

    async POST() {

      let { products, price, final_plan, voucher, office, check, pay_method, bank, date, voucher_number } = this

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

      if (!final_plan) {
        this.error_price = true
        return
      }

      if (parseFloat(this.price) < this.selec_plan.amount) {
        this.error = `El monto mínimo para el paquete ${this.selec_plan.name} es $${this.selec_plan.amount}`
        return
      }

      if (!office) {
        this.error = 'Seleccione oficina'
        return
      }

      this.error = null

      // // POST Affiliation
      this.sending = true

      if (voucher) voucher = await lib.upload(this.voucher_file, this.voucher_file.name, 'affiliations')

      const { data } = await api.Afiliation.POST(this.session, {
        products,
        price,
        final_plan,
        voucher,
        office: office.id,
        check,
        remaining: this.remaining,
        pay_method,
        bank,
        date,
        voucher_number,
      })
      console.log({ data })

      this.sending = false
      this.pending = true

      this.affiliation = {
        plan:     this.selec_plan,
        products: this.products,
      }
    },

  },
};
</script>


<style src="../../assets/style/shop.css"></style>
