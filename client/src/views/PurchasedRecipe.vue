<template>
<div class="container-sm mt-5">
    <div v-if='!purchasedRecipes.length' class="fst-italic text-muted">
        <h4>Your haven't purchase any recipe yet, feel free to purchase one :) </h4>
    </div>
    <div id='recipeCard_long' v-for='transaction in purchasedRecipes' :key="transaction.id" class="d-flex justify-content-between p-0" >
        <div class="d-flex">
            <img @click='$router.push("/recipe/" + transaction.Recipe.id)' type='button' class='rounded float-start' :src="transaction.Recipe.imageUrl" alt="No Picture" style="width:125px;">
            <div class="d-flex flex-column align-self-center mx-4">
                <h4 type='button' @click='$router.push("/recipe/" + transaction.Recipe.id)' class="text-capitalize mb-2">{{transaction.Recipe.name}} 
                    <span v-if='transaction.status == "pending"' class="badge rounded-pill bg-warning" style="font-size: 12px">Pending</span>
                    <span v-if='transaction.status == "settlement"' class="badge rounded-pill bg-success" style="font-size: 12px">Settled</span>
                </h4>
                <span class="text-muted text-capitalize mb-2">Rp. {{transaction.Recipe.price.toLocaleString('id')}} </span>
                <span class="text-muted text-capitalize">{{transaction.order_id}} </span>
            </div>
        </div>
        <div class='d-flex flex-column justify-content-center' style="width: 150px">
            <button class="btn btn-success w-100 h-100" @click='$router.push("/recipe/" + transaction.Recipe.id)' >Check Recipe <i class="bi bi-box-arrow-up-left"></i></button>
            <!-- <button v-if='recipe.status !== "published"' class="btn btn-primary w-100 h-100" @click='publishRecipe(recipe.id)' >Publish <i class="bi bi-box-arrow-up"></i></button> -->
            <!-- <button v-else class="btn btn-secondary w-100 h-100" @click='archieveRecipe(recipe.id)' >Archieve <i class="bi bi-archive"></i></button> -->
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
    name : 'PurchasedRecipe',
    computed: {
        purchasedRecipes (){
            return this.$store.state.userRecipes.purchasedRecipes
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
                    this.$store.dispatch('fetchUserRecipe')
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
                    this.$store.dispatch('fetchUserRecipe')
                    this.$store.dispatch('seedGourmetTavern')
                    // this.$router.push('/userRecipe')
                }).catch((err) => {
                    console.log(err);
                });
        }
    },
    created(){
        this.$store.dispatch('fetchPurchasedRecipe')
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