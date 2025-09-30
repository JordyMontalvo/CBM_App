<template>
  <div class="app">
    <header :class="{ silver: plan == 'business', gold: plan == 'master' }">

      <h3 class="slogan">
        <span v-if="country == 'Perú'"       style="font-size: 28px;">🇵🇪</span>
        <span v-if="country == 'Bolivia'"    style="font-size: 28px;">🇧🇴</span>
        <span v-if="country == 'Ecuador'"    style="font-size: 28px;">🇪🇨</span>
        <span v-if="country == 'Colombia'"   style="font-size: 28px;">🇨🇴</span>
        <span v-if="country == 'Argentina'"  style="font-size: 28px;">🇦🇷</span>
        <span v-if="country == 'Chile'"      style="font-size: 28px;">🇨🇱</span>
        <span v-if="country == 'Costa Rica'" style="font-size: 28px;">🇨🇷</span>
          &nbsp;&nbsp;&nbsp;Compañia Brillante Mundial
      </h3>

      <i class="burger fas fa-bars" @click="opened"></i>

      <h4>{{ name }} {{ lastName }} <i class="avatar fas fa-user"
                      :class="{'yellow': affiliated, 'blue': _activated, 'green': activated}"></i>
      </h4>

    </header>
    <section :class="{ 'open': open }">

      <div class="menu">
        
        <label v-if="office_id == null">
          <img v-if="photoState == 'default'" class="photo" :src="photo">
          <img v-if="photoState == 'changed'" class="photo" :src="newPhoto">

          <input type="file" @change="changePhoto">
        </label>

        <div v-if="photoState == 'changed'" class="controls" >
          <i @click="cancelNewPhoto" class="fas fa-times"></i>
          <i @click="changeNewPhoto" class="fas fa-check"></i>
        </div>

        <div class="social" style="display: flex;" v-if="office_id == null">
          <a class="fab fa-facebook-square" :href="fb" target="_blank" style="font-size: 18px;color: #4267B2;"></a>
          <a class="fab fa-instagram"       :href="is" target="_blank" style="font-size: 18px;color: #e95950;"></a>
          <a class="fab fa-youtube"         :href="yt" target="_blank" style="font-size: 18px;color: #ff0050;"></a>
        </div>

        <router-link to="/dashboard" @click.native="close" v-if="office_id == null">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon">
            <path d="M13 9V3H21V9H13ZM3 13V3H11V13H3ZM13 21V11H21V21H13ZM3 21V15H11V21H3ZM5 11H9V5H5V11ZM15 19H19V13H15V19ZM15 7H19V5H15V7ZM5 19H9V17H5V19Z" fill="white"/>
          </svg> INICIO
        </router-link>
        <!-- <router-link to="/status" @click.native="close">
          <i class="fas fa-tachometer-alt"></i> ESTADO
        </router-link> -->

        <a @click="actived(0)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon">
            <path d="M7 22C6.45 22 5.97933 21.8043 5.588 21.413C5.19667 21.0217 5.00067 20.5507 5 20C4.99933 19.4493 5.19533 18.9787 5.588 18.588C5.98067 18.1973 6.45133 18.0013 7 18C7.54867 17.9987 8.01967 18.1947 8.413 18.588C8.80633 18.9813 9.002 19.452 9 20C8.998 20.548 8.80233 21.019 8.413 21.413C8.02367 21.807 7.55267 22.0027 7 22ZM17 22C16.45 22 15.9793 21.8043 15.588 21.413C15.1967 21.0217 15.0007 20.5507 15 20C14.9993 19.4493 15.1953 18.9787 15.588 18.588C15.9807 18.1973 16.4513 18.0013 17 18C17.5487 17.9987 18.0197 18.1947 18.413 18.588C18.8063 18.9813 19.002 19.452 19 20C18.998 20.548 18.8023 21.019 18.413 21.413C18.0237 21.807 17.5527 22.0027 17 22ZM5.2 4H19.95C20.3333 4 20.625 4.171 20.825 4.513C21.025 4.855 21.0333 5.20067 20.85 5.55L17.3 11.95C17.1167 12.2833 16.871 12.5417 16.563 12.725C16.255 12.9083 15.9173 13 15.55 13H8.1L7 15H19V17H7C6.25 17 5.68333 16.671 5.3 16.013C4.91667 15.355 4.9 14.7007 5.25 14.05L6.6 11.6L3 4H1V2H4.25L5.2 4Z" fill="white"/>
          </svg>
          <i class="fas fa-caret-down"></i> PRODUCTOS
        </a>
        <div class="sub-menu" :class="{'active': buys}">
          <router-link to="/activation" @click.native="close" v-if="affiliated">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon">
              <path d="M6 22C5.45 22 4.97933 21.8043 4.588 21.413C4.19667 21.0217 4.00067 20.5507 4 20V8C4 7.45 4.196 6.97933 4.588 6.588C4.98 6.19667 5.45067 6.00067 6 6H8C8 4.9 8.39167 3.95833 9.175 3.175C9.95833 2.39167 10.9 2 12 2C13.1 2 14.0417 2.39167 14.825 3.175C15.6083 3.95833 16 4.9 16 6H18C18.55 6 19.021 6.196 19.413 6.588C19.805 6.98 20.0007 7.45067 20 8V20C20 20.55 19.8043 21.021 19.413 21.413C19.0217 21.805 18.5507 22.0007 18 22H6ZM10 6H14C14 5.45 13.8043 4.97933 13.413 4.588C13.0217 4.19667 12.5507 4.00067 12 4C11.4493 3.99933 10.9787 4.19533 10.588 4.588C10.1973 4.98067 10.0013 5.45133 10 6ZM15 11C15.2833 11 15.521 10.904 15.713 10.712C15.905 10.52 16.0007 10.2827 16 10V8H14V10C14 10.2833 14.096 10.521 14.288 10.713C14.48 10.905 14.7173 11.0007 15 11ZM9 11C9.28333 11 9.521 10.904 9.713 10.712C9.905 10.52 10.0007 10.2827 10 10V8H8V10C8 10.2833 8.096 10.521 8.288 10.713C8.48 10.905 8.71733 11.0007 9 11Z" fill="white"/>
            </svg> COMPRAS
          </router-link>
          <router-link to="/affiliation" @click.native="close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon">
              <path d="M8 5.5C8 6.16304 7.73661 6.79893 7.26777 7.26777C6.79893 7.73661 6.16304 8 5.5 8C4.83696 8 4.20107 7.73661 3.73223 7.26777C3.26339 6.79893 3 6.16304 3 5.5C3 4.83696 3.26339 4.20107 3.73223 3.73223C4.20107 3.26339 4.83696 3 5.5 3C6.16304 3 6.79893 3.26339 7.26777 3.73223C7.73661 4.20107 8 4.83696 8 5.5ZM11.5 8C12.0304 8 12.5391 7.78929 12.9142 7.41421C13.2893 7.03914 13.5 6.53043 13.5 6C13.5 5.46957 13.2893 4.96086 12.9142 4.58579C12.5391 4.21071 12.0304 4 11.5 4C10.9696 4 10.4609 4.21071 10.0858 4.58579C9.71071 4.96086 9.5 5.46957 9.5 6C9.5 6.53043 9.71071 7.03914 10.0858 7.41421C10.4609 7.78929 10.9696 8 11.5 8ZM8 9.5C8.00067 9.32467 8.029 9.15867 8.085 9.002L8 9H3C2.60218 9 2.22064 9.15804 1.93934 9.43934C1.65804 9.72064 1.5 10.1022 1.5 10.5V10.575C1.5 10.575 1.5 13.5 5.5 13.5C6.71 13.5 7.555 13.232 8.144 12.858C8.206 12.7273 8.28533 12.608 8.382 12.5C8.13601 12.225 8.00001 11.869 8 11.5C8 11.116 8.144 10.765 8.382 10.5C8.13601 10.225 8.00001 9.86897 8 9.5ZM9.5 9C9.36739 9 9.24021 9.05268 9.14645 9.14645C9.05268 9.24021 9 9.36739 9 9.5C9 9.63261 9.05268 9.75979 9.14645 9.85355C9.24021 9.94732 9.36739 10 9.5 10H14.5C14.6326 10 14.7598 9.94732 14.8536 9.85355C14.9473 9.75979 15 9.63261 15 9.5C15 9.36739 14.9473 9.24021 14.8536 9.14645C14.7598 9.05268 14.6326 9 14.5 9H9.5ZM9.5 11C9.36739 11 9.24021 11.0527 9.14645 11.1464C9.05268 11.2402 9 11.3674 9 11.5C9 11.6326 9.05268 11.7598 9.14645 11.8536C9.24021 11.9473 9.36739 12 9.5 12H14.5C14.6326 12 14.7598 11.9473 14.8536 11.8536C14.9473 11.7598 15 11.6326 15 11.5C15 11.3674 14.9473 11.2402 14.8536 11.1464C14.7598 11.0527 14.6326 11 14.5 11H9.5ZM9.5 13C9.36739 13 9.24021 13.0527 9.14645 13.1464C9.05268 13.2402 9 13.3674 9 13.5C9 13.6326 9.05268 13.7598 9.14645 13.8536C9.24021 13.9473 9.36739 14 9.5 14H14.5C14.6326 14 14.7598 13.9473 14.8536 13.8536C14.9473 13.7598 15 13.6326 15 13.5C15 13.3674 14.9473 13.2402 14.8536 13.1464C14.7598 13.0527 14.6326 13 14.5 13H9.5Z" fill="white"/>
            </svg> AFILIACIÓN
          </router-link>
        </div>

        <a @click="actived(1)" v-if="tree">
        <!-- <a @click="actived(1)"> -->
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon">
            <path d="M12 12C13.873 12 15.57 12.62 16.815 13.487C17.998 14.312 19 15.538 19 16.857C19 17.581 18.691 18.181 18.204 18.627C17.746 19.048 17.148 19.321 16.532 19.507C15.301 19.88 13.68 20 12 20C10.32 20 8.699 19.88 7.468 19.507C6.852 19.321 6.254 19.048 5.795 18.627C5.31 18.182 5 17.582 5 16.858C5 15.539 6.002 14.313 7.185 13.488C8.43 12.62 10.127 12 12 12ZM19 13C20.044 13 20.992 13.345 21.693 13.833C22.333 14.28 23 15.023 23 15.929C23 16.446 22.775 16.875 22.44 17.182C22.134 17.463 21.756 17.628 21.411 17.732C20.941 17.874 20.386 17.947 19.81 17.979C19.932 17.634 20 17.259 20 16.857C20 15.322 19.041 14.018 17.968 13.113C18.3069 13.0381 18.6529 13.0002 19 13ZM5 13C5.358 13.0013 5.702 13.039 6.032 13.113C4.96 14.018 4 15.322 4 16.857C4 17.259 4.068 17.634 4.19 17.979C3.614 17.947 3.06 17.874 2.589 17.732C2.244 17.628 1.866 17.463 1.559 17.182C1.38303 17.0244 1.24228 16.8314 1.14596 16.6156C1.04964 16.3999 0.999902 16.1663 1 15.93C1 15.025 1.666 14.281 2.307 13.834C3.09986 13.2905 4.03871 12.9997 5 13ZM18.5 7C19.163 7 19.7989 7.26339 20.2678 7.73223C20.7366 8.20107 21 8.83696 21 9.5C21 10.163 20.7366 10.7989 20.2678 11.2678C19.7989 11.7366 19.163 12 18.5 12C17.837 12 17.2011 11.7366 16.7322 11.2678C16.2634 10.7989 16 10.163 16 9.5C16 8.83696 16.2634 8.20107 16.7322 7.73223C17.2011 7.26339 17.837 7 18.5 7ZM5.5 7C6.16304 7 6.79893 7.26339 7.26777 7.73223C7.73661 8.20107 8 8.83696 8 9.5C8 10.163 7.73661 10.7989 7.26777 11.2678C6.79893 11.7366 6.16304 12 5.5 12C4.83696 12 4.20107 11.7366 3.73223 11.2678C3.26339 10.7989 3 10.163 3 9.5C3 8.83696 3.26339 8.20107 3.73223 7.73223C4.20107 7.26339 4.83696 7 5.5 7ZM12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7C16 8.06087 15.5786 9.07828 14.8284 9.82843C14.0783 10.5786 13.0609 11 12 11C10.9391 11 9.92172 10.5786 9.17157 9.82843C8.42143 9.07828 8 8.06087 8 7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3Z" fill="white"/>
          </svg>
          <i class="fas fa-caret-down"></i> ORGANIZACIÓN
        </a>
        <div class="sub-menu" :class="{'active': network}">
          <router-link to="/tree" @click.native="close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon">
              <path d="M3 22V21.425C3 21.025 3.10833 20.6583 3.325 20.325C3.54167 19.9917 3.84167 19.7417 4.225 19.575C4.65833 19.3917 5.10433 19.25 5.563 19.15C6.02167 19.05 6.50067 19 7 19C7.49933 19 7.97867 19.05 8.438 19.15C8.89733 19.25 9.343 19.3917 9.775 19.575C10.1583 19.7417 10.4583 19.9917 10.675 20.325C10.8917 20.6583 11 21.025 11 21.425V22H3ZM13 22V21.425C13 21.025 13.1083 20.6583 13.325 20.325C13.5417 19.9917 13.8417 19.7417 14.225 19.575C14.6583 19.3917 15.1043 19.25 15.563 19.15C16.0217 19.05 16.5007 19 17 19C17.4993 19 17.9787 19.05 18.438 19.15C18.8973 19.25 19.343 19.3917 19.775 19.575C20.1583 19.7417 20.4583 19.9917 20.675 20.325C20.8917 20.6583 21 21.025 21 21.425V22H13ZM7 18C6.45 18 5.97933 17.8043 5.588 17.413C5.19667 17.0217 5.00067 16.5507 5 16C4.99933 15.4493 5.19533 14.9787 5.588 14.588C5.98067 14.1973 6.45133 14.0013 7 14C7.54867 13.9987 8.01967 14.1947 8.413 14.588C8.80633 14.9813 9.002 15.452 9 16C8.998 16.548 8.80233 17.019 8.413 17.413C8.02367 17.807 7.55267 18.0027 7 18ZM17 18C16.45 18 15.9793 17.8043 15.588 17.413C15.1967 17.0217 15.0007 16.5507 15 16C14.9993 15.4493 15.1953 14.9787 15.588 14.588C15.9807 14.1973 16.4513 14.0013 17 14C17.5487 13.9987 18.0197 14.1947 18.413 14.588C18.8063 14.9813 19.002 15.452 19 16C18.998 16.548 18.8023 17.019 18.413 17.413C18.0237 17.807 17.5527 18.0027 17 18ZM12 16L9 13L10.05 11.95L11.25 13.125V11H12.75V13.125L13.95 11.95L15 13L12 16ZM2 10V9.42501C2 9.02501 2.10833 8.65834 2.325 8.32501C2.54167 7.99167 2.84167 7.74167 3.225 7.57501C3.65833 7.39167 4.10433 7.25001 4.563 7.15001C5.02167 7.05001 5.50067 7.00001 6 7.00001C6.33333 7.00001 6.66267 7.02501 6.988 7.07501C7.31333 7.12501 7.62567 7.19167 7.925 7.27501C7.64167 7.55834 7.41667 7.88334 7.25 8.25001C7.08333 8.61667 7 9.00834 7 9.42501V10H2ZM8 10V9.42501C8 9.02501 8.10833 8.65834 8.325 8.32501C8.54167 7.99167 8.84167 7.74167 9.225 7.57501C9.65833 7.39167 10.1043 7.25001 10.563 7.15001C11.0217 7.05001 11.5007 7.00001 12 7.00001C12.4993 7.00001 12.9787 7.05001 13.438 7.15001C13.8973 7.25001 14.343 7.39167 14.775 7.57501C15.1583 7.74167 15.4583 7.99167 15.675 8.32501C15.8917 8.65834 16 9.02501 16 9.42501V10H8ZM17 10V9.42501C17 9.00834 16.9167 8.61667 16.75 8.25001C16.5833 7.88334 16.3583 7.55834 16.075 7.27501C16.375 7.19167 16.6877 7.12501 17.013 7.07501C17.3383 7.02501 17.6673 7.00001 18 7.00001C18.5 7.00001 18.9793 7.05001 19.438 7.15001C19.8967 7.25001 20.3423 7.39167 20.775 7.57501C21.1583 7.74167 21.4583 7.99167 21.675 8.32501C21.8917 8.65834 22 9.02501 22 9.42501V10H17ZM6 6.00001C5.45 6.00001 4.97933 5.80434 4.588 5.41301C4.19667 5.02167 4.00067 4.55067 4 4.00001C3.99933 3.44934 4.19533 2.97867 4.588 2.58801C4.98067 2.19734 5.45133 2.00134 6 2.00001C6.54867 1.99867 7.01967 2.19467 7.413 2.58801C7.80633 2.98134 8.002 3.45201 8 4.00001C7.998 4.54801 7.80233 5.01901 7.413 5.41301C7.02367 5.80701 6.55267 6.00267 6 6.00001ZM12 6.00001C11.45 6.00001 10.9793 5.80434 10.588 5.41301C10.1967 5.02167 10.0007 4.55067 10 4.00001C9.99933 3.44934 10.1953 2.97867 10.588 2.58801C10.9807 2.19734 11.4513 2.00134 12 2.00001C12.5487 1.99867 13.0197 2.19467 13.413 2.58801C13.8063 2.98134 14.002 3.45201 14 4.00001C13.998 4.54801 13.8023 5.01901 13.413 5.41301C13.0237 5.80701 12.5527 6.00267 12 6.00001ZM18 6.00001C17.45 6.00001 16.9793 5.80434 16.588 5.41301C16.1967 5.02167 16.0007 4.55067 16 4.00001C15.9993 3.44934 16.1953 2.97867 16.588 2.58801C16.9807 2.19734 17.4513 2.00134 18 2.00001C18.5487 1.99867 19.0197 2.19467 19.413 2.58801C19.8063 2.98134 20.002 3.45201 20 4.00001C19.998 4.54801 19.8023 5.01901 19.413 5.41301C19.0237 5.80701 18.5527 6.00267 18 6.00001Z" fill="white"/>
            </svg> RED
          </router-link>
          <router-link to="/directs" @click.native="close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon">
              <path d="M13.613 8.00191C13.613 7.82514 13.681 7.6556 13.802 7.5306C13.923 7.4056 14.0871 7.33537 14.2582 7.33537H21.3549C21.526 7.33537 21.6901 7.4056 21.811 7.5306C21.932 7.6556 22 7.82514 22 8.00191C22 8.17869 21.932 8.34823 21.811 8.47323C21.6901 8.59823 21.526 8.66845 21.3549 8.66845H14.2582C14.0871 8.66845 13.923 8.59823 13.802 8.47323C13.681 8.34823 13.613 8.17869 13.613 8.00191ZM21.3549 11.3346H14.2582C14.0871 11.3346 13.923 11.4048 13.802 11.5298C13.681 11.6548 13.613 11.8244 13.613 12.0011C13.613 12.1779 13.681 12.3475 13.802 12.4725C13.923 12.5975 14.0871 12.6677 14.2582 12.6677H21.3549C21.526 12.6677 21.6901 12.5975 21.811 12.4725C21.932 12.3475 22 12.1779 22 12.0011C22 11.8244 21.932 11.6548 21.811 11.5298C21.6901 11.4048 21.526 11.3346 21.3549 11.3346ZM21.3549 15.3338H16.1936C16.0225 15.3338 15.8584 15.4041 15.7375 15.5291C15.6165 15.6541 15.5485 15.8236 15.5485 16.0004C15.5485 16.1772 15.6165 16.3467 15.7375 16.4717C15.8584 16.5967 16.0225 16.6669 16.1936 16.6669H21.3549C21.526 16.6669 21.6901 16.5967 21.811 16.4717C21.932 16.3467 22 16.1772 22 16.0004C22 15.8236 21.932 15.6541 21.811 15.5291C21.6901 15.4041 21.526 15.3338 21.3549 15.3338ZM10.1687 13.1676C10.809 12.6581 11.2789 11.9543 11.5124 11.1549C11.746 10.3555 11.7315 9.5007 11.471 8.71027C11.2105 7.91983 10.7171 7.23346 10.06 6.74741C9.40281 6.26135 8.61488 6 7.80668 6C6.99849 6 6.21056 6.26135 5.5534 6.74741C4.89625 7.23346 4.40283 7.91983 4.14234 8.71027C3.88186 9.5007 3.86737 10.3555 4.10092 11.1549C4.33447 11.9543 4.80434 12.6581 5.44462 13.1676C3.78175 13.895 2.47129 15.3588 2.02049 17.1668C1.99586 17.2653 1.9934 17.3684 2.01329 17.468C2.03318 17.5677 2.07488 17.6613 2.13521 17.7418C2.19555 17.8222 2.2729 17.8873 2.36135 17.932C2.44979 17.9768 2.54699 18.0001 2.64548 18H12.9679C13.0664 18.0001 13.1636 17.9768 13.252 17.932C13.3405 17.8873 13.4178 17.8222 13.4782 17.7418C13.5385 17.6613 13.5802 17.5677 13.6001 17.468C13.62 17.3684 13.6175 17.2653 13.5929 17.1668C13.1421 15.358 11.8316 13.8941 10.1687 13.1676Z" fill="white"/>
            </svg> FRONTALES
          </router-link>
          <!-- <router-link to="/closeds" @click.native="close">
            <i class="fas fa-users"></i> CIERRES
          </router-link> -->
        </div>

        <a @click="actived(2)" v-if="tree && office_id == null">
        <!-- <a @click="actived(2)"> -->
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon">
            <path d="M12 12.5C11.0717 12.5 10.1815 12.8687 9.52513 13.5251C8.86875 14.1815 8.5 15.0717 8.5 16C8.5 16.9283 8.86875 17.8185 9.52513 18.4749C10.1815 19.1313 11.0717 19.5 12 19.5C12.9283 19.5 13.8185 19.1313 14.4749 18.4749C15.1313 17.8185 15.5 16.9283 15.5 16C15.5 15.0717 15.1313 14.1815 14.4749 13.5251C13.8185 12.8687 12.9283 12.5 12 12.5ZM10.5 16C10.5 15.6022 10.658 15.2206 10.9393 14.9393C11.2206 14.658 11.6022 14.5 12 14.5C12.3978 14.5 12.7794 14.658 13.0607 14.9393C13.342 15.2206 13.5 15.6022 13.5 16C13.5 16.3978 13.342 16.7794 13.0607 17.0607C12.7794 17.342 12.3978 17.5 12 17.5C11.6022 17.5 11.2206 17.342 10.9393 17.0607C10.658 16.7794 10.5 16.3978 10.5 16Z" fill="white"/>
            <path d="M17.526 5.11606L14.347 0.659058L2.658 9.99706L2.01 9.99006V10.0001H1.5V22.0001H22.5V10.0001H21.538L19.624 4.40106L17.526 5.11606ZM19.425 10.0001H9.397L16.866 7.45406L18.388 6.96706L19.425 10.0001ZM15.55 5.79006L7.84 8.41806L13.946 3.54006L15.55 5.79006ZM3.5 18.1691V13.8291C3.92218 13.6801 4.30565 13.4385 4.62231 13.122C4.93896 12.8055 5.18077 12.4222 5.33 12.0001H18.67C18.8191 12.4223 19.0609 12.8059 19.3775 13.1225C19.6942 13.4392 20.0777 13.681 20.5 13.8301V18.1701C20.0777 18.3192 19.6942 18.5609 19.3775 18.8776C19.0609 19.1942 18.8191 19.5778 18.67 20.0001H5.332C5.18218 19.5777 4.93996 19.1942 4.62302 18.8774C4.30607 18.5607 3.9224 18.3186 3.5 18.1691Z" fill="white"/>
          </svg>
          <i class="fas fa-caret-down"></i> COMISIONES
        </a>
        <div class="sub-menu" :class="{'active': commissions}">
          <!-- <router-link to="/bonuses" @click.native="close">
            <i class="fas fa-gem"></i> BONOS
          </router-link> -->
          <router-link to="/transfer" @click.native="close">
            <i class="fas fa-wallet"></i> MONEDERO
          </router-link>
          <router-link to="/transactions" @click.native="close">
            <i class="fas fa-dollar-sign"></i> MOVIMIENTOS
          </router-link>
          <router-link to="/collect" @click.native="close">
            <i class="fas fa-hand-holding-usd"></i> RETIROS
          </router-link>
        </div>

        <a @click="actived(3)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon">
            <g clip-path="url(#clip0_99_322)">
              <path d="M20 12C20 12.5523 20.4477 13 21 13C21.5523 13 22 12.5523 22 12H21H20ZM12 22C12.5523 22 13 21.5523 13 21C13 20.4477 12.5523 20 12 20V21V22ZM19.1247 17.2191C18.6934 16.8741 18.0641 16.944 17.7191 17.3753C17.3741 17.8066 17.444 18.4359 17.8753 18.7809L18.5 18L19.1247 17.2191ZM20.3753 20.7809C20.8066 21.1259 21.4359 21.056 21.7809 20.6247C22.1259 20.1934 22.056 19.5641 21.6247 19.2191L21 20L20.3753 20.7809ZM7 7C6.44772 7 6 7.44772 6 8C6 8.55228 6.44772 9 7 9V8V7ZM17 9C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7V8V9ZM7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13V12V11ZM11 13C11.5523 13 12 12.5523 12 12C12 11.4477 11.5523 11 11 11V12V13ZM21 12H22V4.5H21H20V12H21ZM21 4.5H22C22 3.83696 21.7366 3.20107 21.2678 2.73223L20.5607 3.43934L19.8536 4.14645C19.9473 4.24022 20 4.36739 20 4.5H21ZM20.5607 3.43934L21.2678 2.73223C20.7989 2.26339 20.163 2 19.5 2V3V4C19.6326 4 19.7598 4.05268 19.8536 4.14645L20.5607 3.43934ZM19.5 3V2H4.5V3V4H19.5V3ZM4.5 3V2C3.83696 2 3.20107 2.26339 2.73223 2.73223L3.43934 3.43934L4.14645 4.14645C4.24021 4.05268 4.36739 4 4.5 4V3ZM3.43934 3.43934L2.73223 2.73223C2.26339 3.20107 2 3.83696 2 4.5H3H4C4 4.36739 4.05268 4.24021 4.14645 4.14645L3.43934 3.43934ZM3 4.5H2V19.5H3H4V4.5H3ZM3 19.5H2C2 20.163 2.26339 20.7989 2.73223 21.2678L3.43934 20.5607L4.14645 19.8536C4.05268 19.7598 4 19.6326 4 19.5H3ZM3.43934 20.5607L2.73223 21.2678C3.20107 21.7366 3.83696 22 4.5 22V21V20C4.36739 20 4.24022 19.9473 4.14645 19.8536L3.43934 20.5607ZM4.5 21V22H12V21V20H4.5V21ZM19 16H18C18 17.1046 17.1046 18 16 18V19V20C18.2091 20 20 18.2091 20 16H19ZM16 19V18C14.8954 18 14 17.1046 14 16H13H12C12 18.2091 13.7909 20 16 20V19ZM13 16H14C14 14.8954 14.8954 14 16 14V13V12C13.7909 12 12 13.7909 12 16H13ZM16 13V14C17.1046 14 18 14.8954 18 16H19H20C20 13.7909 18.2091 12 16 12V13ZM18.5 18L17.8753 18.7809L20.3753 20.7809L21 20L21.6247 19.2191L19.1247 17.2191L18.5 18ZM7 8V9H17V8V7H7V8ZM7 12V13H11V12V11H7V12Z" fill="white"/>
            </g>
            <defs>
              <clipPath id="clip0_99_322">
                <rect width="24" height="24" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <i class="fas fa-caret-down"></i> RESUMEN
        </a>
        <div class="sub-menu" :class="{'active': resume}">
          <router-link to="/bonuses" @click.native="close" v-if="affiliated">
            <i class="fas fa-shopping-bag"></i> BONIFICACIONES
          </router-link>
          <router-link to="/resume" @click.native="close">
            <i class="fas fa-users"></i> PERSONAL
          </router-link>
          <router-link to="/closeds" @click.native="close">
            <i class="fas fa-users"></i> CIERRES
          </router-link>
        </div>

        <router-link to="/tools" @click.native="close" v-if="office_id == null">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-icon">
            <path d="M23.835 8.50001L12 0.807007L0.165039 8.50001L12 16.192L20 10.992V16H22V9.69301L23.835 8.50001Z" fill="white"/>
            <path d="M5 17.5V13.835L12 18.385L19 13.835V17.5C19 18.97 17.986 20.115 16.747 20.838C15.483 21.576 13.802 22 12 22C10.198 22 8.518 21.576 7.253 20.838C6.014 20.115 5 18.97 5 17.5Z" fill="white"/>
          </svg> EDUCACIÓN
        </router-link>

        <router-link to="/profile" @click.native="close" v-if="office_id == null">
          <i class="fas fa-user"></i> PERFIL
        </router-link>

        <br>
        <a @click="logout" class="logout-btn">
          <i class="fas fa-sign-out-alt"></i> CERRAR SESIÓN
        </a>

      </div>

      <div class="content">
        <header>
          <div style="display: flex; align-items: center;">
            <img class="logo" src="@/assets/img/logo/logo.svg" style="height: 64px;">
            <!-- <img class="logo-text" src="@/assets/img/logo/text.svg" style="margin-left: 12px;"> -->
          </div>
          <!-- <div class="social">
            <a class="fab fa-facebook-square" :href="fb" target="_blank" style="color: #4267B2;"></a>
            <a class="fab fa-instagram"       :href="is" target="_blank" style="color: #e95950;"></a>
            <a class="fab fa-tiktok"          :href="tk" target="_blank" style="color: #ff0050;"></a>
            <a class="fab fa-youtube"         :href="yt" target="_blank" style="color: #ff0050;"></a>
          </div> -->
        </header>
        <section>

          <slot/>

        </section>

      </div>

    </section>

    <footer>
      <router-link to="/dashboard">
        <i class="fa-solid fa-house"></i>
        Inicio
      </router-link>
      <router-link to="/activation" v-if="affiliated">
        <i class="fas fa-shopping-bag"></i>
        Compras
      </router-link>
      <router-link to="/affiliation" v-if="!affiliated">
        <i class="fas fa-shopping-bag"></i>
        Plan
      </router-link>
      <router-link to="/tree" v-if="tree">
        <i class="fas fa-project-diagram"></i>
        Red
      </router-link>
      <router-link to="/collect" v-if="tree">
        <i class="fas fa-hand-holding-usd"></i>
        Retiros
      </router-link>
    </footer>

    <a :href="wsp" target="_blank" class="wsp fab fa-whatsapp"></a>
  </div>
</template>

<script>
import api from '@/api'
import lib from '@/lib'

export default {
  props: {
    session: String,
    office_id: String,
  },
  data() {
    return {
      // photo: 'https://ik.imagekit.io/asu/Lehaim/avatar_bEyc3MFLf.png',
      newPhoto: null,
      photoState: 'default',
      photoFile: null,
    }
  },
  computed: {
    // user
    name      () { return this.$store.state.name       },
    lastName  () { return this.$store.state.lastName   },
    affiliated() { return this.$store.state.affiliated },
    activated () { return this.$store.state.activated  },
    _activated () { return this.$store.state._activated },
    plan      () { return this.$store.state.plan       },
    country   () { return this.$store.state.country    },
    photo     () { return this.$store.state.photo      },
    tree      () { return this.$store.state.tree       },

    // social
    fb() { return this.$store.state.fb },
    is() { return this.$store.state.is },
    tk() { return this.$store.state.tk },
    yt() { return this.$store.state.yt },

    // help
    wsp() {
      if(this.country == 'Perú')    return this.$store.state.wsp_pe
      if(this.country == 'Bolivia') return this.$store.state.wsp_bo
      if(this.country == 'Ecuador') return this.$store.state.wsp_ec
    },

    // menú
    open()        { return this.$store.state.open        },
    resume()      { return this.$store.state.resume      },
    buys()        { return this.$store.state.buys        },
    network()     { return this.$store.state.network     },
    commissions() { return this.$store.state.commissions },
  },
  methods: {
    opened() {
      this.$store.commit('SET_OPEN')
    },
    actived(i) {
      if(i == 0)this.$store.commit('SET_BUYS')
      if(i == 1)this.$store.commit('SET_NETWORK')
      if(i == 2)this.$store.commit('SET_COMMISSIONS')
      if(i == 3)this.$store.commit('SET_RESUME')
    },
    close() {
      this.$store.commit('SET_OPEN')
    },
    changePhoto(e) {
      this.photoFile = e.target.files[0]

      if(!this.photoFile) return

      const reader = new FileReader()

      reader.onload = (e) => {
        this.newPhoto = e.target.result
        this.photoState = 'changed'
      }

      reader.readAsDataURL(this.photoFile)
    },
    async changeNewPhoto() {
      const ret = await lib.upload(this.photoFile, this.photoFile.name, 'photos')

      this.$store.commit('SET_PHOTO', ret)

      this.photoState = 'default'

      await api.photo(this.session, { photo: this.photo })
    },
    cancelNewPhoto() {
      this.photoState = 'default'
    },
  },
};
</script>

<style scoped>
.logout-btn {
  background: #8A2BE2 !important;
  color: white !important;
  border-radius: 8px !important;
  margin: 8px 16px !important;
  padding: 12px 16px !important;
  font-weight: bold !important;
  text-align: center !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 8px rgba(138, 43, 226, 0.3) !important;
}

.logout-btn:hover {
  background: #7B1FA2 !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(138, 43, 226, 0.4) !important;
}

.logout-btn i {
  margin-right: 8px !important;
}

.menu-icon {
  width: 13.5px !important;
  height: 13.5px !important;
  margin-right: 4px !important;
  vertical-align: middle !important;
}

/* Mover las flechas hacia abajo al lado derecho */
.menu a {
  display: flex !important;
  align-items: center !important;
  position: relative !important;
}

.menu a i.fa-caret-down {
  position: absolute !important;
  right: 16px !important;
  margin: 0 !important;
}

.menu a svg.menu-icon {
  margin-right: 4px !important;
  flex-shrink: 0 !important;
}

.menu a span {
  flex: 1 !important;
  margin-left: 4px !important;
}
</style>
