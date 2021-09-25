<template>
  <div class="about">
    <h1>This is an about page with : {{ text }}</h1>
  </div>
</template>

<script>
export default {
  // Error: options order
  data() {
    return { text: "Some text" };
  },
  name: "about", // Error: should be PascalCased
};
</script>
