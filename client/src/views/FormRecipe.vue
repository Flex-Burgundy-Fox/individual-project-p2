<template>
<div class="container-sm py-5" id='formPage'>
    <h1 class="mb-5">{{formType}} Recipe</h1>
    <div id='children' class='ms-5'>
        <router-link class='me-3' to="/addRecipe">Introductions</router-link> |
        <router-link class='mx-3' to="/addRecipe/components">Ingredients / Tools</router-link> |
        <router-link class='mx-3' to="/addRecipe/methods">Methods</router-link>
        <hr>
        <router-view class="py-4"></router-view>
    </div>
</div>
</template>

<script>
export default {
    name : 'FormRecipe',
    computed: {
        formType(){
            if(this.$route.path.includes('editRecipe')) return 'Edit'
            else return 'Add'
        }
    },
    mounted(){
        console.log(this.$route.path);
    }
}
</script>

<style>
#formPage{
    padding: 5% 5%; 
    background-color: rgba(245, 245, 245); 
    width:75%
}

</style>