<template>
  <div class="sidebar" :class="{ open: isOpen }">
    <button class="close" @click="onClose">✖</button>
    <h2 class="sidebar-title">Carrito de Compras</h2>
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>El carrito está vacío</p>
    </div>
    <div v-else>
      <div
        v-for="(product, index) in cartItems"
        :key="index"
        class="cart-product"
      >
        <img :src="product.img" alt="product.name" class="product-image" />
        <div class="product-details">
          <p class="product-name">{{ product.name }}</p>
          <p class="product-quantity">Cantidad: {{ product.total }}</p>
        </div>
        <i
          class="fas fa-trash remove-icon"
          @click="removeFromCart(product)"
        ></i>
      </div>
      <div class="summary">
        <p class="total">Total: ${{ total }}</p>
        <p class="commission">A comisionar: ${{ commission }}</p>
        <button class="proceed-button" @click="proceedToPayment">
          Proceder con el Pago
        </button>
        <button class="clear-cart" @click="clearCart">Vaciar Carrito</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    cartItems: {
      type: Array,
      required: true,
    },
  },
  computed: {
    total() {
      return this.cartItems
        .reduce((acc, product) => acc + product.price * product.total, 0)
        .toFixed(2);
    },
    commission() {
      return this.cartItems
        .reduce(
          (acc, product) =>
            acc + (product.val ? product.val : product.price) * product.total,
          0
        )
        .toFixed(2);
    },
  },
  methods: {
    onClose() {
      this.$emit("close");
    },
    proceedToPayment() {
      this.$emit("proceed");
    },
    removeFromCart(product) {
      this.$emit("remove", product);
    },
    clearCart() {
      this.cartItems = []; // Vaciar el carrito
      this.$emit("clear"); // Emitir evento si es necesario
    },
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  right: -350px; /* Oculto por defecto */
  width: 350px; /* Aumentar el ancho para un mejor diseño */
  height: 100%;
  background: #f9f9f9; /* Color de fondo más claro */
  transition: right 0.3s ease;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 1000;
  overflow-y: auto; /* Permitir desplazamiento si hay muchos productos */
}

.sidebar.open {
  right: 0; /* Muestra el sidebar */
}

.close {
  cursor: pointer;
  background: none;
  border: none;
  font-size: 24px;
  color: #333;
  position: absolute;
  top: 20px;
  right: 20px;
}

.sidebar-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.empty-cart {
  text-align: center;
  color: #888;
}

.cart-product {
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  border-bottom: 1px solid #ddd; /* Línea separadora */
}

.product-image {
  max-width: 80px; /* Tamaño de la imagen */
  margin-right: 10px;
  border-radius: 5px; /* Bordes redondeados */
}

.product-details {
  flex-grow: 1; /* Para que ocupe el espacio restante */
}

.product-name {
  font-weight: bold;
  color: #333;
}

.product-quantity {
  color: #666;
}

.remove-icon {
  color: #f44336; /* Color rojo para el ícono de eliminar */
  cursor: pointer;
  font-size: 20px; /* Tamaño del ícono */
  margin-left: 10px; /* Espacio a la izquierda */
}

.summary {
  margin-top: 20px;
  border-top: 1px solid #ddd; /* Línea separadora */
  padding-top: 10px;
}

.total {
  font-size: 18px;
  font-weight: bold;
  color: #4caf50; /* Color verde */
}

.commission {
  color: #ff9800; /* Color naranja */
}

.proceed-button {
  background-color: #4caf50; /* Color verde */
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%; /* Botón ocupa todo el ancho */
  margin-top: 10px; /* Espacio superior */
}

.proceed-button:hover {
  background-color: #45a049; /* Color verde más oscuro al pasar el mouse */
}

.clear-cart {
  background-color: #f44336; /* Color rojo */
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%; /* Botón ocupa todo el ancho */
  margin-top: 10px; /* Espacio superior */
}

.clear-cart:hover {
  background-color: #d32f2f; /* Color rojo más oscuro al pasar el mouse */
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .sidebar {
    width: 100%; /* Ancho completo en pantallas pequeñas */
    right: -100%; /* Oculto por defecto */
  }

  .sidebar.open {
    right: 0; /* Muestra el sidebar */
  }

  .close {
    font-size: 20px; /* Tamaño de fuente más pequeño */
  }

  .sidebar-title {
    font-size: 20px; /* Tamaño de fuente más pequeño */
  }

  .product-image {
    max-width: 60px; /* Tamaño de imagen más pequeño */
  }

  .total {
    font-size: 16px; /* Tamaño de fuente más pequeño */
  }

  .commission {
    font-size: 16px; /* Tamaño de fuente más pequeño */
  }

  .proceed-button {
    padding: 8px; /* Menos padding en pantallas pequeñas */
  }
}
</style>
