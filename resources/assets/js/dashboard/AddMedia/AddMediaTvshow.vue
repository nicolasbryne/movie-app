<template>
  <form id="tv_show" class="tab-pane login100-form validate-form pb-5 active show">
    <input type="hidden" value=2 name="type_id" />
    <div class="row mt-0">
      <div class="col-7">
        <div class="wrap-input100 validate-input m-b-26 mr-4">
          <span class="label-input100">Series Title</span>
          <input class="form-control input100 text-light" type="text" name="title" placeholder="Enter series title">
          <span class="focus-input100"></span>
          <div class="valid-feedback pb-1">Finished</div>
          <div class="invalid-feedback pb-1">Google Drive URL is required</div>
        </div>
      </div>
      <div class="col-3 offset-2">
        <div class="wrap-input100 validate-input m-b-26">
          <span class="label-input100">Episode No</span>
          <input class="form-control input100 text-light" type="number" name="episode" placeholder="Enter episode no">
          <span class="focus-input100"></span>
          <div class="valid-feedback pb-1">Finished</div>
          <div class="invalid-feedback pb-1">Google Drive URL is required</div>
        </div>
      </div>
    </div>

    <div class="wrap-input100 validate-input m-b-18">
      <span class="label-input100">File location</span>
      <input class="form-control input100 text-light" type="text" name="drive" placeholder="Enter drive url" required>
      <span class="focus-input100"></span>
      <div class="valid-feedback pb-1">Finished</div>
      <div class="invalid-feedback pb-1">Google Drive URL is required</div>
    </div>

    <div class="wrap-input100 validate-input m-b-18">
      <span class="label-input100">Size</span>
      <input class="form-control input100 text-light" type="text" name="size" placeholder="Enter file size">
      <span class="focus-input100"></span>
    </div>

    <div class="wrap-input100 validate-input m-b-18">
      <span class="label-input100">Encoded by</span>
      <input class="form-control input100 text-light" type="text" name="encoded_by" placeholder="Enter encoder name">
      <span class="focus-input100"></span>
    </div>


    <div class="wrap-input100 validate-input m-b-18 border-bottom-0">
      <span class="label-input100">Resolution</span>
      <select class="form-control rounded-0" name="resolution">
        <option>1080p</option>
        <option>720p</option>
        <option>480p</option>
      </select>
    </div>

    <div class="wrap-input100 validate-input m-b-18 border-bottom-0">
      <span class="label-input100">Audio</span>
      <select class="form-control rounded-0" name="audio_channels">
        <option value="2.1">2.1 Channels</option>
        <option value="5.1">5.1 Channels</option>
        <option value="7.1">7.1 Channels</option>
      </select>
    </div>

    <div class="wrap-input100 validate-input m-b-18 border-bottom-0">
      <span class="label-input100">Subtitle</span>
      <select class="form-control rounded-0" name="subtitle">
        <option>Burmese</option>
        <option>English</option>
        <option>Others</option>
      </select>
    </div>
    <div class="d-flex justify-content-end align-items-center mt-4">
      <button class="btn btn-info font-weight-light ml-3" id="tv_showbtnSubmit">
        <i class="fas fa-check mr-1"></i>Submit
      </button>
    </div>

  </form>
</template>

<script>
  export default {

  }
</script>

