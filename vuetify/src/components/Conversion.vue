<template>
  <v-container>
      <v-row style="margin-top: 50px;">
        <h2>Conversión</h2>
      </v-row>
      <v-form v-model="valid" @submit.prevent="convertir">
        
        <v-row style="margin-top: 40px;">
          <v-col md="3" lg="3"><v-text-field label="Valor UF" variant="outlined" type="number" required min="1"
              v-model="uf"
              :rule="ufRules"
              ></v-text-field></v-col>
          <v-col md="3" lg="3"><v-text-field label="Fecha de conversión" variant="outlined" type="date"  required
            :rules="fechaRules"
              v-model="fecha"></v-text-field></v-col>
  
              <v-col> <v-btn style="height: 55px;" type="submit" :disabled="disabled">Convertir</v-btn></v-col>
            </v-row>
            </v-form>

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
  name: 'Conversion',
  created(){
      this.conversiones();
  },

  data() {
    return {
      disabled:false,
      valid: false,
      fecha: '',
      uf: 0,
      data:[] as any,
      ufRules: [
        (value:number) => {
          if (value>1) return true
          

          return 'Valor de uf es requerida .'
        },
      ],
      fechaRules: [
        (value:Date) => {
          if (value) return true

          return 'Fecha es requerida .'
        },
      ]
    }
  },
  methods: {
    async convertir() {

      if (this.valid) {
        this.disabled = true;
        const response:any  = await $axios.post('conversion',{
            valor:this.uf, fecha:this.fecha
          });
          
          if (response.status == 200) {
            this.disabled = false;
            this.conversiones();
          }
        
      }

    }
    , async conversiones() {
        try {
          const response:any  = await $axios.get('mis-conversiones');
          if (response.status == 200) {
            this.data = response.data.data;
          }
          
          
        } catch (error) {
          
        }
    

    },

  },

 
})
</script>
