<template>
<div id='page' class='container-sm d-flex justify-content-center bg-white border rounded-3' style="min-height: 70vh">
    <div class="text-center" style="margin-top: 100px">
        <h3 class="mb-4">404 Recipe Not Found</h3>
        <a class='fs-5' href="" @click.prevent="$router.push('/')">Back to Home</a>
    </div>
</div>
  
</template>

<script>
export default {
    name : 'NotFound'

}
</script>

<style>

</style>