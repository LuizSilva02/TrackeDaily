<template>

    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempoEmSegundos="tempoEmSegundos"/>
        <button class="button" @click="inciar" :disabled="cronometroRodando">
    <span class="icon">
        <i class="fas fa-play"></i>
    </span>
    <span>play</span>
    </button>
    <button class="button" @click="finalizar" :disabled="!cronometroRodando">
    <span class="icon">
        <i class="fas fa-stop"></i>
    </span>
    <span>stop</span>
    </button>
   <!--  <button class="button" @click="Limpar">
    <span class="icon">
    </span>
    <span>Limpar</span>
    </button> -->
    </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from './Cronometro.vue';

export default defineComponent({
    name: 'Temporizador-nome',
    emits: ['aoTemporizadorFinalizado'],
    components:{
        Cronometro
    },
    data () {
        return {
            tempoEmSegundos : 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    computed:{
        tempoDecorrido () : string {
            return new Date(this.tempoEmSegundos * 1000).toISOString().substring(9,9)
        }
    },
    methods:{
        //iniciar a contagem
        inciar(){
            this.cronometroRodando = true
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1
            }, 1000)
        },
        finalizar(){
            this.cronometroRodando = false
            clearInterval(this.cronometro)
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
            this.tempoEmSegundos = 0
        }
       /*  Limpar(){
            this.cronometroRodando = true
            clearInterval(this.cronometro)
            this.tempoDecorrido = '00:00:00'
            this.tempoEmSegundos = 0

        }, */
    }
})
</script>