async function wave(file) {
    const s32 = t => [t%65536,t>>16]
    const to8 = t => new Uint8Array(t.buffer)
    const FB = new Uint8Array(await file.arrayBuffer()); const sz = FB.byteLength; let x
    if (sz > 0xFFFFFF00) {console.error("data too large. maximum size 4,294,967,040 bytes."); x = false} else {x = true}
    if (sz > 0x7FFFFF00) {console.warn("data very large. successful conversion cannot be guaranteed.")}
    const head1 = new Uint16Array([18770,17990,...s32(sz+36),16727,17550])
    const head2 = new Uint16Array([28006,8308,16,0,1,1,44100,0,22664,1,2,16])
    const head3 = new Uint16Array([24932,24948,...s32(sz)])
    const r = new Uint8Array(x ? sz+44: 60);
    r.set(to8(head1),0);r.set(to8(head2),12);r.set(to8(head3),36)
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
bison.addEventListener('click',() => {fi0 = fi.files[0]; wave(fi0).then(fd => {Object.assign(outl, {href: URL.createObjectURL(new Blob([fd])), download: fi0.name.split(".").slice(0,-1).join(".").concat(".wav")}).click()})})
doc.body.append(...stuff); stuff.length = false
