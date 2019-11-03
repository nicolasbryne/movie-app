<template>
    <div class="breadcrumb rounded-0 bg-dark subheader">
        <div class="container-fluid">
            <i class="fa mr-2" :class="renderIcon"></i><strong>{{breadcrumb}}</strong>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        icon : {
            type : String,
            default : null
        },
        breadcrumb : {
            type : String,
            default : 'Home'
        }
    },
    computed : {
        renderIcon : function(){
            return this.icon ? `fa-${this.icon}` : "";
        }
    }
}
</script>

