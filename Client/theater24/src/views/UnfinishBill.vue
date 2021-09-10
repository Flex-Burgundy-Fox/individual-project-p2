<template>
   <div class="container text-center mt-5">
      <div class="row">
         <div class="col">
            <div class="card d-flex justify-content-center">
               <div
                  style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;"
               >
                  <i class="uncheckmark">!</i>
               </div>
               <h3>
                  Maaf Transaksi Anda Belum Selesai,
                  <br />
                  Silahkan Selesaikan Pembayaran Terlebih Dahulu
               </h3>
               <router-link to="/" type="button" class="btn btn-primary">
                  Oke
               </router-link>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: "UnfinishBill"
}
</script>

<style scoped>
body {
   text-align: center;
   padding: 40px 0;
   background: #ebf0f5;
}
h1 {
   color: #ffc107;
   font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
   font-weight: 900;
   font-size: 40px;
   margin-bottom: 10px;
}
p {
   color: #404f5e;
   font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
   font-size: 20px;
   margin: 0;
}
i {
   color: #ffc107;
   font-size: 100px;
   line-height: 200px;
   margin-left: -15px;
}
.card {
   background: white;
   padding: 60px;
   border-radius: 4px;
   box-shadow: 0 2px 3px #c8d0d8;
   display: inline-block;
   margin: 0 auto;
}
</style>
