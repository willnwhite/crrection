document.addEventListener('click', (event) => {
  const target = event.target
  if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
    const original = target.textContent
    let timeout

    target.classList.add("crrection") // style.css
    const contentEditable = target.getAttribute('contentEditable')
    target.setAttribute('contentEditable', "true")

    function input(event) {
      function finishEditing(event) {
        const correction = event.target.textContent

        target.setAttribute('contentEditable', contentEditable)
        // target.classList.remove("crrection") // FIXME this line means the outline flashes up (Chrome 51)

        const originalSentences = original.split('.')
        const correctionSentences = correction.split('.')

        const differentSentenceIndex = originalSentences.findIndex((sentence, index) => {
          return sentence !== correctionSentences[index]
        })

        location.href = `mailto:webmaster@${location.hostname}?subject=Crrection! on ${document.title ? document.title : location.href}&body=${document.title ? location.href + "%0A%0A" : ""}original:%0A%0A ${originalSentences[differentSentenceIndex]}.%0A%0Acorrection:%0A%0A ${correctionSentences[differentSentenceIndex]}.%0A%0A${location.href}%0A%0Agithub.com/willnwhite/crrection`
      }
      // reset timeout
      window.clearTimeout(timeout)
      timeout = window.setTimeout(finishEditing, 2000, event)
    }

    target.addEventListener('input', input)
  }
})
