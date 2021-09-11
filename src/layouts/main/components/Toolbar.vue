<template>
    <header class="toolbar">
        <div class="user-info">
            <img :src="user.avatar" alt="Avatar" class="avatar">
            <div class="user-data">
                <span class="user-name">{{ user.name }}</span>
                <span class="user-occupation">{{ user.occupation }}</span>
            </div>
        </div>
    </header>
</template>

<script>
import avatar from '../../../assets/images/avatar.jpeg';
export default {
    
    data() {
        return {
            user: {
                name: "Diego Henrique Ferreira do Nascimento",
                occupation: "Front-end Developer",
                avatar: avatar
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.toolbar
    display flex
    justify-content: flex-end
    padding 0 32px

.user-info
    display contents

    img
        border-radius 50%
        margin 18px 12px

.user-data
    display flex
    flex-direction column
    justify-content: center

    .user-occupation
        font-size 12px
        

</style>