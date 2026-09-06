async function wave(file,sr=44100,sb=16,fs=false) {
    const n16 = t => new Uint16Array([t]) // remove if possible
    const to8 = t => new Uint8Array(t.buffer)
    const tQ8 = t => to8(new Uint32Array([t]))
    const FB = new Uint8Array(await file.arrayBuffer()); const sz = 2*Math.ceil(FB.byteLength/2); let x
    if (sz > 0xFFFFFF00) {console.error("data too large. maximum size 4,294,967,040 bytes."); x = false} else {x = true}
    if (sz > 0x7FFFFF00) {console.warn("data very large. successful conversion cannot be guaranteed.")}
    const head1 = new Uint8Array([82,73,70,70,...tQ8(sz+36),87,65,86,69])
    const head2 = new Uint8Array([102,109,116,32,16,0,0,0,...to8(n16(1+2*fs)),1,0,...tQ8(sr),...tQ8(sr*sb/8),...to8(n16(sb/8)),...to8(n16(sb))]) //everything static here for now, but not later
    const head3 = new Uint8Array([100,97,116,97,...tQ8(sz)])
    const r = new Uint8Array(x ? sz+44 : 60);
    r.set(head1,0);r.set(head2,12);r.set(head3,36)
    r.set(x ? FB : new Uint8Array([91, 111, 98, 106, 101, 99, 116, 32, 80, 114, 111, 109, 105, 115, 101, 93]),44)
    return r;
}

const doc = document
const stuff = [];
const docbr = () => document.createElement("br")
doc.body.append("go ahead enter your stuff",docbr())
const fi = Object.assign(doc.createElement("input"),{type: "file"}); stuff.push(docbr())
stuff.push(doc.createElement("label")); stuff.at(-1).append("only files are accepted:",fi)
const bison = Object.assign(doc.createElement("button"),{innerHTML: "run (downloads automatically)"}); stuff.push(bison)
const outl = Object.assign(doc.createElement("a"),{download: ""}); console.log(stuff); let fi0 = fi?.files?.[0]
stuff.push(doc.createElement("div")); sal = stuff.at(-1)
sal.append("miscellaneous options:",docbr())
const sam = Object.assign(doc.createElement("input"),{type: "number", id: "sam", min: 0, max: 0xffffffff, value: 44100})
sal.append(Object.assign(doc.createElement("label"),{for: "sam", textContent: "Sample rate (Hz): "}),sam,docbr())
bison.addEventListener('click',() => {fi0 = fi.files[0]; wave(fi0,sam.value).then(fd => {Object.assign(outl, {href: URL.createObjectURL(new Blob([fd])), download: fi0.name.split(".").length > 1 ? fi0.name.split(".").slice(0,-1).join(".").concat(".wav") : fi0.name.concat(".wav")}).click()})})
doc.body.append(...stuff); stuff.length = false
