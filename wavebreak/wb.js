async function wave(file,sr=44100,sb=16,fs=false) {
    sb&7 && (()=>{throw new Error("invalid bit depth")})(); let dw;
    [1,2,3,4,8].includes(sb>>3) || (dw = console.warn(`unusual bit depth (general): ${sb}`) ?? 1)
    dw || (fs ? sb&31 : sb&64) && console.warn(`unusual bit depth for ${fs ? "float" : "linear"}: ${sb}`)
    sb-8 || sc || (sr>>=1)
    const n16 = t => new Uint16Array([t]) // remove if possible
    const to8 = t => new Uint8Array(t.buffer)
    const tQ8 = t => to8(new Uint32Array([t]))
    const g0 = (a, b=a) => (!a[1] ? (b[0]*b[1])/a[0] : g0([a[1],a[0]%a[1]],b)); const g1 = g0([2,sb>>3])<<3;
    const FB = new Uint8Array(await file.arrayBuffer()); const sz = sb/g1*Math.ceil(g1*FB.byteLength/sb); let x
    if (sz > 0xFFFFFF00) {console.error("data too large. maximum size 4,294,967,040 bytes."); x = false} else {x = true}
    if (sz > 0x7FFFFF00) {console.warn("data very large. successful conversion cannot be guaranteed.")}
    const head1 = new Uint8Array([82,73,70,70,...tQ8(sz+36),87,65,86,69])
    const head2 = new Uint8Array([102,109,116,32,16,0,0,0,...to8(n16(1+fs*2)),1,0,...tQ8(sr),...tQ8(sr*sb>>3),...to8(n16(sb>>3)),...to8(n16(sb))])
    const head3 = new Uint8Array([100,97,116,97,...tQ8(sz)])
    const r = new Uint8Array(x ? sz+44 : 60);
    r.set(head1,0);r.set(head2,12);r.set(head3,36)
    r.set(x ? FB : new Uint8Array([91, 111, 98, 106, 101, 99, 116, 32, 80, 114, 111, 109, 105, 115, 101, 93]),44)
    return r;
}

const doc = document
const stuff = []; const dbody = doc.createElement("body")
const docbr = () => doc.createElement("br")
doc.body.append("go ahead enter your stuff",docbr())
const fi = Object.assign(doc.createElement("input"),{type: "file"})
stuff.push(doc.createElement("label")); stuff.at(-1).append("only files are accepted:",fi,docbr())
const bison = Object.assign(doc.createElement("button"),{innerText: "run (downloads automatically)"}); stuff.push(bison)
const outl = Object.assign(doc.createElement("a"),{download: ""}); console.log(Array.from(stuff)); let fi0 = fi?.files?.[0]; // stuff.push(doc.createTextNode("(if the download doesn't work, run `doc.body.append(outl)` in the console to be able to manually download)"))
dbody.append(...stuff); stuff.length = false
const sal = doc.createElement("div");
sal.append("miscellaneous options:",docbr())
let sc; const sam = Object.assign(doc.createElement("input"),{type: "number", id: "sam", min: 0, max: 0xffffffff, value: 44100, oninput: () => (sc=1)})
sal.append(Object.assign(doc.createElement("label"),{for: "sam", innerText: "Sample rate (Hz): "}),sam,docbr())
const bps = Object.assign(doc.createElement("input"),{type: "number", id: "bps", min: 1, max: 16, value: 1})
sal.append(Object.assign(doc.createElement("label"),{for: "bps", innerText: "bytes per sample (coming soon): "}),bps,docbr())
const fsc = Object.assign(doc.createElement("input"),{type: "checkbox", id: "fsc"})
sal.append(Object.assign(doc.createElement("label"),{for: "fsc", innerText: "use floating-point samples (instead of linear samples): "}),fsc,docbr())
bison.onclick = () => {fi0 = fi.files[0]; wave(fi0,sam.value,8*bps.value,fsc.checked).then(fd => {Object.assign(outl, {href: URL.createObjectURL(new Blob([fd],type='audio/wav')), download: fi0.name.split(".").filter(Boolean).length > 1 ? fi0.name.split(".").slice(0,-1).join(".").concat(".wav") : fi0.name.concat(".wav")}).click()}).catch((e) => {for (let cout of [console.error.bind(console),globalThis?.alert].filter(Boolean)) {cout("failed to process and/or download: ",e)}})}
console.log(dbody.appendChild(sal)); doc.body = dbody;
