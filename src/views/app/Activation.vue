
<template>
  <App :session="session" :office_id="office_id">
    <h4 class="tabs">
      <router-link class="tab" to="/activation"> Comprar </router-link>
      &nbsp;&nbsp;
      <router-link class="tab" to="/activations" v-if="!office_id">
        Historial
      </router-link>
    </h4>

    <h4>Puntos: {{ current_points }}</h4>
    <h4>PRODUCTOS</h4>

    <i class="load" v-if="loading"></i>

    <button class="button" @click="showCart">
      <i class="fas fa-shopping-cart"></i> Ver Carrito
    </button>

    <Sidebar
      :isOpen="isCartVisible"
      :cartItems="cartItems"
      @close="isCartVisible = false"
      @proceed="handleProceedToPayment"
      @remove="handleRemoveFromCart"
    >
      <h2 class="sidebar-title">Carrito de Compras ({{ totalItems }} items)</h2>
    </Sidebar>

    <notification v-if="notificationMessage" :message="notificationMessage" />

    <section v-if="!loading">
      <div class="flex">
        <div class="categories">
          <h4>Categorías</h4>
          <ul>
            <li
              v-for="(category, index) in categories"
              :key="index"
              @click="selectCategory(category)"
              :class="{ selected: tab === category }"
            >
              {{ category }}
            </li>
          </ul>
        </div>
        <div class="product-list">
          <article
            class="product"
            v-for="(product, i) in filteredProducts"
            :key="i"
            @click="touch(i)"
          >
            <img :src="product.img" style="max-width: 150px; margin: 10px" />
            <p class="_name">{{ product.name }}</p>
            <span>
              &nbsp; &nbsp;
              <i class="_price" style="margin-right: 20px"
                >$ {{ product.price }}</i
              >
            </span>
            <div class="control">
              <i class="fas fa-minus-square" @click.stop="less(product)"></i>
              <input v-model="product.total" readonly />
              <i class="fas fa-plus-square" @click.stop="more(product)"></i>
            </div>
          </article>
        </div>
      </div>
    </section>
  </App>
</template>

<script>
import App from "@/views/layouts/App";
import api from "@/api";
import lib from "@/lib";
import Sidebar from "@/views/app/Sidebar.vue";
import Notification from "@/views/app/Notification.vue";

export default {
  components: {
    App,
    Sidebar,
    Notification,
  },
  data() {
    return {
      current_points: null,
      current_profit: null,
      products: null,
      product: null,
      balance: null,
      _balance: null,
      //  office:   null,
      check: false,
      voucher: null,

      error: null,

      file: null,
      office: null,
      offices: null,

      loading: true,
      sending: false,
      success: false,

      pending: false,

      tab: null,

      pay_method: null,

      bank: null,
      date: null,
      voucher_number: null,

      isCartVisible: false,
      cartItems: [],

      notificationMessage: null,
    };
  },
  computed: {
    session() {
      return this.$store.state.session;
    },
    office_id() {
      return this.$store.state.office_id;
    },

    price() {
      console.log("price");
      let price = this.products.reduce(
        (a, b) => a + b.price * b.total * 1.0,
        0.0
      );
      return price.toFixed(2);
    },
    points() {
      return this.products.reduce((a, b) => a + b.points * b.total, 0);
    },
    commission() {
      return this.products.reduce(
        (a, b) => a + (b.val ? b.val : b.price) * b.total,
        0
      );
    },
    total() {
      return this.products.reduce((a, b) => a + b.total, 0);
    },

    _price() {
      return `Total: $ ${this.price}`;
    },
    _points() {
      return `A comisionar: ${this.commission}`;
    },

    // IGV()     { return this.price - this.price / 1.18 },
    IGV() {
      return this.price - this.price / 1.15;
    },

    remaining() {
      if (this.check) {
        let ret = this.price - (this.balance + this._balance);

        return ret > 0 ? ret : 0;
      } else {
        return this.price;
      }
    },

    categories() {
      const arr = this.products.map(function (x) {
        return x.type;
      });

      let ret = arr.filter(function (v, i, self) {
        return i == self.indexOf(v);
      });

      return ret;
    },
    filteredProducts() {
      if (!this.tab) return this.products;
      return this.products.filter((product) => product.type === this.tab);
    },
    totalItems() {
      return this.cartItems.reduce((acc, item) => acc + item.total, 0);
    },
  },
  async created() {
    // GET data
    const { data } = await api.Activation.GET(this.session);
    console.log({ data });

    this.loading = false;

    // error
    if (data.error && data.msg == "invalid session")
      this.$router.push("/login");

    // success
    this.$store.commit("SET_NAME", data.name);
    this.$store.commit("SET_LAST_NAME", data.lastName);
    this.$store.commit("SET_AFFILIATED", data.affiliated);
    this.$store.commit("SET_ACTIVATED", data.activated);
    this.$store.commit("SET__ACTIVATED", data._activated);
    this.$store.commit("SET_PLAN", data.plan);
    this.$store.commit("SET_COUNTRY", data.country);
    this.$store.commit("SET_PHOTO", data.photo);
    this.$store.commit("SET_TREE", data.tree);

    this.current_points = data.points;
    this.current_profit = data.profit;
    this.products = data.products.map((a) => ({ ...a, total: 0 }));
    this.product = this.products[0];

    this.balance = data.balance;
    this._balance = data._balance;

    if (this.office_id) this.office = this.office_id;

    this.offices = data.offices;

    this.tab = this.categories[0];
  },
  methods: {
    touch(i) {
      this.product = this.products[i];
    },
    more(product) {
      if (product.total < 30) {
        product.total += 1;
        this.addToCart(product);
      }
    },
    less(product) {
      if (product.total > 0) {
        product.total -= 1; // Disminuir la cantidad
        this.updateCartQuantity(product); // Actualizar la cantidad en el carrito
      }
    },
    addToCart(product) {
      const existingProduct = this.cartItems.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        existingProduct.total += 1;
      } else {
        this.cartItems.push({ ...product, total: 1 });
      }
      this.notificationMessage = `${product.name} ha sido agregado al carrito.`;
      setTimeout(() => (this.notificationMessage = null), 3000);
    },
    removeFromCart(product) {
      this.cartItems = this.cartItems.filter((item) => item.id !== product.id); // Eliminar del carrito
      this.notificationMessage = `${product.name} ha sido eliminado del carrito.`;
      setTimeout(() => (this.notificationMessage = null), 3000);
    },
    updateCartQuantity(product) {
      const existingProduct = this.cartItems.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        existingProduct.total = product.total; // Actualizar la cantidad en el carrito
        if (existingProduct.total === 0) {
          this.removeFromCart(product); // Eliminar del carrito si la cantidad es 0
        }
      }
    },
    handleRemoveFromCart(product) {
      this.removeFromCart(product); // Eliminar del carrito
      const existingProduct = this.products.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        existingProduct.total = 0; // Establecer la cantidad a cero en la vista de productos
      }
    },
    onFileChange(e) {
      this.file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.voucher = e.target.result;
      };

      reader.readAsDataURL(this.file);
    },
    reset() {
      console.log("reset ...");

      this.products.forEach((product) => {
        product.total = 0;
      });
    },
    async POST() {
      let {
        products,
        office,
        check,
        voucher,
        pay_method,
        bank,
        date,
        voucher_number,
      } = this;

      if (pay_method == "bank") {
        if (!bank) {
          this.error = "Nombre de banco";
          return;
        }
        if (!date) {
          this.error = "Fecha de voucher";
          return;
        }
        if (!voucher_number) {
          this.error = "Número de voucher";
          return;
        }
        if (!voucher) {
          this.error = "Voucher de pago";
          return;
        }
      }

      if (!this.total) {
        this.error = "Seleccione productos";
        return;
      }

      if (!office) {
        this.error = "Seleccione oficina";
        return;
      }

      if (!check && !pay_method) {
        this.error = "Seleccione Medio de Pago";
        return;
      }

      if (check && this.remaining && !pay_method) {
        this.error = "Seleccione Medio de Pago";
        return;
      }

      this.error = null;

      // POST Affiliation
      this.sending = true;

      if (voucher)
        voucher = await lib.upload(this.file, this.file.name, "activations");

      const { data } = await api.Activation.POST(this.session, {
        products,
        voucher,
        office: office.id,
        check,
        pay_method,
        bank,
        date,
        voucher_number,
      });

      this.sending = false;

      this.success = true;

      this.reset();
    },
    showCart() {
      this.isCartVisible = true;
    },
    handleProceedToPayment() {
      console.log("Proceder con el pago", this.cartItems);
    },
    selectCategory(category) {
      this.tab = category;
    },
  },
};
</script>

<style lang="stylus">
._tabs
  display flex
  overflow auto
  ._tab
    padding 8px 12px
    background white
    border-radius 12px 12px 0 0
    font-weight 300
    font-size 12px
    cursor pointer
    text-wrap nowrap
    &.selected
      font-weight 600

.product
  small
    width 240px
    font-weight 300
  ._name
    font-weight 600
    font-size 12.5px

._light
  font-weight 300
  font-size 12.5px

._price
  font-weight 600

.modal
  display flex
  position fixed
  z-index 1000
  left 0
  top 0
  width 100%
  height 100%
  background rgba(0, 0, 0, 0.5)
  justify-content center
  align-items center

.modal-content
  background white
  padding 20px
  border-radius 5px
  width 80%
  max-width 500px

.close
  cursor pointer
  float right
  font-size 20px

.product-list
  display flex
  flex-wrap wrap

.product
  margin: 10px
  border: 1px solid #ccc
  border-radius: 5px
  padding: 10px
  text-align center
  transition: transform 0.2s; /* Transición suave */

.product:hover {
  transform: scale(1.02); /* Efecto de aumento al pasar el mouse */
}

.cart-product
  display flex
  align-items center
  margin: 10px 0

.categories
  border-right: 1px solid #ccc
  padding-right: 20px

.categories ul
  list-style-type: none
  padding: 0

.categories li
  cursor: pointer
  padding: 5px
  &:hover
    background-color: #f0f0f0
  &.selected
    font-weight: bold

.flex {
  display: flex;
  flex-wrap: wrap;
}

.categories {
  width: 20%;
  padding: 10px;
}

.product-list {
  width: 80%;
}

.categories ul {
  list-style-type: none;
  padding: 0;
}

.categories li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.categories li:hover {
  background-color: #f0f0f0;
}

.selected {
  background-color: #d0e0f0;
}

@media (max-width: 768px) {
  .flex {
    flex-direction: column;
  }

  .categories {
    width: 100%;
    margin-top: 20px;
  }

  .product-list {
    width: 100%;
  }
}

.sidebar {
  background-color: #fff; /* Fondo blanco */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra */
  border-radius: 8px; /* Bordes redondeados */
  transition: transform 0.3s ease; /* Transición suave */
}

.close {
  background-color: transparent; /* Fondo transparente */
  border: none; /* Sin borde */
  font-size: 24px; /* Tamaño de fuente */
  cursor: pointer; /* Cursor de puntero */
  margin: 10px; /* Espacio alrededor */
}

.cart-product {
  border-radius: 5px; /* Bordes redondeados */
  transition: background-color 0.3s; /* Transición suave */
}

.cart-product:hover {
  background-color: #f9f9f9; /* Color de fondo al pasar el mouse */
}

.control {
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-button {
  background-color: #007bff; /* Color azul */
  transition: background-color 0.3s; /* Transición suave */
}

.control-button:hover {
  background-color: #0056b3; /* Color azul más oscuro al pasar el mouse */
}

</style>
