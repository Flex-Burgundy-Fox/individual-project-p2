<template>
<div class="container-sm mt-5">
    <div id='recipeCard_long' v-for='recipe in originalRecipes' :key="recipe.id" class="d-flex justify-content-between p-0" >
        <div class="d-flex">
            <img @click='$router.push("/recipe/" + recipe.id)' type='button' class='rounded float-start' :src="recipe.imageUrl" alt="No Picture" style="width:125px;">
            <div @click='$router.push("/recipe/" + recipe.id)' type='button' class="pt-4 mx-4">
                <h4 class="text-capitalize">{{recipe.name}}</h4>
            </div>
        </div>
        <div class='d-flex flex-column justify-content-center' style="width: 200px">
            <button class="btn btn-warning w-100 h-100" @click='$router.push("/editRecipe/" + recipe.id)' >Edit <i class="bi bi-pencil-square"></i></button>
            <button v-if='recipe.status !== "published"' class="btn btn-primary w-100 h-100" @click='publishRecipe(recipe.id)' >Publish <i class="bi bi-box-arrow-up"></i></button>
            <button v-else class="btn btn-secondary w-100 h-100" @click='archieveRecipe(recipe.id)' >Archieve <i class="bi bi-archive"></i></button>
        </div>
        <!-- <div class="d-flex">
            <img class='rounded float-start' src="https://www.resepistimewa.com/wp-content/uploads/ayam-goreng-kalasan-khas-yogya.jpg" alt="No Picture" style="width:125px;">
            <div class="pt-3 mx-3">
                <h4>{{recipe.title}}</h4>
            </div>
        </div>
        <div class='d-flex flex-column justify-content-center' style="width: 200px">
            <button class="btn btn-warning w-100 h-100">Edit</button>
            <button class="btn btn-primary w-100 h-100">Publish</button>
        </div> -->
    </div>
</div> 
</template>

<script>
export default {
    name : 'YourRecipe',
    computed: {
        originalRecipes (){
            return this.$store.state.userRecipes.originalRecipes
        }
    },
    methods: {
        publishRecipe(recipeId){
            this.$store.dispatch("patchStatusRecipe",{
                recipeId,
                status : 'published'
            })
                .then(({data}) => {
                    console.log(data); // message toasted
                    this.$store.dispatch('fetchOriginalRecipe')
                    this.$store.dispatch('seedGourmetTavern')
                    // this.$router.push('/userRecipe')
                }).catch((err) => {
                    console.log(err);
                });
        },
        archieveRecipe(recipeId){
            this.$store.dispatch("patchStatusRecipe",{
                recipeId,
                status : ''
            })
                .then(({data}) => {
                    console.log(data); // message toasted
                    this.$store.dispatch('fetchOriginalRecipe')
                    this.$store.dispatch('seedGourmetTavern')
                    // this.$router.push('/userRecipe')
                }).catch((err) => {
                    console.log(err);
                });
        }
    }
}
</script>

<style>
#recipeCard_long{
    height: 125px; 
    border: 3px solid #B2B2B2;
    border-radius: 10px;
}

</style>