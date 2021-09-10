<template>
<div class="me-5">
    <div class="mb-5">
        <h3>Methods</h3>
        <div class="input-group mb-3">
            <span class="input-group-text">Method Title & Image URL(optional)</span>
            <input v-model='method.title' type="text" aria-label="First name" class="form-control">
            <input v-model='method.imageUrl' type="text" aria-label="Last name" class="form-control">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Description</span>
            <textarea  v-model='method.description' class="form-control" aria-label="With textarea"></textarea>
        </div>
        <button type="button" class="btn btn-primary btn-sm d-block me-0 ms-auto" @click='postMethod'>Add Method</button>
        <h5 class="ms-4 mt-4 text-muted" v-if='!methods.length'>No methods yet</h5>
        <ol>
            <li class="mb-5" v-for='method in methods' :key='method.id'>
                <p class="text-capitalize">{{method.title}}</p>
                <div class='d-flex'>
                    <i type='button' class="fs-4 bi bi-x-circle-fill align-self-center me-3" @click.prevent='destroyMethod(method.id)' style="color:red !important;"></i>
                    <img :src="method.imageUrl" :alt="method.title" class="img-thumbnail rounded" style="width: 200px; height: 200px;">
                    <div class="ms-5 text-start">
                        <p>{{method.description}}</p>
                    </div>
                </div>
            </li>
        </ol>
    </div>
    <hr class="mb-5">
    <div class="text-end">
        <button v-if='isEdit' class="btn btn-secondary me-3" @click='$router.push("/profile")'>Back to profile</button>
        <button v-if='isEdit' class="btn btn-success me-3" @click='$router.push("/recipe/"+ $route.params.recipeId)'>Look on page</button>
        <button class="btn btn-primary" @click='publishRecipe'>Publish</button>
    </div>
</div>
  
</template>

<script>
export default {
    name : 'FormMethods',
    data(){
        return  {
            methods: [],
            method : {
                title : '',
                description : '',
                imageUrl : ''
            },
            recipeId : '',
            isEdit : false
        }
    },
    methods: {
        postMethod(){
            this.$store.dispatch('postMethod', {
                recipeId : this.$route.params.recipeId,
                data : this.method
            })
            .then(({data}) => {
                this.$toasted.success('Method Created', {
                    icon: 'check',
                    action: {
                        text: 'Close',
                        onClick: (e, toastObject) => {
                            toastObject.goAway(0);
                        }
                    },
                    duration: 3000
                })
                this.methods.push(this.method)
                this.method = {
                    title : '',
                    description : '',
                    imageUrl : ''
                }
                console.log(data);
                // router.push('/addRecipe/components/'+data.id)
                // context.commit('SET_USERDATA', data)
            }).catch((err) => {
                console.log(err);
            });
        },
        publishRecipe(){
            this.$store.dispatch("patchStatusRecipe",{
                recipeId : this.$route.params.recipeId,
                status : 'published'
            })
                .then(({data}) => {
                    console.log(data.message); // message toasted
                    this.$router.push('/profile')
                }).catch((err) => {
                    console.log(err);
                });
        },
        destroyMethod(methodId){
            this.$store.dispatch('destroyMethod', {
                methodId,
                recipeId : this.recipeId
            })
            .then(({data}) => {
                console.log(data.message); // toasted succ
                this.methods = this.methods.filter(el => el.id !== methodId)
            }).catch((err) => {
                console.log(err.response);
            });
        }
    },
    mounted(){
         if(this.$route.path.includes('editRecipe')){
            this.recipeId = this.$route.params.recipeId
            this.isEdit = true
            this.$store.dispatch('fetchRecipeDetail', {recipeId: this.$route.params.recipeId})
            .then(({data}) => {
                // console.log(data.Methods);
                this.methods = data.Methods
                
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