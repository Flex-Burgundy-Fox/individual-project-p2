<template>
<div id='page' class="container mt-0">
  <div class="text-center">
    <h1 class="m-0 p-0" style="font-size:150px">404</h1>
    <h1 class="mt-0">Page Not Found</h1>
    <a class="mt-0" href="" @click.prevent='$router.go(-1)'>back to previous page</a>
  </div>
</div>
  
</template>

<script>
export default {
  name : 'PageNotFound'
}
</script>

<style>

</style>
