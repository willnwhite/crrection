document.addEventListener('click', (event) => {
  if (event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") {
    const target = event.target, original = target.textContent
    let timeout

    target.classList.add("crrection") // style.css
    target.setAttribute('contentEditable', "true")

    function input(event) {
      function finishEditing(event) {
        const correction = event.target.textContent

        target.setAttribute('contentEditable', "false")
        // target.classList.remove("crrection") // FIXME this line means the outline flashes up (Chrome 51)

        const originalSentences = original.split('.')
        const correctionSentences = correction.split('.')

        const differentSentenceIndex = originalSentences.findIndex((sentence, index) => {
          return sentence !== correctionSentences[index]
        })

        location.href = `mailto:webmaster@${location.hostname}?subject=Crrection! on ${document.title ? document.title : location.href}&body=${document.title ? location.href + "%0A%0A" : ""}original: ${originalSentences[differentSentenceIndex]}.%0A%0Acorrection: ${correctionSentences[differentSentenceIndex]}.%0A%0Agithub.com/willnwhite/crrection!`
      }
      // reset timeout
      window.clearTimeout(timeout)
      timeout = window.setTimeout(finishEditing, 2000, event)
    }

    target.addEventListener('input', input)
  }
})
