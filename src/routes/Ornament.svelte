<script lang="ts">
  let { position, placed, src }: {position: [number, number], placed: boolean, src: string} = $props();

</script>

<img {src} alt="ornament" />

<style>

  img {
    width: 50px;
  }

</style>

