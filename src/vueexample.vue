<template>
  <button id='nextButton' @click='handleClick'>
    <img src='/static/cowboy.png' />
    <span>Gimme Another</span>
  </div>
</template>

<script>
export default {
  created() {
    this.start = new Date()
  },
  data() {
    return {start: null}
  },
  methods: {
    handleClick() {
      var secondsSince = (new Date() - this.start) / 1000
      if(secondsSince > 10) {
        window.location.reload()
      } else {
        alert("Think about the current quote before asking for another!")
      }
    }
  }
}
</script>

<style lang='scss' scoped></style>
