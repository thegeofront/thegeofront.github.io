import './style.css'
import viteLogo from '/logo.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://josfeenstra.nl" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Geofront Logo" />
    </a>
    <h1>Geofront</h1>
    <a href="https://josfeenstra.nl">To personal website</a>
    <br>
    <br>
    <br>
    <br>
    <p class="more soon">
    🚧 Renovating... 🚧
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
