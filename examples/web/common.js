const codeEl = document.getElementById("code");
const sourceEl = document.getElementById("sourcecode");
if (codeEl && sourceEl) {
  const exampleCode = sourceEl.innerText.trim();
  document.getElementById("code").value = exampleCode;
  codeEl.setAttribute("style", `height:${codeEl.scrollHeight}px;`);
  document.getElementById("run").onclick = () => {
    eval(document.getElementById("code").value);
  };
}
