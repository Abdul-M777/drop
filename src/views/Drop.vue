<template>
	<div id="drop">
    <span rows="10"  v-html="text"></span>
    <br>
		<text-reader @load="text = $event"></text-reader>
	</div>
</template>

<script>
import TextReader from "../components/TextReader.vue";

export default {
  name: "drop",
  data: () => ({ text: "" }),
  components: {
    TextReader
  }
};
</script>