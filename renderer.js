document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle()
  document.getElementById('theme-source').className = isDarkMode ? "icofont-moon" : "icofont-sun-alt"
})

  let colorInput = document.getElementById('color-input')
  let colorLabel = document.getElementById('color-input-label')
  let colorName = document.getElementById('color-name')
  let schemeSelect = document.getElementById('scheme-select')
  let getScheme = document.getElementById('get-scheme')
  let colorFormat= document.getElementById('options--color-format')
  let colors = []

  // function getColorData () {
  //     fetch(`https://www.thecolorapi.com/id?hex=${colorInput.value.replace('#','')}&format=json`)
  //     .then(res => res.json())
  //     .then(data => {

  //     })
  // }

  function getSchemeSubmit () {

    fetch(`https://www.thecolorapi.com/scheme?hex=${colorInput.value.replace('#','')}&mode=${schemeSelect.value}&format=json`)
    .then(res => res.json())
    .then(data => {
      colors = data.colors
        for (let i = 0; i <5; i++) {
          let display = `scheme-display--color${i}`
          let name = `scheme-display--name${i}`
          document.getElementById(display).style.background = colors[i][colorFormat.value].value
          document.getElementById(display).className = getColorText(colors[i].rgb.r, colors[i].rgb.g, colors[i].rgb.b) ? "light-color" : "dark-color"
          document.getElementById(name).textContent= colors[i].name.value
          changeFormat()
        }
    })
  }

  function getBrightness (red, green, blue) {
    return ((red * .299) + (green * .587) + (blue * .114)) / 255 * 100
  }

  function getColorText (r, g, b){
    return Math.abs(getBrightness(r, g, b) - getBrightness(255, 255, 255)) > Math.abs(getBrightness(r, g, b) - getBrightness(31, 41, 55))
  }

  function changeFormat () {
    for (let i = 0; i < 5; i ++) {
      let caption = `scheme-display--label${i}`
      document.getElementById(caption).textContent = colors[i][colorFormat.value].value
    }
  }

  window.onload = () => {
    getSchemeSubmit()
  }

  // colorInput.addEventListener("change", getColorData)
  colorFormat.addEventListener("change", changeFormat)
  getScheme.addEventListener("submit", function (e) {
    e.preventDefault()
    getSchemeSubmit()

  })