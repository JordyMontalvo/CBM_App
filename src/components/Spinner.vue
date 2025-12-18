<template>
  <div class="spinner-container">
    <div 
      class="spinner" 
      :style="{
        width: size + 'px',
        height: size + 'px',
        borderTopColor: color,
        borderRightColor: color,
        borderBottomColor: color,
        borderLeftColor: 'transparent'
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
  props: {
    size: {
      type: Number,
      default: 40
    },
    color: {
      type: String,
      default: '#43078C'
    }
  }
}
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid;
  border-right: 4px solid;
  border-bottom: 4px solid;
  border-left: 4px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>


