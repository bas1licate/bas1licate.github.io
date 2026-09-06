async function wave(file) {
    const n32 = (t : number) => new Uint32Array(t) // remove as soon as sample rate is added
    const n16 = (t : number) => new Uint16Array(t) // remove as soon as everything else is added
    const to8 = t => new Uint8Array(t.buffer)
    const FB = new Uint8Array(await file.arrayBuffer()); const sz = 2*Math.ceil(FB.byteLength/2); let x
    if (sz > 0xFFFFFF00) {console.error("data too large. maximum size 4,294,967,040 bytes."); x = false} else {x = true}
    if (sz > 0x7FFFFF00) {console.warn("data very large. successful conversion cannot be guaranteed.")}
    const head1 = new Uint8Array([82,73,70,70,...to8(sz+36),87,65,86,69])
    const head2 = new Uint8Array([102,109,116,32,16,0,0,0,...to8(n16(1)),1,0,...to8(n32(44100)),...to8(n32(44100*16/8)),...to8(n16(16/8)),...to8(n16(16))]) //everything static here for now, but not later
    const head3 = new Uint8Array([100,97,116,97,...to8(sz)])
    const r = new Uint8Array(x ? sz+44 : 60);
    r.set(head1,0);r.set(head2,12);r.set(head3,36)
    r.set(x ? FB : new Uint8Array([91, 111, 98, 106, 101, 99, 116, 32, 80, 114, 111, 109, 105, 115, 101, 93]),44)
    return r;
}

const doc = document
const stuff = [];
doc.body.append("go ahead enter your stuff",doc.createElement("br"))
const fi = Object.assign(doc.createElement("input"),{type: "file"}); stuff.push(doc.createElement("br"))
stuff.push(doc.createElement("label")); stuff.at(-1).append("only files are accepted:",fi)
const bison = Object.assign(doc.createElement("button"),{innerHTML: "run (downloads automatically)"}); stuff.push(bison)
const outl = Object.assign(doc.createElement("a"),{download: ""}); console.log(stuff); let fi0 = fi?.files?.[0]
bison.addEventListener('click',() => {fi0 = fi.files[0]; wave(fi0).then(fd => {Object.assign(outl, {href: URL.createObjectURL(new Blob([fd])), download: fi0.name.split(".").length > 1 ? fi0.name.split(".").slice(0,-1).join(".").concat(".wav") : fi0.name.concat(".wav")}).click()})})
doc.body.append(...stuff); stuff.length = false
