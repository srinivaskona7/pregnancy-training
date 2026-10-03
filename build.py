"""Bundle data/ch*.json into site/data.js (works on file:// and any static host)."""
import json, glob, pathlib
root = pathlib.Path(__file__).parent
PARTS = [("Part I","General Part",1,5),("Part II","Design of a Training Program",6,15),
         ("Part III","Type of Physical Activities",16,25),("Part IV","Recovery and Adherence",26,28)]
chs = [json.load(open(f)) for f in sorted(glob.glob(str(root/"data/ch*.json")), key=lambda p:int(''.join(c for c in pathlib.Path(p).stem if c.isdigit())))]
assert [c["n"] for c in chs] == list(range(1,29)), [c["n"] for c in chs]
for c in chs:
    for k in ("title","summary","points","takeaways","cautions"): assert k in c, (c["n"],k)
out = root/"site/data.js"
out.write_text("window.BOOK="+json.dumps({"parts":[dict(label=a,name=b,from_=f,to=t) for a,b,f,t in PARTS],"chapters":chs},ensure_ascii=False)+";")
print("ok", len(chs))
