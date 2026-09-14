"""Slim a GLB for embedding: re-encode textures (downscale + JPEG), keep geometry."""
import sys,struct,json,io,gzip,os
from PIL import Image
def pad4(b,fill=b'\x00'):
    return b+fill*((4-len(b)%4)%4)
def slim(src,dst=None,maxpx=512,quality=80):
    b=open(src,'rb').read()
    magic,ver,length=struct.unpack('<III',b[:12]); assert magic==0x46546C67
    off=12; chunks=[]
    while off<len(b):
        cl,ct=struct.unpack('<II',b[off:off+8]); chunks.append((ct,b[off+8:off+8+cl])); off+=8+cl
    j=json.loads(chunks[0][1]); binc=chunks[1][1] if len(chunks)>1 else b''
    bvs=j.get('bufferViews',[])
    # which bufferViews hold images
    img_bv={}
    for idx,im in enumerate(j.get('images',[])):
        if 'bufferView' not in im: continue
        bv=bvs[im['bufferView']]; data=binc[bv['byteOffset']:bv['byteOffset']+bv['byteLength']]
        try:
            p=Image.open(io.BytesIO(data)); p.load()
        except Exception:
            continue
        alpha='A' in p.getbands() and p.getextrema()[-1][0]<255
        w,h=p.size; s=min(1.0,maxpx/max(w,h))
        if s<1: p=p.resize((max(1,round(w*s)),max(1,round(h*s))),Image.LANCZOS)
        out=io.BytesIO()
        if alpha:
            p.save(out,'PNG',optimize=True); mime='image/png'
        else:
            p.convert('RGB').save(out,'JPEG',quality=quality,optimize=True,progressive=False); mime='image/jpeg'
        nb=out.getvalue()
        if len(nb)<bv['byteLength'] or s<1:
            img_bv[im['bufferView']]=nb; im['mimeType']=mime
    # rebuild bin: copy every bufferView in order, replacing image ones
    newbin=bytearray(); 
    order=sorted(range(len(bvs)),key=lambda i:bvs[i].get('byteOffset',0))
    for i in order:
        bv=bvs[i]
        data=img_bv[i] if i in img_bv else binc[bv.get('byteOffset',0):bv.get('byteOffset',0)+bv['byteLength']]
        while len(newbin)%4: newbin+=b'\x00'
        bv['byteOffset']=len(newbin); bv['byteLength']=len(data); newbin+=data
    newbin=bytes(pad4(bytes(newbin)))
    j['buffers'][0]['byteLength']=len(newbin)
    jb=pad4(json.dumps(j,separators=(',',':')).encode(),b' ')
    out=struct.pack('<III',0x46546C67,2,12+8+len(jb)+8+len(newbin))+struct.pack('<II',len(jb),0x4E4F534A)+jb+struct.pack('<II',len(newbin),0x004E4942)+newbin
    if dst: open(dst,'wb').write(out)
    return out
if __name__=='__main__':
    maxpx=int(sys.argv[1]); q=int(sys.argv[2]); tot=0; totg=0; raw=0
    for p in sys.argv[3:]:
        o=slim(p,None,maxpx,q); g=gzip.compress(o,6)
        raw+=os.path.getsize(p); tot+=len(o); totg+=len(g)
        print(os.path.basename(p)[:50], round(os.path.getsize(p)/1e6,2),'->',round(len(o)/1e6,2),'gz',round(len(g)/1e6,2))
    print('TOTAL raw',round(raw/1e6,1),'slim',round(tot/1e6,1),'gz',round(totg/1e6,1))
