<template>
  <section class="page-container">
    <aside class="aside">
      <div class="logo">
        <div class="inner-circle"></div>
      </div>
      <nav class="menu">
        <ul
          class="menu-list"
          :style="{ '--itemsNumber': menus.length, '--activeIndex': activeMenu }"
        >
          <li
            v-for="(item, index) in menus"
            :key="item.name"
            class="menu-item"
            @click="handleNav(item, index)"
            :class="{ active: index === activeMenu }"
          >
            <IconFont
              :name="item.icon"
              :size="30"
              :color="index === activeMenu ? '#722ed1' : '#333'"
            ></IconFont>
          </li>
        </ul>
      </nav>
      <ul class="user">
        <li>
          <IconFont
            name="icon-yonghu"
            :size="30"
          ></IconFont>
        </li>
        <li>
          <IconFont
            name="icon-system"
            :size="30"
          />
        </li>
      </ul>
    </aside>
    <main class="page-main">
      <section class="page-content">
        <slot />
      </section>

      <!-- <footer class="page-footer">copyright &copy; 2021-2025</footer> -->
    </main>
  </section>
</template>
<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { IconFont } from '@/components'
  const router = useRouter()
  type MenuItem = {
    name: string
    path: string
    icon: string
    children?: MenuItem[]
  }
  const menus: MenuItem[] = [
    { name: 'Dashboard', path: '/', icon: `icon-dashboard` },
    { name: 'Category', path: '/category', icon: `icon-category` },
    { name: 'Product', path: '/product', icon: `icon-haitun` },
    { name: 'Website', path: '/website', icon: `icon-setting` },
    { name: 'Users', path: '/users', icon: `icon-user` }
  ]
  const activeMenu = ref<number>(0)

  const handleNav = (item: MenuItem, index: number) => {
    const { name, path, children } = item || {}
    if (!path) return
    activeMenu.value = index
    if (!children) {
      router.push(path)
    } else {
      //打开子菜单
    }
  }
</script>
<style lang="scss" scoped>
  .page-container {
    display: flex;
    height: 100vh;
    .aside {
      margin-inline-start: 20px;
      border-radius: 20px 0 0 20px;
      width: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      background-color: white;
      padding-block: 50px;
      .logo {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: conic-gradient(
          from 0deg,
          #ff0000,
          #ff8000,
          #ffff00,
          #80ff00,
          #00ff00,
          #00ff80,
          #00ffff,
          #0080ff,
          #0000ff,
          #8000ff,
          #ff00ff,
          #ff0080,
          #ff0000
        );
        // box-shadow:
        //   0 0 40px rgba(0, 0, 0, 0.4),
        //   0 0 20px rgba(255, 255, 255, 0.1) inset;
        padding: 5px;
        transition: transform 0.3s;
        animation: rotate 15s linear infinite;
        .inner-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: white;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 1.2rem;
          text-align: center;
          padding: 5px;
          // box-shadow: 0 0 20px rgba(0, 0, 0, 0.4) inset;
        }
      }
      .menu {
        width: 100%;
        display: flex;
        flex-direction: column;
        .menu-list {
          position: relative;
          &::before {
            content: '';
            position: absolute;
            width: 5px;
            height: calc(100% / var(--itemsNumber));
            top: calc(var(--activeIndex) * 100% / var(--itemsNumber));
            left: 0;
            background-color: $purple-color;
            transition: all 0.3s;
            z-index: 99;
            border-radius: 0 5px 5px 0;
          }
        }
        .menu-item {
          width: 100%;
          padding-block: 15px;
          position: relative;
          display: flex;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          &.active {
            color: $purple-color;
            // background-color: var(--x-page-background);
          }
        }
      }
    }
    .page-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 15px;
      .page-content {
        flex: 1;
        padding: 15px;
        overflow-y: scroll;
      }
      .page-footer {
        padding: 15px;
        background-color: white;
        text-align: center;
      }
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
