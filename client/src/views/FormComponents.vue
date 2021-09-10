<template>
<div class="me-5">
    <div class="mb-5">
        <h3>Ingredients</h3>
        <div class="input-group mb-3">
            <span class="input-group-text">Ingredient Name & Quantity</span>
                <input v-model='ingredient.name' type="text" aria-label="First name" class="form-control">
                <input v-model='ingredient.quantity' type="text" aria-label="Last name" class="form-control">
            <button :disabled='ingredient.name.length && ingredient.quantity.length ? false : true' type="button" class="btn btn-primary btn-sm" @click='ingArr'>Add Ingredient</button>
        </div>
        <h5 class="ms-4 mt-4 text-muted" v-if='!ingredients.length'>No ingredients yet</h5>
        <ul class="list-group">
            <li class="list-group-item w-50 d-flex justify-content-between" v-for='(ingredient, index) in ingredients' :key='ingredient.name'>
                <div>
                    {{ingredient.name}}, {{ingredient.quantity}}
                </div>
                <div >
                    <i type='button' class="fs-4 bi bi-x-circle-fill align-self-center" @click.prevent='destroyIngredient(index)' style="color:red !important;"></i>
                </div>
            </li>
        </ul>
    </div>
        <hr class="mb-5">

    <div class="mb-5">
        <h3>Tools</h3>
        <div class="input-group mb-3">
            <span class="input-group-text">Tool Name & Quantity</span>
                <input v-model='tool.name' type="text" aria-label="First name" class="form-control">
                <input v-model='tool.quantity' type="text" aria-label="Last name" class="form-control">
            <button :disabled='tool.name.length && tool.quantity.length ? false : true' type="button" class="btn btn-primary btn-sm" @click='toolArr'>Add Tool</button>
        </div>
        <h5 class="ms-4 mt-4 text-muted" v-if='!tools.length'>No tools yet</h5>
        <ul class="list-group">
            <li class="list-group-item w-50 d-flex justify-content-between" v-for='(tool, index) in tools' :key='tool.name'>
                <div>
                    {{tool.name}}, {{tool.quantity}}
                </div>
                <div >
                    <i type='button' class="fs-4 bi bi-x-circle-fill align-self-center" @click.prevent='destroyTool(index)' style="color:red !important;"></i>
                </div>
            </li>
        </ul>
    </div>
    <hr class="mb-5">
    <div class="text-end">
        <button v-if='isEdit' class="btn btn-secondary me-3" @click='$router.push("/profile")'>Back to profile</button>
        <button v-if='isEdit' class="btn btn-success me-3" @click='$router.push("/recipe/"+ $route.params.recipeId)'>Look on page</button>
        <button v-if='isEdit' class="btn btn-primary" @click='editComponents'>Save</button>
        <button v-else class="btn btn-primary" @click='postComponents'>Next</button>
    </div>

</div>
  
</template>

<script>
export default {
    name : 'FormComponents',
    data(){
        return {
            ingredients : [],
            ingredient : {
                name : '',
                quantity : '',
            },
            tools: [],
            tool : {
                name : '',
                quantity : '',
            },
            componentId : '',
            isEdit : false
        }
    },
    methods: {
        ingArr(){
            this.ingredients.push(this.ingredient)
            this.ingredient = {
                name : '',
                quantity : '',
            }
        },
        toolArr(){
            this.tools.push(this.tool)
            this.tool = {
                name : '',
                quantity : '',
            }
        },
        destroyIngredient(indexArr){
            this.ingredients = this.ingredients.filter((el, index) => index !== indexArr)
        },
        destroyTool(indexArr){
            this.tools = this.tools.filter((el, index) => index !== indexArr)
        },
        postComponents(){
            this.$store.dispatch('addComponents', {
                recipeId : this.$route.params.recipeId,
                ingredients : this.ingredients,
                tools : this.tools,
            })
        },
        editComponents(){
            this.$store.dispatch('editComponents', {
                recipeId : this.$route.params.recipeId,
                ingredients : this.ingredients,
                tools : this.tools,
            })
        }
    },
    mounted(){
        if(this.$route.path.includes('editRecipe')){
            this.isEdit = true
            this.$store.dispatch('fetchRecipeDetail', {recipeId: this.$route.params.recipeId})
            .then(({data}) => {
                
                this.ingredients = JSON.parse(data.Component.ingredients)
                this.tools = JSON.parse(data.Component.tools)
                this.componentId = data.Component.id
                
            }).catch((err) => {
                console.log(err);
            });
        } 
        else return 'Add'
    }

}
</script>

<style>

</style>