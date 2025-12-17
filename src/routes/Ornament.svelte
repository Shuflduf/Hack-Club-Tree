<script lang="ts">
  let { position, placed, src }: {position: [number, number], placed: boolean, src: string} = $props();

</script>

<img {src} alt="ornament" style={`top: ${position[1]}px; left: ${position[0]}px`} />

<style>
  img {
    width: 50px;
    position: absolute;
  }
</style>

