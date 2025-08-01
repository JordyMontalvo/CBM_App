<template>
  <App :session="session" :office_id="office_id">

    <h4>EQUIPO</h4>

    <i class="load" v-if="loading"></i>

    <div v-if="!loading">

      <p style="font-weight:bold; font-size:18px; margin-bottom:10px;">Total de puntos grupal: {{ node.total_points }}</p>

      <div v-if="children && children.length && children_points && children_points.length">
        <p style="margin-bottom: 8px; font-weight: bold;">Puntos por cada hijo:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
          <div v-for="(child, idx) in children" :key="child.id"
               style="background: #f0f7fa; border-radius: 12px; box-shadow: 0 2px 8px #00bcd420; padding: 12px 18px; min-width: 180px; display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-user-circle" style="font-size: 28px; color: #00bcd4;"></i>
            <div style="flex:1;">
              <div style="font-weight: bold; color: #333; font-size: 15px;">{{ child.name }}</div>
              <div style="color: #888; font-size: 13px;">
                Puntos grupales: <span style="color: #00bcd4; font-weight: bold;">{{ children_points[idx] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="body">

        <div class="tree-container">
          <i v-if="node.parent && node.id != id" class="fas fa-arrow-left" @click="GET(node.parent)" style="position: absolute; right: 0; margin-right: 80px; z-index: 1;"></i>
          <ul class="tree">
            <tree-node :node="node" :session="session" :get-node="GET_NODE" :selected-id="selectedId" @select="click" />
          </ul>
        </div>
      </div>

      <div class="modal" :class="{ open }" @click="closed">
        <div class="inner" @click.stop="">
          <img class="photo" :src="selec_node.photo" style="display:block; margin:auto; border-radius:50%; width:100px; height:100px; object-fit:cover; border:3px solid #00bcd4;">
          <p style="text-align: center; font-size:18px; font-weight:bold; margin:8px 0 0 0;">{{ selec_node.name }} {{ selec_node.lastName }}</p>
          <p style="text-align: center; color:#888; margin:0 0 8px 0;">{{ selec_node.country }}</p>
          <p><b>ID:</b> {{ selec_node.dni }}</p>
          <p><b>Teléfono:</b> {{ selec_node.phone }}</p>
          <p><b>Correo:</b> {{ selec_node.email }}</p>
          <p><b>Rango Cerrado:</b> {{ selec_node._rank | _rank }}</p>
          <p><b>Puntos personales:</b> {{ selec_node.points }}</p>
          <p><b>Puntos de afiliación:</b> {{ selec_node.affiliation_points || 0 }}</p>
          <p><b>Puntos grupales:</b> {{ selec_node.total_points !== undefined ? selec_node.total_points : '—' }}</p>
          <div v-if="modal_children && modal_children.length && modal_children_points && modal_children_points.length">
            <p style="font-weight:bold; margin-bottom: 8px;">Puntos por cada hijo directo:</p>
            <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
              <div v-for="(child, idx) in modal_children" :key="child.id" style="background: #f0f7fa; border-radius: 12px; box-shadow: 0 2px 8px #00bcd420; padding: 12px 18px; min-width: 180px; display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-user-circle" style="font-size: 28px; color: #00bcd4;"></i>
                <div style="flex:1;">
                  <div style="font-weight: bold; color: #333; font-size: 15px;">{{ child.name }}</div>
                  <div style="color: #888; font-size: 13px;">Puntos grupales: <span style="color: #00bcd4; font-weight: bold;">{{ modal_children_points[idx] }}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </App>
</template>

<script>
import App from '@/views/layouts/App'
import api from '@/api'

// Componente recursivo para renderizar el árbol
const TreeNode = {
  name: 'TreeNode',
  props: ['node', 'session', 'getNode', 'selectedId'],
  data() {
    return {
      expanded: false,
      loading: false,
      children: this.node.children || [],
      children_points: [], // Nuevo: para guardar los puntos por hijo
    }
  },
  computed: {
    isSelected() {
      return this.selectedId === this.node.id
    }
  },
  methods: {
    async expandNode(e) {
      e.stopPropagation();
      if (this.expanded) {
        this.expanded = false
        return
      }
      if (this.children.length === 0 && this.node.childs && this.node.childs.length > 0) {
        this.loading = true
        const { data } = await this.getNode(this.node.id, this.session)
        this.children = data.children || []
        this.children_points = data.children_points || [] // Guardar los puntos por hijo
        this.loading = false
      }
      this.expanded = true
    },
    handleSelect(e) {
      this.$emit('select', this.node)
    }
  },
  render(h) {
    return h('li', {
      class: { 'selected-node': this.isSelected },
      style: { marginBottom: '8px' }
    }, [
      h('span', {
        on: { click: this.handleSelect },
        style: {
          display: 'inline-block',
          background: this.isSelected ? '#e0f7fa' : '#f8f9fa',
          border: this.isSelected ? '2px solid #00bcd4' : '1px solid #ccc',
          borderRadius: '8px',
          padding: '8px 12px',
          minWidth: '120px',
          boxShadow: this.isSelected ? '0 0 8px #00bcd4' : 'none',
          cursor: 'pointer',
          position: 'relative',
        }
      }, [
        (this.node.childs && this.node.childs.length > 0) ?
          h('i', {
            class: ['fas', this.expanded ? 'fa-minus-square' : 'fa-plus-square'],
            style: { cursor: 'pointer', marginRight: '6px', color: '#00bcd4', fontSize: '18px', position: 'absolute', left: '3px', top: '8px' },
            on: { click: this.expandNode }
          }) : null,
        h('i', { class: ['fas', 'fa-user-tie', { act: this.node.activated, aff: this.node.affiliated }], style: { fontSize: '24px', marginRight: '6px' } }),
        h('i', { class: ['fas', 'fa-gem', this.node.rank], style: { fontSize: '16px', marginRight: '4px' } }),
        h('span', { style: { fontWeight: 'bold', color: '#333' } }, this.node.name),
        h('br'),
        h('span', { style: { color: '#888', fontSize: '12px' } }, `Puntos personales: ${this.node.points}`),
        (this.node.affiliation_points && this.node.affiliation_points > 0) ? h('span', { style: { color: '#ff9800', fontSize: '12px', marginLeft: '8px' } }, `Afiliación: ${this.node.affiliation_points}`) : null,
        (this.node.total_points !== undefined) ? h('span', { style: { color: '#00bcd4', fontSize: '12px', marginLeft: '8px', fontWeight: 'bold' } }, `Total grupal: ${this.node.total_points}`) : null,
      ]),
      this.loading ? h('div', { style: { color: '#00bcd4', fontSize: '12px', marginTop: '4px' } }, [
        h('i', { class: ['fas', 'fa-spinner', 'fa-spin'], style: { marginRight: '6px' } }), 'Cargando...']
      ) : null,
      // Mostrar el desglose de puntos por hijo debajo de los hijos expandidos
      (this.expanded && this.children_points && this.children_points.length > 0) ?
        h('div', { style: { margin: '8px 0 8px 24px', fontSize: '13px', color: '#00bcd4' } }, [
          h(),
          h('ul', { style: { margin: '4px 0 0 0', padding: 0, listStyle: 'none' } },
            this.children_points.map((pts, idx) =>
              h()
            )
          )
        ]) : null,
      (this.expanded && this.children.length > 0)
        ? h('ul', this.children.map(child => h(TreeNode, { props: { node: child, session: this.session, getNode: this.getNode, selectedId: this.selectedId }, on: { select: this.$listeners.select } })))
        : null
    ])
  }
}

export default {
  components: {
    App,
    TreeNode,
  },
  data() {
    return {
      loading: true,
      id:   null,
      node: null,
      selec_node: {},
      open: false,
      count: 0,
      selectedId: null,
      children: [], // <-- Añadido para guardar los hijos completos
      children_points: [],
      modal_children: [], // Para hijos del usuario seleccionado en el modal
      modal_children_points: [], // Para puntos de los hijos del usuario seleccionado
    }
  },
  computed: {
    session()   { return this.$store.state.session },
    office_id() { return this.$store.state.office_id },
    name()      { return this.$store.state.name },
    activated() { return this.$store.state.activated },
  },

  filters: {
    date(val) {
      return new Date(val).toLocaleDateString()
      // return new Date(val).toLocaleString()
    },
    _rank(val) {
      if(val == 'none')              return 'Ninguno'
      if(val == 'active')            return 'ACTIVO'
      if(val == 'star')              return 'MASTER'
      if(val == 'master')            return 'PLATA'
      if(val == 'silver')            return 'PLATINO'
      if(val == 'gold')              return 'ORO'
      if(val == 'sapphire')          return 'ZAFIRO'
      if(val == 'RUBI')              return 'DIAMANTE RUBI'
      if(val == 'DIAMANTE')          return 'DIAMANTE ESTRELLA'
      if(val == 'DOBLE DIAMANTE')    return 'DIAMANTE DOS ESTRELLAS'
      if(val == 'TRIPLE DIAMANTE')   return 'DIAMANTE TRES ESTRELLAS'
      if(val == 'DIAMANTE ESTRELLA') return 'DIAMANTE CBM'
    },
  },
  async created() {
    await this.GET(null)
  },
  methods: {
    async GET(id) {
      this.loading = true
      const { data } = await api.tree(this.session, id)
      this.loading = false

      if(data.error && data.msg == 'invalid session') this.$router.push('/login')
      if(data.error && data.msg == 'unverified user') this.$router.push('/verify')

      this.id = data.node.id
      this.node = data.node
      this.selec_node = data.node
      this.selectedId = data.node.id
      this.children = data.children || [] // <-- Guardar hijos completos
      this.children_points = data.children_points || []
    },
    // Método para cargar hijos de un nodo (usado por TreeNode)
    async GET_NODE(id, session) {
      return await api.tree(session, id)
    },
    async click(node) {
      this.selectedId = node.id
      this.selec_node = node
      this.open = true

      // Obtener hijos y puntos del usuario seleccionado
      const { data } = await this.GET_NODE(node.id, this.session)
      this.modal_children = data.children || []
      this.modal_children_points = data.children_points || []
    },
    closed() {
      this.open = false
    },
  }
};
</script>

<style lang="stylus">
  .modal
    background rgba(#000, 0.72)
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    padding 80px 20px
    display none
    z-index 2
    overflow auto
    &.open
      display block
    .inner
      background #eaebec
      border-radius 20px
      padding 20px 20px 32px 20px
      max-width 480px
      margin auto

</style>

<style>
/* https://codepen.io/ea-ger/pen/rNJjxYr
https://codepen.io/team/amcharts/pen/poPxojR */

/*  @import url('https://fonts.googleapis.com/css2?family=Oxygen:wght@300&display=swap');*/

  #body {
    margin: 0;
    padding: 0;
/*    background: #fafafa;*/
/*    font-family: 'Oxygen', sans-serif;*/
    letter-spacing: 0.2px;
/*    height: 100vh;*/
/*    width: 100vw;*/
/*    background-color: var(--bg-1);*/
    position: relative;
  }

  :root {
    --col-1: #c8ddef;
    --col-2: #c8ddef;
    --bg-1: #0e182d;
    --highlighted: #ff5722;
  }

  .tree-container {
    /*display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;*/

    overflow: auto;

    width: 100%;
    /*padding-top: 5em;
    padding-bottom: 5em;*/
  }

  .tree-container>h1 {
    color: var(--col-1);
    font-weight: 400;
  }

  .tree,
  .tree ul,
  .tree li {
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
  }

  .tree {
/*    margin: 0 0 1em;*/
    text-align: center;
  }

  .tree,
  .tree ul {
    display: table;
    margin: auto;
    width: 100%;
  }

  .tree ul {
    width: 100%;
  }

  .tree li {
    display: table-cell;
    padding: .5em 0;
    vertical-align: top;
  }

  .tree li:before {
    outline: solid 1px var(--col-2);
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    direction: rtl;
  }

  /*.tree li:hover:before {
    outline: solid 1px var(--col-1);
  }*/

  .tree li:first-child:before {
    left: 50%;
  }

  .tree li:last-child:before {
    right: 50%;
  }

  .tree code,
  .tree span {
/*    border: solid .1em var(--col-1);*/
    border-radius: .2em;
    display: inline-block;
    margin: 0 .2em .5em;
    padding: .2em .5em;
    position: relative;
/*    background-color: var(--bg-1);*/
    transition: all 0.2s ease;
/*    color: var(--col-1);*/
/*    font-size: 14px;*/
    font-size: 12px;
  }

  .tree span i {
    font-size: 32px;
    color: #fff;
  }
  .tree span i.aff{
    color: #ffe400;
  }
  .tree span i.act{
    color: #14ec42;
  }

  .tree span i.fa-gem {
    font-size: 18px;
    position: absolute;
    transform: translateY(10px);
    display: none;
  }

  .tree span i.fa-gem.star {
    display: inline;
    color: #ffe400; /*yellow*/
  }

  .tree span i.fa-gem.master {
    display: inline;
    color: #14ec42; /*green*/
  }

  .tree span i.fa-gem.silver {
    display: inline;
    color: #D3D3D3; /*silver*/
  }

  .tree span i.fa-gem.gold {
    display: inline;
    color: #D4AF37; /*gold*/
  }

  /*.tree span:hover {
    background-color: var(--col-1);
    color: var(--bg-1);
  }

  .tree li:hover>span {
    background-color: var(--col-1);
    color: var(--bg-1);
  }

  .tree span:hover::after,
  .tree li:hover>span::after {
    box-shadow: 0 0 5px 8px var(--col-1) inset;
  }*/

  .tree ul:before,
  .tree code:before,
  .tree span:before {
    outline: solid 1px var(--col-2);
    content: "";
    height: .5em;
    left: 50%;
    position: absolute;
  }

/*  .tree ul:hover:before,
  .tree code:hover:before,
  .tree li:hover>span:before {
    outline: solid 1px var(--col-1);
  }*/

  .tree span::after {
    outline: solid 1px var(--col-1);
    content: "";
    top: -8px;
    left: calc(50% - 5px);
    width: 8px;
    height: 8px;
/*    background-color: var(--bg-1);*/
    background-color: #888;
    border: 1px solid var(--col-1);
    position: absolute;
    opacity: 1;
    border-radius: 100%;
    transition: all 0.2s ease;
  }

  .tree ul:before {
    top: -.5em;
  }

  .tree code:before,
  .tree span:before {
    top: -.55em;
  }

  .tree>li {
    margin-top: 0;
  }

  .tree>li:before,
  .tree>li:after,
  .tree>li>code:before,
  .tree>li>span:before,
  .tree>li>span:after {
    outline: none;
    display: none;

  }

  .highlighted {
    border: 2px solid var(--highlighted) !important;
  }

  /*.highlighted:hover {
    background-color: var(--highlighted) !important;
  }*/
</style>

<style>
.selected-node > span {
  box-shadow: 0 0 8px #00bcd4 !important;
  border: 2px solid #00bcd4 !important;
  background: #e0f7fa !important;
}
</style>

