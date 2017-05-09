<template>
    <vodal :show="visible" animation="rotate" @hide="show = false">

        <div class="content" style="text-align: center; padding-bottom: 3px; margin-bottom: 5px;">
            Log-in to your Dakika account
        </div>

        <form class="ui large form">
            <div class="">
                <div class="field">
                    <div class="ui left icon input">
                        <i class="user icon"></i>
                        <input type="text" v-model="username" name="email" placeholder="E-mail address">
                    </div>
                </div>
                <div class="field">
                    <div class="ui left icon input">
                        <i class="lock icon"></i>
                        <input type="password" v-model="password" name="password" placeholder="Password">
                    </div>
                </div>
                <div v-on:click="requestToken" class="ui fluid large teal submit button">Login</div>
            </div>

            <div class="ui error message"></div>

        </form>
    </vodal>
</template>
<script>
    var axios = require('axios');
    const settings = require('electron-settings');
    export default {
        props: ['visible'],
        data() {
            return {
                username: null,
                password: null
            }
        },
        methods: {
            requestToken: function () {
                axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
                var x = this;
                axios.post('http://dakika.app/oauth/token', {
                    grant_type: 'password',
                    client_id: 10,
                    client_secret: '2BDOhql0hcI0ZryJ6poWid8eK3B5WXUounxxqsDv',
                    username: this.username,
                    password: this.password
                },)
                    .then(function (response) {
                        console.log(JSON.stringify(response.data))
                        settings.set('token',JSON.stringify(response.data));
                        x.$emit('done')
                    })
                    .catch(function (error) {
                        console.log('error')
                        console.log(error);
                    });
            }
        }
    }
</script>

