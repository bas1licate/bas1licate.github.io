const doc = document

const stuff = [];
doc.head.appendChild(Object.assign(doc.createElement("title"),{innerHTML: "a strange case."}))
doc.body.append(doc.createElement("br"),"go ahead enter your stuff")
const fileInput = Object.assign(doc.createElement("input"),{type: "file"}); stuff.push(doc.createElement("br"))
stuff.push(doc.createElement("label")); stuff.at(-1).append("only files are accepted:",fileInput)
const bison = Object.assign(doc.createElement("button"),{innerHTML: "run (downloads automatically)"}); stuff.push(bison)
stuff.push(doc.createElement("ul")); stuff.at(-1).append("operation:");
["and #","ior #","xor #","negate","negative","plus #", "minus #"].map(x => {let b = Object.assign(doc.createElement("label")); b.append(x,Object.assign(doc.createElement("input"),{type: "radio", name: "op", value: x})); return b}).forEach(x => {l = doc.createElement("li"); l.append(x); stuff.at(-1).append(l)})
stuff.push(doc.createElement("label")); goat = Object.assign(doc.createElement("input"),{type: "number", min: "0", max: "255"})
stuff.at(-1).append("# for binary operationss: ",goat); let q
doc.querySelectorAll('input[name="op"]').forEach(x => x.addEventListener('click', () => {q = x.value; goat.disabled = ['negate','negative'].includes(q); if (goat.disabled) {goat.value = null}}))
outl = Object.assign(doc.createElement("a"),{download: ""}); console.log(stuff)
async function basic() {
  const gv = goat.value; const p = new Uint8Array(await fileInput.files[0].arrayBuffer())
  return p.map(x => q=="and #" ? x&gv : q=="ior #" ? x|gv : q=="xor #" ? x^gv : q=="negate" ? ~x : q=="negative" ? -x : q=="plus #" ? x+gv : q=="minus #" ? x-gv : x)
  //catch (e) {console.error(e);console.warn(e.message)}
}
bison.addEventListener('click',() => {basic().then(fd => {outl.href = URL.createObjectURL(new Blob([fd])); outl.click()})})

doc.body.append(...stuff); stuff.length = false
// doc.getElementbyId("thyself").remove() // only possible use of getElementById in the entire script, which is entirely optional
