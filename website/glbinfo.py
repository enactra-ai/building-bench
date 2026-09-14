import sys,struct,json,io
from PIL import Image
def info(path):
    b=open(path,'rb').read()
    magic,ver,length=struct.unpack('<III',b[:12]); assert magic==0x46546C67
    off=12; chunks=[]
    while off<len(b):
        cl,ct=struct.unpack('<II',b[off:off+8]); chunks.append((ct,b[off+8:off+8+cl])); off+=8+cl
    j=json.loads(chunks[0][1]); binc=chunks[1][1] if len(chunks)>1 else b''
    bvs=j.get('bufferViews',[])
    imgbytes=0; imgs=[]
    for im in j.get('images',[]):
        bv=bvs[im['bufferView']]; data=binc[bv['byteOffset']:bv['byteOffset']+bv['byteLength']]
        try:
            p=Image.open(io.BytesIO(data)); imgs.append((im.get('mimeType'),p.size,p.mode,bv['byteLength']))
        except Exception as e: imgs.append((im.get('mimeType'),'?',str(e),bv['byteLength']))
        imgbytes+=bv['byteLength']
    tri=0
    for m in j.get('meshes',[]):
        for pr in m.get('primitives',[]):
            if 'indices' in pr: tri+=j['accessors'][pr['indices']]['count']//3
            else: tri+=j['accessors'][pr['attributes']['POSITION']]['count']//3
    ext=j.get('extensionsUsed',[])
    return dict(total=len(b),json=len(chunks[0][1]),bin=len(binc),images=imgbytes,geom=len(binc)-imgbytes,nimg=len(imgs),tri=tri,ext=ext,imgs=imgs)
if __name__=='__main__':
    for p in sys.argv[1:]:
        d=info(p); imgs=d.pop('imgs')
        print(p.split('/')[-1][:60], {k:(round(v/1e6,2) if isinstance(v,int) and v>1000 else v) for k,v in d.items()})
        for im in imgs[:12]: print('    ',im)
