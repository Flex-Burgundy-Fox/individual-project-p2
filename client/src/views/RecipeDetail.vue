<template>
<div>
    <div id='page' class="container-sm bg-white border rounded-3">
        <h2 class="text-capitalize fw-bold mb-5">{{ recipe.name }}</h2>
        <div id='recipeProfile' class="d-flex">
            <div>
                <div class='text-start'>
                    <img :src="recipe.image_url" :alt="recipe.name" style="margin-bottom: 20px; width:380px;"/>
                    <!-- <p class="fw-bold" style="font-size:25px">Rp. {{ itemData.price.toLocaleString('id') }}</p> -->
                    <!-- <br> -->
                    <!-- <p>Stock: {{ itemData.stock }}</p> -->
                    <!-- <hr> -->
                    <!-- <button type="button" @click='addToCart' class="btn btn-warning">Add to Cart</button> -->
                </div>
            </div>
            <div id='recipeStatus' class="ms-5">
                <p>Rating : {{recipe.rating}}</p>
                <p>Time Required : {{recipe.timeReq}}</p>
                <p>Servings : {{recipe.servings}}</p>
            </div>
        </div>
        <div id='recipeAuthor' class="container mt-5">
            <div class="row">
                <div class="col border border-end-0 border-secondary border-2 p-4" >
                    <p>Introduction</p>
                    <p>{{recipe.summary || 'Source from  ' + recipe.source}}</p>
                </div>
                <div class="col border border-secondary border-2 p-4">
                    <p>Author : {{author.name}}</p>
                    <p>As {{author.status}}</p>
                    <p>Recipe Published : {{author.totalRecipes}}</p>
                </div>
            </div>
        </div>
        <div id='components' class='container mt-4'>
            <div class="row">
                <div class="col py-4" >
                    <h3 class="mb-4">Ingredients</h3>
                    <ul>
                        <li v-if='!recipe.ingredients.length' class="fst-italic fw-lighter"> No ingredients</li>
                        <li v-for='ingredient in recipe.ingredients' :key='ingredient.name'>{{ingredient.name}}, {{ingredient.quantity}}</li>
                    </ul>                
                </div>
                <div class="col py-4">
                    <h3 class="mb-4">Equipments</h3>
                    <ul>
                        <li v-if='!recipe.equipments.length' class="fst-italic fw-lighter"> No equipments</li>
                        <li v-else v-for='equipments in recipe.equipments' :key='equipments.name'>{{equipments.name}}</li>
                        <!-- TEMPLATE -->
                        <!-- <li>Coffee</li>
                        <li>Tea</li>
                        <li>Milk</li>
                        <li>Coffee</li>
                        <li>Tea</li>
                        <li>Milk</li> -->
                    </ul>       
                </div>
            </div>
        </div>
        <div v-if='mealDB' id='steps' class='container mt-3'>
            <h3 class="mb-4">Steps</h3>
            <p v-for='(method, index) in recipe.methods' :key='index'>{{index+1}}. {{method}}</p>
        </div>
        <div v-else id='steps' class='container mt-3'>
            <h3 class="mb-4">Steps</h3>
            <ol>
                <li v-for='method in recipe.methods' :key='method.index'>
                    <p class="text-capitalize fw-bold mb-3">{{method.title}}</p>
                    <div class='d-flex'>
                        <img :src="method.imageUrl" :alt="method.title" class="img-thumbnail rounded" style="width: 200px; height: 200px;">
                        <div class="ms-5 text-start">
                            <p>{{method.description}}</p>
                        </div>
                    </div>
                </li>
            </ol>
        </div>
    </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
    name : 'RecipeDetail',
    components : {Navbar},
    data (){
        return{
            recipe: {
                id: this.$route.params.id,
                name : '',
                image_url : '',
                rating: 'null',
                timeReq: 'null',
                servings: 'null',
                summary: '',
                source: '',
                ingredients : [],
                methods: [],
                equipments : []
            },
            author: {
                name : 'Admin',
                status : 'Admin',
                totalRecipes : null
            },
            mealDB : false
        }
    },
    methods: {
        fetchMealDB_recipe(){
            this.$store.dispatch('fetchMealDB_recipe',{ mealDB_id: this.$route.params.recipeId})
            .then((result) => {
                let recipe = result.data.meals[0]
                let {strMeal, strMealThumb, strSource } = recipe
                // console.log(strMeal, strMealThumb );
                // console.log(result.data.meals[0]);
                this.recipe.name = strMeal
                this.recipe.image_url = strMealThumb
                this.recipe.source = strSource

                //GET INGREDIENTS
                let arrIng = Object.keys(recipe).filter(el => el.includes('strIngredient'))
                let arrMeasure = Object.keys(recipe).filter(el => el.includes('strMeasure'))
                let ingredients =  []
                arrIng.forEach((el, index)=> {
                    let ingredient = {}
                    ingredient.name = recipe[el]
                    ingredient.quantity = recipe[arrMeasure[index]]
                    ingredients.push(ingredient)
                })
                this.recipe.ingredients = ingredients.filter(el => el.name)
                //GET INGREDIENTS

                //GET METHODS
                let methods = recipe.strInstructions.split('\r\n')
                this.recipe.methods = methods
                //GET METHODS

            }).catch((err) => {
                console.log(err)
            });
        },

        fetchRecipe(){
            this.$store.dispatch('fetchRecipe', {recipeId : this.$route.params.recipeId})
            .then(({data}) => {
                const {name, timeReq, servings, summary, imageUrl, status, category, price, Components, Methods, User} = data
                this.author = {
                    name : User.name,
                    status : User.status,
                    totalRecipes : User.Recipes.length
                }
                let ingredients = Components.filter(el => el.category === 'ingredients')
                let tools = Components.filter(el => el.category === 'tools')

                ingredients.length ? ingredients = JSON.parse(ingredients[0].lists) : ''
                tools.length ? tools = JSON.parse(tools[0].lists) : ''

                this.recipe = {
                    id: this.$route.params.id,
                    name : name,
                    image_url : imageUrl,
                    rating: 'null',
                    timeReq: timeReq,
                    servings: servings,
                    summary: summary,
                    source: '',
                    ingredients : ingredients,
                    equipments : tools,
                    methods: Methods
                }
            }).catch((err) => {
                console.log(err);
            });
        }

    },
    mounted(){
        if(this.$route.params.recipeId.length > 4) {
            this.fetchMealDB_recipe()
            this.mealDB = true
        }
        else {
            this.fetchRecipe()
            this.mealDB = false
        }
    },
    // computed: {
    //     methods (){
    //         return 
    //     }
    // }
}
</script>

<style>
#page{
    padding: 5% 8%; margin-top: 5%; margin-bottom: 5%; background-color: rgba(245, 245, 245); width:75%
}

</style>