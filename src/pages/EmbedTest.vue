<template>
  <div
    style="
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <iframe
      id="subber-iframe"
      width="100%"
      style="border: none !important"
      src="http://subber.test/embed/simon-whistler-latest-content-feed?text=white"
    ></iframe>
  </div>
</template>
<script>
export default {
  mounted() {
    const iframe = document.getElementById('subber-iframe')
    if (iframe) {
      iframe.onload = function () {
        const setHeight = () => {
          iframe.style.height =
            iframe.contentWindow.document.body.scrollHeight + 'px'
        }
        setHeight()
        setInterval(setHeight, 500)
      }
    }
  },
}
</script>
