<template>
  <div class="form-group"
       :class="{
          'input-group': hasIcon,
          'input-group-focus': focused
       }">
    <slot name="label">
      <label v-if="label" class="control-label">
        {{label}}
      </label>
    </slot>
    <slot name="addonLeft">
      <span v-if="addonLeftIcon" class="input-group-prepend">
        <div class="input-group-text">
          <i :class="addonLeftIcon"></i>
        </div>
      </span>
    </slot>
    <slot>
      <input
        :value="value"
        v-bind="$attrs"
        v-on="listeners"
        class="form-control"
        aria-describedby="addon-right addon-left">
    </slot>
    <slot name="addonRight">
      <span v-if="addonRightIcon" class="input-group-append">
        <div class="input-group-text">
          <i :class="addonRightIcon"></i>
        </div>
      </span>
    </slot>
    <slot name="helperText"></slot>
  </div>
</template>
<script>
  export default {
    inheritAttrs: false,
    name: "base-input",
    props: {
      label: {
        type: String,
        description: "Input label"
      },
      value: {
        type: [String, Number],
        description: "Input value"
      },
      addonRightIcon: {
        type: String,
        description: "Input icon on the right"
      },
      addonLeftIcon: {
        type: String,
        description: "Input icon on the left"
      },
    },
    model: {
      prop: 'value',
      event: 'input'
    },
    data() {
      return {
        focused: false
      }
    },
    computed: {
      hasIcon() {
        const { addonRight, addonLeft } = this.$slots;
        return addonRight !== undefined || addonLeft !== undefined || this.addonRightIcon !== undefined || this.addonLeftIcon !== undefined;
      },
      listeners() {
        return {
          ...this.$listeners,
          input: this.onInput,
          blur: this.onBlur,
          focus: this.onFocus
        }
      }
    },
    methods: {
      onInput(evt) {
        this.$emit('input', evt.target.value)
      },
      onFocus() {
        this.focused = true;
      },
      onBlur() {
        this.focused = false;
      }
    }
  }
</script>
<style scoped>
    .form-group .form-control {
      padding: 10px 18px
    }
    .form-control{
        border-color: #2b3553;
        border-radius: .4285rem;
        font-size: 15px;
        font-weight: 500;
        background-color: transparent;
        color: hsla(0,0%,100%,.8);
        transition: color .3s ease-in-out,border-color .3s ease-in-out,background-color .3s ease-in-out;
    }
    .form-control:focus{
      border-color: var(--success)!important;
      box-shadow: none;
    }
    label{
      font-size: 15px;
      margin-bottom: 5px;
      color: hsla(0,0%,100%,.6);
      font-weight: 500;
    }
    textarea.form-control {
      border: none;
      border-bottom: 1px solid #2b3553;
      border-radius: 0;
      line-height: 2;
      max-height: 120px;
      max-width: 100%;
      padding: 10px 10px 0 0;
      resize: none;
      overflow: auto;
  }

</style>

