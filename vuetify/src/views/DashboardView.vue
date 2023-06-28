<template>
  <v-card>
    <v-layout>
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

      <v-app-bar
        color="indigo"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Conversiones</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn variant="text" icon="mdi-logout" color="red"></v-btn>

    
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        location="left"
        temporary
      >
      <v-list :items="items">
          <v-list-item v-for="item in items" :key="item.value" @click="redirectTo(item.value)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height:100vh;">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
      items: [
        {
          title: 'Conversion',
          value: 'dashboard/conversion',
        },
      
      
      ],
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
    methods: {
      redirectTo(route) {
      this.$router.push({ path: `/${route}` });
    },
    },

    mounted() {
      const rol = localStorage.getItem('rol');
      if(rol == 'admin'){
        this.items.push(  {
          title: 'historial',
          value: 'dashboard/historial',
        })
      }
      console.log(rol);
    },
  }
</script>