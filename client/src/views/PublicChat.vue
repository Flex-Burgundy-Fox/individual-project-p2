<template>
    <div class="container">
        <h3>PUBLIC CHAT YET STILL ANONYMOUS</h3>
        <div class="messaging">
            <div class="inbox_msg">
                <div class="mesgs">
                    <div v-for="(msg, i) in messages" :key="i" class="sent_msg">
                        <!-- <p>{{ this.UserId }}</p> -->
                        <h5>{{ msg.message }}</h5>
                    </div>
                    <div class="type_msg">
                        <div class="input_msg_write">
                            <form @submit.prevent="sendMessage()">
                                <input
                                    type="text"
                                    class="write_msg"
                                    v-model="message"
                                    placeholder="Type a message"
                                />
                                <button class="msg_send_btn" type="submit">
                                    <i
                                        class="fa fa-paper-plane-o"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DirectMessages',
    data() {
        return {
            message: '',
            messages: [],
            // UserId: localStorage.getItem('user_id'),
        }
    },
    methods: {
        sendMessage() {
            // console.log(this.message)
            this.$socket.emit('newMessage', { message: this.message })
            this.messages.push({ message: this.message })
            this.message = ''
        },
    },
    sockets: {
        init(payload) {
            this.messages = payload
        },
        serverMessage(message) {
            this.messages.push(message)
        },
    },
}
</script>

<style scoped>
.center {
    /* this will keep the content center */
    position: absolute;
    right: 0;
    left: 0;
    margin: auto;
}

.msg-group {
    position: absolute;
    max-width: 720px;
    height: 92%;
    overflow-y: scroll; /*if the content beyond width and height, use the scrollbar*/
}

.card {
    padding: 10px 0 10px 0;
}

.input-group {
    position: absolute;
    height: 8%;
    bottom: 0;
}

.btn {
    height: 100%;
}
</style>

<!-- <div class="container">
        <h3>CHAT ANONIMOUSLY</h3>
        <div class="messaging">
            <div class="inbox_msg">
                <div class="mesgs">
                        <div
                            v-for="(msg, i) in messages"
                            :key="i"
                            class="sent_msg"
                        >
                            <h5>{{ msg.message }}</h5>
                            <!-- <p>{{ msg.time }}</p> -->
<!-- </div>
                        <div class="type_msg">
                            <div class="input_msg_write">
                                <form @submit.prevent="sendMessage()">
                                    <input
                                        type="text"
                                        class="write_msg"
                                        v-model="message"
                                        placeholder="Type a message"
                                    />
                                    <button class="msg_send_btn" type="submit">
                                        <i
                                            class="fa fa-paper-plane-o"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
