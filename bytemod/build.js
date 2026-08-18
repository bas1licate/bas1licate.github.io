const qi = document // watch this never get used except retroactively due to muscle memory, which defeats the purpose

const stuff = [];
qi.head.appendChild(Object.assign(qi.createElement("title"),{innerHTML: "a strange case."}))
qi.body.append("go ahead enter your stuff")
const fileInput = Object.assign(qi.createElement("input"),{type: "file"})
stuff.push(qi.createElement("label")); stuff.at(-1).append("only files are accepted:",fileInput)
const bison = Object.assign(qi.createElement("button"),{innerHTML: "run (downloads automatically)"}); stuff.push(bison)
stuff.push(qi.createElement("ul")); stuff.at(-1).append("operation:")
["and #","ior #","xor #","negate","negative"].map(x => {let b = Object.assign(qi.createElement("label")); b.append(x,Object.assign(qi.createElement("button"),{type: "radio", name: "op", for: x})); return b}).forEach(x => {l = qi.createElement("li"); l.append(x); stuff.at(-1).append(l)})
stuff.push(qi.createElement("label")); goat = Object.assign(qi.createElement("input"),{type: "number", min: "0", max: "255"})
stuff.at(-1).append("# for binary operationss: ",goat); let q
qi.querySelectorAll('input[name="op"]').forEach(x => x.addEventListener('click', () => {q = x.for; goat.disabled = ['negate','negative'].includes(q); if (goat.disabled) {goat.value = null}}))
outl = Object.assign(qi.createElement("a"),{download: ""}); console.log(stuff)
//async function basic() {
//  const gv = goat.value; const p = new Uint8Array(await fileInput.files[0].arrayBuffer())
//  try {return p.map(x => q=="and #" ? x&gv : q=="ior #" ? x|gv : q=="xor #" ? x^gv : q=="negate" ? ~x : q=="negative" ? -x : x)}
//  catch (e) {console.error(e);console.warn(e.message)}
//}
//bison.addEventListener('click',() => {basic().then(fd => {outl.href = URL.createObjectURL(new Blob(fd)); outl.click()})})

stuff.forEach(x => qi.body.appendChild(x))
// qi.getElementbyId("thyself").remove() // only possible use of getElementById in the entire script, which is entirely optional
