const doc = document

const stuff = [];
doc.head.appendChild(Object.assign(doc.createElement("title"),{innerHTML: "a strange case."}))
doc.body.append("go ahead enter your stuff",doc.createElement("br"))
const fileInput = Object.assign(doc.createElement("input"),{type: "file"}); stuff.push(doc.createElement("br"))
stuff.push(doc.createElement("label")); stuff.at(-1).append("only files are accepted:",fileInput)
const bison = Object.assign(doc.createElement("button"),{innerHTML: "run (downloads automatically)"}); stuff.push(bison)
stuff.push(doc.createElement("ul")); stuff.at(-1).append("operation:");
["and #","ior #","xor #","negate","negative","plus #", "minus #", "round to #", "nothing (default)"].map(x => {const b = doc.createElement("label"); b.append(x,Object.assign(doc.createElement("input"),{type: "radio", name: "op", value: x, checked: x.includes("default")})); return b}).forEach(x => {let l = doc.createElement("li"); l.append(x); stuff.at(-1).append(l)})
stuff.push(doc.createElement("label")); const goat = Object.assign(doc.createElement("input"),{type: "number", min: "0", max: "255"})
stuff.at(-1).append("# for binary operationss: ",goat,doc.createElement("br")); let q;
stuff.at(-2).querySelectorAll('input[name="op"]').forEach(x => x.addEventListener('click', () => {q = x.value; q?.length ?? window.alert("error setting."); goat.disabled = ['negate','negative'].includes(q); if (goat.disabled) {goat.value = null}}))
const skip = Object.assign(doc.createElement("input"),{type: "number", min: "0", id: "skip"}); stuff.push((x=>{x.append("skip first # bytes"); return x;})(Object.assign(doc.createElement("label"),{htmlFor: "skip"})),skip);
const outl = Object.assign(doc.createElement("a"),{download: ""}); console.log(stuff)
async function basic() {
  if (!goat.disabled && goat.value == "") {return window.alert("enter a number first.")}
  const gv = goat.valueAsNumber; q = q ?? doc.querySelector('input[name="op"]:checked').value; console.log(q,gv)
  console.log(S = skip.valueAsNumber);
  return new Uint8Array(await fileInput.files[0].arrayBuffer()).map((x,i) => i<S?x: q=="and #" ? x&gv : q=="ior #" ? x|gv : q=="xor #" ? x^gv : q=="negate" ? ~x : q=="negative" ? -x : q=="plus #" ? x+gv : q=="minus #" ? x-gv : q=="round to #" ? gv*Math.round(x/gv) : x)
  //catch (e) {console.error(e);console.warn(e.message)}
}
bison.addEventListener('click',() => {basic().then(fd => {outl.href = URL.createObjectURL(new Blob([fd])); outl.click()})})

doc.body.append(...stuff); stuff.length = false
// doc.getElementbyId("thyself").remove() // only possible use of getElementById in the entire script, which is entirely optional
