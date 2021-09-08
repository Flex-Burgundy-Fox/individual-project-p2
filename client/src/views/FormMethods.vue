<template>
<div class="border me-5">
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
            <li v-for='(method, index) in methods' :key='index'>
                <p class="text-capitalize">{{method.title}}</p>
                <div class='d-flex'>
                    <img :src="method.imageUrl" :alt="method.title" class="img-thumbnail rounded" style="width: 200px; height: 200px;">
                    <div class="ms-5 text-start">
                        <p>{{method.description}}</p>
                    </div>
                </div>
            </li>
        </ol>
    </div>
    <div class="text-end">
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
            }
        }
    },
    methods: {
        postMethod(){
            this.$store.dispatch('postMethod', {
                recipeId : this.$route.params.recipeId,
                data : this.method
            })
            .then(({data}) => {
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
                    console.log(data); // message toasted
                    this.$router.push('/userRecipe')
                }).catch((err) => {
                    console.log(err);
                });
        }
    },
    mounted(){
        this.method = {
            title : '',
            description : '',
            imageUrl : ''
        }
    }
    

}
</script>

<style>

</style>