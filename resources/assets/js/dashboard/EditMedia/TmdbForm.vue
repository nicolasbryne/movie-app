<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-5 pr-md-1">
                <base-input label="Title"
                        placeholder="Title"
                        v-model="model.title"
                        name="title"
                        disabled>
                </base-input>
            </div>
            <div class="col-md-3 px-md-1">
                <base-input label="Original Title"
                        placeholder="Original Title"
                        name="original_title"
                        v-model="model.original_title">
                </base-input>
            </div>
            <div class="col-md-4 pl-md-1">
                <base-input label="Tmdb ID"
                        type="number"
                        name="tmdb_id"
                        placeholder="Tmdb ID"
                        v-model="model.tmdb_id">
                </base-input>
            </div>
            </div>
            <div class="row">
                <div class="col-md-2 pr-md-1">
                    <base-input label="Runtime (in minutes)"
                            name="runtime"
                            v-model="model.runtime"
                            placeholder="123 mins">
                    </base-input>
                </div>
                <div class="col-md-2 px-md-1">
                    <base-input label="Rating (out of 10)"
                            name="rating"
                            v-model="model.rating"
                            type="number"
                            min=1
                            max=10
                            step="0.1"
                            placeholder="Rating out of 10">
                    </base-input>
                </div>
                <div class="col-md-8 pl-md-1">
                    <base-input label="Casts"
                            name="casts"
                            v-model="model.casts"
                            placeholder="Morgan Freeman, Kate Winslet, Jesse Eisenberg">
                    </base-input>
                </div>
            </div>
            <div class="row">
            <div class="col-md-12">
                <base-input label="Tagline"
                        name="tagline"
                        v-model="model.tagline"
                        placeholder="Tagline">
                </base-input>
            </div>
            </div>
            <div class="row">
            <div class="col-md-4 pr-md-1">
                <base-input label="Available at"
                        type="date"
                        name="avaliable_at"
                        v-model="model.available_at"
                        placeholder="2018-07-21">
                </base-input>
            </div>
            <div class="col-md-4 px-md-1">
                <base-input label="Studio"
                        name="studio"
                        v-model="model.studio"
                        placeholder="Studio">
                </base-input>
            </div>
            <div class="col-md-4 pl-md-1">
                <base-input label="Content rating"
                        name="content_rating"
                        v-model="model.content_rating"
                        placeholder="R">
                </base-input>
            </div>
            </div>
            <div class="row">
            <div class="col-md-8">
                <base-input>
                <label>Summary</label>
                <textarea rows="4" cols="80"
                            class="form-control"
                            name="summary"
                            placeholder="Overview of this title can be here"
                            v-model="model.summary">

                    </textarea>
                </base-input>
            </div>
        </div>
    </div>
</template>

<script>
import BaseInput from '@/components/Inputs/BaseInput'
export default {
    name : 'tmdb-form',
    props : {
        tmdb : {
            type : Object,
            default : {}
        }
    },
    components : {
        BaseInput
    },
    data(){
        return {
            model: this.tmdb
        }
    }
}
</script>
