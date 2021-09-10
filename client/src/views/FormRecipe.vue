<template>
<div class="container-sm py-5" id='formPage'>
    <h1 class="mb-5">{{formType}} Recipe</h1>
    <div id='children' class='ms-5'>
        <h5 v-if="formType == 'Add' && $route.path == '/addRecipe'" class='me-3'>Introductions</h5> 
        <h5 v-if="formType == 'Add' && $route.path.includes('components')" class='mx-3'>Ingredients / Tools</h5> 
        <h5 v-if="formType == 'Add' && $route.path.includes('methods')" class='mx-3'>Methods</h5>
        
        <router-link v-if="formType == 'Edit'" class='me-3' :to="{ name: 'FormEditRecipe', params: { recipeId: $route.params.recipeId }}" >Introductions</router-link> 
        <router-link v-if="formType == 'Edit'" class='mx-3' :to="{ name: 'FormEditComponents', params: { recipeId: $route.params.recipeId }}">Ingredients / Tools</router-link>
        <router-link v-if="formType == 'Edit'" class='mx-3' :to="{ name: 'FormEditMethods', params: { recipeId: $route.params.recipeId }}">Methods</router-link>
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
        // console.log(this.$route.path);
    }
}
</script>

<style scoped>
#formPage{
    padding: 5% 5%; 
    background-color: rgba(245, 245, 245); 
    width:75%
}

#children h5 {
  font-weight: bold;
    color: #8a3d4f;
}

</style>