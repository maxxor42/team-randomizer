<template>
  <div>
    <div>{{ name }}</div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class RndTeam extends Vue {
  @Prop() private name!: string;
}
</script>

<style scoped lang="scss">

</style>
