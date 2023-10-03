<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjet" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjet"
          id="nomeDoProjet"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">
            salvar
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import {  defineComponent } from "vue";
import { useStore } from "../../store/index";
import { ADICIONA_PROJETO, ALTERA_PROJETO, NOTIFICAR } from "@/store/tipo-mutacoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import  useNotificador  from "@/hooks/notificador";

export default defineComponent({
  name: "Formulario-name",
  props: {
    id:{
      type: String
    }
  },
  data(){
    return{
        nomeDoProjet: ''
  
    };
  },
  mounted(){
    if (this.id) {
      const projeto = this.store.state.projetos.find(projeto => projeto.id == this.id)
      this.nomeDoProjet = projeto?.nome || ''
    }
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store.commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjet
        });
      }else {
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjet);
      }
      this.nomeDoProjet="";
      this.notificar(TipoNotificacao.SUCESSO, 'Excelente', 'O projeto foi cadastrado com sucesso')
      this.$router.push('/projetos')
    },
   
  },
  setup(){
    const store = useStore();
    const {notificar} = useNotificador()
    return {
      store,
      notificar
    }
  }
});
</script>



