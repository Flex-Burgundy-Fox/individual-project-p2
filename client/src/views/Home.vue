<template>
    <div class="container-fluid gedf-wrapper">
        <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body">
                        <img
                            class="rounded-circle"
                            width="100"
                            :src="this.UserAvatar"
                            alt=""
                        />
                        <div class="h5">@Anon{{this.UserId}}</div>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Bio: Vestibulum at eros</li>
                    </ul>
                </div>
            </div>
            <div class="col-md-6 gedf-main">
                <!--- \\\\\\\Post-->
                <div class="card gedf-card">
                    <div class="card-header">
                        <ul
                            class="nav nav-tabs card-header-tabs"
                            id="myTab"
                            role="tablist"
                        >
                            <li class="nav-item">
                                <p
                                    class="nav-link active"
                                    id="posts-tab"
                                    data-toggle="tab"
                                    href="#posts"
                                    role="tab"
                                    aria-controls="posts"
                                    aria-selected="true"
                                >
                                    Blablas at something
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="myTabContent">
                            <div
                                class="tab-pane fade show active"
                                id="posts"
                                role="tabpanel"
                                aria-labelledby="posts-tab"
                            >
                                <div class="form-group">
                                    <form @submit.prevent="addBlablas()">
                                        <textarea
                                            class="form-control"
                                            v-model="contents"
                                            id="message"
                                            rows="3"
                                            placeholder="What are you thinking?"
                                        ></textarea>
                                        <button
                                            type="submit"
                                            class="btn btn-primary"
                                        >
                                            share
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div
                                class="tab-pane fade"
                                id="images"
                                role="tabpanel"
                                aria-labelledby="images-tab"
                            >
                                <div class="py-4"></div>
                            </div>
                        </div>
                        <div class="btn-toolbar justify-content-between">
                            <div class="btn-group"></div>
                            <div class="btn-group">
                                <div
                                    class="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="btnGroupDrop1"
                                >
                                    <a class="dropdown-item" href="#"
                                        ><i class="fa fa-globe"></i> Public</a
                                    >
                                    <a class="dropdown-item" href="#"
                                        ><i class="fa fa-users"></i> Friends</a
                                    >
                                    <a class="dropdown-item" href="#"
                                        ><i class="fa fa-user"></i> Just me</a
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Post /////-->

                <!--- \\\\\\\Post-->
                <div v-for="blabla in blablas"
                :key="blabla.id" class="card gedf-card">
                    <div class="card-header">
                        <div
                            class="d-flex justify-content-between align-items-center"
                        >
                            <div
                                class="d-flex justify-content-between align-items-center"
                            >
                                <div class="ml-2">
                                    <div class="h5 m-0">@Anon{{blabla.UserId}}</div>
                                </div>
                            </div>
                            <div>
                                <div class="dropdown">
                                    <button
                                        class="btn btn-link dropdown-toggle"
                                        type="button"
                                        id="gedf-drop1"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i class="fa fa-ellipsis-h"></i>
                                    </button>
                                    <div
                                        class="dropdown-menu dropdown-menu-right"
                                        aria-labelledby="gedf-drop1"
                                    >
                                        <div class="h6 dropdown-header">
                                            Configuration
                                        </div>
                                        <a class="dropdown-item" href="#"
                                            >Save</a
                                        >
                                        <a class="dropdown-item" href="#"
                                            >Hide</a
                                        >
                                        <a class="dropdown-item" href="#"
                                            >Report</a
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="text-muted h7 mb-2">
                            <i class="fa fa-clock-o"></i>{{blabla.createdAt.toLocaleString()}}
                        </div>
                        <p class="card-text">
                            {{blabla.contents}}
                        </p>
                    </div>
                    <div class="card-footer">
                        <a href="#" @click.prevent="mention(blabla.UserId)" class="card-link"
                            ><i class="fa fa-at"></i> Mention</a
                        >
                        <a href="#" class="card-link" @click.prevent="deleteBlablas(blabla.id)"
                            ><i class="fa fa-times-circle"></i> Delete</a
                        >
                    </div>
                </div>
                <!-- Post /////-->
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
    name: 'Home',
    data() {
        return {
            contents: '',
            UserAvatar: localStorage.getItem('user_avatar'),
            UserId: localStorage.getItem('user_id')
        }
    },
    methods: {
        addBlablas() {
            // console.log(this.contents)
            axios({
                method: 'POST',
                url: 'http://localhost:3000/blablas',
                headers: {
                    access_token : localStorage.getItem('access_token')
                },
                data: {
                    contents: this.contents
                } 
            })
            .then(() => {
                this.$store.dispatch('showBlablas')
            })
            .catch(err => {
                this.$swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `error: {${err}}`,
                })
                // console.log(err)
            })
            .finally(() => {
                this.contents = ''
            })
        },
        mention(UserId) {
            this.contents = `@Anon${UserId}`
        },
        deleteBlablas(id) {
                this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                this.$store.dispatch('deleteBlablas', id)
                this.$swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                }
            })
        }
    },
    computed: {
        blablas() {
            return this.$store.state.blablas
        },
        UserId() {
            return this.$store.state.UserId
        },
        UserAvatar() {
            return this.$store.state.UserAvatar
        }
    },
    created() {
        this.$store.dispatch('showBlablas')
    }
}
</script>

<style scoped>
body {
    background-color: #eeeeee;
}

.h7 {
    font-size: 0.8rem;
}

.gedf-wrapper {
    margin-top: 0.97rem;
}

@media (min-width: 992px) {
    .gedf-main {
        padding-left: 4rem;
        padding-right: 4rem;
    }
    .gedf-card {
        margin-bottom: 2.77rem;
    }
}

/**Reset Bootstrap*/
.dropdown-toggle::after {
    content: none;
    display: none;
}
</style>
