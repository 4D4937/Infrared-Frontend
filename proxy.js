/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("submit event fired")
  proxySite(address.value);
});

async function proxySite(urlToProxy) {
  console.log(urlToProxy)
  try {
    await registerSW();
  } catch (err) {
    error.textContent = "❌ Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }

  const formattedURL = search(urlToProxy, searchEngine.value);
  console.log(formattedURL)
  console.log(__uv$config.bare)
  location.href = __uv$config.prefix + __uv$config.encodeUrl(formattedURL);
}

document.querySelectorAll(".quicklink > button").forEach((button) => {
  button.addEventListener("click", async () => {
    if (button.getAttribute("origin") == null) {
      console.error("Quicklink does not have an origin attribute.")
    } else {
      proxySite(button.getAttribute("origin"));
    }
  });
});