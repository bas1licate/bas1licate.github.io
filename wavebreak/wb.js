/* copyof wavebreak.ts
async doConvert (
    inputFiles,
    inputFormat,
    outputFormat
  ): Promise {
    const outputFiles = [];
    const split32 = t => [t%65536,t>>16]
    const to8 = t => new Uint8Array(t.buffer)
    for (const file of inputFiles) {
    if (file.bytes.byteLength > 0xFFFFFF00) {console.error("data too large. maximum size 4,294,967,040 bytes."); continue}
    if (file.bytes.byteLength > 0x7FFFFF00) {console.warn("data very large. successful conversion cannot be guaranteed.")}
    const sz = file.bytes.byteLength
    const head1 = new Uint16Array([18770,17990,...split32(sz+36),16727,17550])
    const head2 = new Uint16Array([28006,8308,16,0,1,1,44100,0,22664,1,2,16])
    const head3 = new Uint16Array([24932,24948,...split32(sz)])
    const r = new Uint8Array(sz+44);
    r.set(to8(head1),0);r.set(to8(head2),12);r.set(to8(head3),36)
    r.set(file.bytes,44)
    outputFiles.push({name: file.name.split(".").slice(0, -1).join(".") + ".wav", bytes: r})
    }
    return outputFiles;
}
*/
/* copyof bytemod build.js
const doc = document

const stuff = [];
doc.head.appendChild(Object.assign(doc.createElement("title"),{innerHTML: "a strange case."}))
doc.body.append("go ahead enter your stuff",doc.createElement("br"))
const fileInput = Object.assign(doc.createElement("input"),{type: "file"}); stuff.push(doc.createElement("br"))
stuff.push(doc.createElement("label")); stuff.at(-1).append("only files are accepted:",fileInput)
const bison = Object.assign(doc.createElement("button"),{innerHTML: "run (downloads automatically)"}); stuff.push(bison)
stuff.push(doc.createElement("ul")); stuff.at(-1).append("operation:");
["and #","ior #","xor #","negate","negative","plus #", "minus #"].map(x => {const b = doc.createElement("label"); b.append(x,Object.assign(doc.createElement("input"),{type: "radio", name: "op", value: x, checked: x == "negate"})); return b}).forEach(x => {let l = doc.createElement("li"); l.append(x); stuff.at(-1).append(l)})
stuff.push(doc.createElement("label")); goat = Object.assign(doc.createElement("input"),{type: "number", min: "0", max: "255"})
stuff.at(-1).append("# for binary operationss: ",goat); let q
doc.querySelectorAll('input[name="op"]').forEach(x => x.addEventListener('click', () => {q = x.value; q?.length ?? window.alert("error setting."); goat.disabled = ['negate','negative'].includes(q); if (goat.disabled) {goat.value = null}}))
const outl = Object.assign(doc.createElement("a"),{download: ""}); console.log(stuff)
async function basic() {
  if (!goat.disabled && goat.value == "") {return window.alert("enter a number first.")}
  const gv = goat.valueAsNumber; console.log(q,gv)
  return new Uint8Array(await fileInput.files[0].arrayBuffer()).map(x => q=="and #" ? x&gv : q=="ior #" ? x|gv : q=="xor #" ? x^gv : q=="negate" ? ~x : q=="negative" ? -x : q=="plus #" ? x+gv : q=="minus #" ? x-gv : x)
  //catch (e) {console.error(e);console.warn(e.message)}
}
bison.addEventListener('click',() => {basic().then(fd => {outl.href = URL.createObjectURL(new Blob([fd])); outl.click()})})

doc.body.append(...stuff); stuff.length = false
*/
