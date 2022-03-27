<template>
  <div
    style="
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <iframe
      id="subber-iframe"
      width="100%"
      style="border: none !important"
      src="http://subber-frontend.test/embed/simon-whistler-latest-content-feed?text=white"
    ></iframe>
    <!-- <iframe
      id="subber-iframe2"
      width="100%"
      style="border: none !important"
      src="https://subber-frontend.test/embed/simon-whistler-latest-content-feed?text=white&domain=subber-frontend2.test"
    ></iframe> -->
    <!-- <script>
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
    </script> -->
  </div>
</template>
<script>
export default {
  mounted() {
    const eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent'
    const eventer = window[eventMethod]
    const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message'

    eventer(
      messageEvent,
      function (e) {
        if (
          !(
            e.data &&
            typeof e.data.includes === 'function' &&
            e.data.includes('subberHeight')
          )
        )
          return

        const height = Number(e.data.replace('subberHeight', ''))

        // replace #sizetracker with what ever what ever iframe id you need
        document.getElementById('subber-iframe').style.height = height + 'px'
      },
      false
    )
  },
}
</script>
