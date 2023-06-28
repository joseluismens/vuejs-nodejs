<template>
  <v-container>

   <v-row style="margin-top: 40px;">
    <h2>Historial de conversiones</h2>
   </v-row>
    <v-row v-if="data.length  >0">
      <v-table fixed-header >
    <thead>
      <tr>
        <th class="text-left">UF</th>
        <th class="text-left">
          Fecha de Conversión
        </th>   
        <th class="text-left">
          Fecha de Solicitud
        </th>
        <th class="text-left">
          Valor UF
        </th>   
        <th class="text-left">
          Valor en CLP 
        </th>
        
        <th>Id Usuario</th>
        
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in data"  
        :key="item.id"
      >
      <td>{{ item.original_amount }}</td>
      <td>{{ item.date_conversion }}</td>
      <td>{{ item.created_at }}</td>
      <td>{{ item.uf }}</td>
      <td>{{ item.conversion_amount }}</td>
      <td>{{ item.usuario.fullname }}</td>


      </tr>
    </tbody>
  </v-table>  



    </v-row>
  </v-container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import $axios from '../helpers/interceptors';


export default defineComponent({
  name: 'Historial',
  created(){
      this.conversiones();
  },

  data() {
    return {
      data:[] as any,
   
    }
  },
  methods: {
    async conversiones() {
        try{
          const response:any  = await $axios.get('historial');
          if (response.status == 200) {
            this.data = response.data.data;
          }

        }catch(error){
          console.log(error);
          
        }
        
    

    },

  },

 
})
</script>
