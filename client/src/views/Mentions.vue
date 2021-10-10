<template>
    <div class="container-fluid gedf-wrapper">
        <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body">
                        <img
                            class="rounded-circle"
                            width="100"
                            :src="this.$store.state.userAvatar"
                            alt=""
                        />
                        <div class="h5">{{this.$store.state.UserId}}</div>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Bio: Vestibulum at eros</li>
                    </ul>
                </div>
            </div>
            <div class="col-md-6 gedf-main">

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
                                <div class="mr-2">
                                    <img
                                        class="rounded-circle"
                                        width="45"
                                        src=""
                                        alt=""
                                    />
                                </div>
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
                            <i class="fa fa-clock-o"></i>10 min ago
                        </div>
                        <p class="card-text">
                            {{blabla.contents}}
                        </p>
                    </div>
                </div>
                <!-- Post /////-->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Mentions',
    data() {
        return {

        }
    },
    computed: {
        blablas() {
            let blablasData = this.$store.state.blablas
            // console.log(blablasData)
            let mentionsOnly = blablasData.filter(function (el) {
                return el.contents.split(' ')[0]
            })
            console.log(mentionsOnly)
            return mentionsOnly
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
