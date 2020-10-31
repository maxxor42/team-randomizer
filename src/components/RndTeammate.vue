<template>
  <div>{{ name }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class RndTeammate extends Vue {
  @Prop() private name!: string;
  @Prop() private locked!: boolean;
}
</script>

<style scoped lang="scss">

</style>
