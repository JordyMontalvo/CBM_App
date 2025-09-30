<template>
  <App :session="session" :office_id="office_id">
    <!-- Selector de modo - aparece primero -->
    <div v-if="!selectedMode" class="mode-selector">
        <h2 class="mode-title" :class="{ 'mobile': isMobile, 'mobile-small': isMobileSmall }">SELECCIONAR MODO</h2>
        <div class="cards-container" :class="{ 'mobile': isMobile, 'mobile-small': isMobileSmall }">
          <div class="card" :class="{ 'mobile': isMobile, 'mobile-small': isMobileSmall }" @click="selectMode('red')">
            <p class="card-text" :class="{ 'mobile': isMobile, 'mobile-small': isMobileSmall }">Red</p>
            <div class="card-icon">
              <!-- Nueva imagen de red jerárquica -->
              <svg width="100" height="95" viewBox="0 0 100 95" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ 'mobile': isMobile, 'mobile-small': isMobileSmall }" style="width: 160px; height: 160px; object-fit: contain;">
                <path d="M22.9907 77.71C26.1449 77.71 28.7126 80.4831 28.7126 83.8896V84.7725H14V83.8896C14 80.4832 16.5662 77.7102 19.721 77.71H22.9907Z" fill="#43078C"/>
                <path d="M21.3559 68C23.3837 68 25.0343 69.7826 25.0343 71.9727C25.034 74.1626 23.3836 75.9443 21.3559 75.9443C19.3282 75.9442 17.6786 74.1625 17.6784 71.9727C17.6784 69.7826 19.3281 68.0001 21.3559 68Z" fill="#43078C"/>
                <path d="M22.1055 66.8535H21.1795V60.2861H22.1055V66.8535Z" fill="#43078C"/>
                <path d="M22.9943 52.7139C26.1493 52.7139 28.7169 55.4872 28.7172 58.8945V59.7783H14.0009V58.8945C14.0011 55.4872 16.568 52.7139 19.7237 52.7139H22.9943Z" fill="#43078C"/>
                <path d="M79.6612 52.7139C82.8161 52.714 85.3838 55.4873 85.384 58.8945V59.7783H70.6669V58.8945C70.6671 55.4872 73.2348 52.7139 76.3906 52.7139H79.6612Z" fill="#43078C"/>
                <path d="M51.3273 52.7139C54.4824 52.7139 57.0509 55.4871 57.051 58.8945V59.7773H42.3339V58.8945C42.334 55.4872 44.901 52.7141 48.0567 52.7139H51.3273Z" fill="#43078C"/>
                <path d="M21.3595 43.001C23.3878 43.0012 25.0379 44.784 25.0379 46.9746C25.0377 49.1651 23.3877 50.948 21.3595 50.9482C19.3311 50.9482 17.6804 49.1652 17.6802 46.9746C17.6802 44.7838 19.331 43.001 21.3595 43.001Z" fill="#43078C"/>
                <path d="M78.0254 43.001C80.0539 43.001 81.7047 44.7838 81.7047 46.9746C81.7045 49.1652 80.0538 50.9482 78.0254 50.9482C75.9972 50.9481 74.3463 49.1651 74.3461 46.9746C74.3461 44.7839 75.9971 43.0011 78.0254 43.001Z" fill="#43078C"/>
                <path d="M49.6925 43C51.7208 43 53.3716 44.7831 53.3717 46.9736C53.3717 49.1644 51.7209 50.9472 49.6925 50.9473C47.664 50.9473 46.0132 49.1644 46.0132 46.9736C46.0134 44.783 47.6641 43 49.6925 43Z" fill="#43078C"/>
                <path d="M50.5316 31.75H77.0887C77.3401 31.75 77.7146 31.8191 78.0417 32.0449C78.3938 32.2882 78.6773 32.709 78.6774 33.3301V41.6104H77.7514V33.3301C77.7514 33.0875 77.6594 32.9674 77.5426 32.8867C77.4009 32.7891 77.2123 32.7501 77.0887 32.75H50.5316V41.6104H49.6057V32.75H22.6733C22.4097 32.7501 22.2673 32.8748 22.1688 33.0498C22.0553 33.2513 22.0106 33.5152 22.0105 33.6904V41.6104H21.0846V33.6904C21.0846 33.3856 21.1534 32.9286 21.3776 32.5303C21.6167 32.1056 22.0368 31.7501 22.6733 31.75H49.6057V27.21H50.5316V31.75Z" fill="#43078C"/>
                <path d="M51.3237 19.71C54.4779 19.71 57.0456 22.4831 57.0456 25.8896V26.7725H42.333V25.8896C42.333 22.4831 44.8999 19.71 48.0549 19.71H51.3237Z" fill="#43078C"/>
                <path d="M49.6897 10C51.7175 10.0002 53.3672 11.7827 53.3672 13.9727C53.367 16.1624 51.7173 17.9441 49.6897 17.9443C47.662 17.9443 46.0116 16.1626 46.0114 13.9727C46.0114 11.7826 47.6619 10 49.6897 10Z" fill="#43078C"/>
              </svg>
            </div>
          </div>
          <div class="card" :class="{ 'mobile': isMobile, 'mobile-small': isMobileSmall }" @click="selectMode('frontales')">
            <p class="card-text" :class="{ 'mobile': isMobile, 'mobile-small': isMobileSmall }">Frontales</p>
            <div class="card-icon">
              <!-- Nueva imagen de frontales -->
              <svg width="100" height="95" viewBox="0 0 100 95" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ 'mobile': isMobile, 'mobile-small': isMobileSmall }" style="width: 160px; height: 160px; object-fit: contain;">
                <path d="M51.0693 32.7549H79.665C79.943 32.7549 80.3521 32.8311 80.707 33.0762C81.0883 33.3395 81.3779 33.7809 81.3779 34.418V43.333H80.3779V34.418C80.3779 34.1247 80.2625 33.9839 80.1387 33.8984C79.9885 33.7948 79.7911 33.7549 79.665 33.7549H51.0693V43.333H50.0693V33.7549H21.0684C20.8043 33.7551 20.6488 33.8784 20.5342 34.082C20.4064 34.3096 20.3564 34.6065 20.3564 34.8057V43.333H19.3564V34.8057C19.3564 34.4884 19.4278 34.009 19.6631 33.5908C19.912 33.1488 20.3634 32.7552 21.0684 32.7549H50.0693V27.8281H51.0693V32.7549Z" fill="#43078C"/>
                <path d="M21.167 53.166C24.3827 53.1662 27 55.7843 27 59V59.833H12V59C12 55.7843 14.6165 53.1662 17.833 53.166H21.167Z" fill="#43078C"/>
                <path d="M52.167 53.166C55.3827 53.1662 58 55.7843 58 59V59.833H43V59C43 55.7843 45.6165 53.1662 48.833 53.166H52.167Z" fill="#43078C"/>
                <path d="M83.167 53.166C86.3827 53.1662 89 55.7843 89 59V59.833H74V59C74 55.7843 76.6165 53.1662 79.833 53.166H83.167Z" fill="#43078C"/>
                <path d="M19.5 44C21.5675 44 23.25 45.6825 23.25 47.75C23.2498 49.8174 21.5674 51.5 19.5 51.5C17.4326 51.5 15.7502 49.8174 15.75 47.75C15.75 45.6825 17.4325 44 19.5 44Z" fill="#43078C"/>
                <path d="M50.5 44C52.5675 44 54.25 45.6825 54.25 47.75C54.2498 49.8174 52.5674 51.5 50.5 51.5C48.4326 51.5 46.7502 49.8174 46.75 47.75C46.75 45.6825 48.4325 44 50.5 44Z" fill="#43078C"/>
                <path d="M81.5 44C83.5675 44 85.25 45.6825 85.25 47.75C85.2498 49.8174 83.5674 51.5 81.5 51.5C79.4326 51.5 77.7502 49.8174 77.75 47.75C77.75 45.6825 79.4325 44 81.5 44Z" fill="#43078C"/>
                <path d="M52.167 19.166C55.3827 19.1662 58 21.7843 58 25V25.833H43V25C43 21.7843 45.6165 19.1662 48.833 19.166H52.167Z" fill="#43078C"/>
                <path d="M50.5 10C52.5675 10 54.25 11.6825 54.25 13.75C54.2498 15.8174 52.5674 17.5 50.5 17.5C48.4326 17.5 46.7502 15.8174 46.75 13.75C46.75 11.6825 48.4325 10 50.5 10Z" fill="#43078C"/>
              </svg>
            </div>
          </div>
          <div class="card" :class="{ 'mobile': isMobile, 'mobile-small': isMobileSmall }" @click="selectMode('niveles')">
            <p class="card-text" :class="{ 'mobile': isMobile, 'mobile-small': isMobileSmall }">Niveles</p>
            <div class="card-icon">
              <!-- Nueva imagen de niveles -->
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ 'mobile': isMobile, 'mobile-small': isMobileSmall }" style="width: 160px; height: 160px; object-fit: contain;">
                <path d="M37.6283 36.5965C36.3305 38.7605 35.584 41.293 35.584 44C35.584 49.6487 38.8334 54.5375 43.5644 56.9019L35.5548 74.787C24 69.3561 16 57.6126 16 44C16 39.0854 17.0429 34.4144 18.9192 30.196L37.6283 36.5965Z" fill="#9747FF"/>
                <path d="M50.3724 29.5888L50.2593 10.0011C50.1729 10.0004 50.0865 10 50 10C36.3311 10 24.5458 18.0662 19.145 29.6982L37.9252 36.1232C40.4988 32.186 44.9453 29.584 50 29.584C50.1245 29.584 50.2487 29.5856 50.3724 29.5888Z" fill="#43078C"/>
                <path d="M50.8033 10.0096C69.2098 10.4363 83.9999 25.4909 84 44C84 62.7777 68.7777 78 50 78C45.0281 78 40.3057 76.9322 36.0488 75.0144L44.0553 57.1368C45.8679 57.9583 47.8804 58.416 50 58.416C57.9617 58.416 64.416 51.9617 64.416 44C64.4159 36.3463 58.4514 30.0862 50.9169 29.6132L50.8033 10.0096Z" fill="#43078C"/>
              </svg>
            </div>
          </div>
          <div class="card" :class="{ 'mobile': isMobile, 'mobile-small': isMobileSmall }" @click="selectMode('actividad')">
            <p class="card-text" :class="{ 'mobile': isMobile, 'mobile-small': isMobileSmall }">Actividad</p>
            <div class="card-icon">
              <!-- Nueva imagen de actividad -->
              <svg width="100" height="75" viewBox="0 0 100 75" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ 'mobile': isMobile, 'mobile-small': isMobileSmall }" style="width: 160px; height: 160px; object-fit: contain;">
                <path d="M18 15C18 17.7614 15.7614 20 13 20C10.2386 20 8 17.7614 8 15C8 12.2386 10.2386 10 13 10C15.7614 10 18 12.2386 18 15Z" fill="#43078C"/>
                <path d="M25 15.5C25 13.567 26.567 12 28.5 12H88.5C90.433 12 92 13.567 92 15.5C92 17.433 90.433 19 88.5 19H28.5C26.567 19 25 17.433 25 15.5Z" fill="#43078C"/>
                <path d="M18 30C18 32.7614 15.7614 35 13 35C10.2386 35 8 32.7614 8 30C8 27.2386 10.2386 25 13 25C15.7614 25 18 27.2386 18 30Z" fill="#43078C"/>
                <path d="M25 31.5C25 29.567 26.567 28 28.5 28H73.5C75.433 28 77 29.567 77 31.5C77 33.433 75.433 35 73.5 35H28.5C26.567 35 25 33.433 25 31.5Z" fill="#43078C"/>
                <path d="M18 45C18 47.7614 15.7614 50 13 50C10.2386 50 8 47.7614 8 45C8 42.2386 10.2386 40 13 40C15.7614 40 18 42.2386 18 45Z" fill="#43078C"/>
                <path d="M25 45.5C25 43.567 26.567 42 28.5 42H62.5C64.433 42 66 43.567 66 45.5C66 47.433 64.433 49 62.5 49H28.5C26.567 49 25 47.433 25 45.5Z" fill="#43078C"/>
                <path d="M18 60C18 62.7614 15.7614 65 13 65C10.2386 65 8 62.7614 8 60C8 57.2386 10.2386 55 13 55C15.7614 55 18 57.2386 18 60Z" fill="#43078C"/>
                <path d="M25 60.5C25 58.567 26.567 57 28.5 57H81.5C83.433 57 85 58.567 85 60.5C85 62.433 83.433 64 81.5 64H28.5C26.567 64 25 62.433 25 60.5Z" fill="#43078C"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="buttons-container">
          <div class="top-buttons">
            <button class="btn btn-green">Periodos Históricos</button>
            <button class="btn btn-green">Recuperar Historial</button>
          </div>
          <div class="bottom-button">
            <button class="btn btn-orange" @click="goToRedMap">MAPA DE LA RED</button>
          </div>

        </div>
      </div>

    <!-- Vista de Red - árbol de afiliados -->
    <div v-if="selectedMode === 'red'">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h4>EQUIPO</h4>
        <button @click="$router.push('/tree')" style="padding: 8px 16px; background: #00bcd4; border: none; border-radius: 6px; color: white;">
          Volver al selector
        </button>
      </div>
      
      <i class="load" v-if="loading"></i>

      <div v-if="!loading">
        <!-- <p style="font-weight:bold; font-size:18px; margin-bottom:10px;">Total de puntos grupal: {{ node.total_points }}</p> -->

        <!-- <div v-if="children && children.length && children_points && children_points.length">
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
            </div> -->
          <!-- </div>
        </div> -->

        <div id="body">
          <div class="tree-container">
            <i v-if="node.parent && node.id != id" class="fas fa-arrow-left" @click="GET(node.parent)" style="position: absolute; right: 0; margin-right: 80px; z-index: 1;"></i>
            <ul class="tree">
              <tree-node :node="node" :session="session" :get-node="GET_NODE" :selected-id="selectedId" @select="click" />
            </ul>
          </div>
        </div>

        <!-- Modal para detalles del afiliado -->
        <div class="modal" :class="{ open }" @click="closed">
          <div class="modal-content" @click.stop="">
            <div class="modal-header">
              <h3 class="modal-title">Detalles del Afiliado</h3>
              <button class="modal-close" @click="closed">
                <i class="fas fa-times"></i>
              </button>
            </div>
            
            <div class="modal-body">
              <div class="user-profile">
                <div class="profile-avatar">
                  <img v-if="selec_node.photo" :src="selec_node.photo" :alt="selec_node.name" class="user-photo">
                  <i v-else class="fas fa-user-circle"></i>
                </div>
                <div class="profile-info">
                  <h2 class="profile-name">{{ selec_node.name }} {{ selec_node.lastName }}</h2>
                  <div class="profile-badges">
                    <span class="membership-badge" :class="getMembershipClass(selec_node)">
                      {{ getMembershipText(selec_node) }}
                    </span>
                    <span class="status-badge" :class="getStatusClass(selec_node)">
                      {{ getStatusText(selec_node) }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="info-grid">
                <div class="info-section">
                  <h4 class="section-title">
                    <i class="fas fa-id-card"></i>
                    Información Personal
                  </h4>
                  <div class="info-item">
                    <span class="info-label">ID:</span>
                    <span class="info-value">{{ selec_node.dni || 'No disponible' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">País:</span>
                    <span class="info-value">{{ selec_node.country || 'No disponible' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Teléfono:</span>
                    <span class="info-value">{{ selec_node.phone || 'No disponible' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Correo:</span>
                    <span class="info-value">{{ selec_node.email || 'No disponible' }}</span>
                  </div>
                </div>
                
                <div class="info-section">
                  <h4 class="section-title">
                    <i class="fas fa-chart-line"></i>
                    Puntos y Rendimiento
                  </h4>
                  <div class="points-display">
                    <div class="point-card">
                      <div class="point-icon">
                        <i class="fas fa-user"></i>
                      </div>
                      <div class="point-details">
                        <span class="point-label">Puntos Personales</span>
                        <span class="point-value">{{ selec_node.points || 0 }}</span>
                      </div>
                    </div>
                    <div class="point-card">
                      <div class="point-icon">
                        <i class="fas fa-users"></i>
                      </div>
                      <div class="point-details">
                        <span class="point-label">Puntos de Afiliación</span>
                        <span class="point-value">{{ selec_node.affiliation_points || 0 }}</span>
                      </div>
                    </div>
                    <div class="point-card">
                      <div class="point-icon">
                        <i class="fas fa-network-wired"></i>
                      </div>
                      <div class="point-details">
                        <span class="point-label">Puntos Grupales</span>
                        <span class="point-value">{{ selec_node.total_points !== undefined ? selec_node.total_points : '—' }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="info-section">
                  <h4 class="section-title">
                    <i class="fas fa-crown"></i>
                    Rango y Estatus
                  </h4>
                  <div class="info-item">
                    <span class="info-label">Rango Cerrado:</span>
                    <span class="info-value">{{ selec_node._rank | _rank }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Estado:</span>
                    <span class="info-value">{{ selec_node.activated ? 'Activado' : 'No activado' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Afiliado:</span>
                    <span class="info-value">{{ selec_node.affiliated ? 'Sí' : 'No' }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Hijos directos del afiliado -->
              <div v-if="modal_children && modal_children.length && modal_children_points && modal_children_points.length" class="children-section">
                <h4 class="section-title">
                  <i class="fas fa-sitemap"></i>
                  Hijos Directos ({{ modal_children.length }})
                </h4>
                <div class="children-grid">
                  <div v-for="(child, idx) in modal_children" :key="child.id" class="child-card">
                    <div class="child-avatar">
                      <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="child-info">
                      <h5 class="child-name">{{ child.name }}</h5>
                      <div class="child-points">
                        <span class="child-point-label">PG:</span>
                        <span class="child-point-value">{{ modal_children_points[idx] || 0 }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="modal-footer">
              <button class="btn-whatsapp-large" @click="openWhatsApp(selec_node)">
                <i class="fab fa-whatsapp"></i>
                Contactar por WhatsApp
              </button>
              <button class="btn-close" @click="closed">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Placeholder para otros modos -->
    <div v-if="selectedMode === 'niveles'">
      <div class="niveles-header">
        <h2 class="niveles-title">Resumen de Jerarquía</h2>
        <button @click="$router.push('/tree')" class="btn-volver">
          <i class="fas fa-arrow-left"></i>
          Volver al selector
        </button>
      </div>
      
      <div v-if="loading" class="loading-container">
        <i class="load"></i>
        <p>Cargando resumen de jerarquía...</p>
        <div class="loading-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: loadingProgress + '%' }"></div>
          </div>
          <span class="progress-text">{{ loadingProgress }}% completado</span>
        </div>
      </div>
<div v-if="!loading" class="hierarchy-summary">
  
        <!-- Mensaje informativo -->
        <!-- <div class="info-message">
          <i class="fas fa-info-circle"></i>
          <span>Se cargan todos los niveles de la red en una sola consulta para mostrar estadísticas completas y precisas.</span>
        </div> -->
        
        <!-- Mensaje de éxito cuando se completa la carga -->
        <!-- <div v-if="!loading && loadingProgress === 100" class="success-message">
          <i class="fas fa-check-circle"></i>
          <span>Árbol completo cargado exitosamente. Las estadísticas muestran información completa de toda la jerarquía.</span>
        </div>  -->
        
        <!-- Tarjetas de resumen -->
        <div class="summary-cards">
          <div class="summary-card">
            <div class="card-icon">
              <i class="fas fa-users"></i>
            </div>
            <div class="card-content">
              <div class="card-value">{{ hierarchyStats.totalMembers }}</div>
              <div class="card-label">Miembros Totales</div>
            </div>
          </div>
          
          <div class="summary-card">
            <div class="card-icon">
              <i class="fas fa-user-plus"></i>
            </div>
            <div class="card-content">
              <div class="card-value">{{ hierarchyStats.directAffiliates }}</div>
              <div class="card-label">Afiliados Directos</div>
            </div>
          </div>
          
          <div class="summary-card">
            <div class="card-icon">
              <i class="fas fa-layer-group"></i>
            </div>
            <div class="card-content">
              <div class="card-value">{{ hierarchyStats.maxDepth }}</div>
              <div class="card-label">Niveles de Profundidad</div>
            </div>
          </div>
          
          <div class="summary-card">
            <div class="card-icon">
              <i class="fas fa-star"></i>
            </div>
            <div class="card-content">
              <div class="card-value">{{ hierarchyStats.highPerformance }}</div>
              <div class="card-label">Alto Rendimiento</div>
            </div>
          </div>
        </div>
        
                 <!-- Distribución por niveles -->
         <div class="levels-distribution">
           <div class="distribution-header">
             <h3 class="distribution-title">Distribución por Niveles</h3>
           </div>
           <div class="levels-chart">
             <div v-for="(count, level) in hierarchyStats.levelDistribution" :key="level" class="level-row">
               <div class="level-label">Nivel {{ level }}</div>
               <div class="level-bar-container">
                 <div class="level-bar" :style="{ width: getBarWidth(count) }"></div>
               </div>
               <div class="level-count">{{ count }}</div>
             </div>
           </div>
         </div>
      </div>
    </div>
    
    <div v-if="selectedMode === 'actividad'">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="color: #666;">Vista "{{ selectedMode }}" en construcción 🚧</h3>
        <button @click="$router.push('/tree')" style="padding: 8px 16px; background: #00bcd4; border: none; border-radius: 6px; color: white;">
          Volver al selector
        </button>
      </div>
      <div style="text-align:center; margin-top:20px;">
        <p>Esta funcionalidad estará disponible próximamente</p>
      </div>
    </div>
   <!-- vista frontales-->
   <div v-if="selectedMode === 'frontales'">
     <div class="frontales-header">
       <h2 class="frontales-title">Frontales</h2>
       <button @click="$router.push('/tree')" class="btn-volver">
         <i class="fas fa-arrow-left"></i>
         Volver al selector
       </button>
     </div>
     
     <div v-if="children && children.length && children_points && children_points.length">
       <div class="loading-container" v-if="loading">
         <i class="load"></i>
         <p>Cargando frontales...</p>
       </div>
      
       <div v-if="!loading" class="frontales-grid">
         <div v-for="(child, idx) in children" :key="child.id" class="frontal-card">
           <div class="card-header">
             <div class="user-avatar">
               <i class="fas fa-user-circle"></i>
             </div>
             <div class="user-info">
               <h3 class="user-name">{{ child.name }}</h3>
               <div class="points-container">
                                   <div class="point-item">
                    <i class="fas fa-user"></i>
                    <span class="point-label">PP</span>
                    <span class="point-value">{{ child.points || 0 }}</span>
                  </div>
                 <div class="point-item">
                   <i class="fas fa-users"></i>
                   <span class="point-label">PG</span>
                   <span class="point-value">{{ children_points[idx] }}</span>
                 </div>
               </div>
             </div>
           </div>
           
           <div class="card-body">
             <div class="membership-badge" :class="getMembershipClass(child)">
               {{ getMembershipText(child) }}
             </div>
             
             <div class="card-actions">
               <button class="btn-ver-detalle" @click="openUserDetail(child)">
                 Ver detalle
               </button>
               <div class="status-badge" :class="getStatusClass(child)">
                 {{ getStatusText(child) }}
               </div>
               <button class="btn-whatsapp" @click="openWhatsApp(child)">
                 <i class="fab fa-whatsapp"></i>
               </button>
             </div>
           </div>
         </div>
       </div>
     </div>
     
           <div v-else-if="!loading" class="no-data">
        <i class="fas fa-users" style="font-size: 48px; color: #ccc; margin-bottom: 16px;"></i>
        <p>No hay frontales disponibles</p>
      </div>
      
      <!-- Modal para detalles del afiliado en vista frontales -->
      <div class="modal" :class="{ open }" @click="closed">
        <div class="modal-content" @click.stop="">
          <div class="modal-header">
            <h3 class="modal-title">Detalles del Afiliado</h3>
            <button class="modal-close" @click="closed">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="modal-body">
            <div class="user-profile">
              <div class="profile-avatar">
                <img v-if="selec_node.photo" :src="selec_node.photo" :alt="selec_node.name" class="user-photo">
                <i v-else class="fas fa-user-circle"></i>
              </div>
              <div class="profile-info">
                <h2 class="profile-name">{{ selec_node.name }} {{ selec_node.lastName }}</h2>
                <div class="profile-badges">
                  <span class="membership-badge" :class="getMembershipClass(selec_node)">
                    {{ getMembershipText(selec_node) }}
                  </span>
                  <span class="status-badge" :class="getStatusClass(selec_node)">
                    {{ getStatusText(selec_node) }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="info-grid">
              <div class="info-section">
                <h4 class="section-title">
                  <i class="fas fa-id-card"></i>
                  Información Personal
                </h4>
                <div class="info-item">
                  <span class="info-label">ID:</span>
                  <span class="info-value">{{ selec_node.dni || 'No disponible' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">País:</span>
                  <span class="info-value">{{ selec_node.country || 'No disponible' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Teléfono:</span>
                  <span class="info-value">{{ selec_node.phone || 'No disponible' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Correo:</span>
                  <span class="info-value">{{ selec_node.email || 'No disponible' }}</span>
                </div>
              </div>
              
              <div class="info-section">
                <h4 class="section-title">
                  <i class="fas fa-chart-line"></i>
                  Puntos y Rendimiento
                </h4>
                <div class="points-display">
                  <div class="point-card">
                    <div class="point-icon">
                      <i class="fas fa-user"></i>
                    </div>
                    <div class="point-details">
                      <span class="point-label">Puntos Personales</span>
                      <span class="point-value">{{ selec_node.points || 0 }}</span>
                    </div>
                  </div>
                  <div class="point-card">
                    <div class="point-icon">
                      <i class="fas fa-users"></i>
                    </div>
                    <div class="point-details">
                      <span class="point-label">Puntos de Afiliación</span>
                      <span class="point-value">{{ selec_node.affiliation_points || 0 }}</span>
                    </div>
                  </div>
                  <div class="point-card">
                    <div class="point-icon">
                      <i class="fas fa-network-wired"></i>
                    </div>
                    <div class="point-details">
                      <span class="point-label">Puntos Grupales</span>
                      <span class="point-value">{{ totalPoints}}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="info-section">
                <h4 class="section-title">
                  <i class="fas fa-crown"></i>
                  Rango y Estatus
                </h4>
                <div class="info-item">
                  <span class="info-label">Rango Cerrado:</span>
                  <span class="info-value">{{ selec_node._rank | _rank }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Estado:</span>
                  <span class="info-value">{{ selec_node.activated ? 'Activado' : 'No activado' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Afiliado:</span>
                  <span class="info-value">{{ selec_node.affiliated ? 'Sí' : 'No' }}</span>
                </div>
              </div>
            </div>
            
            <!-- Hijos directos del afiliado -->
            <div v-if="modal_children && modal_children.length && modal_children_points && modal_children_points.length" class="children-section">
              <h4 class="section-title">
                <i class="fas fa-sitemap"></i>
                Hijos Directos ({{ modal_children.length }})
              </h4>
              <div class="children-grid">
                <div v-for="(child, idx) in modal_children" :key="child.id" class="child-card">
                  <div class="child-avatar">
                    <i class="fas fa-user-circle"></i>
                  </div>
                  <div class="child-info">
                    <h5 class="child-name">{{ child.name }}</h5>
                    <div class="child-points">
                      <span class="child-point-label">PG:</span>
                      <span class="child-point-value">{{ modal_children_points[idx] || 0 }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn-whatsapp-large" @click="openWhatsApp(selec_node)">
              <i class="fab fa-whatsapp"></i>
              Contactar por WhatsApp
            </button>
            <button class="btn-close" @click="closed">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>


  </App>
</template>

<script>
import App from '@/views/layouts/App'
import api from '@/api'
import router from '../../router'

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
    },
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
        
        // Asignar los puntos grupales a cada hijo
        this.children.forEach((child, index) => {
          if (this.children_points[index] !== undefined) {
            child.total_points = this.children_points[index]
          }
        })
        
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
      ]),
      this.loading ? h('div', { style: { color: '#00bcd4', fontSize: '12px', marginTop: '4px' } }, [
        h('i', { class: ['fas', 'fa-spinner', 'fa-spin'], style: { marginRight: '6px' } }), 'Cargando...']
      ) : null,
      // Mostrar el desglose de puntos por hijo debajo de los hijos expandidos
      (this.expanded && this.children_points && this.children_points.length > 0) ?
        h('div', { style: { margin: '8px 0 8px 24px', fontSize: '13px', color: '#00bcd4' } }, [
          h('div', { style: { fontWeight: 'bold', marginBottom: '4px' } }, 'Total grupal por hijo:'),
          h('ul', { style: { margin: '4px 0 0 0', padding: 0, listStyle: 'none' } },
            this.children_points.map((pts, idx) =>
              h('li', { key: idx, style: { marginBottom: '2px' } }, `${this.children[idx].name}: ${pts}`)
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
      selectedMode: null, // Para controlar qué modo está seleccionado
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
      isMobile: false,
      isMobileSmall: false,
      hierarchyStats: { // Nuevo: para almacenar los datos del resumen de jerarquía
        totalMembers: 0,
        directAffiliates: 0,
        maxDepth: 0,
        highPerformance: 0,
        levelDistribution: {}
      },
      loadingProgress: 0 // Progreso de carga en porcentaje
    }
  },
  computed: {
    session()   { return this.$store.state.session },
    office_id() { return this.$store.state.office_id },
    name()      { return this.$store.state.name },
    activated() { return this.$store.state.activated },
    affiliated() { return this.$store.state.affiliated },
         totalPoints() {
       // Si estamos en la vista de frontales, usar los puntos grupales del usuario seleccionado
       if (this.selectedMode === 'frontales' && this.selec_node.total_points !== undefined) {
         return this.selec_node.total_points;
       }
       // Para otros casos, calcular la suma de puntos personales + puntos de hijos
       const childrenPointsTotal = this.modal_children_points.reduce((total, points) => total + points, 0);
       return childrenPointsTotal + (this.selec_node.points || 0);
     },
  },

  filters: {
    date(val) {
      return new Date(val).toLocaleDateString()
      // return new Date(val).toLocaleString()
    },
    _rank(val) {
      if(val == 'none')              return 'Ninguno'
      if(val == 'active')            return 'ACTIVO'
      if(val == 'star')              return 'BRONCE'
      if(val == 'master')            return 'PLATA'
      if(val == 'silver')            return 'PLATA'
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
    // Detectar el modo desde la ruta
    this.detectModeFromRoute();
  },
  mounted() {
    // Detectar el modo desde la ruta al montar
    this.detectModeFromRoute();
    // Detectar tamaño de pantalla
    this.detectScreenSize();
    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', this.detectScreenSize);
  },
  beforeDestroy() {
    // Remover listener al destruir el componente
    window.removeEventListener('resize', this.detectScreenSize);
  },
  watch: {
    // Cuando se navega a esta ruta, detectar el modo
    '$route'() {
      this.detectModeFromRoute();
    }
  },
  beforeRouteEnter(to, from, next) {
    // Permitir que el componente maneje la detección del modo
    next();
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
      this.selec_node = data.node;
/*       console.log("selec_node:", this.children_points);  */
    },
    detectScreenSize() {
      const width = window.innerWidth;
      this.isMobile = width <= 968;
      this.isMobileSmall = width <= 400;
    },
    detectModeFromRoute() {
      const path = this.$route.path;
      if (path === '/tree/red') {
        this.selectedMode = 'red';
        this.GET(null);
      } else if (path === '/tree/frontales') {
        this.selectedMode = 'frontales';
        this.loadFrontalesData();
      } else if (path === '/tree/niveles') {
        this.selectedMode = 'niveles';
        this.loadHierarchyStats();
      } else if (path === '/tree/actividad') {
        this.selectedMode = 'actividad';
      } else {
        // Si es /tree sin parámetros, mostrar selector
        this.selectedMode = null;
      }
    },
    selectMode(mode) {
      this.selectedMode = mode;
      // Navegar a la ruta correspondiente
      this.$router.push(`/tree/${mode}`);
      
      if (mode === 'red') {
        this.GET(null); // Cargar datos de la red
      } else if (mode === 'frontales') {
        this.loadFrontalesData(); // Cargar datos de frontales
      } else if (mode === 'niveles') {
        this.loadHierarchyStats(); // Cargar estadísticas de jerarquía
      }
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
    // openModal(child) {
    //   this.selec_node = child; // Asignar el hijo seleccionado
    //   this.open = true; // Abrir el modal
    // },
    // Métodos para la vista de frontales
    getMembershipClass(child) {
      const rank = child._rank || child.rank || 'none';
      const membershipMap = {
        'none'   :       'Ninguno',
       'active'       :     'ACTIVO',
       'star'         :     'BRONCE',
       'master'       :     'PLATA',
       'silver'       :     'PLATA',
       'gold'         :    'ORO',
       'RUBI'         :    'DIAMANTE RUBI',
       'sapphire'     :      'ZAFIRO',
       'DIAMANTE'     :     'DIAMANTE ESTRELLA',
       'DOBLE DIAMANTE'    :'DIAMANTE DOS ESTRELLAS',
      'TRIPLE DIAMANTE' : 'DIAMANTE TRES ESTRELLAS',
     'DIAMANTE ESTRELLA'  :'DIAMANTE CBM',
    };
      return membershipMap[rank] || 'bronze';
    },
    
    getMembershipText(child) {
      const rank = child._rank || child.rank || 'none';
      const membershipMap = {
        'none'   :       'Ninguno',
       'active'       :     'ACTIVO',
       'star'         :     'BRONCE',
       'master'       :     'PLATA',
       'silver'       :     'PLATA',
       'gold'         :    'ORO',
       'RUBI'         :    'DIAMANTE RUBI',
       'sapphire'     :      'ZAFIRO',
       'DIAMANTE'     :     'DIAMANTE ESTRELLA',
       'DOBLE DIAMANTE'    :'DIAMANTE DOS ESTRELLAS',
      'TRIPLE DIAMANTE' : 'DIAMANTE TRES ESTRELLAS',
     'DIAMANTE ESTRELLA'  :'DIAMANTE CBM',
      };
      return membershipMap[rank] || 'Bronce';
    },
    
    getStatusClass(child) {
      // Simular estado activo/inactivo basado en puntos o activación
      const isActive = (child.points && child.points > 0) || child.activated;
      return isActive ? 'status-active' : 'status-inactive';
    },
    
    getStatusText(child) {
      const isActive = (child.points && child.points > 0) || child.activated;
      return isActive ? 'ACTIVO' : 'INACTIVO';
    },
    
         async openUserDetail(child) {
       this.selec_node = child;
       this.open = true;
       
       // Cargar datos completos del usuario seleccionado
       try {
         const { data } = await this.GET_NODE(child.id, this.session);
         this.modal_children = data.children || [];
         this.modal_children_points = data.children_points || [];
         
         // Asegurar que el usuario seleccionado tenga sus puntos personales
         if (child.points !== undefined) {
           this.selec_node.points = child.points;
         }
         
         // Si estamos en frontales, usar los puntos grupales del hijo
         if (this.selectedMode === 'frontales') {
           const childIndex = this.children.findIndex(c => c.id === child.id);
           if (childIndex !== -1 && this.children_points[childIndex] !== undefined) {
             this.selec_node.total_points = this.children_points[childIndex];
           }
         }
       } catch (error) {
/*          console.error("Error al cargar detalles del usuario:", error); */
         this.modal_children = [];
         this.modal_children_points = [];
       }
     },
    
    openWhatsApp(child) {
      const phone = child.phone || '';
      const message = `Hola ${child.name}, te contacto desde Sifrah`;
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    },
    
    async loadFrontalesData() {
      this.loading = true;
      try {
        // Cargar datos del usuario actual para obtener sus frontales
        const { data } = await api.tree(this.session, null);
        this.children = data.children || [];
        this.children_points = data.children_points || [];
        this.loading = false;
      } catch (error) {
        console.error("Error al cargar datos de frontales:", error);
        this.loading = false;
      }
// Verifica que total_points esté presente
    },
    
    goToRedMap() {
      // Redirigir a la vista de red
      this.selectMode('red');
    },
         async loadHierarchyStats() {
      this.loading = true;
      this.loadingProgress = 0;
      try {
        // Usar el nuevo endpoint que carga TODO el árbol de una vez (como admin)
        this.loadingProgress = 20;
        const { data } = await api.treeComplete(this.session, null);
        
        if (data.error) {
          throw new Error(data.msg || 'Error loading tree');
        }
        
        this.loadingProgress = 80;
        
        // El nodo ya viene con todos los niveles cargados
        this.node = data.node;
        
        // Calcular estadísticas con todos los niveles ya cargados
        this.calculateHierarchyStats();
        this.loadingProgress = 100;
        this.loading = false;
        
        console.log('Árbol completo cargado exitosamente en una sola consulta');
      } catch (error) {
        console.error("Error al cargar estadísticas de jerarquía:", error);
        this.loading = false;
      }
    },
    

    
    // Método para depurar la estructura del árbol
    debugTreeStructure(node, level = 0) {
      if (!node) return;
      
      const indent = '  '.repeat(level);
/*       console.log(`${indent}Nivel ${level}: ${node.name} (ID: ${node.id})`); */
      
      if (node._childs && node._childs.length > 0) {
        node._childs.forEach(child => {
          this.debugTreeStructure(child, level + 1);
        });
      }
    },
    
         calculateHierarchyStats() {
       if (!this.node) return;
       
       // Inicializar estadísticas
       const stats = {
         totalMembers: 0,
         directAffiliates: 0,
         maxDepth: 0,
         highPerformance: 0,
         levelDistribution: {}
       };
       
       // Contar miembros totales y distribución por niveles (optimizado)
       this.countMembersByLevel(this.node, 0, stats);
       
       // Calcular afiliados directos (hijos directos del usuario logueado)
       stats.directAffiliates = this.node._childs ? this.node._childs.length : 0;
       
       // Calcular alto rendimiento (usuarios con más de 1000 puntos)
       stats.highPerformance = this.countHighPerformanceUsers(this.node);
       
       // Asegurar que el nivel 0 tenga al menos 1 (el usuario logueado)
       if (!stats.levelDistribution[0]) {
         stats.levelDistribution[0] = 1;
       }
       
       // Actualizar las estadísticas
       this.hierarchyStats = stats;
       
       // Solo mostrar logs en desarrollo
       if (process.env.NODE_ENV === 'development') {
        //  console.log('Estadísticas calculadas:', stats);
        //  console.log('Distribución por niveles:', stats.levelDistribution);
       }
     },
    
    
     

    
    // Método para limpiar caché y recargar datos (útil para debugging)
    clearCacheAndReload() {
      // Limpiar caché de hijos cargados
      if (this.node) {
        this.clearNodeCache(this.node);
      }
      
      // Recargar estadísticas
      this.loadHierarchyStats();
    },
    
    // Método recursivo para limpiar caché
    clearNodeCache(node) {
      if (node._childs) {
        delete node._childs;
        // Limpiar caché de hijos recursivamente
        if (node.childs) {
          node.childs.forEach(child => this.clearNodeCache(child));
        }
      }
    },
    
    countMembersByLevel(node, level, stats) {
      if (!node) return;
      
      // Incrementar contador total
      stats.totalMembers++;
      
      // Incrementar contador del nivel
      if (!stats.levelDistribution[level]) {
        stats.levelDistribution[level] = 0;
      }
      stats.levelDistribution[level]++;
      
      // Actualizar profundidad máxima
      stats.maxDepth = Math.max(stats.maxDepth, level);
      
      // Contar hijos recursivamente (sin limitaciones)
      if (node._childs && node._childs.length > 0) {
        node._childs.forEach(child => {
          this.countMembersByLevel(child, level + 1, stats);
        });
      }
    },
    
    countHighPerformanceUsers(node) {
      if (!node) return 0;
      
      let count = 0;
      
      // Contar si el usuario actual tiene alto rendimiento
      if ((node.points && node.points > 1000) || (node.total_points && node.total_points > 1000)) {
        count++;
      }
      
      // Recursivamente contar hijos (sin limitaciones)
      if (node._childs) {
        node._childs.forEach(child => {
          count += this.countHighPerformanceUsers(child);
        });
      }
      
      return count;
    },
    
    getBarWidth(count) {
      const maxCount = Math.max(...Object.values(this.hierarchyStats.levelDistribution));
      if (maxCount === 0 || !count) return '0%';
      return `${(count / maxCount) * 100}%`;
    }
  }
};
</script>

<style lang="stylus">
  .modal
    background rgba(#000, 0.72)
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    padding 20px
    display none
    z-index 1000
    overflow auto
    backdrop-filter blur(5px)
    &.open
      display flex
      align-items center
      justify-content center
    .modal-content
      background #ffffff
      border-radius 20px
      max-width 800px
      width 100%
      max-height 90vh
      overflow hidden
      box-shadow 0 20px 60px rgba(0, 0, 0, 0.3)
      animation modalSlideIn 0.3s ease-out
      
  @keyframes modalSlideIn
    from
      opacity 0
      transform translateY(-50px) scale(0.9)
    to
      opacity 1
      transform translateY(0) scale(1)

</style>

<style>
.mode-selector {
  /* padding: 60px 20px;
  max-width: 900px;
  margin: 0 auto;
  background: #f5f2e9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
}

.mode-title {
  text-align: center;
  margin-bottom: 40px;
  color: #4a4a4a;
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 1px;
  
}

.cards-container {
  display: flex;
  gap: 45px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 50px;
}

/* Responsive para móviles */
@media (max-width: 968px) {
  /* .cards-container {
    gap: 20px;
    max-width: 400px;
    margin: 0 auto 50px auto;
  }
  
  .mode-selector .card {
    width: 140px;
    height: 140px;
    padding: 15px;
  }
  
  .card-text {
    font-size: 20px;
  }
  
  .mode-title {
    font-size: 20px;
    margin-bottom: 20px;
  }
  
  .top-buttons {
    flex-direction: column;
    gap: 15px;
  }
  
  .btn {
    padding: 10px 20px;
    font-size: 13px;
  }
  
  .btn-orange {
    font-size: 14px;
    padding: 12px 24px;
  } */
}

/* Para móviles muy pequeños */
@media (max-width: 400px) {
  /* .cards-container {

  }
  
  .mode-selector .card {
    width: 150px;
    height: 150px;
    padding: 12px;
  }
  
  .card-text {
    font-size: 15px;
  }
  
  .mode-title {
    font-size: 20px;
    margin-bottom: 20px;
  }
  
  .card-icon svg {
    width: 40px;
    height: 40px;
  } */
}

.mode-selector .card {
  background: #fff;
  border: none;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 180px;
  height: 180px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Clases específicas para móvil */
.mode-selector .card.mobile {
  width: 140px !important;
  height: 140px !important;
  padding: 15px !important;
}

.mode-selector .card.mobile-small {
  width: 125px !important;
  height: 125px !important;
  padding: 12px !important;
}

/* Clases para texto en móvil */
.card-text.mobile {
  font-size: 20px !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  padding: 0 !important;
}

.card-text.mobile-small {
  font-size: 15px !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  padding: 0 !important;
}

/* Clases para título en móvil */
.mode-title.mobile {
  font-size: 20px !important;
  margin-bottom: 20px !important;
}

.mode-title.mobile-small {
  font-size: 20px !important;
  margin-bottom: 20px !important;
}

/* Espaciado adicional para elementos debajo del título en móvil */
.cards-container.mobile {
  margin-top: 30px !important;
}

.cards-container.mobile-small {
  margin-top: 25px !important;
}

/* Clases para iconos en móvil */
.card-icon svg.mobile {
  width: 50px !important;
  height: 50px !important;
}

.card-icon svg.mobile-small {
  width: 40px !important;
  height: 40px !important;
}

/* Clases para imágenes en móvil */
.card-icon img.mobile {
  width: 80px !important;
  height: 80px !important;
}

.card-icon img.mobile-small {
  width: 70px !important;
  height: 70px !important;
}

.mode-selector .card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.card-icon svg {
  width: 60px;
  height: 60px;
}

.card-text {
  margin: 0;
  color: #333;
  font-weight: 600;
  font-size: 26px;
  letter-spacing: 0.5px;
  padding: 0 10px;
  text-align: center;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.top-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.bottom-button {
  display: flex;
  justify-content: center;
}

.btn {
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 12px 24px;
  font-size: 14px;
}

.btn-green {
  background: #28a745;
  color: white;
}

.btn-green:hover {
  background: #218838;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

.btn-orange {
  background: #e67e00;
  color: white;
  font-size: 16px;
  padding: 14px 28px;
}

.btn-orange:hover {
  background: #d35400;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(230, 126, 0, 0.3);
}

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

/* Estilos para la vista de Frontales */
.frontales-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 0 20px;
}

.frontales-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.btn-volver {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #00bcd4;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-volver:hover {
  background: #0097a7;
  transform: translateY(-2px);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #666;
}

.loading-container p {
  margin-top: 16px;
  font-size: 16px;
}

.loading-progress {
  margin-top: 20px;
  width: 100%;
  max-width: 300px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00bcd4, #0097a7);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.frontales-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.frontal-card {
  background: #f5f2e9;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #e0d8c0;
}

.frontal-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.user-avatar {
  flex-shrink: 0;
}

.user-avatar i {
  font-size: 48px;
  color: #00bcd4;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0 0 12px 0;
  line-height: 1.2;
}

.points-container {
  display: flex;
  gap: 16px;
}

.point-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.point-item i {
  font-size: 16px;
  color: #666;
}

.point-label {
  font-size: 12px;
  font-weight: bold;
  color: #666;
  text-transform: uppercase;
}

.point-value {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.membership-badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  align-self: flex-start;
}

.membership-badge.bronze {
  background: #cd7f32;
  color: white;
}

.membership-badge.silver {
  background: #c0c0c0;
  color: white;
}

.membership-badge.gold {
  background: #d4af37;
  color: white;
}

.membership-badge.ruby {
  background: #e0115f;
  color: white;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-ver-detalle {
  padding: 8px 16px;
  background: #28a745;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 100px;
}

.btn-ver-detalle:hover {
  background: #218838;
  transform: translateY(-1px);
}

.status-badge {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.status-active {
  background: #d4edda;
  color: #155724;
}

.status-badge.status-inactive {
  background: #f8d7da;
  color: #721c24;
}

.btn-whatsapp {
  width: 36px;
  height: 36px;
  background: #25d366;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-whatsapp:hover {
  background: #128c7e;
  transform: scale(1.1);
}

.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #999;
  text-align: center;
}

.no-data p {
  font-size: 16px;
  margin: 0;
}

/* Responsive para móviles */
@media (max-width: 768px) {
  .frontales-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .frontales-title {
    font-size: 24px;
  }
  
  .frontales-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 0 16px;
  }
  
  .frontal-card {
    padding: 16px;
  }
  
  .user-name {
    font-size: 16px;
  }
  
  .points-container {
    gap: 12px;
  }
  
  .card-actions {
    gap: 8px;
  }
  
  .btn-ver-detalle {
    font-size: 11px;
    padding: 6px 12px;
  }
}

/* Estilos para el Modal de Detalles */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 30px;
  border-bottom: 1px solid #e0e0e0;
  background: linear-gradient(135deg, #00bcd4, #0097a7);
  color: white;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.modal-close {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.modal-body {
  padding: 30px;
  max-height: 60vh;
  overflow-y: auto;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
}

.profile-avatar {
  flex-shrink: 0;
}

.user-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #00bcd4;
}

.profile-avatar i {
  font-size: 80px;
  color: #00bcd4;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0 0 12px 0;
}

.profile-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

.info-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #00bcd4;
}

.section-title i {
  color: #00bcd4;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 600;
  color: #666;
  font-size: 14px;
}

.info-value {
  font-weight: bold;
  color: #333;
  font-size: 14px;
}

.points-display {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.point-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  border-left: 4px solid #00bcd4;
}

.point-icon {
  width: 40px;
  height: 40px;
  background: #e0f7fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00bcd4;
  font-size: 18px;
}

.point-details {
  flex: 1;
}

.point-details .point-label {
  display: block;
  font-size: 12px;
  color: #666;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.point-details .point-value {
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.children-section {
  margin-top: 30px;
}

.children-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.child-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.child-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #00bcd4;
}

.child-avatar i {
  font-size: 32px;
  color: #00bcd4;
}

.child-info {
  flex: 1;
}

.child-name {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin: 0 0 4px 0;
}

.child-points {
  display: flex;
  align-items: center;
  gap: 4px;
}

.child-point-label {
  font-size: 11px;
  color: #666;
  font-weight: 600;
  text-transform: uppercase;
}

.child-point-value {
  font-size: 14px;
  font-weight: bold;
  color: #00bcd4;
}

.modal-footer {
  display: flex;
  gap: 16px;
  padding: 24px 30px;
  border-top: 1px solid #e0e0e0;
  background: #f8f9fa;
}

.btn-whatsapp-large {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #25d366;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.btn-whatsapp-large:hover {
  background: #128c7e;
  transform: translateY(-2px);
}

.btn-close {
  padding: 12px 24px;
  background: #6c757d;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-close:hover {
  background: #5a6268;
  transform: translateY(-2px);
}

/* Responsive para el modal */
@media (max-width: 768px) {
  .modal-body {
    padding: 20px;
  }
  
  .user-profile {
    flex-direction: column;
    text-align: center;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .children-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .btn-whatsapp-large,
  .btn-close {
    width: 100%;
  }
}
</style>

<style>
.niveles-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 0 20px;
}

.niveles-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.hierarchy-summary {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.info-message {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #e3f2fd;
  border: 1px solid #2196f3;
  border-radius: 8px;
  margin-bottom: 20px;
  color: #1976d2;
  font-size: 14px;
}

.info-message i {
  color: #2196f3;
  font-size: 16px;
  flex-shrink: 0;
}

.success-message {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #e8f5e8;
  border: 1px solid #4caf50;
  border-radius: 8px;
  margin-bottom: 20px;
  color: #2e7d32;
  font-size: 14px;
}

.success-message i {
  color: #4caf50;
  font-size: 16px;
  flex-shrink: 0;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.summary-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
}

 .summary-card .card-icon {
   width: 60px;
   height: 60px;
   background: #fff3e0;
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   color: #ff9800;
   font-size: 28px;
   margin-bottom: 15px;
 }

.summary-card .card-content {
  flex: 1;
}

.summary-card .card-value {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.summary-card .card-label {
  font-size: 14px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.levels-distribution {
  margin-top: 30px;
}

 .distribution-title {
   font-size: 20px;
   font-weight: bold;
   color: #333;
   margin-bottom: 15px;
   padding-bottom: 8px;
   border-bottom: 2px solid #ff9800;
 }

 .levels-chart {
   display: flex;
   flex-direction: column;
   gap: 8px;
   padding: 20px;
   background: white;
   border-radius: 12px;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
 }

 .level-row {
   display: flex;
   align-items: center;
   gap: 15px;
   padding: 8px 0;
   border-bottom: 1px solid #f0f0f0;
 }

 .level-row:last-child {
   border-bottom: none;
 }

 .level-label {
   font-size: 14px;
   color: #666;
   font-weight: 600;
   min-width: 80px;
   text-align: left;
 }

 .level-bar-container {
   flex: 1;
   height: 20px;
   background: #f5f5f5;
   border-radius: 10px;
   overflow: hidden;
   position: relative;
   border: 1px solid #e0e0e0;
 }

 .level-bar {
   height: 100%;
   background: linear-gradient(90deg, #ff9800, #f57c00);
   border-radius: 10px;
   transition: width 0.8s ease-in-out;
   position: relative;
   overflow: hidden;
 }

 .level-bar::after {
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
   animation: shimmer 2s infinite;
 }

 @keyframes shimmer {
   0% { transform: translateX(-100%); }
   100% { transform: translateX(100%); }
 }

 .level-count {
   font-size: 16px;
   font-weight: bold;
   color: #333;
   min-width: 50px;
   text-align: right;
   background: #f8f9fa;
   padding: 4px 8px;
   border-radius: 6px;
   border: 1px solid #e9ecef;
 }

/* Responsive para móviles */
@media (max-width: 768px) {
  .niveles-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .niveles-title {
    font-size: 24px;
  }
  
  .summary-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  .summary-card {
    padding: 15px;
  }
  
  .summary-card .card-icon {
    width: 50px;
    height: 50px;
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .summary-card .card-value {
    font-size: 24px;
  }
  
  .summary-card .card-label {
    font-size: 12px;
  }
  
  .levels-chart {
    padding: 15px;
  }
  
  .level-row {
    gap: 10px;
  }
  
  .level-label {
    font-size: 12px;
    min-width: 60px;
  }
  
  .level-count {
    font-size: 14px;
    min-width: 40px;
    padding: 3px 6px;
  }
}

@media (max-width: 480px) {
  .summary-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .summary-card {
    padding: 12px;
  }
  
  .summary-card .card-icon {
    width: 45px;
    height: 45px;
    font-size: 20px;
  }
  
  .summary-card .card-value {
    font-size: 20px;
  }
  
  .levels-chart {
    padding: 10px;
  }
  
  .level-row {
    gap: 8px;
  }
  
  .level-label {
    font-size: 11px;
    min-width: 50px;
  }
  
  .level-bar-container {
    height: 16px;
  }
  
  .level-count {
    font-size: 12px;
    min-width: 35px;
    padding: 2px 4px;
  }
}

/* Estilos para el indicador de carga */
.distribution-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>

