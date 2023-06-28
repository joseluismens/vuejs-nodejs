<template>

<v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card >
          
          <v-card-title align="center">Iniciar sesión</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin" v-model="valid">
          <v-text-field
            v-model="email"
            label="Correo electrónico"
            :rules="emailRules"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Contraseña"
            type="password"
            :rules="passwordRules"

            required
          ></v-text-field>

          <v-card-actions>
            <v-btn type="submit" color="primary">Iniciar sesión</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>






</template>

<script lang="ts">
import { defineComponent } from 'vue';
import $axios from '../helpers/interceptors';
import { Store } from 'vuex';
import { mapGetters,mapMutations  } from 'vuex';



// Component
export default defineComponent({
  name: 'login',
  data:()=>{
    return {
      inject: ['$store'], // Inyectar el store

      valid:false,
      password:'',
      email:'',
      emailRules: [
        (value:string) => {
          if (value) return true

          return 'E-mail is requerido.'
        },
        (value:string) => {
          if (/.+@.+\..+/.test(value)) return true

          return 'E-mail No es valido.'
        },
      ],
      passwordRules: [
        (value:string) => {
          if (value) return true

          return 'Contraseña es requerida .'
        },
      
      ],
    }
  },
  computed: {
   
      ...mapGetters(['logged','token'])

    
  },
  created(){
    if (this.logged) {
      this.$router.push({ path: `dashboard/conversion` });

    }
  console.log(this.token)
  },
  
  methods: {
    ...mapMutations(['login']),

    async handleLogin() {
        
      // Aquí puedes realizar la lógica de inicio de sesión con los valores de email y password
    
      if (this.valid) {
          const response:any  = await $axios.post('login',{
            email:this.email, password:this.password
          });


          if (response.status ==200) {

            console.log(response);
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('fullname',response.data.nombre_completo);
            localStorage.setItem('rol',JSON.stringify(response.data.roles));

            this.login({logged:true,token:response.data.token})
            this.$router.push({ path: `dashboard/conversion` });
    
          }else{
           
          }

          
      }
    },
   
  },


 
});
</script>




