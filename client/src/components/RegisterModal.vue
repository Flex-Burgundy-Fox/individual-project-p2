<template>
<div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title mx-auto" id="staticBackdropLabel">Register to Gourmet Tavern</h4>
          </div>
          <div class="modal-body">

            <div class="mb-3">
              <label for="name" class="form-label">Name (optional)</label>
              <input v-model='user.name' type="string" class="form-control" placeholder="We will use your email as name instead">
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input v-model='user.email' type="string" class="form-control">
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input v-model='user.password' type="password" class="form-control">
            </div>
            
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <button type="button" class="btn btn-primary" @click="$store.dispatch('register',user)" data-bs-dismiss="modal">Submit</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name : 'RegisterModal',
    data(){
        return{
            user: {
              email : '',
              password: '',
              name: ''
            }
        }
    },
}
</script>

<style>

</style>