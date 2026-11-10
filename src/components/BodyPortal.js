// Mueve su contenido a <body> mientras `active` es true y lo devuelve a su
// lugar original al desactivarse. Hace falta porque el layout de la app usa
// `transform` en .content y eso rompe `position: fixed` en móvil: un pop-up
// dentro de la página no cubre la pantalla.
// Inactivo usa `display: contents`, así que no altera el layout (grid, sticky).
export default {
  name: 'BodyPortal',
  props: {
    active:      { type: Boolean, default: false },
    activeClass: { type: String,  default: '' },
  },
  render(h) {
    return h('div', {
      class: this.active ? this.activeClass : 'body-portal-idle',
      style: this.active ? null : { display: 'contents' },
      on: { click: e => { if (e.target === this.$el) this.$emit('backdrop') } },
    }, this.$slots.default)
  },
  mounted() {
    this.anchor = document.createComment('body-portal')
    this.$el.parentNode.insertBefore(this.anchor, this.$el)
    this.sync()
  },
  watch: {
    active() { this.sync() },
  },
  methods: {
    sync() {
      if (this.active) {
        document.body.appendChild(this.$el)
      } else if (this.anchor && this.anchor.parentNode) {
        this.anchor.parentNode.insertBefore(this.$el, this.anchor.nextSibling)
      }
    },
  },
  beforeDestroy() {
    if (this.anchor && this.anchor.parentNode) this.anchor.parentNode.removeChild(this.anchor)
    if (this.$el.parentNode) this.$el.parentNode.removeChild(this.$el)
  },
}
