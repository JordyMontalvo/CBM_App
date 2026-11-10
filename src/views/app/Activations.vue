<template>
  <App :session="session">
    <div class="shop">
      <nav class="shop-tabs">
        <router-link to="/activation">Comprar</router-link>
        <router-link to="/activations">Historial</router-link>
      </nav>

      <i class="load" v-if="loading"></i>

      <section v-if="!loading">
        <h1 class="shop-title">Historial de compras</h1>
        <p class="shop-sub">Revisa tus pedidos, su estado de aprobación, los puntos ganados y descarga tus boletas.</p>

        <div class="shop-kpis">
          <div class="shop-kpi plan">
            <small>Plan actual</small>
            <b v-if="current_plan">{{ current_plan.name }} · $ {{ current_plan.amount }}</b>
            <small>Acumulados: {{ upgrade_arr }} · Mes {{ upgrade_pos + 1 }}</small>
          </div>
          <div class="shop-kpi"><small>Total comprado (aprobado)</small><b>$ {{ approved_price.toFixed(2) }}</b></div>
          <div class="shop-kpi"><small>Puntos (aprobados)</small><b>{{ approved_points }}</b></div>
          <div class="shop-kpi"><small>Pedidos</small><b>{{ activations.length }}</b></div>
        </div>

        <div class="shop-bar">
          <input class="shop-search" v-model="search" placeholder="🔍 Buscar producto...">
          <span class="shop-cat" v-for="f in filters_status" :key="f.value" :class="{ on: status == f.value }" @click="status = f.value">{{ f.label }}</span>
          <select class="shop-sel" v-model="months">
            <option :value="0">Todas las fechas</option>
            <option :value="1">Último mes</option>
            <option :value="6">Últimos 6 meses</option>
            <option :value="12">Último año</option>
          </select>
        </div>

        <div class="shop-tablewrap">
          <table class="shop-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Productos</th>
                <th>Monto</th>
                <th>Puntos</th>
                <th>Voucher</th>
                <th>Estado</th>
                <th>Boleta</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!page_items.length"><td colspan="7" style="text-align:center;color:var(--mut)">No hay pedidos</td></tr>
              <tr v-for="activation in page_items" :key="activation.id">
                <td>{{ activation.date | date }}</td>
                <td>
                  <div class="shop-prod">
                    <span v-for="product in activation.products" v-if="product.total != 0">{{ product.name }} × {{ product.total }}</span>
                  </div>
                </td>
                <td><b>{{ activation.price | price }}</b></td>
                <td style="color:var(--p);font-weight:800">{{ activation.points }}</td>
                <td>
                  <a class="shop-vou" :href="activation.voucher" target="_blank" v-if="activation.voucher">
                    <img :src="activation.voucher">
                  </a>
                  <a class="shop-vou" :href="activation.voucher2" target="_blank" v-if="activation.voucher2" style="margin-left:4px">
                    <img :src="activation.voucher2">
                  </a>
                </td>
                <td><span class="shop-st" :class="activation.status">● {{ activation.status | status }}</span></td>
                <td>
                  <a class="shop-bol" :href="`${INVOICE_ROOT}?id=${activation.id}`" target="_blank" v-if="activation.status == 'approved'">📄 Boleta</a>
                  <span v-else style="color:#bbb">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="shop-pager">
          <span>Mostrando {{ page_items.length }} de {{ filtered.length }} pedidos</span>
          <div class="shop-pages" v-if="pages > 1">
            <button v-for="n in pages" :key="n" :class="{ on: page == n }" @click="page = n">{{ n }}</button>
          </div>
        </div>
      </section>
    </div>
  </App>
</template>

<script>
import App from '@/views/layouts/App'
import api from '@/api'

const INVOICE_ROOT = process.env.VUE_APP_INVOICE_ROOT
console.log({ INVOICE_ROOT })

export default {
  components: {
    App,
  },
  data() {
    return {
      activations: null,
      // arr: [0,0,0],
      loading: true,
      INVOICE_ROOT,

      upgrade_arr:  null,
      upgrade_pos:  0,
      current_plan: null,

      search: '',
      status: null,
      months: 0,
      page:   1,
      per_page: 10,
      filters_status: [
        { value: null,       label: 'Todos'      },
        { value: 'approved', label: 'Aprobadas'  },
        { value: 'pending',  label: 'Pendientes' },
        { value: 'rejected', label: 'Rechazadas' },
      ],
    }
  },
  computed: {
    session() { return this.$store.state.session },

    approved() { return this.activations.filter(a => a.status == 'approved') },
    approved_price()  { return this.approved.reduce((a, b) => a + parseFloat(b.price || 0), 0) },
    approved_points() { return this.approved.reduce((a, b) => a + (b.points || 0), 0) },

    filtered() {
      const q    = this.search.trim().toLowerCase()
      const from = new Date()
      from.setMonth(from.getMonth() - this.months)

      return this.activations.filter(a =>
        (!this.status || a.status == this.status) &&
        (!this.months || new Date(a.date) >= from) &&
        (!q || (a.products || []).some(p => p.total != 0 && p.name.toLowerCase().includes(q)))
      )
    },
    pages() { return Math.ceil(this.filtered.length / this.per_page) },
    page_items() { return this.filtered.slice((this.page - 1) * this.per_page, this.page * this.per_page) },
  },
  watch: {
    search() { this.page = 1 },
    status() { this.page = 1 },
    months() { this.page = 1 },
  },

  filters: {
    date(val) {
      return new Date(val).toLocaleDateString()
      // return new Date(val).toLocaleString()
    },
    price(val) {
      return `$ ${val}`
    },
    status(val) {
      if(val == 'pending')  return 'Pendiente'
      if(val == 'approved') return 'Aprobada'
      if(val == 'rejected') return 'Rechazada'
    },
  },
  async created() {
    // GET data
    const { data } = await api.Activations.GET(this.session); console.log({ data })

    this.loading = false

    // error
    if(data.error && data.msg == 'invalid session') this.$router.push('/login')
    if(data.error && data.msg == 'unverified user') this.$router.push('/verify')

    // success
    this.$store.commit('SET_NAME', data.name)
    this.$store.commit('SET_LAST_NAME',  data.lastName)
    this.$store.commit('SET_AFFILIATED', data.affiliated)
    this.$store.commit('SET_ACTIVATED',  data.activated)
    this.$store.commit('SET_PLAN',       data.plan)
    this.$store.commit('SET_COUNTRY',    data.country)
    this.$store.commit('SET_PHOTO',      data.photo)
    this.$store.commit('SET_TREE',       data.tree)

    this.activations = data.activations.reverse()

    this.upgrade_arr = data.upgrade_arr
    this.upgrade_pos = data.upgrade_pos
    this.current_plan = data.current_plan
    // this.arr         = data.arr

  },
};
</script>

<style src="../../assets/style/shop.css"></style>
