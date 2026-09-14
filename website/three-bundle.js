
(function(){
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const t="182",e={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},i={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},s=0,r=1,n=2,a=3,o=0,h=1,l=2,c=3,u=0,d=1,p=2,m=0,y=1,g=2,f=3,x=4,b=5,v=100,w=101,M=102,S=103,_=104,A=200,T=201,z=202,C=203,I=204,B=205,k=206,O=207,P=208,R=209,N=210,V=211,F=212,L=213,E=214,j=0,D=1,U=2,W=3,q=4,J=5,X=6,Y=7,Z=0,H=1,G=2,$=0,Q=1,K=2,tt=3,et=4,it=5,st=6,rt=7,nt="attached",at="detached",ot=300,ht=301,lt=302,ct=303,ut=304,dt=306,pt=1e3,mt=1001,yt=1002,gt=1003,ft=1004,xt=1004,bt=1005,vt=1005,wt=1006,Mt=1007,St=1007,_t=1008,At=1008,Tt=1009,zt=1010,Ct=1011,It=1012,Bt=1013,kt=1014,Ot=1015,Pt=1016,Rt=1017,Nt=1018,Vt=1020,Ft=35902,Lt=35899,Et=1021,jt=1022,Dt=1023,Ut=1026,Wt=1027,qt=1028,Jt=1029,Xt=1030,Yt=1031,Zt=1032,Ht=1033,Gt=33776,$t=33777,Qt=33778,Kt=33779,te=35840,ee=35841,ie=35842,se=35843,re=36196,ne=37492,ae=37496,oe=37488,he=37489,le=37490,ce=37491,ue=37808,de=37809,pe=37810,me=37811,ye=37812,ge=37813,fe=37814,xe=37815,be=37816,ve=37817,we=37818,Me=37819,Se=37820,_e=37821,Ae=36492,Te=36494,ze=36495,Ce=36283,Ie=36284,Be=36285,ke=36286,Oe=2200,Pe=2201,Re=2202,Ne=2300,Ve=2301,Fe=2302,Le=2400,Ee=2401,je=2402,De=2500,Ue=2501,We=0,qe=1,Je=2,Xe=3200,Ye=3201,Ze=3202,He=3203,Ge=0,$e=1,Qe="",Ke="srgb",ti="srgb-linear",ei="linear",ii="srgb",si="",ri="rg",ni="ga",ai=0,oi=7680,hi=7681,li=7682,ci=7683,ui=34055,di=34056,pi=5386,mi=512,yi=513,gi=514,fi=515,xi=516,bi=517,vi=518,wi=519,Mi=512,Si=513,_i=514,Ai=515,Ti=516,zi=517,Ci=518,Ii=519,Bi=35044,ki=35048,Oi=35040,Pi=35045,Ri=35049,Ni=35041,Vi=35046,Fi=35050,Li=35042,Ei="100",ji="300 es",Di=2e3,Ui=2001,Wi={COMPUTE:"compute",RENDER:"render"},qi={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},Ji={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"};function Xi(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}const Yi={Int8Array:Int8Array,Uint8Array:Uint8Array,Uint8ClampedArray:Uint8ClampedArray,Int16Array:Int16Array,Uint16Array:Uint16Array,Int32Array:Int32Array,Uint32Array:Uint32Array,Float32Array:Float32Array,Float64Array:Float64Array};function Zi(t,e){return new Yi[t](e)}function Hi(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function Gi(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function $i(){const t=Gi("canvas");return t.style.display="block",t}const Qi={};let Ki=null;function ts(t){Ki=t}function es(){return Ki}function is(...t){const e="THREE."+t.shift();Ki?Ki("log",e,...t):console.log(e,...t)}function ss(...t){const e="THREE."+t.shift();Ki?Ki("warn",e,...t):console.warn(e,...t)}function rs(...t){const e="THREE."+t.shift();Ki?Ki("error",e,...t):console.error(e,...t)}function ns(...t){const e=t.join(" ");e in Qi||(Qi[e]=!0,ss(...t))}function as(t,e,i){return new Promise(function(s,r){setTimeout(function n(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(n,i);break;default:s()}},i)})}class os{addEventListener(t,e){void 0===this._listeners&&(this._listeners={});const i=this._listeners;void 0===i[t]&&(i[t]=[]),-1===i[t].indexOf(e)&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return void 0!==i&&(void 0!==i[t]&&-1!==i[t].indexOf(e))}removeEventListener(t,e){const i=this._listeners;if(void 0===i)return;const s=i[t];if(void 0!==s){const t=s.indexOf(e);-1!==t&&s.splice(t,1)}}dispatchEvent(t){const e=this._listeners;if(void 0===e)return;const i=e[t.type];if(void 0!==i){t.target=this;const e=i.slice(0);for(let i=0,s=e.length;i<s;i++)e[i].call(this,t);t.target=null}}}const hs=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ls=1234567;const cs=Math.PI/180,us=180/Math.PI;function ds(){const t=4294967295*Math.random()|0,e=4294967295*Math.random()|0,i=4294967295*Math.random()|0,s=4294967295*Math.random()|0;return(hs[255&t]+hs[t>>8&255]+hs[t>>16&255]+hs[t>>24&255]+"-"+hs[255&e]+hs[e>>8&255]+"-"+hs[e>>16&15|64]+hs[e>>24&255]+"-"+hs[63&i|128]+hs[i>>8&255]+"-"+hs[i>>16&255]+hs[i>>24&255]+hs[255&s]+hs[s>>8&255]+hs[s>>16&255]+hs[s>>24&255]).toLowerCase()}function ps(t,e,i){return Math.max(e,Math.min(i,t))}function ms(t,e){return(t%e+e)%e}function ys(t,e,i){return(1-i)*t+i*e}function gs(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function fs(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(4294967295*t);case Uint16Array:return Math.round(65535*t);case Uint8Array:return Math.round(255*t);case Int32Array:return Math.round(2147483647*t);case Int16Array:return Math.round(32767*t);case Int8Array:return Math.round(127*t);default:throw new Error("Invalid component type.")}}const xs={DEG2RAD:cs,RAD2DEG:us,generateUUID:ds,clamp:ps,euclideanModulo:ms,mapLinear:function(t,e,i,s,r){return s+(t-e)*(r-s)/(i-e)},inverseLerp:function(t,e,i){return t!==e?(i-t)/(e-t):0},lerp:ys,damp:function(t,e,i,s){return ys(t,e,1-Math.exp(-i*s))},pingpong:function(t,e=1){return e-Math.abs(ms(t,2*e)-e)},smoothstep:function(t,e,i){return t<=e?0:t>=i?1:(t=(t-e)/(i-e))*t*(3-2*t)},smootherstep:function(t,e,i){return t<=e?0:t>=i?1:(t=(t-e)/(i-e))*t*t*(t*(6*t-15)+10)},randInt:function(t,e){return t+Math.floor(Math.random()*(e-t+1))},randFloat:function(t,e){return t+Math.random()*(e-t)},randFloatSpread:function(t){return t*(.5-Math.random())},seededRandom:function(t){void 0!==t&&(ls=t);let e=ls+=1831565813;return e=Math.imul(e^e>>>15,1|e),e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296},degToRad:function(t){return t*cs},radToDeg:function(t){return t*us},isPowerOfTwo:function(t){return!(t&t-1)&&0!==t},ceilPowerOfTwo:function(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))},floorPowerOfTwo:function(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))},setQuaternionFromProperEuler:function(t,e,i,s,r){const n=Math.cos,a=Math.sin,o=n(i/2),h=a(i/2),l=n((e+s)/2),c=a((e+s)/2),u=n((e-s)/2),d=a((e-s)/2),p=n((s-e)/2),m=a((s-e)/2);switch(r){case"XYX":t.set(o*c,h*u,h*d,o*l);break;case"YZY":t.set(h*d,o*c,h*u,o*l);break;case"ZXZ":t.set(h*u,h*d,o*c,o*l);break;case"XZX":t.set(o*c,h*m,h*p,o*l);break;case"YXY":t.set(h*p,o*c,h*m,o*l);break;case"ZYZ":t.set(h*m,h*p,o*c,o*l);break;default:ss("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}},normalize:fs,denormalize:gs};class bs{constructor(t=0,e=0){bs.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ps(this.x,t.x,e.x),this.y=ps(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ps(this.x,t,e),this.y=ps(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ps(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(0===e)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ps(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,n=this.y-t.y;return this.x=r*i-n*s+t.x,this.y=r*s+n*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class vs{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,n,a){let o=i[s+0],h=i[s+1],l=i[s+2],c=i[s+3],u=r[n+0],d=r[n+1],p=r[n+2],m=r[n+3];if(a<=0)return t[e+0]=o,t[e+1]=h,t[e+2]=l,void(t[e+3]=c);if(a>=1)return t[e+0]=u,t[e+1]=d,t[e+2]=p,void(t[e+3]=m);if(c!==m||o!==u||h!==d||l!==p){let t=o*u+h*d+l*p+c*m;t<0&&(u=-u,d=-d,p=-p,m=-m,t=-t);let e=1-a;if(t<.9995){const i=Math.acos(t),s=Math.sin(i);e=Math.sin(e*i)/s,o=o*e+u*(a=Math.sin(a*i)/s),h=h*e+d*a,l=l*e+p*a,c=c*e+m*a}else{o=o*e+u*a,h=h*e+d*a,l=l*e+p*a,c=c*e+m*a;const t=1/Math.sqrt(o*o+h*h+l*l+c*c);o*=t,h*=t,l*=t,c*=t}}t[e]=o,t[e+1]=h,t[e+2]=l,t[e+3]=c}static multiplyQuaternionsFlat(t,e,i,s,r,n){const a=i[s],o=i[s+1],h=i[s+2],l=i[s+3],c=r[n],u=r[n+1],d=r[n+2],p=r[n+3];return t[e]=a*p+l*c+o*d-h*u,t[e+1]=o*p+l*u+h*c-a*d,t[e+2]=h*p+l*d+a*u-o*c,t[e+3]=l*p-a*c-o*u-h*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,n=t._order,a=Math.cos,o=Math.sin,h=a(i/2),l=a(s/2),c=a(r/2),u=o(i/2),d=o(s/2),p=o(r/2);switch(n){case"XYZ":this._x=u*l*c+h*d*p,this._y=h*d*c-u*l*p,this._z=h*l*p+u*d*c,this._w=h*l*c-u*d*p;break;case"YXZ":this._x=u*l*c+h*d*p,this._y=h*d*c-u*l*p,this._z=h*l*p-u*d*c,this._w=h*l*c+u*d*p;break;case"ZXY":this._x=u*l*c-h*d*p,this._y=h*d*c+u*l*p,this._z=h*l*p+u*d*c,this._w=h*l*c-u*d*p;break;case"ZYX":this._x=u*l*c-h*d*p,this._y=h*d*c+u*l*p,this._z=h*l*p-u*d*c,this._w=h*l*c+u*d*p;break;case"YZX":this._x=u*l*c+h*d*p,this._y=h*d*c+u*l*p,this._z=h*l*p-u*d*c,this._w=h*l*c-u*d*p;break;case"XZY":this._x=u*l*c-h*d*p,this._y=h*d*c-u*l*p,this._z=h*l*p+u*d*c,this._w=h*l*c+u*d*p;break;default:ss("Quaternion: .setFromEuler() encountered an unknown order: "+n)}return!0===e&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],n=e[1],a=e[5],o=e[9],h=e[2],l=e[6],c=e[10],u=i+a+c;if(u>0){const t=.5/Math.sqrt(u+1);this._w=.25/t,this._x=(l-o)*t,this._y=(r-h)*t,this._z=(n-s)*t}else if(i>a&&i>c){const t=2*Math.sqrt(1+i-a-c);this._w=(l-o)/t,this._x=.25*t,this._y=(s+n)/t,this._z=(r+h)/t}else if(a>c){const t=2*Math.sqrt(1+a-i-c);this._w=(r-h)/t,this._x=(s+n)/t,this._y=.25*t,this._z=(o+l)/t}else{const t=2*Math.sqrt(1+c-i-a);this._w=(n-s)/t,this._x=(r+h)/t,this._y=(o+l)/t,this._z=.25*t}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ps(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(0===i)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return 0===t?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,n=t._w,a=e._x,o=e._y,h=e._z,l=e._w;return this._x=i*l+n*a+s*h-r*o,this._y=s*l+n*o+r*a-i*h,this._z=r*l+n*h+i*o-s*a,this._w=n*l-i*a-s*o-r*h,this._onChangeCallback(),this}slerp(t,e){if(e<=0)return this;if(e>=1)return this.copy(t);let i=t._x,s=t._y,r=t._z,n=t._w,a=this.dot(t);a<0&&(i=-i,s=-s,r=-r,n=-n,a=-a);let o=1-e;if(a<.9995){const t=Math.acos(a),h=Math.sin(t);o=Math.sin(o*t)/h,e=Math.sin(e*t)/h,this._x=this._x*o+i*e,this._y=this._y*o+s*e,this._z=this._z*o+r*e,this._w=this._w*o+n*e,this._onChangeCallback()}else this._x=this._x*o+i*e,this._y=this._y*o+s*e,this._z=this._z*o+r*e,this._w=this._w*o+n*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ws{constructor(t=0,e=0,i=0){ws.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return void 0===i&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ss.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ss.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,n=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*n,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*n,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*n,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,n=t.y,a=t.z,o=t.w,h=2*(n*s-a*i),l=2*(a*e-r*s),c=2*(r*i-n*e);return this.x=e+o*h+n*c-a*l,this.y=i+o*l+a*h-r*c,this.z=s+o*c+r*l-n*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ps(this.x,t.x,e.x),this.y=ps(this.y,t.y,e.y),this.z=ps(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ps(this.x,t,e),this.y=ps(this.y,t,e),this.z=ps(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ps(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,n=e.x,a=e.y,o=e.z;return this.x=s*o-r*a,this.y=r*n-i*o,this.z=i*a-s*n,this}projectOnVector(t){const e=t.lengthSq();if(0===e)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Ms.copy(this).projectOnVector(t),this.sub(Ms)}reflect(t){return this.sub(Ms.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(0===e)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ps(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,4*e)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,3*e)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=2*Math.random()-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ms=new ws,Ss=new vs;class _s{constructor(t,e,i,s,r,n,a,o,h){_s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],void 0!==t&&this.set(t,e,i,s,r,n,a,o,h)}set(t,e,i,s,r,n,a,o,h){const l=this.elements;return l[0]=t,l[1]=s,l[2]=a,l[3]=e,l[4]=r,l[5]=o,l[6]=i,l[7]=n,l[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,n=i[0],a=i[3],o=i[6],h=i[1],l=i[4],c=i[7],u=i[2],d=i[5],p=i[8],m=s[0],y=s[3],g=s[6],f=s[1],x=s[4],b=s[7],v=s[2],w=s[5],M=s[8];return r[0]=n*m+a*f+o*v,r[3]=n*y+a*x+o*w,r[6]=n*g+a*b+o*M,r[1]=h*m+l*f+c*v,r[4]=h*y+l*x+c*w,r[7]=h*g+l*b+c*M,r[2]=u*m+d*f+p*v,r[5]=u*y+d*x+p*w,r[8]=u*g+d*b+p*M,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],n=t[4],a=t[5],o=t[6],h=t[7],l=t[8];return e*n*l-e*a*h-i*r*l+i*a*o+s*r*h-s*n*o}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],n=t[4],a=t[5],o=t[6],h=t[7],l=t[8],c=l*n-a*h,u=a*o-l*r,d=h*r-n*o,p=e*c+i*u+s*d;if(0===p)return this.set(0,0,0,0,0,0,0,0,0);const m=1/p;return t[0]=c*m,t[1]=(s*h-l*i)*m,t[2]=(a*i-s*n)*m,t[3]=u*m,t[4]=(l*e-s*o)*m,t[5]=(s*r-a*e)*m,t[6]=d*m,t[7]=(i*o-h*e)*m,t[8]=(n*e-i*r)*m,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,n,a){const o=Math.cos(r),h=Math.sin(r);return this.set(i*o,i*h,-i*(o*n+h*a)+n+t,-s*h,s*o,-s*(-h*n+o*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(As.makeScale(t,e)),this}rotate(t){return this.premultiply(As.makeRotation(-t)),this}translate(t,e){return this.premultiply(As.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let t=0;t<9;t++)if(e[t]!==i[t])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return(new this.constructor).fromArray(this.elements)}}const As=new _s,Ts=(new _s).set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zs=(new _s).set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Cs(){const t={enabled:!0,workingColorSpace:ti,spaces:{},convert:function(t,e,i){return!1!==this.enabled&&e!==i&&e&&i?(this.spaces[e].transfer===ii&&(t.r=Bs(t.r),t.g=Bs(t.g),t.b=Bs(t.b)),this.spaces[e].primaries!==this.spaces[i].primaries&&(t.applyMatrix3(this.spaces[e].toXYZ),t.applyMatrix3(this.spaces[i].fromXYZ)),this.spaces[i].transfer===ii&&(t.r=ks(t.r),t.g=ks(t.g),t.b=ks(t.b)),t):t},workingToColorSpace:function(t,e){return this.convert(t,this.workingColorSpace,e)},colorSpaceToWorking:function(t,e){return this.convert(t,e,this.workingColorSpace)},getPrimaries:function(t){return this.spaces[t].primaries},getTransfer:function(t){return""===t?ei:this.spaces[t].transfer},getToneMappingMode:function(t){return this.spaces[t].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(t,e=this.workingColorSpace){return t.fromArray(this.spaces[e].luminanceCoefficients)},define:function(t){Object.assign(this.spaces,t)},_getMatrix:function(t,e,i){return t.copy(this.spaces[e].toXYZ).multiply(this.spaces[i].fromXYZ)},_getDrawingBufferColorSpace:function(t){return this.spaces[t].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(t=this.workingColorSpace){return this.spaces[t].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(e,i){return ns("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(e,i)},toWorkingColorSpace:function(e,i){return ns("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(e,i)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return t.define({[ti]:{primaries:e,whitePoint:s,transfer:ei,toXYZ:Ts,fromXYZ:zs,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Ke},outputColorSpaceConfig:{drawingBufferColorSpace:Ke}},[Ke]:{primaries:e,whitePoint:s,transfer:ii,toXYZ:Ts,fromXYZ:zs,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Ke}}}),t}const Is=Cs();function Bs(t){return t<.04045?.0773993808*t:Math.pow(.9478672986*t+.0521327014,2.4)}function ks(t){return t<.0031308?12.92*t:1.055*Math.pow(t,.41666)-.055}let Os;class Ps{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src))return t.src;if("undefined"==typeof HTMLCanvasElement)return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{void 0===Os&&(Os=Gi("canvas")),Os.width=t.width,Os.height=t.height;const e=Os.getContext("2d");t instanceof ImageData?e.putImageData(t,0,0):e.drawImage(t,0,0,t.width,t.height),i=Os}return i.toDataURL(e)}static sRGBToLinear(t){if("undefined"!=typeof HTMLImageElement&&t instanceof HTMLImageElement||"undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement||"undefined"!=typeof ImageBitmap&&t instanceof ImageBitmap){const e=Gi("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let t=0;t<r.length;t++)r[t]=255*Bs(r[t]/255);return i.putImageData(s,0,0),e}if(t.data){const e=t.data.slice(0);for(let t=0;t<e.length;t++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[t]=Math.floor(255*Bs(e[t]/255)):e[t]=Bs(e[t]);return{data:e,width:t.width,height:t.height}}return ss("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Rs=0;class Ns{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Rs++}),this.uuid=ds(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return"undefined"!=typeof HTMLVideoElement&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):"undefined"!=typeof VideoFrame&&e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):null!==e?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){!0===t&&this.version++}toJSON(t){const e=void 0===t||"string"==typeof t;if(!e&&void 0!==t.images[this.uuid])return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(null!==s){let t;if(Array.isArray(s)){t=[];for(let e=0,i=s.length;e<i;e++)s[e].isDataTexture?t.push(Vs(s[e].image)):t.push(Vs(s[e]))}else t=Vs(s);i.url=t}return e||(t.images[this.uuid]=i),i}}function Vs(t){return"undefined"!=typeof HTMLImageElement&&t instanceof HTMLImageElement||"undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement||"undefined"!=typeof ImageBitmap&&t instanceof ImageBitmap?Ps.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(ss("Texture: Unable to serialize Texture."),{})}let Fs=0;const Ls=new ws;class Es extends os{constructor(t=Es.DEFAULT_IMAGE,e=Es.DEFAULT_MAPPING,i=1001,s=1001,r=1006,n=1008,a=1023,o=1009,h=Es.DEFAULT_ANISOTROPY,l=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fs++}),this.uuid=ds(),this.name="",this.source=new Ns(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=n,this.anisotropy=h,this.format=a,this.internalFormat=null,this.type=o,this.offset=new bs(0,0),this.repeat=new bs(1,1),this.center=new bs(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new _s,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=l,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ls).x}get height(){return this.source.getSize(Ls).y}get depth(){return this.source.getSize(Ls).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return(new this.constructor).copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(void 0===i){ss(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];void 0!==s?s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i:ss(`Texture.setValues(): property '${e}' does not exist.`)}}toJSON(t){const e=void 0===t||"string"==typeof t;if(!e&&void 0!==t.textures[this.uuid])return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ot)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case pt:t.x=t.x-Math.floor(t.x);break;case mt:t.x=t.x<0?0:1;break;case yt:1===Math.abs(Math.floor(t.x)%2)?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x)}if(t.y<0||t.y>1)switch(this.wrapT){case pt:t.y=t.y-Math.floor(t.y);break;case mt:t.y=t.y<0?0:1;break;case yt:1===Math.abs(Math.floor(t.y)%2)?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y)}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){!0===t&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){!0===t&&this.pmremVersion++}}Es.DEFAULT_IMAGE=null,Es.DEFAULT_MAPPING=ot,Es.DEFAULT_ANISOTROPY=1;class js{constructor(t=0,e=0,i=0,s=1){js.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=void 0!==t.w?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,n=t.elements;return this.x=n[0]*e+n[4]*i+n[8]*s+n[12]*r,this.y=n[1]*e+n[5]*i+n[9]*s+n[13]*r,this.z=n[2]*e+n[6]*i+n[10]*s+n[14]*r,this.w=n[3]*e+n[7]*i+n[11]*s+n[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const n=.01,a=.1,o=t.elements,h=o[0],l=o[4],c=o[8],u=o[1],d=o[5],p=o[9],m=o[2],y=o[6],g=o[10];if(Math.abs(l-u)<n&&Math.abs(c-m)<n&&Math.abs(p-y)<n){if(Math.abs(l+u)<a&&Math.abs(c+m)<a&&Math.abs(p+y)<a&&Math.abs(h+d+g-3)<a)return this.set(1,0,0,0),this;e=Math.PI;const t=(h+1)/2,o=(d+1)/2,f=(g+1)/2,x=(l+u)/4,b=(c+m)/4,v=(p+y)/4;return t>o&&t>f?t<n?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(t),s=x/i,r=b/i):o>f?o<n?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(o),i=x/s,r=v/s):f<n?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(f),i=b/r,s=v/r),this.set(i,s,r,e),this}let f=Math.sqrt((y-p)*(y-p)+(c-m)*(c-m)+(u-l)*(u-l));return Math.abs(f)<.001&&(f=1),this.x=(y-p)/f,this.y=(c-m)/f,this.z=(u-l)/f,this.w=Math.acos((h+d+g-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ps(this.x,t.x,e.x),this.y=ps(this.y,t.y,e.y),this.z=ps(this.z,t.z,e.z),this.w=ps(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ps(this.x,t,e),this.y=ps(this.y,t,e),this.z=ps(this.z,t,e),this.w=ps(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ps(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ds extends os{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new js(0,0,t,e),this.scissorTest=!1,this.viewport=new js(0,0,t,e);const s={width:t,height:e,depth:i.depth},r=new Es(s);this.textures=[];const n=i.count;for(let t=0;t<n;t++)this.textures[t]=r.clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:wt,generateMipmaps:!1,flipY:!1,internalFormat:null};void 0!==t.mapping&&(e.mapping=t.mapping),void 0!==t.wrapS&&(e.wrapS=t.wrapS),void 0!==t.wrapT&&(e.wrapT=t.wrapT),void 0!==t.wrapR&&(e.wrapR=t.wrapR),void 0!==t.magFilter&&(e.magFilter=t.magFilter),void 0!==t.minFilter&&(e.minFilter=t.minFilter),void 0!==t.format&&(e.format=t.format),void 0!==t.type&&(e.type=t.type),void 0!==t.anisotropy&&(e.anisotropy=t.anisotropy),void 0!==t.colorSpace&&(e.colorSpace=t.colorSpace),void 0!==t.flipY&&(e.flipY=t.flipY),void 0!==t.generateMipmaps&&(e.generateMipmaps=t.generateMipmaps),void 0!==t.internalFormat&&(e.internalFormat=t.internalFormat);for(let t=0;t<this.textures.length;t++){this.textures[t].setValues(e)}}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){null!==this._depthTexture&&(this._depthTexture.renderTarget=null),null!==t&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,!0!==this.textures[s].isData3DTexture&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return(new this.constructor).copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new Ns(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,null!==t.depthTexture&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Us extends Ds{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Ws extends Es{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=gt,this.minFilter=gt,this.wrapR=mt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class qs extends Us{constructor(t=1,e=1,i=1,s={}){super(t,e,s),this.isWebGLArrayRenderTarget=!0,this.depth=i,this.texture=new Ws(null,t,e,i),this._setTextureOptions(s),this.texture.isRenderTargetTexture=!0}}class Js extends Es{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=gt,this.minFilter=gt,this.wrapR=mt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xs extends Us{constructor(t=1,e=1,i=1,s={}){super(t,e,s),this.isWebGL3DRenderTarget=!0,this.depth=i,this.texture=new Js(null,t,e,i),this._setTextureOptions(s),this.texture.isRenderTargetTexture=!0}}class Ys{constructor(t=new ws(1/0,1/0,1/0),e=new ws(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Hs.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Hs.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Hs.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return(new this.constructor).copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(void 0!==i){const s=i.getAttribute("position");if(!0===e&&void 0!==s&&!0!==t.isInstancedMesh)for(let e=0,i=s.count;e<i;e++)!0===t.isMesh?t.getVertexPosition(e,Hs):Hs.fromBufferAttribute(s,e),Hs.applyMatrix4(t.matrixWorld),this.expandByPoint(Hs);else void 0!==t.boundingBox?(null===t.boundingBox&&t.computeBoundingBox(),Gs.copy(t.boundingBox)):(null===i.boundingBox&&i.computeBoundingBox(),Gs.copy(i.boundingBox)),Gs.applyMatrix4(t.matrixWorld),this.union(Gs)}const s=t.children;for(let t=0,i=s.length;t<i;t++)this.expandByObject(s[t],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Hs),Hs.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(sr),rr.subVectors(this.max,sr),$s.subVectors(t.a,sr),Qs.subVectors(t.b,sr),Ks.subVectors(t.c,sr),tr.subVectors(Qs,$s),er.subVectors(Ks,Qs),ir.subVectors($s,Ks);let e=[0,-tr.z,tr.y,0,-er.z,er.y,0,-ir.z,ir.y,tr.z,0,-tr.x,er.z,0,-er.x,ir.z,0,-ir.x,-tr.y,tr.x,0,-er.y,er.x,0,-ir.y,ir.x,0];return!!or(e,$s,Qs,Ks,rr)&&(e=[1,0,0,0,1,0,0,0,1],!!or(e,$s,Qs,Ks,rr)&&(nr.crossVectors(tr,er),e=[nr.x,nr.y,nr.z],or(e,$s,Qs,Ks,rr)))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Hs).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=.5*this.getSize(Hs).length()),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()||(Zs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Zs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Zs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Zs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Zs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Zs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Zs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Zs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Zs)),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Zs=[new ws,new ws,new ws,new ws,new ws,new ws,new ws,new ws],Hs=new ws,Gs=new Ys,$s=new ws,Qs=new ws,Ks=new ws,tr=new ws,er=new ws,ir=new ws,sr=new ws,rr=new ws,nr=new ws,ar=new ws;function or(t,e,i,s,r){for(let n=0,a=t.length-3;n<=a;n+=3){ar.fromArray(t,n);const a=r.x*Math.abs(ar.x)+r.y*Math.abs(ar.y)+r.z*Math.abs(ar.z),o=e.dot(ar),h=i.dot(ar),l=s.dot(ar);if(Math.max(-Math.max(o,h,l),Math.min(o,h,l))>a)return!1}return!0}const hr=new Ys,lr=new ws,cr=new ws;class ur{constructor(t=new ws,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;void 0!==e?i.copy(e):hr.setFromPoints(t).getCenter(i);let s=0;for(let e=0,r=t.length;e<r;e++)s=Math.max(s,i.distanceToSquared(t[e]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;lr.subVectors(t,this.center);const e=lr.lengthSq();if(e>this.radius*this.radius){const t=Math.sqrt(e),i=.5*(t-this.radius);this.center.addScaledVector(lr,i/t),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(!0===this.center.equals(t.center)?this.radius=Math.max(this.radius,t.radius):(cr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(lr.copy(t.center).add(cr)),this.expandByPoint(lr.copy(t.center).sub(cr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return(new this.constructor).copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const dr=new ws,pr=new ws,mr=new ws,yr=new ws,gr=new ws,fr=new ws,xr=new ws;class br{constructor(t=new ws,e=new ws(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,dr)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=dr.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(dr.copy(this.origin).addScaledVector(this.direction,e),dr.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){pr.copy(t).add(e).multiplyScalar(.5),mr.copy(e).sub(t).normalize(),yr.copy(this.origin).sub(pr);const r=.5*t.distanceTo(e),n=-this.direction.dot(mr),a=yr.dot(this.direction),o=-yr.dot(mr),h=yr.lengthSq(),l=Math.abs(1-n*n);let c,u,d,p;if(l>0)if(c=n*o-a,u=n*a-o,p=r*l,c>=0)if(u>=-p)if(u<=p){const t=1/l;c*=t,u*=t,d=c*(c+n*u+2*a)+u*(n*c+u+2*o)+h}else u=r,c=Math.max(0,-(n*u+a)),d=-c*c+u*(u+2*o)+h;else u=-r,c=Math.max(0,-(n*u+a)),d=-c*c+u*(u+2*o)+h;else u<=-p?(c=Math.max(0,-(-n*r+a)),u=c>0?-r:Math.min(Math.max(-r,-o),r),d=-c*c+u*(u+2*o)+h):u<=p?(c=0,u=Math.min(Math.max(-r,-o),r),d=u*(u+2*o)+h):(c=Math.max(0,-(n*r+a)),u=c>0?r:Math.min(Math.max(-r,-o),r),d=-c*c+u*(u+2*o)+h);else u=n>0?-r:r,c=Math.max(0,-(n*u+a)),d=-c*c+u*(u+2*o)+h;return i&&i.copy(this.origin).addScaledVector(this.direction,c),s&&s.copy(pr).addScaledVector(mr,u),d}intersectSphere(t,e){dr.subVectors(t.center,this.origin);const i=dr.dot(this.direction),s=dr.dot(dr)-i*i,r=t.radius*t.radius;if(s>r)return null;const n=Math.sqrt(r-s),a=i-n,o=i+n;return o<0?null:a<0?this.at(o,e):this.at(a,e)}intersectsSphere(t){return!(t.radius<0)&&this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(0===e)return 0===t.distanceToPoint(this.origin)?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return null===i?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);if(0===e)return!0;return t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,n,a,o;const h=1/this.direction.x,l=1/this.direction.y,c=1/this.direction.z,u=this.origin;return h>=0?(i=(t.min.x-u.x)*h,s=(t.max.x-u.x)*h):(i=(t.max.x-u.x)*h,s=(t.min.x-u.x)*h),l>=0?(r=(t.min.y-u.y)*l,n=(t.max.y-u.y)*l):(r=(t.max.y-u.y)*l,n=(t.min.y-u.y)*l),i>n||r>s?null:((r>i||isNaN(i))&&(i=r),(n<s||isNaN(s))&&(s=n),c>=0?(a=(t.min.z-u.z)*c,o=(t.max.z-u.z)*c):(a=(t.max.z-u.z)*c,o=(t.min.z-u.z)*c),i>o||a>s?null:((a>i||i!=i)&&(i=a),(o<s||s!=s)&&(s=o),s<0?null:this.at(i>=0?i:s,e)))}intersectsBox(t){return null!==this.intersectBox(t,dr)}intersectTriangle(t,e,i,s,r){gr.subVectors(e,t),fr.subVectors(i,t),xr.crossVectors(gr,fr);let n,a=this.direction.dot(xr);if(a>0){if(s)return null;n=1}else{if(!(a<0))return null;n=-1,a=-a}yr.subVectors(this.origin,t);const o=n*this.direction.dot(fr.crossVectors(yr,fr));if(o<0)return null;const h=n*this.direction.dot(gr.cross(yr));if(h<0)return null;if(o+h>a)return null;const l=-n*yr.dot(xr);return l<0?null:this.at(l/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return(new this.constructor).copy(this)}}class vr{constructor(t,e,i,s,r,n,a,o,h,l,c,u,d,p,m,y){vr.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],void 0!==t&&this.set(t,e,i,s,r,n,a,o,h,l,c,u,d,p,m,y)}set(t,e,i,s,r,n,a,o,h,l,c,u,d,p,m,y){const g=this.elements;return g[0]=t,g[4]=e,g[8]=i,g[12]=s,g[1]=r,g[5]=n,g[9]=a,g[13]=o,g[2]=h,g[6]=l,g[10]=c,g[14]=u,g[3]=d,g[7]=p,g[11]=m,g[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return(new vr).fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return 0===this.determinant()?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(0===t.determinant())return this.identity();const e=this.elements,i=t.elements,s=1/wr.setFromMatrixColumn(t,0).length(),r=1/wr.setFromMatrixColumn(t,1).length(),n=1/wr.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*n,e[9]=i[9]*n,e[10]=i[10]*n,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,n=Math.cos(i),a=Math.sin(i),o=Math.cos(s),h=Math.sin(s),l=Math.cos(r),c=Math.sin(r);if("XYZ"===t.order){const t=n*l,i=n*c,s=a*l,r=a*c;e[0]=o*l,e[4]=-o*c,e[8]=h,e[1]=i+s*h,e[5]=t-r*h,e[9]=-a*o,e[2]=r-t*h,e[6]=s+i*h,e[10]=n*o}else if("YXZ"===t.order){const t=o*l,i=o*c,s=h*l,r=h*c;e[0]=t+r*a,e[4]=s*a-i,e[8]=n*h,e[1]=n*c,e[5]=n*l,e[9]=-a,e[2]=i*a-s,e[6]=r+t*a,e[10]=n*o}else if("ZXY"===t.order){const t=o*l,i=o*c,s=h*l,r=h*c;e[0]=t-r*a,e[4]=-n*c,e[8]=s+i*a,e[1]=i+s*a,e[5]=n*l,e[9]=r-t*a,e[2]=-n*h,e[6]=a,e[10]=n*o}else if("ZYX"===t.order){const t=n*l,i=n*c,s=a*l,r=a*c;e[0]=o*l,e[4]=s*h-i,e[8]=t*h+r,e[1]=o*c,e[5]=r*h+t,e[9]=i*h-s,e[2]=-h,e[6]=a*o,e[10]=n*o}else if("YZX"===t.order){const t=n*o,i=n*h,s=a*o,r=a*h;e[0]=o*l,e[4]=r-t*c,e[8]=s*c+i,e[1]=c,e[5]=n*l,e[9]=-a*l,e[2]=-h*l,e[6]=i*c+s,e[10]=t-r*c}else if("XZY"===t.order){const t=n*o,i=n*h,s=a*o,r=a*h;e[0]=o*l,e[4]=-c,e[8]=h*l,e[1]=t*c+r,e[5]=n*l,e[9]=i*c-s,e[2]=s*c-i,e[6]=a*l,e[10]=r*c+t}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Sr,t,_r)}lookAt(t,e,i){const s=this.elements;return zr.subVectors(t,e),0===zr.lengthSq()&&(zr.z=1),zr.normalize(),Ar.crossVectors(i,zr),0===Ar.lengthSq()&&(1===Math.abs(i.z)?zr.x+=1e-4:zr.z+=1e-4,zr.normalize(),Ar.crossVectors(i,zr)),Ar.normalize(),Tr.crossVectors(zr,Ar),s[0]=Ar.x,s[4]=Tr.x,s[8]=zr.x,s[1]=Ar.y,s[5]=Tr.y,s[9]=zr.y,s[2]=Ar.z,s[6]=Tr.z,s[10]=zr.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,n=i[0],a=i[4],o=i[8],h=i[12],l=i[1],c=i[5],u=i[9],d=i[13],p=i[2],m=i[6],y=i[10],g=i[14],f=i[3],x=i[7],b=i[11],v=i[15],w=s[0],M=s[4],S=s[8],_=s[12],A=s[1],T=s[5],z=s[9],C=s[13],I=s[2],B=s[6],k=s[10],O=s[14],P=s[3],R=s[7],N=s[11],V=s[15];return r[0]=n*w+a*A+o*I+h*P,r[4]=n*M+a*T+o*B+h*R,r[8]=n*S+a*z+o*k+h*N,r[12]=n*_+a*C+o*O+h*V,r[1]=l*w+c*A+u*I+d*P,r[5]=l*M+c*T+u*B+d*R,r[9]=l*S+c*z+u*k+d*N,r[13]=l*_+c*C+u*O+d*V,r[2]=p*w+m*A+y*I+g*P,r[6]=p*M+m*T+y*B+g*R,r[10]=p*S+m*z+y*k+g*N,r[14]=p*_+m*C+y*O+g*V,r[3]=f*w+x*A+b*I+v*P,r[7]=f*M+x*T+b*B+v*R,r[11]=f*S+x*z+b*k+v*N,r[15]=f*_+x*C+b*O+v*V,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],n=t[1],a=t[5],o=t[9],h=t[13],l=t[2],c=t[6],u=t[10],d=t[14],p=t[3],m=t[7],y=t[11],g=t[15],f=o*d-h*u,x=a*d-h*c,b=a*u-o*c,v=n*d-h*l,w=n*u-o*l,M=n*c-a*l;return e*(m*f-y*x+g*b)-i*(p*f-y*v+g*w)+s*(p*x-m*v+g*M)-r*(p*b-m*w+y*M)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],n=t[4],a=t[5],o=t[6],h=t[7],l=t[8],c=t[9],u=t[10],d=t[11],p=t[12],m=t[13],y=t[14],g=t[15],f=c*y*h-m*u*h+m*o*d-a*y*d-c*o*g+a*u*g,x=p*u*h-l*y*h-p*o*d+n*y*d+l*o*g-n*u*g,b=l*m*h-p*c*h+p*a*d-n*m*d-l*a*g+n*c*g,v=p*c*o-l*m*o-p*a*u+n*m*u+l*a*y-n*c*y,w=e*f+i*x+s*b+r*v;if(0===w)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const M=1/w;return t[0]=f*M,t[1]=(m*u*r-c*y*r-m*s*d+i*y*d+c*s*g-i*u*g)*M,t[2]=(a*y*r-m*o*r+m*s*h-i*y*h-a*s*g+i*o*g)*M,t[3]=(c*o*r-a*u*r-c*s*h+i*u*h+a*s*d-i*o*d)*M,t[4]=x*M,t[5]=(l*y*r-p*u*r+p*s*d-e*y*d-l*s*g+e*u*g)*M,t[6]=(p*o*r-n*y*r-p*s*h+e*y*h+n*s*g-e*o*g)*M,t[7]=(n*u*r-l*o*r+l*s*h-e*u*h-n*s*d+e*o*d)*M,t[8]=b*M,t[9]=(p*c*r-l*m*r-p*i*d+e*m*d+l*i*g-e*c*g)*M,t[10]=(n*m*r-p*a*r+p*i*h-e*m*h-n*i*g+e*a*g)*M,t[11]=(l*a*r-n*c*r-l*i*h+e*c*h+n*i*d-e*a*d)*M,t[12]=v*M,t[13]=(l*m*s-p*c*s+p*i*u-e*m*u-l*i*y+e*c*y)*M,t[14]=(p*a*s-n*m*s-p*i*o+e*m*o+n*i*y-e*a*y)*M,t[15]=(n*c*s-l*a*s+l*i*o-e*c*o-n*i*u+e*a*u)*M,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,n=t.x,a=t.y,o=t.z,h=r*n,l=r*a;return this.set(h*n+i,h*a-s*o,h*o+s*a,0,h*a+s*o,l*a+i,l*o-s*n,0,h*o-s*a,l*o+s*n,r*o*o+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,n){return this.set(1,i,r,0,t,1,n,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,n=e._y,a=e._z,o=e._w,h=r+r,l=n+n,c=a+a,u=r*h,d=r*l,p=r*c,m=n*l,y=n*c,g=a*c,f=o*h,x=o*l,b=o*c,v=i.x,w=i.y,M=i.z;return s[0]=(1-(m+g))*v,s[1]=(d+b)*v,s[2]=(p-x)*v,s[3]=0,s[4]=(d-b)*w,s[5]=(1-(u+g))*w,s[6]=(y+f)*w,s[7]=0,s[8]=(p+x)*M,s[9]=(y-f)*M,s[10]=(1-(u+m))*M,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;if(t.x=s[12],t.y=s[13],t.z=s[14],0===this.determinant())return i.set(1,1,1),e.identity(),this;let r=wr.set(s[0],s[1],s[2]).length();const n=wr.set(s[4],s[5],s[6]).length(),a=wr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),Mr.copy(this);const o=1/r,h=1/n,l=1/a;return Mr.elements[0]*=o,Mr.elements[1]*=o,Mr.elements[2]*=o,Mr.elements[4]*=h,Mr.elements[5]*=h,Mr.elements[6]*=h,Mr.elements[8]*=l,Mr.elements[9]*=l,Mr.elements[10]*=l,e.setFromRotationMatrix(Mr),i.x=r,i.y=n,i.z=a,this}makePerspective(t,e,i,s,r,n,a=2e3,o=!1){const h=this.elements,l=2*r/(e-t),c=2*r/(i-s),u=(e+t)/(e-t),d=(i+s)/(i-s);let p,m;if(o)p=r/(n-r),m=n*r/(n-r);else if(a===Di)p=-(n+r)/(n-r),m=-2*n*r/(n-r);else{if(a!==Ui)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);p=-n/(n-r),m=-n*r/(n-r)}return h[0]=l,h[4]=0,h[8]=u,h[12]=0,h[1]=0,h[5]=c,h[9]=d,h[13]=0,h[2]=0,h[6]=0,h[10]=p,h[14]=m,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,e,i,s,r,n,a=2e3,o=!1){const h=this.elements,l=2/(e-t),c=2/(i-s),u=-(e+t)/(e-t),d=-(i+s)/(i-s);let p,m;if(o)p=1/(n-r),m=n/(n-r);else if(a===Di)p=-2/(n-r),m=-(n+r)/(n-r);else{if(a!==Ui)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);p=-1/(n-r),m=-r/(n-r)}return h[0]=l,h[4]=0,h[8]=0,h[12]=u,h[1]=0,h[5]=c,h[9]=0,h[13]=d,h[2]=0,h[6]=0,h[10]=p,h[14]=m,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let t=0;t<16;t++)if(e[t]!==i[t])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const wr=new ws,Mr=new vr,Sr=new ws(0,0,0),_r=new ws(1,1,1),Ar=new ws,Tr=new ws,zr=new ws,Cr=new vr,Ir=new vs;class Br{constructor(t=0,e=0,i=0,s=Br.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],n=s[4],a=s[8],o=s[1],h=s[5],l=s[9],c=s[2],u=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ps(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-l,d),this._z=Math.atan2(-n,r)):(this._x=Math.atan2(u,h),this._z=0);break;case"YXZ":this._x=Math.asin(-ps(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(o,h)):(this._y=Math.atan2(-c,r),this._z=0);break;case"ZXY":this._x=Math.asin(ps(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-c,d),this._z=Math.atan2(-n,h)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-ps(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-n,h));break;case"YZX":this._z=Math.asin(ps(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,h),this._y=Math.atan2(-c,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ps(n,-1,1)),Math.abs(n)<.9999999?(this._x=Math.atan2(u,h),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-l,d),this._y=0);break;default:ss("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,!0===i&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Cr.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Cr,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ir.setFromEuler(this),this.setFromQuaternion(Ir,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],void 0!==t[3]&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Br.DEFAULT_ORDER="XYZ";class kr{constructor(){this.mask=1}set(t){this.mask=1<<t>>>0}enable(t){this.mask|=1<<t}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t}disable(t){this.mask&=~(1<<t)}disableAll(){this.mask=0}test(t){return 0!==(this.mask&t.mask)}isEnabled(t){return!!(this.mask&1<<t)}}let Or=0;const Pr=new ws,Rr=new vs,Nr=new vr,Vr=new ws,Fr=new ws,Lr=new ws,Er=new vs,jr=new ws(1,0,0),Dr=new ws(0,1,0),Ur=new ws(0,0,1),Wr={type:"added"},qr={type:"removed"},Jr={type:"childadded",child:null},Xr={type:"childremoved",child:null};class Yr extends os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Or++}),this.uuid=ds(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Yr.DEFAULT_UP.clone();const t=new ws,e=new Br,i=new vs,s=new ws(1,1,1);e._onChange(function(){i.setFromEuler(e,!1)}),i._onChange(function(){e.setFromQuaternion(i,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new vr},normalMatrix:{value:new _s}}),this.matrix=new vr,this.matrixWorld=new vr,this.matrixAutoUpdate=Yr.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Yr.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Rr.setFromAxisAngle(t,e),this.quaternion.multiply(Rr),this}rotateOnWorldAxis(t,e){return Rr.setFromAxisAngle(t,e),this.quaternion.premultiply(Rr),this}rotateX(t){return this.rotateOnAxis(jr,t)}rotateY(t){return this.rotateOnAxis(Dr,t)}rotateZ(t){return this.rotateOnAxis(Ur,t)}translateOnAxis(t,e){return Pr.copy(t).applyQuaternion(this.quaternion),this.position.add(Pr.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(jr,t)}translateY(t){return this.translateOnAxis(Dr,t)}translateZ(t){return this.translateOnAxis(Ur,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Nr.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Vr.copy(t):Vr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Fr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nr.lookAt(Fr,Vr,this.up):Nr.lookAt(Vr,Fr,this.up),this.quaternion.setFromRotationMatrix(Nr),s&&(Nr.extractRotation(s.matrixWorld),Rr.setFromRotationMatrix(Nr),this.quaternion.premultiply(Rr.invert()))}add(t){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return t===this?(rs("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Wr),Jr.child=t,this.dispatchEvent(Jr),Jr.child=null):rs("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.remove(arguments[t]);return this}const e=this.children.indexOf(t);return-1!==e&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(qr),Xr.child=t,this.dispatchEvent(Xr),Xr.child=null),this}removeFromParent(){const t=this.parent;return null!==t&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Nr.copy(this.matrixWorld).invert(),null!==t.parent&&(t.parent.updateWorldMatrix(!0,!1),Nr.multiply(t.parent.matrixWorld)),t.applyMatrix4(Nr),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Wr),Jr.child=t,this.dispatchEvent(Jr),Jr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const s=this.children[i].getObjectByProperty(t,e);if(void 0!==s)return s}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,n=s.length;r<n;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fr,t,Lr),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fr,Er,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(!1===this.visible)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;null!==e&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(!0===this.matrixWorldAutoUpdate&&(null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++){e[i].updateMatrixWorld(t)}}updateWorldMatrix(t,e){const i=this.parent;if(!0===t&&null!==i&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),!0===this.matrixWorldAutoUpdate&&(null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),!0===e){const t=this.children;for(let e=0,i=t.length;e<i;e++){t[e].updateWorldMatrix(!1,!0)}}}toJSON(t){const e=void 0===t||"string"==typeof t,i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};function r(e,i){return void 0===e[i.uuid]&&(e[i.uuid]=i.toJSON(t)),i.uuid}if(s.uuid=this.uuid,s.type=this.type,""!==this.name&&(s.name=this.name),!0===this.castShadow&&(s.castShadow=!0),!0===this.receiveShadow&&(s.receiveShadow=!0),!1===this.visible&&(s.visible=!1),!1===this.frustumCulled&&(s.frustumCulled=!1),0!==this.renderOrder&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),!1===this.matrixAutoUpdate&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),null!==this.instanceColor&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox?t.boundingBox.toJSON():void 0,boundingSphere:t.boundingSphere?t.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(t=>({...t})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),null!==this._colorsTexture&&(s.colorsTexture=this._colorsTexture.toJSON(t)),null!==this.boundingSphere&&(s.boundingSphere=this.boundingSphere.toJSON()),null!==this.boundingBox&&(s.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&!0!==this.environment.isRenderTargetTexture&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const e=this.geometry.parameters;if(void 0!==e&&void 0!==e.shapes){const i=e.shapes;if(Array.isArray(i))for(let e=0,s=i.length;e<s;e++){const s=i[e];r(t.shapes,s)}else r(t.shapes,i)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),void 0!==this.skeleton&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),void 0!==this.material)if(Array.isArray(this.material)){const e=[];for(let i=0,s=this.material.length;i<s;i++)e.push(r(t.materials,this.material[i]));s.material=e}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let e=0;e<this.children.length;e++)s.children.push(this.children[e].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let e=0;e<this.animations.length;e++){const i=this.animations[e];s.animations.push(r(t.animations,i))}}if(e){const e=n(t.geometries),s=n(t.materials),r=n(t.textures),a=n(t.images),o=n(t.shapes),h=n(t.skeletons),l=n(t.animations),c=n(t.nodes);e.length>0&&(i.geometries=e),s.length>0&&(i.materials=s),r.length>0&&(i.textures=r),a.length>0&&(i.images=a),o.length>0&&(i.shapes=o),h.length>0&&(i.skeletons=h),l.length>0&&(i.animations=l),c.length>0&&(i.nodes=c)}return i.object=s,i;function n(t){const e=[];for(const i in t){const s=t[i];delete s.metadata,e.push(s)}return e}}clone(t){return(new this.constructor).copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),!0===e)for(let e=0;e<t.children.length;e++){const i=t.children[e];this.add(i.clone())}return this}}Yr.DEFAULT_UP=new ws(0,1,0),Yr.DEFAULT_MATRIX_AUTO_UPDATE=!0,Yr.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Zr=new ws,Hr=new ws,Gr=new ws,$r=new ws,Qr=new ws,Kr=new ws,tn=new ws,en=new ws,sn=new ws,rn=new ws,nn=new js,an=new js,on=new js;class hn{constructor(t=new ws,e=new ws,i=new ws){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Zr.subVectors(t,e),s.cross(Zr);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Zr.subVectors(s,e),Hr.subVectors(i,e),Gr.subVectors(t,e);const n=Zr.dot(Zr),a=Zr.dot(Hr),o=Zr.dot(Gr),h=Hr.dot(Hr),l=Hr.dot(Gr),c=n*h-a*a;if(0===c)return r.set(0,0,0),null;const u=1/c,d=(h*o-a*l)*u,p=(n*l-a*o)*u;return r.set(1-d-p,p,d)}static containsPoint(t,e,i,s){return null!==this.getBarycoord(t,e,i,s,$r)&&($r.x>=0&&$r.y>=0&&$r.x+$r.y<=1)}static getInterpolation(t,e,i,s,r,n,a,o){return null===this.getBarycoord(t,e,i,s,$r)?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(r,$r.x),o.addScaledVector(n,$r.y),o.addScaledVector(a,$r.z),o)}static getInterpolatedAttribute(t,e,i,s,r,n){return nn.setScalar(0),an.setScalar(0),on.setScalar(0),nn.fromBufferAttribute(t,e),an.fromBufferAttribute(t,i),on.fromBufferAttribute(t,s),n.setScalar(0),n.addScaledVector(nn,r.x),n.addScaledVector(an,r.y),n.addScaledVector(on,r.z),n}static isFrontFacing(t,e,i,s){return Zr.subVectors(i,e),Hr.subVectors(t,e),Zr.cross(Hr).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return(new this.constructor).copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Zr.subVectors(this.c,this.b),Hr.subVectors(this.a,this.b),.5*Zr.cross(Hr).length()}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return hn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return hn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let n,a;Qr.subVectors(s,i),Kr.subVectors(r,i),en.subVectors(t,i);const o=Qr.dot(en),h=Kr.dot(en);if(o<=0&&h<=0)return e.copy(i);sn.subVectors(t,s);const l=Qr.dot(sn),c=Kr.dot(sn);if(l>=0&&c<=l)return e.copy(s);const u=o*c-l*h;if(u<=0&&o>=0&&l<=0)return n=o/(o-l),e.copy(i).addScaledVector(Qr,n);rn.subVectors(t,r);const d=Qr.dot(rn),p=Kr.dot(rn);if(p>=0&&d<=p)return e.copy(r);const m=d*h-o*p;if(m<=0&&h>=0&&p<=0)return a=h/(h-p),e.copy(i).addScaledVector(Kr,a);const y=l*p-d*c;if(y<=0&&c-l>=0&&d-p>=0)return tn.subVectors(r,s),a=(c-l)/(c-l+(d-p)),e.copy(s).addScaledVector(tn,a);const g=1/(y+m+u);return n=m*g,a=u*g,e.copy(i).addScaledVector(Qr,n).addScaledVector(Kr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ln={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},cn={h:0,s:0,l:0},un={h:0,s:0,l:0};function dn(t,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?t+6*(e-t)*i:i<.5?e:i<2/3?t+6*(e-t)*(2/3-i):t}class pn{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(void 0===e&&void 0===i){const e=t;e&&e.isColor?this.copy(e):"number"==typeof e?this.setHex(e):"string"==typeof e&&this.setStyle(e)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(255&t)/255,Is.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=Is.workingColorSpace){return this.r=t,this.g=e,this.b=i,Is.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=Is.workingColorSpace){if(t=ms(t,1),e=ps(e,0,1),i=ps(i,0,1),0===e)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,r=2*i-s;this.r=dn(r,s,t+1/3),this.g=dn(r,s,t),this.b=dn(r,s,t-1/3)}return Is.colorSpaceToWorking(this,s),this}setStyle(t,e=Ke){function i(e){void 0!==e&&parseFloat(e)<1&&ss("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const n=s[1],a=s[2];switch(n){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:ss("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const i=s[1],r=i.length;if(3===r)return this.setRGB(parseInt(i.charAt(0),16)/15,parseInt(i.charAt(1),16)/15,parseInt(i.charAt(2),16)/15,e);if(6===r)return this.setHex(parseInt(i,16),e);ss("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ke){const i=ln[t.toLowerCase()];return void 0!==i?this.setHex(i,e):ss("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Bs(t.r),this.g=Bs(t.g),this.b=Bs(t.b),this}copyLinearToSRGB(t){return this.r=ks(t.r),this.g=ks(t.g),this.b=ks(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ke){return Is.workingToColorSpace(mn.copy(this),t),65536*Math.round(ps(255*mn.r,0,255))+256*Math.round(ps(255*mn.g,0,255))+Math.round(ps(255*mn.b,0,255))}getHexString(t=Ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Is.workingColorSpace){Is.workingToColorSpace(mn.copy(this),e);const i=mn.r,s=mn.g,r=mn.b,n=Math.max(i,s,r),a=Math.min(i,s,r);let o,h;const l=(a+n)/2;if(a===n)o=0,h=0;else{const t=n-a;switch(h=l<=.5?t/(n+a):t/(2-n-a),n){case i:o=(s-r)/t+(s<r?6:0);break;case s:o=(r-i)/t+2;break;case r:o=(i-s)/t+4}o/=6}return t.h=o,t.s=h,t.l=l,t}getRGB(t,e=Is.workingColorSpace){return Is.workingToColorSpace(mn.copy(this),e),t.r=mn.r,t.g=mn.g,t.b=mn.b,t}getStyle(t=Ke){Is.workingToColorSpace(mn.copy(this),t);const e=mn.r,i=mn.g,s=mn.b;return t!==Ke?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(255*e)},${Math.round(255*i)},${Math.round(255*s)})`}offsetHSL(t,e,i){return this.getHSL(cn),this.setHSL(cn.h+t,cn.s+e,cn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(cn),t.getHSL(un);const i=ys(cn.h,un.h,e),s=ys(cn.s,un.s,e),r=ys(cn.l,un.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const mn=new pn;pn.NAMES=ln;let yn=0;class gn extends os{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yn++}),this.uuid=ds(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new pn(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=oi,this.stencilZFail=oi,this.stencilZPass=oi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(void 0!==t)for(const e in t){const i=t[e];if(void 0===i){ss(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];void 0!==s?s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i:ss(`Material: '${e}' is not a property of THREE.${this.type}.`)}}toJSON(t){const e=void 0===t||"string"==typeof t;e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function s(t){const e=[];for(const i in t){const s=t[i];delete s.metadata,e.push(s)}return e}if(i.uuid=this.uuid,i.type=this.type,""!==this.name&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),void 0!==this.roughness&&(i.roughness=this.roughness),void 0!==this.metalness&&(i.metalness=this.metalness),void 0!==this.sheen&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),void 0!==this.sheenRoughness&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),void 0!==this.emissiveIntensity&&1!==this.emissiveIntensity&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),void 0!==this.specularIntensity&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),void 0!==this.shininess&&(i.shininess=this.shininess),void 0!==this.clearcoat&&(i.clearcoat=this.clearcoat),void 0!==this.clearcoatRoughness&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),void 0!==this.dispersion&&(i.dispersion=this.dispersion),void 0!==this.iridescence&&(i.iridescence=this.iridescence),void 0!==this.iridescenceIOR&&(i.iridescenceIOR=this.iridescenceIOR),void 0!==this.iridescenceThicknessRange&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),void 0!==this.anisotropy&&(i.anisotropy=this.anisotropy),void 0!==this.anisotropyRotation&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,void 0!==this.combine&&(i.combine=this.combine)),void 0!==this.envMapRotation&&(i.envMapRotation=this.envMapRotation.toArray()),void 0!==this.envMapIntensity&&(i.envMapIntensity=this.envMapIntensity),void 0!==this.reflectivity&&(i.reflectivity=this.reflectivity),void 0!==this.refractionRatio&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),void 0!==this.transmission&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),void 0!==this.thickness&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),void 0!==this.attenuationDistance&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),void 0!==this.attenuationColor&&(i.attenuationColor=this.attenuationColor.getHex()),void 0!==this.size&&(i.size=this.size),null!==this.shadowSide&&(i.shadowSide=this.shadowSide),void 0!==this.sizeAttenuation&&(i.sizeAttenuation=this.sizeAttenuation),1!==this.blending&&(i.blending=this.blending),0!==this.side&&(i.side=this.side),!0===this.vertexColors&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),!0===this.transparent&&(i.transparent=!0),204!==this.blendSrc&&(i.blendSrc=this.blendSrc),205!==this.blendDst&&(i.blendDst=this.blendDst),100!==this.blendEquation&&(i.blendEquation=this.blendEquation),null!==this.blendSrcAlpha&&(i.blendSrcAlpha=this.blendSrcAlpha),null!==this.blendDstAlpha&&(i.blendDstAlpha=this.blendDstAlpha),null!==this.blendEquationAlpha&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),0!==this.blendAlpha&&(i.blendAlpha=this.blendAlpha),3!==this.depthFunc&&(i.depthFunc=this.depthFunc),!1===this.depthTest&&(i.depthTest=this.depthTest),!1===this.depthWrite&&(i.depthWrite=this.depthWrite),!1===this.colorWrite&&(i.colorWrite=this.colorWrite),255!==this.stencilWriteMask&&(i.stencilWriteMask=this.stencilWriteMask),519!==this.stencilFunc&&(i.stencilFunc=this.stencilFunc),0!==this.stencilRef&&(i.stencilRef=this.stencilRef),255!==this.stencilFuncMask&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==oi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==oi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==oi&&(i.stencilZPass=this.stencilZPass),!0===this.stencilWrite&&(i.stencilWrite=this.stencilWrite),void 0!==this.rotation&&0!==this.rotation&&(i.rotation=this.rotation),!0===this.polygonOffset&&(i.polygonOffset=!0),0!==this.polygonOffsetFactor&&(i.polygonOffsetFactor=this.polygonOffsetFactor),0!==this.polygonOffsetUnits&&(i.polygonOffsetUnits=this.polygonOffsetUnits),void 0!==this.linewidth&&1!==this.linewidth&&(i.linewidth=this.linewidth),void 0!==this.dashSize&&(i.dashSize=this.dashSize),void 0!==this.gapSize&&(i.gapSize=this.gapSize),void 0!==this.scale&&(i.scale=this.scale),!0===this.dithering&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),!0===this.alphaHash&&(i.alphaHash=!0),!0===this.alphaToCoverage&&(i.alphaToCoverage=!0),!0===this.premultipliedAlpha&&(i.premultipliedAlpha=!0),!0===this.forceSinglePass&&(i.forceSinglePass=!0),!1===this.allowOverride&&(i.allowOverride=!1),!0===this.wireframe&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),"round"!==this.wireframeLinecap&&(i.wireframeLinecap=this.wireframeLinecap),"round"!==this.wireframeLinejoin&&(i.wireframeLinejoin=this.wireframeLinejoin),!0===this.flatShading&&(i.flatShading=!0),!1===this.visible&&(i.visible=!1),!1===this.toneMapped&&(i.toneMapped=!1),!1===this.fog&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData),e){const e=s(t.textures),r=s(t.images);e.length>0&&(i.textures=e),r.length>0&&(i.images=r)}return i}clone(){return(new this.constructor).copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(null!==e){const t=e.length;i=new Array(t);for(let s=0;s!==t;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){!0===t&&this.version++}}class fn extends gn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new pn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Br,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const xn=bn();function bn(){const t=new ArrayBuffer(4),e=new Float32Array(t),i=new Uint32Array(t),s=new Uint32Array(512),r=new Uint32Array(512);for(let t=0;t<256;++t){const e=t-127;e<-27?(s[t]=0,s[256|t]=32768,r[t]=24,r[256|t]=24):e<-14?(s[t]=1024>>-e-14,s[256|t]=1024>>-e-14|32768,r[t]=-e-1,r[256|t]=-e-1):e<=15?(s[t]=e+15<<10,s[256|t]=e+15<<10|32768,r[t]=13,r[256|t]=13):e<128?(s[t]=31744,s[256|t]=64512,r[t]=24,r[256|t]=24):(s[t]=31744,s[256|t]=64512,r[t]=13,r[256|t]=13)}const n=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let t=1;t<1024;++t){let e=t<<13,i=0;for(;!(8388608&e);)e<<=1,i-=8388608;e&=-8388609,i+=947912704,n[t]=e|i}for(let t=1024;t<2048;++t)n[t]=939524096+(t-1024<<13);for(let t=1;t<31;++t)a[t]=t<<23;a[31]=1199570944,a[32]=2147483648;for(let t=33;t<63;++t)a[t]=2147483648+(t-32<<23);a[63]=3347054592;for(let t=1;t<64;++t)32!==t&&(o[t]=1024);return{floatView:e,uint32View:i,baseTable:s,shiftTable:r,mantissaTable:n,exponentTable:a,offsetTable:o}}function vn(t){Math.abs(t)>65504&&ss("DataUtils.toHalfFloat(): Value out of range."),t=ps(t,-65504,65504),xn.floatView[0]=t;const e=xn.uint32View[0],i=e>>23&511;return xn.baseTable[i]+((8388607&e)>>xn.shiftTable[i])}function wn(t){const e=t>>10;return xn.uint32View[0]=xn.mantissaTable[xn.offsetTable[e]+(1023&t)]+xn.exponentTable[e],xn.floatView[0]}class Mn{static toHalfFloat(t){return vn(t)}static fromHalfFloat(t){return wn(t)}}const Sn=new ws,_n=new bs;let An=0;class Tn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:An++}),this.name="",this.array=t,this.itemSize=e,this.count=void 0!==t?t.length/e:0,this.normalized=i,this.usage=Bi,this.updateRanges=[],this.gpuType=Ot,this.version=0}onUploadCallback(){}set needsUpdate(t){!0===t&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(2===this.itemSize)for(let e=0,i=this.count;e<i;e++)_n.fromBufferAttribute(this,e),_n.applyMatrix3(t),this.setXY(e,_n.x,_n.y);else if(3===this.itemSize)for(let e=0,i=this.count;e<i;e++)Sn.fromBufferAttribute(this,e),Sn.applyMatrix3(t),this.setXYZ(e,Sn.x,Sn.y,Sn.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Sn.fromBufferAttribute(this,e),Sn.applyMatrix4(t),this.setXYZ(e,Sn.x,Sn.y,Sn.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Sn.fromBufferAttribute(this,e),Sn.applyNormalMatrix(t),this.setXYZ(e,Sn.x,Sn.y,Sn.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Sn.fromBufferAttribute(this,e),Sn.transformDirection(t),this.setXYZ(e,Sn.x,Sn.y,Sn.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=gs(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=fs(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=gs(e,this.array)),e}setX(t,e){return this.normalized&&(e=fs(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=gs(e,this.array)),e}setY(t,e){return this.normalized&&(e=fs(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=gs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=fs(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=gs(e,this.array)),e}setW(t,e){return this.normalized&&(e=fs(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=fs(e,this.array),i=fs(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=fs(e,this.array),i=fs(i,this.array),s=fs(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=fs(e,this.array),i=fs(i,this.array),s=fs(s,this.array),r=fs(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return""!==this.name&&(t.name=this.name),this.usage!==Bi&&(t.usage=this.usage),t}}class zn extends Tn{constructor(t,e,i){super(new Int8Array(t),e,i)}}class Cn extends Tn{constructor(t,e,i){super(new Uint8Array(t),e,i)}}class In extends Tn{constructor(t,e,i){super(new Uint8ClampedArray(t),e,i)}}class Bn extends Tn{constructor(t,e,i){super(new Int16Array(t),e,i)}}class kn extends Tn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class On extends Tn{constructor(t,e,i){super(new Int32Array(t),e,i)}}class Pn extends Tn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Rn extends Tn{constructor(t,e,i){super(new Uint16Array(t),e,i),this.isFloat16BufferAttribute=!0}getX(t){let e=wn(this.array[t*this.itemSize]);return this.normalized&&(e=gs(e,this.array)),e}setX(t,e){return this.normalized&&(e=fs(e,this.array)),this.array[t*this.itemSize]=vn(e),this}getY(t){let e=wn(this.array[t*this.itemSize+1]);return this.normalized&&(e=gs(e,this.array)),e}setY(t,e){return this.normalized&&(e=fs(e,this.array)),this.array[t*this.itemSize+1]=vn(e),this}getZ(t){let e=wn(this.array[t*this.itemSize+2]);return this.normalized&&(e=gs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=fs(e,this.array)),this.array[t*this.itemSize+2]=vn(e),this}getW(t){let e=wn(this.array[t*this.itemSize+3]);return this.normalized&&(e=gs(e,this.array)),e}setW(t,e){return this.normalized&&(e=fs(e,this.array)),this.array[t*this.itemSize+3]=vn(e),this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=fs(e,this.array),i=fs(i,this.array)),this.array[t+0]=vn(e),this.array[t+1]=vn(i),this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=fs(e,this.array),i=fs(i,this.array),s=fs(s,this.array)),this.array[t+0]=vn(e),this.array[t+1]=vn(i),this.array[t+2]=vn(s),this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=fs(e,this.array),i=fs(i,this.array),s=fs(s,this.array),r=fs(r,this.array)),this.array[t+0]=vn(e),this.array[t+1]=vn(i),this.array[t+2]=vn(s),this.array[t+3]=vn(r),this}}class Nn extends Tn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Vn=0;const Fn=new vr,Ln=new Yr,En=new ws,jn=new Ys,Dn=new Ys,Un=new ws;class Wn extends os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vn++}),this.uuid=ds(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Xi(t)?Pn:kn)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return void 0!==this.attributes[t]}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;void 0!==e&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(void 0!==i){const e=(new _s).getNormalMatrix(t);i.applyNormalMatrix(e),i.needsUpdate=!0}const s=this.attributes.tangent;return void 0!==s&&(s.transformDirection(t),s.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}applyQuaternion(t){return Fn.makeRotationFromQuaternion(t),this.applyMatrix4(Fn),this}rotateX(t){return Fn.makeRotationX(t),this.applyMatrix4(Fn),this}rotateY(t){return Fn.makeRotationY(t),this.applyMatrix4(Fn),this}rotateZ(t){return Fn.makeRotationZ(t),this.applyMatrix4(Fn),this}translate(t,e,i){return Fn.makeTranslation(t,e,i),this.applyMatrix4(Fn),this}scale(t,e,i){return Fn.makeScale(t,e,i),this.applyMatrix4(Fn),this}lookAt(t){return Ln.lookAt(t),Ln.updateMatrix(),this.applyMatrix4(Ln.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(En).negate(),this.translate(En.x,En.y,En.z),this}setFromPoints(t){const e=this.getAttribute("position");if(void 0===e){const e=[];for(let i=0,s=t.length;i<s;i++){const s=t[i];e.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Nn(e,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const i=t[s];e.setXYZ(s,i.x,i.y,i.z||0)}t.length>e.count&&ss("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new Ys);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute)return rs("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new ws(-1/0,-1/0,-1/0),new ws(1/0,1/0,1/0));if(void 0!==t){if(this.boundingBox.setFromBufferAttribute(t),e)for(let t=0,i=e.length;t<i;t++){const i=e[t];jn.setFromBufferAttribute(i),this.morphTargetsRelative?(Un.addVectors(this.boundingBox.min,jn.min),this.boundingBox.expandByPoint(Un),Un.addVectors(this.boundingBox.max,jn.max),this.boundingBox.expandByPoint(Un)):(this.boundingBox.expandByPoint(jn.min),this.boundingBox.expandByPoint(jn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&rs('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new ur);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute)return rs("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new ws,1/0);if(t){const i=this.boundingSphere.center;if(jn.setFromBufferAttribute(t),e)for(let t=0,i=e.length;t<i;t++){const i=e[t];Dn.setFromBufferAttribute(i),this.morphTargetsRelative?(Un.addVectors(jn.min,Dn.min),jn.expandByPoint(Un),Un.addVectors(jn.max,Dn.max),jn.expandByPoint(Un)):(jn.expandByPoint(Dn.min),jn.expandByPoint(Dn.max))}jn.getCenter(i);let s=0;for(let e=0,r=t.count;e<r;e++)Un.fromBufferAttribute(t,e),s=Math.max(s,i.distanceToSquared(Un));if(e)for(let r=0,n=e.length;r<n;r++){const n=e[r],a=this.morphTargetsRelative;for(let e=0,r=n.count;e<r;e++)Un.fromBufferAttribute(n,e),a&&(En.fromBufferAttribute(t,e),Un.add(En)),s=Math.max(s,i.distanceToSquared(Un))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&rs('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(null===t||void 0===e.position||void 0===e.normal||void 0===e.uv)return void rs("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");const i=e.position,s=e.normal,r=e.uv;!1===this.hasAttribute("tangent")&&this.setAttribute("tangent",new Tn(new Float32Array(4*i.count),4));const n=this.getAttribute("tangent"),a=[],o=[];for(let t=0;t<i.count;t++)a[t]=new ws,o[t]=new ws;const h=new ws,l=new ws,c=new ws,u=new bs,d=new bs,p=new bs,m=new ws,y=new ws;function g(t,e,s){h.fromBufferAttribute(i,t),l.fromBufferAttribute(i,e),c.fromBufferAttribute(i,s),u.fromBufferAttribute(r,t),d.fromBufferAttribute(r,e),p.fromBufferAttribute(r,s),l.sub(h),c.sub(h),d.sub(u),p.sub(u);const n=1/(d.x*p.y-p.x*d.y);isFinite(n)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(c,-d.y).multiplyScalar(n),y.copy(c).multiplyScalar(d.x).addScaledVector(l,-p.x).multiplyScalar(n),a[t].add(m),a[e].add(m),a[s].add(m),o[t].add(y),o[e].add(y),o[s].add(y))}let f=this.groups;0===f.length&&(f=[{start:0,count:t.count}]);for(let e=0,i=f.length;e<i;++e){const i=f[e],s=i.start;for(let e=s,r=s+i.count;e<r;e+=3)g(t.getX(e+0),t.getX(e+1),t.getX(e+2))}const x=new ws,b=new ws,v=new ws,w=new ws;function M(t){v.fromBufferAttribute(s,t),w.copy(v);const e=a[t];x.copy(e),x.sub(v.multiplyScalar(v.dot(e))).normalize(),b.crossVectors(w,e);const i=b.dot(o[t])<0?-1:1;n.setXYZW(t,x.x,x.y,x.z,i)}for(let e=0,i=f.length;e<i;++e){const i=f[e],s=i.start;for(let e=s,r=s+i.count;e<r;e+=3)M(t.getX(e+0)),M(t.getX(e+1)),M(t.getX(e+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(void 0!==e){let i=this.getAttribute("normal");if(void 0===i)i=new Tn(new Float32Array(3*e.count),3),this.setAttribute("normal",i);else for(let t=0,e=i.count;t<e;t++)i.setXYZ(t,0,0,0);const s=new ws,r=new ws,n=new ws,a=new ws,o=new ws,h=new ws,l=new ws,c=new ws;if(t)for(let u=0,d=t.count;u<d;u+=3){const d=t.getX(u+0),p=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,d),r.fromBufferAttribute(e,p),n.fromBufferAttribute(e,m),l.subVectors(n,r),c.subVectors(s,r),l.cross(c),a.fromBufferAttribute(i,d),o.fromBufferAttribute(i,p),h.fromBufferAttribute(i,m),a.add(l),o.add(l),h.add(l),i.setXYZ(d,a.x,a.y,a.z),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(m,h.x,h.y,h.z)}else for(let t=0,a=e.count;t<a;t+=3)s.fromBufferAttribute(e,t+0),r.fromBufferAttribute(e,t+1),n.fromBufferAttribute(e,t+2),l.subVectors(n,r),c.subVectors(s,r),l.cross(c),i.setXYZ(t+0,l.x,l.y,l.z),i.setXYZ(t+1,l.x,l.y,l.z),i.setXYZ(t+2,l.x,l.y,l.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Un.fromBufferAttribute(t,e),Un.normalize(),t.setXYZ(e,Un.x,Un.y,Un.z)}toNonIndexed(){function t(t,e){const i=t.array,s=t.itemSize,r=t.normalized,n=new i.constructor(e.length*s);let a=0,o=0;for(let r=0,h=e.length;r<h;r++){a=t.isInterleavedBufferAttribute?e[r]*t.data.stride+t.offset:e[r]*s;for(let t=0;t<s;t++)n[o++]=i[a++]}return new Tn(n,s,r)}if(null===this.index)return ss("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Wn,i=this.index.array,s=this.attributes;for(const r in s){const n=t(s[r],i);e.setAttribute(r,n)}const r=this.morphAttributes;for(const s in r){const n=[],a=r[s];for(let e=0,s=a.length;e<s;e++){const s=t(a[e],i);n.push(s)}e.morphAttributes[s]=n}e.morphTargetsRelative=this.morphTargetsRelative;const n=this.groups;for(let t=0,i=n.length;t<i;t++){const i=n[t];e.addGroup(i.start,i.count,i.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,""!==this.name&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),void 0!==this.parameters){const e=this.parameters;for(const i in e)void 0!==e[i]&&(t[i]=e[i]);return t}t.data={attributes:{}};const e=this.index;null!==e&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const e in i){const s=i[e];t.data.attributes[e]=s.toJSON(t.data)}const s={};let r=!1;for(const e in this.morphAttributes){const i=this.morphAttributes[e],n=[];for(let e=0,s=i.length;e<s;e++){const s=i[e];n.push(s.toJSON(t.data))}n.length>0&&(s[e]=n,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const n=this.groups;n.length>0&&(t.data.groups=JSON.parse(JSON.stringify(n)));const a=this.boundingSphere;return null!==a&&(t.data.boundingSphere=a.toJSON()),t}clone(){return(new this.constructor).copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;null!==i&&this.setIndex(i.clone());const s=t.attributes;for(const t in s){const i=s[t];this.setAttribute(t,i.clone(e))}const r=t.morphAttributes;for(const t in r){const i=[],s=r[t];for(let t=0,r=s.length;t<r;t++)i.push(s[t].clone(e));this.morphAttributes[t]=i}this.morphTargetsRelative=t.morphTargetsRelative;const n=t.groups;for(let t=0,e=n.length;t<e;t++){const e=n[t];this.addGroup(e.start,e.count,e.materialIndex)}const a=t.boundingBox;null!==a&&(this.boundingBox=a.clone());const o=t.boundingSphere;return null!==o&&(this.boundingSphere=o.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const qn=new vr,Jn=new br,Xn=new ur,Yn=new ws,Zn=new ws,Hn=new ws,Gn=new ws,$n=new ws,Qn=new ws,Kn=new ws,ta=new ws;class ea extends Yr{constructor(t=new Wn,e=new fn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),void 0!==t.morphTargetInfluences&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),void 0!==t.morphTargetDictionary&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,e=Object.keys(t);if(e.length>0){const i=t[e[0]];if(void 0!==i){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let t=0,e=i.length;t<e;t++){const e=i[t].name||String(t);this.morphTargetInfluences.push(0),this.morphTargetDictionary[e]=t}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,n=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Qn.set(0,0,0);for(let i=0,s=r.length;i<s;i++){const s=a[i],o=r[i];0!==s&&($n.fromBufferAttribute(o,t),n?Qn.addScaledVector($n,s):Qn.addScaledVector($n.sub(e),s))}e.add(Qn)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;if(void 0!==s){if(null===i.boundingSphere&&i.computeBoundingSphere(),Xn.copy(i.boundingSphere),Xn.applyMatrix4(r),Jn.copy(t.ray).recast(t.near),!1===Xn.containsPoint(Jn.origin)){if(null===Jn.intersectSphere(Xn,Yn))return;if(Jn.origin.distanceToSquared(Yn)>(t.far-t.near)**2)return}qn.copy(r).invert(),Jn.copy(t.ray).applyMatrix4(qn),null!==i.boundingBox&&!1===Jn.intersectsBox(i.boundingBox)||this._computeIntersections(t,e,Jn)}}_computeIntersections(t,e,i){let s;const r=this.geometry,n=this.material,a=r.index,o=r.attributes.position,h=r.attributes.uv,l=r.attributes.uv1,c=r.attributes.normal,u=r.groups,d=r.drawRange;if(null!==a)if(Array.isArray(n))for(let r=0,o=u.length;r<o;r++){const o=u[r],p=n[o.materialIndex];for(let r=Math.max(o.start,d.start),n=Math.min(a.count,Math.min(o.start+o.count,d.start+d.count));r<n;r+=3){s=ia(this,p,t,i,h,l,c,a.getX(r),a.getX(r+1),a.getX(r+2)),s&&(s.faceIndex=Math.floor(r/3),s.face.materialIndex=o.materialIndex,e.push(s))}}else{for(let r=Math.max(0,d.start),o=Math.min(a.count,d.start+d.count);r<o;r+=3){s=ia(this,n,t,i,h,l,c,a.getX(r),a.getX(r+1),a.getX(r+2)),s&&(s.faceIndex=Math.floor(r/3),e.push(s))}}else if(void 0!==o)if(Array.isArray(n))for(let r=0,a=u.length;r<a;r++){const a=u[r],p=n[a.materialIndex];for(let r=Math.max(a.start,d.start),n=Math.min(o.count,Math.min(a.start+a.count,d.start+d.count));r<n;r+=3){s=ia(this,p,t,i,h,l,c,r,r+1,r+2),s&&(s.faceIndex=Math.floor(r/3),s.face.materialIndex=a.materialIndex,e.push(s))}}else{for(let r=Math.max(0,d.start),a=Math.min(o.count,d.start+d.count);r<a;r+=3){s=ia(this,n,t,i,h,l,c,r,r+1,r+2),s&&(s.faceIndex=Math.floor(r/3),e.push(s))}}}}function ia(t,e,i,s,r,n,a,o,h,l){t.getVertexPosition(o,Zn),t.getVertexPosition(h,Hn),t.getVertexPosition(l,Gn);const c=function(t,e,i,s,r,n,a,o){let h;if(h=1===e.side?s.intersectTriangle(a,n,r,!0,o):s.intersectTriangle(r,n,a,0===e.side,o),null===h)return null;ta.copy(o),ta.applyMatrix4(t.matrixWorld);const l=i.ray.origin.distanceTo(ta);return l<i.near||l>i.far?null:{distance:l,point:ta.clone(),object:t}}(t,e,i,s,Zn,Hn,Gn,Kn);if(c){const t=new ws;hn.getBarycoord(Kn,Zn,Hn,Gn,t),r&&(c.uv=hn.getInterpolatedAttribute(r,o,h,l,t,new bs)),n&&(c.uv1=hn.getInterpolatedAttribute(n,o,h,l,t,new bs)),a&&(c.normal=hn.getInterpolatedAttribute(a,o,h,l,t,new ws),c.normal.dot(s.direction)>0&&c.normal.multiplyScalar(-1));const e={a:o,b:h,c:l,normal:new ws,materialIndex:0};hn.getNormal(Zn,Hn,Gn,e.normal),c.face=e,c.barycoord=t}return c}class sa extends Wn{constructor(t=1,e=1,i=1,s=1,r=1,n=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:n};const a=this;s=Math.floor(s),r=Math.floor(r),n=Math.floor(n);const o=[],h=[],l=[],c=[];let u=0,d=0;function p(t,e,i,s,r,n,p,m,y,g,f){const x=n/y,b=p/g,v=n/2,w=p/2,M=m/2,S=y+1,_=g+1;let A=0,T=0;const z=new ws;for(let n=0;n<_;n++){const a=n*b-w;for(let o=0;o<S;o++){const u=o*x-v;z[t]=u*s,z[e]=a*r,z[i]=M,h.push(z.x,z.y,z.z),z[t]=0,z[e]=0,z[i]=m>0?1:-1,l.push(z.x,z.y,z.z),c.push(o/y),c.push(1-n/g),A+=1}}for(let t=0;t<g;t++)for(let e=0;e<y;e++){const i=u+e+S*t,s=u+e+S*(t+1),r=u+(e+1)+S*(t+1),n=u+(e+1)+S*t;o.push(i,s,n),o.push(s,r,n),T+=6}a.addGroup(d,T,f),d+=T,u+=A}p("z","y","x",-1,-1,i,e,t,n,r,0),p("z","y","x",1,-1,i,e,-t,n,r,1),p("x","z","y",1,1,t,i,e,s,n,2),p("x","z","y",1,-1,t,i,-e,s,n,3),p("x","y","z",1,-1,t,e,i,s,r,4),p("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(o),this.setAttribute("position",new Nn(h,3)),this.setAttribute("normal",new Nn(l,3)),this.setAttribute("uv",new Nn(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sa(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ra(t){const e={};for(const i in t){e[i]={};for(const s in t[i]){const r=t[i][s];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(ss("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=r.clone():Array.isArray(r)?e[i][s]=r.slice():e[i][s]=r}}return e}function na(t){const e={};for(let i=0;i<t.length;i++){const s=ra(t[i]);for(const t in s)e[t]=s[t]}return e}function aa(t){const e=t.getRenderTarget();return null===e?t.outputColorSpace:!0===e.isXRRenderTarget?e.texture.colorSpace:Is.workingColorSpace}const oa={clone:ra,merge:na};class ha extends gn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader="void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",this.fragmentShader="void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}",this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,void 0!==t&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ra(t.uniforms),this.uniformsGroups=function(t){const e=[];for(let i=0;i<t.length;i++)e.push(t[i].clone());return e}(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const s=this.uniforms[i].value;s&&s.isTexture?e.uniforms[i]={type:"t",value:s.toJSON(t).uuid}:s&&s.isColor?e.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?e.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?e.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?e.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?e.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?e.uniforms[i]={type:"m4",value:s.toArray()}:e.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const t in this.extensions)!0===this.extensions[t]&&(i[t]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class la extends Yr{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vr,this.projectionMatrix=new vr,this.projectionMatrixInverse=new vr,this.coordinateSystem=Di,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return(new this.constructor).copy(this)}}const ca=new ws,ua=new bs,da=new bs;class pa extends la{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=null===t.view?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=2*us*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(.5*cs*this.fov);return.5*this.getFilmHeight()/t}getEffectiveFOV(){return 2*us*Math.atan(Math.tan(.5*cs*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ca.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ca.x,ca.y).multiplyScalar(-t/ca.z),ca.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ca.x,ca.y).multiplyScalar(-t/ca.z)}getViewSize(t,e){return this.getViewBounds(t,ua,da),e.subVectors(da,ua)}setViewOffset(t,e,i,s,r,n){this.aspect=t/e,null===this.view&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=n,this.updateProjectionMatrix()}clearViewOffset(){null!==this.view&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(.5*cs*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const n=this.view;if(null!==this.view&&this.view.enabled){const t=n.fullWidth,a=n.fullHeight;r+=n.offsetX*s/t,e-=n.offsetY*i/a,s*=n.width/t,i*=n.height/a}const a=this.filmOffset;0!==a&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,null!==this.view&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ma=-90;class ya extends Yr{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new pa(ma,1,t,e);s.layers=this.layers,this.add(s);const r=new pa(ma,1,t,e);r.layers=this.layers,this.add(r);const n=new pa(ma,1,t,e);n.layers=this.layers,this.add(n);const a=new pa(ma,1,t,e);a.layers=this.layers,this.add(a);const o=new pa(ma,1,t,e);o.layers=this.layers,this.add(o);const h=new pa(ma,1,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,n,a,o]=e;for(const t of e)this.remove(t);if(t===Di)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),n.up.set(0,0,1),n.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else{if(t!==Ui)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),n.up.set(0,0,-1),n.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1)}for(const t of e)this.add(t),t.updateMatrixWorld()}update(t,e){null===this.parent&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,n,a,o,h,l]=this.children,c=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const m=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,n),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,o),t.setRenderTarget(i,4,s),t.render(e,h),i.texture.generateMipmaps=m,t.setRenderTarget(i,5,s),t.render(e,l),t.setRenderTarget(c,u,d),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class ga extends Es{constructor(t=[],e=301,i,s,r,n,a,o,h,l){super(t,e,i,s,r,n,a,o,h,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class fa extends Us{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new ga(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:"\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\tvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t\t\t\t\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t\t\t\t\t#include <begin_vertex>\n\t\t\t\t\t#include <project_vertex>\n\n\t\t\t\t}\n\t\t\t",fragmentShader:"\n\n\t\t\t\tuniform sampler2D tEquirect;\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\t#include <common>\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvec3 direction = normalize( vWorldDirection );\n\n\t\t\t\t\tvec2 sampleUV = equirectUv( direction );\n\n\t\t\t\t\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\n\t\t\t\t}\n\t\t\t"},s=new sa(5,5,5),r=new ha({name:"CubemapFromEquirect",uniforms:ra(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:1,blending:0});r.uniforms.tEquirect.value=e;const n=new ea(s,r),a=e.minFilter;e.minFilter===_t&&(e.minFilter=wt);return new ya(1,10,this).update(t,n),e.minFilter=a,n.geometry.dispose(),n.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,i,s);t.setRenderTarget(r)}}class xa extends Yr{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ba={type:"move"};class va{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return null===this._hand&&(this._hand=new xa,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return null===this._targetRay&&(this._targetRay=new xa,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ws,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ws),this._targetRay}getGripSpace(){return null===this._grip&&(this._grip=new xa,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ws,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ws),this._grip}dispatchEvent(t){return null!==this._targetRay&&this._targetRay.dispatchEvent(t),null!==this._grip&&this._grip.dispatchEvent(t),null!==this._hand&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),null!==this._targetRay&&(this._targetRay.visible=!1),null!==this._grip&&(this._grip.visible=!1),null!==this._hand&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,n=null;const a=this._targetRay,o=this._grip,h=this._hand;if(t&&"visible-blurred"!==e.session.visibilityState){if(h&&t.hand){n=!0;for(const s of t.hand.values()){const t=e.getJointPose(s,i),r=this._getHandJoint(h,s);null!==t&&(r.matrix.fromArray(t.transform.matrix),r.matrix.decompose(r.position,r.rotation,r.scale),r.matrixWorldNeedsUpdate=!0,r.jointRadius=t.radius),r.visible=null!==t}const s=h.joints["index-finger-tip"],r=h.joints["thumb-tip"],a=s.position.distanceTo(r.position),o=.02,l=.005;h.inputState.pinching&&a>o+l?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&a<=o-l&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else null!==o&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),null!==r&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1));null!==a&&(s=e.getPose(t.targetRaySpace,i),null===s&&null!==r&&(s=r),null!==s&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ba)))}return null!==a&&(a.visible=null!==s),null!==o&&(o.visible=null!==r),null!==h&&(h.visible=null!==n),this}_getHandJoint(t,e){if(void 0===t.joints[e.jointName]){const i=new xa;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class wa{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new pn(t),this.density=e}clone(){return new wa(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Ma{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new pn(t),this.near=e,this.far=i}clone(){return new Ma(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Sa extends Yr{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Br,this.environmentIntensity=1,this.environmentRotation=new Br,this.overrideMaterial=null,"undefined"!=typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),null!==t.background&&(this.background=t.background.clone()),null!==t.environment&&(this.environment=t.environment.clone()),null!==t.fog&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),null!==t.overrideMaterial&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return null!==this.fog&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),1!==this.backgroundIntensity&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),1!==this.environmentIntensity&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class _a{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=void 0!==t?t.length/e:0,this.usage=Bi,this.updateRanges=[],this.version=0,this.uuid=ds()}onUploadCallback(){}set needsUpdate(t){!0===t&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){void 0===t.arrayBuffers&&(t.arrayBuffers={}),void 0===this.array.buffer._uuid&&(this.array.buffer._uuid=ds()),void 0===t.arrayBuffers[this.array.buffer._uuid]&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return void 0===t.arrayBuffers&&(t.arrayBuffers={}),void 0===this.array.buffer._uuid&&(this.array.buffer._uuid=ds()),void 0===t.arrayBuffers[this.array.buffer._uuid]&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Aa=new ws;class Ta{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Aa.fromBufferAttribute(this,e),Aa.applyMatrix4(t),this.setXYZ(e,Aa.x,Aa.y,Aa.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Aa.fromBufferAttribute(this,e),Aa.applyNormalMatrix(t),this.setXYZ(e,Aa.x,Aa.y,Aa.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Aa.fromBufferAttribute(this,e),Aa.transformDirection(t),this.setXYZ(e,Aa.x,Aa.y,Aa.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=gs(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=fs(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=fs(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=fs(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=fs(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=fs(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=gs(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=gs(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=gs(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=gs(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=fs(e,this.array),i=fs(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=fs(e,this.array),i=fs(i,this.array),s=fs(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=fs(e,this.array),i=fs(i,this.array),s=fs(s,this.array),r=fs(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(void 0===t){is("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let e=0;e<this.count;e++){const i=e*this.data.stride+this.offset;for(let e=0;e<this.itemSize;e++)t.push(this.data.array[i+e])}return new Tn(new this.array.constructor(t),this.itemSize,this.normalized)}return void 0===t.interleavedBuffers&&(t.interleavedBuffers={}),void 0===t.interleavedBuffers[this.data.uuid]&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Ta(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(void 0===t){is("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let e=0;e<this.count;e++){const i=e*this.data.stride+this.offset;for(let e=0;e<this.itemSize;e++)t.push(this.data.array[i+e])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return void 0===t.interleavedBuffers&&(t.interleavedBuffers={}),void 0===t.interleavedBuffers[this.data.uuid]&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class za extends gn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new pn(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ca;const Ia=new ws,Ba=new ws,ka=new ws,Oa=new bs,Pa=new bs,Ra=new vr,Na=new ws,Va=new ws,Fa=new ws,La=new bs,Ea=new bs,ja=new bs;class Da extends Yr{constructor(t=new za){if(super(),this.isSprite=!0,this.type="Sprite",void 0===Ca){Ca=new Wn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),e=new _a(t,5);Ca.setIndex([0,1,2,0,2,3]),Ca.setAttribute("position",new Ta(e,3,0,!1)),Ca.setAttribute("uv",new Ta(e,2,3,!1))}this.geometry=Ca,this.material=t,this.center=new bs(.5,.5),this.count=1}raycast(t,e){null===t.camera&&rs('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ba.setFromMatrixScale(this.matrixWorld),Ra.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ka.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&!1===this.material.sizeAttenuation&&Ba.multiplyScalar(-ka.z);const i=this.material.rotation;let s,r;0!==i&&(r=Math.cos(i),s=Math.sin(i));const n=this.center;Ua(Na.set(-.5,-.5,0),ka,n,Ba,s,r),Ua(Va.set(.5,-.5,0),ka,n,Ba,s,r),Ua(Fa.set(.5,.5,0),ka,n,Ba,s,r),La.set(0,0),Ea.set(1,0),ja.set(1,1);let a=t.ray.intersectTriangle(Na,Va,Fa,!1,Ia);if(null===a&&(Ua(Va.set(-.5,.5,0),ka,n,Ba,s,r),Ea.set(0,1),a=t.ray.intersectTriangle(Na,Fa,Va,!1,Ia),null===a))return;const o=t.ray.origin.distanceTo(Ia);o<t.near||o>t.far||e.push({distance:o,point:Ia.clone(),uv:hn.getInterpolation(Ia,Na,Va,Fa,La,Ea,ja,new bs),face:null,object:this})}copy(t,e){return super.copy(t,e),void 0!==t.center&&this.center.copy(t.center),this.material=t.material,this}}function Ua(t,e,i,s,r,n){Oa.subVectors(t,i).addScalar(.5).multiply(s),void 0!==r?(Pa.x=n*Oa.x-r*Oa.y,Pa.y=r*Oa.x+n*Oa.y):Pa.copy(Oa),t.copy(e),t.x+=Pa.x,t.y+=Pa.y,t.applyMatrix4(Ra)}const Wa=new ws,qa=new ws;class Ja extends Yr{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(t){super.copy(t,!1);const e=t.levels;for(let t=0,i=e.length;t<i;t++){const i=e[t];this.addLevel(i.object.clone(),i.distance,i.hysteresis)}return this.autoUpdate=t.autoUpdate,this}addLevel(t,e=0,i=0){e=Math.abs(e);const s=this.levels;let r;for(r=0;r<s.length&&!(e<s[r].distance);r++);return s.splice(r,0,{distance:e,hysteresis:i,object:t}),this.add(t),this}removeLevel(t){const e=this.levels;for(let i=0;i<e.length;i++)if(e[i].distance===t){const t=e.splice(i,1);return this.remove(t[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(t){const e=this.levels;if(e.length>0){let i,s;for(i=1,s=e.length;i<s;i++){let s=e[i].distance;if(e[i].object.visible&&(s-=s*e[i].hysteresis),t<s)break}return e[i-1].object}return null}raycast(t,e){if(this.levels.length>0){Wa.setFromMatrixPosition(this.matrixWorld);const i=t.ray.origin.distanceTo(Wa);this.getObjectForDistance(i).raycast(t,e)}}update(t){const e=this.levels;if(e.length>1){Wa.setFromMatrixPosition(t.matrixWorld),qa.setFromMatrixPosition(this.matrixWorld);const i=Wa.distanceTo(qa)/t.zoom;let s,r;for(e[0].object.visible=!0,s=1,r=e.length;s<r;s++){let t=e[s].distance;if(e[s].object.visible&&(t-=t*e[s].hysteresis),!(i>=t))break;e[s-1].object.visible=!1,e[s].object.visible=!0}for(this._currentLevel=s-1;s<r;s++)e[s].object.visible=!1}}toJSON(t){const e=super.toJSON(t);!1===this.autoUpdate&&(e.object.autoUpdate=!1),e.object.levels=[];const i=this.levels;for(let t=0,s=i.length;t<s;t++){const s=i[t];e.object.levels.push({object:s.object.uuid,distance:s.distance,hysteresis:s.hysteresis})}return e}}const Xa=new ws,Ya=new js,Za=new js,Ha=new ws,Ga=new vr,$a=new ws,Qa=new ur,Ka=new vr,to=new br;class eo extends ea{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=nt,this.bindMatrix=new vr,this.bindMatrixInverse=new vr,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;null===this.boundingBox&&(this.boundingBox=new Ys),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let t=0;t<e.count;t++)this.getVertexPosition(t,$a),this.boundingBox.expandByPoint($a)}computeBoundingSphere(){const t=this.geometry;null===this.boundingSphere&&(this.boundingSphere=new ur),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let t=0;t<e.count;t++)this.getVertexPosition(t,$a),this.boundingSphere.expandByPoint($a)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,null!==t.boundingBox&&(this.boundingBox=t.boundingBox.clone()),null!==t.boundingSphere&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const i=this.material,s=this.matrixWorld;void 0!==i&&(null===this.boundingSphere&&this.computeBoundingSphere(),Qa.copy(this.boundingSphere),Qa.applyMatrix4(s),!1!==t.ray.intersectsSphere(Qa)&&(Ka.copy(s).invert(),to.copy(t.ray).applyMatrix4(Ka),null!==this.boundingBox&&!1===to.intersectsBox(this.boundingBox)||this._computeIntersections(t,e,to)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,void 0===e&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new js,e=this.geometry.attributes.skinWeight;for(let i=0,s=e.count;i<s;i++){t.fromBufferAttribute(e,i);const s=1/t.manhattanLength();s!==1/0?t.multiplyScalar(s):t.set(1,0,0,0),e.setXYZW(i,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===nt?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===at?this.bindMatrixInverse.copy(this.bindMatrix).invert():ss("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const i=this.skeleton,s=this.geometry;Ya.fromBufferAttribute(s.attributes.skinIndex,t),Za.fromBufferAttribute(s.attributes.skinWeight,t),Xa.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let t=0;t<4;t++){const s=Za.getComponent(t);if(0!==s){const r=Ya.getComponent(t);Ga.multiplyMatrices(i.bones[r].matrixWorld,i.boneInverses[r]),e.addScaledVector(Ha.copy(Xa).applyMatrix4(Ga),s)}}return e.applyMatrix4(this.bindMatrixInverse)}}class io extends Yr{constructor(){super(),this.isBone=!0,this.type="Bone"}}class so extends Es{constructor(t=null,e=1,i=1,s,r,n,a,o,h=1003,l=1003,c,u){super(null,n,a,o,h,l,s,r,c,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ro=new vr,no=new vr;class ao{constructor(t=[],e=[]){this.uuid=ds(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(16*t.length),0===e.length)this.calculateInverses();else if(t.length!==e.length){ss("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let t=0,e=this.bones.length;t<e;t++)this.boneInverses.push(new vr)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const e=new vr;this.bones[t]&&e.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(e)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const e=this.bones[t];e&&e.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const e=this.bones[t];e&&(e.parent&&e.parent.isBone?(e.matrix.copy(e.parent.matrixWorld).invert(),e.matrix.multiply(e.matrixWorld)):e.matrix.copy(e.matrixWorld),e.matrix.decompose(e.position,e.quaternion,e.scale))}}update(){const t=this.bones,e=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let s=0,r=t.length;s<r;s++){const r=t[s]?t[s].matrixWorld:no;ro.multiplyMatrices(r,e[s]),ro.toArray(i,16*s)}null!==s&&(s.needsUpdate=!0)}clone(){return new ao(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(4*this.bones.length);t=4*Math.ceil(t/4),t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const i=new so(e,t,t,Dt,Ot);return i.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=i,this}getBoneByName(t){for(let e=0,i=this.bones.length;e<i;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){null!==this.boneTexture&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let i=0,s=t.bones.length;i<s;i++){const s=t.bones[i];let r=e[s];void 0===r&&(ss("Skeleton: No bone found with UUID:",s),r=new io),this.bones.push(r),this.boneInverses.push((new vr).fromArray(t.boneInverses[i]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,i=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const r=e[s];t.bones.push(r.uuid);const n=i[s];t.boneInverses.push(n.toArray())}return t}}class oo extends Tn{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ho=new vr,lo=new vr,co=[],uo=new Ys,po=new vr,mo=new ea,yo=new ur;class go extends ea{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new oo(new Float32Array(16*i),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let t=0;t<i;t++)this.setMatrixAt(t,po)}computeBoundingBox(){const t=this.geometry,e=this.count;null===this.boundingBox&&(this.boundingBox=new Ys),null===t.boundingBox&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ho),uo.copy(t.boundingBox).applyMatrix4(ho),this.boundingBox.union(uo)}computeBoundingSphere(){const t=this.geometry,e=this.count;null===this.boundingSphere&&(this.boundingSphere=new ur),null===t.boundingSphere&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ho),yo.copy(t.boundingSphere).applyMatrix4(ho),this.boundingSphere.union(yo)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),null!==t.morphTexture&&(this.morphTexture=t.morphTexture.clone()),null!==t.instanceColor&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,null!==t.boundingBox&&(this.boundingBox=t.boundingBox.clone()),null!==t.boundingSphere&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,3*t)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,16*t)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=t*(i.length+1)+1;for(let t=0;t<i.length;t++)i[t]=s[r+t]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(mo.geometry=this.geometry,mo.material=this.material,void 0!==mo.material&&(null===this.boundingSphere&&this.computeBoundingSphere(),yo.copy(this.boundingSphere),yo.applyMatrix4(i),!1!==t.ray.intersectsSphere(yo)))for(let r=0;r<s;r++){this.getMatrixAt(r,ho),lo.multiplyMatrices(i,ho),mo.matrixWorld=lo,mo.raycast(t,co);for(let t=0,i=co.length;t<i;t++){const i=co[t];i.instanceId=r,i.object=this,e.push(i)}co.length=0}}setColorAt(t,e){null===this.instanceColor&&(this.instanceColor=new oo(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),e.toArray(this.instanceColor.array,3*t)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,16*t)}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;null===this.morphTexture&&(this.morphTexture=new so(new Float32Array(s*this.count),s,this.count,qt,Ot));const r=this.morphTexture.source.data.data;let n=0;for(let t=0;t<i.length;t++)n+=i[t];const a=this.geometry.morphTargetsRelative?1:1-n,o=s*t;r[o]=a,r.set(i,o+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),null!==this.morphTexture&&(this.morphTexture.dispose(),this.morphTexture=null)}}const fo=new ws,xo=new ws,bo=new _s;class vo{constructor(t=new ws(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=fo.subVectors(i,e).cross(xo.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(fo),s=this.normal.dot(i);if(0===s)return 0===this.distanceToPoint(t.start)?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||bo.getNormalMatrix(t),s=this.coplanarPoint(fo).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return(new this.constructor).copy(this)}}const wo=new ur,Mo=new bs(.5,.5),So=new ws;class _o{constructor(t=new vo,e=new vo,i=new vo,s=new vo,r=new vo,n=new vo){this.planes=[t,e,i,s,r,n]}set(t,e,i,s,r,n){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(n),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=2e3,i=!1){const s=this.planes,r=t.elements,n=r[0],a=r[1],o=r[2],h=r[3],l=r[4],c=r[5],u=r[6],d=r[7],p=r[8],m=r[9],y=r[10],g=r[11],f=r[12],x=r[13],b=r[14],v=r[15];if(s[0].setComponents(h-n,d-l,g-p,v-f).normalize(),s[1].setComponents(h+n,d+l,g+p,v+f).normalize(),s[2].setComponents(h+a,d+c,g+m,v+x).normalize(),s[3].setComponents(h-a,d-c,g-m,v-x).normalize(),i)s[4].setComponents(o,u,y,b).normalize(),s[5].setComponents(h-o,d-u,g-y,v-b).normalize();else if(s[4].setComponents(h-o,d-u,g-y,v-b).normalize(),e===Di)s[5].setComponents(h+o,d+u,g+y,v+b).normalize();else{if(e!==Ui)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);s[5].setComponents(o,u,y,b).normalize()}return this}intersectsObject(t){if(void 0!==t.boundingSphere)null===t.boundingSphere&&t.computeBoundingSphere(),wo.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;null===e.boundingSphere&&e.computeBoundingSphere(),wo.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(wo)}intersectsSprite(t){wo.center.set(0,0,0);const e=Mo.distanceTo(t.center);return wo.radius=.7071067811865476+e,wo.applyMatrix4(t.matrixWorld),this.intersectsSphere(wo)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let t=0;t<6;t++){if(e[t].distanceToPoint(i)<s)return!1}return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(So.x=s.normal.x>0?t.max.x:t.min.x,So.y=s.normal.y>0?t.max.y:t.min.y,So.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(So)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return(new this.constructor).copy(this)}}const Ao=new vr,To=new _o;class zo{constructor(){this.coordinateSystem=Di}intersectsObject(t,e){if(!e.isArrayCamera||0===e.cameras.length)return!1;for(let i=0;i<e.cameras.length;i++){const s=e.cameras[i];if(Ao.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),To.setFromProjectionMatrix(Ao,s.coordinateSystem,s.reversedDepth),To.intersectsObject(t))return!0}return!1}intersectsSprite(t,e){if(!e||!e.cameras||0===e.cameras.length)return!1;for(let i=0;i<e.cameras.length;i++){const s=e.cameras[i];if(Ao.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),To.setFromProjectionMatrix(Ao,s.coordinateSystem,s.reversedDepth),To.intersectsSprite(t))return!0}return!1}intersectsSphere(t,e){if(!e||!e.cameras||0===e.cameras.length)return!1;for(let i=0;i<e.cameras.length;i++){const s=e.cameras[i];if(Ao.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),To.setFromProjectionMatrix(Ao,s.coordinateSystem,s.reversedDepth),To.intersectsSphere(t))return!0}return!1}intersectsBox(t,e){if(!e||!e.cameras||0===e.cameras.length)return!1;for(let i=0;i<e.cameras.length;i++){const s=e.cameras[i];if(Ao.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),To.setFromProjectionMatrix(Ao,s.coordinateSystem,s.reversedDepth),To.intersectsBox(t))return!0}return!1}containsPoint(t,e){if(!e||!e.cameras||0===e.cameras.length)return!1;for(let i=0;i<e.cameras.length;i++){const s=e.cameras[i];if(Ao.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),To.setFromProjectionMatrix(Ao,s.coordinateSystem,s.reversedDepth),To.containsPoint(t))return!0}return!1}clone(){return new zo}}function Co(t,e){return t-e}function Io(t,e){return t.z-e.z}function Bo(t,e){return e.z-t.z}class ko{constructor(){this.index=0,this.pool=[],this.list=[]}push(t,e,i,s){const r=this.pool,n=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});const a=r[this.index];n.push(a),this.index++,a.start=t,a.count=e,a.z=i,a.index=s}reset(){this.list.length=0,this.index=0}}const Oo=new vr,Po=new pn(1,1,1),Ro=new _o,No=new zo,Vo=new Ys,Fo=new ur,Lo=new ws,Eo=new ws,jo=new ws,Do=new ko,Uo=new ea,Wo=[];function qo(t,e,i=0){const s=e.itemSize;if(t.isInterleavedBufferAttribute||t.array.constructor!==e.array.constructor){const r=t.count;for(let n=0;n<r;n++)for(let r=0;r<s;r++)e.setComponent(n+i,r,t.getComponent(n,r))}else e.array.set(t.array,i*s);e.needsUpdate=!0}function Jo(t,e){if(t.constructor!==e.constructor){const i=Math.min(t.length,e.length);for(let s=0;s<i;s++)e[s]=t[s]}else{const i=Math.min(t.length,e.length);e.set(new t.constructor(t.buffer,0,i))}}class Xo extends ea{constructor(t,e,i=2*e,s){super(new Wn,s),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=t,this._maxVertexCount=e,this._maxIndexCount=i,this._multiDrawCounts=new Int32Array(t),this._multiDrawStarts=new Int32Array(t),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let t=Math.sqrt(4*this._maxInstanceCount);t=4*Math.ceil(t/4),t=Math.max(t,4);const e=new Float32Array(t*t*4),i=new so(e,t,t,Dt,Ot);this._matricesTexture=i}_initIndirectTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);const e=new Uint32Array(t*t),i=new so(e,t,t,Jt,kt);this._indirectTexture=i}_initColorsTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);const e=new Float32Array(t*t*4).fill(1),i=new so(e,t,t,Dt,Ot);i.colorSpace=Is.workingColorSpace,this._colorsTexture=i}_initializeGeometry(t){const e=this.geometry,i=this._maxVertexCount,s=this._maxIndexCount;if(!1===this._geometryInitialized){for(const s in t.attributes){const r=t.getAttribute(s),{array:n,itemSize:a,normalized:o}=r,h=new n.constructor(i*a),l=new Tn(h,a,o);e.setAttribute(s,l)}if(null!==t.getIndex()){const t=i>65535?new Uint32Array(s):new Uint16Array(s);e.setIndex(new Tn(t,1))}this._geometryInitialized=!0}}_validateGeometry(t){const e=this.geometry;if(Boolean(t.getIndex())!==Boolean(e.getIndex()))throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(const i in e.attributes){if(!t.hasAttribute(i))throw new Error(`THREE.BatchedMesh: Added geometry missing "${i}". All geometries must have consistent attributes.`);const s=t.getAttribute(i),r=e.getAttribute(i);if(s.itemSize!==r.itemSize||s.normalized!==r.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(t){const e=this._instanceInfo;if(t<0||t>=e.length||!1===e[t].active)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${t}. Instance is either out of range or has been deleted.`)}validateGeometryId(t){const e=this._geometryInfo;if(t<0||t>=e.length||!1===e[t].active)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${t}. Geometry is either out of range or has been deleted.`)}setCustomSort(t){return this.customSort=t,this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new Ys);const t=this.boundingBox,e=this._instanceInfo;t.makeEmpty();for(let i=0,s=e.length;i<s;i++){if(!1===e[i].active)continue;const s=e[i].geometryIndex;this.getMatrixAt(i,Oo),this.getBoundingBoxAt(s,Vo).applyMatrix4(Oo),t.union(Vo)}}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new ur);const t=this.boundingSphere,e=this._instanceInfo;t.makeEmpty();for(let i=0,s=e.length;i<s;i++){if(!1===e[i].active)continue;const s=e[i].geometryIndex;this.getMatrixAt(i,Oo),this.getBoundingSphereAt(s,Fo).applyMatrix4(Oo),t.union(Fo)}}addInstance(t){if(this._instanceInfo.length>=this.maxInstanceCount&&0===this._availableInstanceIds.length)throw new Error("THREE.BatchedMesh: Maximum item count reached.");const e={visible:!0,active:!0,geometryIndex:t};let i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Co),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=e):(i=this._instanceInfo.length,this._instanceInfo.push(e));const s=this._matricesTexture;Oo.identity().toArray(s.image.data,16*i),s.needsUpdate=!0;const r=this._colorsTexture;return r&&(Po.toArray(r.image.data,4*i),r.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(t,e=-1,i=-1){this._initializeGeometry(t),this._validateGeometry(t);const s={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;s.vertexStart=this._nextVertexStart,s.reservedVertexCount=-1===e?t.getAttribute("position").count:e;const n=t.getIndex();if(null!==n&&(s.indexStart=this._nextIndexStart,s.reservedIndexCount=-1===i?n.count:i),-1!==s.indexStart&&s.indexStart+s.reservedIndexCount>this._maxIndexCount||s.vertexStart+s.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let a;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Co),a=this._availableGeometryIds.shift(),r[a]=s):(a=this._geometryCount,this._geometryCount++,r.push(s)),this.setGeometryAt(a,t),this._nextIndexStart=s.indexStart+s.reservedIndexCount,this._nextVertexStart=s.vertexStart+s.reservedVertexCount,a}setGeometryAt(t,e){if(t>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(e);const i=this.geometry,s=null!==i.getIndex(),r=i.getIndex(),n=e.getIndex(),a=this._geometryInfo[t];if(s&&n.count>a.reservedIndexCount||e.attributes.position.count>a.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");const o=a.vertexStart,h=a.reservedVertexCount;a.vertexCount=e.getAttribute("position").count;for(const t in i.attributes){const s=e.getAttribute(t),r=i.getAttribute(t);qo(s,r,o);const n=s.itemSize;for(let t=s.count,e=h;t<e;t++){const e=o+t;for(let t=0;t<n;t++)r.setComponent(e,t,0)}r.needsUpdate=!0,r.addUpdateRange(o*n,h*n)}if(s){const t=a.indexStart,i=a.reservedIndexCount;a.indexCount=e.getIndex().count;for(let e=0;e<n.count;e++)r.setX(t+e,o+n.getX(e));for(let e=n.count,s=i;e<s;e++)r.setX(t+e,o);r.needsUpdate=!0,r.addUpdateRange(t,a.reservedIndexCount)}return a.start=s?a.indexStart:a.vertexStart,a.count=s?a.indexCount:a.vertexCount,a.boundingBox=null,null!==e.boundingBox&&(a.boundingBox=e.boundingBox.clone()),a.boundingSphere=null,null!==e.boundingSphere&&(a.boundingSphere=e.boundingSphere.clone()),this._visibilityChanged=!0,t}deleteGeometry(t){const e=this._geometryInfo;if(t>=e.length||!1===e[t].active)return this;const i=this._instanceInfo;for(let e=0,s=i.length;e<s;e++)i[e].active&&i[e].geometryIndex===t&&this.deleteInstance(e);return e[t].active=!1,this._availableGeometryIds.push(t),this._visibilityChanged=!0,this}deleteInstance(t){return this.validateInstanceId(t),this._instanceInfo[t].active=!1,this._availableInstanceIds.push(t),this._visibilityChanged=!0,this}optimize(){let t=0,e=0;const i=this._geometryInfo,s=i.map((t,e)=>e).sort((t,e)=>i[t].vertexStart-i[e].vertexStart),r=this.geometry;for(let n=0,a=i.length;n<a;n++){const a=s[n],o=i[a];if(!1!==o.active){if(null!==r.index){if(o.indexStart!==e){const{indexStart:i,vertexStart:s,reservedIndexCount:n}=o,a=r.index,h=a.array,l=t-s;for(let t=i;t<i+n;t++)h[t]=h[t]+l;a.array.copyWithin(e,i,i+n),a.addUpdateRange(e,n),a.needsUpdate=!0,o.indexStart=e}e+=o.reservedIndexCount}if(o.vertexStart!==t){const{vertexStart:e,reservedVertexCount:i}=o,s=r.attributes;for(const r in s){const n=s[r],{array:a,itemSize:o}=n;a.copyWithin(t*o,e*o,(e+i)*o),n.addUpdateRange(t*o,i*o),n.needsUpdate=!0}o.vertexStart=t}t+=o.reservedVertexCount,o.start=r.index?o.indexStart:o.vertexStart,this._nextIndexStart=r.index?o.indexStart+o.reservedIndexCount:0,this._nextVertexStart=o.vertexStart+o.reservedVertexCount}}return this._visibilityChanged=!0,this}getBoundingBoxAt(t,e){if(t>=this._geometryCount)return null;const i=this.geometry,s=this._geometryInfo[t];if(null===s.boundingBox){const t=new Ys,e=i.index,r=i.attributes.position;for(let i=s.start,n=s.start+s.count;i<n;i++){let s=i;e&&(s=e.getX(s)),t.expandByPoint(Lo.fromBufferAttribute(r,s))}s.boundingBox=t}return e.copy(s.boundingBox),e}getBoundingSphereAt(t,e){if(t>=this._geometryCount)return null;const i=this.geometry,s=this._geometryInfo[t];if(null===s.boundingSphere){const e=new ur;this.getBoundingBoxAt(t,Vo),Vo.getCenter(e.center);const r=i.index,n=i.attributes.position;let a=0;for(let t=s.start,i=s.start+s.count;t<i;t++){let i=t;r&&(i=r.getX(i)),Lo.fromBufferAttribute(n,i),a=Math.max(a,e.center.distanceToSquared(Lo))}e.radius=Math.sqrt(a),s.boundingSphere=e}return e.copy(s.boundingSphere),e}setMatrixAt(t,e){this.validateInstanceId(t);const i=this._matricesTexture,s=this._matricesTexture.image.data;return e.toArray(s,16*t),i.needsUpdate=!0,this}getMatrixAt(t,e){return this.validateInstanceId(t),e.fromArray(this._matricesTexture.image.data,16*t)}setColorAt(t,e){return this.validateInstanceId(t),null===this._colorsTexture&&this._initColorsTexture(),e.toArray(this._colorsTexture.image.data,4*t),this._colorsTexture.needsUpdate=!0,this}getColorAt(t,e){return this.validateInstanceId(t),e.fromArray(this._colorsTexture.image.data,4*t)}setVisibleAt(t,e){return this.validateInstanceId(t),this._instanceInfo[t].visible===e||(this._instanceInfo[t].visible=e,this._visibilityChanged=!0),this}getVisibleAt(t){return this.validateInstanceId(t),this._instanceInfo[t].visible}setGeometryIdAt(t,e){return this.validateInstanceId(t),this.validateGeometryId(e),this._instanceInfo[t].geometryIndex=e,this}getGeometryIdAt(t){return this.validateInstanceId(t),this._instanceInfo[t].geometryIndex}getGeometryRangeAt(t,e={}){this.validateGeometryId(t);const i=this._geometryInfo[t];return e.vertexStart=i.vertexStart,e.vertexCount=i.vertexCount,e.reservedVertexCount=i.reservedVertexCount,e.indexStart=i.indexStart,e.indexCount=i.indexCount,e.reservedIndexCount=i.reservedIndexCount,e.start=i.start,e.count=i.count,e}setInstanceCount(t){const e=this._availableInstanceIds,i=this._instanceInfo;for(e.sort(Co);e[e.length-1]===i.length-1;)i.pop(),e.pop();if(t<i.length)throw new Error(`BatchedMesh: Instance ids outside the range ${t} are being used. Cannot shrink instance count.`);const s=new Int32Array(t),r=new Int32Array(t);Jo(this._multiDrawCounts,s),Jo(this._multiDrawStarts,r),this._multiDrawCounts=s,this._multiDrawStarts=r,this._maxInstanceCount=t;const n=this._indirectTexture,a=this._matricesTexture,o=this._colorsTexture;n.dispose(),this._initIndirectTexture(),Jo(n.image.data,this._indirectTexture.image.data),a.dispose(),this._initMatricesTexture(),Jo(a.image.data,this._matricesTexture.image.data),o&&(o.dispose(),this._initColorsTexture(),Jo(o.image.data,this._colorsTexture.image.data))}setGeometrySize(t,e){const i=[...this._geometryInfo].filter(t=>t.active);if(Math.max(...i.map(t=>t.vertexStart+t.reservedVertexCount))>t)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${e}. Cannot shrink further.`);if(this.geometry.index){if(Math.max(...i.map(t=>t.indexStart+t.reservedIndexCount))>e)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${e}. Cannot shrink further.`)}const s=this.geometry;s.dispose(),this._maxVertexCount=t,this._maxIndexCount=e,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new Wn,this._initializeGeometry(s));const r=this.geometry;s.index&&Jo(s.index.array,r.index.array);for(const t in s.attributes)Jo(s.attributes[t].array,r.attributes[t].array)}raycast(t,e){const i=this._instanceInfo,s=this._geometryInfo,r=this.matrixWorld,n=this.geometry;Uo.material=this.material,Uo.geometry.index=n.index,Uo.geometry.attributes=n.attributes,null===Uo.geometry.boundingBox&&(Uo.geometry.boundingBox=new Ys),null===Uo.geometry.boundingSphere&&(Uo.geometry.boundingSphere=new ur);for(let n=0,a=i.length;n<a;n++){if(!i[n].visible||!i[n].active)continue;const a=i[n].geometryIndex,o=s[a];Uo.geometry.setDrawRange(o.start,o.count),this.getMatrixAt(n,Uo.matrixWorld).premultiply(r),this.getBoundingBoxAt(a,Uo.geometry.boundingBox),this.getBoundingSphereAt(a,Uo.geometry.boundingSphere),Uo.raycast(t,Wo);for(let t=0,i=Wo.length;t<i;t++){const i=Wo[t];i.object=this,i.batchId=n,e.push(i)}Wo.length=0}Uo.material=null,Uo.geometry.index=null,Uo.geometry.attributes={},Uo.geometry.setDrawRange(0,1/0)}copy(t){return super.copy(t),this.geometry=t.geometry.clone(),this.perObjectFrustumCulled=t.perObjectFrustumCulled,this.sortObjects=t.sortObjects,this.boundingBox=null!==t.boundingBox?t.boundingBox.clone():null,this.boundingSphere=null!==t.boundingSphere?t.boundingSphere.clone():null,this._geometryInfo=t._geometryInfo.map(t=>({...t,boundingBox:null!==t.boundingBox?t.boundingBox.clone():null,boundingSphere:null!==t.boundingSphere?t.boundingSphere.clone():null})),this._instanceInfo=t._instanceInfo.map(t=>({...t})),this._availableInstanceIds=t._availableInstanceIds.slice(),this._availableGeometryIds=t._availableGeometryIds.slice(),this._nextIndexStart=t._nextIndexStart,this._nextVertexStart=t._nextVertexStart,this._geometryCount=t._geometryCount,this._maxInstanceCount=t._maxInstanceCount,this._maxVertexCount=t._maxVertexCount,this._maxIndexCount=t._maxIndexCount,this._geometryInitialized=t._geometryInitialized,this._multiDrawCounts=t._multiDrawCounts.slice(),this._multiDrawStarts=t._multiDrawStarts.slice(),this._indirectTexture=t._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=t._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),null!==this._colorsTexture&&(this._colorsTexture=t._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,null!==this._colorsTexture&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(t,e,i,s,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const n=s.getIndex(),a=null===n?1:n.array.BYTES_PER_ELEMENT,o=this._instanceInfo,h=this._multiDrawStarts,l=this._multiDrawCounts,c=this._geometryInfo,u=this.perObjectFrustumCulled,d=this._indirectTexture,p=d.image.data,m=i.isArrayCamera?No:Ro;u&&!i.isArrayCamera&&(Oo.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse).multiply(this.matrixWorld),Ro.setFromProjectionMatrix(Oo,i.coordinateSystem,i.reversedDepth));let y=0;if(this.sortObjects){Oo.copy(this.matrixWorld).invert(),Lo.setFromMatrixPosition(i.matrixWorld).applyMatrix4(Oo),Eo.set(0,0,-1).transformDirection(i.matrixWorld).transformDirection(Oo);for(let t=0,e=o.length;t<e;t++)if(o[t].visible&&o[t].active){const e=o[t].geometryIndex;this.getMatrixAt(t,Oo),this.getBoundingSphereAt(e,Fo).applyMatrix4(Oo);let s=!1;if(u&&(s=!m.intersectsSphere(Fo,i)),!s){const i=c[e],s=jo.subVectors(Fo.center,Lo).dot(Eo);Do.push(i.start,i.count,s,t)}}const t=Do.list,e=this.customSort;null===e?t.sort(r.transparent?Bo:Io):e.call(this,t,i);for(let e=0,i=t.length;e<i;e++){const i=t[e];h[y]=i.start*a,l[y]=i.count,p[y]=i.index,y++}Do.reset()}else for(let t=0,e=o.length;t<e;t++)if(o[t].visible&&o[t].active){const e=o[t].geometryIndex;let s=!1;if(u&&(this.getMatrixAt(t,Oo),this.getBoundingSphereAt(e,Fo).applyMatrix4(Oo),s=!m.intersectsSphere(Fo,i)),!s){const i=c[e];h[y]=i.start*a,l[y]=i.count,p[y]=t,y++}}d.needsUpdate=!0,this._multiDrawCount=y,this._visibilityChanged=!1}onBeforeShadow(t,e,i,s,r,n){this.onBeforeRender(t,null,s,r,n)}}class Yo extends gn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new pn(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Zo=new ws,Ho=new ws,Go=new vr,$o=new br,Qo=new ur,Ko=new ws,th=new ws;class eh extends Yr{constructor(t=new Wn,e=new Yo){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(null===t.index){const e=t.attributes.position,i=[0];for(let t=1,s=e.count;t<s;t++)Zo.fromBufferAttribute(e,t-1),Ho.fromBufferAttribute(e,t),i[t]=i[t-1],i[t]+=Zo.distanceTo(Ho);t.setAttribute("lineDistance",new Nn(i,1))}else ss("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,n=i.drawRange;if(null===i.boundingSphere&&i.computeBoundingSphere(),Qo.copy(i.boundingSphere),Qo.applyMatrix4(s),Qo.radius+=r,!1===t.ray.intersectsSphere(Qo))return;Go.copy(s).invert(),$o.copy(t.ray).applyMatrix4(Go);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=a*a,h=this.isLineSegments?2:1,l=i.index,c=i.attributes.position;if(null!==l){const i=Math.max(0,n.start),s=Math.min(l.count,n.start+n.count);for(let r=i,n=s-1;r<n;r+=h){const i=l.getX(r),s=l.getX(r+1),n=ih(this,t,$o,o,i,s,r);n&&e.push(n)}if(this.isLineLoop){const r=l.getX(s-1),n=l.getX(i),a=ih(this,t,$o,o,r,n,s-1);a&&e.push(a)}}else{const i=Math.max(0,n.start),s=Math.min(c.count,n.start+n.count);for(let r=i,n=s-1;r<n;r+=h){const i=ih(this,t,$o,o,r,r+1,r);i&&e.push(i)}if(this.isLineLoop){const r=ih(this,t,$o,o,s-1,i,s-1);r&&e.push(r)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,e=Object.keys(t);if(e.length>0){const i=t[e[0]];if(void 0!==i){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let t=0,e=i.length;t<e;t++){const e=i[t].name||String(t);this.morphTargetInfluences.push(0),this.morphTargetDictionary[e]=t}}}}}function ih(t,e,i,s,r,n,a){const o=t.geometry.attributes.position;Zo.fromBufferAttribute(o,r),Ho.fromBufferAttribute(o,n);if(i.distanceSqToSegment(Zo,Ho,Ko,th)>s)return;Ko.applyMatrix4(t.matrixWorld);const h=e.ray.origin.distanceTo(Ko);return h<e.near||h>e.far?void 0:{distance:h,point:th.clone().applyMatrix4(t.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:t}}const sh=new ws,rh=new ws;class nh extends eh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(null===t.index){const e=t.attributes.position,i=[];for(let t=0,s=e.count;t<s;t+=2)sh.fromBufferAttribute(e,t),rh.fromBufferAttribute(e,t+1),i[t]=0===t?0:i[t-1],i[t+1]=i[t]+sh.distanceTo(rh);t.setAttribute("lineDistance",new Nn(i,1))}else ss("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ah extends eh{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class oh extends gn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new pn(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const hh=new vr,lh=new br,ch=new ur,uh=new ws;class dh extends Yr{constructor(t=new Wn,e=new oh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,n=i.drawRange;if(null===i.boundingSphere&&i.computeBoundingSphere(),ch.copy(i.boundingSphere),ch.applyMatrix4(s),ch.radius+=r,!1===t.ray.intersectsSphere(ch))return;hh.copy(s).invert(),lh.copy(t.ray).applyMatrix4(hh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=a*a,h=i.index,l=i.attributes.position;if(null!==h){for(let i=Math.max(0,n.start),r=Math.min(h.count,n.start+n.count);i<r;i++){const r=h.getX(i);uh.fromBufferAttribute(l,r),ph(uh,r,o,s,t,e,this)}}else{for(let i=Math.max(0,n.start),r=Math.min(l.count,n.start+n.count);i<r;i++)uh.fromBufferAttribute(l,i),ph(uh,i,o,s,t,e,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,e=Object.keys(t);if(e.length>0){const i=t[e[0]];if(void 0!==i){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let t=0,e=i.length;t<e;t++){const e=i[t].name||String(t);this.morphTargetInfluences.push(0),this.morphTargetDictionary[e]=t}}}}}function ph(t,e,i,s,r,n,a){const o=lh.distanceSqToPoint(t);if(o<i){const i=new ws;lh.closestPointToPoint(t,i),i.applyMatrix4(s);const h=r.ray.origin.distanceTo(i);if(h<r.near||h>r.far)return;n.push({distance:h,distanceToRay:Math.sqrt(o),point:i,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class mh extends Es{constructor(t,e,i,s,r=1006,n=1006,a,o,h){super(t,e,i,s,r,n,a,o,h),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;const l=this;"requestVideoFrameCallback"in t&&(this._requestVideoFrameCallbackId=t.requestVideoFrameCallback(function e(){l.needsUpdate=!0,l._requestVideoFrameCallbackId=t.requestVideoFrameCallback(e)}))}clone(){return new this.constructor(this.image).copy(this)}update(){const t=this.image;!1==="requestVideoFrameCallback"in t&&t.readyState>=t.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){0!==this._requestVideoFrameCallbackId&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}}class yh extends mh{constructor(t,e,i,s,r,n,a,o){super({},t,e,i,s,r,n,a,o),this.isVideoFrameTexture=!0}update(){}clone(){return(new this.constructor).copy(this)}setFrame(t){this.image=t,this.needsUpdate=!0}}class gh extends Es{constructor(t,e){super({width:t,height:e}),this.isFramebufferTexture=!0,this.magFilter=gt,this.minFilter=gt,this.generateMipmaps=!1,this.needsUpdate=!0}}class fh extends Es{constructor(t,e,i,s,r,n,a,o,h,l,c,u){super(null,n,a,o,h,l,s,r,c,u),this.isCompressedTexture=!0,this.image={width:e,height:i},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}}class xh extends fh{constructor(t,e,i,s,r,n){super(t,e,i,r,n),this.isCompressedArrayTexture=!0,this.image.depth=s,this.wrapR=mt,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class bh extends fh{constructor(t,e,i){super(void 0,t[0].width,t[0].height,e,i,ht),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=t}}class vh extends Es{constructor(t,e,i,s,r,n,a,o,h){super(t,e,i,s,r,n,a,o,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class wh extends Es{constructor(t,e,i=1014,s,r,n,a=1003,o=1003,h,l=1026,c=1){if(l!==Ut&&1027!==l)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:t,height:e,depth:c},s,r,n,a,o,l,i,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ns(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return null!==this.compareFunction&&(e.compareFunction=this.compareFunction),e}}class Mh extends wh{constructor(t,e=1014,i=301,s,r,n=1003,a=1003,o,h=1026){const l={width:t,height:t,depth:1},c=[l,l,l,l,l,l];super(t,t,e,i,s,r,n,a,o,h),this.image=c,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Sh extends Es{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class _h extends Wn{constructor(t=1,e=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:i,radialSegments:s,heightSegments:r},e=Math.max(0,e),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const n=[],a=[],o=[],h=[],l=e/2,c=Math.PI/2*t,u=e,d=2*c+u,p=2*i+r,m=s+1,y=new ws,g=new ws;for(let f=0;f<=p;f++){let x=0,b=0,v=0,w=0;if(f<=i){const e=f/i,s=e*Math.PI/2;b=-l-t*Math.cos(s),v=t*Math.sin(s),w=-t*Math.cos(s),x=e*c}else if(f<=i+r){const s=(f-i)/r;b=s*e-l,v=t,w=0,x=c+s*u}else{const e=(f-i-r)/i,s=e*Math.PI/2;b=l+t*Math.sin(s),v=t*Math.cos(s),w=t*Math.sin(s),x=c+u+e*c}const M=Math.max(0,Math.min(1,x/d));let S=0;0===f?S=.5/s:f===p&&(S=-.5/s);for(let t=0;t<=s;t++){const e=t/s,i=e*Math.PI*2,r=Math.sin(i),n=Math.cos(i);g.x=-v*n,g.y=b,g.z=v*r,a.push(g.x,g.y,g.z),y.set(-v*n,w,v*r),y.normalize(),o.push(y.x,y.y,y.z),h.push(e+S,M)}if(f>0){const t=(f-1)*m;for(let e=0;e<s;e++){const i=t+e,s=t+e+1,r=f*m+e,a=f*m+e+1;n.push(i,s,r),n.push(s,a,r)}}}this.setIndex(n),this.setAttribute("position",new Nn(a,3)),this.setAttribute("normal",new Nn(o,3)),this.setAttribute("uv",new Nn(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _h(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class Ah extends Wn{constructor(t=1,e=32,i=0,s=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],n=[],a=[],o=[],h=new ws,l=new bs;n.push(0,0,0),a.push(0,0,1),o.push(.5,.5);for(let r=0,c=3;r<=e;r++,c+=3){const u=i+r/e*s;h.x=t*Math.cos(u),h.y=t*Math.sin(u),n.push(h.x,h.y,h.z),a.push(0,0,1),l.x=(n[c]/t+1)/2,l.y=(n[c+1]/t+1)/2,o.push(l.x,l.y)}for(let t=1;t<=e;t++)r.push(t,t+1,0);this.setIndex(r),this.setAttribute("position",new Nn(n,3)),this.setAttribute("normal",new Nn(a,3)),this.setAttribute("uv",new Nn(o,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ah(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Th extends Wn{constructor(t=1,e=1,i=1,s=32,r=1,n=!1,a=0,o=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:n,thetaStart:a,thetaLength:o};const h=this;s=Math.floor(s),r=Math.floor(r);const l=[],c=[],u=[],d=[];let p=0;const m=[],y=i/2;let g=0;function f(i){const r=p,n=new bs,m=new ws;let f=0;const x=!0===i?t:e,b=!0===i?1:-1;for(let t=1;t<=s;t++)c.push(0,y*b,0),u.push(0,b,0),d.push(.5,.5),p++;const v=p;for(let t=0;t<=s;t++){const e=t/s*o+a,i=Math.cos(e),r=Math.sin(e);m.x=x*r,m.y=y*b,m.z=x*i,c.push(m.x,m.y,m.z),u.push(0,b,0),n.x=.5*i+.5,n.y=.5*r*b+.5,d.push(n.x,n.y),p++}for(let t=0;t<s;t++){const e=r+t,s=v+t;!0===i?l.push(s,s+1,e):l.push(s+1,s,e),f+=3}h.addGroup(g,f,!0===i?1:2),g+=f}!function(){const n=new ws,f=new ws;let x=0;const b=(e-t)/i;for(let h=0;h<=r;h++){const l=[],g=h/r,x=g*(e-t)+t;for(let t=0;t<=s;t++){const e=t/s,r=e*o+a,h=Math.sin(r),m=Math.cos(r);f.x=x*h,f.y=-g*i+y,f.z=x*m,c.push(f.x,f.y,f.z),n.set(h,b,m).normalize(),u.push(n.x,n.y,n.z),d.push(e,1-g),l.push(p++)}m.push(l)}for(let i=0;i<s;i++)for(let s=0;s<r;s++){const n=m[s][i],a=m[s+1][i],o=m[s+1][i+1],h=m[s][i+1];(t>0||0!==s)&&(l.push(n,a,h),x+=3),(e>0||s!==r-1)&&(l.push(a,o,h),x+=3)}h.addGroup(g,x,0),g+=x}(),!1===n&&(t>0&&f(!0),e>0&&f(!1)),this.setIndex(l),this.setAttribute("position",new Nn(c,3)),this.setAttribute("normal",new Nn(u,3)),this.setAttribute("uv",new Nn(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Th(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class zh extends Th{constructor(t=1,e=1,i=32,s=1,r=!1,n=0,a=2*Math.PI){super(0,t,e,i,s,r,n,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:n,thetaLength:a}}static fromJSON(t){return new zh(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ch extends Wn{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],n=[];function a(t,e,i,s){const r=s+1,n=[];for(let s=0;s<=r;s++){n[s]=[];const a=t.clone().lerp(i,s/r),o=e.clone().lerp(i,s/r),h=r-s;for(let t=0;t<=h;t++)n[s][t]=0===t&&s===r?a:a.clone().lerp(o,t/h)}for(let t=0;t<r;t++)for(let e=0;e<2*(r-t)-1;e++){const i=Math.floor(e/2);e%2==0?(o(n[t][i+1]),o(n[t+1][i]),o(n[t][i])):(o(n[t][i+1]),o(n[t+1][i+1]),o(n[t+1][i]))}}function o(t){r.push(t.x,t.y,t.z)}function h(e,i){const s=3*e;i.x=t[s+0],i.y=t[s+1],i.z=t[s+2]}function l(t,e,i,s){s<0&&1===t.x&&(n[e]=t.x-1),0===i.x&&0===i.z&&(n[e]=s/2/Math.PI+.5)}function c(t){return Math.atan2(t.z,-t.x)}function u(t){return Math.atan2(-t.y,Math.sqrt(t.x*t.x+t.z*t.z))}!function(t){const i=new ws,s=new ws,r=new ws;for(let n=0;n<e.length;n+=3)h(e[n+0],i),h(e[n+1],s),h(e[n+2],r),a(i,s,r,t)}(s),function(t){const e=new ws;for(let i=0;i<r.length;i+=3)e.x=r[i+0],e.y=r[i+1],e.z=r[i+2],e.normalize().multiplyScalar(t),r[i+0]=e.x,r[i+1]=e.y,r[i+2]=e.z}(i),function(){const t=new ws;for(let e=0;e<r.length;e+=3){t.x=r[e+0],t.y=r[e+1],t.z=r[e+2];const i=c(t)/2/Math.PI+.5,s=u(t)/Math.PI+.5;n.push(i,1-s)}(function(){const t=new ws,e=new ws,i=new ws,s=new ws,a=new bs,o=new bs,h=new bs;for(let u=0,d=0;u<r.length;u+=9,d+=6){t.set(r[u+0],r[u+1],r[u+2]),e.set(r[u+3],r[u+4],r[u+5]),i.set(r[u+6],r[u+7],r[u+8]),a.set(n[d+0],n[d+1]),o.set(n[d+2],n[d+3]),h.set(n[d+4],n[d+5]),s.copy(t).add(e).add(i).divideScalar(3);const p=c(s);l(a,d+0,t,p),l(o,d+2,e,p),l(h,d+4,i,p)}})(),function(){for(let t=0;t<n.length;t+=6){const e=n[t+0],i=n[t+2],s=n[t+4],r=Math.max(e,i,s),a=Math.min(e,i,s);r>.9&&a<.1&&(e<.2&&(n[t+0]+=1),i<.2&&(n[t+2]+=1),s<.2&&(n[t+4]+=1))}}()}(),this.setAttribute("position",new Nn(r,3)),this.setAttribute("normal",new Nn(r.slice(),3)),this.setAttribute("uv",new Nn(n,2)),0===s?this.computeVertexNormals():this.normalizeNormals()}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ch(t.vertices,t.indices,t.radius,t.detail)}}class Ih extends Ch{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=1/i;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ih(t.radius,t.detail)}}const Bh=new ws,kh=new ws,Oh=new ws,Ph=new hn;class Rh extends Wn{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},null!==t){const i=4,s=Math.pow(10,i),r=Math.cos(cs*e),n=t.getIndex(),a=t.getAttribute("position"),o=n?n.count:a.count,h=[0,0,0],l=["a","b","c"],c=new Array(3),u={},d=[];for(let t=0;t<o;t+=3){n?(h[0]=n.getX(t),h[1]=n.getX(t+1),h[2]=n.getX(t+2)):(h[0]=t,h[1]=t+1,h[2]=t+2);const{a:e,b:i,c:o}=Ph;if(e.fromBufferAttribute(a,h[0]),i.fromBufferAttribute(a,h[1]),o.fromBufferAttribute(a,h[2]),Ph.getNormal(Oh),c[0]=`${Math.round(e.x*s)},${Math.round(e.y*s)},${Math.round(e.z*s)}`,c[1]=`${Math.round(i.x*s)},${Math.round(i.y*s)},${Math.round(i.z*s)}`,c[2]=`${Math.round(o.x*s)},${Math.round(o.y*s)},${Math.round(o.z*s)}`,c[0]!==c[1]&&c[1]!==c[2]&&c[2]!==c[0])for(let t=0;t<3;t++){const e=(t+1)%3,i=c[t],s=c[e],n=Ph[l[t]],a=Ph[l[e]],o=`${i}_${s}`,p=`${s}_${i}`;p in u&&u[p]?(Oh.dot(u[p].normal)<=r&&(d.push(n.x,n.y,n.z),d.push(a.x,a.y,a.z)),u[p]=null):o in u||(u[o]={index0:h[t],index1:h[e],normal:Oh.clone()})}}for(const t in u)if(u[t]){const{index0:e,index1:i}=u[t];Bh.fromBufferAttribute(a,e),kh.fromBufferAttribute(a,i),d.push(Bh.x,Bh.y,Bh.z),d.push(kh.x,kh.y,kh.z)}this.setAttribute("position",new Nn(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Nh{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ss("Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let n=1;n<=t;n++)i=this.getPoint(n/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let s=0;const r=i.length;let n;n=e||t*i[r-1];let a,o=0,h=r-1;for(;o<=h;)if(s=Math.floor(o+(h-o)/2),a=i[s]-n,a<0)o=s+1;else{if(!(a>0)){h=s;break}h=s-1}if(s=h,i[s]===n)return s/(r-1);const l=i[s];return(s+(n-l)/(i[s+1]-l))/(r-1)}getTangent(t,e){const i=1e-4;let s=t-i,r=t+i;s<0&&(s=0),r>1&&(r=1);const n=this.getPoint(s),a=this.getPoint(r),o=e||(n.isVector2?new bs:new ws);return o.copy(a).sub(n).normalize(),o}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new ws,s=[],r=[],n=[],a=new ws,o=new vr;for(let e=0;e<=t;e++){const i=e/t;s[e]=this.getTangentAt(i,new ws)}r[0]=new ws,n[0]=new ws;let h=Number.MAX_VALUE;const l=Math.abs(s[0].x),c=Math.abs(s[0].y),u=Math.abs(s[0].z);l<=h&&(h=l,i.set(1,0,0)),c<=h&&(h=c,i.set(0,1,0)),u<=h&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),n[0].crossVectors(s[0],r[0]);for(let e=1;e<=t;e++){if(r[e]=r[e-1].clone(),n[e]=n[e-1].clone(),a.crossVectors(s[e-1],s[e]),a.length()>Number.EPSILON){a.normalize();const t=Math.acos(ps(s[e-1].dot(s[e]),-1,1));r[e].applyMatrix4(o.makeRotationAxis(a,t))}n[e].crossVectors(s[e],r[e])}if(!0===e){let e=Math.acos(ps(r[0].dot(r[t]),-1,1));e/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(e=-e);for(let i=1;i<=t;i++)r[i].applyMatrix4(o.makeRotationAxis(s[i],e*i)),n[i].crossVectors(s[i],r[i])}return{tangents:s,normals:r,binormals:n}}clone(){return(new this.constructor).copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Vh extends Nh{constructor(t=0,e=0,i=1,s=1,r=0,n=2*Math.PI,a=!1,o=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=n,this.aClockwise=a,this.aRotation=o}getPoint(t,e=new bs){const i=e,s=2*Math.PI;let r=this.aEndAngle-this.aStartAngle;const n=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(r=n?0:s),!0!==this.aClockwise||n||(r===s?r=-s:r-=s);const a=this.aStartAngle+t*r;let o=this.aX+this.xRadius*Math.cos(a),h=this.aY+this.yRadius*Math.sin(a);if(0!==this.aRotation){const t=Math.cos(this.aRotation),e=Math.sin(this.aRotation),i=o-this.aX,s=h-this.aY;o=i*t-s*e+this.aX,h=i*e+s*t+this.aY}return i.set(o,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Fh extends Vh{constructor(t,e,i,s,r,n){super(t,e,i,i,s,r,n),this.isArcCurve=!0,this.type="ArcCurve"}}function Lh(){let t=0,e=0,i=0,s=0;function r(r,n,a,o){t=r,e=a,i=-3*r+3*n-2*a-o,s=2*r-2*n+a+o}return{initCatmullRom:function(t,e,i,s,n){r(e,i,n*(i-t),n*(s-e))},initNonuniformCatmullRom:function(t,e,i,s,n,a,o){let h=(e-t)/n-(i-t)/(n+a)+(i-e)/a,l=(i-e)/a-(s-e)/(a+o)+(s-i)/o;h*=a,l*=a,r(e,i,h,l)},calc:function(r){const n=r*r;return t+e*r+i*n+s*(n*r)}}}const Eh=new ws,jh=new Lh,Dh=new Lh,Uh=new Lh;class Wh extends Nh{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new ws){const i=e,s=this.points,r=s.length,n=(r-(this.closed?0:1))*t;let a,o,h=Math.floor(n),l=n-h;this.closed?h+=h>0?0:(Math.floor(Math.abs(h)/r)+1)*r:0===l&&h===r-1&&(h=r-2,l=1),this.closed||h>0?a=s[(h-1)%r]:(Eh.subVectors(s[0],s[1]).add(s[0]),a=Eh);const c=s[h%r],u=s[(h+1)%r];if(this.closed||h+2<r?o=s[(h+2)%r]:(Eh.subVectors(s[r-1],s[r-2]).add(s[r-1]),o=Eh),"centripetal"===this.curveType||"chordal"===this.curveType){const t="chordal"===this.curveType?.5:.25;let e=Math.pow(a.distanceToSquared(c),t),i=Math.pow(c.distanceToSquared(u),t),s=Math.pow(u.distanceToSquared(o),t);i<1e-4&&(i=1),e<1e-4&&(e=i),s<1e-4&&(s=i),jh.initNonuniformCatmullRom(a.x,c.x,u.x,o.x,e,i,s),Dh.initNonuniformCatmullRom(a.y,c.y,u.y,o.y,e,i,s),Uh.initNonuniformCatmullRom(a.z,c.z,u.z,o.z,e,i,s)}else"catmullrom"===this.curveType&&(jh.initCatmullRom(a.x,c.x,u.x,o.x,this.tension),Dh.initCatmullRom(a.y,c.y,u.y,o.y,this.tension),Uh.initCatmullRom(a.z,c.z,u.z,o.z,this.tension));return i.set(jh.calc(l),Dh.calc(l),Uh.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const i=t.points[e];this.points.push((new ws).fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function qh(t,e,i,s,r){const n=.5*(s-e),a=.5*(r-i),o=t*t;return(2*i-2*s+n+a)*(t*o)+(-3*i+3*s-2*n-a)*o+n*t+i}function Jh(t,e,i,s){return function(t,e){const i=1-t;return i*i*e}(t,e)+function(t,e){return 2*(1-t)*t*e}(t,i)+function(t,e){return t*t*e}(t,s)}function Xh(t,e,i,s,r){return function(t,e){const i=1-t;return i*i*i*e}(t,e)+function(t,e){const i=1-t;return 3*i*i*t*e}(t,i)+function(t,e){return 3*(1-t)*t*t*e}(t,s)+function(t,e){return t*t*t*e}(t,r)}class Yh extends Nh{constructor(t=new bs,e=new bs,i=new bs,s=new bs){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new bs){const i=e,s=this.v0,r=this.v1,n=this.v2,a=this.v3;return i.set(Xh(t,s.x,r.x,n.x,a.x),Xh(t,s.y,r.y,n.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Zh extends Nh{constructor(t=new ws,e=new ws,i=new ws,s=new ws){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new ws){const i=e,s=this.v0,r=this.v1,n=this.v2,a=this.v3;return i.set(Xh(t,s.x,r.x,n.x,a.x),Xh(t,s.y,r.y,n.y,a.y),Xh(t,s.z,r.z,n.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Hh extends Nh{constructor(t=new bs,e=new bs){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new bs){const i=e;return 1===t?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new bs){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Gh extends Nh{constructor(t=new ws,e=new ws){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new ws){const i=e;return 1===t?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ws){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $h extends Nh{constructor(t=new bs,e=new bs,i=new bs){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new bs){const i=e,s=this.v0,r=this.v1,n=this.v2;return i.set(Jh(t,s.x,r.x,n.x),Jh(t,s.y,r.y,n.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Qh extends Nh{constructor(t=new ws,e=new ws,i=new ws){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new ws){const i=e,s=this.v0,r=this.v1,n=this.v2;return i.set(Jh(t,s.x,r.x,n.x),Jh(t,s.y,r.y,n.y),Jh(t,s.z,r.z,n.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Kh extends Nh{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new bs){const i=e,s=this.points,r=(s.length-1)*t,n=Math.floor(r),a=r-n,o=s[0===n?n:n-1],h=s[n],l=s[n>s.length-2?s.length-1:n+1],c=s[n>s.length-3?s.length-1:n+2];return i.set(qh(a,o.x,h.x,l.x,c.x),qh(a,o.y,h.y,l.y,c.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const i=t.points[e];this.points.push((new bs).fromArray(i))}return this}}var tl=Object.freeze({__proto__:null,ArcCurve:Fh,CatmullRomCurve3:Wh,CubicBezierCurve:Yh,CubicBezierCurve3:Zh,EllipseCurve:Vh,LineCurve:Hh,LineCurve3:Gh,QuadraticBezierCurve:$h,QuadraticBezierCurve3:Qh,SplineCurve:Kh});class el extends Nh{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=!0===t.isVector2?"LineCurve":"LineCurve3";this.curves.push(new tl[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const t=s[r]-i,n=this.curves[r],a=n.getLength(),o=0===a?0:1-t/a;return n.getPointAt(o,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const n=r[s],a=n.isEllipseCurve?2*t:n.isLineCurve||n.isLineCurve3?1:n.isSplineCurve?t*n.points.length:t,o=n.getPoints(a);for(let t=0;t<o.length;t++){const s=o[t];i&&i.equals(s)||(e.push(s),i=s)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const i=t.curves[e];this.curves.push((new tl[i.type]).fromJSON(i))}return this}}class il extends el{constructor(t){super(),this.type="Path",this.currentPoint=new bs,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new Hh(this.currentPoint.clone(),new bs(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new $h(this.currentPoint.clone(),new bs(t,e),new bs(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,n){const a=new Yh(this.currentPoint.clone(),new bs(t,e),new bs(i,s),new bs(r,n));return this.curves.push(a),this.currentPoint.set(r,n),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new Kh(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,n){const a=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(t+a,e+o,i,s,r,n),this}absarc(t,e,i,s,r,n){return this.absellipse(t,e,i,i,s,r,n),this}ellipse(t,e,i,s,r,n,a,o){const h=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(t+h,e+l,i,s,r,n,a,o),this}absellipse(t,e,i,s,r,n,a,o){const h=new Vh(t,e,i,s,r,n,a,o);if(this.curves.length>0){const t=h.getPoint(0);t.equals(this.currentPoint)||this.lineTo(t.x,t.y)}this.curves.push(h);const l=h.getPoint(1);return this.currentPoint.copy(l),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class sl extends il{constructor(t){super(t),this.uuid=ds(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const i=t.holes[e];this.holes.push((new il).fromJSON(i))}return this}}function rl(t,e,i=2){const s=e&&e.length,r=s?e[0]*i:t.length;let n=nl(t,0,r,i,!0);const a=[];if(!n||n.next===n.prev)return a;let o,h,l;if(s&&(n=function(t,e,i,s){const r=[];for(let i=0,n=e.length;i<n;i++){const a=nl(t,e[i]*s,i<n-1?e[i+1]*s:t.length,s,!1);a===a.next&&(a.steiner=!0),r.push(gl(a))}r.sort(dl);for(let t=0;t<r.length;t++)i=pl(r[t],i);return i}(t,e,n,i)),t.length>80*i){o=t[0],h=t[1];let e=o,s=h;for(let n=i;n<r;n+=i){const i=t[n],r=t[n+1];i<o&&(o=i),r<h&&(h=r),i>e&&(e=i),r>s&&(s=r)}l=Math.max(e-o,s-h),l=0!==l?32767/l:0}return ol(n,a,i,o,h,l,0),a}function nl(t,e,i,s,r){let n;if(r===function(t,e,i,s){let r=0;for(let n=e,a=i-s;n<i;n+=s)r+=(t[a]-t[n])*(t[n+1]+t[a+1]),a=n;return r}(t,e,i,s)>0)for(let r=e;r<i;r+=s)n=zl(r/s|0,t[r],t[r+1],n);else for(let r=i-s;r>=e;r-=s)n=zl(r/s|0,t[r],t[r+1],n);return n&&wl(n,n.next)&&(Cl(n),n=n.next),n}function al(t,e){if(!t)return t;e||(e=t);let i,s=t;do{if(i=!1,s.steiner||!wl(s,s.next)&&0!==vl(s.prev,s,s.next))s=s.next;else{if(Cl(s),s=e=s.prev,s===s.next)break;i=!0}}while(i||s!==e);return e}function ol(t,e,i,s,r,n,a){if(!t)return;!a&&n&&function(t,e,i,s){let r=t;do{0===r.z&&(r.z=yl(r.x,r.y,e,i,s)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next}while(r!==t);r.prevZ.nextZ=null,r.prevZ=null,function(t){let e,i=1;do{let s,r=t;t=null;let n=null;for(e=0;r;){e++;let a=r,o=0;for(let t=0;t<i&&(o++,a=a.nextZ,a);t++);let h=i;for(;o>0||h>0&&a;)0!==o&&(0===h||!a||r.z<=a.z)?(s=r,r=r.nextZ,o--):(s=a,a=a.nextZ,h--),n?n.nextZ=s:t=s,s.prevZ=n,n=s;r=a}n.nextZ=null,i*=2}while(e>1)}(r)}(t,s,r,n);let o=t;for(;t.prev!==t.next;){const h=t.prev,l=t.next;if(n?ll(t,s,r,n):hl(t))e.push(h.i,t.i,l.i),Cl(t),t=l.next,o=l.next;else if((t=l)===o){a?1===a?ol(t=cl(al(t),e),e,i,s,r,n,2):2===a&&ul(t,e,i,s,r,n):ol(al(t),e,i,s,r,n,1);break}}}function hl(t){const e=t.prev,i=t,s=t.next;if(vl(e,i,s)>=0)return!1;const r=e.x,n=i.x,a=s.x,o=e.y,h=i.y,l=s.y,c=Math.min(r,n,a),u=Math.min(o,h,l),d=Math.max(r,n,a),p=Math.max(o,h,l);let m=s.next;for(;m!==e;){if(m.x>=c&&m.x<=d&&m.y>=u&&m.y<=p&&xl(r,o,n,h,a,l,m.x,m.y)&&vl(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function ll(t,e,i,s){const r=t.prev,n=t,a=t.next;if(vl(r,n,a)>=0)return!1;const o=r.x,h=n.x,l=a.x,c=r.y,u=n.y,d=a.y,p=Math.min(o,h,l),m=Math.min(c,u,d),y=Math.max(o,h,l),g=Math.max(c,u,d),f=yl(p,m,e,i,s),x=yl(y,g,e,i,s);let b=t.prevZ,v=t.nextZ;for(;b&&b.z>=f&&v&&v.z<=x;){if(b.x>=p&&b.x<=y&&b.y>=m&&b.y<=g&&b!==r&&b!==a&&xl(o,c,h,u,l,d,b.x,b.y)&&vl(b.prev,b,b.next)>=0)return!1;if(b=b.prevZ,v.x>=p&&v.x<=y&&v.y>=m&&v.y<=g&&v!==r&&v!==a&&xl(o,c,h,u,l,d,v.x,v.y)&&vl(v.prev,v,v.next)>=0)return!1;v=v.nextZ}for(;b&&b.z>=f;){if(b.x>=p&&b.x<=y&&b.y>=m&&b.y<=g&&b!==r&&b!==a&&xl(o,c,h,u,l,d,b.x,b.y)&&vl(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;v&&v.z<=x;){if(v.x>=p&&v.x<=y&&v.y>=m&&v.y<=g&&v!==r&&v!==a&&xl(o,c,h,u,l,d,v.x,v.y)&&vl(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function cl(t,e){let i=t;do{const s=i.prev,r=i.next.next;!wl(s,r)&&Ml(s,i,i.next,r)&&Al(s,r)&&Al(r,s)&&(e.push(s.i,i.i,r.i),Cl(i),Cl(i.next),i=t=r),i=i.next}while(i!==t);return al(i)}function ul(t,e,i,s,r,n){let a=t;do{let t=a.next.next;for(;t!==a.prev;){if(a.i!==t.i&&bl(a,t)){let o=Tl(a,t);return a=al(a,a.next),o=al(o,o.next),ol(a,e,i,s,r,n,0),void ol(o,e,i,s,r,n,0)}t=t.next}a=a.next}while(a!==t)}function dl(t,e){let i=t.x-e.x;if(0===i&&(i=t.y-e.y,0===i)){i=(t.next.y-t.y)/(t.next.x-t.x)-(e.next.y-e.y)/(e.next.x-e.x)}return i}function pl(t,e){const i=function(t,e){let i=e;const s=t.x,r=t.y;let n,a=-1/0;if(wl(t,i))return i;do{if(wl(t,i.next))return i.next;if(r<=i.y&&r>=i.next.y&&i.next.y!==i.y){const t=i.x+(r-i.y)*(i.next.x-i.x)/(i.next.y-i.y);if(t<=s&&t>a&&(a=t,n=i.x<i.next.x?i:i.next,t===s))return n}i=i.next}while(i!==e);if(!n)return null;const o=n,h=n.x,l=n.y;let c=1/0;i=n;do{if(s>=i.x&&i.x>=h&&s!==i.x&&fl(r<l?s:a,r,h,l,r<l?a:s,r,i.x,i.y)){const e=Math.abs(r-i.y)/(s-i.x);Al(i,t)&&(e<c||e===c&&(i.x>n.x||i.x===n.x&&ml(n,i)))&&(n=i,c=e)}i=i.next}while(i!==o);return n}(t,e);if(!i)return e;const s=Tl(i,t);return al(s,s.next),al(i,i.next)}function ml(t,e){return vl(t.prev,t,e.prev)<0&&vl(e.next,t,t.next)<0}function yl(t,e,i,s,r){return(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=(t-i)*r|0)|t<<8))|t<<4))|t<<2))|t<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-s)*r|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function gl(t){let e=t,i=t;do{(e.x<i.x||e.x===i.x&&e.y<i.y)&&(i=e),e=e.next}while(e!==t);return i}function fl(t,e,i,s,r,n,a,o){return(r-a)*(e-o)>=(t-a)*(n-o)&&(t-a)*(s-o)>=(i-a)*(e-o)&&(i-a)*(n-o)>=(r-a)*(s-o)}function xl(t,e,i,s,r,n,a,o){return!(t===a&&e===o)&&fl(t,e,i,s,r,n,a,o)}function bl(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!function(t,e){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==e.i&&i.next.i!==e.i&&Ml(i,i.next,t,e))return!0;i=i.next}while(i!==t);return!1}(t,e)&&(Al(t,e)&&Al(e,t)&&function(t,e){let i=t,s=!1;const r=(t.x+e.x)/2,n=(t.y+e.y)/2;do{i.y>n!=i.next.y>n&&i.next.y!==i.y&&r<(i.next.x-i.x)*(n-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next}while(i!==t);return s}(t,e)&&(vl(t.prev,t,e.prev)||vl(t,e.prev,e))||wl(t,e)&&vl(t.prev,t,t.next)>0&&vl(e.prev,e,e.next)>0)}function vl(t,e,i){return(e.y-t.y)*(i.x-e.x)-(e.x-t.x)*(i.y-e.y)}function wl(t,e){return t.x===e.x&&t.y===e.y}function Ml(t,e,i,s){const r=_l(vl(t,e,i)),n=_l(vl(t,e,s)),a=_l(vl(i,s,t)),o=_l(vl(i,s,e));return r!==n&&a!==o||(!(0!==r||!Sl(t,i,e))||(!(0!==n||!Sl(t,s,e))||(!(0!==a||!Sl(i,t,s))||!(0!==o||!Sl(i,e,s)))))}function Sl(t,e,i){return e.x<=Math.max(t.x,i.x)&&e.x>=Math.min(t.x,i.x)&&e.y<=Math.max(t.y,i.y)&&e.y>=Math.min(t.y,i.y)}function _l(t){return t>0?1:t<0?-1:0}function Al(t,e){return vl(t.prev,t,t.next)<0?vl(t,e,t.next)>=0&&vl(t,t.prev,e)>=0:vl(t,e,t.prev)<0||vl(t,t.next,e)<0}function Tl(t,e){const i=Il(t.i,t.x,t.y),s=Il(e.i,e.x,e.y),r=t.next,n=e.prev;return t.next=e,e.prev=t,i.next=r,r.prev=i,s.next=i,i.prev=s,n.next=s,s.prev=n,s}function zl(t,e,i,s){const r=Il(t,e,i);return s?(r.next=s.next,r.prev=s,s.next.prev=r,s.next=r):(r.prev=r,r.next=r),r}function Cl(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function Il(t,e,i){return{i:t,x:e,y:i,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}class Bl{static triangulate(t,e,i=2){return rl(t,e,i)}}class kl{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return.5*i}static isClockWise(t){return kl.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];Ol(t),Pl(i,t);let n=t.length;e.forEach(Ol);for(let t=0;t<e.length;t++)s.push(n),n+=e[t].length,Pl(i,e[t]);const a=Bl.triangulate(i,s);for(let t=0;t<a.length;t+=3)r.push(a.slice(t,t+3));return r}}function Ol(t){const e=t.length;e>2&&t[e-1].equals(t[0])&&t.pop()}function Pl(t,e){for(let i=0;i<e.length;i++)t.push(e[i].x),t.push(e[i].y)}class Rl extends Wn{constructor(t=new sl([new bs(.5,.5),new bs(-.5,.5),new bs(-.5,-.5),new bs(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const i=this,s=[],r=[];for(let e=0,i=t.length;e<i;e++){n(t[e])}function n(t){const n=[],a=void 0!==e.curveSegments?e.curveSegments:12,o=void 0!==e.steps?e.steps:1,h=void 0!==e.depth?e.depth:1;let l=void 0===e.bevelEnabled||e.bevelEnabled,c=void 0!==e.bevelThickness?e.bevelThickness:.2,u=void 0!==e.bevelSize?e.bevelSize:c-.1,d=void 0!==e.bevelOffset?e.bevelOffset:0,p=void 0!==e.bevelSegments?e.bevelSegments:3;const m=e.extrudePath,y=void 0!==e.UVGenerator?e.UVGenerator:Nl;let g,f,x,b,v,w=!1;if(m){g=m.getSpacedPoints(o),w=!0,l=!1;const t=!!m.isCatmullRomCurve3&&m.closed;f=m.computeFrenetFrames(o,t),x=new ws,b=new ws,v=new ws}l||(p=0,c=0,u=0,d=0);const M=t.extractPoints(a);let S=M.shape;const _=M.holes;if(!kl.isClockWise(S)){S=S.reverse();for(let t=0,e=_.length;t<e;t++){const e=_[t];kl.isClockWise(e)&&(_[t]=e.reverse())}}function A(t){const e=1e-10*1e-10;let i=t[0];for(let s=1;s<=t.length;s++){const r=s%t.length,n=t[r],a=n.x-i.x,o=n.y-i.y,h=a*a+o*o,l=Math.max(Math.abs(n.x),Math.abs(n.y),Math.abs(i.x),Math.abs(i.y));h<=e*l*l?(t.splice(r,1),s--):i=n}}A(S),_.forEach(A);const T=_.length,z=S;for(let t=0;t<T;t++){const e=_[t];S=S.concat(e)}function C(t,e,i){return e||rs("ExtrudeGeometry: vec does not exist"),t.clone().addScaledVector(e,i)}const I=S.length;function B(t,e,i){let s,r,n;const a=t.x-e.x,o=t.y-e.y,h=i.x-t.x,l=i.y-t.y,c=a*a+o*o,u=a*l-o*h;if(Math.abs(u)>Number.EPSILON){const u=Math.sqrt(c),d=Math.sqrt(h*h+l*l),p=e.x-o/u,m=e.y+a/u,y=((i.x-l/d-p)*l-(i.y+h/d-m)*h)/(a*l-o*h);s=p+a*y-t.x,r=m+o*y-t.y;const g=s*s+r*r;if(g<=2)return new bs(s,r);n=Math.sqrt(g/2)}else{let t=!1;a>Number.EPSILON?h>Number.EPSILON&&(t=!0):a<-Number.EPSILON?h<-Number.EPSILON&&(t=!0):Math.sign(o)===Math.sign(l)&&(t=!0),t?(s=-o,r=a,n=Math.sqrt(c)):(s=a,r=o,n=Math.sqrt(c/2))}return new bs(s/n,r/n)}const k=[];for(let t=0,e=z.length,i=e-1,s=t+1;t<e;t++,i++,s++)i===e&&(i=0),s===e&&(s=0),k[t]=B(z[t],z[i],z[s]);const O=[];let P,R,N=k.concat();for(let t=0,e=T;t<e;t++){const e=_[t];P=[];for(let t=0,i=e.length,s=i-1,r=t+1;t<i;t++,s++,r++)s===i&&(s=0),r===i&&(r=0),P[t]=B(e[t],e[s],e[r]);O.push(P),N=N.concat(P)}if(0===p)R=kl.triangulateShape(z,_);else{const t=[],e=[];for(let i=0;i<p;i++){const s=i/p,r=c*Math.cos(s*Math.PI/2),n=u*Math.sin(s*Math.PI/2)+d;for(let e=0,i=z.length;e<i;e++){const i=C(z[e],k[e],n);E(i.x,i.y,-r),0===s&&t.push(i)}for(let t=0,i=T;t<i;t++){const i=_[t];P=O[t];const a=[];for(let t=0,e=i.length;t<e;t++){const e=C(i[t],P[t],n);E(e.x,e.y,-r),0===s&&a.push(e)}0===s&&e.push(a)}}R=kl.triangulateShape(t,e)}const V=R.length,F=u+d;for(let t=0;t<I;t++){const e=l?C(S[t],N[t],F):S[t];w?(b.copy(f.normals[0]).multiplyScalar(e.x),x.copy(f.binormals[0]).multiplyScalar(e.y),v.copy(g[0]).add(b).add(x),E(v.x,v.y,v.z)):E(e.x,e.y,0)}for(let t=1;t<=o;t++)for(let e=0;e<I;e++){const i=l?C(S[e],N[e],F):S[e];w?(b.copy(f.normals[t]).multiplyScalar(i.x),x.copy(f.binormals[t]).multiplyScalar(i.y),v.copy(g[t]).add(b).add(x),E(v.x,v.y,v.z)):E(i.x,i.y,h/o*t)}for(let t=p-1;t>=0;t--){const e=t/p,i=c*Math.cos(e*Math.PI/2),s=u*Math.sin(e*Math.PI/2)+d;for(let t=0,e=z.length;t<e;t++){const e=C(z[t],k[t],s);E(e.x,e.y,h+i)}for(let t=0,e=_.length;t<e;t++){const e=_[t];P=O[t];for(let t=0,r=e.length;t<r;t++){const r=C(e[t],P[t],s);w?E(r.x,r.y+g[o-1].y,g[o-1].x+i):E(r.x,r.y,h+i)}}}function L(t,e){let i=t.length;for(;--i>=0;){const s=i;let r=i-1;r<0&&(r=t.length-1);for(let t=0,i=o+2*p;t<i;t++){const i=I*t,n=I*(t+1);D(e+s+i,e+r+i,e+r+n,e+s+n)}}}function E(t,e,i){n.push(t),n.push(e),n.push(i)}function j(t,e,r){U(t),U(e),U(r);const n=s.length/3,a=y.generateTopUV(i,s,n-3,n-2,n-1);W(a[0]),W(a[1]),W(a[2])}function D(t,e,r,n){U(t),U(e),U(n),U(e),U(r),U(n);const a=s.length/3,o=y.generateSideWallUV(i,s,a-6,a-3,a-2,a-1);W(o[0]),W(o[1]),W(o[3]),W(o[1]),W(o[2]),W(o[3])}function U(t){s.push(n[3*t+0]),s.push(n[3*t+1]),s.push(n[3*t+2])}function W(t){r.push(t.x),r.push(t.y)}!function(){const t=s.length/3;if(l){let t=0,e=I*t;for(let t=0;t<V;t++){const i=R[t];j(i[2]+e,i[1]+e,i[0]+e)}t=o+2*p,e=I*t;for(let t=0;t<V;t++){const i=R[t];j(i[0]+e,i[1]+e,i[2]+e)}}else{for(let t=0;t<V;t++){const e=R[t];j(e[2],e[1],e[0])}for(let t=0;t<V;t++){const e=R[t];j(e[0]+I*o,e[1]+I*o,e[2]+I*o)}}i.addGroup(t,s.length/3-t,0)}(),function(){const t=s.length/3;let e=0;L(z,e),e+=z.length;for(let t=0,i=_.length;t<i;t++){const i=_[t];L(i,e),e+=i.length}i.addGroup(t,s.length/3-t,1)}()}this.setAttribute("position",new Nn(s,3)),this.setAttribute("uv",new Nn(r,2)),this.computeVertexNormals()}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return function(t,e,i){if(i.shapes=[],Array.isArray(t))for(let e=0,s=t.length;e<s;e++){const s=t[e];i.shapes.push(s.uuid)}else i.shapes.push(t.uuid);i.options=Object.assign({},e),void 0!==e.extrudePath&&(i.options.extrudePath=e.extrudePath.toJSON());return i}(this.parameters.shapes,this.parameters.options,t)}static fromJSON(t,e){const i=[];for(let s=0,r=t.shapes.length;s<r;s++){const r=e[t.shapes[s]];i.push(r)}const s=t.options.extrudePath;return void 0!==s&&(t.options.extrudePath=(new tl[s.type]).fromJSON(s)),new Rl(i,t.options)}}const Nl={generateTopUV:function(t,e,i,s,r){const n=e[3*i],a=e[3*i+1],o=e[3*s],h=e[3*s+1],l=e[3*r],c=e[3*r+1];return[new bs(n,a),new bs(o,h),new bs(l,c)]},generateSideWallUV:function(t,e,i,s,r,n){const a=e[3*i],o=e[3*i+1],h=e[3*i+2],l=e[3*s],c=e[3*s+1],u=e[3*s+2],d=e[3*r],p=e[3*r+1],m=e[3*r+2],y=e[3*n],g=e[3*n+1],f=e[3*n+2];return Math.abs(o-c)<Math.abs(a-l)?[new bs(a,1-h),new bs(l,1-u),new bs(d,1-m),new bs(y,1-f)]:[new bs(o,1-h),new bs(c,1-u),new bs(p,1-m),new bs(g,1-f)]}};class Vl extends Ch{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2;super([-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Vl(t.radius,t.detail)}}class Fl extends Wn{constructor(t=[new bs(0,-.5),new bs(.5,0),new bs(0,.5)],e=12,i=0,s=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=ps(s,0,2*Math.PI);const r=[],n=[],a=[],o=[],h=[],l=1/e,c=new ws,u=new bs,d=new ws,p=new ws,m=new ws;let y=0,g=0;for(let e=0;e<=t.length-1;e++)switch(e){case 0:y=t[e+1].x-t[e].x,g=t[e+1].y-t[e].y,d.x=1*g,d.y=-y,d.z=0*g,m.copy(d),d.normalize(),o.push(d.x,d.y,d.z);break;case t.length-1:o.push(m.x,m.y,m.z);break;default:y=t[e+1].x-t[e].x,g=t[e+1].y-t[e].y,d.x=1*g,d.y=-y,d.z=0*g,p.copy(d),d.x+=m.x,d.y+=m.y,d.z+=m.z,d.normalize(),o.push(d.x,d.y,d.z),m.copy(p)}for(let r=0;r<=e;r++){const d=i+r*l*s,p=Math.sin(d),m=Math.cos(d);for(let i=0;i<=t.length-1;i++){c.x=t[i].x*p,c.y=t[i].y,c.z=t[i].x*m,n.push(c.x,c.y,c.z),u.x=r/e,u.y=i/(t.length-1),a.push(u.x,u.y);const s=o[3*i+0]*p,l=o[3*i+1],d=o[3*i+0]*m;h.push(s,l,d)}}for(let i=0;i<e;i++)for(let e=0;e<t.length-1;e++){const s=e+i*t.length,n=s,a=s+t.length,o=s+t.length+1,h=s+1;r.push(n,a,h),r.push(o,h,a)}this.setIndex(r),this.setAttribute("position",new Nn(n,3)),this.setAttribute("uv",new Nn(a,2)),this.setAttribute("normal",new Nn(h,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fl(t.points,t.segments,t.phiStart,t.phiLength)}}class Ll extends Ch{constructor(t=1,e=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ll(t.radius,t.detail)}}class El extends Wn{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,n=e/2,a=Math.floor(i),o=Math.floor(s),h=a+1,l=o+1,c=t/a,u=e/o,d=[],p=[],m=[],y=[];for(let t=0;t<l;t++){const e=t*u-n;for(let i=0;i<h;i++){const s=i*c-r;p.push(s,-e,0),m.push(0,0,1),y.push(i/a),y.push(1-t/o)}}for(let t=0;t<o;t++)for(let e=0;e<a;e++){const i=e+h*t,s=e+h*(t+1),r=e+1+h*(t+1),n=e+1+h*t;d.push(i,s,n),d.push(s,r,n)}this.setIndex(d),this.setAttribute("position",new Nn(p,3)),this.setAttribute("normal",new Nn(m,3)),this.setAttribute("uv",new Nn(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new El(t.width,t.height,t.widthSegments,t.heightSegments)}}class jl extends Wn{constructor(t=.5,e=1,i=32,s=1,r=0,n=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:n},i=Math.max(3,i);const a=[],o=[],h=[],l=[];let c=t;const u=(e-t)/(s=Math.max(1,s)),d=new ws,p=new bs;for(let t=0;t<=s;t++){for(let t=0;t<=i;t++){const s=r+t/i*n;d.x=c*Math.cos(s),d.y=c*Math.sin(s),o.push(d.x,d.y,d.z),h.push(0,0,1),p.x=(d.x/e+1)/2,p.y=(d.y/e+1)/2,l.push(p.x,p.y)}c+=u}for(let t=0;t<s;t++){const e=t*(i+1);for(let t=0;t<i;t++){const s=t+e,r=s,n=s+i+1,o=s+i+2,h=s+1;a.push(r,n,h),a.push(n,o,h)}}this.setIndex(a),this.setAttribute("position",new Nn(o,3)),this.setAttribute("normal",new Nn(h,3)),this.setAttribute("uv",new Nn(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jl(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Dl extends Wn{constructor(t=new sl([new bs(0,.5),new bs(-.5,-.5),new bs(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],s=[],r=[],n=[];let a=0,o=0;if(!1===Array.isArray(t))h(t);else for(let e=0;e<t.length;e++)h(t[e]),this.addGroup(a,o,e),a+=o,o=0;function h(t){const a=s.length/3,h=t.extractPoints(e);let l=h.shape;const c=h.holes;!1===kl.isClockWise(l)&&(l=l.reverse());for(let t=0,e=c.length;t<e;t++){const e=c[t];!0===kl.isClockWise(e)&&(c[t]=e.reverse())}const u=kl.triangulateShape(l,c);for(let t=0,e=c.length;t<e;t++){const e=c[t];l=l.concat(e)}for(let t=0,e=l.length;t<e;t++){const e=l[t];s.push(e.x,e.y,0),r.push(0,0,1),n.push(e.x,e.y)}for(let t=0,e=u.length;t<e;t++){const e=u[t],s=e[0]+a,r=e[1]+a,n=e[2]+a;i.push(s,r,n),o+=3}}this.setIndex(i),this.setAttribute("position",new Nn(s,3)),this.setAttribute("normal",new Nn(r,3)),this.setAttribute("uv",new Nn(n,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return function(t,e){if(e.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){const s=t[i];e.shapes.push(s.uuid)}else e.shapes.push(t.uuid);return e}(this.parameters.shapes,t)}static fromJSON(t,e){const i=[];for(let s=0,r=t.shapes.length;s<r;s++){const r=e[t.shapes[s]];i.push(r)}return new Dl(i,t.curveSegments)}}class Ul extends Wn{constructor(t=1,e=32,i=16,s=0,r=2*Math.PI,n=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:n,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const o=Math.min(n+a,Math.PI);let h=0;const l=[],c=new ws,u=new ws,d=[],p=[],m=[],y=[];for(let d=0;d<=i;d++){const g=[],f=d/i;let x=0;0===d&&0===n?x=.5/e:d===i&&o===Math.PI&&(x=-.5/e);for(let i=0;i<=e;i++){const o=i/e;c.x=-t*Math.cos(s+o*r)*Math.sin(n+f*a),c.y=t*Math.cos(n+f*a),c.z=t*Math.sin(s+o*r)*Math.sin(n+f*a),p.push(c.x,c.y,c.z),u.copy(c).normalize(),m.push(u.x,u.y,u.z),y.push(o+x,1-f),g.push(h++)}l.push(g)}for(let t=0;t<i;t++)for(let s=0;s<e;s++){const e=l[t][s+1],r=l[t][s],a=l[t+1][s],h=l[t+1][s+1];(0!==t||n>0)&&d.push(e,r,h),(t!==i-1||o<Math.PI)&&d.push(r,a,h)}this.setIndex(d),this.setAttribute("position",new Nn(p,3)),this.setAttribute("normal",new Nn(m,3)),this.setAttribute("uv",new Nn(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ul(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Wl extends Ch{constructor(t=1,e=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Wl(t.radius,t.detail)}}class ql extends Wn{constructor(t=1,e=.4,i=12,s=48,r=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const n=[],a=[],o=[],h=[],l=new ws,c=new ws,u=new ws;for(let n=0;n<=i;n++)for(let d=0;d<=s;d++){const p=d/s*r,m=n/i*Math.PI*2;c.x=(t+e*Math.cos(m))*Math.cos(p),c.y=(t+e*Math.cos(m))*Math.sin(p),c.z=e*Math.sin(m),a.push(c.x,c.y,c.z),l.x=t*Math.cos(p),l.y=t*Math.sin(p),u.subVectors(c,l).normalize(),o.push(u.x,u.y,u.z),h.push(d/s),h.push(n/i)}for(let t=1;t<=i;t++)for(let e=1;e<=s;e++){const i=(s+1)*t+e-1,r=(s+1)*(t-1)+e-1,a=(s+1)*(t-1)+e,o=(s+1)*t+e;n.push(i,r,o),n.push(r,a,o)}this.setIndex(n),this.setAttribute("position",new Nn(a,3)),this.setAttribute("normal",new Nn(o,3)),this.setAttribute("uv",new Nn(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ql(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Jl extends Wn{constructor(t=1,e=.4,i=64,s=8,r=2,n=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:t,tube:e,tubularSegments:i,radialSegments:s,p:r,q:n},i=Math.floor(i),s=Math.floor(s);const a=[],o=[],h=[],l=[],c=new ws,u=new ws,d=new ws,p=new ws,m=new ws,y=new ws,g=new ws;for(let a=0;a<=i;++a){const x=a/i*r*Math.PI*2;f(x,r,n,t,d),f(x+.01,r,n,t,p),y.subVectors(p,d),g.addVectors(p,d),m.crossVectors(y,g),g.crossVectors(m,y),m.normalize(),g.normalize();for(let t=0;t<=s;++t){const r=t/s*Math.PI*2,n=-e*Math.cos(r),p=e*Math.sin(r);c.x=d.x+(n*g.x+p*m.x),c.y=d.y+(n*g.y+p*m.y),c.z=d.z+(n*g.z+p*m.z),o.push(c.x,c.y,c.z),u.subVectors(c,d).normalize(),h.push(u.x,u.y,u.z),l.push(a/i),l.push(t/s)}}for(let t=1;t<=i;t++)for(let e=1;e<=s;e++){const i=(s+1)*(t-1)+(e-1),r=(s+1)*t+(e-1),n=(s+1)*t+e,o=(s+1)*(t-1)+e;a.push(i,r,o),a.push(r,n,o)}function f(t,e,i,s,r){const n=Math.cos(t),a=Math.sin(t),o=i/e*t,h=Math.cos(o);r.x=s*(2+h)*.5*n,r.y=s*(2+h)*a*.5,r.z=s*Math.sin(o)*.5}this.setIndex(a),this.setAttribute("position",new Nn(o,3)),this.setAttribute("normal",new Nn(h,3)),this.setAttribute("uv",new Nn(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jl(t.radius,t.tube,t.tubularSegments,t.radialSegments,t.p,t.q)}}class Xl extends Wn{constructor(t=new Qh(new ws(-1,-1,0),new ws(-1,1,0),new ws(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};const n=t.computeFrenetFrames(e,r);this.tangents=n.tangents,this.normals=n.normals,this.binormals=n.binormals;const a=new ws,o=new ws,h=new bs;let l=new ws;const c=[],u=[],d=[],p=[];function m(r){l=t.getPointAt(r/e,l);const h=n.normals[r],d=n.binormals[r];for(let t=0;t<=s;t++){const e=t/s*Math.PI*2,r=Math.sin(e),n=-Math.cos(e);o.x=n*h.x+r*d.x,o.y=n*h.y+r*d.y,o.z=n*h.z+r*d.z,o.normalize(),u.push(o.x,o.y,o.z),a.x=l.x+i*o.x,a.y=l.y+i*o.y,a.z=l.z+i*o.z,c.push(a.x,a.y,a.z)}}!function(){for(let t=0;t<e;t++)m(t);m(!1===r?e:0),function(){for(let t=0;t<=e;t++)for(let i=0;i<=s;i++)h.x=t/e,h.y=i/s,d.push(h.x,h.y)}(),function(){for(let t=1;t<=e;t++)for(let e=1;e<=s;e++){const i=(s+1)*(t-1)+(e-1),r=(s+1)*t+(e-1),n=(s+1)*t+e,a=(s+1)*(t-1)+e;p.push(i,r,a),p.push(r,n,a)}}()}(),this.setIndex(p),this.setAttribute("position",new Nn(c,3)),this.setAttribute("normal",new Nn(u,3)),this.setAttribute("uv",new Nn(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Xl((new tl[t.path.type]).fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Yl extends Wn{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},null!==t){const e=[],i=new Set,s=new ws,r=new ws;if(null!==t.index){const n=t.attributes.position,a=t.index;let o=t.groups;0===o.length&&(o=[{start:0,count:a.count,materialIndex:0}]);for(let t=0,h=o.length;t<h;++t){const h=o[t],l=h.start;for(let t=l,o=l+h.count;t<o;t+=3)for(let o=0;o<3;o++){const h=a.getX(t+o),l=a.getX(t+(o+1)%3);s.fromBufferAttribute(n,h),r.fromBufferAttribute(n,l),!0===Zl(s,r,i)&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}}else{const n=t.attributes.position;for(let t=0,a=n.count/3;t<a;t++)for(let a=0;a<3;a++){const o=3*t+a,h=3*t+(a+1)%3;s.fromBufferAttribute(n,o),r.fromBufferAttribute(n,h),!0===Zl(s,r,i)&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new Nn(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function Zl(t,e,i){const s=`${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`;return!0!==i.has(s)&&!0!==i.has(r)&&(i.add(s),i.add(r),!0)}var Hl=Object.freeze({__proto__:null,BoxGeometry:sa,CapsuleGeometry:_h,CircleGeometry:Ah,ConeGeometry:zh,CylinderGeometry:Th,DodecahedronGeometry:Ih,EdgesGeometry:Rh,ExtrudeGeometry:Rl,IcosahedronGeometry:Vl,LatheGeometry:Fl,OctahedronGeometry:Ll,PlaneGeometry:El,PolyhedronGeometry:Ch,RingGeometry:jl,ShapeGeometry:Dl,SphereGeometry:Ul,TetrahedronGeometry:Wl,TorusGeometry:ql,TorusKnotGeometry:Jl,TubeGeometry:Xl,WireframeGeometry:Yl});class Gl extends gn{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new pn(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}}class $l extends ha{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ql extends gn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new pn(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pn(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new bs(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Br,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Kl extends Ql{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new bs(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ps(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new pn(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new pn(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new pn(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class tc extends gn{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new pn(16777215),this.specular=new pn(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pn(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new bs(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Br,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ec extends gn{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new pn(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pn(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new bs(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class ic extends gn{constructor(t){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new bs(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}}class sc extends gn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new pn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pn(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new bs(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Br,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class rc extends gn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class nc extends gn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class ac extends gn{constructor(t){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new pn(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new bs(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={MATCAP:""},this.color.copy(t.color),this.matcap=t.matcap,this.map=t.map,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this.fog=t.fog,this}}class oc extends Yo{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}function hc(t,e){return t&&t.constructor!==e?"number"==typeof e.BYTES_PER_ELEMENT?new e(t):Array.prototype.slice.call(t):t}function lc(t){const e=t.length,i=new Array(e);for(let t=0;t!==e;++t)i[t]=t;return i.sort(function(e,i){return t[e]-t[i]}),i}function cc(t,e,i){const s=t.length,r=new t.constructor(s);for(let n=0,a=0;a!==s;++n){const s=i[n]*e;for(let i=0;i!==e;++i)r[a++]=t[s+i]}return r}function uc(t,e,i,s){let r=1,n=t[0];for(;void 0!==n&&void 0===n[s];)n=t[r++];if(void 0===n)return;let a=n[s];if(void 0!==a)if(Array.isArray(a))do{a=n[s],void 0!==a&&(e.push(n.time),i.push(...a)),n=t[r++]}while(void 0!==n);else if(void 0!==a.toArray)do{a=n[s],void 0!==a&&(e.push(n.time),a.toArray(i,i.length)),n=t[r++]}while(void 0!==n);else do{a=n[s],void 0!==a&&(e.push(n.time),i.push(a)),n=t[r++]}while(void 0!==n)}class dc{static convertArray(t,e){return hc(t,e)}static isTypedArray(t){return Hi(t)}static getKeyframeOrder(t){return lc(t)}static sortedArray(t,e,i){return cc(t,e,i)}static flattenJSON(t,e,i,s){uc(t,e,i,s)}static subclip(t,e,i,s,r=30){return function(t,e,i,s,r=30){const n=t.clone();n.name=e;const a=[];for(let t=0;t<n.tracks.length;++t){const e=n.tracks[t],o=e.getValueSize(),h=[],l=[];for(let t=0;t<e.times.length;++t){const n=e.times[t]*r;if(!(n<i||n>=s)){h.push(e.times[t]);for(let i=0;i<o;++i)l.push(e.values[t*o+i])}}0!==h.length&&(e.times=hc(h,e.times.constructor),e.values=hc(l,e.values.constructor),a.push(e))}n.tracks=a;let o=1/0;for(let t=0;t<n.tracks.length;++t)o>n.tracks[t].times[0]&&(o=n.tracks[t].times[0]);for(let t=0;t<n.tracks.length;++t)n.tracks[t].shift(-1*o);return n.resetDuration(),n}(t,e,i,s,r)}static makeClipAdditive(t,e=0,i=t,s=30){return function(t,e=0,i=t,s=30){s<=0&&(s=30);const r=i.tracks.length,n=e/s;for(let e=0;e<r;++e){const s=i.tracks[e],r=s.ValueTypeName;if("bool"===r||"string"===r)continue;const a=t.tracks.find(function(t){return t.name===s.name&&t.ValueTypeName===r});if(void 0===a)continue;let o=0;const h=s.getValueSize();s.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(o=h/3);let l=0;const c=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(l=c/3);const u=s.times.length-1;let d;if(n<=s.times[0]){const t=o,e=h-o;d=s.values.slice(t,e)}else if(n>=s.times[u]){const t=u*h+o,e=t+h-o;d=s.values.slice(t,e)}else{const t=s.createInterpolant(),e=o,i=h-o;t.evaluate(n),d=t.resultBuffer.slice(e,i)}"quaternion"===r&&(new vs).fromArray(d).normalize().conjugate().toArray(d);const p=a.times.length;for(let t=0;t<p;++t){const e=t*c+l;if("quaternion"===r)vs.multiplyQuaternionsFlat(a.values,e,d,0,a.values,e);else{const t=c-2*l;for(let i=0;i<t;++i)a.values[e+i]-=d[i]}}}return t.blendMode=Ue,t}(t,e,i,s)}}class pc{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=void 0!==s?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let i=this._cachedIndex,s=e[i],r=e[i-1];t:{e:{let n;i:{s:if(!(t<s)){for(let n=i+2;;){if(void 0===s){if(t<r)break s;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===n)break;if(r=s,s=e[++i],t<s)break e}n=e.length;break i}if(!(t>=r)){const a=e[1];t<a&&(i=2,r=a);for(let n=i-2;;){if(void 0===r)return this._cachedIndex=0,this.copySampleValue_(0);if(i===n)break;if(s=r,r=e[--i-1],t>=r)break e}n=i,i=0;break i}break t}for(;i<n;){const s=i+n>>>1;t<e[s]?n=s:i=s+1}if(s=e[i],r=e[i-1],void 0===r)return this._cachedIndex=0,this.copySampleValue_(0);if(void 0===s)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let t=0;t!==s;++t)e[t]=i[r+t];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class mc extends pc{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Le,endingEnd:Le}}intervalChanged_(t,e,i){const s=this.parameterPositions;let r=t-2,n=t+1,a=s[r],o=s[n];if(void 0===a)switch(this.getSettings_().endingStart){case Ee:r=t,a=2*e-i;break;case je:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(void 0===o)switch(this.getSettings_().endingEnd){case Ee:n=t,o=2*i-e;break;case je:n=1,o=i+s[1]-s[0];break;default:n=t-1,o=e}const h=.5*(i-e),l=this.valueSize;this._weightPrev=h/(e-a),this._weightNext=h/(o-i),this._offsetPrev=r*l,this._offsetNext=n*l}interpolate_(t,e,i,s){const r=this.resultBuffer,n=this.sampleValues,a=this.valueSize,o=t*a,h=o-a,l=this._offsetPrev,c=this._offsetNext,u=this._weightPrev,d=this._weightNext,p=(i-e)/(s-e),m=p*p,y=m*p,g=-u*y+2*u*m-u*p,f=(1+u)*y+(-1.5-2*u)*m+(-.5+u)*p+1,x=(-1-d)*y+(1.5+d)*m+.5*p,b=d*y-d*m;for(let t=0;t!==a;++t)r[t]=g*n[l+t]+f*n[h+t]+x*n[o+t]+b*n[c+t];return r}}class yc extends pc{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){const r=this.resultBuffer,n=this.sampleValues,a=this.valueSize,o=t*a,h=o-a,l=(i-e)/(s-e),c=1-l;for(let t=0;t!==a;++t)r[t]=n[h+t]*c+n[o+t]*l;return r}}class gc extends pc{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}}class fc{constructor(t,e,i,s){if(void 0===t)throw new Error("THREE.KeyframeTrack: track name is undefined");if(void 0===e||0===e.length)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=hc(e,this.TimeBufferType),this.values=hc(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:hc(t.times,Array),values:hc(t.values,Array)};const e=t.getInterpolation();e!==t.DefaultInterpolation&&(i.interpolation=e)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new gc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new yc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new mc(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ne:e=this.InterpolantFactoryMethodDiscrete;break;case Ve:e=this.InterpolantFactoryMethodLinear;break;case Fe:e=this.InterpolantFactoryMethodSmooth}if(void 0===e){const e="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(void 0===this.createInterpolant){if(t===this.DefaultInterpolation)throw new Error(e);this.setInterpolation(this.DefaultInterpolation)}return ss("KeyframeTrack:",e),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ne;case this.InterpolantFactoryMethodLinear:return Ve;case this.InterpolantFactoryMethodSmooth:return Fe}}getValueSize(){return this.values.length/this.times.length}shift(t){if(0!==t){const e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(1!==t){const e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){const i=this.times,s=i.length;let r=0,n=s-1;for(;r!==s&&i[r]<t;)++r;for(;-1!==n&&i[n]>e;)--n;if(++n,0!==r||n!==s){r>=n&&(n=Math.max(n,1),r=n-1);const t=this.getValueSize();this.times=i.slice(r,n),this.values=this.values.slice(r*t,n*t)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(rs("KeyframeTrack: Invalid value size in track.",this),t=!1);const i=this.times,s=this.values,r=i.length;0===r&&(rs("KeyframeTrack: Track is empty.",this),t=!1);let n=null;for(let e=0;e!==r;e++){const s=i[e];if("number"==typeof s&&isNaN(s)){rs("KeyframeTrack: Time is not a valid number.",this,e,s),t=!1;break}if(null!==n&&n>s){rs("KeyframeTrack: Out of order keys.",this,e,s,n),t=!1;break}n=s}if(void 0!==s&&Hi(s))for(let e=0,i=s.length;e!==i;++e){const i=s[e];if(isNaN(i)){rs("KeyframeTrack: Value is not a valid number.",this,e,i),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Fe,r=t.length-1;let n=1;for(let a=1;a<r;++a){let r=!1;const o=t[a];if(o!==t[a+1]&&(1!==a||o!==t[0]))if(s)r=!0;else{const t=a*i,s=t-i,n=t+i;for(let a=0;a!==i;++a){const i=e[t+a];if(i!==e[s+a]||i!==e[n+a]){r=!0;break}}}if(r){if(a!==n){t[n]=t[a];const s=a*i,r=n*i;for(let t=0;t!==i;++t)e[r+t]=e[s+t]}++n}}if(r>0){t[n]=t[r];for(let t=r*i,s=n*i,a=0;a!==i;++a)e[s+a]=e[t+a];++n}return n!==t.length?(this.times=t.slice(0,n),this.values=e.slice(0,n*i)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),i=new(0,this.constructor)(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}fc.prototype.ValueTypeName="",fc.prototype.TimeBufferType=Float32Array,fc.prototype.ValueBufferType=Float32Array,fc.prototype.DefaultInterpolation=Ve;class xc extends fc{constructor(t,e,i){super(t,e,i)}}xc.prototype.ValueTypeName="bool",xc.prototype.ValueBufferType=Array,xc.prototype.DefaultInterpolation=Ne,xc.prototype.InterpolantFactoryMethodLinear=void 0,xc.prototype.InterpolantFactoryMethodSmooth=void 0;class bc extends fc{constructor(t,e,i,s){super(t,e,i,s)}}bc.prototype.ValueTypeName="color";class vc extends fc{constructor(t,e,i,s){super(t,e,i,s)}}vc.prototype.ValueTypeName="number";class wc extends pc{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){const r=this.resultBuffer,n=this.sampleValues,a=this.valueSize,o=(i-e)/(s-e);let h=t*a;for(let t=h+a;h!==t;h+=4)vs.slerpFlat(r,0,n,h-a,n,h,o);return r}}class Mc extends fc{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new wc(this.times,this.values,this.getValueSize(),t)}}Mc.prototype.ValueTypeName="quaternion",Mc.prototype.InterpolantFactoryMethodSmooth=void 0;class Sc extends fc{constructor(t,e,i){super(t,e,i)}}Sc.prototype.ValueTypeName="string",Sc.prototype.ValueBufferType=Array,Sc.prototype.DefaultInterpolation=Ne,Sc.prototype.InterpolantFactoryMethodLinear=void 0,Sc.prototype.InterpolantFactoryMethodSmooth=void 0;class _c extends fc{constructor(t,e,i,s){super(t,e,i,s)}}_c.prototype.ValueTypeName="vector";class Ac{constructor(t="",e=-1,i=[],s=2500){this.name=t,this.tracks=i,this.duration=e,this.blendMode=s,this.uuid=ds(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){const e=[],i=t.tracks,s=1/(t.fps||1);for(let t=0,r=i.length;t!==r;++t)e.push(Tc(i[t]).scale(s));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){const e=[],i=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let t=0,s=i.length;t!==s;++t)e.push(fc.toJSON(i[t]));return s}static CreateFromMorphTargetSequence(t,e,i,s){const r=e.length,n=[];for(let t=0;t<r;t++){let a=[],o=[];a.push((t+r-1)%r,t,(t+1)%r),o.push(0,1,0);const h=lc(a);a=cc(a,1,h),o=cc(o,1,h),s||0!==a[0]||(a.push(r),o.push(o[0])),n.push(new vc(".morphTargetInfluences["+e[t].name+"]",a,o).scale(1/i))}return new this(t,-1,n)}static findByName(t,e){let i=t;if(!Array.isArray(t)){const e=t;i=e.geometry&&e.geometry.animations||e.animations}for(let t=0;t<i.length;t++)if(i[t].name===e)return i[t];return null}static CreateClipsFromMorphTargetSequences(t,e,i){const s={},r=/^([\w-]*?)([\d]+)$/;for(let e=0,i=t.length;e<i;e++){const i=t[e],n=i.name.match(r);if(n&&n.length>1){const t=n[1];let e=s[t];e||(s[t]=e=[]),e.push(i)}}const n=[];for(const t in s)n.push(this.CreateFromMorphTargetSequence(t,s[t],e,i));return n}static parseAnimation(t,e){if(ss("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!t)return rs("AnimationClip: No animation in JSONLoader data."),null;const i=function(t,e,i,s,r){if(0!==i.length){const n=[],a=[];uc(i,n,a,s),0!==n.length&&r.push(new t(e,n,a))}},s=[],r=t.name||"default",n=t.fps||30,a=t.blendMode;let o=t.length||-1;const h=t.hierarchy||[];for(let t=0;t<h.length;t++){const r=h[t].keys;if(r&&0!==r.length)if(r[0].morphTargets){const t={};let e;for(e=0;e<r.length;e++)if(r[e].morphTargets)for(let i=0;i<r[e].morphTargets.length;i++)t[r[e].morphTargets[i]]=-1;for(const i in t){const t=[],n=[];for(let s=0;s!==r[e].morphTargets.length;++s){const s=r[e];t.push(s.time),n.push(s.morphTarget===i?1:0)}s.push(new vc(".morphTargetInfluence["+i+"]",t,n))}o=t.length*n}else{const n=".bones["+e[t].name+"]";i(_c,n+".position",r,"pos",s),i(Mc,n+".quaternion",r,"rot",s),i(_c,n+".scale",r,"scl",s)}}if(0===s.length)return null;return new this(r,o,s,a)}resetDuration(){let t=0;for(let e=0,i=this.tracks.length;e!==i;++e){const i=this.tracks[e];t=Math.max(t,i.times[i.times.length-1])}return this.duration=t,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());const e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}}function Tc(t){if(void 0===t.type)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=function(t){switch(t.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return vc;case"vector":case"vector2":case"vector3":case"vector4":return _c;case"color":return bc;case"quaternion":return Mc;case"bool":case"boolean":return xc;case"string":return Sc}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+t)}(t.type);if(void 0===t.times){const e=[],i=[];uc(t.keys,e,i,"value"),t.times=e,t.values=i}return void 0!==e.parse?e.parse(t):new e(t.name,t.times,t.values,t.interpolation)}const zc={enabled:!1,files:{},add:function(t,e){!1!==this.enabled&&(this.files[t]=e)},get:function(t){if(!1!==this.enabled)return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}};class Cc{constructor(t,e,i){const s=this;let r,n=!1,a=0,o=0;const h=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(t){o++,!1===n&&void 0!==s.onStart&&s.onStart(t,a,o),n=!0},this.itemEnd=function(t){a++,void 0!==s.onProgress&&s.onProgress(t,a,o),a===o&&(n=!1,void 0!==s.onLoad&&s.onLoad())},this.itemError=function(t){void 0!==s.onError&&s.onError(t)},this.resolveURL=function(t){return r?r(t):t},this.setURLModifier=function(t){return r=t,this},this.addHandler=function(t,e){return h.push(t,e),this},this.removeHandler=function(t){const e=h.indexOf(t);return-1!==e&&h.splice(e,2),this},this.getHandler=function(t){for(let e=0,i=h.length;e<i;e+=2){const i=h[e],s=h[e+1];if(i.global&&(i.lastIndex=0),i.test(t))return s}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Ic=new Cc;class Bc{constructor(t){this.manager=void 0!==t?t:Ic,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}Bc.DEFAULT_MATERIAL_NAME="__DEFAULT";const kc={};class Oc extends Error{constructor(t,e){super(t),this.response=e}}class Pc extends Bc{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,i,s){void 0===t&&(t=""),void 0!==this.path&&(t=this.path+t),t=this.manager.resolveURL(t);const r=zc.get(`file:${t}`);if(void 0!==r)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(void 0!==kc[t])return void kc[t].push({onLoad:e,onProgress:i,onError:s});kc[t]=[],kc[t].push({onLoad:e,onProgress:i,onError:s});const n=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:"function"==typeof AbortSignal.any?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,o=this.responseType;fetch(n).then(e=>{if(200===e.status||0===e.status){if(0===e.status&&ss("FileLoader: HTTP Status 0 received."),"undefined"==typeof ReadableStream||void 0===e.body||void 0===e.body.getReader)return e;const i=kc[t],s=e.body.getReader(),r=e.headers.get("X-File-Size")||e.headers.get("Content-Length"),n=r?parseInt(r):0,a=0!==n;let o=0;const h=new ReadableStream({start(t){!function e(){s.read().then(({done:s,value:r})=>{if(s)t.close();else{o+=r.byteLength;const s=new ProgressEvent("progress",{lengthComputable:a,loaded:o,total:n});for(let t=0,e=i.length;t<e;t++){const e=i[t];e.onProgress&&e.onProgress(s)}t.enqueue(r),e()}},e=>{t.error(e)})}()}});return new Response(h)}throw new Oc(`fetch for "${e.url}" responded with ${e.status}: ${e.statusText}`,e)}).then(t=>{switch(o){case"arraybuffer":return t.arrayBuffer();case"blob":return t.blob();case"document":return t.text().then(t=>(new DOMParser).parseFromString(t,a));case"json":return t.json();default:if(""===a)return t.text();{const e=/charset="?([^;"\s]*)"?/i.exec(a),i=e&&e[1]?e[1].toLowerCase():void 0,s=new TextDecoder(i);return t.arrayBuffer().then(t=>s.decode(t))}}}).then(e=>{zc.add(`file:${t}`,e);const i=kc[t];delete kc[t];for(let t=0,s=i.length;t<s;t++){const s=i[t];s.onLoad&&s.onLoad(e)}}).catch(e=>{const i=kc[t];if(void 0===i)throw this.manager.itemError(t),e;delete kc[t];for(let t=0,s=i.length;t<s;t++){const s=i[t];s.onError&&s.onError(e)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Rc extends Bc{constructor(t){super(t)}load(t,e,i,s){const r=this,n=new Pc(this.manager);n.setPath(this.path),n.setRequestHeader(this.requestHeader),n.setWithCredentials(this.withCredentials),n.load(t,function(i){try{e(r.parse(JSON.parse(i)))}catch(e){s?s(e):rs(e),r.manager.itemError(t)}},i,s)}parse(t){const e=[];for(let i=0;i<t.length;i++){const s=Ac.parse(t[i]);e.push(s)}return e}}class Nc extends Bc{constructor(t){super(t)}load(t,e,i,s){const r=this,n=[],a=new fh,o=new Pc(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(r.withCredentials);let h=0;function l(l){o.load(t[l],function(t){const i=r.parse(t,!0);n[l]={width:i.width,height:i.height,format:i.format,mipmaps:i.mipmaps},h+=1,6===h&&(1===i.mipmapCount&&(a.minFilter=wt),a.image=n,a.format=i.format,a.needsUpdate=!0,e&&e(a))},i,s)}if(Array.isArray(t))for(let e=0,i=t.length;e<i;++e)l(e);else o.load(t,function(t){const i=r.parse(t,!0);if(i.isCubemap){const t=i.mipmaps.length/i.mipmapCount;for(let e=0;e<t;e++){n[e]={mipmaps:[]};for(let t=0;t<i.mipmapCount;t++)n[e].mipmaps.push(i.mipmaps[e*i.mipmapCount+t]),n[e].format=i.format,n[e].width=i.width,n[e].height=i.height}a.image=n}else a.image.width=i.width,a.image.height=i.height,a.mipmaps=i.mipmaps;1===i.mipmapCount&&(a.minFilter=wt),a.format=i.format,a.needsUpdate=!0,e&&e(a)},i,s);return a}}const Vc=new WeakMap;class Fc extends Bc{constructor(t){super(t)}load(t,e,i,s){void 0!==this.path&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,n=zc.get(`image:${t}`);if(void 0!==n){if(!0===n.complete)r.manager.itemStart(t),setTimeout(function(){e&&e(n),r.manager.itemEnd(t)},0);else{let t=Vc.get(n);void 0===t&&(t=[],Vc.set(n,t)),t.push({onLoad:e,onError:s})}return n}const a=Gi("img");function o(){l(),e&&e(this);const i=Vc.get(this)||[];for(let t=0;t<i.length;t++){const e=i[t];e.onLoad&&e.onLoad(this)}Vc.delete(this),r.manager.itemEnd(t)}function h(e){l(),s&&s(e),zc.remove(`image:${t}`);const i=Vc.get(this)||[];for(let t=0;t<i.length;t++){const s=i[t];s.onError&&s.onError(e)}Vc.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function l(){a.removeEventListener("load",o,!1),a.removeEventListener("error",h,!1)}return a.addEventListener("load",o,!1),a.addEventListener("error",h,!1),"data:"!==t.slice(0,5)&&void 0!==this.crossOrigin&&(a.crossOrigin=this.crossOrigin),zc.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}}class Lc extends Bc{constructor(t){super(t)}load(t,e,i,s){const r=new ga;r.colorSpace=Ke;const n=new Fc(this.manager);n.setCrossOrigin(this.crossOrigin),n.setPath(this.path);let a=0;function o(i){n.load(t[i],function(t){r.images[i]=t,a++,6===a&&(r.needsUpdate=!0,e&&e(r))},void 0,s)}for(let e=0;e<t.length;++e)o(e);return r}}class Ec extends Bc{constructor(t){super(t)}load(t,e,i,s){const r=this,n=new so,a=new Pc(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(t,function(t){let i;try{i=r.parse(t)}catch(t){if(void 0===s)return void t(t);s(t)}void 0!==i.image?n.image=i.image:void 0!==i.data&&(n.image.width=i.width,n.image.height=i.height,n.image.data=i.data),n.wrapS=void 0!==i.wrapS?i.wrapS:mt,n.wrapT=void 0!==i.wrapT?i.wrapT:mt,n.magFilter=void 0!==i.magFilter?i.magFilter:wt,n.minFilter=void 0!==i.minFilter?i.minFilter:wt,n.anisotropy=void 0!==i.anisotropy?i.anisotropy:1,void 0!==i.colorSpace&&(n.colorSpace=i.colorSpace),void 0!==i.flipY&&(n.flipY=i.flipY),void 0!==i.format&&(n.format=i.format),void 0!==i.type&&(n.type=i.type),void 0!==i.mipmaps&&(n.mipmaps=i.mipmaps,n.minFilter=_t),1===i.mipmapCount&&(n.minFilter=wt),void 0!==i.generateMipmaps&&(n.generateMipmaps=i.generateMipmaps),n.needsUpdate=!0,e&&e(n,i)},i,s),n}}class jc extends Bc{constructor(t){super(t)}load(t,e,i,s){const r=new Es,n=new Fc(this.manager);return n.setCrossOrigin(this.crossOrigin),n.setPath(this.path),n.load(t,function(t){r.image=t,r.needsUpdate=!0,void 0!==e&&e(r)},i,s),r}}class Dc extends Yr{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new pn(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Uc extends Dc{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Yr.DEFAULT_UP),this.updateMatrix(),this.groundColor=new pn(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Wc=new vr,qc=new ws,Jc=new ws;class Xc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new bs(512,512),this.mapType=Tt,this.map=null,this.mapPass=null,this.matrix=new vr,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _o,this._frameExtents=new bs(1,1),this._viewportCount=1,this._viewports=[new js(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;qc.setFromMatrixPosition(t.matrixWorld),e.position.copy(qc),Jc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Jc),e.updateMatrixWorld(),Wc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wc,e.coordinateSystem,e.reversedDepth),e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Wc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return(new this.constructor).copy(this)}toJSON(){const t={};return 1!==this.intensity&&(t.intensity=this.intensity),0!==this.bias&&(t.bias=this.bias),0!==this.normalBias&&(t.normalBias=this.normalBias),1!==this.radius&&(t.radius=this.radius),512===this.mapSize.x&&512===this.mapSize.y||(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Yc extends Xc{constructor(){super(new pa(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,i=2*us*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;i===e.fov&&s===e.aspect&&r===e.far||(e.fov=i,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Zc extends Dc{constructor(t,e,i=0,s=Math.PI/3,r=0,n=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Yr.DEFAULT_UP),this.updateMatrix(),this.target=new Yr,this.distance=i,this.angle=s,this.penumbra=r,this.decay=n,this.map=null,this.shadow=new Yc}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}}class Hc extends Xc{constructor(){super(new pa(90,1,.5,500)),this.isPointLightShadow=!0}}class Gc extends Dc{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Hc}get power(){return 4*this.intensity*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class $c extends la{constructor(t=-1,e=1,i=1,s=-1,r=.1,n=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=n,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=null===t.view?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,n){null===this.view&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=n,this.updateProjectionMatrix()}clearViewOffset(){null!==this.view&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,n=i+t,a=s+e,o=s-e;if(null!==this.view&&this.view.enabled){const t=(this.right-this.left)/this.view.fullWidth/this.zoom,e=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=t*this.view.offsetX,n=r+t*this.view.width,a-=e*this.view.offsetY,o=a-e*this.view.height}this.projectionMatrix.makeOrthographic(r,n,a,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,null!==this.view&&(e.object.view=Object.assign({},this.view)),e}}class Qc extends Xc{constructor(){super(new $c(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Kc extends Dc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Yr.DEFAULT_UP),this.updateMatrix(),this.target=new Yr,this.shadow=new Qc}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class tu extends Dc{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class eu extends Dc{constructor(t,e,i=10,s=10){super(t,e),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=i,this.height=s}get power(){return this.intensity*this.width*this.height*Math.PI}set power(t){this.intensity=t/(this.width*this.height*Math.PI)}copy(t){return super.copy(t),this.width=t.width,this.height=t.height,this}toJSON(t){const e=super.toJSON(t);return e.object.width=this.width,e.object.height=this.height,e}}class iu{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let t=0;t<9;t++)this.coefficients.push(new ws)}set(t){for(let e=0;e<9;e++)this.coefficients[e].copy(t[e]);return this}zero(){for(let t=0;t<9;t++)this.coefficients[t].set(0,0,0);return this}getAt(t,e){const i=t.x,s=t.y,r=t.z,n=this.coefficients;return e.copy(n[0]).multiplyScalar(.282095),e.addScaledVector(n[1],.488603*s),e.addScaledVector(n[2],.488603*r),e.addScaledVector(n[3],.488603*i),e.addScaledVector(n[4],i*s*1.092548),e.addScaledVector(n[5],s*r*1.092548),e.addScaledVector(n[6],.315392*(3*r*r-1)),e.addScaledVector(n[7],i*r*1.092548),e.addScaledVector(n[8],.546274*(i*i-s*s)),e}getIrradianceAt(t,e){const i=t.x,s=t.y,r=t.z,n=this.coefficients;return e.copy(n[0]).multiplyScalar(.886227),e.addScaledVector(n[1],1.023328*s),e.addScaledVector(n[2],1.023328*r),e.addScaledVector(n[3],1.023328*i),e.addScaledVector(n[4],.858086*i*s),e.addScaledVector(n[5],.858086*s*r),e.addScaledVector(n[6],.743125*r*r-.247708),e.addScaledVector(n[7],.858086*i*r),e.addScaledVector(n[8],.429043*(i*i-s*s)),e}add(t){for(let e=0;e<9;e++)this.coefficients[e].add(t.coefficients[e]);return this}addScaledSH(t,e){for(let i=0;i<9;i++)this.coefficients[i].addScaledVector(t.coefficients[i],e);return this}scale(t){for(let e=0;e<9;e++)this.coefficients[e].multiplyScalar(t);return this}lerp(t,e){for(let i=0;i<9;i++)this.coefficients[i].lerp(t.coefficients[i],e);return this}equals(t){for(let e=0;e<9;e++)if(!this.coefficients[e].equals(t.coefficients[e]))return!1;return!0}copy(t){return this.set(t.coefficients)}clone(){return(new this.constructor).copy(this)}fromArray(t,e=0){const i=this.coefficients;for(let s=0;s<9;s++)i[s].fromArray(t,e+3*s);return this}toArray(t=[],e=0){const i=this.coefficients;for(let s=0;s<9;s++)i[s].toArray(t,e+3*s);return t}static getBasisAt(t,e){const i=t.x,s=t.y,r=t.z;e[0]=.282095,e[1]=.488603*s,e[2]=.488603*r,e[3]=.488603*i,e[4]=1.092548*i*s,e[5]=1.092548*s*r,e[6]=.315392*(3*r*r-1),e[7]=1.092548*i*r,e[8]=.546274*(i*i-s*s)}}class su extends Dc{constructor(t=new iu,e=1){super(void 0,e),this.isLightProbe=!0,this.sh=t}copy(t){return super.copy(t),this.sh.copy(t.sh),this}toJSON(t){const e=super.toJSON(t);return e.object.sh=this.sh.toArray(),e}}class ru extends Bc{constructor(t){super(t),this.textures={}}load(t,e,i,s){const r=this,n=new Pc(r.manager);n.setPath(r.path),n.setRequestHeader(r.requestHeader),n.setWithCredentials(r.withCredentials),n.load(t,function(i){try{e(r.parse(JSON.parse(i)))}catch(e){s?s(e):rs(e),r.manager.itemError(t)}},i,s)}parse(t){const e=this.textures;function i(t){return void 0===e[t]&&ss("MaterialLoader: Undefined texture",t),e[t]}const s=this.createMaterialFromType(t.type);if(void 0!==t.uuid&&(s.uuid=t.uuid),void 0!==t.name&&(s.name=t.name),void 0!==t.color&&void 0!==s.color&&s.color.setHex(t.color),void 0!==t.roughness&&(s.roughness=t.roughness),void 0!==t.metalness&&(s.metalness=t.metalness),void 0!==t.sheen&&(s.sheen=t.sheen),void 0!==t.sheenColor&&(s.sheenColor=(new pn).setHex(t.sheenColor)),void 0!==t.sheenRoughness&&(s.sheenRoughness=t.sheenRoughness),void 0!==t.emissive&&void 0!==s.emissive&&s.emissive.setHex(t.emissive),void 0!==t.specular&&void 0!==s.specular&&s.specular.setHex(t.specular),void 0!==t.specularIntensity&&(s.specularIntensity=t.specularIntensity),void 0!==t.specularColor&&void 0!==s.specularColor&&s.specularColor.setHex(t.specularColor),void 0!==t.shininess&&(s.shininess=t.shininess),void 0!==t.clearcoat&&(s.clearcoat=t.clearcoat),void 0!==t.clearcoatRoughness&&(s.clearcoatRoughness=t.clearcoatRoughness),void 0!==t.dispersion&&(s.dispersion=t.dispersion),void 0!==t.iridescence&&(s.iridescence=t.iridescence),void 0!==t.iridescenceIOR&&(s.iridescenceIOR=t.iridescenceIOR),void 0!==t.iridescenceThicknessRange&&(s.iridescenceThicknessRange=t.iridescenceThicknessRange),void 0!==t.transmission&&(s.transmission=t.transmission),void 0!==t.thickness&&(s.thickness=t.thickness),void 0!==t.attenuationDistance&&(s.attenuationDistance=t.attenuationDistance),void 0!==t.attenuationColor&&void 0!==s.attenuationColor&&s.attenuationColor.setHex(t.attenuationColor),void 0!==t.anisotropy&&(s.anisotropy=t.anisotropy),void 0!==t.anisotropyRotation&&(s.anisotropyRotation=t.anisotropyRotation),void 0!==t.fog&&(s.fog=t.fog),void 0!==t.flatShading&&(s.flatShading=t.flatShading),void 0!==t.blending&&(s.blending=t.blending),void 0!==t.combine&&(s.combine=t.combine),void 0!==t.side&&(s.side=t.side),void 0!==t.shadowSide&&(s.shadowSide=t.shadowSide),void 0!==t.opacity&&(s.opacity=t.opacity),void 0!==t.transparent&&(s.transparent=t.transparent),void 0!==t.alphaTest&&(s.alphaTest=t.alphaTest),void 0!==t.alphaHash&&(s.alphaHash=t.alphaHash),void 0!==t.depthFunc&&(s.depthFunc=t.depthFunc),void 0!==t.depthTest&&(s.depthTest=t.depthTest),void 0!==t.depthWrite&&(s.depthWrite=t.depthWrite),void 0!==t.colorWrite&&(s.colorWrite=t.colorWrite),void 0!==t.blendSrc&&(s.blendSrc=t.blendSrc),void 0!==t.blendDst&&(s.blendDst=t.blendDst),void 0!==t.blendEquation&&(s.blendEquation=t.blendEquation),void 0!==t.blendSrcAlpha&&(s.blendSrcAlpha=t.blendSrcAlpha),void 0!==t.blendDstAlpha&&(s.blendDstAlpha=t.blendDstAlpha),void 0!==t.blendEquationAlpha&&(s.blendEquationAlpha=t.blendEquationAlpha),void 0!==t.blendColor&&void 0!==s.blendColor&&s.blendColor.setHex(t.blendColor),void 0!==t.blendAlpha&&(s.blendAlpha=t.blendAlpha),void 0!==t.stencilWriteMask&&(s.stencilWriteMask=t.stencilWriteMask),void 0!==t.stencilFunc&&(s.stencilFunc=t.stencilFunc),void 0!==t.stencilRef&&(s.stencilRef=t.stencilRef),void 0!==t.stencilFuncMask&&(s.stencilFuncMask=t.stencilFuncMask),void 0!==t.stencilFail&&(s.stencilFail=t.stencilFail),void 0!==t.stencilZFail&&(s.stencilZFail=t.stencilZFail),void 0!==t.stencilZPass&&(s.stencilZPass=t.stencilZPass),void 0!==t.stencilWrite&&(s.stencilWrite=t.stencilWrite),void 0!==t.wireframe&&(s.wireframe=t.wireframe),void 0!==t.wireframeLinewidth&&(s.wireframeLinewidth=t.wireframeLinewidth),void 0!==t.wireframeLinecap&&(s.wireframeLinecap=t.wireframeLinecap),void 0!==t.wireframeLinejoin&&(s.wireframeLinejoin=t.wireframeLinejoin),void 0!==t.rotation&&(s.rotation=t.rotation),void 0!==t.linewidth&&(s.linewidth=t.linewidth),void 0!==t.dashSize&&(s.dashSize=t.dashSize),void 0!==t.gapSize&&(s.gapSize=t.gapSize),void 0!==t.scale&&(s.scale=t.scale),void 0!==t.polygonOffset&&(s.polygonOffset=t.polygonOffset),void 0!==t.polygonOffsetFactor&&(s.polygonOffsetFactor=t.polygonOffsetFactor),void 0!==t.polygonOffsetUnits&&(s.polygonOffsetUnits=t.polygonOffsetUnits),void 0!==t.dithering&&(s.dithering=t.dithering),void 0!==t.alphaToCoverage&&(s.alphaToCoverage=t.alphaToCoverage),void 0!==t.premultipliedAlpha&&(s.premultipliedAlpha=t.premultipliedAlpha),void 0!==t.forceSinglePass&&(s.forceSinglePass=t.forceSinglePass),void 0!==t.allowOverride&&(s.allowOverride=t.allowOverride),void 0!==t.visible&&(s.visible=t.visible),void 0!==t.toneMapped&&(s.toneMapped=t.toneMapped),void 0!==t.userData&&(s.userData=t.userData),void 0!==t.vertexColors&&("number"==typeof t.vertexColors?s.vertexColors=t.vertexColors>0:s.vertexColors=t.vertexColors),void 0!==t.uniforms)for(const e in t.uniforms){const r=t.uniforms[e];switch(s.uniforms[e]={},r.type){case"t":s.uniforms[e].value=i(r.value);break;case"c":s.uniforms[e].value=(new pn).setHex(r.value);break;case"v2":s.uniforms[e].value=(new bs).fromArray(r.value);break;case"v3":s.uniforms[e].value=(new ws).fromArray(r.value);break;case"v4":s.uniforms[e].value=(new js).fromArray(r.value);break;case"m3":s.uniforms[e].value=(new _s).fromArray(r.value);break;case"m4":s.uniforms[e].value=(new vr).fromArray(r.value);break;default:s.uniforms[e].value=r.value}}if(void 0!==t.defines&&(s.defines=t.defines),void 0!==t.vertexShader&&(s.vertexShader=t.vertexShader),void 0!==t.fragmentShader&&(s.fragmentShader=t.fragmentShader),void 0!==t.glslVersion&&(s.glslVersion=t.glslVersion),void 0!==t.extensions)for(const e in t.extensions)s.extensions[e]=t.extensions[e];if(void 0!==t.lights&&(s.lights=t.lights),void 0!==t.clipping&&(s.clipping=t.clipping),void 0!==t.size&&(s.size=t.size),void 0!==t.sizeAttenuation&&(s.sizeAttenuation=t.sizeAttenuation),void 0!==t.map&&(s.map=i(t.map)),void 0!==t.matcap&&(s.matcap=i(t.matcap)),void 0!==t.alphaMap&&(s.alphaMap=i(t.alphaMap)),void 0!==t.bumpMap&&(s.bumpMap=i(t.bumpMap)),void 0!==t.bumpScale&&(s.bumpScale=t.bumpScale),void 0!==t.normalMap&&(s.normalMap=i(t.normalMap)),void 0!==t.normalMapType&&(s.normalMapType=t.normalMapType),void 0!==t.normalScale){let e=t.normalScale;!1===Array.isArray(e)&&(e=[e,e]),s.normalScale=(new bs).fromArray(e)}return void 0!==t.displacementMap&&(s.displacementMap=i(t.displacementMap)),void 0!==t.displacementScale&&(s.displacementScale=t.displacementScale),void 0!==t.displacementBias&&(s.displacementBias=t.displacementBias),void 0!==t.roughnessMap&&(s.roughnessMap=i(t.roughnessMap)),void 0!==t.metalnessMap&&(s.metalnessMap=i(t.metalnessMap)),void 0!==t.emissiveMap&&(s.emissiveMap=i(t.emissiveMap)),void 0!==t.emissiveIntensity&&(s.emissiveIntensity=t.emissiveIntensity),void 0!==t.specularMap&&(s.specularMap=i(t.specularMap)),void 0!==t.specularIntensityMap&&(s.specularIntensityMap=i(t.specularIntensityMap)),void 0!==t.specularColorMap&&(s.specularColorMap=i(t.specularColorMap)),void 0!==t.envMap&&(s.envMap=i(t.envMap)),void 0!==t.envMapRotation&&s.envMapRotation.fromArray(t.envMapRotation),void 0!==t.envMapIntensity&&(s.envMapIntensity=t.envMapIntensity),void 0!==t.reflectivity&&(s.reflectivity=t.reflectivity),void 0!==t.refractionRatio&&(s.refractionRatio=t.refractionRatio),void 0!==t.lightMap&&(s.lightMap=i(t.lightMap)),void 0!==t.lightMapIntensity&&(s.lightMapIntensity=t.lightMapIntensity),void 0!==t.aoMap&&(s.aoMap=i(t.aoMap)),void 0!==t.aoMapIntensity&&(s.aoMapIntensity=t.aoMapIntensity),void 0!==t.gradientMap&&(s.gradientMap=i(t.gradientMap)),void 0!==t.clearcoatMap&&(s.clearcoatMap=i(t.clearcoatMap)),void 0!==t.clearcoatRoughnessMap&&(s.clearcoatRoughnessMap=i(t.clearcoatRoughnessMap)),void 0!==t.clearcoatNormalMap&&(s.clearcoatNormalMap=i(t.clearcoatNormalMap)),void 0!==t.clearcoatNormalScale&&(s.clearcoatNormalScale=(new bs).fromArray(t.clearcoatNormalScale)),void 0!==t.iridescenceMap&&(s.iridescenceMap=i(t.iridescenceMap)),void 0!==t.iridescenceThicknessMap&&(s.iridescenceThicknessMap=i(t.iridescenceThicknessMap)),void 0!==t.transmissionMap&&(s.transmissionMap=i(t.transmissionMap)),void 0!==t.thicknessMap&&(s.thicknessMap=i(t.thicknessMap)),void 0!==t.anisotropyMap&&(s.anisotropyMap=i(t.anisotropyMap)),void 0!==t.sheenColorMap&&(s.sheenColorMap=i(t.sheenColorMap)),void 0!==t.sheenRoughnessMap&&(s.sheenRoughnessMap=i(t.sheenRoughnessMap)),s}setTextures(t){return this.textures=t,this}createMaterialFromType(t){return ru.createMaterialFromType(t)}static createMaterialFromType(t){return new{ShadowMaterial:Gl,SpriteMaterial:za,RawShaderMaterial:$l,ShaderMaterial:ha,PointsMaterial:oh,MeshPhysicalMaterial:Kl,MeshStandardMaterial:Ql,MeshPhongMaterial:tc,MeshToonMaterial:ec,MeshNormalMaterial:ic,MeshLambertMaterial:sc,MeshDepthMaterial:rc,MeshDistanceMaterial:nc,MeshBasicMaterial:fn,MeshMatcapMaterial:ac,LineDashedMaterial:oc,LineBasicMaterial:Yo,Material:gn}[t]}}class nu{static extractUrlBase(t){const e=t.lastIndexOf("/");return-1===e?"./":t.slice(0,e+1)}static resolveURL(t,e){return"string"!=typeof t||""===t?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class au extends Wn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class ou extends Bc{constructor(t){super(t)}load(t,e,i,s){const r=this,n=new Pc(r.manager);n.setPath(r.path),n.setRequestHeader(r.requestHeader),n.setWithCredentials(r.withCredentials),n.load(t,function(i){try{e(r.parse(JSON.parse(i)))}catch(e){s?s(e):rs(e),r.manager.itemError(t)}},i,s)}parse(t){const e={},i={};function s(t,s){if(void 0!==e[s])return e[s];const r=t.interleavedBuffers[s],n=function(t,e){if(void 0!==i[e])return i[e];const s=t.arrayBuffers,r=s[e],n=new Uint32Array(r).buffer;return i[e]=n,n}(t,r.buffer),a=Zi(r.type,n),o=new _a(a,r.stride);return o.uuid=r.uuid,e[s]=o,o}const r=t.isInstancedBufferGeometry?new au:new Wn,n=t.data.index;if(void 0!==n){const t=Zi(n.type,n.array);r.setIndex(new Tn(t,1))}const a=t.data.attributes;for(const e in a){const i=a[e];let n;if(i.isInterleavedBufferAttribute){const e=s(t.data,i.data);n=new Ta(e,i.itemSize,i.offset,i.normalized)}else{const t=Zi(i.type,i.array);n=new(i.isInstancedBufferAttribute?oo:Tn)(t,i.itemSize,i.normalized)}void 0!==i.name&&(n.name=i.name),void 0!==i.usage&&n.setUsage(i.usage),r.setAttribute(e,n)}const o=t.data.morphAttributes;if(o)for(const e in o){const i=o[e],n=[];for(let e=0,r=i.length;e<r;e++){const r=i[e];let a;if(r.isInterleavedBufferAttribute){const e=s(t.data,r.data);a=new Ta(e,r.itemSize,r.offset,r.normalized)}else{const t=Zi(r.type,r.array);a=new Tn(t,r.itemSize,r.normalized)}void 0!==r.name&&(a.name=r.name),n.push(a)}r.morphAttributes[e]=n}t.data.morphTargetsRelative&&(r.morphTargetsRelative=!0);const h=t.data.groups||t.data.drawcalls||t.data.offsets;if(void 0!==h)for(let t=0,e=h.length;t!==e;++t){const e=h[t];r.addGroup(e.start,e.count,e.materialIndex)}const l=t.data.boundingSphere;return void 0!==l&&(r.boundingSphere=(new ur).fromJSON(l)),t.name&&(r.name=t.name),t.userData&&(r.userData=t.userData),r}}class hu extends Bc{constructor(t){super(t)}load(t,e,i,s){const r=this,n=""===this.path?nu.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||n;const a=new Pc(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(i){let n=null;try{n=JSON.parse(i)}catch(e){return void 0!==s&&s(e),void e("ObjectLoader: Can't parse "+t+".",e.message)}const a=n.metadata;if(void 0===a||void 0===a.type||"geometry"===a.type.toLowerCase())return void 0!==s&&s(new Error("THREE.ObjectLoader: Can't load "+t)),void rs("ObjectLoader: Can't load "+t);r.parse(n,e)},i,s)}async loadAsync(t,e){const i=""===this.path?nu.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||i;const s=new Pc(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials);const r=await s.loadAsync(t,e),n=JSON.parse(r),a=n.metadata;if(void 0===a||void 0===a.type||"geometry"===a.type.toLowerCase())throw new Error("THREE.ObjectLoader: Can't load "+t);return await this.parseAsync(n)}parse(t,e){const i=this.parseAnimations(t.animations),s=this.parseShapes(t.shapes),r=this.parseGeometries(t.geometries,s),n=this.parseImages(t.images,function(){void 0!==e&&e(h)}),a=this.parseTextures(t.textures,n),o=this.parseMaterials(t.materials,a),h=this.parseObject(t.object,r,o,a,i),l=this.parseSkeletons(t.skeletons,h);if(this.bindSkeletons(h,l),this.bindLightTargets(h),void 0!==e){let t=!1;for(const e in n)if(n[e].data instanceof HTMLImageElement){t=!0;break}!1===t&&e(h)}return h}async parseAsync(t){const e=this.parseAnimations(t.animations),i=this.parseShapes(t.shapes),s=this.parseGeometries(t.geometries,i),r=await this.parseImagesAsync(t.images),n=this.parseTextures(t.textures,r),a=this.parseMaterials(t.materials,n),o=this.parseObject(t.object,s,a,n,e),h=this.parseSkeletons(t.skeletons,o);return this.bindSkeletons(o,h),this.bindLightTargets(o),o}parseShapes(t){const e={};if(void 0!==t)for(let i=0,s=t.length;i<s;i++){const s=(new sl).fromJSON(t[i]);e[s.uuid]=s}return e}parseSkeletons(t,e){const i={},s={};if(e.traverse(function(t){t.isBone&&(s[t.uuid]=t)}),void 0!==t)for(let e=0,r=t.length;e<r;e++){const r=(new ao).fromJSON(t[e],s);i[r.uuid]=r}return i}parseGeometries(t,e){const i={};if(void 0!==t){const s=new ou;for(let r=0,n=t.length;r<n;r++){let n;const a=t[r];switch(a.type){case"BufferGeometry":case"InstancedBufferGeometry":n=s.parse(a);break;default:a.type in Hl?n=Hl[a.type].fromJSON(a,e):ss(`ObjectLoader: Unsupported geometry type "${a.type}"`)}n.uuid=a.uuid,void 0!==a.name&&(n.name=a.name),void 0!==a.userData&&(n.userData=a.userData),i[a.uuid]=n}}return i}parseMaterials(t,e){const i={},s={};if(void 0!==t){const r=new ru;r.setTextures(e);for(let e=0,n=t.length;e<n;e++){const n=t[e];void 0===i[n.uuid]&&(i[n.uuid]=r.parse(n)),s[n.uuid]=i[n.uuid]}}return s}parseAnimations(t){const e={};if(void 0!==t)for(let i=0;i<t.length;i++){const s=t[i],r=Ac.parse(s);e[r.uuid]=r}return e}parseImages(t,e){const i=this,s={};let r;function n(t){if("string"==typeof t){const e=t;return function(t){return i.manager.itemStart(t),r.load(t,function(){i.manager.itemEnd(t)},void 0,function(){i.manager.itemError(t),i.manager.itemEnd(t)})}(/^(\/\/)|([a-z]+:(\/\/)?)/i.test(e)?e:i.resourcePath+e)}return t.data?{data:Zi(t.type,t.data),width:t.width,height:t.height}:null}if(void 0!==t&&t.length>0){const i=new Cc(e);r=new Fc(i),r.setCrossOrigin(this.crossOrigin);for(let e=0,i=t.length;e<i;e++){const i=t[e],r=i.url;if(Array.isArray(r)){const t=[];for(let e=0,i=r.length;e<i;e++){const i=n(r[e]);null!==i&&(i instanceof HTMLImageElement?t.push(i):t.push(new so(i.data,i.width,i.height)))}s[i.uuid]=new Ns(t)}else{const t=n(i.url);s[i.uuid]=new Ns(t)}}}return s}async parseImagesAsync(t){const e=this,i={};let s;async function r(t){if("string"==typeof t){const i=t,r=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(i)?i:e.resourcePath+i;return await s.loadAsync(r)}return t.data?{data:Zi(t.type,t.data),width:t.width,height:t.height}:null}if(void 0!==t&&t.length>0){s=new Fc(this.manager),s.setCrossOrigin(this.crossOrigin);for(let e=0,s=t.length;e<s;e++){const s=t[e],n=s.url;if(Array.isArray(n)){const t=[];for(let e=0,i=n.length;e<i;e++){const i=n[e],s=await r(i);null!==s&&(s instanceof HTMLImageElement?t.push(s):t.push(new so(s.data,s.width,s.height)))}i[s.uuid]=new Ns(t)}else{const t=await r(s.url);i[s.uuid]=new Ns(t)}}}return i}parseTextures(t,e){function i(t,e){return"number"==typeof t?t:(ss("ObjectLoader.parseTexture: Constant should be in numeric form.",t),e[t])}const s={};if(void 0!==t)for(let r=0,n=t.length;r<n;r++){const n=t[r];void 0===n.image&&ss('ObjectLoader: No "image" specified for',n.uuid),void 0===e[n.image]&&ss("ObjectLoader: Undefined image",n.image);const a=e[n.image],o=a.data;let h;Array.isArray(o)?(h=new ga,6===o.length&&(h.needsUpdate=!0)):(h=o&&o.data?new so:new Es,o&&(h.needsUpdate=!0)),h.source=a,h.uuid=n.uuid,void 0!==n.name&&(h.name=n.name),void 0!==n.mapping&&(h.mapping=i(n.mapping,lu)),void 0!==n.channel&&(h.channel=n.channel),void 0!==n.offset&&h.offset.fromArray(n.offset),void 0!==n.repeat&&h.repeat.fromArray(n.repeat),void 0!==n.center&&h.center.fromArray(n.center),void 0!==n.rotation&&(h.rotation=n.rotation),void 0!==n.wrap&&(h.wrapS=i(n.wrap[0],cu),h.wrapT=i(n.wrap[1],cu)),void 0!==n.format&&(h.format=n.format),void 0!==n.internalFormat&&(h.internalFormat=n.internalFormat),void 0!==n.type&&(h.type=n.type),void 0!==n.colorSpace&&(h.colorSpace=n.colorSpace),void 0!==n.minFilter&&(h.minFilter=i(n.minFilter,uu)),void 0!==n.magFilter&&(h.magFilter=i(n.magFilter,uu)),void 0!==n.anisotropy&&(h.anisotropy=n.anisotropy),void 0!==n.flipY&&(h.flipY=n.flipY),void 0!==n.generateMipmaps&&(h.generateMipmaps=n.generateMipmaps),void 0!==n.premultiplyAlpha&&(h.premultiplyAlpha=n.premultiplyAlpha),void 0!==n.unpackAlignment&&(h.unpackAlignment=n.unpackAlignment),void 0!==n.compareFunction&&(h.compareFunction=n.compareFunction),void 0!==n.userData&&(h.userData=n.userData),s[n.uuid]=h}return s}parseObject(t,e,i,s,r){let n,a,o;function h(t){return void 0===e[t]&&ss("ObjectLoader: Undefined geometry",t),e[t]}function l(t){if(void 0!==t){if(Array.isArray(t)){const e=[];for(let s=0,r=t.length;s<r;s++){const r=t[s];void 0===i[r]&&ss("ObjectLoader: Undefined material",r),e.push(i[r])}return e}return void 0===i[t]&&ss("ObjectLoader: Undefined material",t),i[t]}}function c(t){return void 0===s[t]&&ss("ObjectLoader: Undefined texture",t),s[t]}switch(t.type){case"Scene":n=new Sa,void 0!==t.background&&(Number.isInteger(t.background)?n.background=new pn(t.background):n.background=c(t.background)),void 0!==t.environment&&(n.environment=c(t.environment)),void 0!==t.fog&&("Fog"===t.fog.type?n.fog=new Ma(t.fog.color,t.fog.near,t.fog.far):"FogExp2"===t.fog.type&&(n.fog=new wa(t.fog.color,t.fog.density)),""!==t.fog.name&&(n.fog.name=t.fog.name)),void 0!==t.backgroundBlurriness&&(n.backgroundBlurriness=t.backgroundBlurriness),void 0!==t.backgroundIntensity&&(n.backgroundIntensity=t.backgroundIntensity),void 0!==t.backgroundRotation&&n.backgroundRotation.fromArray(t.backgroundRotation),void 0!==t.environmentIntensity&&(n.environmentIntensity=t.environmentIntensity),void 0!==t.environmentRotation&&n.environmentRotation.fromArray(t.environmentRotation);break;case"PerspectiveCamera":n=new pa(t.fov,t.aspect,t.near,t.far),void 0!==t.focus&&(n.focus=t.focus),void 0!==t.zoom&&(n.zoom=t.zoom),void 0!==t.filmGauge&&(n.filmGauge=t.filmGauge),void 0!==t.filmOffset&&(n.filmOffset=t.filmOffset),void 0!==t.view&&(n.view=Object.assign({},t.view));break;case"OrthographicCamera":n=new $c(t.left,t.right,t.top,t.bottom,t.near,t.far),void 0!==t.zoom&&(n.zoom=t.zoom),void 0!==t.view&&(n.view=Object.assign({},t.view));break;case"AmbientLight":n=new tu(t.color,t.intensity);break;case"DirectionalLight":n=new Kc(t.color,t.intensity),n.target=t.target||"";break;case"PointLight":n=new Gc(t.color,t.intensity,t.distance,t.decay);break;case"RectAreaLight":n=new eu(t.color,t.intensity,t.width,t.height);break;case"SpotLight":n=new Zc(t.color,t.intensity,t.distance,t.angle,t.penumbra,t.decay),n.target=t.target||"";break;case"HemisphereLight":n=new Uc(t.color,t.groundColor,t.intensity);break;case"LightProbe":const e=(new iu).fromArray(t.sh);n=new su(e,t.intensity);break;case"SkinnedMesh":a=h(t.geometry),o=l(t.material),n=new eo(a,o),void 0!==t.bindMode&&(n.bindMode=t.bindMode),void 0!==t.bindMatrix&&n.bindMatrix.fromArray(t.bindMatrix),void 0!==t.skeleton&&(n.skeleton=t.skeleton);break;case"Mesh":a=h(t.geometry),o=l(t.material),n=new ea(a,o);break;case"InstancedMesh":a=h(t.geometry),o=l(t.material);const i=t.count,s=t.instanceMatrix,r=t.instanceColor;n=new go(a,o,i),n.instanceMatrix=new oo(new Float32Array(s.array),16),void 0!==r&&(n.instanceColor=new oo(new Float32Array(r.array),r.itemSize));break;case"BatchedMesh":a=h(t.geometry),o=l(t.material),n=new Xo(t.maxInstanceCount,t.maxVertexCount,t.maxIndexCount,o),n.geometry=a,n.perObjectFrustumCulled=t.perObjectFrustumCulled,n.sortObjects=t.sortObjects,n._drawRanges=t.drawRanges,n._reservedRanges=t.reservedRanges,n._geometryInfo=t.geometryInfo.map(t=>{let e=null,i=null;return void 0!==t.boundingBox&&(e=(new Ys).fromJSON(t.boundingBox)),void 0!==t.boundingSphere&&(i=(new ur).fromJSON(t.boundingSphere)),{...t,boundingBox:e,boundingSphere:i}}),n._instanceInfo=t.instanceInfo,n._availableInstanceIds=t._availableInstanceIds,n._availableGeometryIds=t._availableGeometryIds,n._nextIndexStart=t.nextIndexStart,n._nextVertexStart=t.nextVertexStart,n._geometryCount=t.geometryCount,n._maxInstanceCount=t.maxInstanceCount,n._maxVertexCount=t.maxVertexCount,n._maxIndexCount=t.maxIndexCount,n._geometryInitialized=t.geometryInitialized,n._matricesTexture=c(t.matricesTexture.uuid),n._indirectTexture=c(t.indirectTexture.uuid),void 0!==t.colorsTexture&&(n._colorsTexture=c(t.colorsTexture.uuid)),void 0!==t.boundingSphere&&(n.boundingSphere=(new ur).fromJSON(t.boundingSphere)),void 0!==t.boundingBox&&(n.boundingBox=(new Ys).fromJSON(t.boundingBox));break;case"LOD":n=new Ja;break;case"Line":n=new eh(h(t.geometry),l(t.material));break;case"LineLoop":n=new ah(h(t.geometry),l(t.material));break;case"LineSegments":n=new nh(h(t.geometry),l(t.material));break;case"PointCloud":case"Points":n=new dh(h(t.geometry),l(t.material));break;case"Sprite":n=new Da(l(t.material));break;case"Group":n=new xa;break;case"Bone":n=new io;break;default:n=new Yr}if(n.uuid=t.uuid,void 0!==t.name&&(n.name=t.name),void 0!==t.matrix?(n.matrix.fromArray(t.matrix),void 0!==t.matrixAutoUpdate&&(n.matrixAutoUpdate=t.matrixAutoUpdate),n.matrixAutoUpdate&&n.matrix.decompose(n.position,n.quaternion,n.scale)):(void 0!==t.position&&n.position.fromArray(t.position),void 0!==t.rotation&&n.rotation.fromArray(t.rotation),void 0!==t.quaternion&&n.quaternion.fromArray(t.quaternion),void 0!==t.scale&&n.scale.fromArray(t.scale)),void 0!==t.up&&n.up.fromArray(t.up),void 0!==t.castShadow&&(n.castShadow=t.castShadow),void 0!==t.receiveShadow&&(n.receiveShadow=t.receiveShadow),t.shadow&&(void 0!==t.shadow.intensity&&(n.shadow.intensity=t.shadow.intensity),void 0!==t.shadow.bias&&(n.shadow.bias=t.shadow.bias),void 0!==t.shadow.normalBias&&(n.shadow.normalBias=t.shadow.normalBias),void 0!==t.shadow.radius&&(n.shadow.radius=t.shadow.radius),void 0!==t.shadow.mapSize&&n.shadow.mapSize.fromArray(t.shadow.mapSize),void 0!==t.shadow.camera&&(n.shadow.camera=this.parseObject(t.shadow.camera))),void 0!==t.visible&&(n.visible=t.visible),void 0!==t.frustumCulled&&(n.frustumCulled=t.frustumCulled),void 0!==t.renderOrder&&(n.renderOrder=t.renderOrder),void 0!==t.userData&&(n.userData=t.userData),void 0!==t.layers&&(n.layers.mask=t.layers),void 0!==t.children){const a=t.children;for(let t=0;t<a.length;t++)n.add(this.parseObject(a[t],e,i,s,r))}if(void 0!==t.animations){const e=t.animations;for(let t=0;t<e.length;t++){const i=e[t];n.animations.push(r[i])}}if("LOD"===t.type){void 0!==t.autoUpdate&&(n.autoUpdate=t.autoUpdate);const e=t.levels;for(let t=0;t<e.length;t++){const i=e[t],s=n.getObjectByProperty("uuid",i.object);void 0!==s&&n.addLevel(s,i.distance,i.hysteresis)}}return n}bindSkeletons(t,e){0!==Object.keys(e).length&&t.traverse(function(t){if(!0===t.isSkinnedMesh&&void 0!==t.skeleton){const i=e[t.skeleton];void 0===i?ss("ObjectLoader: No skeleton found with UUID:",t.skeleton):t.bind(i,t.bindMatrix)}})}bindLightTargets(t){t.traverse(function(e){if(e.isDirectionalLight||e.isSpotLight){const i=e.target,s=t.getObjectByProperty("uuid",i);e.target=void 0!==s?s:new Yr}})}}const lu={UVMapping:ot,CubeReflectionMapping:ht,CubeRefractionMapping:302,EquirectangularReflectionMapping:303,EquirectangularRefractionMapping:304,CubeUVReflectionMapping:306},cu={RepeatWrapping:pt,ClampToEdgeWrapping:mt,MirroredRepeatWrapping:yt},uu={NearestFilter:gt,NearestMipmapNearestFilter:1004,NearestMipmapLinearFilter:1005,LinearFilter:wt,LinearMipmapNearestFilter:1007,LinearMipmapLinearFilter:_t},du=new WeakMap;class pu extends Bc{constructor(t){super(t),this.isImageBitmapLoader=!0,"undefined"==typeof createImageBitmap&&ss("ImageBitmapLoader: createImageBitmap() not supported."),"undefined"==typeof fetch&&ss("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,i,s){void 0===t&&(t=""),void 0!==this.path&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,n=zc.get(`image-bitmap:${t}`);if(void 0!==n)return r.manager.itemStart(t),n.then?void n.then(i=>{if(!0!==du.has(n))return e&&e(i),r.manager.itemEnd(t),i;s&&s(du.get(n)),r.manager.itemError(t),r.manager.itemEnd(t)}):(setTimeout(function(){e&&e(n),r.manager.itemEnd(t)},0),n);const a={};a.credentials="anonymous"===this.crossOrigin?"same-origin":"include",a.headers=this.requestHeader,a.signal="function"==typeof AbortSignal.any?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const o=fetch(t,a).then(function(t){return t.blob()}).then(function(t){return createImageBitmap(t,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(i){return zc.add(`image-bitmap:${t}`,i),e&&e(i),r.manager.itemEnd(t),i}).catch(function(e){s&&s(e),du.set(o,e),zc.remove(`image-bitmap:${t}`),r.manager.itemError(t),r.manager.itemEnd(t)});zc.add(`image-bitmap:${t}`,o),r.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}let mu;class yu{static getContext(){return void 0===mu&&(mu=new(window.AudioContext||window.webkitAudioContext)),mu}static setContext(t){mu=t}}class gu extends Bc{constructor(t){super(t)}load(t,e,i,s){const r=this,n=new Pc(this.manager);function a(e){s?s(e):rs(e),r.manager.itemError(t)}n.setResponseType("arraybuffer"),n.setPath(this.path),n.setRequestHeader(this.requestHeader),n.setWithCredentials(this.withCredentials),n.load(t,function(t){try{const i=t.slice(0);yu.getContext().decodeAudioData(i,function(t){e(t)}).catch(a)}catch(t){a(t)}},i,s)}}const fu=new vr,xu=new vr,bu=new vr;class vu{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new pa,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new pa,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(t){const e=this._cache;if(e.focus!==t.focus||e.fov!==t.fov||e.aspect!==t.aspect*this.aspect||e.near!==t.near||e.far!==t.far||e.zoom!==t.zoom||e.eyeSep!==this.eyeSep){e.focus=t.focus,e.fov=t.fov,e.aspect=t.aspect*this.aspect,e.near=t.near,e.far=t.far,e.zoom=t.zoom,e.eyeSep=this.eyeSep,bu.copy(t.projectionMatrix);const i=e.eyeSep/2,s=i*e.near/e.focus,r=e.near*Math.tan(cs*e.fov*.5)/e.zoom;let n,a;xu.elements[12]=-i,fu.elements[12]=i,n=-r*e.aspect+s,a=r*e.aspect+s,bu.elements[0]=2*e.near/(a-n),bu.elements[8]=(a+n)/(a-n),this.cameraL.projectionMatrix.copy(bu),n=-r*e.aspect-s,a=r*e.aspect-s,bu.elements[0]=2*e.near/(a-n),bu.elements[8]=(a+n)/(a-n),this.cameraR.projectionMatrix.copy(bu)}this.cameraL.matrixWorld.copy(t.matrixWorld).multiply(xu),this.cameraR.matrixWorld.copy(t.matrixWorld).multiply(fu)}}class wu extends pa{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Mu{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}const Su=new ws,_u=new vs,Au=new ws,Tu=new ws,zu=new ws;class Cu extends Yr{constructor(){super(),this.type="AudioListener",this.context=yu.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new Mu}getInput(){return this.gain}removeFilter(){return null!==this.filter&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(t){return null!==this.filter?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=t,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}updateMatrixWorld(t){super.updateMatrixWorld(t);const e=this.context.listener;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(Su,_u,Au),Tu.set(0,0,-1).applyQuaternion(_u),zu.set(0,1,0).applyQuaternion(_u),e.positionX){const t=this.context.currentTime+this.timeDelta;e.positionX.linearRampToValueAtTime(Su.x,t),e.positionY.linearRampToValueAtTime(Su.y,t),e.positionZ.linearRampToValueAtTime(Su.z,t),e.forwardX.linearRampToValueAtTime(Tu.x,t),e.forwardY.linearRampToValueAtTime(Tu.y,t),e.forwardZ.linearRampToValueAtTime(Tu.z,t),e.upX.linearRampToValueAtTime(zu.x,t),e.upY.linearRampToValueAtTime(zu.y,t),e.upZ.linearRampToValueAtTime(zu.z,t)}else e.setPosition(Su.x,Su.y,Su.z),e.setOrientation(Tu.x,Tu.y,Tu.z,zu.x,zu.y,zu.z)}}class Iu extends Yr{constructor(t){super(),this.type="Audio",this.listener=t,this.context=t.context,this.gain=this.context.createGain(),this.gain.connect(t.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(t){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=t,this.connect(),this}setMediaElementSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(t),this.connect(),this}setMediaStreamSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(t),this.connect(),this}setBuffer(t){return this.buffer=t,this.sourceType="buffer",this.autoplay&&this.play(),this}play(t=0){if(!0===this.isPlaying)return void ss("Audio: Audio is already playing.");if(!1===this.hasPlaybackControl)return void ss("Audio: this Audio has no playback control.");this._startedAt=this.context.currentTime+t;const e=this.context.createBufferSource();return e.buffer=this.buffer,e.loop=this.loop,e.loopStart=this.loopStart,e.loopEnd=this.loopEnd,e.onended=this.onEnded.bind(this),e.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=e,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(!1!==this.hasPlaybackControl)return!0===this.isPlaying&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,!0===this.loop&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this;ss("Audio: this Audio has no playback control.")}stop(t=0){if(!1!==this.hasPlaybackControl)return this._progress=0,null!==this.source&&(this.source.stop(this.context.currentTime+t),this.source.onended=null),this.isPlaying=!1,this;ss("Audio: this Audio has no playback control.")}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].connect(this.filters[t]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(!1!==this._connected){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].disconnect(this.filters[t]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(t){return t||(t=[]),!0===this._connected?(this.disconnect(),this.filters=t.slice(),this.connect()):this.filters=t.slice(),this}setDetune(t){return this.detune=t,!0===this.isPlaying&&void 0!==this.source.detune&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(t){return this.setFilters(t?[t]:[])}setPlaybackRate(t){if(!1!==this.hasPlaybackControl)return this.playbackRate=t,!0===this.isPlaying&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this;ss("Audio: this Audio has no playback control.")}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return!1===this.hasPlaybackControl?(ss("Audio: this Audio has no playback control."),!1):this.loop}setLoop(t){if(!1!==this.hasPlaybackControl)return this.loop=t,!0===this.isPlaying&&(this.source.loop=this.loop),this;ss("Audio: this Audio has no playback control.")}setLoopStart(t){return this.loopStart=t,this}setLoopEnd(t){return this.loopEnd=t,this}getVolume(){return this.gain.gain.value}setVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}copy(t,e){return super.copy(t,e),"buffer"!==t.sourceType?(ss("Audio: Audio source type cannot be copied."),this):(this.autoplay=t.autoplay,this.buffer=t.buffer,this.detune=t.detune,this.loop=t.loop,this.loopStart=t.loopStart,this.loopEnd=t.loopEnd,this.offset=t.offset,this.duration=t.duration,this.playbackRate=t.playbackRate,this.hasPlaybackControl=t.hasPlaybackControl,this.sourceType=t.sourceType,this.filters=t.filters.slice(),this)}clone(t){return new this.constructor(this.listener).copy(this,t)}}const Bu=new ws,ku=new vs,Ou=new ws,Pu=new ws;class Ru extends Iu{constructor(t){super(t),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(t){return this.panner.refDistance=t,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(t){return this.panner.rolloffFactor=t,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(t){return this.panner.distanceModel=t,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(t){return this.panner.maxDistance=t,this}setDirectionalCone(t,e,i){return this.panner.coneInnerAngle=t,this.panner.coneOuterAngle=e,this.panner.coneOuterGain=i,this}updateMatrixWorld(t){if(super.updateMatrixWorld(t),!0===this.hasPlaybackControl&&!1===this.isPlaying)return;this.matrixWorld.decompose(Bu,ku,Ou),Pu.set(0,0,1).applyQuaternion(ku);const e=this.panner;if(e.positionX){const t=this.context.currentTime+this.listener.timeDelta;e.positionX.linearRampToValueAtTime(Bu.x,t),e.positionY.linearRampToValueAtTime(Bu.y,t),e.positionZ.linearRampToValueAtTime(Bu.z,t),e.orientationX.linearRampToValueAtTime(Pu.x,t),e.orientationY.linearRampToValueAtTime(Pu.y,t),e.orientationZ.linearRampToValueAtTime(Pu.z,t)}else e.setPosition(Bu.x,Bu.y,Bu.z),e.setOrientation(Pu.x,Pu.y,Pu.z)}}class Nu{constructor(t,e=2048){this.analyser=t.context.createAnalyser(),this.analyser.fftSize=e,this.data=new Uint8Array(this.analyser.frequencyBinCount),t.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let t=0;const e=this.getFrequencyData();for(let i=0;i<e.length;i++)t+=e[i];return t/e.length}}class Vu{constructor(t,e,i){let s,r,n;switch(this.binding=t,this.valueSize=i,e){case"quaternion":s=this._slerp,r=this._slerpAdditive,n=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(6*i),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,n=this._setAdditiveIdentityOther,this.buffer=new Array(5*i);break;default:s=this._lerp,r=this._lerpAdditive,n=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(5*i)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=n,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const i=this.buffer,s=this.valueSize,r=t*s+s;let n=this.cumulativeWeight;if(0===n){for(let t=0;t!==s;++t)i[r+t]=i[t];n=e}else{n+=e;const t=e/n;this._mixBufferRegion(i,r,0,t,s)}this.cumulativeWeight=n}accumulateAdditive(t){const e=this.buffer,i=this.valueSize,s=i*this._addIndex;0===this.cumulativeWeightAdditive&&this._setIdentity(),this._mixBufferRegionAdditive(e,s,0,t,i),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,i=this.buffer,s=t*e+e,r=this.cumulativeWeight,n=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const t=e*this._origIndex;this._mixBufferRegion(i,s,t,1-r,e)}n>0&&this._mixBufferRegionAdditive(i,s,this._addIndex*e,1,e);for(let t=e,r=e+e;t!==r;++t)if(i[t]!==i[t+e]){a.setValue(i,s);break}}saveOriginalState(){const t=this.binding,e=this.buffer,i=this.valueSize,s=i*this._origIndex;t.getValue(e,s);for(let t=i,r=s;t!==r;++t)e[t]=e[s+t%i];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=3*this.valueSize;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let i=t;i<e;i++)this.buffer[i]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let i=0;i<this.valueSize;i++)this.buffer[e+i]=this.buffer[t+i]}_select(t,e,i,s,r){if(s>=.5)for(let s=0;s!==r;++s)t[e+s]=t[i+s]}_slerp(t,e,i,s){vs.slerpFlat(t,e,t,e,t,i,s)}_slerpAdditive(t,e,i,s,r){const n=this._workIndex*r;vs.multiplyQuaternionsFlat(t,n,t,e,t,i),vs.slerpFlat(t,e,t,e,t,n,s)}_lerp(t,e,i,s,r){const n=1-s;for(let a=0;a!==r;++a){const r=e+a;t[r]=t[r]*n+t[i+a]*s}}_lerpAdditive(t,e,i,s,r){for(let n=0;n!==r;++n){const r=e+n;t[r]=t[r]+t[i+n]*s}}}const Fu="\\[\\]\\.:\\/",Lu=new RegExp("["+Fu+"]","g"),Eu="[^"+Fu+"]",ju="[^"+Fu.replace("\\.","")+"]",Du=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Eu)+/(WCOD+)?/.source.replace("WCOD",ju)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Eu)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Eu)+"$"),Uu=["material","materials","bones","map"];class Wu{constructor(t,e,i){this.path=e,this.parsedPath=i||Wu.parseTrackName(e),this.node=Wu.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new Wu.Composite(t,e,i):new Wu(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Lu,"")}static parseTrackName(t){const e=Du.exec(t);if(null===e)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(void 0!==s&&-1!==s){const t=i.nodeName.substring(s+1);-1!==Uu.indexOf(t)&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=t)}if(null===i.propertyName||0===i.propertyName.length)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(void 0===e||""===e||"."===e||-1===e||e===t.name||e===t.uuid)return t;if(t.skeleton){const i=t.skeleton.getBoneByName(e);if(void 0!==i)return i}if(t.children){const i=function(t){for(let s=0;s<t.length;s++){const r=t[s];if(r.name===e||r.uuid===e)return r;const n=i(r.children);if(n)return n}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,i=e.objectName,s=e.propertyName;let r=e.propertyIndex;if(t||(t=Wu.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t)return void ss("PropertyBinding: No target node found for track: "+this.path+".");if(i){let s=e.objectIndex;switch(i){case"materials":if(!t.material)return void rs("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!t.material.materials)return void rs("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);t=t.material.materials;break;case"bones":if(!t.skeleton)return void rs("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);t=t.skeleton.bones;for(let e=0;e<t.length;e++)if(t[e].name===s){s=e;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material)return void rs("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!t.material.map)return void rs("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);t=t.material.map;break;default:if(void 0===t[i])return void rs("PropertyBinding: Can not bind to objectName of node undefined.",this);t=t[i]}if(void 0!==s){if(void 0===t[s])return void rs("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);t=t[s]}}const n=t[s];if(void 0===n){return void rs("PropertyBinding: Trying to update property for track: "+e.nodeName+"."+s+" but it wasn't found.",t)}let a=this.Versioning.None;this.targetObject=t,!0===t.isMaterial?a=this.Versioning.NeedsUpdate:!0===t.isObject3D&&(a=this.Versioning.MatrixWorldNeedsUpdate);let o=this.BindingType.Direct;if(void 0!==r){if("morphTargetInfluences"===s){if(!t.geometry)return void rs("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!t.geometry.morphAttributes)return void rs("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);void 0!==t.morphTargetDictionary[r]&&(r=t.morphTargetDictionary[r])}o=this.BindingType.ArrayElement,this.resolvedProperty=n,this.propertyIndex=r}else void 0!==n.fromArray&&void 0!==n.toArray?(o=this.BindingType.HasFromToArray,this.resolvedProperty=n):Array.isArray(n)?(o=this.BindingType.EntireArray,this.resolvedProperty=n):this.propertyName=s;this.getValue=this.GetterByBindingType[o],this.setValue=this.SetterByBindingTypeAndVersioning[o][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Wu.Composite=class{constructor(t,e,i){const s=i||Wu.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();const i=this._targetGroup.nCachedObjects_,s=this._bindings[i];void 0!==s&&s.getValue(t,e)}setValue(t,e){const i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Wu.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Wu.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Wu.prototype.GetterByBindingType=[Wu.prototype._getValue_direct,Wu.prototype._getValue_array,Wu.prototype._getValue_arrayElement,Wu.prototype._getValue_toArray],Wu.prototype.SetterByBindingTypeAndVersioning=[[Wu.prototype._setValue_direct,Wu.prototype._setValue_direct_setNeedsUpdate,Wu.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Wu.prototype._setValue_array,Wu.prototype._setValue_array_setNeedsUpdate,Wu.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Wu.prototype._setValue_arrayElement,Wu.prototype._setValue_arrayElement_setNeedsUpdate,Wu.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Wu.prototype._setValue_fromArray,Wu.prototype._setValue_fromArray_setNeedsUpdate,Wu.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class qu{constructor(){this.isAnimationObjectGroup=!0,this.uuid=ds(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;const t={};this._indicesByUUID=t;for(let e=0,i=arguments.length;e!==i;++e)t[arguments[e].uuid]=e;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};const e=this;this.stats={objects:{get total(){return e._objects.length},get inUse(){return this.total-e.nCachedObjects_}},get bindingsPerObject(){return e._bindings.length}}}add(){const t=this._objects,e=this._indicesByUUID,i=this._paths,s=this._parsedPaths,r=this._bindings,n=r.length;let a,o=t.length,h=this.nCachedObjects_;for(let l=0,c=arguments.length;l!==c;++l){const c=arguments[l],u=c.uuid;let d=e[u];if(void 0===d){d=o++,e[u]=d,t.push(c);for(let t=0,e=n;t!==e;++t)r[t].push(new Wu(c,i[t],s[t]))}else if(d<h){a=t[d];const o=--h,l=t[o];e[l.uuid]=d,t[d]=l,e[u]=o,t[o]=c;for(let t=0,e=n;t!==e;++t){const e=r[t],n=e[o];let a=e[d];e[d]=n,void 0===a&&(a=new Wu(c,i[t],s[t])),e[o]=a}}else t[d]!==a&&rs("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=h}remove(){const t=this._objects,e=this._indicesByUUID,i=this._bindings,s=i.length;let r=this.nCachedObjects_;for(let n=0,a=arguments.length;n!==a;++n){const a=arguments[n],o=a.uuid,h=e[o];if(void 0!==h&&h>=r){const n=r++,l=t[n];e[l.uuid]=h,t[h]=l,e[o]=n,t[n]=a;for(let t=0,e=s;t!==e;++t){const e=i[t],s=e[n],r=e[h];e[h]=s,e[n]=r}}}this.nCachedObjects_=r}uncache(){const t=this._objects,e=this._indicesByUUID,i=this._bindings,s=i.length;let r=this.nCachedObjects_,n=t.length;for(let a=0,o=arguments.length;a!==o;++a){const o=arguments[a].uuid,h=e[o];if(void 0!==h)if(delete e[o],h<r){const a=--r,o=t[a],l=--n,c=t[l];e[o.uuid]=h,t[h]=o,e[c.uuid]=a,t[a]=c,t.pop();for(let t=0,e=s;t!==e;++t){const e=i[t],s=e[a],r=e[l];e[h]=s,e[a]=r,e.pop()}}else{const r=--n,a=t[r];r>0&&(e[a.uuid]=h),t[h]=a,t.pop();for(let t=0,e=s;t!==e;++t){const e=i[t];e[h]=e[r],e.pop()}}}this.nCachedObjects_=r}subscribe_(t,e){const i=this._bindingsIndicesByPath;let s=i[t];const r=this._bindings;if(void 0!==s)return r[s];const n=this._paths,a=this._parsedPaths,o=this._objects,h=o.length,l=this.nCachedObjects_,c=new Array(h);s=r.length,i[t]=s,n.push(t),a.push(e),r.push(c);for(let i=l,s=o.length;i!==s;++i){const s=o[i];c[i]=new Wu(s,t,e)}return c}unsubscribe_(t){const e=this._bindingsIndicesByPath,i=e[t];if(void 0!==i){const s=this._paths,r=this._parsedPaths,n=this._bindings,a=n.length-1,o=n[a];e[t[a]]=i,n[i]=o,n.pop(),r[i]=r[a],r.pop(),s[i]=s[a],s.pop()}}}class Ju{constructor(t,e,i=null,s=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=i,this.blendMode=s;const r=e.tracks,n=r.length,a=new Array(n),o={endingStart:Le,endingEnd:Le};for(let t=0;t!==n;++t){const e=r[t].createInterpolant(null);a[t]=e,e.settings=o}this._interpolantSettings=o,this._interpolants=a,this._propertyBindings=new Array(n),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=2201,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&0!==this.timeScale&&null===this._startTime&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,i=!1){if(t.fadeOut(e),this.fadeIn(e),!0===i){const i=this._clip.duration,s=t._clip.duration,r=s/i,n=i/s;t.warp(1,r,e),this.warp(n,1,e)}return this}crossFadeTo(t,e,i=!1){return t.crossFadeFrom(this,e,i)}stopFading(){const t=this._weightInterpolant;return null!==t&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,i){const s=this._mixer,r=s.time,n=this.timeScale;let a=this._timeScaleInterpolant;null===a&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);const o=a.parameterPositions,h=a.sampleValues;return o[0]=r,o[1]=r+i,h[0]=t/n,h[1]=e/n,this}stopWarping(){const t=this._timeScaleInterpolant;return null!==t&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,i,s){if(!this.enabled)return void this._updateWeight(t);const r=this._startTime;if(null!==r){const s=(t-r)*i;s<0||0===i?e=0:(this._startTime=null,e=i*s)}e*=this._updateTimeScale(t);const n=this._updateTime(e),a=this._updateWeight(t);if(a>0){const t=this._interpolants,e=this._propertyBindings;if(this.blendMode===Ue)for(let i=0,s=t.length;i!==s;++i)t[i].evaluate(n),e[i].accumulateAdditive(a);else for(let i=0,r=t.length;i!==r;++i)t[i].evaluate(n),e[i].accumulate(s,a)}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const i=this._weightInterpolant;if(null!==i){const s=i.evaluate(t)[0];e*=s,t>i.parameterPositions[1]&&(this.stopFading(),0===s&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const i=this._timeScaleInterpolant;if(null!==i){e*=i.evaluate(t)[0],t>i.parameterPositions[1]&&(this.stopWarping(),0===e?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,i=this.loop;let s=this.time+t,r=this._loopCount;const n=2202===i;if(0===t)return-1===r||!n||1&~r?s:e-s;if(2200===i){-1===r&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(s>=e)s=e;else{if(!(s<0)){this.time=s;break t}s=0}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(-1===r&&(t>=0?(r=0,this._setEndings(!0,0===this.repetitions,n)):this._setEndings(0===this.repetitions,!0,n)),s>=e||s<0){const i=Math.floor(s/e);s-=e*i,r+=Math.abs(i);const a=this.repetitions-r;if(a<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=t>0?e:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(1===a){const e=t<0;this._setEndings(e,!e,n)}else this._setEndings(!1,!1,n);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:i})}}else this.time=s;if(n&&!(1&~r))return e-s}return s}_setEndings(t,e,i){const s=this._interpolantSettings;i?(s.endingStart=Ee,s.endingEnd=Ee):(s.endingStart=t?this.zeroSlopeAtStart?Ee:Le:je,s.endingEnd=e?this.zeroSlopeAtEnd?Ee:Le:je)}_scheduleFading(t,e,i){const s=this._mixer,r=s.time;let n=this._weightInterpolant;null===n&&(n=s._lendControlInterpolant(),this._weightInterpolant=n);const a=n.parameterPositions,o=n.sampleValues;return a[0]=r,o[0]=e,a[1]=r+t,o[1]=i,this}}const Xu=new Float32Array(1);class Yu extends os{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const i=t._localRoot||this._root,s=t._clip.tracks,r=s.length,n=t._propertyBindings,a=t._interpolants,o=i.uuid,h=this._bindingsByRootAndName;let l=h[o];void 0===l&&(l={},h[o]=l);for(let t=0;t!==r;++t){const r=s[t],h=r.name;let c=l[h];if(void 0!==c)++c.referenceCount,n[t]=c;else{if(c=n[t],void 0!==c){null===c._cacheIndex&&(++c.referenceCount,this._addInactiveBinding(c,o,h));continue}const s=e&&e._propertyBindings[t].binding.parsedPath;c=new Vu(Wu.create(i,h,s),r.ValueTypeName,r.getValueSize()),++c.referenceCount,this._addInactiveBinding(c,o,h),n[t]=c}a[t].resultBuffer=c.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(null===t._cacheIndex){const e=(t._localRoot||this._root).uuid,i=t._clip.uuid,s=this._actionsByClip[i];this._bindAction(t,s&&s.knownActions[0]),this._addInactiveAction(t,i,e)}const e=t._propertyBindings;for(let t=0,i=e.length;t!==i;++t){const i=e[t];0===i.useCount++&&(this._lendBinding(i),i.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let t=0,i=e.length;t!==i;++t){const i=e[t];0===--i.useCount&&(i.restoreOriginalState(),this._takeBackBinding(i))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return null!==e&&e<this._nActiveActions}_addInactiveAction(t,e,i){const s=this._actions,r=this._actionsByClip;let n=r[e];if(void 0===n)n={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,r[e]=n;else{const e=n.knownActions;t._byClipCacheIndex=e.length,e.push(t)}t._cacheIndex=s.length,s.push(t),n.actionByRoot[i]=t}_removeInactiveAction(t){const e=this._actions,i=e[e.length-1],s=t._cacheIndex;i._cacheIndex=s,e[s]=i,e.pop(),t._cacheIndex=null;const r=t._clip.uuid,n=this._actionsByClip,a=n[r],o=a.knownActions,h=o[o.length-1],l=t._byClipCacheIndex;h._byClipCacheIndex=l,o[l]=h,o.pop(),t._byClipCacheIndex=null;delete a.actionByRoot[(t._localRoot||this._root).uuid],0===o.length&&delete n[r],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let t=0,i=e.length;t!==i;++t){const i=e[t];0===--i.referenceCount&&this._removeInactiveBinding(i)}}_lendAction(t){const e=this._actions,i=t._cacheIndex,s=this._nActiveActions++,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=i,e[i]=r}_takeBackAction(t){const e=this._actions,i=t._cacheIndex,s=--this._nActiveActions,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=i,e[i]=r}_addInactiveBinding(t,e,i){const s=this._bindingsByRootAndName,r=this._bindings;let n=s[e];void 0===n&&(n={},s[e]=n),n[i]=t,t._cacheIndex=r.length,r.push(t)}_removeInactiveBinding(t){const e=this._bindings,i=t.binding,s=i.rootNode.uuid,r=i.path,n=this._bindingsByRootAndName,a=n[s],o=e[e.length-1],h=t._cacheIndex;o._cacheIndex=h,e[h]=o,e.pop(),delete a[r],0===Object.keys(a).length&&delete n[s]}_lendBinding(t){const e=this._bindings,i=t._cacheIndex,s=this._nActiveBindings++,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=i,e[i]=r}_takeBackBinding(t){const e=this._bindings,i=t._cacheIndex,s=--this._nActiveBindings,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=i,e[i]=r}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let i=t[e];return void 0===i&&(i=new yc(new Float32Array(2),new Float32Array(2),1,Xu),i.__cacheIndex=e,t[e]=i),i}_takeBackControlInterpolant(t){const e=this._controlInterpolants,i=t.__cacheIndex,s=--this._nActiveControlInterpolants,r=e[s];t.__cacheIndex=s,e[s]=t,r.__cacheIndex=i,e[i]=r}clipAction(t,e,i){const s=e||this._root,r=s.uuid;let n="string"==typeof t?Ac.findByName(s,t):t;const a=null!==n?n.uuid:t,o=this._actionsByClip[a];let h=null;if(void 0===i&&(i=null!==n?n.blendMode:De),void 0!==o){const t=o.actionByRoot[r];if(void 0!==t&&t.blendMode===i)return t;h=o.knownActions[0],null===n&&(n=h._clip)}if(null===n)return null;const l=new Ju(this,n,e,i);return this._bindAction(l,h),this._addInactiveAction(l,a,r),l}existingAction(t,e){const i=e||this._root,s=i.uuid,r="string"==typeof t?Ac.findByName(i,t):t,n=r?r.uuid:t,a=this._actionsByClip[n];return void 0!==a&&a.actionByRoot[s]||null}stopAllAction(){const t=this._actions;for(let e=this._nActiveActions-1;e>=0;--e)t[e].stop();return this}update(t){t*=this.timeScale;const e=this._actions,i=this._nActiveActions,s=this.time+=t,r=Math.sign(t),n=this._accuIndex^=1;for(let a=0;a!==i;++a){e[a]._update(s,t,r,n)}const a=this._bindings,o=this._nActiveBindings;for(let t=0;t!==o;++t)a[t].apply(n);return this}setTime(t){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,i=t.uuid,s=this._actionsByClip,r=s[i];if(void 0!==r){const t=r.knownActions;for(let i=0,s=t.length;i!==s;++i){const s=t[i];this._deactivateAction(s);const r=s._cacheIndex,n=e[e.length-1];s._cacheIndex=null,s._byClipCacheIndex=null,n._cacheIndex=r,e[r]=n,e.pop(),this._removeInactiveBindingsForAction(s)}delete s[i]}}uncacheRoot(t){const e=t.uuid,i=this._actionsByClip;for(const t in i){const s=i[t].actionByRoot[e];void 0!==s&&(this._deactivateAction(s),this._removeInactiveAction(s))}const s=this._bindingsByRootAndName[e];if(void 0!==s)for(const t in s){const e=s[t];e.restoreOriginalState(),this._removeInactiveBinding(e)}}uncacheAction(t,e){const i=this.existingAction(t,e);null!==i&&(this._deactivateAction(i),this._removeInactiveAction(i))}}class Zu extends Ds{constructor(t=1,e=1,i=1,s={}){super(t,e,s),this.isRenderTarget3D=!0,this.depth=i,this.texture=new Js(null,t,e,i),this._setTextureOptions(s),this.texture.isRenderTargetTexture=!0}}class Hu{constructor(t){this.value=t}clone(){return new Hu(void 0===this.value.clone?this.value:this.value.clone())}}let Gu=0;class $u extends os{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:Gu++}),this.name="",this.usage=Bi,this.uniforms=[]}add(t){return this.uniforms.push(t),this}remove(t){const e=this.uniforms.indexOf(t);return-1!==e&&this.uniforms.splice(e,1),this}setName(t){return this.name=t,this}setUsage(t){return this.usage=t,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(t){this.name=t.name,this.usage=t.usage;const e=t.uniforms;this.uniforms.length=0;for(let t=0,i=e.length;t<i;t++){const i=Array.isArray(e[t])?e[t]:[e[t]];for(let t=0;t<i.length;t++)this.uniforms.push(i[t].clone())}return this}clone(){return(new this.constructor).copy(this)}}class Qu extends _a{constructor(t,e,i=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}class Ku{constructor(t,e,i,s,r,n=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=t,this.type=e,this.itemSize=i,this.elementSize=s,this.count=r,this.normalized=n,this.version=0}set needsUpdate(t){!0===t&&this.version++}setBuffer(t){return this.buffer=t,this}setType(t,e){return this.type=t,this.elementSize=e,this}setItemSize(t){return this.itemSize=t,this}setCount(t){return this.count=t,this}}const td=new vr;class ed{constructor(t,e,i=0,s=1/0){this.ray=new br(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new kr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):rs("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return td.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(td),this}intersectObject(t,e=!0,i=[]){return sd(t,this,i,e),i.sort(id),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)sd(t[s],this,i,e);return i.sort(id),i}}function id(t,e){return t.distance-e.distance}function sd(t,e,i,s){let r=!0;if(t.layers.test(e.layers)){!1===t.raycast(e,i)&&(r=!1)}if(!0===r&&!0===s){const s=t.children;for(let t=0,r=s.length;t<r;t++)sd(s[t],e,i,!0)}}class rd{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,void 0!==t.hidden&&(this._pageVisibilityHandler=nd.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){null!==this._pageVisibilityHandler&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return null!==this._pageVisibilityHandler&&!0===this._document.hidden?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(void 0!==t?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function nd(){!1===this._document.hidden&&this.reset()}class ad{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){const t=1e-6;return this.phi=ps(this.phi,t,Math.PI-t),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),0===this.radius?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(ps(e/this.radius,-1,1))),this}clone(){return(new this.constructor).copy(this)}}class od{constructor(t=1,e=0,i=0){this.radius=t,this.theta=e,this.y=i}set(t,e,i){return this.radius=t,this.theta=e,this.y=i,this}copy(t){return this.radius=t.radius,this.theta=t.theta,this.y=t.y,this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+i*i),this.theta=Math.atan2(t,i),this.y=e,this}clone(){return(new this.constructor).copy(this)}}class hd{constructor(t,e,i,s){hd.prototype.isMatrix2=!0,this.elements=[1,0,0,1],void 0!==t&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}}const ld=new bs;class cd{constructor(t=new bs(1/0,1/0),e=new bs(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=ld.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}clone(){return(new this.constructor).copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ld).distanceTo(t)}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ud=new ws,dd=new ws,pd=new ws,md=new ws,yd=new ws,gd=new ws,fd=new ws;class xd{constructor(t=new ws,e=new ws){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){ud.subVectors(t,this.start),dd.subVectors(this.end,this.start);const i=dd.dot(dd);let s=dd.dot(ud)/i;return e&&(s=ps(s,0,1)),s}closestPointToPoint(t,e,i){const s=this.closestPointToPointParameter(t,e);return this.delta(i).multiplyScalar(s).add(this.start)}distanceSqToLine3(t,e=gd,i=fd){const s=1e-8*1e-8;let r,n;const a=this.start,o=t.start,h=this.end,l=t.end;pd.subVectors(h,a),md.subVectors(l,o),yd.subVectors(a,o);const c=pd.dot(pd),u=md.dot(md),d=md.dot(yd);if(c<=s&&u<=s)return e.copy(a),i.copy(o),e.sub(i),e.dot(e);if(c<=s)r=0,n=d/u,n=ps(n,0,1);else{const t=pd.dot(yd);if(u<=s)n=0,r=ps(-t/c,0,1);else{const e=pd.dot(md),i=c*u-e*e;r=0!==i?ps((e*d-t*u)/i,0,1):0,n=(e*r+d)/u,n<0?(n=0,r=ps(-t/c,0,1)):n>1&&(n=1,r=ps((e-t)/c,0,1))}}return e.copy(a).add(pd.multiplyScalar(r)),i.copy(o).add(md.multiplyScalar(n)),e.sub(i),e.dot(e)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return(new this.constructor).copy(this)}}const bd=new ws;class vd extends Yr{constructor(t,e){super(),this.light=t,this.matrixAutoUpdate=!1,this.color=e,this.type="SpotLightHelper";const i=new Wn,s=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let t=0,e=1,i=32;t<i;t++,e++){const r=t/i*Math.PI*2,n=e/i*Math.PI*2;s.push(Math.cos(r),Math.sin(r),1,Math.cos(n),Math.sin(n),1)}i.setAttribute("position",new Nn(s,3));const r=new Yo({fog:!1,toneMapped:!1});this.cone=new nh(i,r),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);const t=this.light.distance?this.light.distance:1e3,e=t*Math.tan(this.light.angle);this.cone.scale.set(e,e,t),bd.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(bd),void 0!==this.color?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}}const wd=new ws,Md=new vr,Sd=new vr;class _d extends nh{constructor(t){const e=Ad(t),i=new Wn,s=[],r=[];for(let t=0;t<e.length;t++){const i=e[t];i.parent&&i.parent.isBone&&(s.push(0,0,0),s.push(0,0,0),r.push(0,0,0),r.push(0,0,0))}i.setAttribute("position",new Nn(s,3)),i.setAttribute("color",new Nn(r,3));super(i,new Yo({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0})),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=t,this.bones=e,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1;const n=new pn(255),a=new pn(65280);this.setColors(n,a)}updateMatrixWorld(t){const e=this.bones,i=this.geometry,s=i.getAttribute("position");Sd.copy(this.root.matrixWorld).invert();for(let t=0,i=0;t<e.length;t++){const r=e[t];r.parent&&r.parent.isBone&&(Md.multiplyMatrices(Sd,r.matrixWorld),wd.setFromMatrixPosition(Md),s.setXYZ(i,wd.x,wd.y,wd.z),Md.multiplyMatrices(Sd,r.parent.matrixWorld),wd.setFromMatrixPosition(Md),s.setXYZ(i+1,wd.x,wd.y,wd.z),i+=2)}i.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(t)}setColors(t,e){const i=this.geometry.getAttribute("color");for(let s=0;s<i.count;s+=2)i.setXYZ(s,t.r,t.g,t.b),i.setXYZ(s+1,e.r,e.g,e.b);return i.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}function Ad(t){const e=[];!0===t.isBone&&e.push(t);for(let i=0;i<t.children.length;i++)e.push(...Ad(t.children[i]));return e}class Td extends ea{constructor(t,e,i){super(new Ul(e,4,2),new fn({wireframe:!0,fog:!1,toneMapped:!1})),this.light=t,this.color=i,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),void 0!==this.color?this.material.color.set(this.color):this.material.color.copy(this.light.color)}}const zd=new ws,Cd=new pn,Id=new pn;class Bd extends Yr{constructor(t,e,i){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=i,this.type="HemisphereLightHelper";const s=new Ll(e);s.rotateY(.5*Math.PI),this.material=new fn({wireframe:!0,fog:!1,toneMapped:!1}),void 0===this.color&&(this.material.vertexColors=!0);const r=s.getAttribute("position"),n=new Float32Array(3*r.count);s.setAttribute("color",new Tn(n,3)),this.add(new ea(s,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){const t=this.children[0];if(void 0!==this.color)this.material.color.set(this.color);else{const e=t.geometry.getAttribute("color");Cd.copy(this.light.color),Id.copy(this.light.groundColor);for(let t=0,i=e.count;t<i;t++){const s=t<i/2?Cd:Id;e.setXYZ(t,s.r,s.g,s.b)}e.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),t.lookAt(zd.setFromMatrixPosition(this.light.matrixWorld).negate())}}class kd extends nh{constructor(t=10,e=10,i=4473924,s=8947848){i=new pn(i),s=new pn(s);const r=e/2,n=t/e,a=t/2,o=[],h=[];for(let t=0,l=0,c=-a;t<=e;t++,c+=n){o.push(-a,0,c,a,0,c),o.push(c,0,-a,c,0,a);const e=t===r?i:s;e.toArray(h,l),l+=3,e.toArray(h,l),l+=3,e.toArray(h,l),l+=3,e.toArray(h,l),l+=3}const l=new Wn;l.setAttribute("position",new Nn(o,3)),l.setAttribute("color",new Nn(h,3));super(l,new Yo({vertexColors:!0,toneMapped:!1})),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class Od extends nh{constructor(t=10,e=16,i=8,s=64,r=4473924,n=8947848){r=new pn(r),n=new pn(n);const a=[],o=[];if(e>1)for(let i=0;i<e;i++){const s=i/e*(2*Math.PI),h=Math.sin(s)*t,l=Math.cos(s)*t;a.push(0,0,0),a.push(h,0,l);const c=1&i?r:n;o.push(c.r,c.g,c.b),o.push(c.r,c.g,c.b)}for(let e=0;e<i;e++){const h=1&e?r:n,l=t-t/i*e;for(let t=0;t<s;t++){let e=t/s*(2*Math.PI),i=Math.sin(e)*l,r=Math.cos(e)*l;a.push(i,0,r),o.push(h.r,h.g,h.b),e=(t+1)/s*(2*Math.PI),i=Math.sin(e)*l,r=Math.cos(e)*l,a.push(i,0,r),o.push(h.r,h.g,h.b)}}const h=new Wn;h.setAttribute("position",new Nn(a,3)),h.setAttribute("color",new Nn(o,3));super(h,new Yo({vertexColors:!0,toneMapped:!1})),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Pd=new ws,Rd=new ws,Nd=new ws;class Vd extends Yr{constructor(t,e,i){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=i,this.type="DirectionalLightHelper",void 0===e&&(e=1);let s=new Wn;s.setAttribute("position",new Nn([-e,e,0,e,e,0,e,-e,0,-e,-e,0,-e,e,0],3));const r=new Yo({fog:!1,toneMapped:!1});this.lightPlane=new eh(s,r),this.add(this.lightPlane),s=new Wn,s.setAttribute("position",new Nn([0,0,0,0,0,1],3)),this.targetLine=new eh(s,r),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Pd.setFromMatrixPosition(this.light.matrixWorld),Rd.setFromMatrixPosition(this.light.target.matrixWorld),Nd.subVectors(Rd,Pd),this.lightPlane.lookAt(Rd),void 0!==this.color?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(Rd),this.targetLine.scale.z=Nd.length()}}const Fd=new ws,Ld=new la;class Ed extends nh{constructor(t){const e=new Wn,i=new Yo({color:16777215,vertexColors:!0,toneMapped:!1}),s=[],r=[],n={};function a(t,e){o(t),o(e)}function o(t){s.push(0,0,0),r.push(0,0,0),void 0===n[t]&&(n[t]=[]),n[t].push(s.length/3-1)}a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4"),e.setAttribute("position",new Nn(s,3)),e.setAttribute("color",new Nn(r,3)),super(e,i),this.type="CameraHelper",this.camera=t,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=n,this.update();const h=new pn(16755200),l=new pn(16711680),c=new pn(43775),u=new pn(16777215),d=new pn(3355443);this.setColors(h,l,c,u,d)}setColors(t,e,i,s,r){const n=this.geometry.getAttribute("color");return n.setXYZ(0,t.r,t.g,t.b),n.setXYZ(1,t.r,t.g,t.b),n.setXYZ(2,t.r,t.g,t.b),n.setXYZ(3,t.r,t.g,t.b),n.setXYZ(4,t.r,t.g,t.b),n.setXYZ(5,t.r,t.g,t.b),n.setXYZ(6,t.r,t.g,t.b),n.setXYZ(7,t.r,t.g,t.b),n.setXYZ(8,t.r,t.g,t.b),n.setXYZ(9,t.r,t.g,t.b),n.setXYZ(10,t.r,t.g,t.b),n.setXYZ(11,t.r,t.g,t.b),n.setXYZ(12,t.r,t.g,t.b),n.setXYZ(13,t.r,t.g,t.b),n.setXYZ(14,t.r,t.g,t.b),n.setXYZ(15,t.r,t.g,t.b),n.setXYZ(16,t.r,t.g,t.b),n.setXYZ(17,t.r,t.g,t.b),n.setXYZ(18,t.r,t.g,t.b),n.setXYZ(19,t.r,t.g,t.b),n.setXYZ(20,t.r,t.g,t.b),n.setXYZ(21,t.r,t.g,t.b),n.setXYZ(22,t.r,t.g,t.b),n.setXYZ(23,t.r,t.g,t.b),n.setXYZ(24,e.r,e.g,e.b),n.setXYZ(25,e.r,e.g,e.b),n.setXYZ(26,e.r,e.g,e.b),n.setXYZ(27,e.r,e.g,e.b),n.setXYZ(28,e.r,e.g,e.b),n.setXYZ(29,e.r,e.g,e.b),n.setXYZ(30,e.r,e.g,e.b),n.setXYZ(31,e.r,e.g,e.b),n.setXYZ(32,i.r,i.g,i.b),n.setXYZ(33,i.r,i.g,i.b),n.setXYZ(34,i.r,i.g,i.b),n.setXYZ(35,i.r,i.g,i.b),n.setXYZ(36,i.r,i.g,i.b),n.setXYZ(37,i.r,i.g,i.b),n.setXYZ(38,s.r,s.g,s.b),n.setXYZ(39,s.r,s.g,s.b),n.setXYZ(40,r.r,r.g,r.b),n.setXYZ(41,r.r,r.g,r.b),n.setXYZ(42,r.r,r.g,r.b),n.setXYZ(43,r.r,r.g,r.b),n.setXYZ(44,r.r,r.g,r.b),n.setXYZ(45,r.r,r.g,r.b),n.setXYZ(46,r.r,r.g,r.b),n.setXYZ(47,r.r,r.g,r.b),n.setXYZ(48,r.r,r.g,r.b),n.setXYZ(49,r.r,r.g,r.b),n.needsUpdate=!0,this}update(){const t=this.geometry,e=this.pointMap;let i,s;if(Ld.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),!0===this.camera.reversedDepth)i=1,s=0;else if(this.camera.coordinateSystem===Di)i=-1,s=1;else{if(this.camera.coordinateSystem!==Ui)throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);i=0,s=1}jd("c",e,t,Ld,0,0,i),jd("t",e,t,Ld,0,0,s),jd("n1",e,t,Ld,-1,-1,i),jd("n2",e,t,Ld,1,-1,i),jd("n3",e,t,Ld,-1,1,i),jd("n4",e,t,Ld,1,1,i),jd("f1",e,t,Ld,-1,-1,s),jd("f2",e,t,Ld,1,-1,s),jd("f3",e,t,Ld,-1,1,s),jd("f4",e,t,Ld,1,1,s),jd("u1",e,t,Ld,.7,1.1,i),jd("u2",e,t,Ld,-.7,1.1,i),jd("u3",e,t,Ld,0,2,i),jd("cf1",e,t,Ld,-1,0,s),jd("cf2",e,t,Ld,1,0,s),jd("cf3",e,t,Ld,0,-1,s),jd("cf4",e,t,Ld,0,1,s),jd("cn1",e,t,Ld,-1,0,i),jd("cn2",e,t,Ld,1,0,i),jd("cn3",e,t,Ld,0,-1,i),jd("cn4",e,t,Ld,0,1,i),t.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function jd(t,e,i,s,r,n,a){Fd.set(r,n,a).unproject(s);const o=e[t];if(void 0!==o){const t=i.getAttribute("position");for(let e=0,i=o.length;e<i;e++)t.setXYZ(o[e],Fd.x,Fd.y,Fd.z)}}const Dd=new Ys;class Ud extends nh{constructor(t,e=16776960){const i=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),s=new Float32Array(24),r=new Wn;r.setIndex(new Tn(i,1)),r.setAttribute("position",new Tn(s,3)),super(r,new Yo({color:e,toneMapped:!1})),this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(void 0!==this.object&&Dd.setFromObject(this.object),Dd.isEmpty())return;const t=Dd.min,e=Dd.max,i=this.geometry.attributes.position,s=i.array;s[0]=e.x,s[1]=e.y,s[2]=e.z,s[3]=t.x,s[4]=e.y,s[5]=e.z,s[6]=t.x,s[7]=t.y,s[8]=e.z,s[9]=e.x,s[10]=t.y,s[11]=e.z,s[12]=e.x,s[13]=e.y,s[14]=t.z,s[15]=t.x,s[16]=e.y,s[17]=t.z,s[18]=t.x,s[19]=t.y,s[20]=t.z,s[21]=e.x,s[22]=t.y,s[23]=t.z,i.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t,e){return super.copy(t,e),this.object=t.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class Wd extends nh{constructor(t,e=16776960){const i=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),s=new Wn;s.setIndex(new Tn(i,1)),s.setAttribute("position",new Nn([1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],3)),super(s,new Yo({color:e,toneMapped:!1})),this.box=t,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(t){const e=this.box;e.isEmpty()||(e.getCenter(this.position),e.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(t))}dispose(){this.geometry.dispose(),this.material.dispose()}}class qd extends eh{constructor(t,e=1,i=16776960){const s=i,r=new Wn;r.setAttribute("position",new Nn([1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],3)),r.computeBoundingSphere(),super(r,new Yo({color:s,toneMapped:!1})),this.type="PlaneHelper",this.plane=t,this.size=e;const n=new Wn;n.setAttribute("position",new Nn([1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],3)),n.computeBoundingSphere(),this.add(new ea(n,new fn({color:s,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(t){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(t)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}const Jd=new ws;let Xd,Yd;class Zd extends Yr{constructor(t=new ws(0,0,1),e=new ws(0,0,0),i=1,s=16776960,r=.2*i,n=.2*r){super(),this.type="ArrowHelper",void 0===Xd&&(Xd=new Wn,Xd.setAttribute("position",new Nn([0,0,0,0,1,0],3)),Yd=new zh(.5,1,5,1),Yd.translate(0,-.5,0)),this.position.copy(e),this.line=new eh(Xd,new Yo({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new ea(Yd,new fn({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(i,r,n)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{Jd.set(t.z,0,-t.x).normalize();const e=Math.acos(t.y);this.quaternion.setFromAxisAngle(Jd,e)}}setLength(t,e=.2*t,i=.2*e){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(i,e,i),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class Hd extends nh{constructor(t=1){const e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],i=new Wn;i.setAttribute("position",new Nn(e,3)),i.setAttribute("color",new Nn([1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],3));super(i,new Yo({vertexColors:!0,toneMapped:!1})),this.type="AxesHelper"}setColors(t,e,i){const s=new pn,r=this.geometry.attributes.color.array;return s.set(t),s.toArray(r,0),s.toArray(r,3),s.set(e),s.toArray(r,6),s.toArray(r,9),s.set(i),s.toArray(r,12),s.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class Gd{constructor(){this.type="ShapePath",this.color=new pn,this.subPaths=[],this.currentPath=null}moveTo(t,e){return this.currentPath=new il,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,e),this}lineTo(t,e){return this.currentPath.lineTo(t,e),this}quadraticCurveTo(t,e,i,s){return this.currentPath.quadraticCurveTo(t,e,i,s),this}bezierCurveTo(t,e,i,s,r,n){return this.currentPath.bezierCurveTo(t,e,i,s,r,n),this}splineThru(t){return this.currentPath.splineThru(t),this}toShapes(t){function e(t,e){const i=e.length;let s=!1;for(let r=i-1,n=0;n<i;r=n++){let i=e[r],a=e[n],o=a.x-i.x,h=a.y-i.y;if(Math.abs(h)>Number.EPSILON){if(h<0&&(i=e[n],o=-o,a=e[r],h=-h),t.y<i.y||t.y>a.y)continue;if(t.y===i.y){if(t.x===i.x)return!0}else{const e=h*(t.x-i.x)-o*(t.y-i.y);if(0===e)return!0;if(e<0)continue;s=!s}}else{if(t.y!==i.y)continue;if(a.x<=t.x&&t.x<=i.x||i.x<=t.x&&t.x<=a.x)return!0}}return s}const i=kl.isClockWise,s=this.subPaths;if(0===s.length)return[];let r,n,a;const o=[];if(1===s.length)return n=s[0],a=new sl,a.curves=n.curves,o.push(a),o;let h=!i(s[0].getPoints());h=t?!h:h;const l=[],c=[];let u,d,p=[],m=0;c[m]=void 0,p[m]=[];for(let e=0,a=s.length;e<a;e++)n=s[e],u=n.getPoints(),r=i(u),r=t?!r:r,r?(!h&&c[m]&&m++,c[m]={s:new sl,p:u},c[m].s.curves=n.curves,h&&m++,p[m]=[]):p[m].push({h:n,p:u[0]});if(!c[0])return function(t){const e=[];for(let i=0,s=t.length;i<s;i++){const s=t[i],r=new sl;r.curves=s.curves,e.push(r)}return e}(s);if(c.length>1){let t=!1,i=0;for(let t=0,e=c.length;t<e;t++)l[t]=[];for(let s=0,r=c.length;s<r;s++){const r=p[s];for(let n=0;n<r.length;n++){const a=r[n];let o=!0;for(let r=0;r<c.length;r++)e(a.p,c[r].p)&&(s!==r&&i++,o?(o=!1,l[r].push(a)):t=!0);o&&l[s].push(a)}}i>0&&!1===t&&(p=l)}for(let t=0,e=c.length;t<e;t++){a=c[t].s,o.push(a),d=p[t];for(let t=0,e=d.length;t<e;t++)a.holes.push(d[t].h)}return o}}class $d extends os{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){void 0!==t?(null!==this.domElement&&this.disconnect(),this.domElement=t):ss("Controls: connect() now requires an element.")}disconnect(){}dispose(){}update(){}}function Qd(t,e,i,s){const r=function(t){switch(t){case Tt:case zt:return{byteLength:1,components:1};case It:case Ct:case Pt:return{byteLength:2,components:1};case Rt:case Nt:return{byteLength:2,components:4};case kt:case Bt:case Ot:return{byteLength:4,components:1};case Ft:case Lt:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}(s);switch(i){case 1021:return t*e;case qt:case Jt:return t*e/r.components*r.byteLength;case 1030:case 1031:return t*e*2/r.components*r.byteLength;case 1022:return t*e*3/r.components*r.byteLength;case Dt:case 1033:return t*e*4/r.components*r.byteLength;case 33776:case 33777:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(t,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(t,8)*Math.max(e,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37490:case 37491:case 37808:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(t/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(t/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}class Kd{static contain(t,e){return function(t,e){const i=t.image&&t.image.width?t.image.width/t.image.height:1;return i>e?(t.repeat.x=1,t.repeat.y=i/e,t.offset.x=0,t.offset.y=(1-t.repeat.y)/2):(t.repeat.x=e/i,t.repeat.y=1,t.offset.x=(1-t.repeat.x)/2,t.offset.y=0),t}(t,e)}static cover(t,e){return function(t,e){const i=t.image&&t.image.width?t.image.width/t.image.height:1;return i>e?(t.repeat.x=e/i,t.repeat.y=1,t.offset.x=(1-t.repeat.x)/2,t.offset.y=0):(t.repeat.x=1,t.repeat.y=i/e,t.offset.x=0,t.offset.y=(1-t.repeat.y)/2),t}(t,e)}static fill(t){return function(t){return t.repeat.x=1,t.repeat.y=1,t.offset.x=0,t.offset.y=0,t}(t)}static getByteLength(t,e,i,s){return Qd(t,e,i,s)}}"undefined"!=typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:t}})),"undefined"!=typeof window&&(window.__THREE__?ss("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=t);window.__THREE_CORE={ACESFilmicToneMapping:et,AddEquation:v,AddOperation:G,AdditiveAnimationBlendMode:Ue,AdditiveBlending:g,AgXToneMapping:st,AlphaFormat:Et,AlwaysCompare:Ii,AlwaysDepth:D,AlwaysStencilFunc:wi,AmbientLight:tu,AnimationAction:Ju,AnimationClip:Ac,AnimationLoader:Rc,AnimationMixer:Yu,AnimationObjectGroup:qu,AnimationUtils:dc,ArcCurve:Fh,ArrayCamera:wu,ArrowHelper:Zd,AttachedBindMode:nt,Audio:Iu,AudioAnalyser:Nu,AudioContext:yu,AudioListener:Cu,AudioLoader:gu,AxesHelper:Hd,BackSide:d,BasicDepthPacking:Xe,BasicShadowMap:o,BatchedMesh:Xo,Bone:io,BooleanKeyframeTrack:xc,Box2:cd,Box3:Ys,Box3Helper:Wd,BoxGeometry:sa,BoxHelper:Ud,BufferAttribute:Tn,BufferGeometry:Wn,BufferGeometryLoader:ou,ByteType:zt,Cache:zc,Camera:la,CameraHelper:Ed,CanvasTexture:vh,CapsuleGeometry:_h,CatmullRomCurve3:Wh,CineonToneMapping:tt,CircleGeometry:Ah,ClampToEdgeWrapping:mt,Clock:Mu,Color:pn,ColorKeyframeTrack:bc,ColorManagement:Is,CompressedArrayTexture:xh,CompressedCubeTexture:bh,CompressedTexture:fh,CompressedTextureLoader:Nc,ConeGeometry:zh,ConstantAlphaFactor:L,ConstantColorFactor:V,Controls:$d,CubeCamera:ya,CubeDepthTexture:Mh,CubeReflectionMapping:ht,CubeRefractionMapping:lt,CubeTexture:ga,CubeTextureLoader:Lc,CubeUVReflectionMapping:dt,CubicBezierCurve:Yh,CubicBezierCurve3:Zh,CubicInterpolant:mc,CullFaceBack:r,CullFaceFront:n,CullFaceFrontBack:a,CullFaceNone:s,Curve:Nh,CurvePath:el,CustomBlending:b,CustomToneMapping:it,CylinderGeometry:Th,Cylindrical:od,Data3DTexture:Js,DataArrayTexture:Ws,DataTexture:so,DataTextureLoader:Ec,DataUtils:Mn,DecrementStencilOp:ci,DecrementWrapStencilOp:di,DefaultLoadingManager:Ic,DepthFormat:Ut,DepthStencilFormat:Wt,DepthTexture:wh,DetachedBindMode:at,DirectionalLight:Kc,DirectionalLightHelper:Vd,DiscreteInterpolant:gc,DodecahedronGeometry:Ih,DoubleSide:p,DstAlphaFactor:k,DstColorFactor:P,DynamicCopyUsage:Fi,DynamicDrawUsage:ki,DynamicReadUsage:Ri,EdgesGeometry:Rh,EllipseCurve:Vh,EqualCompare:_i,EqualDepth:q,EqualStencilFunc:gi,EquirectangularReflectionMapping:ct,EquirectangularRefractionMapping:ut,Euler:Br,EventDispatcher:os,ExternalTexture:Sh,ExtrudeGeometry:Rl,FileLoader:Pc,Float16BufferAttribute:Rn,Float32BufferAttribute:Nn,FloatType:Ot,Fog:Ma,FogExp2:wa,FramebufferTexture:gh,FrontSide:u,Frustum:_o,FrustumArray:zo,GLBufferAttribute:Ku,GLSL1:Ei,GLSL3:ji,GreaterCompare:Ti,GreaterDepth:X,GreaterEqualCompare:Ci,GreaterEqualDepth:J,GreaterEqualStencilFunc:vi,GreaterStencilFunc:xi,GridHelper:kd,Group:xa,HalfFloatType:Pt,HemisphereLight:Uc,HemisphereLightHelper:Bd,IcosahedronGeometry:Vl,ImageBitmapLoader:pu,ImageLoader:Fc,ImageUtils:Ps,IncrementStencilOp:li,IncrementWrapStencilOp:ui,InstancedBufferAttribute:oo,InstancedBufferGeometry:au,InstancedInterleavedBuffer:Qu,InstancedMesh:go,Int16BufferAttribute:Bn,Int32BufferAttribute:On,Int8BufferAttribute:zn,IntType:Bt,InterleavedBuffer:_a,InterleavedBufferAttribute:Ta,Interpolant:pc,InterpolateDiscrete:Ne,InterpolateLinear:Ve,InterpolateSmooth:Fe,InterpolationSamplingMode:Ji,InterpolationSamplingType:qi,InvertStencilOp:pi,KeepStencilOp:oi,KeyframeTrack:fc,LOD:Ja,LatheGeometry:Fl,Layers:kr,LessCompare:Si,LessDepth:U,LessEqualCompare:Ai,LessEqualDepth:W,LessEqualStencilFunc:fi,LessStencilFunc:yi,Light:Dc,LightProbe:su,Line:eh,Line3:xd,LineBasicMaterial:Yo,LineCurve:Hh,LineCurve3:Gh,LineDashedMaterial:oc,LineLoop:ah,LineSegments:nh,LinearFilter:wt,LinearInterpolant:yc,LinearMipMapLinearFilter:At,LinearMipMapNearestFilter:St,LinearMipmapLinearFilter:_t,LinearMipmapNearestFilter:Mt,LinearSRGBColorSpace:ti,LinearToneMapping:Q,LinearTransfer:ei,Loader:Bc,LoaderUtils:nu,LoadingManager:Cc,LoopOnce:Oe,LoopPingPong:Re,LoopRepeat:Pe,MOUSE:e,Material:gn,MaterialLoader:ru,MathUtils:xs,Matrix2:hd,Matrix3:_s,Matrix4:vr,MaxEquation:_,Mesh:ea,MeshBasicMaterial:fn,MeshDepthMaterial:rc,MeshDistanceMaterial:nc,MeshLambertMaterial:sc,MeshMatcapMaterial:ac,MeshNormalMaterial:ic,MeshPhongMaterial:tc,MeshPhysicalMaterial:Kl,MeshStandardMaterial:Ql,MeshToonMaterial:ec,MinEquation:S,MirroredRepeatWrapping:yt,MixOperation:H,MultiplyBlending:x,MultiplyOperation:Z,NearestFilter:gt,NearestMipMapLinearFilter:vt,NearestMipMapNearestFilter:xt,NearestMipmapLinearFilter:bt,NearestMipmapNearestFilter:ft,NeutralToneMapping:rt,NeverCompare:Mi,NeverDepth:j,NeverStencilFunc:mi,NoBlending:m,NoColorSpace:Qe,NoNormalPacking:si,NoToneMapping:$,NormalAnimationBlendMode:De,NormalBlending:y,NormalGAPacking:ni,NormalRGPacking:ri,NotEqualCompare:zi,NotEqualDepth:Y,NotEqualStencilFunc:bi,NumberKeyframeTrack:vc,Object3D:Yr,ObjectLoader:hu,ObjectSpaceNormalMap:$e,OctahedronGeometry:Ll,OneFactor:T,OneMinusConstantAlphaFactor:E,OneMinusConstantColorFactor:F,OneMinusDstAlphaFactor:O,OneMinusDstColorFactor:R,OneMinusSrcAlphaFactor:B,OneMinusSrcColorFactor:C,OrthographicCamera:$c,PCFShadowMap:h,PCFSoftShadowMap:l,Path:il,PerspectiveCamera:pa,Plane:vo,PlaneGeometry:El,PlaneHelper:qd,PointLight:Gc,PointLightHelper:Td,Points:dh,PointsMaterial:oh,PolarGridHelper:Od,PolyhedronGeometry:Ch,PositionalAudio:Ru,PropertyBinding:Wu,PropertyMixer:Vu,QuadraticBezierCurve:$h,QuadraticBezierCurve3:Qh,Quaternion:vs,QuaternionKeyframeTrack:Mc,QuaternionLinearInterpolant:wc,R11_EAC_Format:oe,RAD2DEG:us,RED_GREEN_RGTC2_Format:Be,RED_RGTC1_Format:Ce,REVISION:t,RG11_EAC_Format:le,RGBADepthPacking:Ye,RGBAFormat:Dt,RGBAIntegerFormat:Ht,RGBA_ASTC_10x10_Format:Me,RGBA_ASTC_10x5_Format:be,RGBA_ASTC_10x6_Format:ve,RGBA_ASTC_10x8_Format:we,RGBA_ASTC_12x10_Format:Se,RGBA_ASTC_12x12_Format:_e,RGBA_ASTC_4x4_Format:ue,RGBA_ASTC_5x4_Format:de,RGBA_ASTC_5x5_Format:pe,RGBA_ASTC_6x5_Format:me,RGBA_ASTC_6x6_Format:ye,RGBA_ASTC_8x5_Format:ge,RGBA_ASTC_8x6_Format:fe,RGBA_ASTC_8x8_Format:xe,RGBA_BPTC_Format:Ae,RGBA_ETC2_EAC_Format:ae,RGBA_PVRTC_2BPPV1_Format:se,RGBA_PVRTC_4BPPV1_Format:ie,RGBA_S3TC_DXT1_Format:$t,RGBA_S3TC_DXT3_Format:Qt,RGBA_S3TC_DXT5_Format:Kt,RGBDepthPacking:Ze,RGBFormat:jt,RGBIntegerFormat:Zt,RGB_BPTC_SIGNED_Format:Te,RGB_BPTC_UNSIGNED_Format:ze,RGB_ETC1_Format:re,RGB_ETC2_Format:ne,RGB_PVRTC_2BPPV1_Format:ee,RGB_PVRTC_4BPPV1_Format:te,RGB_S3TC_DXT1_Format:Gt,RGDepthPacking:He,RGFormat:Xt,RGIntegerFormat:Yt,RawShaderMaterial:$l,Ray:br,Raycaster:ed,RectAreaLight:eu,RedFormat:qt,RedIntegerFormat:Jt,ReinhardToneMapping:K,RenderTarget:Ds,RenderTarget3D:Zu,RepeatWrapping:pt,ReplaceStencilOp:hi,ReverseSubtractEquation:M,RingGeometry:jl,SIGNED_R11_EAC_Format:he,SIGNED_RED_GREEN_RGTC2_Format:ke,SIGNED_RED_RGTC1_Format:Ie,SIGNED_RG11_EAC_Format:ce,SRGBColorSpace:Ke,SRGBTransfer:ii,Scene:Sa,ShaderMaterial:ha,ShadowMaterial:Gl,Shape:sl,ShapeGeometry:Dl,ShapePath:Gd,ShapeUtils:kl,ShortType:Ct,Skeleton:ao,SkeletonHelper:_d,SkinnedMesh:eo,Source:Ns,Sphere:ur,SphereGeometry:Ul,Spherical:ad,SphericalHarmonics3:iu,SplineCurve:Kh,SpotLight:Zc,SpotLightHelper:vd,Sprite:Da,SpriteMaterial:za,SrcAlphaFactor:I,SrcAlphaSaturateFactor:N,SrcColorFactor:z,StaticCopyUsage:Vi,StaticDrawUsage:Bi,StaticReadUsage:Pi,StereoCamera:vu,StreamCopyUsage:Li,StreamDrawUsage:Oi,StreamReadUsage:Ni,StringKeyframeTrack:Sc,SubtractEquation:w,SubtractiveBlending:f,TOUCH:i,TangentSpaceNormalMap:Ge,TetrahedronGeometry:Wl,Texture:Es,TextureLoader:jc,TextureUtils:Kd,Timer:rd,TimestampQuery:Wi,TorusGeometry:ql,TorusKnotGeometry:Jl,Triangle:hn,TriangleFanDrawMode:Je,TriangleStripDrawMode:qe,TrianglesDrawMode:We,TubeGeometry:Xl,UVMapping:ot,Uint16BufferAttribute:kn,Uint32BufferAttribute:Pn,Uint8BufferAttribute:Cn,Uint8ClampedBufferAttribute:In,Uniform:Hu,UniformsGroup:$u,UniformsUtils:oa,UnsignedByteType:Tt,UnsignedInt101111Type:Lt,UnsignedInt248Type:Vt,UnsignedInt5999Type:Ft,UnsignedIntType:kt,UnsignedShort4444Type:Rt,UnsignedShort5551Type:Nt,UnsignedShortType:It,VSMShadowMap:c,Vector2:bs,Vector3:ws,Vector4:js,VectorKeyframeTrack:_c,VideoFrameTexture:yh,VideoTexture:mh,WebGL3DRenderTarget:Xs,WebGLArrayRenderTarget:qs,WebGLCoordinateSystem:Di,WebGLCubeRenderTarget:fa,WebGLRenderTarget:Us,WebGPUCoordinateSystem:Ui,WebXRController:va,WireframeGeometry:Yl,WrapAroundEnding:je,ZeroCurvatureEnding:Le,ZeroFactor:A,ZeroSlopeEnding:Ee,ZeroStencilOp:ai,arrayNeedsUint32:Xi,cloneUniforms:ra,createCanvasElement:$i,createElementNS:Gi,error:rs,getByteLength:Qd,getConsoleFunction:es,getUnlitUniformColorSpace:aa,isTypedArray:Hi,log:is,mergeUniforms:na,probeAsync:as,setConsoleFunction:ts,warn:ss,warnOnce:ns};

})();

(function(){
window.THREE=window.THREE||{};
/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const{Matrix3:e,Vector2:t,Color:n,mergeUniforms:i,Vector3:r,CubeUVReflectionMapping:a,Mesh:o,BoxGeometry:s,ShaderMaterial:l,BackSide:c,cloneUniforms:d,Euler:u,Matrix4:f,ColorManagement:p,SRGBTransfer:m,PlaneGeometry:h,FrontSide:_,getUnlitUniformColorSpace:g,IntType:v,warn:E,HalfFloatType:S,UnsignedByteType:T,FloatType:M,RGBAFormat:x,Plane:A,EquirectangularReflectionMapping:R,EquirectangularRefractionMapping:b,WebGLCubeRenderTarget:C,CubeReflectionMapping:P,CubeRefractionMapping:L,BufferGeometry:U,OrthographicCamera:D,PerspectiveCamera:w,NoToneMapping:I,MeshBasicMaterial:N,error:y,NoBlending:F,WebGLRenderTarget:O,BufferAttribute:B,LinearSRGBColorSpace:G,LinearFilter:H,warnOnce:V,Uint32BufferAttribute:W,Uint16BufferAttribute:k,arrayNeedsUint32:z,Vector4:X,DataArrayTexture:Y,Float32BufferAttribute:K,RawShaderMaterial:q,CustomToneMapping:j,NeutralToneMapping:Z,AgXToneMapping:$,ACESFilmicToneMapping:Q,CineonToneMapping:J,ReinhardToneMapping:ee,LinearToneMapping:te,CubeTexture:ne,Data3DTexture:ie,GreaterEqualCompare:re,LessEqualCompare:ae,DepthTexture:oe,Texture:se,GLSL3:le,VSMShadowMap:ce,PCFShadowMap:de,AddOperation:ue,MixOperation:fe,MultiplyOperation:pe,LinearTransfer:me,UniformsUtils:he,DoubleSide:_e,NormalBlending:ge,TangentSpaceNormalMap:ve,ObjectSpaceNormalMap:Ee,Layers:Se,RGFormat:Te,Frustum:Me,MeshDepthMaterial:xe,MeshDistanceMaterial:Ae,PCFSoftShadowMap:Re,DepthFormat:be,NearestFilter:Ce,CubeDepthTexture:Pe,UnsignedIntType:Le,LessEqualDepth:Ue,ReverseSubtractEquation:De,SubtractEquation:we,AddEquation:Ie,OneMinusConstantAlphaFactor:Ne,ConstantAlphaFactor:ye,OneMinusConstantColorFactor:Fe,ConstantColorFactor:Oe,OneMinusDstAlphaFactor:Be,OneMinusDstColorFactor:Ge,OneMinusSrcAlphaFactor:He,OneMinusSrcColorFactor:Ve,DstAlphaFactor:We,DstColorFactor:ke,SrcAlphaSaturateFactor:ze,SrcAlphaFactor:Xe,SrcColorFactor:Ye,OneFactor:Ke,ZeroFactor:qe,NotEqualDepth:je,GreaterDepth:Ze,GreaterEqualDepth:$e,EqualDepth:Qe,LessDepth:Je,AlwaysDepth:et,NeverDepth:tt,CullFaceNone:nt,CullFaceBack:it,CullFaceFront:rt,CustomBlending:at,MultiplyBlending:ot,SubtractiveBlending:st,AdditiveBlending:lt,MinEquation:ct,MaxEquation:dt,MirroredRepeatWrapping:ut,ClampToEdgeWrapping:ft,RepeatWrapping:pt,LinearMipmapLinearFilter:mt,LinearMipmapNearestFilter:ht,NearestMipmapLinearFilter:_t,NearestMipmapNearestFilter:gt,NotEqualCompare:vt,GreaterCompare:Et,EqualCompare:St,LessCompare:Tt,AlwaysCompare:Mt,NeverCompare:xt,NoColorSpace:At,DepthStencilFormat:Rt,getByteLength:bt,UnsignedInt248Type:Ct,UnsignedShortType:Pt,createElementNS:Lt,UnsignedShort4444Type:Ut,UnsignedShort5551Type:Dt,UnsignedInt5999Type:wt,UnsignedInt101111Type:It,ByteType:Nt,ShortType:yt,AlphaFormat:Ft,RGBFormat:Ot,RedFormat:Bt,RedIntegerFormat:Gt,RGIntegerFormat:Ht,RGBAIntegerFormat:Vt,RGB_S3TC_DXT1_Format:Wt,RGBA_S3TC_DXT1_Format:kt,RGBA_S3TC_DXT3_Format:zt,RGBA_S3TC_DXT5_Format:Xt,RGB_PVRTC_4BPPV1_Format:Yt,RGB_PVRTC_2BPPV1_Format:Kt,RGBA_PVRTC_4BPPV1_Format:qt,RGBA_PVRTC_2BPPV1_Format:jt,RGB_ETC1_Format:Zt,RGB_ETC2_Format:$t,RGBA_ETC2_EAC_Format:Qt,R11_EAC_Format:Jt,SIGNED_R11_EAC_Format:en,RG11_EAC_Format:tn,SIGNED_RG11_EAC_Format:nn,RGBA_ASTC_4x4_Format:rn,RGBA_ASTC_5x4_Format:an,RGBA_ASTC_5x5_Format:on,RGBA_ASTC_6x5_Format:sn,RGBA_ASTC_6x6_Format:ln,RGBA_ASTC_8x5_Format:cn,RGBA_ASTC_8x6_Format:dn,RGBA_ASTC_8x8_Format:un,RGBA_ASTC_10x5_Format:fn,RGBA_ASTC_10x6_Format:pn,RGBA_ASTC_10x8_Format:mn,RGBA_ASTC_10x10_Format:hn,RGBA_ASTC_12x10_Format:_n,RGBA_ASTC_12x12_Format:gn,RGBA_BPTC_Format:vn,RGB_BPTC_SIGNED_Format:En,RGB_BPTC_UNSIGNED_Format:Sn,RED_RGTC1_Format:Tn,SIGNED_RED_RGTC1_Format:Mn,RED_GREEN_RGTC2_Format:xn,SIGNED_RED_GREEN_RGTC2_Format:An,ExternalTexture:Rn,EventDispatcher:bn,ArrayCamera:Cn,WebXRController:Pn,RAD2DEG:Ln,DataTexture:Un,createCanvasElement:Dn,SRGBColorSpace:wn,REVISION:In,log:Nn,WebGLCoordinateSystem:yn,probeAsync:Fn}=window.__THREE_CORE;Object.assign(window.THREE,{AdditiveAnimationBlendMode:window.__THREE_CORE.AdditiveAnimationBlendMode,AlwaysStencilFunc:window.__THREE_CORE.AlwaysStencilFunc,AmbientLight:window.__THREE_CORE.AmbientLight,AnimationAction:window.__THREE_CORE.AnimationAction,AnimationClip:window.__THREE_CORE.AnimationClip,AnimationLoader:window.__THREE_CORE.AnimationLoader,AnimationMixer:window.__THREE_CORE.AnimationMixer,AnimationObjectGroup:window.__THREE_CORE.AnimationObjectGroup,AnimationUtils:window.__THREE_CORE.AnimationUtils,ArcCurve:window.__THREE_CORE.ArcCurve,ArrowHelper:window.__THREE_CORE.ArrowHelper,AttachedBindMode:window.__THREE_CORE.AttachedBindMode,Audio:window.__THREE_CORE.Audio,AudioAnalyser:window.__THREE_CORE.AudioAnalyser,AudioContext:window.__THREE_CORE.AudioContext,AudioListener:window.__THREE_CORE.AudioListener,AudioLoader:window.__THREE_CORE.AudioLoader,AxesHelper:window.__THREE_CORE.AxesHelper,BasicDepthPacking:window.__THREE_CORE.BasicDepthPacking,BasicShadowMap:window.__THREE_CORE.BasicShadowMap,BatchedMesh:window.__THREE_CORE.BatchedMesh,Bone:window.__THREE_CORE.Bone,BooleanKeyframeTrack:window.__THREE_CORE.BooleanKeyframeTrack,Box2:window.__THREE_CORE.Box2,Box3:window.__THREE_CORE.Box3,Box3Helper:window.__THREE_CORE.Box3Helper,BoxHelper:window.__THREE_CORE.BoxHelper,BufferGeometryLoader:window.__THREE_CORE.BufferGeometryLoader,Cache:window.__THREE_CORE.Cache,Camera:window.__THREE_CORE.Camera,CameraHelper:window.__THREE_CORE.CameraHelper,CanvasTexture:window.__THREE_CORE.CanvasTexture,CapsuleGeometry:window.__THREE_CORE.CapsuleGeometry,CatmullRomCurve3:window.__THREE_CORE.CatmullRomCurve3,CircleGeometry:window.__THREE_CORE.CircleGeometry,Clock:window.__THREE_CORE.Clock,ColorKeyframeTrack:window.__THREE_CORE.ColorKeyframeTrack,CompressedArrayTexture:window.__THREE_CORE.CompressedArrayTexture,CompressedCubeTexture:window.__THREE_CORE.CompressedCubeTexture,CompressedTexture:window.__THREE_CORE.CompressedTexture,CompressedTextureLoader:window.__THREE_CORE.CompressedTextureLoader,ConeGeometry:window.__THREE_CORE.ConeGeometry,Controls:window.__THREE_CORE.Controls,CubeCamera:window.__THREE_CORE.CubeCamera,CubeTextureLoader:window.__THREE_CORE.CubeTextureLoader,CubicBezierCurve:window.__THREE_CORE.CubicBezierCurve,CubicBezierCurve3:window.__THREE_CORE.CubicBezierCurve3,CubicInterpolant:window.__THREE_CORE.CubicInterpolant,CullFaceFrontBack:window.__THREE_CORE.CullFaceFrontBack,Curve:window.__THREE_CORE.Curve,CurvePath:window.__THREE_CORE.CurvePath,CylinderGeometry:window.__THREE_CORE.CylinderGeometry,Cylindrical:window.__THREE_CORE.Cylindrical,DataTextureLoader:window.__THREE_CORE.DataTextureLoader,DataUtils:window.__THREE_CORE.DataUtils,DecrementStencilOp:window.__THREE_CORE.DecrementStencilOp,DecrementWrapStencilOp:window.__THREE_CORE.DecrementWrapStencilOp,DefaultLoadingManager:window.__THREE_CORE.DefaultLoadingManager,DetachedBindMode:window.__THREE_CORE.DetachedBindMode,DirectionalLight:window.__THREE_CORE.DirectionalLight,DirectionalLightHelper:window.__THREE_CORE.DirectionalLightHelper,DiscreteInterpolant:window.__THREE_CORE.DiscreteInterpolant,DodecahedronGeometry:window.__THREE_CORE.DodecahedronGeometry,DynamicCopyUsage:window.__THREE_CORE.DynamicCopyUsage,DynamicDrawUsage:window.__THREE_CORE.DynamicDrawUsage,DynamicReadUsage:window.__THREE_CORE.DynamicReadUsage,EdgesGeometry:window.__THREE_CORE.EdgesGeometry,EllipseCurve:window.__THREE_CORE.EllipseCurve,EqualStencilFunc:window.__THREE_CORE.EqualStencilFunc,ExtrudeGeometry:window.__THREE_CORE.ExtrudeGeometry,FileLoader:window.__THREE_CORE.FileLoader,Float16BufferAttribute:window.__THREE_CORE.Float16BufferAttribute,Fog:window.__THREE_CORE.Fog,FogExp2:window.__THREE_CORE.FogExp2,FramebufferTexture:window.__THREE_CORE.FramebufferTexture,FrustumArray:window.__THREE_CORE.FrustumArray,GLBufferAttribute:window.__THREE_CORE.GLBufferAttribute,GLSL1:window.__THREE_CORE.GLSL1,GreaterEqualStencilFunc:window.__THREE_CORE.GreaterEqualStencilFunc,GreaterStencilFunc:window.__THREE_CORE.GreaterStencilFunc,GridHelper:window.__THREE_CORE.GridHelper,Group:window.__THREE_CORE.Group,HemisphereLight:window.__THREE_CORE.HemisphereLight,HemisphereLightHelper:window.__THREE_CORE.HemisphereLightHelper,IcosahedronGeometry:window.__THREE_CORE.IcosahedronGeometry,ImageBitmapLoader:window.__THREE_CORE.ImageBitmapLoader,ImageLoader:window.__THREE_CORE.ImageLoader,ImageUtils:window.__THREE_CORE.ImageUtils,IncrementStencilOp:window.__THREE_CORE.IncrementStencilOp,IncrementWrapStencilOp:window.__THREE_CORE.IncrementWrapStencilOp,InstancedBufferAttribute:window.__THREE_CORE.InstancedBufferAttribute,InstancedBufferGeometry:window.__THREE_CORE.InstancedBufferGeometry,InstancedInterleavedBuffer:window.__THREE_CORE.InstancedInterleavedBuffer,InstancedMesh:window.__THREE_CORE.InstancedMesh,Int16BufferAttribute:window.__THREE_CORE.Int16BufferAttribute,Int32BufferAttribute:window.__THREE_CORE.Int32BufferAttribute,Int8BufferAttribute:window.__THREE_CORE.Int8BufferAttribute,InterleavedBuffer:window.__THREE_CORE.InterleavedBuffer,InterleavedBufferAttribute:window.__THREE_CORE.InterleavedBufferAttribute,Interpolant:window.__THREE_CORE.Interpolant,InterpolateDiscrete:window.__THREE_CORE.InterpolateDiscrete,InterpolateLinear:window.__THREE_CORE.InterpolateLinear,InterpolateSmooth:window.__THREE_CORE.InterpolateSmooth,InterpolationSamplingMode:window.__THREE_CORE.InterpolationSamplingMode,InterpolationSamplingType:window.__THREE_CORE.InterpolationSamplingType,InvertStencilOp:window.__THREE_CORE.InvertStencilOp,KeepStencilOp:window.__THREE_CORE.KeepStencilOp,KeyframeTrack:window.__THREE_CORE.KeyframeTrack,LOD:window.__THREE_CORE.LOD,LatheGeometry:window.__THREE_CORE.LatheGeometry,LessEqualStencilFunc:window.__THREE_CORE.LessEqualStencilFunc,LessStencilFunc:window.__THREE_CORE.LessStencilFunc,Light:window.__THREE_CORE.Light,LightProbe:window.__THREE_CORE.LightProbe,Line:window.__THREE_CORE.Line,Line3:window.__THREE_CORE.Line3,LineBasicMaterial:window.__THREE_CORE.LineBasicMaterial,LineCurve:window.__THREE_CORE.LineCurve,LineCurve3:window.__THREE_CORE.LineCurve3,LineDashedMaterial:window.__THREE_CORE.LineDashedMaterial,LineLoop:window.__THREE_CORE.LineLoop,LineSegments:window.__THREE_CORE.LineSegments,LinearInterpolant:window.__THREE_CORE.LinearInterpolant,LinearMipMapLinearFilter:window.__THREE_CORE.LinearMipMapLinearFilter,LinearMipMapNearestFilter:window.__THREE_CORE.LinearMipMapNearestFilter,Loader:window.__THREE_CORE.Loader,LoaderUtils:window.__THREE_CORE.LoaderUtils,LoadingManager:window.__THREE_CORE.LoadingManager,LoopOnce:window.__THREE_CORE.LoopOnce,LoopPingPong:window.__THREE_CORE.LoopPingPong,LoopRepeat:window.__THREE_CORE.LoopRepeat,MOUSE:window.__THREE_CORE.MOUSE,Material:window.__THREE_CORE.Material,MaterialLoader:window.__THREE_CORE.MaterialLoader,MathUtils:window.__THREE_CORE.MathUtils,Matrix2:window.__THREE_CORE.Matrix2,MeshLambertMaterial:window.__THREE_CORE.MeshLambertMaterial,MeshMatcapMaterial:window.__THREE_CORE.MeshMatcapMaterial,MeshNormalMaterial:window.__THREE_CORE.MeshNormalMaterial,MeshPhongMaterial:window.__THREE_CORE.MeshPhongMaterial,MeshPhysicalMaterial:window.__THREE_CORE.MeshPhysicalMaterial,MeshStandardMaterial:window.__THREE_CORE.MeshStandardMaterial,MeshToonMaterial:window.__THREE_CORE.MeshToonMaterial,NearestMipMapLinearFilter:window.__THREE_CORE.NearestMipMapLinearFilter,NearestMipMapNearestFilter:window.__THREE_CORE.NearestMipMapNearestFilter,NeverStencilFunc:window.__THREE_CORE.NeverStencilFunc,NoNormalPacking:window.__THREE_CORE.NoNormalPacking,NormalAnimationBlendMode:window.__THREE_CORE.NormalAnimationBlendMode,NormalGAPacking:window.__THREE_CORE.NormalGAPacking,NormalRGPacking:window.__THREE_CORE.NormalRGPacking,NotEqualStencilFunc:window.__THREE_CORE.NotEqualStencilFunc,NumberKeyframeTrack:window.__THREE_CORE.NumberKeyframeTrack,Object3D:window.__THREE_CORE.Object3D,ObjectLoader:window.__THREE_CORE.ObjectLoader,OctahedronGeometry:window.__THREE_CORE.OctahedronGeometry,Path:window.__THREE_CORE.Path,PlaneHelper:window.__THREE_CORE.PlaneHelper,PointLight:window.__THREE_CORE.PointLight,PointLightHelper:window.__THREE_CORE.PointLightHelper,Points:window.__THREE_CORE.Points,PointsMaterial:window.__THREE_CORE.PointsMaterial,PolarGridHelper:window.__THREE_CORE.PolarGridHelper,PolyhedronGeometry:window.__THREE_CORE.PolyhedronGeometry,PositionalAudio:window.__THREE_CORE.PositionalAudio,PropertyBinding:window.__THREE_CORE.PropertyBinding,PropertyMixer:window.__THREE_CORE.PropertyMixer,QuadraticBezierCurve:window.__THREE_CORE.QuadraticBezierCurve,QuadraticBezierCurve3:window.__THREE_CORE.QuadraticBezierCurve3,Quaternion:window.__THREE_CORE.Quaternion,QuaternionKeyframeTrack:window.__THREE_CORE.QuaternionKeyframeTrack,QuaternionLinearInterpolant:window.__THREE_CORE.QuaternionLinearInterpolant,RGBADepthPacking:window.__THREE_CORE.RGBADepthPacking,RGBDepthPacking:window.__THREE_CORE.RGBDepthPacking,RGBIntegerFormat:window.__THREE_CORE.RGBIntegerFormat,RGDepthPacking:window.__THREE_CORE.RGDepthPacking,Ray:window.__THREE_CORE.Ray,Raycaster:window.__THREE_CORE.Raycaster,RectAreaLight:window.__THREE_CORE.RectAreaLight,RenderTarget:window.__THREE_CORE.RenderTarget,RenderTarget3D:window.__THREE_CORE.RenderTarget3D,ReplaceStencilOp:window.__THREE_CORE.ReplaceStencilOp,RingGeometry:window.__THREE_CORE.RingGeometry,Scene:window.__THREE_CORE.Scene,ShadowMaterial:window.__THREE_CORE.ShadowMaterial,Shape:window.__THREE_CORE.Shape,ShapeGeometry:window.__THREE_CORE.ShapeGeometry,ShapePath:window.__THREE_CORE.ShapePath,ShapeUtils:window.__THREE_CORE.ShapeUtils,Skeleton:window.__THREE_CORE.Skeleton,SkeletonHelper:window.__THREE_CORE.SkeletonHelper,SkinnedMesh:window.__THREE_CORE.SkinnedMesh,Source:window.__THREE_CORE.Source,Sphere:window.__THREE_CORE.Sphere,SphereGeometry:window.__THREE_CORE.SphereGeometry,Spherical:window.__THREE_CORE.Spherical,SphericalHarmonics3:window.__THREE_CORE.SphericalHarmonics3,SplineCurve:window.__THREE_CORE.SplineCurve,SpotLight:window.__THREE_CORE.SpotLight,SpotLightHelper:window.__THREE_CORE.SpotLightHelper,Sprite:window.__THREE_CORE.Sprite,SpriteMaterial:window.__THREE_CORE.SpriteMaterial,StaticCopyUsage:window.__THREE_CORE.StaticCopyUsage,StaticDrawUsage:window.__THREE_CORE.StaticDrawUsage,StaticReadUsage:window.__THREE_CORE.StaticReadUsage,StereoCamera:window.__THREE_CORE.StereoCamera,StreamCopyUsage:window.__THREE_CORE.StreamCopyUsage,StreamDrawUsage:window.__THREE_CORE.StreamDrawUsage,StreamReadUsage:window.__THREE_CORE.StreamReadUsage,StringKeyframeTrack:window.__THREE_CORE.StringKeyframeTrack,TOUCH:window.__THREE_CORE.TOUCH,TetrahedronGeometry:window.__THREE_CORE.TetrahedronGeometry,TextureLoader:window.__THREE_CORE.TextureLoader,TextureUtils:window.__THREE_CORE.TextureUtils,Timer:window.__THREE_CORE.Timer,TimestampQuery:window.__THREE_CORE.TimestampQuery,TorusGeometry:window.__THREE_CORE.TorusGeometry,TorusKnotGeometry:window.__THREE_CORE.TorusKnotGeometry,Triangle:window.__THREE_CORE.Triangle,TriangleFanDrawMode:window.__THREE_CORE.TriangleFanDrawMode,TriangleStripDrawMode:window.__THREE_CORE.TriangleStripDrawMode,TrianglesDrawMode:window.__THREE_CORE.TrianglesDrawMode,TubeGeometry:window.__THREE_CORE.TubeGeometry,UVMapping:window.__THREE_CORE.UVMapping,Uint8BufferAttribute:window.__THREE_CORE.Uint8BufferAttribute,Uint8ClampedBufferAttribute:window.__THREE_CORE.Uint8ClampedBufferAttribute,Uniform:window.__THREE_CORE.Uniform,UniformsGroup:window.__THREE_CORE.UniformsGroup,VectorKeyframeTrack:window.__THREE_CORE.VectorKeyframeTrack,VideoFrameTexture:window.__THREE_CORE.VideoFrameTexture,VideoTexture:window.__THREE_CORE.VideoTexture,WebGL3DRenderTarget:window.__THREE_CORE.WebGL3DRenderTarget,WebGLArrayRenderTarget:window.__THREE_CORE.WebGLArrayRenderTarget,WebGPUCoordinateSystem:window.__THREE_CORE.WebGPUCoordinateSystem,WireframeGeometry:window.__THREE_CORE.WireframeGeometry,WrapAroundEnding:window.__THREE_CORE.WrapAroundEnding,ZeroCurvatureEnding:window.__THREE_CORE.ZeroCurvatureEnding,ZeroSlopeEnding:window.__THREE_CORE.ZeroSlopeEnding,ZeroStencilOp:window.__THREE_CORE.ZeroStencilOp,getConsoleFunction:window.__THREE_CORE.getConsoleFunction,setConsoleFunction:window.__THREE_CORE.setConsoleFunction});function On(){let e=null,t=!1,n=null,i=null;function r(t,a){n(t,a),i=e.requestAnimationFrame(r)}return{start:function(){!0!==t&&null!==n&&(i=e.requestAnimationFrame(r),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Bn(e){const t=new WeakMap;return{get:function(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)},remove:function(n){n.isInterleavedBufferAttribute&&(n=n.data);const i=t.get(n);i&&(e.deleteBuffer(i.buffer),t.delete(n))},update:function(n,i){if(n.isInterleavedBufferAttribute&&(n=n.data),n.isGLBufferAttribute){const e=t.get(n);return void((!e||e.version<n.version)&&t.set(n,{buffer:n.buffer,type:n.type,bytesPerElement:n.elementSize,version:n.version}))}const r=t.get(n);if(void 0===r)t.set(n,function(t,n){const i=t.array,r=t.usage,a=i.byteLength,o=e.createBuffer();let s;if(e.bindBuffer(n,o),e.bufferData(n,i,r),t.onUploadCallback(),i instanceof Float32Array)s=e.FLOAT;else if("undefined"!=typeof Float16Array&&i instanceof Float16Array)s=e.HALF_FLOAT;else if(i instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(i instanceof Int16Array)s=e.SHORT;else if(i instanceof Uint32Array)s=e.UNSIGNED_INT;else if(i instanceof Int32Array)s=e.INT;else if(i instanceof Int8Array)s=e.BYTE;else if(i instanceof Uint8Array)s=e.UNSIGNED_BYTE;else{if(!(i instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+i);s=e.UNSIGNED_BYTE}return{buffer:o,type:s,bytesPerElement:i.BYTES_PER_ELEMENT,version:t.version,size:a}}(n,i));else if(r.version<n.version){if(r.size!==n.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");!function(t,n,i){const r=n.array,a=n.updateRanges;if(e.bindBuffer(i,t),0===a.length)e.bufferSubData(i,0,r);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){const n=a[t],i=a[e];i.start<=n.start+n.count+1?n.count=Math.max(n.count,i.start+i.count-n.start):(++t,a[t]=i)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){const n=a[t];e.bufferSubData(i,n.start*r.BYTES_PER_ELEMENT,r,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}(r.buffer,n,i),r.version=n.version}}}}const Gn={alphahash_fragment:"#ifdef USE_ALPHAHASH\n\tif ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif",alphahash_pars_fragment:"#ifdef USE_ALPHAHASH\n\tconst float ALPHA_HASH_SCALE = 0.05;\n\tfloat hash2D( vec2 value ) {\n\t\treturn fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n\t}\n\tfloat hash3D( vec3 value ) {\n\t\treturn hash2D( vec2( hash2D( value.xy ), value.z ) );\n\t}\n\tfloat getAlphaHashThreshold( vec3 position ) {\n\t\tfloat maxDeriv = max(\n\t\t\tlength( dFdx( position.xyz ) ),\n\t\t\tlength( dFdy( position.xyz ) )\n\t\t);\n\t\tfloat pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n\t\tvec2 pixScales = vec2(\n\t\t\texp2( floor( log2( pixScale ) ) ),\n\t\t\texp2( ceil( log2( pixScale ) ) )\n\t\t);\n\t\tvec2 alpha = vec2(\n\t\t\thash3D( floor( pixScales.x * position.xyz ) ),\n\t\t\thash3D( floor( pixScales.y * position.xyz ) )\n\t\t);\n\t\tfloat lerpFactor = fract( log2( pixScale ) );\n\t\tfloat x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n\t\tfloat a = min( lerpFactor, 1.0 - lerpFactor );\n\t\tvec3 cases = vec3(\n\t\t\tx * x / ( 2.0 * a * ( 1.0 - a ) ),\n\t\t\t( x - 0.5 * a ) / ( 1.0 - a ),\n\t\t\t1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n\t\t);\n\t\tfloat threshold = ( x < ( 1.0 - a ) )\n\t\t\t? ( ( x < a ) ? cases.x : cases.y )\n\t\t\t: cases.z;\n\t\treturn clamp( threshold , 1.0e-6, 1.0 );\n\t}\n#endif",alphamap_fragment:"#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif",alphamap_pars_fragment:"#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",alphatest_fragment:"#ifdef USE_ALPHATEST\n\t#ifdef ALPHA_TO_COVERAGE\n\tdiffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );\n\tif ( diffuseColor.a == 0.0 ) discard;\n\t#else\n\tif ( diffuseColor.a < alphaTest ) discard;\n\t#endif\n#endif",alphatest_pars_fragment:"#ifdef USE_ALPHATEST\n\tuniform float alphaTest;\n#endif",aomap_fragment:"#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_CLEARCOAT ) \n\t\tclearcoatSpecularIndirect *= ambientOcclusion;\n\t#endif\n\t#if defined( USE_SHEEN ) \n\t\tsheenSpecularIndirect *= ambientOcclusion;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n\t#endif\n#endif",aomap_pars_fragment:"#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",batching_pars_vertex:"#ifdef USE_BATCHING\n\t#if ! defined( GL_ANGLE_multi_draw )\n\t#define gl_DrawID _gl_DrawID\n\tuniform int _gl_DrawID;\n\t#endif\n\tuniform highp sampler2D batchingTexture;\n\tuniform highp usampler2D batchingIdTexture;\n\tmat4 getBatchingMatrix( const in float i ) {\n\t\tint size = textureSize( batchingTexture, 0 ).x;\n\t\tint j = int( i ) * 4;\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\tvec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n\t\tvec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n\t\tvec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n\t\tvec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n\t\treturn mat4( v1, v2, v3, v4 );\n\t}\n\tfloat getIndirectIndex( const in int i ) {\n\t\tint size = textureSize( batchingIdTexture, 0 ).x;\n\t\tint x = i % size;\n\t\tint y = i / size;\n\t\treturn float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );\n\t}\n#endif\n#ifdef USE_BATCHING_COLOR\n\tuniform sampler2D batchingColorTexture;\n\tvec3 getBatchingColor( const in float i ) {\n\t\tint size = textureSize( batchingColorTexture, 0 ).x;\n\t\tint j = int( i );\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\treturn texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;\n\t}\n#endif",batching_vertex:"#ifdef USE_BATCHING\n\tmat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );\n#endif",begin_vertex:"vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n\tvPosition = vec3( position );\n#endif",beginnormal_vertex:"vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif",bsdfs:"float G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, 1.0, dotVH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n} // validated",iridescence_fragment:"#ifdef USE_IRIDESCENCE\n\tconst mat3 XYZ_TO_REC709 = mat3(\n\t\t 3.2404542, -0.9692660,  0.0556434,\n\t\t-1.5371385,  1.8760108, -0.2040259,\n\t\t-0.4985314,  0.0415560,  1.0572252\n\t);\n\tvec3 Fresnel0ToIor( vec3 fresnel0 ) {\n\t\tvec3 sqrtF0 = sqrt( fresnel0 );\n\t\treturn ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n\t}\n\tvec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n\t\treturn pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n\t}\n\tfloat IorToFresnel0( float transmittedIor, float incidentIor ) {\n\t\treturn pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n\t}\n\tvec3 evalSensitivity( float OPD, vec3 shift ) {\n\t\tfloat phase = 2.0 * PI * OPD * 1.0e-9;\n\t\tvec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n\t\tvec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n\t\tvec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n\t\tvec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n\t\txyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n\t\txyz /= 1.0685e-7;\n\t\tvec3 rgb = XYZ_TO_REC709 * xyz;\n\t\treturn rgb;\n\t}\n\tvec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n\t\tvec3 I;\n\t\tfloat iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n\t\tfloat sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n\t\tfloat cosTheta2Sq = 1.0 - sinTheta2Sq;\n\t\tif ( cosTheta2Sq < 0.0 ) {\n\t\t\treturn vec3( 1.0 );\n\t\t}\n\t\tfloat cosTheta2 = sqrt( cosTheta2Sq );\n\t\tfloat R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n\t\tfloat R12 = F_Schlick( R0, 1.0, cosTheta1 );\n\t\tfloat T121 = 1.0 - R12;\n\t\tfloat phi12 = 0.0;\n\t\tif ( iridescenceIOR < outsideIOR ) phi12 = PI;\n\t\tfloat phi21 = PI - phi12;\n\t\tvec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );\t\tvec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n\t\tvec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n\t\tvec3 phi23 = vec3( 0.0 );\n\t\tif ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n\t\tif ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n\t\tif ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n\t\tfloat OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n\t\tvec3 phi = vec3( phi21 ) + phi23;\n\t\tvec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n\t\tvec3 r123 = sqrt( R123 );\n\t\tvec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n\t\tvec3 C0 = R12 + Rs;\n\t\tI = C0;\n\t\tvec3 Cm = Rs - T121;\n\t\tfor ( int m = 1; m <= 2; ++ m ) {\n\t\t\tCm *= r123;\n\t\t\tvec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n\t\t\tI += Cm * Sm;\n\t\t}\n\t\treturn max( I, vec3( 0.0 ) );\n\t}\n#endif",bumpmap_pars_fragment:"#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vBumpMapUv );\n\t\tvec2 dSTdy = dFdy( vBumpMapUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\t\tvec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n\t\tvec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif",clipping_planes_fragment:"#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#ifdef ALPHA_TO_COVERAGE\n\t\tfloat distanceToPlane, distanceGradient;\n\t\tfloat clipOpacity = 1.0;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tdistanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n\t\t\tdistanceGradient = fwidth( distanceToPlane ) / 2.0;\n\t\t\tclipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n\t\t\tif ( clipOpacity == 0.0 ) discard;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\t\tfloat unionClipOpacity = 1.0;\n\t\t\t#pragma unroll_loop_start\n\t\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\t\tplane = clippingPlanes[ i ];\n\t\t\t\tdistanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n\t\t\t\tdistanceGradient = fwidth( distanceToPlane ) / 2.0;\n\t\t\t\tunionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n\t\t\t}\n\t\t\t#pragma unroll_loop_end\n\t\t\tclipOpacity *= 1.0 - unionClipOpacity;\n\t\t#endif\n\t\tdiffuseColor.a *= clipOpacity;\n\t\tif ( diffuseColor.a == 0.0 ) discard;\n\t#else\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\t\tbool clipped = true;\n\t\t\t#pragma unroll_loop_start\n\t\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\t\tplane = clippingPlanes[ i ];\n\t\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t\t}\n\t\t\t#pragma unroll_loop_end\n\t\t\tif ( clipped ) discard;\n\t\t#endif\n\t#endif\n#endif",clipping_planes_pars_fragment:"#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",clipping_planes_pars_vertex:"#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif",clipping_planes_vertex:"#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif",color_fragment:"#if defined( USE_COLOR_ALPHA )\n\tdiffuseColor *= vColor;\n#elif defined( USE_COLOR )\n\tdiffuseColor.rgb *= vColor;\n#endif",color_pars_fragment:"#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR )\n\tvarying vec3 vColor;\n#endif",color_pars_vertex:"#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n\tvarying vec3 vColor;\n#endif",color_vertex:"#if defined( USE_COLOR_ALPHA )\n\tvColor = vec4( 1.0 );\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n\tvColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n\tvColor *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.xyz *= instanceColor.xyz;\n#endif\n#ifdef USE_BATCHING_COLOR\n\tvec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );\n\tvColor.xyz *= batchingColor.xyz;\n#endif",common:"#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\n#ifdef USE_ALPHAHASH\n\tvarying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated",cube_uv_reflection_fragment:"#ifdef ENVMAP_TYPE_CUBE_UV\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_minTileSize 16.0\n\tfloat getFace( vec3 direction ) {\n\t\tvec3 absDirection = abs( direction );\n\t\tfloat face = - 1.0;\n\t\tif ( absDirection.x > absDirection.z ) {\n\t\t\tif ( absDirection.x > absDirection.y )\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t} else {\n\t\t\tif ( absDirection.z > absDirection.y )\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t}\n\t\treturn face;\n\t}\n\tvec2 getUV( vec3 direction, float face ) {\n\t\tvec2 uv;\n\t\tif ( face == 0.0 ) {\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 1.0 ) {\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n\t\t} else if ( face == 2.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z );\n\t\t} else if ( face == 3.0 ) {\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 4.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y );\n\t\t} else {\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z );\n\t\t}\n\t\treturn 0.5 * ( uv + 1.0 );\n\t}\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\t\tfloat face = getFace( direction );\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\t\tfloat faceSize = exp2( mipInt );\n\t\thighp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;\n\t\tif ( face > 2.0 ) {\n\t\t\tuv.y += faceSize;\n\t\t\tface -= 3.0;\n\t\t}\n\t\tuv.x += face * faceSize;\n\t\tuv.x += filterInt * 3.0 * cubeUV_minTileSize;\n\t\tuv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n\t\tuv.x *= CUBEUV_TEXEL_WIDTH;\n\t\tuv.y *= CUBEUV_TEXEL_HEIGHT;\n\t\t#ifdef texture2DGradEXT\n\t\t\treturn texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;\n\t\t#else\n\t\t\treturn texture2D( envMap, uv ).rgb;\n\t\t#endif\n\t}\n\t#define cubeUV_r0 1.0\n\t#define cubeUV_m0 - 2.0\n\t#define cubeUV_r1 0.8\n\t#define cubeUV_m1 - 1.0\n\t#define cubeUV_r4 0.4\n\t#define cubeUV_m4 2.0\n\t#define cubeUV_r5 0.305\n\t#define cubeUV_m5 3.0\n\t#define cubeUV_r6 0.21\n\t#define cubeUV_m6 4.0\n\tfloat roughnessToMip( float roughness ) {\n\t\tfloat mip = 0.0;\n\t\tif ( roughness >= cubeUV_r1 ) {\n\t\t\tmip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n\t\t} else if ( roughness >= cubeUV_r4 ) {\n\t\t\tmip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n\t\t} else if ( roughness >= cubeUV_r5 ) {\n\t\t\tmip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n\t\t} else if ( roughness >= cubeUV_r6 ) {\n\t\t\tmip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n\t\t} else {\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness );\t\t}\n\t\treturn mip;\n\t}\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\t\tfloat mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n\t\tfloat mipF = fract( mip );\n\t\tfloat mipInt = floor( mip );\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\t\tif ( mipF == 0.0 ) {\n\t\t\treturn vec4( color0, 1.0 );\n\t\t} else {\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\t\t}\n\t}\n#endif",defaultnormal_vertex:"vec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = objectTangent;\n#endif\n#ifdef USE_BATCHING\n\tmat3 bm = mat3( batchingMatrix );\n\ttransformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n\ttransformedNormal = bm * transformedNormal;\n\t#ifdef USE_TANGENT\n\t\ttransformedTangent = bm * transformedTangent;\n\t#endif\n#endif\n#ifdef USE_INSTANCING\n\tmat3 im = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n\ttransformedNormal = im * transformedNormal;\n\t#ifdef USE_TANGENT\n\t\ttransformedTangent = im * transformedTangent;\n\t#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\ttransformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif",displacementmap_pars_vertex:"#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif",displacementmap_vertex:"#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif",emissivemap_fragment:"#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n\t#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE\n\t\temissiveColor = sRGBTransferEOTF( emissiveColor );\n\t#endif\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif",emissivemap_pars_fragment:"#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif",colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:"vec4 LinearTransferOETF( in vec4 value ) {\n\treturn value;\n}\nvec4 sRGBTransferEOTF( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 sRGBTransferOETF( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}",envmap_fragment:"#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif",envmap_common_pars_fragment:"#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform mat3 envMapRotation;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n#endif",envmap_pars_fragment:"#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif",envmap_pars_vertex:"#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif",envmap_physical_pars_fragment:"#ifdef USE_ENVMAP\n\tvec3 getIBLIrradiance( const in vec3 normal ) {\n\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\t\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );\n\t\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n\tvec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\t\t\tvec3 reflectVec = reflect( - viewDir, normal );\n\t\t\treflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );\n\t\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );\n\t\t\treturn envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n\t#ifdef USE_ANISOTROPY\n\t\tvec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n\t\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\t\t\t\tvec3 bentNormal = cross( bitangent, viewDir );\n\t\t\t\tbentNormal = normalize( cross( bentNormal, bitangent ) );\n\t\t\t\tbentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n\t\t\t\treturn getIBLRadiance( viewDir, bentNormal, roughness );\n\t\t\t#else\n\t\t\t\treturn vec3( 0.0 );\n\t\t\t#endif\n\t\t}\n\t#endif\n#endif",envmap_vertex:"#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif",fog_vertex:"#ifdef USE_FOG\n\tvFogDepth = - mvPosition.z;\n#endif",fog_pars_vertex:"#ifdef USE_FOG\n\tvarying float vFogDepth;\n#endif",fog_fragment:"#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",fog_pars_fragment:"#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float vFogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",gradientmap_pars_fragment:"#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn vec3( texture2D( gradientMap, coord ).r );\n\t#else\n\t\tvec2 fw = fwidth( coord ) * 0.5;\n\t\treturn mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n\t#endif\n}",lightmap_pars_fragment:"#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",lights_lambert_fragment:"LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;",lights_lambert_pars_fragment:"varying vec3 vViewPosition;\nstruct LambertMaterial {\n\tvec3 diffuseColor;\n\tfloat specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Lambert\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Lambert",lights_pars_begin:"uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n#if defined( USE_LIGHT_PROBES )\n\tuniform vec3 lightProbe[ 9 ];\n#endif\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\treturn irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif ( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n\treturn smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n\t\tlight.color = directionalLight.color;\n\t\tlight.direction = directionalLight.direction;\n\t\tlight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n\t\tvec3 lVector = pointLight.position - geometryPosition;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tlight.color = pointLight.color;\n\t\tlight.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n\t\tvec3 lVector = spotLight.position - geometryPosition;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat angleCos = dot( light.direction, spotLight.direction );\n\t\tfloat spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\tif ( spotAttenuation > 0.0 ) {\n\t\t\tfloat lightDistance = length( lVector );\n\t\t\tlight.color = spotLight.color * spotAttenuation;\n\t\t\tlight.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t\t} else {\n\t\t\tlight.color = vec3( 0.0 );\n\t\t\tlight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n\t\tfloat dotNL = dot( normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\treturn irradiance;\n\t}\n#endif",lights_toon_fragment:"ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;",lights_toon_pars_fragment:"varying vec3 vViewPosition;\nstruct ToonMaterial {\n\tvec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon",lights_phong_fragment:"BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",lights_phong_pars_fragment:"varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong",lights_physical_fragment:"PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.metalness = metalnessFactor;\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n\tmaterial.ior = ior;\n\t#ifdef USE_SPECULAR\n\t\tfloat specularIntensityFactor = specularIntensity;\n\t\tvec3 specularColorFactor = specularColor;\n\t\t#ifdef USE_SPECULAR_COLORMAP\n\t\t\tspecularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n\t\t#endif\n\t\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\t\tspecularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n\t\t#endif\n\t\tmaterial.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n\t#else\n\t\tfloat specularIntensityFactor = 1.0;\n\t\tvec3 specularColorFactor = vec3( 1.0 );\n\t\tmaterial.specularF90 = 1.0;\n\t#endif\n\tmaterial.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;\n\tmaterial.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = vec3( 0.04 );\n\tmaterial.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n\tmaterial.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\tmaterial.clearcoatF0 = vec3( 0.04 );\n\tmaterial.clearcoatF90 = 1.0;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_DISPERSION\n\tmaterial.dispersion = dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n\tmaterial.iridescence = iridescence;\n\tmaterial.iridescenceIOR = iridescenceIOR;\n\t#ifdef USE_IRIDESCENCEMAP\n\t\tmaterial.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n\t#endif\n\t#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\t\tmaterial.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n\t#else\n\t\tmaterial.iridescenceThickness = iridescenceThicknessMaximum;\n\t#endif\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheenColor;\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tmaterial.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n\t#endif\n\tmaterial.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tmaterial.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n\t#endif\n#endif\n#ifdef USE_ANISOTROPY\n\t#ifdef USE_ANISOTROPYMAP\n\t\tmat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n\t\tvec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n\t\tvec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n\t#else\n\t\tvec2 anisotropyV = anisotropyVector;\n\t#endif\n\tmaterial.anisotropy = length( anisotropyV );\n\tif( material.anisotropy == 0.0 ) {\n\t\tanisotropyV = vec2( 1.0, 0.0 );\n\t} else {\n\t\tanisotropyV /= material.anisotropy;\n\t\tmaterial.anisotropy = saturate( material.anisotropy );\n\t}\n\tmaterial.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n\tmaterial.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n\tmaterial.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n#endif",lights_physical_pars_fragment:"uniform sampler2D dfgLUT;\nstruct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tvec3 diffuseContribution;\n\tvec3 specularColor;\n\tvec3 specularColorBlended;\n\tfloat roughness;\n\tfloat metalness;\n\tfloat specularF90;\n\tfloat dispersion;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat clearcoat;\n\t\tfloat clearcoatRoughness;\n\t\tvec3 clearcoatF0;\n\t\tfloat clearcoatF90;\n\t#endif\n\t#ifdef USE_IRIDESCENCE\n\t\tfloat iridescence;\n\t\tfloat iridescenceIOR;\n\t\tfloat iridescenceThickness;\n\t\tvec3 iridescenceFresnel;\n\t\tvec3 iridescenceF0;\n\t\tvec3 iridescenceFresnelDielectric;\n\t\tvec3 iridescenceFresnelMetallic;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tvec3 sheenColor;\n\t\tfloat sheenRoughness;\n\t#endif\n\t#ifdef IOR\n\t\tfloat ior;\n\t#endif\n\t#ifdef USE_TRANSMISSION\n\t\tfloat transmission;\n\t\tfloat transmissionAlpha;\n\t\tfloat thickness;\n\t\tfloat attenuationDistance;\n\t\tvec3 attenuationColor;\n\t#endif\n\t#ifdef USE_ANISOTROPY\n\t\tfloat anisotropy;\n\t\tfloat alphaT;\n\t\tvec3 anisotropyT;\n\t\tvec3 anisotropyB;\n\t#endif\n};\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n\tfloat V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n\t\tfloat gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n\t\tfloat gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n\t\tfloat v = 0.5 / ( gv + gl );\n\t\treturn v;\n\t}\n\tfloat D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n\t\tfloat a2 = alphaT * alphaB;\n\t\thighp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n\t\thighp float v2 = dot( v, v );\n\t\tfloat w2 = a2 / v2;\n\t\treturn RECIPROCAL_PI * a2 * pow2 ( w2 );\n\t}\n#endif\n#ifdef USE_CLEARCOAT\n\tvec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n\t\tvec3 f0 = material.clearcoatF0;\n\t\tfloat f90 = material.clearcoatF90;\n\t\tfloat roughness = material.clearcoatRoughness;\n\t\tfloat alpha = pow2( roughness );\n\t\tvec3 halfDir = normalize( lightDir + viewDir );\n\t\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\t\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\t\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\t\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\t\tvec3 F = F_Schlick( f0, f90, dotVH );\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\t\tfloat D = D_GGX( alpha, dotNH );\n\t\treturn F * ( V * D );\n\t}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n\tvec3 f0 = material.specularColorBlended;\n\tfloat f90 = material.specularF90;\n\tfloat roughness = material.roughness;\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( f0, f90, dotVH );\n\t#ifdef USE_IRIDESCENCE\n\t\tF = mix( F, material.iridescenceFresnel, material.iridescence );\n\t#endif\n\t#ifdef USE_ANISOTROPY\n\t\tfloat dotTL = dot( material.anisotropyT, lightDir );\n\t\tfloat dotTV = dot( material.anisotropyT, viewDir );\n\t\tfloat dotTH = dot( material.anisotropyT, halfDir );\n\t\tfloat dotBL = dot( material.anisotropyB, lightDir );\n\t\tfloat dotBV = dot( material.anisotropyB, viewDir );\n\t\tfloat dotBH = dot( material.anisotropyB, halfDir );\n\t\tfloat V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n\t\tfloat D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );\n\t#else\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\t\tfloat D = D_GGX( alpha, dotNH );\n\t#endif\n\treturn F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transpose( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n\tfloat alpha = pow2( roughness );\n\tfloat invAlpha = 1.0 / alpha;\n\tfloat cos2h = dotNH * dotNH;\n\tfloat sin2h = max( 1.0 - cos2h, 0.0078125 );\n\treturn ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n\treturn saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat D = D_Charlie( sheenRoughness, dotNH );\n\tfloat V = V_Neubelt( dotNV, dotNL );\n\treturn sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat r2 = roughness * roughness;\n\tfloat rInv = 1.0 / ( roughness + 0.1 );\n\tfloat a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;\n\tfloat b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;\n\tfloat DG = exp( a * dotNV + b );\n\treturn saturate( DG );\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tvec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;\n\treturn specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tvec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;\n\t#ifdef USE_IRIDESCENCE\n\t\tvec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n\t#else\n\t\tvec3 Fr = specularColor;\n\t#endif\n\tvec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n\tfloat Ess = fab.x + fab.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\nvec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n\tvec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tvec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;\n\tvec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;\n\tvec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;\n\tvec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;\n\tfloat Ess_V = dfgV.x + dfgV.y;\n\tfloat Ess_L = dfgL.x + dfgL.y;\n\tfloat Ems_V = 1.0 - Ess_V;\n\tfloat Ems_L = 1.0 - Ess_L;\n\tvec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;\n\tvec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );\n\tfloat compensationFactor = Ems_V * Ems_L;\n\tvec3 multiScatter = Fms * compensationFactor;\n\treturn singleScatter + multiScatter;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometryNormal;\n\t\tvec3 viewDir = geometryViewDir;\n\t\tvec3 position = geometryPosition;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.roughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColorBlended * t2.x + ( vec3( 1.0 ) - material.specularColorBlended ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = dotNLcc * directLight.color;\n\t\tclearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n\t#endif\n\t#ifdef USE_SHEEN\n \n \t\tsheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n \n \t\tfloat sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n \t\tfloat sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );\n \n \t\tfloat sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );\n \n \t\tirradiance *= sheenEnergyComp;\n \n \t#endif\n\treflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );\n\t#ifdef USE_SHEEN\n\t\tfloat sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n\t\tfloat sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n\t\tdiffuse *= sheenEnergyComp;\n\t#endif\n\treflectedLight.indirectDiffuse += diffuse;\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tsheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;\n \t#endif\n\tvec3 singleScatteringDielectric = vec3( 0.0 );\n\tvec3 multiScatteringDielectric = vec3( 0.0 );\n\tvec3 singleScatteringMetallic = vec3( 0.0 );\n\tvec3 multiScatteringMetallic = vec3( 0.0 );\n\t#ifdef USE_IRIDESCENCE\n\t\tcomputeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );\n\t\tcomputeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );\n\t#else\n\t\tcomputeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );\n\t\tcomputeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );\n\t#endif\n\tvec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );\n\tvec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );\n\tvec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;\n\tvec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\tvec3 indirectSpecular = radiance * singleScattering;\n\tindirectSpecular += multiScattering * cosineWeightedIrradiance;\n\tvec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;\n\t#ifdef USE_SHEEN\n\t\tfloat sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n\t\tfloat sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n\t\tindirectSpecular *= sheenEnergyComp;\n\t\tindirectDiffuse *= sheenEnergyComp;\n\t#endif\n\treflectedLight.indirectSpecular += indirectSpecular;\n\treflectedLight.indirectDiffuse += indirectDiffuse;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",lights_fragment_begin:"\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n#ifdef USE_CLEARCOAT\n\tgeometryClearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n\tfloat dotNVi = saturate( dot( normal, geometryViewDir ) );\n\tif ( material.iridescenceThickness == 0.0 ) {\n\t\tmaterial.iridescence = 0.0;\n\t} else {\n\t\tmaterial.iridescence = saturate( material.iridescence );\n\t}\n\tif ( material.iridescence > 0.0 ) {\n\t\tmaterial.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n\t\tmaterial.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );\n\t\tmaterial.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );\n\t\tmaterial.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n\t}\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointLightInfo( pointLight, geometryPosition, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\tvec4 spotColor;\n\tvec3 spotLightCoord;\n\tbool inSpotLightMap;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotLightInfo( spotLight, geometryPosition, directLight );\n\t\t#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n\t\t#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n\t\t#else\n\t\t#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#endif\n\t\t#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n\t\t\tspotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n\t\t\tinSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n\t\t\tspotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n\t\t\tdirectLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n\t\t#endif\n\t\t#undef SPOT_LIGHT_MAP_INDEX\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalLightInfo( directionalLight, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#if defined( USE_LIGHT_PROBES )\n\t\tirradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n\t#endif\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif",lights_fragment_maps:"#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getIBLIrradiance( geometryNormal );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\t#ifdef USE_ANISOTROPY\n\t\tradiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n\t#else\n\t\tradiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n\t#endif\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n\t#endif\n#endif",lights_fragment_end:"#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif",logdepthbuf_fragment:"#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n\tgl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",logdepthbuf_pars_fragment:"#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif",logdepthbuf_pars_vertex:"#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif",logdepthbuf_vertex:"#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n\tvFragDepth = 1.0 + gl_Position.w;\n\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n#endif",map_fragment:"#ifdef USE_MAP\n\tvec4 sampledDiffuseColor = texture2D( map, vMapUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\tsampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );\n\t#endif\n\tdiffuseColor *= sampledDiffuseColor;\n#endif",map_pars_fragment:"#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif",map_particle_fragment:"#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\t#if defined( USE_POINTS_UV )\n\t\tvec2 uv = vUv;\n\t#else\n\t\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\t#endif\n#endif\n#ifdef USE_MAP\n\tdiffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",map_particle_pars_fragment:"#if defined( USE_POINTS_UV )\n\tvarying vec2 vUv;\n#else\n\t#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\t\tuniform mat3 uvTransform;\n\t#endif\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",metalnessmap_fragment:"float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif",metalnessmap_pars_fragment:"#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",morphinstance_vertex:"#ifdef USE_INSTANCING_MORPH\n\tfloat morphTargetInfluences[ MORPHTARGETS_COUNT ];\n\tfloat morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\tmorphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;\n\t}\n#endif",morphcolor_vertex:"#if defined( USE_MORPHCOLORS )\n\tvColor *= morphTargetBaseInfluence;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t#if defined( USE_COLOR_ALPHA )\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n\t\t#elif defined( USE_COLOR )\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n\t\t#endif\n\t}\n#endif",morphnormal_vertex:"#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\tif ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n\t}\n#endif",morphtarget_pars_vertex:"#ifdef USE_MORPHTARGETS\n\t#ifndef USE_INSTANCING_MORPH\n\t\tuniform float morphTargetBaseInfluence;\n\t\tuniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n\t#endif\n\tuniform sampler2DArray morphTargetsTexture;\n\tuniform ivec2 morphTargetsTextureSize;\n\tvec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n\t\tint texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n\t\tint y = texelIndex / morphTargetsTextureSize.x;\n\t\tint x = texelIndex - y * morphTargetsTextureSize.x;\n\t\tivec3 morphUV = ivec3( x, y, morphTargetIndex );\n\t\treturn texelFetch( morphTargetsTexture, morphUV, 0 );\n\t}\n#endif",morphtarget_vertex:"#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\tif ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n\t}\n#endif",normal_fragment_begin:"float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n\tvec3 fdx = dFdx( vViewPosition );\n\tvec3 fdy = dFdy( vViewPosition );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal *= faceDirection;\n\t#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n\t#ifdef USE_TANGENT\n\t\tmat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\t#else\n\t\tmat3 tbn = getTangentFrame( - vViewPosition, normal,\n\t\t#if defined( USE_NORMALMAP )\n\t\t\tvNormalMapUv\n\t\t#elif defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tvClearcoatNormalMapUv\n\t\t#else\n\t\t\tvUv\n\t\t#endif\n\t\t);\n\t#endif\n\t#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\t\ttbn[0] *= faceDirection;\n\t\ttbn[1] *= faceDirection;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\t#ifdef USE_TANGENT\n\t\tmat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\t#else\n\t\tmat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n\t#endif\n\t#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\t\ttbn2[0] *= faceDirection;\n\t\ttbn2[1] *= faceDirection;\n\t#endif\n#endif\nvec3 nonPerturbedNormal = normal;",normal_fragment_maps:"#ifdef USE_NORMALMAP_OBJECTSPACE\n\tnormal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n\tvec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\tnormal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif",normal_pars_fragment:"#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif",normal_pars_vertex:"#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif",normal_vertex:"#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif",normalmap_pars_fragment:"#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n\tmat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( uv.st );\n\t\tvec2 st1 = dFdy( uv.st );\n\t\tvec3 N = surf_norm;\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n\t\treturn mat3( T * scale, B * scale, N );\n\t}\n#endif",clearcoat_normal_fragment_begin:"#ifdef USE_CLEARCOAT\n\tvec3 clearcoatNormal = nonPerturbedNormal;\n#endif",clearcoat_normal_fragment_maps:"#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\tclearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif",clearcoat_pars_fragment:"#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif",iridescence_pars_fragment:"#ifdef USE_IRIDESCENCEMAP\n\tuniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tuniform sampler2D iridescenceThicknessMap;\n#endif",opaque_fragment:"#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );",packing:"vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;\nconst float Inv255 = 1. / 255.;\nconst vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );\nconst vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );\nconst vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );\nconst vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );\nvec4 packDepthToRGBA( const in float v ) {\n\tif( v <= 0.0 )\n\t\treturn vec4( 0., 0., 0., 0. );\n\tif( v >= 1.0 )\n\t\treturn vec4( 1., 1., 1., 1. );\n\tfloat vuf;\n\tfloat af = modf( v * PackFactors.a, vuf );\n\tfloat bf = modf( vuf * ShiftRight8, vuf );\n\tfloat gf = modf( vuf * ShiftRight8, vuf );\n\treturn vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );\n}\nvec3 packDepthToRGB( const in float v ) {\n\tif( v <= 0.0 )\n\t\treturn vec3( 0., 0., 0. );\n\tif( v >= 1.0 )\n\t\treturn vec3( 1., 1., 1. );\n\tfloat vuf;\n\tfloat bf = modf( v * PackFactors.b, vuf );\n\tfloat gf = modf( vuf * ShiftRight8, vuf );\n\treturn vec3( vuf * Inv255, gf * PackUpscale, bf );\n}\nvec2 packDepthToRG( const in float v ) {\n\tif( v <= 0.0 )\n\t\treturn vec2( 0., 0. );\n\tif( v >= 1.0 )\n\t\treturn vec2( 1., 1. );\n\tfloat vuf;\n\tfloat gf = modf( v * 256., vuf );\n\treturn vec2( vuf * Inv255, gf );\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors4 );\n}\nfloat unpackRGBToDepth( const in vec3 v ) {\n\treturn dot( v, UnpackFactors3 );\n}\nfloat unpackRGToDepth( const in vec2 v ) {\n\treturn v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;\n}\nvec4 pack2HalfToRGBA( const in vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( const in vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\treturn depth * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * depth - far );\n}",premultiplied_alpha_fragment:"#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif",project_vertex:"vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_BATCHING\n\tmvPosition = batchingMatrix * mvPosition;\n#endif\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",dithering_fragment:"#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",dithering_pars_fragment:"#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif",roughnessmap_fragment:"float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n\troughnessFactor *= texelRoughness.g;\n#endif",roughnessmap_pars_fragment:"#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",shadowmap_pars_fragment:"#if NUM_SPOT_LIGHT_COORDS > 0\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n\tuniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tuniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\t#else\n\t\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\t#endif\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tuniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\t#else\n\t\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\t#endif\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tuniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\t#elif defined( SHADOWMAP_TYPE_BASIC )\n\t\t\tuniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\t#endif\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\tfloat interleavedGradientNoise( vec2 position ) {\n\t\t\treturn fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );\n\t\t}\n\t\tvec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {\n\t\t\tconst float goldenAngle = 2.399963229728653;\n\t\t\tfloat r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );\n\t\t\tfloat theta = float( sampleIndex ) * goldenAngle + phi;\n\t\t\treturn vec2( cos( theta ), sin( theta ) ) * r;\n\t\t}\n\t#endif\n\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\tfloat getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\t\tfloat shadow = 1.0;\n\t\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\t\tshadowCoord.z += shadowBias;\n\t\t\tbool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n\t\t\tbool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n\t\t\tif ( frustumTest ) {\n\t\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\t\tfloat radius = shadowRadius * texelSize.x;\n\t\t\t\tfloat phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;\n\t\t\t\tshadow = (\n\t\t\t\t\ttexture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +\n\t\t\t\t\ttexture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +\n\t\t\t\t\ttexture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +\n\t\t\t\t\ttexture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +\n\t\t\t\t\ttexture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )\n\t\t\t\t) * 0.2;\n\t\t\t}\n\t\t\treturn mix( 1.0, shadow, shadowIntensity );\n\t\t}\n\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\t\tfloat shadow = 1.0;\n\t\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\t\tshadowCoord.z += shadowBias;\n\t\t\tbool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n\t\t\tbool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n\t\t\tif ( frustumTest ) {\n\t\t\t\tvec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;\n\t\t\t\tfloat mean = distribution.x;\n\t\t\t\tfloat variance = distribution.y * distribution.y;\n\t\t\t\t#ifdef USE_REVERSED_DEPTH_BUFFER\n\t\t\t\t\tfloat hard_shadow = step( mean, shadowCoord.z );\n\t\t\t\t#else\n\t\t\t\t\tfloat hard_shadow = step( shadowCoord.z, mean );\n\t\t\t\t#endif\n\t\t\t\tif ( hard_shadow == 1.0 ) {\n\t\t\t\t\tshadow = 1.0;\n\t\t\t\t} else {\n\t\t\t\t\tvariance = max( variance, 0.0000001 );\n\t\t\t\t\tfloat d = shadowCoord.z - mean;\n\t\t\t\t\tfloat p_max = variance / ( variance + d * d );\n\t\t\t\t\tp_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );\n\t\t\t\t\tshadow = max( hard_shadow, p_max );\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn mix( 1.0, shadow, shadowIntensity );\n\t\t}\n\t#else\n\t\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\t\tfloat shadow = 1.0;\n\t\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\t\tshadowCoord.z += shadowBias;\n\t\t\tbool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n\t\t\tbool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n\t\t\tif ( frustumTest ) {\n\t\t\t\tfloat depth = texture2D( shadowMap, shadowCoord.xy ).r;\n\t\t\t\t#ifdef USE_REVERSED_DEPTH_BUFFER\n\t\t\t\t\tshadow = step( depth, shadowCoord.z );\n\t\t\t\t#else\n\t\t\t\t\tshadow = step( shadowCoord.z, depth );\n\t\t\t\t#endif\n\t\t\t}\n\t\t\treturn mix( 1.0, shadow, shadowIntensity );\n\t\t}\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t#if defined( SHADOWMAP_TYPE_PCF )\n\tfloat getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tfloat shadow = 1.0;\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\tvec3 absVec = abs( lightToPosition );\n\t\tfloat viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n\t\tif ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n\t\t\tfloat dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n\t\t\tdp += shadowBias;\n\t\t\tfloat texelSize = shadowRadius / shadowMapSize.x;\n\t\t\tvec3 absDir = abs( bd3D );\n\t\t\tvec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );\n\t\t\ttangent = normalize( cross( bd3D, tangent ) );\n\t\t\tvec3 bitangent = cross( bd3D, tangent );\n\t\t\tfloat phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;\n\t\t\tshadow = (\n\t\t\t\ttexture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 0, 5, phi ).x + bitangent * vogelDiskSample( 0, 5, phi ).y ) * texelSize, dp ) ) +\n\t\t\t\ttexture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 1, 5, phi ).x + bitangent * vogelDiskSample( 1, 5, phi ).y ) * texelSize, dp ) ) +\n\t\t\t\ttexture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 2, 5, phi ).x + bitangent * vogelDiskSample( 2, 5, phi ).y ) * texelSize, dp ) ) +\n\t\t\t\ttexture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 3, 5, phi ).x + bitangent * vogelDiskSample( 3, 5, phi ).y ) * texelSize, dp ) ) +\n\t\t\t\ttexture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 4, 5, phi ).x + bitangent * vogelDiskSample( 4, 5, phi ).y ) * texelSize, dp ) )\n\t\t\t) * 0.2;\n\t\t}\n\t\treturn mix( 1.0, shadow, shadowIntensity );\n\t}\n\t#elif defined( SHADOWMAP_TYPE_BASIC )\n\tfloat getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tfloat shadow = 1.0;\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\tvec3 absVec = abs( lightToPosition );\n\t\tfloat viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n\t\tif ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n\t\t\tfloat dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n\t\t\tdp += shadowBias;\n\t\t\tfloat depth = textureCube( shadowMap, bd3D ).r;\n\t\t\t#ifdef USE_REVERSED_DEPTH_BUFFER\n\t\t\t\tshadow = step( depth, dp );\n\t\t\t#else\n\t\t\t\tshadow = step( dp, depth );\n\t\t\t#endif\n\t\t}\n\t\treturn mix( 1.0, shadow, shadowIntensity );\n\t}\n\t#endif\n\t#endif\n#endif",shadowmap_pars_vertex:"#if NUM_SPOT_LIGHT_COORDS > 0\n\tuniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif",shadowmap_vertex:"#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\tvec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition;\n\t\t#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t\tshadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n\t\t#endif\n\t\tvSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n#endif",shadowmask_pars_fragment:"float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}",skinbase_vertex:"#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",skinning_pars_vertex:"#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\tuniform highp sampler2D boneTexture;\n\tmat4 getBoneMatrix( const in float i ) {\n\t\tint size = textureSize( boneTexture, 0 ).x;\n\t\tint j = int( i ) * 4;\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\tvec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n\t\tvec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n\t\tvec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n\t\tvec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n\t\treturn mat4( v1, v2, v3, v4 );\n\t}\n#endif",skinning_vertex:"#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",skinnormal_vertex:"#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif",specularmap_fragment:"float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",specularmap_pars_fragment:"#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",tonemapping_fragment:"#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",tonemapping_pars_fragment:"#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 CineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(  1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,  1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,  1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nconst mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(\n\tvec3( 1.6605, - 0.1246, - 0.0182 ),\n\tvec3( - 0.5876, 1.1329, - 0.1006 ),\n\tvec3( - 0.0728, - 0.0083, 1.1187 )\n);\nconst mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(\n\tvec3( 0.6274, 0.0691, 0.0164 ),\n\tvec3( 0.3293, 0.9195, 0.0880 ),\n\tvec3( 0.0433, 0.0113, 0.8956 )\n);\nvec3 agxDefaultContrastApprox( vec3 x ) {\n\tvec3 x2 = x * x;\n\tvec3 x4 = x2 * x2;\n\treturn + 15.5 * x4 * x2\n\t\t- 40.14 * x4 * x\n\t\t+ 31.96 * x4\n\t\t- 6.868 * x2 * x\n\t\t+ 0.4298 * x2\n\t\t+ 0.1191 * x\n\t\t- 0.00232;\n}\nvec3 AgXToneMapping( vec3 color ) {\n\tconst mat3 AgXInsetMatrix = mat3(\n\t\tvec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),\n\t\tvec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),\n\t\tvec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )\n\t);\n\tconst mat3 AgXOutsetMatrix = mat3(\n\t\tvec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),\n\t\tvec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),\n\t\tvec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )\n\t);\n\tconst float AgxMinEv = - 12.47393;\tconst float AgxMaxEv = 4.026069;\n\tcolor *= toneMappingExposure;\n\tcolor = LINEAR_SRGB_TO_LINEAR_REC2020 * color;\n\tcolor = AgXInsetMatrix * color;\n\tcolor = max( color, 1e-10 );\tcolor = log2( color );\n\tcolor = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );\n\tcolor = clamp( color, 0.0, 1.0 );\n\tcolor = agxDefaultContrastApprox( color );\n\tcolor = AgXOutsetMatrix * color;\n\tcolor = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );\n\tcolor = LINEAR_REC2020_TO_LINEAR_SRGB * color;\n\tcolor = clamp( color, 0.0, 1.0 );\n\treturn color;\n}\nvec3 NeutralToneMapping( vec3 color ) {\n\tconst float StartCompression = 0.8 - 0.04;\n\tconst float Desaturation = 0.15;\n\tcolor *= toneMappingExposure;\n\tfloat x = min( color.r, min( color.g, color.b ) );\n\tfloat offset = x < 0.08 ? x - 6.25 * x * x : 0.04;\n\tcolor -= offset;\n\tfloat peak = max( color.r, max( color.g, color.b ) );\n\tif ( peak < StartCompression ) return color;\n\tfloat d = 1. - StartCompression;\n\tfloat newPeak = 1. - d * d / ( peak + d - StartCompression );\n\tcolor *= newPeak / peak;\n\tfloat g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );\n\treturn mix( color, vec3( newPeak ), g );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",transmission_fragment:"#ifdef USE_TRANSMISSION\n\tmaterial.transmission = transmission;\n\tmaterial.transmissionAlpha = 1.0;\n\tmaterial.thickness = thickness;\n\tmaterial.attenuationDistance = attenuationDistance;\n\tmaterial.attenuationColor = attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tmaterial.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tmaterial.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n\t#endif\n\tvec3 pos = vWorldPosition;\n\tvec3 v = normalize( cameraPosition - pos );\n\tvec3 n = inverseTransformDirection( normal, viewMatrix );\n\tvec4 transmitted = getIBLVolumeRefraction(\n\t\tn, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,\n\t\tpos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,\n\t\tmaterial.attenuationColor, material.attenuationDistance );\n\tmaterial.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n\ttotalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif",transmission_pars_fragment:"#ifdef USE_TRANSMISSION\n\tuniform float transmission;\n\tuniform float thickness;\n\tuniform float attenuationDistance;\n\tuniform vec3 attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tuniform sampler2D transmissionMap;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tuniform sampler2D thicknessMap;\n\t#endif\n\tuniform vec2 transmissionSamplerSize;\n\tuniform sampler2D transmissionSamplerMap;\n\tuniform mat4 modelMatrix;\n\tuniform mat4 projectionMatrix;\n\tvarying vec3 vWorldPosition;\n\tfloat w0( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n\t}\n\tfloat w1( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n\t}\n\tfloat w2( float a ){\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n\t}\n\tfloat w3( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a * a * a );\n\t}\n\tfloat g0( float a ) {\n\t\treturn w0( a ) + w1( a );\n\t}\n\tfloat g1( float a ) {\n\t\treturn w2( a ) + w3( a );\n\t}\n\tfloat h0( float a ) {\n\t\treturn - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n\t}\n\tfloat h1( float a ) {\n\t\treturn 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n\t}\n\tvec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n\t\tuv = uv * texelSize.zw + 0.5;\n\t\tvec2 iuv = floor( uv );\n\t\tvec2 fuv = fract( uv );\n\t\tfloat g0x = g0( fuv.x );\n\t\tfloat g1x = g1( fuv.x );\n\t\tfloat h0x = h0( fuv.x );\n\t\tfloat h1x = h1( fuv.x );\n\t\tfloat h0y = h0( fuv.y );\n\t\tfloat h1y = h1( fuv.y );\n\t\tvec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\t\treturn g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n\t\t\tg1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n\t}\n\tvec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n\t\tvec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n\t\tvec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n\t\tvec2 fLodSizeInv = 1.0 / fLodSize;\n\t\tvec2 cLodSizeInv = 1.0 / cLodSize;\n\t\tvec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n\t\tvec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n\t\treturn mix( fSample, cSample, fract( lod ) );\n\t}\n\tvec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n\t\tvec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n\t\tvec3 modelScale;\n\t\tmodelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n\t\tmodelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n\t\tmodelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n\t\treturn normalize( refractionVector ) * thickness * modelScale;\n\t}\n\tfloat applyIorToRoughness( const in float roughness, const in float ior ) {\n\t\treturn roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n\t}\n\tvec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n\t\tfloat lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n\t\treturn textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n\t}\n\tvec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tif ( isinf( attenuationDistance ) ) {\n\t\t\treturn vec3( 1.0 );\n\t\t} else {\n\t\t\tvec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n\t\t\tvec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );\t\t\treturn transmittance;\n\t\t}\n\t}\n\tvec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n\t\tconst in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n\t\tconst in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,\n\t\tconst in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tvec4 transmittedLight;\n\t\tvec3 transmittance;\n\t\t#ifdef USE_DISPERSION\n\t\t\tfloat halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;\n\t\t\tvec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );\n\t\t\tfor ( int i = 0; i < 3; i ++ ) {\n\t\t\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );\n\t\t\t\tvec3 refractedRayExit = position + transmissionRay;\n\t\t\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\t\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\t\t\trefractionCoords += 1.0;\n\t\t\t\trefractionCoords /= 2.0;\n\t\t\t\tvec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );\n\t\t\t\ttransmittedLight[ i ] = transmissionSample[ i ];\n\t\t\t\ttransmittedLight.a += transmissionSample.a;\n\t\t\t\ttransmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];\n\t\t\t}\n\t\t\ttransmittedLight.a /= 3.0;\n\t\t#else\n\t\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n\t\t\tvec3 refractedRayExit = position + transmissionRay;\n\t\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\t\trefractionCoords += 1.0;\n\t\t\trefractionCoords /= 2.0;\n\t\t\ttransmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n\t\t\ttransmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n\t\t#endif\n\t\tvec3 attenuatedColor = transmittance * transmittedLight.rgb;\n\t\tvec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n\t\tfloat transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n\t\treturn vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n\t}\n#endif",uv_pars_fragment:"#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\n\tvarying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n\tvarying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n\tvarying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n\tvarying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n\tvarying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n\tvarying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tvarying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n\tvarying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tvarying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n\tvarying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tvarying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tvarying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tvarying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tvarying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tvarying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tvarying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tvarying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n\tvarying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tvarying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tvarying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n#endif",uv_pars_vertex:"#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\n\tuniform mat3 mapTransform;\n\tvarying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform mat3 alphaMapTransform;\n\tvarying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n\tuniform mat3 lightMapTransform;\n\tvarying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n\tuniform mat3 aoMapTransform;\n\tvarying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n\tuniform mat3 bumpMapTransform;\n\tvarying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n\tuniform mat3 normalMapTransform;\n\tvarying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\tuniform mat3 displacementMapTransform;\n\tvarying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tuniform mat3 emissiveMapTransform;\n\tvarying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n\tuniform mat3 metalnessMapTransform;\n\tvarying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tuniform mat3 roughnessMapTransform;\n\tvarying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n\tuniform mat3 anisotropyMapTransform;\n\tvarying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tuniform mat3 clearcoatMapTransform;\n\tvarying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform mat3 clearcoatNormalMapTransform;\n\tvarying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform mat3 clearcoatRoughnessMapTransform;\n\tvarying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tuniform mat3 sheenColorMapTransform;\n\tvarying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tuniform mat3 sheenRoughnessMapTransform;\n\tvarying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tuniform mat3 iridescenceMapTransform;\n\tvarying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tuniform mat3 iridescenceThicknessMapTransform;\n\tvarying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n\tuniform mat3 specularMapTransform;\n\tvarying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tuniform mat3 specularColorMapTransform;\n\tvarying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tuniform mat3 specularIntensityMapTransform;\n\tvarying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n#endif",uv_vertex:"#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\tvUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n\tvMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n\tvAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n\tvLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n\tvAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n\tvBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n\tvNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\tvDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tvEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n\tvMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tvRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n\tvAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tvClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tvClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tvClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tvIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tvIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tvSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tvSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n\tvSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tvSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tvSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tvTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n\tvThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif",worldpos_vertex:"#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_BATCHING\n\t\tworldPosition = batchingMatrix * worldPosition;\n\t#endif\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif",background_vert:"varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}",background_frag:"uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\ttexColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n\t#endif\n\ttexColor.rgb *= backgroundIntensity;\n\tgl_FragColor = texColor;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",backgroundCube_vert:"varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",backgroundCube_frag:"#ifdef ENVMAP_TYPE_CUBE\n\tuniform samplerCube envMap;\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n\tuniform sampler2D envMap;\n#endif\nuniform float flipEnvMap;\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nuniform mat3 backgroundRotation;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );\n\t#else\n\t\tvec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t#endif\n\ttexColor.rgb *= backgroundIntensity;\n\tgl_FragColor = texColor;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",cube_vert:"varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",cube_frag:"uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n\tvec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n\tgl_FragColor = texColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",depth_vert:"#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <skinbase_vertex>\n\t#include <morphinstance_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}",depth_frag:"#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <clipping_planes_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <logdepthbuf_fragment>\n\t#ifdef USE_REVERSED_DEPTH_BUFFER\n\t\tfloat fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];\n\t#else\n\t\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;\n\t#endif\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#elif DEPTH_PACKING == 3202\n\t\tgl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );\n\t#elif DEPTH_PACKING == 3203\n\t\tgl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );\n\t#endif\n}",distance_vert:"#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <skinbase_vertex>\n\t#include <morphinstance_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}",distance_frag:"#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <clipping_planes_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );\n}",equirect_vert:"varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}",equirect_frag:"uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV = equirectUv( direction );\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",linedashed_vert:"uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",linedashed_frag:"uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",meshbasic_vert:"#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinbase_vertex>\n\t\t#include <skinnormal_vertex>\n\t\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}",meshbasic_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\treflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshlambert_vert:"#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",meshlambert_frag:"#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_lambert_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshmatcap_vert:"#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}",meshmatcap_frag:"#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t#else\n\t\tvec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshnormal_vert:"#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvarying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}",meshnormal_frag:"#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvarying vec3 vViewPosition;\n#endif\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );\n\t#ifdef OPAQUE\n\t\tgl_FragColor.a = 1.0;\n\t#endif\n}",meshphong_vert:"#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",meshphong_frag:"#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshphysical_vert:"#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n\tvarying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n\tvWorldPosition = worldPosition.xyz;\n#endif\n}",meshphysical_frag:"#define STANDARD\n#ifdef PHYSICAL\n\t#define IOR\n\t#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n\tuniform float ior;\n#endif\n#ifdef USE_SPECULAR\n\tuniform float specularIntensity;\n\tuniform vec3 specularColor;\n\t#ifdef USE_SPECULAR_COLORMAP\n\t\tuniform sampler2D specularColorMap;\n\t#endif\n\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\tuniform sampler2D specularIntensityMap;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_DISPERSION\n\tuniform float dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n\tuniform float iridescence;\n\tuniform float iridescenceIOR;\n\tuniform float iridescenceThicknessMinimum;\n\tuniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheenColor;\n\tuniform float sheenRoughness;\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tuniform sampler2D sheenColorMap;\n\t#endif\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tuniform sampler2D sheenRoughnessMap;\n\t#endif\n#endif\n#ifdef USE_ANISOTROPY\n\tuniform vec2 anisotropyVector;\n\t#ifdef USE_ANISOTROPYMAP\n\t\tuniform sampler2D anisotropyMap;\n\t#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\tvec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n\t#include <transmission_fragment>\n\tvec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n\t#ifdef USE_SHEEN\n \n\t\toutgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;\n \n \t#endif\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n\t\tvec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n\t\toutgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n\t#endif\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",meshtoon_vert:"#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",meshtoon_frag:"#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",points_vert:"uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\nvoid main() {\n\t#ifdef USE_POINTS_UV\n\t\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\t#endif\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}",points_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",shadow_vert:"#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",shadow_frag:"uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n}",sprite_vert:"uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix[ 3 ];\n\tvec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",sprite_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n}"},Hn={common:{diffuse:{value:new n(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new e},alphaMap:{value:null},alphaMapTransform:{value:new e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new e}},envmap:{envMap:{value:null},envMapRotation:{value:new e},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new e},normalScale:{value:new t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new n(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new n(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new e},alphaTest:{value:0},uvTransform:{value:new e}},sprite:{diffuse:{value:new n(16777215)},opacity:{value:1},center:{value:new t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new e},alphaMap:{value:null},alphaMapTransform:{value:new e},alphaTest:{value:0}}},Vn={basic:{uniforms:i([Hn.common,Hn.specularmap,Hn.envmap,Hn.aomap,Hn.lightmap,Hn.fog]),vertexShader:Gn.meshbasic_vert,fragmentShader:Gn.meshbasic_frag},lambert:{uniforms:i([Hn.common,Hn.specularmap,Hn.envmap,Hn.aomap,Hn.lightmap,Hn.emissivemap,Hn.bumpmap,Hn.normalmap,Hn.displacementmap,Hn.fog,Hn.lights,{emissive:{value:new n(0)}}]),vertexShader:Gn.meshlambert_vert,fragmentShader:Gn.meshlambert_frag},phong:{uniforms:i([Hn.common,Hn.specularmap,Hn.envmap,Hn.aomap,Hn.lightmap,Hn.emissivemap,Hn.bumpmap,Hn.normalmap,Hn.displacementmap,Hn.fog,Hn.lights,{emissive:{value:new n(0)},specular:{value:new n(1118481)},shininess:{value:30}}]),vertexShader:Gn.meshphong_vert,fragmentShader:Gn.meshphong_frag},standard:{uniforms:i([Hn.common,Hn.envmap,Hn.aomap,Hn.lightmap,Hn.emissivemap,Hn.bumpmap,Hn.normalmap,Hn.displacementmap,Hn.roughnessmap,Hn.metalnessmap,Hn.fog,Hn.lights,{emissive:{value:new n(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gn.meshphysical_vert,fragmentShader:Gn.meshphysical_frag},toon:{uniforms:i([Hn.common,Hn.aomap,Hn.lightmap,Hn.emissivemap,Hn.bumpmap,Hn.normalmap,Hn.displacementmap,Hn.gradientmap,Hn.fog,Hn.lights,{emissive:{value:new n(0)}}]),vertexShader:Gn.meshtoon_vert,fragmentShader:Gn.meshtoon_frag},matcap:{uniforms:i([Hn.common,Hn.bumpmap,Hn.normalmap,Hn.displacementmap,Hn.fog,{matcap:{value:null}}]),vertexShader:Gn.meshmatcap_vert,fragmentShader:Gn.meshmatcap_frag},points:{uniforms:i([Hn.points,Hn.fog]),vertexShader:Gn.points_vert,fragmentShader:Gn.points_frag},dashed:{uniforms:i([Hn.common,Hn.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gn.linedashed_vert,fragmentShader:Gn.linedashed_frag},depth:{uniforms:i([Hn.common,Hn.displacementmap]),vertexShader:Gn.depth_vert,fragmentShader:Gn.depth_frag},normal:{uniforms:i([Hn.common,Hn.bumpmap,Hn.normalmap,Hn.displacementmap,{opacity:{value:1}}]),vertexShader:Gn.meshnormal_vert,fragmentShader:Gn.meshnormal_frag},sprite:{uniforms:i([Hn.sprite,Hn.fog]),vertexShader:Gn.sprite_vert,fragmentShader:Gn.sprite_frag},background:{uniforms:{uvTransform:{value:new e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gn.background_vert,fragmentShader:Gn.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new e}},vertexShader:Gn.backgroundCube_vert,fragmentShader:Gn.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gn.cube_vert,fragmentShader:Gn.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gn.equirect_vert,fragmentShader:Gn.equirect_frag},distance:{uniforms:i([Hn.common,Hn.displacementmap,{referencePosition:{value:new r},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gn.distance_vert,fragmentShader:Gn.distance_frag},shadow:{uniforms:i([Hn.lights,Hn.fog,{color:{value:new n(0)},opacity:{value:1}}]),vertexShader:Gn.shadow_vert,fragmentShader:Gn.shadow_frag}};Vn.physical={uniforms:i([Vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new e},clearcoatNormalScale:{value:new t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new e},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new e},sheen:{value:0},sheenColor:{value:new n(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new e},transmissionSamplerSize:{value:new t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new e},attenuationDistance:{value:0},attenuationColor:{value:new n(0)},specularColor:{value:new n(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new e},anisotropyVector:{value:new t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new e}}]),vertexShader:Gn.meshphysical_vert,fragmentShader:Gn.meshphysical_frag};const Wn={r:0,b:0,g:0},kn=new u,zn=new f;function Xn(e,t,i,r,u,f,v){const E=new n(0);let S,T,M=!0===f?0:1,x=null,A=0,R=null;function b(e){let n=!0===e.isScene?e.background:null;if(n&&n.isTexture){n=(e.backgroundBlurriness>0?i:t).get(n)}return n}function C(t,n){t.getRGB(Wn,g(e)),r.buffers.color.setClear(Wn.r,Wn.g,Wn.b,n,v)}return{getClearColor:function(){return E},setClearColor:function(e,t=1){E.set(e),M=t,C(E,M)},getClearAlpha:function(){return M},setClearAlpha:function(e){M=e,C(E,M)},render:function(t){let n=!1;const i=b(t);null===i?C(E,M):i&&i.isColor&&(C(i,1),n=!0);const a=e.xr.getEnvironmentBlendMode();"additive"===a?r.buffers.color.setClear(0,0,0,1,v):"alpha-blend"===a&&r.buffers.color.setClear(0,0,0,0,v),(e.autoClear||n)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))},addToRenderList:function(t,n){const i=b(n);i&&(i.isCubeTexture||i.mapping===a)?(void 0===T&&(T=new o(new s(1,1,1),new l({name:"BackgroundCubeMaterial",uniforms:d(Vn.backgroundCube.uniforms),vertexShader:Vn.backgroundCube.vertexShader,fragmentShader:Vn.backgroundCube.fragmentShader,side:c,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),T.geometry.deleteAttribute("normal"),T.geometry.deleteAttribute("uv"),T.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(T.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),u.update(T)),kn.copy(n.backgroundRotation),kn.x*=-1,kn.y*=-1,kn.z*=-1,i.isCubeTexture&&!1===i.isRenderTargetTexture&&(kn.y*=-1,kn.z*=-1),T.material.uniforms.envMap.value=i,T.material.uniforms.flipEnvMap.value=i.isCubeTexture&&!1===i.isRenderTargetTexture?-1:1,T.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,T.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,T.material.uniforms.backgroundRotation.value.setFromMatrix4(zn.makeRotationFromEuler(kn)),T.material.toneMapped=p.getTransfer(i.colorSpace)!==m,x===i&&A===i.version&&R===e.toneMapping||(T.material.needsUpdate=!0,x=i,A=i.version,R=e.toneMapping),T.layers.enableAll(),t.unshift(T,T.geometry,T.material,0,0,null)):i&&i.isTexture&&(void 0===S&&(S=new o(new h(2,2),new l({name:"BackgroundMaterial",uniforms:d(Vn.background.uniforms),vertexShader:Vn.background.vertexShader,fragmentShader:Vn.background.fragmentShader,side:_,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),S.geometry.deleteAttribute("normal"),Object.defineProperty(S.material,"map",{get:function(){return this.uniforms.t2D.value}}),u.update(S)),S.material.uniforms.t2D.value=i,S.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,S.material.toneMapped=p.getTransfer(i.colorSpace)!==m,!0===i.matrixAutoUpdate&&i.updateMatrix(),S.material.uniforms.uvTransform.value.copy(i.matrix),x===i&&A===i.version&&R===e.toneMapping||(S.material.needsUpdate=!0,x=i,A=i.version,R=e.toneMapping),S.layers.enableAll(),t.unshift(S,S.geometry,S.material,0,0,null))},dispose:function(){void 0!==T&&(T.geometry.dispose(),T.material.dispose(),T=void 0),void 0!==S&&(S.geometry.dispose(),S.material.dispose(),S=void 0)}}}function Yn(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},r=c(null);let a=r,o=!1;function s(t){return e.bindVertexArray(t)}function l(t){return e.deleteVertexArray(t)}function c(e){const t=[],i=[],r=[];for(let e=0;e<n;e++)t[e]=0,i[e]=0,r[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:i,attributeDivisors:r,object:e,attributes:{},index:null}}function d(){const e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function u(e){f(e,0)}function f(t,n){const i=a.newAttributes,r=a.enabledAttributes,o=a.attributeDivisors;i[t]=1,0===r[t]&&(e.enableVertexAttribArray(t),r[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function p(){const t=a.newAttributes,n=a.enabledAttributes;for(let i=0,r=n.length;i<r;i++)n[i]!==t[i]&&(e.disableVertexAttribArray(i),n[i]=0)}function m(t,n,i,r,a,o,s){!0===s?e.vertexAttribIPointer(t,n,i,a,o):e.vertexAttribPointer(t,n,i,r,a,o)}function h(){_(),o=!0,a!==r&&(a=r,s(a.object))}function _(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(n,r,l,h,_){let g=!1;const E=function(t,n,r){const a=!0===r.wireframe;let o=i[t.id];void 0===o&&(o={},i[t.id]=o);let s=o[n.id];void 0===s&&(s={},o[n.id]=s);let l=s[a];void 0===l&&(l=c(e.createVertexArray()),s[a]=l);return l}(h,l,r);a!==E&&(a=E,s(a.object)),g=function(e,t,n,i){const r=a.attributes,o=t.attributes;let s=0;const l=n.getAttributes();for(const t in l){if(l[t].location>=0){const n=r[t];let i=o[t];if(void 0===i&&("instanceMatrix"===t&&e.instanceMatrix&&(i=e.instanceMatrix),"instanceColor"===t&&e.instanceColor&&(i=e.instanceColor)),void 0===n)return!0;if(n.attribute!==i)return!0;if(i&&n.data!==i.data)return!0;s++}}return a.attributesNum!==s||a.index!==i}(n,h,l,_),g&&function(e,t,n,i){const r={},o=t.attributes;let s=0;const l=n.getAttributes();for(const t in l){if(l[t].location>=0){let n=o[t];void 0===n&&("instanceMatrix"===t&&e.instanceMatrix&&(n=e.instanceMatrix),"instanceColor"===t&&e.instanceColor&&(n=e.instanceColor));const i={};i.attribute=n,n&&n.data&&(i.data=n.data),r[t]=i,s++}}a.attributes=r,a.attributesNum=s,a.index=i}(n,h,l,_),null!==_&&t.update(_,e.ELEMENT_ARRAY_BUFFER),(g||o)&&(o=!1,function(n,i,r,a){d();const o=a.attributes,s=r.getAttributes(),l=i.defaultAttributeValues;for(const i in s){const r=s[i];if(r.location>=0){let s=o[i];if(void 0===s&&("instanceMatrix"===i&&n.instanceMatrix&&(s=n.instanceMatrix),"instanceColor"===i&&n.instanceColor&&(s=n.instanceColor)),void 0!==s){const i=s.normalized,o=s.itemSize,l=t.get(s);if(void 0===l)continue;const c=l.buffer,d=l.type,p=l.bytesPerElement,h=d===e.INT||d===e.UNSIGNED_INT||s.gpuType===v;if(s.isInterleavedBufferAttribute){const t=s.data,l=t.stride,_=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<r.locationSize;e++)f(r.location+e,t.meshPerAttribute);!0!==n.isInstancedMesh&&void 0===a._maxInstanceCount&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<r.locationSize;e++)u(r.location+e);e.bindBuffer(e.ARRAY_BUFFER,c);for(let e=0;e<r.locationSize;e++)m(r.location+e,o/r.locationSize,d,i,l*p,(_+o/r.locationSize*e)*p,h)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<r.locationSize;e++)f(r.location+e,s.meshPerAttribute);!0!==n.isInstancedMesh&&void 0===a._maxInstanceCount&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<r.locationSize;e++)u(r.location+e);e.bindBuffer(e.ARRAY_BUFFER,c);for(let e=0;e<r.locationSize;e++)m(r.location+e,o/r.locationSize,d,i,o*p,o/r.locationSize*e*p,h)}}else if(void 0!==l){const t=l[i];if(void 0!==t)switch(t.length){case 2:e.vertexAttrib2fv(r.location,t);break;case 3:e.vertexAttrib3fv(r.location,t);break;case 4:e.vertexAttrib4fv(r.location,t);break;default:e.vertexAttrib1fv(r.location,t)}}}}p()}(n,r,l,h),null!==_&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(_).buffer))},reset:h,resetDefaultState:_,dispose:function(){h();for(const e in i){const t=i[e];for(const e in t){const n=t[e];for(const e in n)l(n[e].object),delete n[e];delete t[e]}delete i[e]}},releaseStatesOfGeometry:function(e){if(void 0===i[e.id])return;const t=i[e.id];for(const e in t){const n=t[e];for(const e in n)l(n[e].object),delete n[e];delete t[e]}delete i[e.id]},releaseStatesOfProgram:function(e){for(const t in i){const n=i[t];if(void 0===n[e.id])continue;const r=n[e.id];for(const e in r)l(r[e].object),delete r[e];delete n[e.id]}},initAttributes:d,enableAttribute:u,disableUnusedAttributes:p}}function Kn(e,t,n){let i;function r(t,r,a){0!==a&&(e.drawArraysInstanced(i,t,r,a),n.update(r,i,a))}this.setMode=function(e){i=e},this.render=function(t,r){e.drawArrays(i,t,r),n.update(r,i,1)},this.renderInstances=r,this.renderMultiDraw=function(e,r,a){if(0===a)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,e,0,r,0,a);let o=0;for(let e=0;e<a;e++)o+=r[e];n.update(o,i,1)},this.renderMultiDrawInstances=function(e,a,o,s){if(0===o)return;const l=t.get("WEBGL_multi_draw");if(null===l)for(let t=0;t<e.length;t++)r(e[t],a[t],s[t]);else{l.multiDrawArraysInstancedWEBGL(i,e,0,a,0,s,0,o);let t=0;for(let e=0;e<o;e++)t+=a[e]*s[e];n.update(t,i,1)}}}function qn(e,t,n,i){let r;function a(t){if("highp"===t){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";t="mediump"}return"mediump"===t&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=void 0!==n.precision?n.precision:"highp";const s=a(o);s!==o&&(E("WebGLRenderer:",o,"not supported, using",s,"instead."),o=s);return{isWebGL2:!0,getMaxAnisotropy:function(){if(void 0!==r)return r;if(!0===t.has("EXT_texture_filter_anisotropic")){const n=t.get("EXT_texture_filter_anisotropic");r=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:a,textureFormatReadable:function(t){return t===x||i.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(n){const r=n===S&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(n!==T&&i.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==M&&!r)},precision:o,logarithmicDepthBuffer:!0===n.logarithmicDepthBuffer,reversedDepthBuffer:!0===n.reversedDepthBuffer&&t.has("EXT_clip_control"),maxTextures:e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),maxVertexTextures:e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureSize:e.getParameter(e.MAX_TEXTURE_SIZE),maxCubemapSize:e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:e.getParameter(e.MAX_VERTEX_ATTRIBS),maxVertexUniforms:e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:e.getParameter(e.MAX_VARYING_VECTORS),maxFragmentUniforms:e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),maxSamples:e.getParameter(e.MAX_SAMPLES),samples:e.getParameter(e.SAMPLES)}}function jn(t){const n=this;let i=null,r=0,a=!1,o=!1;const s=new A,l=new e,c={value:null,needsUpdate:!1};function d(e,t,i,r){const a=null!==e?e.length:0;let o=null;if(0!==a){if(o=c.value,!0!==r||null===o){const n=i+4*a,r=t.matrixWorldInverse;l.getNormalMatrix(r),(null===o||o.length<n)&&(o=new Float32Array(n));for(let t=0,n=i;t!==a;++t,n+=4)s.copy(e[t]).applyMatrix4(r,l),s.normal.toArray(o,n),o[n+3]=s.constant}c.value=o,c.needsUpdate=!0}return n.numPlanes=a,n.numIntersection=0,o}this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){const n=0!==e.length||t||0!==r||a;return a=t,r=e.length,n},this.beginShadows=function(){o=!0,d(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(e,t){i=d(e,t,0)},this.setState=function(e,s,l){const u=e.clippingPlanes,f=e.clipIntersection,p=e.clipShadows,m=t.get(e);if(!a||null===u||0===u.length||o&&!p)o?d(null):function(){c.value!==i&&(c.value=i,c.needsUpdate=r>0);n.numPlanes=r,n.numIntersection=0}();else{const e=o?0:r,t=4*e;let n=m.clippingState||null;c.value=n,n=d(u,s,t,l);for(let e=0;e!==t;++e)n[e]=i[e];m.clippingState=n,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}}}function Zn(e){let t=new WeakMap;function n(e,t){return t===R?e.mapping=P:t===b&&(e.mapping=L),e}function i(e){const n=e.target;n.removeEventListener("dispose",i);const r=t.get(n);void 0!==r&&(t.delete(n),r.dispose())}return{get:function(r){if(r&&r.isTexture){const a=r.mapping;if(a===R||a===b){if(t.has(r)){return n(t.get(r).texture,r.mapping)}{const a=r.image;if(a&&a.height>0){const o=new C(a.height);return o.fromEquirectangularTexture(e,r),t.set(r,o),r.addEventListener("dispose",i),n(o.texture,r.mapping)}return null}}}return r},dispose:function(){t=new WeakMap}}}const $n=[.125,.215,.35,.446,.526,.582],Qn=20,Jn=new D,ei=new n;let ti=null,ni=0,ii=0,ri=!1;const ai=new r;class oi{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){const{size:a=256,position:o=ai}=r;ti=this._renderer.getRenderTarget(),ni=this._renderer.getActiveCubeFace(),ii=this._renderer.getActiveMipmapLevel(),ri=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){null===this._cubemapMaterial&&(this._cubemapMaterial=di(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){null===this._equirectMaterial&&(this._equirectMaterial=ci(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),null!==this._cubemapMaterial&&this._cubemapMaterial.dispose(),null!==this._equirectMaterial&&this._equirectMaterial.dispose(),null!==this._backgroundBox&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){null!==this._blurMaterial&&this._blurMaterial.dispose(),null!==this._ggxMaterial&&this._ggxMaterial.dispose(),null!==this._pingPongRenderTarget&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ti,ni,ii),this._renderer.xr.enabled=ri,e.scissorTest=!1,li(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===P||e.mapping===L?this._setSize(0===e.image.length?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ti=this._renderer.getRenderTarget(),ni=this._renderer.getActiveCubeFace(),ii=this._renderer.getActiveMipmapLevel(),ri=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:H,minFilter:H,generateMipmaps:!1,type:S,format:x,colorSpace:G,depthBuffer:!1},i=si(e,t,n);if(null===this._pingPongRenderTarget||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){null!==this._pingPongRenderTarget&&this._dispose(),this._pingPongRenderTarget=si(e,t,n);const{_lodMax:i}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=function(e){const t=[],n=[],i=[];let r=e;const a=e-4+1+$n.length;for(let s=0;s<a;s++){const a=Math.pow(2,r);t.push(a);let l=1/a;s>e-4?l=$n[s-e+4-1]:0===s&&(l=0),n.push(l);const c=1/(a-2),d=-c,u=1+c,f=[d,d,u,d,u,u,d,d,u,u,d,u],p=6,m=6,h=3,_=2,g=1,v=new Float32Array(h*m*p),E=new Float32Array(_*m*p),S=new Float32Array(g*m*p);for(let e=0;e<p;e++){const t=e%3*2/3-1,n=e>2?0:-1,i=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];v.set(i,h*m*e),E.set(f,_*m*e);const r=[e,e,e,e,e,e];S.set(r,g*m*e)}const T=new U;T.setAttribute("position",new B(v,h)),T.setAttribute("uv",new B(E,_)),T.setAttribute("faceIndex",new B(S,g)),i.push(new o(T,null)),r>4&&r--}return{lodMeshes:i,sizeLods:t,sigmas:n}}(i)),this._blurMaterial=function(e,t,n){const i=new Float32Array(Qn),a=new r(0,1,0),o=new l({name:"SphericalGaussianBlur",defines:{n:Qn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:ui(),fragmentShader:"\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\t\t\tuniform int samples;\n\t\t\tuniform float weights[ n ];\n\t\t\tuniform bool latitudinal;\n\t\t\tuniform float dTheta;\n\t\t\tuniform float mipInt;\n\t\t\tuniform vec3 poleAxis;\n\n\t\t\t#define ENVMAP_TYPE_CUBE_UV\n\t\t\t#include <cube_uv_reflection_fragment>\n\n\t\t\tvec3 getSample( float theta, vec3 axis ) {\n\n\t\t\t\tfloat cosTheta = cos( theta );\n\t\t\t\t// Rodrigues' axis-angle rotation\n\t\t\t\tvec3 sampleDirection = vOutputDirection * cosTheta\n\t\t\t\t\t+ cross( axis, vOutputDirection ) * sin( theta )\n\t\t\t\t\t+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );\n\n\t\t\t\treturn bilinearCubeUV( envMap, sampleDirection, mipInt );\n\n\t\t\t}\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );\n\n\t\t\t\tif ( all( equal( axis, vec3( 0.0 ) ) ) ) {\n\n\t\t\t\t\taxis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );\n\n\t\t\t\t}\n\n\t\t\t\taxis = normalize( axis );\n\n\t\t\t\tgl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t\t\t\tgl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );\n\n\t\t\t\tfor ( int i = 1; i < n; i++ ) {\n\n\t\t\t\t\tif ( i >= samples ) {\n\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t}\n\n\t\t\t\t\tfloat theta = dTheta * float( i );\n\t\t\t\t\tgl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );\n\t\t\t\t\tgl_FragColor.rgb += weights[ i ] * getSample( theta, axis );\n\n\t\t\t\t}\n\n\t\t\t}\n\t\t",blending:F,depthTest:!1,depthWrite:!1});return o}(i,e,t),this._ggxMaterial=function(e,t,n){const i=new l({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:256,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ui(),fragmentShader:'\n\n\t\t\tprecision highp float;\n\t\t\tprecision highp int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\t\t\tuniform float roughness;\n\t\t\tuniform float mipInt;\n\n\t\t\t#define ENVMAP_TYPE_CUBE_UV\n\t\t\t#include <cube_uv_reflection_fragment>\n\n\t\t\t#define PI 3.14159265359\n\n\t\t\t// Van der Corput radical inverse\n\t\t\tfloat radicalInverse_VdC(uint bits) {\n\t\t\t\tbits = (bits << 16u) | (bits >> 16u);\n\t\t\t\tbits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);\n\t\t\t\tbits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);\n\t\t\t\tbits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);\n\t\t\t\tbits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);\n\t\t\t\treturn float(bits) * 2.3283064365386963e-10; // / 0x100000000\n\t\t\t}\n\n\t\t\t// Hammersley sequence\n\t\t\tvec2 hammersley(uint i, uint N) {\n\t\t\t\treturn vec2(float(i) / float(N), radicalInverse_VdC(i));\n\t\t\t}\n\n\t\t\t// GGX VNDF importance sampling (Eric Heitz 2018)\n\t\t\t// "Sampling the GGX Distribution of Visible Normals"\n\t\t\t// https://jcgt.org/published/0007/04/01/\n\t\t\tvec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {\n\t\t\t\tfloat alpha = roughness * roughness;\n\n\t\t\t\t// Section 3.2: Transform view direction to hemisphere configuration\n\t\t\t\tvec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));\n\n\t\t\t\t// Section 4.1: Orthonormal basis\n\t\t\t\tfloat lensq = Vh.x * Vh.x + Vh.y * Vh.y;\n\t\t\t\tvec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);\n\t\t\t\tvec3 T2 = cross(Vh, T1);\n\n\t\t\t\t// Section 4.2: Parameterization of projected area\n\t\t\t\tfloat r = sqrt(Xi.x);\n\t\t\t\tfloat phi = 2.0 * PI * Xi.y;\n\t\t\t\tfloat t1 = r * cos(phi);\n\t\t\t\tfloat t2 = r * sin(phi);\n\t\t\t\tfloat s = 0.5 * (1.0 + Vh.z);\n\t\t\t\tt2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;\n\n\t\t\t\t// Section 4.3: Reprojection onto hemisphere\n\t\t\t\tvec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;\n\n\t\t\t\t// Section 3.4: Transform back to ellipsoid configuration\n\t\t\t\treturn normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));\n\t\t\t}\n\n\t\t\tvoid main() {\n\t\t\t\tvec3 N = normalize(vOutputDirection);\n\t\t\t\tvec3 V = N; // Assume view direction equals normal for pre-filtering\n\n\t\t\t\tvec3 prefilteredColor = vec3(0.0);\n\t\t\t\tfloat totalWeight = 0.0;\n\n\t\t\t\t// For very low roughness, just sample the environment directly\n\t\t\t\tif (roughness < 0.001) {\n\t\t\t\t\tgl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\t// Tangent space basis for VNDF sampling\n\t\t\t\tvec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);\n\t\t\t\tvec3 tangent = normalize(cross(up, N));\n\t\t\t\tvec3 bitangent = cross(N, tangent);\n\n\t\t\t\tfor(uint i = 0u; i < uint(GGX_SAMPLES); i++) {\n\t\t\t\t\tvec2 Xi = hammersley(i, uint(GGX_SAMPLES));\n\n\t\t\t\t\t// For PMREM, V = N, so in tangent space V is always (0, 0, 1)\n\t\t\t\t\tvec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);\n\n\t\t\t\t\t// Transform H back to world space\n\t\t\t\t\tvec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);\n\t\t\t\t\tvec3 L = normalize(2.0 * dot(V, H) * H - V);\n\n\t\t\t\t\tfloat NdotL = max(dot(N, L), 0.0);\n\n\t\t\t\t\tif(NdotL > 0.0) {\n\t\t\t\t\t\t// Sample environment at fixed mip level\n\t\t\t\t\t\t// VNDF importance sampling handles the distribution filtering\n\t\t\t\t\t\tvec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);\n\n\t\t\t\t\t\t// Weight by NdotL for the split-sum approximation\n\t\t\t\t\t\t// VNDF PDF naturally accounts for the visible microfacet distribution\n\t\t\t\t\t\tprefilteredColor += sampleColor * NdotL;\n\t\t\t\t\t\ttotalWeight += NdotL;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tif (totalWeight > 0.0) {\n\t\t\t\t\tprefilteredColor = prefilteredColor / totalWeight;\n\t\t\t\t}\n\n\t\t\t\tgl_FragColor = vec4(prefilteredColor, 1.0);\n\t\t\t}\n\t\t',blending:F,depthTest:!1,depthWrite:!1});return i}(i,e,t)}return i}_compileMaterial(e){const t=new o(new U,e);this._renderer.compile(t,Jn)}_sceneToCubeUV(e,t,n,i,r){const a=new w(90,1,t,n),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,p=u.toneMapping;u.getClearColor(ei),u.toneMapping=I,u.autoClear=!1;u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),null===this._backgroundBox&&(this._backgroundBox=new o(new s,new N({name:"PMREM.Background",side:c,depthWrite:!1,depthTest:!1})));const m=this._backgroundBox,h=m.material;let _=!1;const g=e.background;g?g.isColor&&(h.color.copy(g),e.background=null,_=!0):(h.color.copy(ei),_=!0);for(let t=0;t<6;t++){const n=t%3;0===n?(a.up.set(0,l[t],0),a.position.set(r.x,r.y,r.z),a.lookAt(r.x+d[t],r.y,r.z)):1===n?(a.up.set(0,0,l[t]),a.position.set(r.x,r.y,r.z),a.lookAt(r.x,r.y+d[t],r.z)):(a.up.set(0,l[t],0),a.position.set(r.x,r.y,r.z),a.lookAt(r.x,r.y,r.z+d[t]));const o=this._cubeSize;li(i,n*o,t>2?o:0,o,o),u.setRenderTarget(i),_&&u.render(m,a),u.render(e,a)}u.toneMapping=p,u.autoClear=f,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===P||e.mapping===L;i?(null===this._cubemapMaterial&&(this._cubemapMaterial=di()),this._cubemapMaterial.uniforms.flipEnvMap.value=!1===e.isRenderTargetTexture?-1:1):null===this._equirectMaterial&&(this._equirectMaterial=ci());const r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;r.uniforms.envMap.value=e;const o=this._cubeSize;li(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Jn)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let t=1;t<i;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const s=a.uniforms,l=n/(this._lodMeshes.length-1),c=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-c*c)*(0+1.25*l),{_lodMax:u}=this,f=this._sizeLods[n],p=3*f*(n>u-4?n-u+4:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=d,s.mipInt.value=u-t,li(r,p,m,3*f,2*f),i.setRenderTarget(r),i.render(o,Jn),s.envMap.value=r.texture,s.roughness.value=0,s.mipInt.value=u-n,li(e,p,m,3*f,2*f),i.setRenderTarget(e),i.render(o,Jn)}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const s=this._renderer,l=this._blurMaterial;"latitudinal"!==a&&"longitudinal"!==a&&y("blur direction must be either latitudinal or longitudinal!");const c=this._lodMeshes[i];c.material=l;const d=l.uniforms,u=this._sizeLods[n]-1,f=isFinite(r)?Math.PI/(2*u):2*Math.PI/39,p=r/f,m=isFinite(r)?1+Math.floor(3*p):Qn;m>Qn&&E(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to 20`);const h=[];let _=0;for(let e=0;e<Qn;++e){const t=e/p,n=Math.exp(-t*t/2);h.push(n),0===e?_+=n:e<m&&(_+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/_;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=h,d.latitudinal.value="latitudinal"===a,o&&(d.poleAxis.value=o);const{_lodMax:g}=this;d.dTheta.value=f,d.mipInt.value=g-n;const v=this._sizeLods[i];li(t,3*v*(i>g-4?i-g+4:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(c,Jn)}}function si(e,t,n){const i=new O(e,t,n);return i.texture.mapping=a,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function li(e,t,n,i,r){e.viewport.set(t,n,i,r),e.scissor.set(t,n,i,r)}function ci(){return new l({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ui(),fragmentShader:"\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\n\t\t\t#include <common>\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec3 outputDirection = normalize( vOutputDirection );\n\t\t\t\tvec2 uv = equirectUv( outputDirection );\n\n\t\t\t\tgl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );\n\n\t\t\t}\n\t\t",blending:F,depthTest:!1,depthWrite:!1})}function di(){return new l({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ui(),fragmentShader:"\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tuniform float flipEnvMap;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform samplerCube envMap;\n\n\t\t\tvoid main() {\n\n\t\t\t\tgl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );\n\n\t\t\t}\n\t\t",blending:F,depthTest:!1,depthWrite:!1})}function ui(){return"\n\n\t\tprecision mediump float;\n\t\tprecision mediump int;\n\n\t\tattribute float faceIndex;\n\n\t\tvarying vec3 vOutputDirection;\n\n\t\t// RH coordinate system; PMREM face-indexing convention\n\t\tvec3 getDirection( vec2 uv, float face ) {\n\n\t\t\tuv = 2.0 * uv - 1.0;\n\n\t\t\tvec3 direction = vec3( uv, 1.0 );\n\n\t\t\tif ( face == 0.0 ) {\n\n\t\t\t\tdirection = direction.zyx; // ( 1, v, u ) pos x\n\n\t\t\t} else if ( face == 1.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n\t\t\t} else if ( face == 2.0 ) {\n\n\t\t\t\tdirection.x *= -1.0; // ( -u, v, 1 ) pos z\n\n\t\t\t} else if ( face == 3.0 ) {\n\n\t\t\t\tdirection = direction.zyx;\n\t\t\t\tdirection.xz *= -1.0; // ( -1, v, -u ) neg x\n\n\t\t\t} else if ( face == 4.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xy *= -1.0; // ( -u, -1, v ) neg y\n\n\t\t\t} else if ( face == 5.0 ) {\n\n\t\t\t\tdirection.z *= -1.0; // ( u, v, -1 ) neg z\n\n\t\t\t}\n\n\t\t\treturn direction;\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvOutputDirection = getDirection( uv, faceIndex );\n\t\t\tgl_Position = vec4( position, 1.0 );\n\n\t\t}\n\t"}function fi(e){let t=new WeakMap,n=null;function i(e){const n=e.target;n.removeEventListener("dispose",i);const r=t.get(n);void 0!==r&&(t.delete(n),r.dispose())}return{get:function(r){if(r&&r.isTexture){const a=r.mapping,o=a===R||a===b,s=a===P||a===L;if(o||s){let a=t.get(r);const l=void 0!==a?a.texture.pmremVersion:0;if(r.isRenderTargetTexture&&r.pmremVersion!==l)return null===n&&(n=new oi(e)),a=o?n.fromEquirectangular(r,a):n.fromCubemap(r,a),a.texture.pmremVersion=r.pmremVersion,t.set(r,a),a.texture;if(void 0!==a)return a.texture;{const l=r.image;return o&&l&&l.height>0||s&&l&&function(e){let t=0;const n=6;for(let i=0;i<n;i++)void 0!==e[i]&&t++;return t===n}(l)?(null===n&&(n=new oi(e)),a=o?n.fromEquirectangular(r):n.fromCubemap(r),a.texture.pmremVersion=r.pmremVersion,t.set(r,a),r.addEventListener("dispose",i),a.texture):null}}}return r},dispose:function(){t=new WeakMap,null!==n&&(n.dispose(),n=null)}}}function pi(e){const t={};function n(n){if(void 0!==t[n])return t[n];const i=e.getExtension(n);return t[n]=i,i}return{has:function(e){return null!==n(e)},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(e){const t=n(e);return null===t&&V("WebGLRenderer: "+e+" extension not supported."),t}}}function mi(e,t,n,i){const r={},a=new WeakMap;function o(e){const s=e.target;null!==s.index&&t.remove(s.index);for(const e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener("dispose",o),delete r[s.id];const l=a.get(s);l&&(t.remove(l),a.delete(s)),i.releaseStatesOfGeometry(s),!0===s.isInstancedBufferGeometry&&delete s._maxInstanceCount,n.memory.geometries--}function s(e){const n=[],i=e.index,r=e.attributes.position;let o=0;if(null!==i){const e=i.array;o=i.version;for(let t=0,i=e.length;t<i;t+=3){const i=e[t+0],r=e[t+1],a=e[t+2];n.push(i,r,r,a,a,i)}}else{if(void 0===r)return;{const e=r.array;o=r.version;for(let t=0,i=e.length/3-1;t<i;t+=3){const e=t+0,i=t+1,r=t+2;n.push(e,i,i,r,r,e)}}}const s=new(z(n)?W:k)(n,1);s.version=o;const l=a.get(e);l&&t.remove(l),a.set(e,s)}return{get:function(e,t){return!0===r[t.id]||(t.addEventListener("dispose",o),r[t.id]=!0,n.memory.geometries++),t},update:function(n){const i=n.attributes;for(const n in i)t.update(i[n],e.ARRAY_BUFFER)},getWireframeAttribute:function(e){const t=a.get(e);if(t){const n=e.index;null!==n&&t.version<n.version&&s(e)}else s(e);return a.get(e)}}}function hi(e,t,n){let i,r,a;function o(t,o,s){0!==s&&(e.drawElementsInstanced(i,o,r,t*a,s),n.update(o,i,s))}this.setMode=function(e){i=e},this.setIndex=function(e){r=e.type,a=e.bytesPerElement},this.render=function(t,o){e.drawElements(i,o,r,t*a),n.update(o,i,1)},this.renderInstances=o,this.renderMultiDraw=function(e,a,o){if(0===o)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,a,0,r,e,0,o);let s=0;for(let e=0;e<o;e++)s+=a[e];n.update(s,i,1)},this.renderMultiDrawInstances=function(e,s,l,c){if(0===l)return;const d=t.get("WEBGL_multi_draw");if(null===d)for(let t=0;t<e.length;t++)o(e[t]/a,s[t],c[t]);else{d.multiDrawElementsInstancedWEBGL(i,s,0,r,e,0,c,0,l);let t=0;for(let e=0;e<l;e++)t+=s[e]*c[e];n.update(t,i,1)}}}function _i(e){const t={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:t,programs:null,autoReset:!0,reset:function(){t.calls=0,t.triangles=0,t.points=0,t.lines=0},update:function(n,i,r){switch(t.calls++,i){case e.TRIANGLES:t.triangles+=r*(n/3);break;case e.LINES:t.lines+=r*(n/2);break;case e.LINE_STRIP:t.lines+=r*(n-1);break;case e.LINE_LOOP:t.lines+=r*n;break;case e.POINTS:t.points+=r*n;break;default:y("WebGLInfo: Unknown draw mode:",i)}}}}function gi(e,n,i){const r=new WeakMap,a=new X;return{update:function(o,s,l){const c=o.morphTargetInfluences,d=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,u=void 0!==d?d.length:0;let f=r.get(s);if(void 0===f||f.count!==u){void 0!==f&&f.texture.dispose();const p=void 0!==s.morphAttributes.position,m=void 0!==s.morphAttributes.normal,h=void 0!==s.morphAttributes.color,_=s.morphAttributes.position||[],g=s.morphAttributes.normal||[],v=s.morphAttributes.color||[];let E=0;!0===p&&(E=1),!0===m&&(E=2),!0===h&&(E=3);let S=s.attributes.position.count*E,T=1;S>n.maxTextureSize&&(T=Math.ceil(S/n.maxTextureSize),S=n.maxTextureSize);const x=new Float32Array(S*T*4*u),A=new Y(x,S,T,u);A.type=M,A.needsUpdate=!0;const R=4*E;for(let C=0;C<u;C++){const P=_[C],L=g[C],U=v[C],D=S*T*4*C;for(let w=0;w<P.count;w++){const I=w*R;!0===p&&(a.fromBufferAttribute(P,w),x[D+I+0]=a.x,x[D+I+1]=a.y,x[D+I+2]=a.z,x[D+I+3]=0),!0===m&&(a.fromBufferAttribute(L,w),x[D+I+4]=a.x,x[D+I+5]=a.y,x[D+I+6]=a.z,x[D+I+7]=0),!0===h&&(a.fromBufferAttribute(U,w),x[D+I+8]=a.x,x[D+I+9]=a.y,x[D+I+10]=a.z,x[D+I+11]=4===U.itemSize?a.w:1)}}function b(){A.dispose(),r.delete(s),s.removeEventListener("dispose",b)}f={count:u,texture:A,size:new t(S,T)},r.set(s,f),s.addEventListener("dispose",b)}if(!0===o.isInstancedMesh&&null!==o.morphTexture)l.getUniforms().setValue(e,"morphTexture",o.morphTexture,i);else{let N=0;for(let F=0;F<c.length;F++)N+=c[F];const y=s.morphTargetsRelative?1:1-N;l.getUniforms().setValue(e,"morphTargetBaseInfluence",y),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",f.texture,i),l.getUniforms().setValue(e,"morphTargetsTextureSize",f.size)}}}function vi(e,t,n,i){let r=new WeakMap;function a(e){const t=e.target;t.removeEventListener("dispose",a),n.remove(t.instanceMatrix),null!==t.instanceColor&&n.remove(t.instanceColor)}return{update:function(o){const s=i.render.frame,l=o.geometry,c=t.get(o,l);if(r.get(c)!==s&&(t.update(c),r.set(c,s)),o.isInstancedMesh&&(!1===o.hasEventListener("dispose",a)&&o.addEventListener("dispose",a),r.get(o)!==s&&(n.update(o.instanceMatrix,e.ARRAY_BUFFER),null!==o.instanceColor&&n.update(o.instanceColor,e.ARRAY_BUFFER),r.set(o,s))),o.isSkinnedMesh){const e=o.skeleton;r.get(e)!==s&&(e.update(),r.set(e,s))}return c},dispose:function(){r=new WeakMap}}}const Ei={[te]:"LINEAR_TONE_MAPPING",[ee]:"REINHARD_TONE_MAPPING",[J]:"CINEON_TONE_MAPPING",[Q]:"ACES_FILMIC_TONE_MAPPING",[$]:"AGX_TONE_MAPPING",[Z]:"NEUTRAL_TONE_MAPPING",[j]:"CUSTOM_TONE_MAPPING"};function Si(e,t,n,i,r){const a=new O(t,n,{type:e,depthBuffer:i,stencilBuffer:r}),s=new O(t,n,{type:S,depthBuffer:!1,stencilBuffer:!1}),l=new U;l.setAttribute("position",new K([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new K([0,2,0,0,2,0],2));const c=new q({uniforms:{tDiffuse:{value:null}},vertexShader:"\n\t\t\tprecision highp float;\n\n\t\t\tuniform mat4 modelViewMatrix;\n\t\t\tuniform mat4 projectionMatrix;\n\n\t\t\tattribute vec3 position;\n\t\t\tattribute vec2 uv;\n\n\t\t\tvarying vec2 vUv;\n\n\t\t\tvoid main() {\n\t\t\t\tvUv = uv;\n\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t}",fragmentShader:"\n\t\t\tprecision highp float;\n\n\t\t\tuniform sampler2D tDiffuse;\n\n\t\t\tvarying vec2 vUv;\n\n\t\t\t#include <tonemapping_pars_fragment>\n\t\t\t#include <colorspace_pars_fragment>\n\n\t\t\tvoid main() {\n\t\t\t\tgl_FragColor = texture2D( tDiffuse, vUv );\n\n\t\t\t\t#ifdef LINEAR_TONE_MAPPING\n\t\t\t\t\tgl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );\n\t\t\t\t#elif defined( REINHARD_TONE_MAPPING )\n\t\t\t\t\tgl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );\n\t\t\t\t#elif defined( CINEON_TONE_MAPPING )\n\t\t\t\t\tgl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );\n\t\t\t\t#elif defined( ACES_FILMIC_TONE_MAPPING )\n\t\t\t\t\tgl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );\n\t\t\t\t#elif defined( AGX_TONE_MAPPING )\n\t\t\t\t\tgl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );\n\t\t\t\t#elif defined( NEUTRAL_TONE_MAPPING )\n\t\t\t\t\tgl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );\n\t\t\t\t#elif defined( CUSTOM_TONE_MAPPING )\n\t\t\t\t\tgl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );\n\t\t\t\t#endif\n\n\t\t\t\t#ifdef SRGB_TRANSFER\n\t\t\t\t\tgl_FragColor = sRGBTransferOETF( gl_FragColor );\n\t\t\t\t#endif\n\t\t\t}",depthTest:!1,depthWrite:!1}),d=new o(l,c),u=new D(-1,1,1,-1,0,1);let f,h=null,_=null,g=!1,v=null,E=[],T=!1;this.setSize=function(e,t){a.setSize(e,t),s.setSize(e,t);for(let n=0;n<E.length;n++){const i=E[n];i.setSize&&i.setSize(e,t)}},this.setEffects=function(e){E=e,T=E.length>0&&!0===E[0].isRenderPass;const t=a.width,n=a.height;for(let e=0;e<E.length;e++){const i=E[e];i.setSize&&i.setSize(t,n)}},this.begin=function(e,t){if(g)return!1;if(e.toneMapping===I&&0===E.length)return!1;if(v=t,null!==t){const e=t.width,n=t.height;a.width===e&&a.height===n||this.setSize(e,n)}return!1===T&&e.setRenderTarget(a),f=e.toneMapping,e.toneMapping=I,!0},this.hasRenderPass=function(){return T},this.end=function(e,t){e.toneMapping=f,g=!0;let n=a,i=s;for(let r=0;r<E.length;r++){const a=E[r];if(!1!==a.enabled&&(a.render(e,i,n,t),!1!==a.needsSwap)){const e=n;n=i,i=e}}if(h!==e.outputColorSpace||_!==e.toneMapping){h=e.outputColorSpace,_=e.toneMapping,c.defines={},p.getTransfer(h)===m&&(c.defines.SRGB_TRANSFER="");const t=Ei[_];t&&(c.defines[t]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(d,u),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.dispose(),s.dispose(),l.dispose(),c.dispose()}}const Ti=new se,Mi=new oe(1,1),xi=new Y,Ai=new ie,Ri=new ne,bi=[],Ci=[],Pi=new Float32Array(16),Li=new Float32Array(9),Ui=new Float32Array(4);function Di(e,t,n){const i=e[0];if(i<=0||i>0)return e;const r=t*n;let a=bi[r];if(void 0===a&&(a=new Float32Array(r),bi[r]=a),0!==t){i.toArray(a,0);for(let i=1,r=0;i!==t;++i)r+=n,e[i].toArray(a,r)}return a}function wi(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Ii(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function Ni(e,t){let n=Ci[t];void 0===n&&(n=new Int32Array(t),Ci[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function yi(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Fi(e,t){const n=this.cache;if(void 0!==t.x)n[0]===t.x&&n[1]===t.y||(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(wi(n,t))return;e.uniform2fv(this.addr,t),Ii(n,t)}}function Oi(e,t){const n=this.cache;if(void 0!==t.x)n[0]===t.x&&n[1]===t.y&&n[2]===t.z||(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(void 0!==t.r)n[0]===t.r&&n[1]===t.g&&n[2]===t.b||(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(wi(n,t))return;e.uniform3fv(this.addr,t),Ii(n,t)}}function Bi(e,t){const n=this.cache;if(void 0!==t.x)n[0]===t.x&&n[1]===t.y&&n[2]===t.z&&n[3]===t.w||(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(wi(n,t))return;e.uniform4fv(this.addr,t),Ii(n,t)}}function Gi(e,t){const n=this.cache,i=t.elements;if(void 0===i){if(wi(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ii(n,t)}else{if(wi(n,i))return;Ui.set(i),e.uniformMatrix2fv(this.addr,!1,Ui),Ii(n,i)}}function Hi(e,t){const n=this.cache,i=t.elements;if(void 0===i){if(wi(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ii(n,t)}else{if(wi(n,i))return;Li.set(i),e.uniformMatrix3fv(this.addr,!1,Li),Ii(n,i)}}function Vi(e,t){const n=this.cache,i=t.elements;if(void 0===i){if(wi(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ii(n,t)}else{if(wi(n,i))return;Pi.set(i),e.uniformMatrix4fv(this.addr,!1,Pi),Ii(n,i)}}function Wi(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function ki(e,t){const n=this.cache;if(void 0!==t.x)n[0]===t.x&&n[1]===t.y||(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(wi(n,t))return;e.uniform2iv(this.addr,t),Ii(n,t)}}function zi(e,t){const n=this.cache;if(void 0!==t.x)n[0]===t.x&&n[1]===t.y&&n[2]===t.z||(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(wi(n,t))return;e.uniform3iv(this.addr,t),Ii(n,t)}}function Xi(e,t){const n=this.cache;if(void 0!==t.x)n[0]===t.x&&n[1]===t.y&&n[2]===t.z&&n[3]===t.w||(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(wi(n,t))return;e.uniform4iv(this.addr,t),Ii(n,t)}}function Yi(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Ki(e,t){const n=this.cache;if(void 0!==t.x)n[0]===t.x&&n[1]===t.y||(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(wi(n,t))return;e.uniform2uiv(this.addr,t),Ii(n,t)}}function qi(e,t){const n=this.cache;if(void 0!==t.x)n[0]===t.x&&n[1]===t.y&&n[2]===t.z||(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(wi(n,t))return;e.uniform3uiv(this.addr,t),Ii(n,t)}}function ji(e,t){const n=this.cache;if(void 0!==t.x)n[0]===t.x&&n[1]===t.y&&n[2]===t.z&&n[3]===t.w||(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(wi(n,t))return;e.uniform4uiv(this.addr,t),Ii(n,t)}}function Zi(e,t,n){const i=this.cache,r=n.allocateTextureUnit();let a;i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),this.type===e.SAMPLER_2D_SHADOW?(Mi.compareFunction=n.isReversedDepthBuffer()?re:ae,a=Mi):a=Ti,n.setTexture2D(t||a,r)}function $i(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(t||Ai,r)}function Qi(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(t||Ri,r)}function Ji(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(t||xi,r)}function er(e,t){e.uniform1fv(this.addr,t)}function tr(e,t){const n=Di(t,this.size,2);e.uniform2fv(this.addr,n)}function nr(e,t){const n=Di(t,this.size,3);e.uniform3fv(this.addr,n)}function ir(e,t){const n=Di(t,this.size,4);e.uniform4fv(this.addr,n)}function rr(e,t){const n=Di(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function ar(e,t){const n=Di(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function or(e,t){const n=Di(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function sr(e,t){e.uniform1iv(this.addr,t)}function lr(e,t){e.uniform2iv(this.addr,t)}function cr(e,t){e.uniform3iv(this.addr,t)}function dr(e,t){e.uniform4iv(this.addr,t)}function ur(e,t){e.uniform1uiv(this.addr,t)}function fr(e,t){e.uniform2uiv(this.addr,t)}function pr(e,t){e.uniform3uiv(this.addr,t)}function mr(e,t){e.uniform4uiv(this.addr,t)}function hr(e,t,n){const i=this.cache,r=t.length,a=Ni(n,r);let o;wi(i,a)||(e.uniform1iv(this.addr,a),Ii(i,a)),o=this.type===e.SAMPLER_2D_SHADOW?Mi:Ti;for(let e=0;e!==r;++e)n.setTexture2D(t[e]||o,a[e])}function _r(e,t,n){const i=this.cache,r=t.length,a=Ni(n,r);wi(i,a)||(e.uniform1iv(this.addr,a),Ii(i,a));for(let e=0;e!==r;++e)n.setTexture3D(t[e]||Ai,a[e])}function gr(e,t,n){const i=this.cache,r=t.length,a=Ni(n,r);wi(i,a)||(e.uniform1iv(this.addr,a),Ii(i,a));for(let e=0;e!==r;++e)n.setTextureCube(t[e]||Ri,a[e])}function vr(e,t,n){const i=this.cache,r=t.length,a=Ni(n,r);wi(i,a)||(e.uniform1iv(this.addr,a),Ii(i,a));for(let e=0;e!==r;++e)n.setTexture2DArray(t[e]||xi,a[e])}class Er{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=function(e){switch(e){case 5126:return yi;case 35664:return Fi;case 35665:return Oi;case 35666:return Bi;case 35674:return Gi;case 35675:return Hi;case 35676:return Vi;case 5124:case 35670:return Wi;case 35667:case 35671:return ki;case 35668:case 35672:return zi;case 35669:case 35673:return Xi;case 5125:return Yi;case 36294:return Ki;case 36295:return qi;case 36296:return ji;case 35678:case 36198:case 36298:case 36306:case 35682:return Zi;case 35679:case 36299:case 36307:return $i;case 35680:case 36300:case 36308:case 36293:return Qi;case 36289:case 36303:case 36311:case 36292:return Ji}}(t.type)}}class Sr{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=function(e){switch(e){case 5126:return er;case 35664:return tr;case 35665:return nr;case 35666:return ir;case 35674:return rr;case 35675:return ar;case 35676:return or;case 5124:case 35670:return sr;case 35667:case 35671:return lr;case 35668:case 35672:return cr;case 35669:case 35673:return dr;case 5125:return ur;case 36294:return fr;case 36295:return pr;case 36296:return mr;case 35678:case 36198:case 36298:case 36306:case 35682:return hr;case 35679:case 36299:case 36307:return _r;case 35680:case 36300:case 36308:case 36293:return gr;case 36289:case 36303:case 36311:case 36292:return vr}}(t.type)}}class Tr{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const Mr=/(\w+)(\])?(\[|\.)?/g;function xr(e,t){e.seq.push(t),e.map[t.id]=t}function Ar(e,t,n){const i=e.name,r=i.length;for(Mr.lastIndex=0;;){const a=Mr.exec(i),o=Mr.lastIndex;let s=a[1];const l="]"===a[2],c=a[3];if(l&&(s|=0),void 0===c||"["===c&&o+2===r){xr(n,void 0===c?new Er(s,e,t):new Sr(s,e,t));break}{let e=n.map[s];void 0===e&&(e=new Tr(s),xr(n,e)),n=e}}}class Rr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const n=e.getActiveUniform(t,i);Ar(n,e.getUniformLocation(t,n.name),this)}const i=[],r=[];for(const t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(t):r.push(t);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){const r=this.map[t];void 0!==r&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];void 0!==i&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const a=t[r],o=n[a.id];!1!==o.needsUpdate&&a.setValue(e,o.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const r=e[i];r.id in t&&n.push(r)}return n}}function br(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}let Cr=0;const Pr=new e;function Lr(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),r=(e.getShaderInfoLog(t)||"").trim();if(i&&""===r)return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const i=parseInt(a[1]);return n.toUpperCase()+"\n\n"+r+"\n\n"+function(e,t){const n=e.split("\n"),i=[],r=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=r;e<a;e++){const r=e+1;i.push(`${r===t?">":" "} ${r}: ${n[e]}`)}return i.join("\n")}(e.getShaderSource(t),i)}return r}function Ur(e,t){const n=function(e){p._getMatrix(Pr,p.workingColorSpace,e);const t=`mat3( ${Pr.elements.map(e=>e.toFixed(4))} )`;switch(p.getTransfer(e)){case me:return[t,"LinearTransferOETF"];case m:return[t,"sRGBTransferOETF"];default:return E("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}(t);return[`vec4 ${e}( vec4 value ) {`,`\treturn ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join("\n")}const Dr={[te]:"Linear",[ee]:"Reinhard",[J]:"Cineon",[Q]:"ACESFilmic",[$]:"AgX",[Z]:"Neutral",[j]:"Custom"};function wr(e,t){const n=Dr[t];return void 0===n?(E("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Ir=new r;function Nr(){p.getLuminanceCoefficients(Ir);return["float luminance( const in vec3 rgb ) {",`\tconst vec3 weights = vec3( ${Ir.x.toFixed(4)}, ${Ir.y.toFixed(4)}, ${Ir.z.toFixed(4)} );`,"\treturn dot( weights, rgb );","}"].join("\n")}function yr(e){return""!==e}function Fr(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Or(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Br=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gr(e){return e.replace(Br,Vr)}const Hr=new Map;function Vr(e,t){let n=Gn[t];if(void 0===n){const e=Hr.get(t);if(void 0===e)throw new Error("Can not resolve #include <"+t+">");n=Gn[e],E('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,e)}return Gr(n)}const Wr=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kr(e){return e.replace(Wr,zr)}function zr(e,t,n,i){let r="";for(let e=parseInt(t);e<parseInt(n);e++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+e+" ]").replace(/UNROLLED_LOOP_INDEX/g,e);return r}function Xr(e){let t=`precision ${e.precision} float;\n\tprecision ${e.precision} int;\n\tprecision ${e.precision} sampler2D;\n\tprecision ${e.precision} samplerCube;\n\tprecision ${e.precision} sampler3D;\n\tprecision ${e.precision} sampler2DArray;\n\tprecision ${e.precision} sampler2DShadow;\n\tprecision ${e.precision} samplerCubeShadow;\n\tprecision ${e.precision} sampler2DArrayShadow;\n\tprecision ${e.precision} isampler2D;\n\tprecision ${e.precision} isampler3D;\n\tprecision ${e.precision} isamplerCube;\n\tprecision ${e.precision} isampler2DArray;\n\tprecision ${e.precision} usampler2D;\n\tprecision ${e.precision} usampler3D;\n\tprecision ${e.precision} usamplerCube;\n\tprecision ${e.precision} usampler2DArray;\n\t`;return"highp"===e.precision?t+="\n#define HIGH_PRECISION":"mediump"===e.precision?t+="\n#define MEDIUM_PRECISION":"lowp"===e.precision&&(t+="\n#define LOW_PRECISION"),t}const Yr={[de]:"SHADOWMAP_TYPE_PCF",[ce]:"SHADOWMAP_TYPE_VSM"};const Kr={[P]:"ENVMAP_TYPE_CUBE",[L]:"ENVMAP_TYPE_CUBE",[a]:"ENVMAP_TYPE_CUBE_UV"};const qr={[L]:"ENVMAP_MODE_REFRACTION"};const jr={[pe]:"ENVMAP_BLENDING_MULTIPLY",[fe]:"ENVMAP_BLENDING_MIX",[ue]:"ENVMAP_BLENDING_ADD"};function Zr(e,t,n,i){const r=e.getContext(),a=n.defines;let o=n.vertexShader,s=n.fragmentShader;const l=function(e){return Yr[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}(n),c=function(e){return!1===e.envMap?"ENVMAP_TYPE_CUBE":Kr[e.envMapMode]||"ENVMAP_TYPE_CUBE"}(n),d=function(e){return!1===e.envMap?"ENVMAP_MODE_REFLECTION":qr[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}(n),u=function(e){return!1===e.envMap?"ENVMAP_BLENDING_NONE":jr[e.combine]||"ENVMAP_BLENDING_NONE"}(n),f=function(e){const t=e.envMapCubeUVHeight;if(null===t)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}(n),p=function(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(yr).join("\n")}(n),m=function(e){const t=[];for(const n in e){const i=e[n];!1!==i&&t.push("#define "+n+" "+i)}return t.join("\n")}(a),h=r.createProgram();let _,g,v=n.glslVersion?"#version "+n.glslVersion+"\n":"";n.isRawShaderMaterial?(_=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m].filter(yr).join("\n"),_.length>0&&(_+="\n"),g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m].filter(yr).join("\n"),g.length>0&&(g+="\n")):(_=[Xr(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&!1===n.flatShading?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&!1===n.flatShading?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif","\n"].filter(yr).join("\n"),g=[Xr(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&!1===n.flatShading?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==I?"#define TONE_MAPPING":"",n.toneMapping!==I?Gn.tonemapping_pars_fragment:"",n.toneMapping!==I?wr("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Gn.colorspace_pars_fragment,Ur("linearToOutputTexel",n.outputColorSpace),Nr(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"","\n"].filter(yr).join("\n")),o=Gr(o),o=Fr(o,n),o=Or(o,n),s=Gr(s),s=Fr(s,n),s=Or(s,n),o=kr(o),s=kr(s),!0!==n.isRawShaderMaterial&&(v="#version 300 es\n",_=[p,"#define attribute in","#define varying out","#define texture2D texture"].join("\n")+"\n"+_,g=["#define varying in",n.glslVersion===le?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===le?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join("\n")+"\n"+g);const S=v+_+o,T=v+g+s,M=br(r,r.VERTEX_SHADER,S),x=br(r,r.FRAGMENT_SHADER,T);function A(t){if(e.debug.checkShaderErrors){const n=r.getProgramInfoLog(h)||"",i=r.getShaderInfoLog(M)||"",a=r.getShaderInfoLog(x)||"",o=n.trim(),s=i.trim(),l=a.trim();let c=!0,d=!0;if(!1===r.getProgramParameter(h,r.LINK_STATUS))if(c=!1,"function"==typeof e.debug.onShaderError)e.debug.onShaderError(r,h,M,x);else{const e=Lr(r,M,"vertex"),n=Lr(r,x,"fragment");y("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(h,r.VALIDATE_STATUS)+"\n\nMaterial Name: "+t.name+"\nMaterial Type: "+t.type+"\n\nProgram Info Log: "+o+"\n"+e+"\n"+n)}else""!==o?E("WebGLProgram: Program Info Log:",o):""!==s&&""!==l||(d=!1);d&&(t.diagnostics={runnable:c,programLog:o,vertexShader:{log:s,prefix:_},fragmentShader:{log:l,prefix:g}})}r.deleteShader(M),r.deleteShader(x),R=new Rr(r,h),b=function(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const i=e.getActiveAttrib(t,r),a=i.name;let o=1;i.type===e.FLOAT_MAT2&&(o=2),i.type===e.FLOAT_MAT3&&(o=3),i.type===e.FLOAT_MAT4&&(o=4),n[a]={type:i.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}(r,h)}let R,b;r.attachShader(h,M),r.attachShader(h,x),void 0!==n.index0AttributeName?r.bindAttribLocation(h,0,n.index0AttributeName):!0===n.morphTargets&&r.bindAttribLocation(h,0,"position"),r.linkProgram(h),this.getUniforms=function(){return void 0===R&&A(this),R},this.getAttributes=function(){return void 0===b&&A(this),b};let C=!1===n.rendererExtensionParallelShaderCompile;return this.isReady=function(){return!1===C&&(C=r.getProgramParameter(h,37297)),C},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Cr++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=M,this.fragmentShader=x,this}let $r=0;class Qr{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return!1===a.has(i)&&(a.add(i),i.usedTimes++),!1===a.has(r)&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const e of t)e.usedTimes--,0===e.usedTimes&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return void 0===n&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return void 0===n&&(n=new Jr(e),t.set(e,n)),n}}class Jr{constructor(e){this.id=$r++,this.code=e,this.usedTimes=0}}function ea(e,t,n,i,r,o,s){const l=new Se,d=new Qr,u=new Set,f=[],h=new Map,_=r.logarithmicDepthBuffer;let g=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function S(e){return u.add(e),0===e?"uv":`uv${e}`}return{getParameters:function(o,l,f,h,T){const M=h.fog,x=T.geometry,A=o.isMeshStandardMaterial?h.environment:null,R=(o.isMeshStandardMaterial?n:t).get(o.envMap||A),b=R&&R.mapping===a?R.image.height:null,C=v[o.type];null!==o.precision&&(g=r.getMaxPrecision(o.precision),g!==o.precision&&E("WebGLProgram.getParameters:",o.precision,"not supported, using",g,"instead."));const P=x.morphAttributes.position||x.morphAttributes.normal||x.morphAttributes.color,L=void 0!==P?P.length:0;let U,D,w,N,y=0;if(void 0!==x.morphAttributes.position&&(y=1),void 0!==x.morphAttributes.normal&&(y=2),void 0!==x.morphAttributes.color&&(y=3),C){const e=Vn[C];U=e.vertexShader,D=e.fragmentShader}else U=o.vertexShader,D=o.fragmentShader,d.update(o),w=d.getVertexShaderID(o),N=d.getFragmentShaderID(o);const F=e.getRenderTarget(),O=e.state.buffers.depth.getReversed(),B=!0===T.isInstancedMesh,H=!0===T.isBatchedMesh,V=!!o.map,W=!!o.matcap,k=!!R,z=!!o.aoMap,X=!!o.lightMap,Y=!!o.bumpMap,K=!!o.normalMap,q=!!o.displacementMap,j=!!o.emissiveMap,Z=!!o.metalnessMap,$=!!o.roughnessMap,Q=o.anisotropy>0,J=o.clearcoat>0,ee=o.dispersion>0,te=o.iridescence>0,ne=o.sheen>0,ie=o.transmission>0,re=Q&&!!o.anisotropyMap,ae=J&&!!o.clearcoatMap,oe=J&&!!o.clearcoatNormalMap,se=J&&!!o.clearcoatRoughnessMap,le=te&&!!o.iridescenceMap,ce=te&&!!o.iridescenceThicknessMap,de=ne&&!!o.sheenColorMap,ue=ne&&!!o.sheenRoughnessMap,fe=!!o.specularMap,pe=!!o.specularColorMap,me=!!o.specularIntensityMap,he=ie&&!!o.transmissionMap,Se=ie&&!!o.thicknessMap,Te=!!o.gradientMap,Me=!!o.alphaMap,xe=o.alphaTest>0,Ae=!!o.alphaHash,Re=!!o.extensions;let be=I;o.toneMapped&&(null!==F&&!0!==F.isXRRenderTarget||(be=e.toneMapping));const Ce={shaderID:C,shaderType:o.type,shaderName:o.name,vertexShader:U,fragmentShader:D,defines:o.defines,customVertexShaderID:w,customFragmentShaderID:N,isRawShaderMaterial:!0===o.isRawShaderMaterial,glslVersion:o.glslVersion,precision:g,batching:H,batchingColor:H&&null!==T._colorsTexture,instancing:B,instancingColor:B&&null!==T.instanceColor,instancingMorph:B&&null!==T.morphTexture,outputColorSpace:null===F?e.outputColorSpace:!0===F.isXRRenderTarget?F.texture.colorSpace:G,alphaToCoverage:!!o.alphaToCoverage,map:V,matcap:W,envMap:k,envMapMode:k&&R.mapping,envMapCubeUVHeight:b,aoMap:z,lightMap:X,bumpMap:Y,normalMap:K,displacementMap:q,emissiveMap:j,normalMapObjectSpace:K&&o.normalMapType===Ee,normalMapTangentSpace:K&&o.normalMapType===ve,metalnessMap:Z,roughnessMap:$,anisotropy:Q,anisotropyMap:re,clearcoat:J,clearcoatMap:ae,clearcoatNormalMap:oe,clearcoatRoughnessMap:se,dispersion:ee,iridescence:te,iridescenceMap:le,iridescenceThicknessMap:ce,sheen:ne,sheenColorMap:de,sheenRoughnessMap:ue,specularMap:fe,specularColorMap:pe,specularIntensityMap:me,transmission:ie,transmissionMap:he,thicknessMap:Se,gradientMap:Te,opaque:!1===o.transparent&&o.blending===ge&&!1===o.alphaToCoverage,alphaMap:Me,alphaTest:xe,alphaHash:Ae,combine:o.combine,mapUv:V&&S(o.map.channel),aoMapUv:z&&S(o.aoMap.channel),lightMapUv:X&&S(o.lightMap.channel),bumpMapUv:Y&&S(o.bumpMap.channel),normalMapUv:K&&S(o.normalMap.channel),displacementMapUv:q&&S(o.displacementMap.channel),emissiveMapUv:j&&S(o.emissiveMap.channel),metalnessMapUv:Z&&S(o.metalnessMap.channel),roughnessMapUv:$&&S(o.roughnessMap.channel),anisotropyMapUv:re&&S(o.anisotropyMap.channel),clearcoatMapUv:ae&&S(o.clearcoatMap.channel),clearcoatNormalMapUv:oe&&S(o.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:se&&S(o.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&S(o.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&S(o.iridescenceThicknessMap.channel),sheenColorMapUv:de&&S(o.sheenColorMap.channel),sheenRoughnessMapUv:ue&&S(o.sheenRoughnessMap.channel),specularMapUv:fe&&S(o.specularMap.channel),specularColorMapUv:pe&&S(o.specularColorMap.channel),specularIntensityMapUv:me&&S(o.specularIntensityMap.channel),transmissionMapUv:he&&S(o.transmissionMap.channel),thicknessMapUv:Se&&S(o.thicknessMap.channel),alphaMapUv:Me&&S(o.alphaMap.channel),vertexTangents:!!x.attributes.tangent&&(K||Q),vertexColors:o.vertexColors,vertexAlphas:!0===o.vertexColors&&!!x.attributes.color&&4===x.attributes.color.itemSize,pointsUvs:!0===T.isPoints&&!!x.attributes.uv&&(V||Me),fog:!!M,useFog:!0===o.fog,fogExp2:!!M&&M.isFogExp2,flatShading:!0===o.flatShading&&!1===o.wireframe,sizeAttenuation:!0===o.sizeAttenuation,logarithmicDepthBuffer:_,reversedDepthBuffer:O,skinning:!0===T.isSkinnedMesh,morphTargets:void 0!==x.morphAttributes.position,morphNormals:void 0!==x.morphAttributes.normal,morphColors:void 0!==x.morphAttributes.color,morphTargetsCount:L,morphTextureStride:y,numDirLights:l.directional.length,numPointLights:l.point.length,numSpotLights:l.spot.length,numSpotLightMaps:l.spotLightMap.length,numRectAreaLights:l.rectArea.length,numHemiLights:l.hemi.length,numDirLightShadows:l.directionalShadowMap.length,numPointLightShadows:l.pointShadowMap.length,numSpotLightShadows:l.spotShadowMap.length,numSpotLightShadowsWithMaps:l.numSpotLightShadowsWithMaps,numLightProbes:l.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:o.dithering,shadowMapEnabled:e.shadowMap.enabled&&f.length>0,shadowMapType:e.shadowMap.type,toneMapping:be,decodeVideoTexture:V&&!0===o.map.isVideoTexture&&p.getTransfer(o.map.colorSpace)===m,decodeVideoTextureEmissive:j&&!0===o.emissiveMap.isVideoTexture&&p.getTransfer(o.emissiveMap.colorSpace)===m,premultipliedAlpha:o.premultipliedAlpha,doubleSided:o.side===_e,flipSided:o.side===c,useDepthPacking:o.depthPacking>=0,depthPacking:o.depthPacking||0,index0AttributeName:o.index0AttributeName,extensionClipCullDistance:Re&&!0===o.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&!0===o.extensions.multiDraw||H)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:o.customProgramCacheKey()};return Ce.vertexUv1s=u.has(1),Ce.vertexUv2s=u.has(2),Ce.vertexUv3s=u.has(3),u.clear(),Ce},getProgramCacheKey:function(t){const n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),void 0!==t.defines)for(const e in t.defines)n.push(e),n.push(t.defines[e]);return!1===t.isRawShaderMaterial&&(!function(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}(n,t),function(e,t){l.disableAll(),t.instancing&&l.enable(0);t.instancingColor&&l.enable(1);t.instancingMorph&&l.enable(2);t.matcap&&l.enable(3);t.envMap&&l.enable(4);t.normalMapObjectSpace&&l.enable(5);t.normalMapTangentSpace&&l.enable(6);t.clearcoat&&l.enable(7);t.iridescence&&l.enable(8);t.alphaTest&&l.enable(9);t.vertexColors&&l.enable(10);t.vertexAlphas&&l.enable(11);t.vertexUv1s&&l.enable(12);t.vertexUv2s&&l.enable(13);t.vertexUv3s&&l.enable(14);t.vertexTangents&&l.enable(15);t.anisotropy&&l.enable(16);t.alphaHash&&l.enable(17);t.batching&&l.enable(18);t.dispersion&&l.enable(19);t.batchingColor&&l.enable(20);t.gradientMap&&l.enable(21);e.push(l.mask),l.disableAll(),t.fog&&l.enable(0);t.useFog&&l.enable(1);t.flatShading&&l.enable(2);t.logarithmicDepthBuffer&&l.enable(3);t.reversedDepthBuffer&&l.enable(4);t.skinning&&l.enable(5);t.morphTargets&&l.enable(6);t.morphNormals&&l.enable(7);t.morphColors&&l.enable(8);t.premultipliedAlpha&&l.enable(9);t.shadowMapEnabled&&l.enable(10);t.doubleSided&&l.enable(11);t.flipSided&&l.enable(12);t.useDepthPacking&&l.enable(13);t.dithering&&l.enable(14);t.transmission&&l.enable(15);t.sheen&&l.enable(16);t.opaque&&l.enable(17);t.pointsUvs&&l.enable(18);t.decodeVideoTexture&&l.enable(19);t.decodeVideoTextureEmissive&&l.enable(20);t.alphaToCoverage&&l.enable(21);e.push(l.mask)}(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()},getUniforms:function(e){const t=v[e.type];let n;if(t){const e=Vn[t];n=he.clone(e.uniforms)}else n=e.uniforms;return n},acquireProgram:function(t,n){let i=h.get(n);return void 0!==i?++i.usedTimes:(i=new Zr(e,n,t,o),f.push(i),h.set(n,i)),i},releaseProgram:function(e){if(0===--e.usedTimes){const t=f.indexOf(e);f[t]=f[f.length-1],f.pop(),h.delete(e.cacheKey),e.destroy()}},releaseShaderCache:function(e){d.remove(e)},programs:f,dispose:function(){d.dispose()}}}function ta(){let e=new WeakMap;return{has:function(t){return e.has(t)},get:function(t){let n=e.get(t);return void 0===n&&(n={},e.set(t,n)),n},remove:function(t){e.delete(t)},update:function(t,n,i){e.get(t)[n]=i},dispose:function(){e=new WeakMap}}}function na(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function ia(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function ra(){const e=[];let t=0;const n=[],i=[],r=[];function a(n,i,r,a,o,s){let l=e[t];return void 0===l?(l={id:n.id,object:n,geometry:i,material:r,groupOrder:a,renderOrder:n.renderOrder,z:o,group:s},e[t]=l):(l.id=n.id,l.object=n,l.geometry=i,l.material=r,l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=o,l.group=s),t++,l}return{opaque:n,transmissive:i,transparent:r,init:function(){t=0,n.length=0,i.length=0,r.length=0},push:function(e,t,o,s,l,c){const d=a(e,t,o,s,l,c);o.transmission>0?i.push(d):!0===o.transparent?r.push(d):n.push(d)},unshift:function(e,t,o,s,l,c){const d=a(e,t,o,s,l,c);o.transmission>0?i.unshift(d):!0===o.transparent?r.unshift(d):n.unshift(d)},finish:function(){for(let n=t,i=e.length;n<i;n++){const t=e[n];if(null===t.id)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}},sort:function(e,t){n.length>1&&n.sort(e||na),i.length>1&&i.sort(t||ia),r.length>1&&r.sort(t||ia)}}}function aa(){let e=new WeakMap;return{get:function(t,n){const i=e.get(t);let r;return void 0===i?(r=new ra,e.set(t,[r])):n>=i.length?(r=new ra,i.push(r)):r=i[n],r},dispose:function(){e=new WeakMap}}}function oa(){const e={};return{get:function(t){if(void 0!==e[t.id])return e[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new r,color:new n};break;case"SpotLight":i={position:new r,direction:new r,color:new n,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new r,color:new n,distance:0,decay:0};break;case"HemisphereLight":i={direction:new r,skyColor:new n,groundColor:new n};break;case"RectAreaLight":i={color:new n,position:new r,halfWidth:new r,halfHeight:new r}}return e[t.id]=i,i}}}let sa=0;function la(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function ca(e){const n=new oa,i=function(){const e={};return{get:function(n){if(void 0!==e[n.id])return e[n.id];let i;switch(n.type){case"DirectionalLight":case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new t};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new t,shadowCameraNear:1,shadowCameraFar:1e3}}return e[n.id]=i,i}}}(),a={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)a.probe.push(new r);const o=new r,s=new f,l=new f;return{setup:function(t){let r=0,o=0,s=0;for(let e=0;e<9;e++)a.probe[e].set(0,0,0);let l=0,c=0,d=0,u=0,f=0,p=0,m=0,h=0,_=0,g=0,v=0;t.sort(la);for(let e=0,E=t.length;e<E;e++){const E=t[e],S=E.color,T=E.intensity,M=E.distance;let x=null;if(E.shadow&&E.shadow.map&&(x=E.shadow.map.texture.format===Te?E.shadow.map.texture:E.shadow.map.depthTexture||E.shadow.map.texture),E.isAmbientLight)r+=S.r*T,o+=S.g*T,s+=S.b*T;else if(E.isLightProbe){for(let e=0;e<9;e++)a.probe[e].addScaledVector(E.sh.coefficients[e],T);v++}else if(E.isDirectionalLight){const e=n.get(E);if(e.color.copy(E.color).multiplyScalar(E.intensity),E.castShadow){const e=E.shadow,t=i.get(E);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,a.directionalShadow[l]=t,a.directionalShadowMap[l]=x,a.directionalShadowMatrix[l]=E.shadow.matrix,p++}a.directional[l]=e,l++}else if(E.isSpotLight){const e=n.get(E);e.position.setFromMatrixPosition(E.matrixWorld),e.color.copy(S).multiplyScalar(T),e.distance=M,e.coneCos=Math.cos(E.angle),e.penumbraCos=Math.cos(E.angle*(1-E.penumbra)),e.decay=E.decay,a.spot[d]=e;const t=E.shadow;if(E.map&&(a.spotLightMap[_]=E.map,_++,t.updateMatrices(E),E.castShadow&&g++),a.spotLightMatrix[d]=t.matrix,E.castShadow){const e=i.get(E);e.shadowIntensity=t.intensity,e.shadowBias=t.bias,e.shadowNormalBias=t.normalBias,e.shadowRadius=t.radius,e.shadowMapSize=t.mapSize,a.spotShadow[d]=e,a.spotShadowMap[d]=x,h++}d++}else if(E.isRectAreaLight){const e=n.get(E);e.color.copy(S).multiplyScalar(T),e.halfWidth.set(.5*E.width,0,0),e.halfHeight.set(0,.5*E.height,0),a.rectArea[u]=e,u++}else if(E.isPointLight){const e=n.get(E);if(e.color.copy(E.color).multiplyScalar(E.intensity),e.distance=E.distance,e.decay=E.decay,E.castShadow){const e=E.shadow,t=i.get(E);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,a.pointShadow[c]=t,a.pointShadowMap[c]=x,a.pointShadowMatrix[c]=E.shadow.matrix,m++}a.point[c]=e,c++}else if(E.isHemisphereLight){const e=n.get(E);e.skyColor.copy(E.color).multiplyScalar(T),e.groundColor.copy(E.groundColor).multiplyScalar(T),a.hemi[f]=e,f++}}u>0&&(!0===e.has("OES_texture_float_linear")?(a.rectAreaLTC1=Hn.LTC_FLOAT_1,a.rectAreaLTC2=Hn.LTC_FLOAT_2):(a.rectAreaLTC1=Hn.LTC_HALF_1,a.rectAreaLTC2=Hn.LTC_HALF_2)),a.ambient[0]=r,a.ambient[1]=o,a.ambient[2]=s;const E=a.hash;E.directionalLength===l&&E.pointLength===c&&E.spotLength===d&&E.rectAreaLength===u&&E.hemiLength===f&&E.numDirectionalShadows===p&&E.numPointShadows===m&&E.numSpotShadows===h&&E.numSpotMaps===_&&E.numLightProbes===v||(a.directional.length=l,a.spot.length=d,a.rectArea.length=u,a.point.length=c,a.hemi.length=f,a.directionalShadow.length=p,a.directionalShadowMap.length=p,a.pointShadow.length=m,a.pointShadowMap.length=m,a.spotShadow.length=h,a.spotShadowMap.length=h,a.directionalShadowMatrix.length=p,a.pointShadowMatrix.length=m,a.spotLightMatrix.length=h+_-g,a.spotLightMap.length=_,a.numSpotLightShadowsWithMaps=g,a.numLightProbes=v,E.directionalLength=l,E.pointLength=c,E.spotLength=d,E.rectAreaLength=u,E.hemiLength=f,E.numDirectionalShadows=p,E.numPointShadows=m,E.numSpotShadows=h,E.numSpotMaps=_,E.numLightProbes=v,a.version=sa++)},setupView:function(e,t){let n=0,i=0,r=0,c=0,d=0;const u=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){const f=e[t];if(f.isDirectionalLight){const e=a.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),o.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(o),e.direction.transformDirection(u),n++}else if(f.isSpotLight){const e=a.spot[r];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(u),e.direction.setFromMatrixPosition(f.matrixWorld),o.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(o),e.direction.transformDirection(u),r++}else if(f.isRectAreaLight){const e=a.rectArea[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(u),l.identity(),s.copy(f.matrixWorld),s.premultiply(u),l.extractRotation(s),e.halfWidth.set(.5*f.width,0,0),e.halfHeight.set(0,.5*f.height,0),e.halfWidth.applyMatrix4(l),e.halfHeight.applyMatrix4(l),c++}else if(f.isPointLight){const e=a.point[i];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(u),i++}else if(f.isHemisphereLight){const e=a.hemi[d];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(u),d++}}},state:a}}function da(e){const t=new ca(e),n=[],i=[];const r={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:function(e){r.camera=e,n.length=0,i.length=0},state:r,setupLights:function(){t.setup(n)},setupLightsView:function(e){t.setupView(n,e)},pushLight:function(e){n.push(e)},pushShadow:function(e){i.push(e)}}}function ua(e){let t=new WeakMap;return{get:function(n,i=0){const r=t.get(n);let a;return void 0===r?(a=new da(e),t.set(n,[a])):i>=r.length?(a=new da(e),r.push(a)):a=r[i],a},dispose:function(){t=new WeakMap}}}const fa=[new r(1,0,0),new r(-1,0,0),new r(0,1,0),new r(0,-1,0),new r(0,0,1),new r(0,0,-1)],pa=[new r(0,-1,0),new r(0,-1,0),new r(0,0,1),new r(0,0,-1),new r(0,-1,0),new r(0,-1,0)],ma=new f,ha=new r,_a=new r;function ga(e,n,i){let r=new Me;const a=new t,s=new t,d=new X,u=new xe,f=new Ae,p={},m=i.maxTextureSize,h={[_]:c,[c]:_,[_e]:_e},g=new l({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new t},radius:{value:4}},vertexShader:"void main() {\n\tgl_Position = vec4( position, 1.0 );\n}",fragmentShader:"uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\nvoid main() {\n\tconst float samples = float( VSM_SAMPLES );\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\tfloat uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n\tfloat uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n\tfor ( float i = 0.0; i < samples; i ++ ) {\n\t\tfloat uvOffset = uvStart + i * uvStride;\n\t\t#ifdef HORIZONTAL_PASS\n\t\t\tvec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\t\t#else\n\t\t\tfloat depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\t\t#endif\n\t}\n\tmean = mean / samples;\n\tsquared_mean = squared_mean / samples;\n\tfloat std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );\n\tgl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );\n}"}),v=g.clone();v.defines.HORIZONTAL_PASS=1;const T=new U;T.setAttribute("position",new B(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new o(T,g),A=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=de;let R=this.type;function b(t,i){const r=n.update(x);g.defines.VSM_SAMPLES!==t.blurSamples&&(g.defines.VSM_SAMPLES=t.blurSamples,v.defines.VSM_SAMPLES=t.blurSamples,g.needsUpdate=!0,v.needsUpdate=!0),null===t.mapPass&&(t.mapPass=new O(a.x,a.y,{format:Te,type:S})),g.uniforms.shadow_pass.value=t.map.depthTexture,g.uniforms.resolution.value=t.mapSize,g.uniforms.radius.value=t.radius,e.setRenderTarget(t.mapPass),e.clear(),e.renderBufferDirect(i,null,r,g,x,null),v.uniforms.shadow_pass.value=t.mapPass.texture,v.uniforms.resolution.value=t.mapSize,v.uniforms.radius.value=t.radius,e.setRenderTarget(t.map),e.clear(),e.renderBufferDirect(i,null,r,v,x,null)}function P(t,n,i,r){let a=null;const o=!0===i.isPointLight?t.customDistanceMaterial:t.customDepthMaterial;if(void 0!==o)a=o;else if(a=!0===i.isPointLight?f:u,e.localClippingEnabled&&!0===n.clipShadows&&Array.isArray(n.clippingPlanes)&&0!==n.clippingPlanes.length||n.displacementMap&&0!==n.displacementScale||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||!0===n.alphaToCoverage){const e=a.uuid,t=n.uuid;let i=p[e];void 0===i&&(i={},p[e]=i);let r=i[t];void 0===r&&(r=a.clone(),i[t]=r,n.addEventListener("dispose",D)),a=r}if(a.visible=n.visible,a.wireframe=n.wireframe,a.side=r===ce?null!==n.shadowSide?n.shadowSide:n.side:null!==n.shadowSide?n.shadowSide:h[n.side],a.alphaMap=n.alphaMap,a.alphaTest=!0===n.alphaToCoverage?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,!0===i.isPointLight&&!0===a.isMeshDistanceMaterial){e.properties.get(a).light=i}return a}function L(t,i,a,o,s){if(!1===t.visible)return;if(t.layers.test(i.layers)&&(t.isMesh||t.isLine||t.isPoints)&&(t.castShadow||t.receiveShadow&&s===ce)&&(!t.frustumCulled||r.intersectsObject(t))){t.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,t.matrixWorld);const r=n.update(t),l=t.material;if(Array.isArray(l)){const n=r.groups;for(let c=0,d=n.length;c<d;c++){const d=n[c],u=l[d.materialIndex];if(u&&u.visible){const n=P(t,u,o,s);t.onBeforeShadow(e,t,i,a,r,n,d),e.renderBufferDirect(a,null,r,n,t,d),t.onAfterShadow(e,t,i,a,r,n,d)}}}else if(l.visible){const n=P(t,l,o,s);t.onBeforeShadow(e,t,i,a,r,n,null),e.renderBufferDirect(a,null,r,n,t,null),t.onAfterShadow(e,t,i,a,r,n,null)}}const l=t.children;for(let e=0,t=l.length;e<t;e++)L(l[e],i,a,o,s)}function D(e){e.target.removeEventListener("dispose",D);for(const t in p){const n=p[t],i=e.target.uuid;if(i in n){n[i].dispose(),delete n[i]}}}this.render=function(t,n,i){if(!1===A.enabled)return;if(!1===A.autoUpdate&&!1===A.needsUpdate)return;if(0===t.length)return;t.type===Re&&(E("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),t.type=de);const o=e.getRenderTarget(),l=e.getActiveCubeFace(),c=e.getActiveMipmapLevel(),u=e.state;u.setBlending(F),!0===u.buffers.depth.getReversed()?u.buffers.color.setClear(0,0,0,0):u.buffers.color.setClear(1,1,1,1),u.buffers.depth.setTest(!0),u.setScissorTest(!1);const f=R!==this.type;f&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let o=0,l=t.length;o<l;o++){const l=t[o],c=l.shadow;if(void 0===c){E("WebGLShadowMap:",l,"has no shadow.");continue}if(!1===c.autoUpdate&&!1===c.needsUpdate)continue;a.copy(c.mapSize);const p=c.getFrameExtents();if(a.multiply(p),s.copy(c.mapSize),(a.x>m||a.y>m)&&(a.x>m&&(s.x=Math.floor(m/p.x),a.x=s.x*p.x,c.mapSize.x=s.x),a.y>m&&(s.y=Math.floor(m/p.y),a.y=s.y*p.y,c.mapSize.y=s.y)),null===c.map||!0===f){if(null!==c.map&&(null!==c.map.depthTexture&&(c.map.depthTexture.dispose(),c.map.depthTexture=null),c.map.dispose()),this.type===ce){if(l.isPointLight){E("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}c.map=new O(a.x,a.y,{format:Te,type:S,minFilter:H,magFilter:H,generateMipmaps:!1}),c.map.texture.name=l.name+".shadowMap",c.map.depthTexture=new oe(a.x,a.y,M),c.map.depthTexture.name=l.name+".shadowMapDepth",c.map.depthTexture.format=be,c.map.depthTexture.compareFunction=null,c.map.depthTexture.minFilter=Ce,c.map.depthTexture.magFilter=Ce}else{l.isPointLight?(c.map=new C(a.x),c.map.depthTexture=new Pe(a.x,Le)):(c.map=new O(a.x,a.y),c.map.depthTexture=new oe(a.x,a.y,Le)),c.map.depthTexture.name=l.name+".shadowMap",c.map.depthTexture.format=be;const t=e.state.buffers.depth.getReversed();this.type===de?(c.map.depthTexture.compareFunction=t?re:ae,c.map.depthTexture.minFilter=H,c.map.depthTexture.magFilter=H):(c.map.depthTexture.compareFunction=null,c.map.depthTexture.minFilter=Ce,c.map.depthTexture.magFilter=Ce)}c.camera.updateProjectionMatrix()}const h=c.map.isWebGLCubeRenderTarget?6:1;for(let t=0;t<h;t++){if(c.map.isWebGLCubeRenderTarget)e.setRenderTarget(c.map,t),e.clear();else{0===t&&(e.setRenderTarget(c.map),e.clear());const n=c.getViewport(t);d.set(s.x*n.x,s.y*n.y,s.x*n.z,s.y*n.w),u.viewport(d)}if(l.isPointLight){const e=c.camera,n=c.matrix,i=l.distance||e.far;i!==e.far&&(e.far=i,e.updateProjectionMatrix()),ha.setFromMatrixPosition(l.matrixWorld),e.position.copy(ha),_a.copy(e.position),_a.add(fa[t]),e.up.copy(pa[t]),e.lookAt(_a),e.updateMatrixWorld(),n.makeTranslation(-ha.x,-ha.y,-ha.z),ma.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),c._frustum.setFromProjectionMatrix(ma,e.coordinateSystem,e.reversedDepth)}else c.updateMatrices(l);r=c.getFrustum(),L(n,i,c.camera,l,this.type)}!0!==c.isPointLightShadow&&this.type===ce&&b(c,i),c.needsUpdate=!1}R=this.type,A.needsUpdate=!1,e.setRenderTarget(o,l,c)}}const va={[tt]:et,[Je]:Ze,[Qe]:je,[Ue]:$e,[et]:tt,[Ze]:Je,[je]:Qe,[$e]:Ue};function Ea(e,t){const i=new function(){let t=!1;const n=new X;let i=null;const r=new X(0,0,0,0);return{setMask:function(n){i===n||t||(e.colorMask(n,n,n,n),i=n)},setLocked:function(e){t=e},setClear:function(t,i,a,o,s){!0===s&&(t*=o,i*=o,a*=o),n.set(t,i,a,o),!1===r.equals(n)&&(e.clearColor(t,i,a,o),r.copy(n))},reset:function(){t=!1,i=null,r.set(-1,0,0,0)}}},r=new function(){let n=!1,i=!1,r=null,a=null,o=null;return{setReversed:function(e){if(i!==e){const n=t.get("EXT_clip_control");e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),i=e;const r=o;o=null,this.setClear(r)}},getReversed:function(){return i},setTest:function(t){t?z(e.DEPTH_TEST):Y(e.DEPTH_TEST)},setMask:function(t){r===t||n||(e.depthMask(t),r=t)},setFunc:function(t){if(i&&(t=va[t]),a!==t){switch(t){case tt:e.depthFunc(e.NEVER);break;case et:e.depthFunc(e.ALWAYS);break;case Je:e.depthFunc(e.LESS);break;case Ue:e.depthFunc(e.LEQUAL);break;case Qe:e.depthFunc(e.EQUAL);break;case $e:e.depthFunc(e.GEQUAL);break;case Ze:e.depthFunc(e.GREATER);break;case je:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(i&&(t=1-t),e.clearDepth(t),o=t)},reset:function(){n=!1,r=null,a=null,o=null,i=!1}}},a=new function(){let t=!1,n=null,i=null,r=null,a=null,o=null,s=null,l=null,c=null;return{setTest:function(n){t||(n?z(e.STENCIL_TEST):Y(e.STENCIL_TEST))},setMask:function(i){n===i||t||(e.stencilMask(i),n=i)},setFunc:function(t,n,o){i===t&&r===n&&a===o||(e.stencilFunc(t,n,o),i=t,r=n,a=o)},setOp:function(t,n,i){o===t&&s===n&&l===i||(e.stencilOp(t,n,i),o=t,s=n,l=i)},setLocked:function(e){t=e},setClear:function(t){c!==t&&(e.clearStencil(t),c=t)},reset:function(){t=!1,n=null,i=null,r=null,a=null,o=null,s=null,l=null,c=null}}},o=new WeakMap,s=new WeakMap;let l={},d={},u=new WeakMap,f=[],p=null,m=!1,h=null,_=null,g=null,v=null,E=null,S=null,T=null,M=new n(0,0,0),x=0,A=!1,R=null,b=null,C=null,P=null,L=null;const U=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let D=!1,w=0;const I=e.getParameter(e.VERSION);-1!==I.indexOf("WebGL")?(w=parseFloat(/^WebGL (\d)/.exec(I)[1]),D=w>=1):-1!==I.indexOf("OpenGL ES")&&(w=parseFloat(/^OpenGL ES (\d)/.exec(I)[1]),D=w>=2);let N=null,O={};const B=e.getParameter(e.SCISSOR_BOX),G=e.getParameter(e.VIEWPORT),H=(new X).fromArray(B),V=(new X).fromArray(G);function W(t,n,i,r){const a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<i;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,r,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}const k={};function z(t){!0!==l[t]&&(e.enable(t),l[t]=!0)}function Y(t){!1!==l[t]&&(e.disable(t),l[t]=!1)}k[e.TEXTURE_2D]=W(e.TEXTURE_2D,e.TEXTURE_2D,1),k[e.TEXTURE_CUBE_MAP]=W(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),k[e.TEXTURE_2D_ARRAY]=W(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),k[e.TEXTURE_3D]=W(e.TEXTURE_3D,e.TEXTURE_3D,1,1),i.setClear(0,0,0,1),r.setClear(1),a.setClear(0),z(e.DEPTH_TEST),r.setFunc(Ue),Z(!1),$(it),z(e.CULL_FACE),j(F);const K={[Ie]:e.FUNC_ADD,[we]:e.FUNC_SUBTRACT,[De]:e.FUNC_REVERSE_SUBTRACT};K[ct]=e.MIN,K[dt]=e.MAX;const q={[qe]:e.ZERO,[Ke]:e.ONE,[Ye]:e.SRC_COLOR,[Xe]:e.SRC_ALPHA,[ze]:e.SRC_ALPHA_SATURATE,[ke]:e.DST_COLOR,[We]:e.DST_ALPHA,[Ve]:e.ONE_MINUS_SRC_COLOR,[He]:e.ONE_MINUS_SRC_ALPHA,[Ge]:e.ONE_MINUS_DST_COLOR,[Be]:e.ONE_MINUS_DST_ALPHA,[Oe]:e.CONSTANT_COLOR,[Fe]:e.ONE_MINUS_CONSTANT_COLOR,[ye]:e.CONSTANT_ALPHA,[Ne]:e.ONE_MINUS_CONSTANT_ALPHA};function j(t,n,i,r,a,o,s,l,c,d){if(t!==F){if(!1===m&&(z(e.BLEND),m=!0),t===at)a=a||n,o=o||i,s=s||r,n===_&&a===E||(e.blendEquationSeparate(K[n],K[a]),_=n,E=a),i===g&&r===v&&o===S&&s===T||(e.blendFuncSeparate(q[i],q[r],q[o],q[s]),g=i,v=r,S=o,T=s),!1!==l.equals(M)&&c===x||(e.blendColor(l.r,l.g,l.b,c),M.copy(l),x=c),h=t,A=!1;else if(t!==h||d!==A){if(_===Ie&&E===Ie||(e.blendEquation(e.FUNC_ADD),_=Ie,E=Ie),d)switch(t){case ge:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case lt:e.blendFunc(e.ONE,e.ONE);break;case st:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case ot:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:y("WebGLState: Invalid blending: ",t)}else switch(t){case ge:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case lt:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case st:y("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ot:y("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:y("WebGLState: Invalid blending: ",t)}g=null,v=null,S=null,T=null,M.set(0,0,0),x=0,h=t,A=d}}else!0===m&&(Y(e.BLEND),m=!1)}function Z(t){R!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),R=t)}function $(t){t!==nt?(z(e.CULL_FACE),t!==b&&(t===it?e.cullFace(e.BACK):t===rt?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Y(e.CULL_FACE),b=t}function Q(t,n,i){t?(z(e.POLYGON_OFFSET_FILL),P===n&&L===i||(e.polygonOffset(n,i),P=n,L=i)):Y(e.POLYGON_OFFSET_FILL)}return{buffers:{color:i,depth:r,stencil:a},enable:z,disable:Y,bindFramebuffer:function(t,n){return d[t]!==n&&(e.bindFramebuffer(t,n),d[t]=n,t===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=n),!0)},drawBuffers:function(t,n){let i=f,r=!1;if(t){i=u.get(n),void 0===i&&(i=[],u.set(n,i));const a=t.textures;if(i.length!==a.length||i[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)i[t]=e.COLOR_ATTACHMENT0+t;i.length=a.length,r=!0}}else i[0]!==e.BACK&&(i[0]=e.BACK,r=!0);r&&e.drawBuffers(i)},useProgram:function(t){return p!==t&&(e.useProgram(t),p=t,!0)},setBlending:j,setMaterial:function(t,n){t.side===_e?Y(e.CULL_FACE):z(e.CULL_FACE);let o=t.side===c;n&&(o=!o),Z(o),t.blending===ge&&!1===t.transparent?j(F):j(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),r.setFunc(t.depthFunc),r.setTest(t.depthTest),r.setMask(t.depthWrite),i.setMask(t.colorWrite);const s=t.stencilWrite;a.setTest(s),s&&(a.setMask(t.stencilWriteMask),a.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),a.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Q(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),!0===t.alphaToCoverage?z(e.SAMPLE_ALPHA_TO_COVERAGE):Y(e.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:Z,setCullFace:$,setLineWidth:function(t){t!==C&&(D&&e.lineWidth(t),C=t)},setPolygonOffset:Q,setScissorTest:function(t){t?z(e.SCISSOR_TEST):Y(e.SCISSOR_TEST)},activeTexture:function(t){void 0===t&&(t=e.TEXTURE0+U-1),N!==t&&(e.activeTexture(t),N=t)},bindTexture:function(t,n,i){void 0===i&&(i=null===N?e.TEXTURE0+U-1:N);let r=O[i];void 0===r&&(r={type:void 0,texture:void 0},O[i]=r),r.type===t&&r.texture===n||(N!==i&&(e.activeTexture(i),N=i),e.bindTexture(t,n||k[t]),r.type=t,r.texture=n)},unbindTexture:function(){const t=O[N];void 0!==t&&void 0!==t.type&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)},compressedTexImage2D:function(){try{e.compressedTexImage2D(...arguments)}catch(e){y("WebGLState:",e)}},compressedTexImage3D:function(){try{e.compressedTexImage3D(...arguments)}catch(e){y("WebGLState:",e)}},texImage2D:function(){try{e.texImage2D(...arguments)}catch(e){y("WebGLState:",e)}},texImage3D:function(){try{e.texImage3D(...arguments)}catch(e){y("WebGLState:",e)}},updateUBOMapping:function(t,n){let i=s.get(n);void 0===i&&(i=new WeakMap,s.set(n,i));let r=i.get(t);void 0===r&&(r=e.getUniformBlockIndex(n,t.name),i.set(t,r))},uniformBlockBinding:function(t,n){const i=s.get(n).get(t);o.get(n)!==i&&(e.uniformBlockBinding(n,i,t.__bindingPointIndex),o.set(n,i))},texStorage2D:function(){try{e.texStorage2D(...arguments)}catch(e){y("WebGLState:",e)}},texStorage3D:function(){try{e.texStorage3D(...arguments)}catch(e){y("WebGLState:",e)}},texSubImage2D:function(){try{e.texSubImage2D(...arguments)}catch(e){y("WebGLState:",e)}},texSubImage3D:function(){try{e.texSubImage3D(...arguments)}catch(e){y("WebGLState:",e)}},compressedTexSubImage2D:function(){try{e.compressedTexSubImage2D(...arguments)}catch(e){y("WebGLState:",e)}},compressedTexSubImage3D:function(){try{e.compressedTexSubImage3D(...arguments)}catch(e){y("WebGLState:",e)}},scissor:function(t){!1===H.equals(t)&&(e.scissor(t.x,t.y,t.z,t.w),H.copy(t))},viewport:function(t){!1===V.equals(t)&&(e.viewport(t.x,t.y,t.z,t.w),V.copy(t))},reset:function(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),l={},N=null,O={},d={},u=new WeakMap,f=[],p=null,m=!1,h=null,_=null,g=null,v=null,E=null,S=null,T=null,M=new n(0,0,0),x=0,A=!1,R=null,b=null,C=null,P=null,L=null,H.set(0,0,e.canvas.width,e.canvas.height),V.set(0,0,e.canvas.width,e.canvas.height),i.reset(),r.reset(),a.reset()}}}function Sa(e,n,i,r,a,o,s){const l=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,c="undefined"!=typeof navigator&&/OculusBrowser/g.test(navigator.userAgent),d=new t,u=new WeakMap;let f;const h=new WeakMap;let _=!1;try{_="undefined"!=typeof OffscreenCanvas&&null!==new OffscreenCanvas(1,1).getContext("2d")}catch(e){}function g(e,t){return _?new OffscreenCanvas(e,t):Lt("canvas")}function v(e,t,n){let i=1;const r=J(e);if((r.width>n||r.height>n)&&(i=n/Math.max(r.width,r.height)),i<1){if("undefined"!=typeof HTMLImageElement&&e instanceof HTMLImageElement||"undefined"!=typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||"undefined"!=typeof ImageBitmap&&e instanceof ImageBitmap||"undefined"!=typeof VideoFrame&&e instanceof VideoFrame){const n=Math.floor(i*r.width),a=Math.floor(i*r.height);void 0===f&&(f=g(n,a));const o=t?g(n,a):f;o.width=n,o.height=a;return o.getContext("2d").drawImage(e,0,0,n,a),E("WebGLRenderer: Texture has been resized from ("+r.width+"x"+r.height+") to ("+n+"x"+a+")."),o}return"data"in e&&E("WebGLRenderer: Image in DataTexture is too big ("+r.width+"x"+r.height+")."),e}return e}function S(e){return e.generateMipmaps}function A(t){e.generateMipmap(t)}function R(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(t,i,r,a,o=!1){if(null!==t){if(void 0!==e[t])return e[t];E("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+t+"'")}let s=i;if(i===e.RED&&(r===e.FLOAT&&(s=e.R32F),r===e.HALF_FLOAT&&(s=e.R16F),r===e.UNSIGNED_BYTE&&(s=e.R8)),i===e.RED_INTEGER&&(r===e.UNSIGNED_BYTE&&(s=e.R8UI),r===e.UNSIGNED_SHORT&&(s=e.R16UI),r===e.UNSIGNED_INT&&(s=e.R32UI),r===e.BYTE&&(s=e.R8I),r===e.SHORT&&(s=e.R16I),r===e.INT&&(s=e.R32I)),i===e.RG&&(r===e.FLOAT&&(s=e.RG32F),r===e.HALF_FLOAT&&(s=e.RG16F),r===e.UNSIGNED_BYTE&&(s=e.RG8)),i===e.RG_INTEGER&&(r===e.UNSIGNED_BYTE&&(s=e.RG8UI),r===e.UNSIGNED_SHORT&&(s=e.RG16UI),r===e.UNSIGNED_INT&&(s=e.RG32UI),r===e.BYTE&&(s=e.RG8I),r===e.SHORT&&(s=e.RG16I),r===e.INT&&(s=e.RG32I)),i===e.RGB_INTEGER&&(r===e.UNSIGNED_BYTE&&(s=e.RGB8UI),r===e.UNSIGNED_SHORT&&(s=e.RGB16UI),r===e.UNSIGNED_INT&&(s=e.RGB32UI),r===e.BYTE&&(s=e.RGB8I),r===e.SHORT&&(s=e.RGB16I),r===e.INT&&(s=e.RGB32I)),i===e.RGBA_INTEGER&&(r===e.UNSIGNED_BYTE&&(s=e.RGBA8UI),r===e.UNSIGNED_SHORT&&(s=e.RGBA16UI),r===e.UNSIGNED_INT&&(s=e.RGBA32UI),r===e.BYTE&&(s=e.RGBA8I),r===e.SHORT&&(s=e.RGBA16I),r===e.INT&&(s=e.RGBA32I)),i===e.RGB&&(r===e.UNSIGNED_INT_5_9_9_9_REV&&(s=e.RGB9_E5),r===e.UNSIGNED_INT_10F_11F_11F_REV&&(s=e.R11F_G11F_B10F)),i===e.RGBA){const t=o?me:p.getTransfer(a);r===e.FLOAT&&(s=e.RGBA32F),r===e.HALF_FLOAT&&(s=e.RGBA16F),r===e.UNSIGNED_BYTE&&(s=t===m?e.SRGB8_ALPHA8:e.RGBA8),r===e.UNSIGNED_SHORT_4_4_4_4&&(s=e.RGBA4),r===e.UNSIGNED_SHORT_5_5_5_1&&(s=e.RGB5_A1)}return s!==e.R16F&&s!==e.R32F&&s!==e.RG16F&&s!==e.RG32F&&s!==e.RGBA16F&&s!==e.RGBA32F||n.get("EXT_color_buffer_float"),s}function C(t,n){let i;return t?null===n||n===Le||n===Ct?i=e.DEPTH24_STENCIL8:n===M?i=e.DEPTH32F_STENCIL8:n===Pt&&(i=e.DEPTH24_STENCIL8,E("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):null===n||n===Le||n===Ct?i=e.DEPTH_COMPONENT24:n===M?i=e.DEPTH_COMPONENT32F:n===Pt&&(i=e.DEPTH_COMPONENT16),i}function P(e,t){return!0===S(e)||e.isFramebufferTexture&&e.minFilter!==Ce&&e.minFilter!==H?Math.log2(Math.max(t.width,t.height))+1:void 0!==e.mipmaps&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function L(e){const t=e.target;t.removeEventListener("dispose",L),function(e){const t=r.get(e);if(void 0===t.__webglInit)return;const n=e.source,i=h.get(n);if(i){const r=i[t.__cacheKey];r.usedTimes--,0===r.usedTimes&&D(e),0===Object.keys(i).length&&h.delete(n)}r.remove(e)}(t),t.isVideoTexture&&u.delete(t)}function U(t){const n=t.target;n.removeEventListener("dispose",U),function(t){const n=r.get(t);t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture));if(t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let i=0;i<n.__webglFramebuffer[t].length;i++)e.deleteFramebuffer(n.__webglFramebuffer[t][i]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}const i=t.textures;for(let t=0,n=i.length;t<n;t++){const n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),s.memory.textures--),r.remove(i[t])}r.remove(t)}(n)}function D(t){const n=r.get(t);e.deleteTexture(n.__webglTexture);const i=t.source;delete h.get(i)[n.__cacheKey],s.memory.textures--}let w=0;function I(t,n){const a=r.get(t);if(t.isVideoTexture&&function(e){const t=s.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}(t),!1===t.isRenderTargetTexture&&!0!==t.isExternalTexture&&t.version>0&&a.__version!==t.version){const e=t.image;if(null===e)E("WebGLRenderer: Texture marked for update but no image data found.");else{if(!1!==e.complete)return void k(a,t,n);E("WebGLRenderer: Texture marked for update but image is incomplete")}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);i.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+n)}const N={[pt]:e.REPEAT,[ft]:e.CLAMP_TO_EDGE,[ut]:e.MIRRORED_REPEAT},F={[Ce]:e.NEAREST,[gt]:e.NEAREST_MIPMAP_NEAREST,[_t]:e.NEAREST_MIPMAP_LINEAR,[H]:e.LINEAR,[ht]:e.LINEAR_MIPMAP_NEAREST,[mt]:e.LINEAR_MIPMAP_LINEAR},O={[xt]:e.NEVER,[Mt]:e.ALWAYS,[Tt]:e.LESS,[ae]:e.LEQUAL,[St]:e.EQUAL,[re]:e.GEQUAL,[Et]:e.GREATER,[vt]:e.NOTEQUAL};function B(t,i){if(i.type!==M||!1!==n.has("OES_texture_float_linear")||i.magFilter!==H&&i.magFilter!==ht&&i.magFilter!==_t&&i.magFilter!==mt&&i.minFilter!==H&&i.minFilter!==ht&&i.minFilter!==_t&&i.minFilter!==mt||E("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(t,e.TEXTURE_WRAP_S,N[i.wrapS]),e.texParameteri(t,e.TEXTURE_WRAP_T,N[i.wrapT]),t!==e.TEXTURE_3D&&t!==e.TEXTURE_2D_ARRAY||e.texParameteri(t,e.TEXTURE_WRAP_R,N[i.wrapR]),e.texParameteri(t,e.TEXTURE_MAG_FILTER,F[i.magFilter]),e.texParameteri(t,e.TEXTURE_MIN_FILTER,F[i.minFilter]),i.compareFunction&&(e.texParameteri(t,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(t,e.TEXTURE_COMPARE_FUNC,O[i.compareFunction])),!0===n.has("EXT_texture_filter_anisotropic")){if(i.magFilter===Ce)return;if(i.minFilter!==_t&&i.minFilter!==mt)return;if(i.type===M&&!1===n.has("OES_texture_float_linear"))return;if(i.anisotropy>1||r.get(i).__currentAnisotropy){const o=n.get("EXT_texture_filter_anisotropic");e.texParameterf(t,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(i.anisotropy,a.getMaxAnisotropy())),r.get(i).__currentAnisotropy=i.anisotropy}}}function V(t,n){let i=!1;void 0===t.__webglInit&&(t.__webglInit=!0,n.addEventListener("dispose",L));const r=n.source;let a=h.get(r);void 0===a&&(a={},h.set(r,a));const o=function(e){const t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}(n);if(o!==t.__cacheKey){void 0===a[o]&&(a[o]={texture:e.createTexture(),usedTimes:0},s.memory.textures++,i=!0),a[o].usedTimes++;const r=a[t.__cacheKey];void 0!==r&&(a[t.__cacheKey].usedTimes--,0===r.usedTimes&&D(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return i}function W(e,t,n){return Math.floor(Math.floor(e/n)/t)}function k(t,n,s){let l=e.TEXTURE_2D;(n.isDataArrayTexture||n.isCompressedArrayTexture)&&(l=e.TEXTURE_2D_ARRAY),n.isData3DTexture&&(l=e.TEXTURE_3D);const c=V(t,n),d=n.source;i.bindTexture(l,t.__webglTexture,e.TEXTURE0+s);const u=r.get(d);if(d.version!==u.__version||!0===c){i.activeTexture(e.TEXTURE0+s);const t=p.getPrimaries(p.workingColorSpace),r=n.colorSpace===At?null:p.getPrimaries(n.colorSpace),f=n.colorSpace===At||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,f);let m=v(n.image,!1,a.maxTextureSize);m=Q(n,m);const h=o.convert(n.format,n.colorSpace),_=o.convert(n.type);let g,T=b(n.internalFormat,h,_,n.colorSpace,n.isVideoTexture);B(l,n);const M=n.mipmaps,R=!0!==n.isVideoTexture,L=void 0===u.__version||!0===c,U=d.dataReady,D=P(n,m);if(n.isDepthTexture)T=C(n.format===Rt,n.type),L&&(R?i.texStorage2D(e.TEXTURE_2D,1,T,m.width,m.height):i.texImage2D(e.TEXTURE_2D,0,T,m.width,m.height,0,h,_,null));else if(n.isDataTexture)if(M.length>0){R&&L&&i.texStorage2D(e.TEXTURE_2D,D,T,M[0].width,M[0].height);for(let t=0,n=M.length;t<n;t++)g=M[t],R?U&&i.texSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,h,_,g.data):i.texImage2D(e.TEXTURE_2D,t,T,g.width,g.height,0,h,_,g.data);n.generateMipmaps=!1}else R?(L&&i.texStorage2D(e.TEXTURE_2D,D,T,m.width,m.height),U&&function(t,n,r,a){const o=t.updateRanges;if(0===o.length)i.texSubImage2D(e.TEXTURE_2D,0,0,0,n.width,n.height,r,a,n.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){const t=o[s],i=o[e],r=t.start+t.count,a=W(i.start,n.width,4),l=W(t.start,n.width,4);i.start<=r+1&&a===l&&W(i.start+i.count-1,n.width,4)===a?t.count=Math.max(t.count,i.start+i.count-t.start):(++s,o[s]=i)}o.length=s+1;const l=e.getParameter(e.UNPACK_ROW_LENGTH),c=e.getParameter(e.UNPACK_SKIP_PIXELS),d=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,n.width);for(let t=0,s=o.length;t<s;t++){const s=o[t],l=Math.floor(s.start/4),c=Math.ceil(s.count/4),d=l%n.width,u=Math.floor(l/n.width),f=c,p=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,d),e.pixelStorei(e.UNPACK_SKIP_ROWS,u),i.texSubImage2D(e.TEXTURE_2D,0,d,u,f,p,r,a,n.data)}t.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,l),e.pixelStorei(e.UNPACK_SKIP_PIXELS,c),e.pixelStorei(e.UNPACK_SKIP_ROWS,d)}}(n,m,h,_)):i.texImage2D(e.TEXTURE_2D,0,T,m.width,m.height,0,h,_,m.data);else if(n.isCompressedTexture)if(n.isCompressedArrayTexture){R&&L&&i.texStorage3D(e.TEXTURE_2D_ARRAY,D,T,M[0].width,M[0].height,m.depth);for(let t=0,r=M.length;t<r;t++)if(g=M[t],n.format!==x)if(null!==h)if(R){if(U)if(n.layerUpdates.size>0){const r=bt(g.width,g.height,n.format,n.type);for(const a of n.layerUpdates){const n=g.data.subarray(a*r/g.data.BYTES_PER_ELEMENT,(a+1)*r/g.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,a,g.width,g.height,1,h,n)}n.clearLayerUpdates()}else i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,0,g.width,g.height,m.depth,h,g.data)}else i.compressedTexImage3D(e.TEXTURE_2D_ARRAY,t,T,g.width,g.height,m.depth,0,g.data,0,0);else E("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else R?U&&i.texSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,0,g.width,g.height,m.depth,h,_,g.data):i.texImage3D(e.TEXTURE_2D_ARRAY,t,T,g.width,g.height,m.depth,0,h,_,g.data)}else{R&&L&&i.texStorage2D(e.TEXTURE_2D,D,T,M[0].width,M[0].height);for(let t=0,r=M.length;t<r;t++)g=M[t],n.format!==x?null!==h?R?U&&i.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,h,g.data):i.compressedTexImage2D(e.TEXTURE_2D,t,T,g.width,g.height,0,g.data):E("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):R?U&&i.texSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,h,_,g.data):i.texImage2D(e.TEXTURE_2D,t,T,g.width,g.height,0,h,_,g.data)}else if(n.isDataArrayTexture)if(R){if(L&&i.texStorage3D(e.TEXTURE_2D_ARRAY,D,T,m.width,m.height,m.depth),U)if(n.layerUpdates.size>0){const t=bt(m.width,m.height,n.format,n.type);for(const r of n.layerUpdates){const n=m.data.subarray(r*t/m.data.BYTES_PER_ELEMENT,(r+1)*t/m.data.BYTES_PER_ELEMENT);i.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,r,m.width,m.height,1,h,_,n)}n.clearLayerUpdates()}else i.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,m.width,m.height,m.depth,h,_,m.data)}else i.texImage3D(e.TEXTURE_2D_ARRAY,0,T,m.width,m.height,m.depth,0,h,_,m.data);else if(n.isData3DTexture)R?(L&&i.texStorage3D(e.TEXTURE_3D,D,T,m.width,m.height,m.depth),U&&i.texSubImage3D(e.TEXTURE_3D,0,0,0,0,m.width,m.height,m.depth,h,_,m.data)):i.texImage3D(e.TEXTURE_3D,0,T,m.width,m.height,m.depth,0,h,_,m.data);else if(n.isFramebufferTexture){if(L)if(R)i.texStorage2D(e.TEXTURE_2D,D,T,m.width,m.height);else{let t=m.width,n=m.height;for(let r=0;r<D;r++)i.texImage2D(e.TEXTURE_2D,r,T,t,n,0,h,_,null),t>>=1,n>>=1}}else if(M.length>0){if(R&&L){const t=J(M[0]);i.texStorage2D(e.TEXTURE_2D,D,T,t.width,t.height)}for(let t=0,n=M.length;t<n;t++)g=M[t],R?U&&i.texSubImage2D(e.TEXTURE_2D,t,0,0,h,_,g):i.texImage2D(e.TEXTURE_2D,t,T,h,_,g);n.generateMipmaps=!1}else if(R){if(L){const t=J(m);i.texStorage2D(e.TEXTURE_2D,D,T,t.width,t.height)}U&&i.texSubImage2D(e.TEXTURE_2D,0,0,0,h,_,m)}else i.texImage2D(e.TEXTURE_2D,0,T,h,_,m);S(n)&&A(l),u.__version=d.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function z(t,n,a,s,c,d){const u=o.convert(a.format,a.colorSpace),f=o.convert(a.type),p=b(a.internalFormat,u,f,a.colorSpace),m=r.get(n),h=r.get(a);if(h.__renderTarget=n,!m.__hasExternalTextures){const t=Math.max(1,n.width>>d),r=Math.max(1,n.height>>d);c===e.TEXTURE_3D||c===e.TEXTURE_2D_ARRAY?i.texImage3D(c,d,p,t,r,n.depth,0,u,f,null):i.texImage2D(c,d,p,t,r,0,u,f,null)}i.bindFramebuffer(e.FRAMEBUFFER,t),$(n)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,s,c,h.__webglTexture,0,Z(n)):(c===e.TEXTURE_2D||c>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&c<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,s,c,h.__webglTexture,d),i.bindFramebuffer(e.FRAMEBUFFER,null)}function X(t,n,i){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){const r=n.depthTexture,a=r&&r.isDepthTexture?r.type:null,o=C(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;$(n)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Z(n),o,n.width,n.height):i?e.renderbufferStorageMultisample(e.RENDERBUFFER,Z(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{const t=n.textures;for(let r=0;r<t.length;r++){const a=t[r],s=o.convert(a.format,a.colorSpace),c=o.convert(a.type),d=b(a.internalFormat,s,c,a.colorSpace);$(n)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Z(n),d,n.width,n.height):i?e.renderbufferStorageMultisample(e.RENDERBUFFER,Z(n),d,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,d,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Y(t,n,a){const s=!0===n.isWebGLCubeRenderTarget;if(i.bindFramebuffer(e.FRAMEBUFFER,t),!n.depthTexture||!n.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const c=r.get(n.depthTexture);if(c.__renderTarget=n,c.__webglTexture&&n.depthTexture.image.width===n.width&&n.depthTexture.image.height===n.height||(n.depthTexture.image.width=n.width,n.depthTexture.image.height=n.height,n.depthTexture.needsUpdate=!0),s){if(void 0===c.__webglInit&&(c.__webglInit=!0,n.depthTexture.addEventListener("dispose",L)),void 0===c.__webglTexture){c.__webglTexture=e.createTexture(),i.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),B(e.TEXTURE_CUBE_MAP,n.depthTexture);const t=o.convert(n.depthTexture.format),r=o.convert(n.depthTexture.type);let a;n.depthTexture.format===be?a=e.DEPTH_COMPONENT24:n.depthTexture.format===Rt&&(a=e.DEPTH24_STENCIL8);for(let i=0;i<6;i++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+i,0,a,n.width,n.height,0,t,r,null)}}else I(n.depthTexture,0);const d=c.__webglTexture,u=Z(n),f=s?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=n.depthTexture.format===Rt?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(n.depthTexture.format===be)$(n)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,d,0,u):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,d,0);else{if(n.depthTexture.format!==Rt)throw new Error("Unknown depthTexture format");$(n)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,d,0,u):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,d,0)}}function K(t){const n=r.get(t),a=!0===t.isWebGLCubeRenderTarget;if(n.__boundDepthTexture!==t.depthTexture){const e=t.depthTexture;if(n.__depthDisposeCallback&&n.__depthDisposeCallback(),e){const t=()=>{delete n.__boundDepthTexture,delete n.__depthDisposeCallback,e.removeEventListener("dispose",t)};e.addEventListener("dispose",t),n.__depthDisposeCallback=t}n.__boundDepthTexture=e}if(t.depthTexture&&!n.__autoAllocateDepthBuffer)if(a)for(let e=0;e<6;e++)Y(n.__webglFramebuffer[e],t,e);else{const e=t.texture.mipmaps;e&&e.length>0?Y(n.__webglFramebuffer[0],t,0):Y(n.__webglFramebuffer,t,0)}else if(a){n.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(i.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[r]),void 0===n.__webglDepthbuffer[r])n.__webglDepthbuffer[r]=e.createRenderbuffer(),X(n.__webglDepthbuffer[r],t,!1);else{const i=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=n.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,i,e.RENDERBUFFER,a)}}else{const r=t.texture.mipmaps;if(r&&r.length>0?i.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[0]):i.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer),void 0===n.__webglDepthbuffer)n.__webglDepthbuffer=e.createRenderbuffer(),X(n.__webglDepthbuffer,t,!1);else{const i=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=n.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,i,e.RENDERBUFFER,r)}}i.bindFramebuffer(e.FRAMEBUFFER,null)}const q=[],j=[];function Z(e){return Math.min(a.maxSamples,e.samples)}function $(e){const t=r.get(e);return e.samples>0&&!0===n.has("WEBGL_multisampled_render_to_texture")&&!1!==t.__useRenderToTexture}function Q(e,t){const n=e.colorSpace,i=e.format,r=e.type;return!0===e.isCompressedTexture||!0===e.isVideoTexture||n!==G&&n!==At&&(p.getTransfer(n)===m?i===x&&r===T||E("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):y("WebGLTextures: Unsupported texture color space:",n)),t}function J(e){return"undefined"!=typeof HTMLImageElement&&e instanceof HTMLImageElement?(d.width=e.naturalWidth||e.width,d.height=e.naturalHeight||e.height):"undefined"!=typeof VideoFrame&&e instanceof VideoFrame?(d.width=e.displayWidth,d.height=e.displayHeight):(d.width=e.width,d.height=e.height),d}this.allocateTextureUnit=function(){const e=w;return e>=a.maxTextures&&E("WebGLTextures: Trying to use "+e+" texture units while this GPU supports only "+a.maxTextures),w+=1,e},this.resetTextureUnits=function(){w=0},this.setTexture2D=I,this.setTexture2DArray=function(t,n){const a=r.get(t);!1===t.isRenderTargetTexture&&t.version>0&&a.__version!==t.version?k(a,t,n):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),i.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+n))},this.setTexture3D=function(t,n){const a=r.get(t);!1===t.isRenderTargetTexture&&t.version>0&&a.__version!==t.version?k(a,t,n):i.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+n)},this.setTextureCube=function(t,n){const s=r.get(t);!0!==t.isCubeDepthTexture&&t.version>0&&s.__version!==t.version?function(t,n,s){if(6!==n.image.length)return;const l=V(t,n),c=n.source;i.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);const d=r.get(c);if(c.version!==d.__version||!0===l){i.activeTexture(e.TEXTURE0+s);const t=p.getPrimaries(p.workingColorSpace),r=n.colorSpace===At?null:p.getPrimaries(n.colorSpace),u=n.colorSpace===At||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,u);const f=n.isCompressedTexture||n.image[0].isCompressedTexture,m=n.image[0]&&n.image[0].isDataTexture,h=[];for(let e=0;e<6;e++)h[e]=f||m?m?n.image[e].image:n.image[e]:v(n.image[e],!0,a.maxCubemapSize),h[e]=Q(n,h[e]);const _=h[0],g=o.convert(n.format,n.colorSpace),T=o.convert(n.type),M=b(n.internalFormat,g,T,n.colorSpace),R=!0!==n.isVideoTexture,C=void 0===d.__version||!0===l,L=c.dataReady;let U,D=P(n,_);if(B(e.TEXTURE_CUBE_MAP,n),f){R&&C&&i.texStorage2D(e.TEXTURE_CUBE_MAP,D,M,_.width,_.height);for(let t=0;t<6;t++){U=h[t].mipmaps;for(let r=0;r<U.length;r++){const a=U[r];n.format!==x?null!==g?R?L&&i.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,a.width,a.height,g,a.data):i.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,M,a.width,a.height,0,a.data):E("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?L&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,a.width,a.height,g,T,a.data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,M,a.width,a.height,0,g,T,a.data)}}}else{if(U=n.mipmaps,R&&C){U.length>0&&D++;const t=J(h[0]);i.texStorage2D(e.TEXTURE_CUBE_MAP,D,M,t.width,t.height)}for(let t=0;t<6;t++)if(m){R?L&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,h[t].width,h[t].height,g,T,h[t].data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,M,h[t].width,h[t].height,0,g,T,h[t].data);for(let n=0;n<U.length;n++){const r=U[n].image[t].image;R?L&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,r.width,r.height,g,T,r.data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,M,r.width,r.height,0,g,T,r.data)}}else{R?L&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,T,h[t]):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,M,g,T,h[t]);for(let n=0;n<U.length;n++){const r=U[n];R?L&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,g,T,r.image[t]):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,M,g,T,r.image[t])}}}S(n)&&A(e.TEXTURE_CUBE_MAP),d.__version=c.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}(s,t,n):i.bindTexture(e.TEXTURE_CUBE_MAP,s.__webglTexture,e.TEXTURE0+n)},this.rebindTextures=function(t,n,i){const a=r.get(t);void 0!==n&&z(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),void 0!==i&&K(t)},this.setupRenderTarget=function(t){const n=t.texture,a=r.get(t),l=r.get(n);t.addEventListener("dispose",U);const c=t.textures,d=!0===t.isWebGLCubeRenderTarget,u=c.length>1;if(u||(void 0===l.__webglTexture&&(l.__webglTexture=e.createTexture()),l.__version=n.version,s.memory.textures++),d){a.__webglFramebuffer=[];for(let t=0;t<6;t++)if(n.mipmaps&&n.mipmaps.length>0){a.__webglFramebuffer[t]=[];for(let i=0;i<n.mipmaps.length;i++)a.__webglFramebuffer[t][i]=e.createFramebuffer()}else a.__webglFramebuffer[t]=e.createFramebuffer()}else{if(n.mipmaps&&n.mipmaps.length>0){a.__webglFramebuffer=[];for(let t=0;t<n.mipmaps.length;t++)a.__webglFramebuffer[t]=e.createFramebuffer()}else a.__webglFramebuffer=e.createFramebuffer();if(u)for(let t=0,n=c.length;t<n;t++){const n=r.get(c[t]);void 0===n.__webglTexture&&(n.__webglTexture=e.createTexture(),s.memory.textures++)}if(t.samples>0&&!1===$(t)){a.__webglMultisampledFramebuffer=e.createFramebuffer(),a.__webglColorRenderbuffer=[],i.bindFramebuffer(e.FRAMEBUFFER,a.__webglMultisampledFramebuffer);for(let n=0;n<c.length;n++){const i=c[n];a.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,a.__webglColorRenderbuffer[n]);const r=o.convert(i.format,i.colorSpace),s=o.convert(i.type),l=b(i.internalFormat,r,s,i.colorSpace,!0===t.isXRRenderTarget),d=Z(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,d,l,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,a.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(a.__webglDepthRenderbuffer=e.createRenderbuffer(),X(a.__webglDepthRenderbuffer,t,!0)),i.bindFramebuffer(e.FRAMEBUFFER,null)}}if(d){i.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),B(e.TEXTURE_CUBE_MAP,n);for(let i=0;i<6;i++)if(n.mipmaps&&n.mipmaps.length>0)for(let r=0;r<n.mipmaps.length;r++)z(a.__webglFramebuffer[i][r],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,r);else z(a.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,0);S(n)&&A(e.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(u){for(let n=0,o=c.length;n<o;n++){const o=c[n],s=r.get(o);let l=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(l=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),i.bindTexture(l,s.__webglTexture),B(l,o),z(a.__webglFramebuffer,t,o,e.COLOR_ATTACHMENT0+n,l,0),S(o)&&A(l)}i.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),i.bindTexture(r,l.__webglTexture),B(r,n),n.mipmaps&&n.mipmaps.length>0)for(let i=0;i<n.mipmaps.length;i++)z(a.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,r,i);else z(a.__webglFramebuffer,t,n,e.COLOR_ATTACHMENT0,r,0);S(n)&&A(r),i.unbindTexture()}t.depthBuffer&&K(t)},this.updateRenderTargetMipmap=function(e){const t=e.textures;for(let n=0,a=t.length;n<a;n++){const a=t[n];if(S(a)){const t=R(e),n=r.get(a).__webglTexture;i.bindTexture(t,n),A(t),i.unbindTexture()}}},this.updateMultisampleRenderTarget=function(t){if(t.samples>0)if(!1===$(t)){const n=t.textures,a=t.width,o=t.height;let s=e.COLOR_BUFFER_BIT;const l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,d=r.get(t),u=n.length>1;if(u)for(let t=0;t<n.length;t++)i.bindFramebuffer(e.FRAMEBUFFER,d.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),i.bindFramebuffer(e.FRAMEBUFFER,d.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);i.bindFramebuffer(e.READ_FRAMEBUFFER,d.__webglMultisampledFramebuffer);const f=t.texture.mipmaps;f&&f.length>0?i.bindFramebuffer(e.DRAW_FRAMEBUFFER,d.__webglFramebuffer[0]):i.bindFramebuffer(e.DRAW_FRAMEBUFFER,d.__webglFramebuffer);for(let i=0;i<n.length;i++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),u){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,d.__webglColorRenderbuffer[i]);const t=r.get(n[i]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),!0===c&&(q.length=0,j.length=0,q.push(e.COLOR_ATTACHMENT0+i),t.depthBuffer&&!1===t.resolveDepthBuffer&&(q.push(l),j.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,j)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,q))}if(i.bindFramebuffer(e.READ_FRAMEBUFFER,null),i.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),u)for(let t=0;t<n.length;t++){i.bindFramebuffer(e.FRAMEBUFFER,d.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,d.__webglColorRenderbuffer[t]);const a=r.get(n[t]).__webglTexture;i.bindFramebuffer(e.FRAMEBUFFER,d.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}i.bindFramebuffer(e.DRAW_FRAMEBUFFER,d.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&!1===t.resolveDepthBuffer&&c){const n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}},this.setupDepthRenderbuffer=K,this.setupFrameBufferTexture=z,this.useMultisampledRTT=$,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function Ta(e,t){return{convert:function(n,i=At){let r;const a=p.getTransfer(i);if(n===T)return e.UNSIGNED_BYTE;if(n===Ut)return e.UNSIGNED_SHORT_4_4_4_4;if(n===Dt)return e.UNSIGNED_SHORT_5_5_5_1;if(n===wt)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===It)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===Nt)return e.BYTE;if(n===yt)return e.SHORT;if(n===Pt)return e.UNSIGNED_SHORT;if(n===v)return e.INT;if(n===Le)return e.UNSIGNED_INT;if(n===M)return e.FLOAT;if(n===S)return e.HALF_FLOAT;if(n===Ft)return e.ALPHA;if(n===Ot)return e.RGB;if(n===x)return e.RGBA;if(n===be)return e.DEPTH_COMPONENT;if(n===Rt)return e.DEPTH_STENCIL;if(n===Bt)return e.RED;if(n===Gt)return e.RED_INTEGER;if(n===Te)return e.RG;if(n===Ht)return e.RG_INTEGER;if(n===Vt)return e.RGBA_INTEGER;if(n===Wt||n===kt||n===zt||n===Xt)if(a===m){if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),null===r)return null;if(n===Wt)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===kt)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===zt)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Xt)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=t.get("WEBGL_compressed_texture_s3tc"),null===r)return null;if(n===Wt)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===kt)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===zt)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Xt)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(n===Yt||n===Kt||n===qt||n===jt){if(r=t.get("WEBGL_compressed_texture_pvrtc"),null===r)return null;if(n===Yt)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Kt)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===qt)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===jt)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(n===Zt||n===$t||n===Qt||n===Jt||n===en||n===tn||n===nn){if(r=t.get("WEBGL_compressed_texture_etc"),null===r)return null;if(n===Zt||n===$t)return a===m?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Qt)return a===m?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Jt)return r.COMPRESSED_R11_EAC;if(n===en)return r.COMPRESSED_SIGNED_R11_EAC;if(n===tn)return r.COMPRESSED_RG11_EAC;if(n===nn)return r.COMPRESSED_SIGNED_RG11_EAC}if(n===rn||n===an||n===on||n===sn||n===ln||n===cn||n===dn||n===un||n===fn||n===pn||n===mn||n===hn||n===_n||n===gn){if(r=t.get("WEBGL_compressed_texture_astc"),null===r)return null;if(n===rn)return a===m?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===an)return a===m?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===on)return a===m?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===sn)return a===m?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ln)return a===m?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===cn)return a===m?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===dn)return a===m?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===un)return a===m?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===fn)return a===m?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===pn)return a===m?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===mn)return a===m?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===hn)return a===m?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_n)return a===m?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===gn)return a===m?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(n===vn||n===En||n===Sn){if(r=t.get("EXT_texture_compression_bptc"),null===r)return null;if(n===vn)return a===m?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===En)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Sn)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(n===Tn||n===Mn||n===xn||n===An){if(r=t.get("EXT_texture_compression_rgtc"),null===r)return null;if(n===Tn)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Mn)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===xn)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===An)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return n===Ct?e.UNSIGNED_INT_24_8:void 0!==e[n]?e[n]:null}}}class Ma{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(null===this.texture){const n=new Rn(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(null!==this.texture&&null===this.mesh){const t=e.cameras[0].viewport,n=new l({vertexShader:"\nvoid main() {\n\n\tgl_Position = vec4( position, 1.0 );\n\n}",fragmentShader:"\nuniform sampler2DArray depthColor;\nuniform float depthWidth;\nuniform float depthHeight;\n\nvoid main() {\n\n\tvec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );\n\n\tif ( coord.x >= 1.0 ) {\n\n\t\tgl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;\n\n\t} else {\n\n\t\tgl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;\n\n\t}\n\n}",uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new o(new h(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class xa extends bn{constructor(e,n){super();const i=this;let a=null,o=1,s=null,l="local-floor",c=1,d=null,u=null,f=null,p=null,m=null,h=null;const _="undefined"!=typeof XRWebGLBinding,g=new Ma,v={},S=n.getContextAttributes();let M=null,A=null;const R=[],b=[],C=new t;let P=null;const L=new w;L.viewport=new X;const U=new w;U.viewport=new X;const D=[L,U],I=new Cn;let N=null,y=null;function F(e){const t=b.indexOf(e.inputSource);if(-1===t)return;const n=R[t];void 0!==n&&(n.update(e.inputSource,e.frame,d||s),n.dispatchEvent({type:e.type,data:e.inputSource}))}function B(){a.removeEventListener("select",F),a.removeEventListener("selectstart",F),a.removeEventListener("selectend",F),a.removeEventListener("squeeze",F),a.removeEventListener("squeezestart",F),a.removeEventListener("squeezeend",F),a.removeEventListener("end",B),a.removeEventListener("inputsourceschange",G);for(let e=0;e<R.length;e++){const t=b[e];null!==t&&(b[e]=null,R[e].disconnect(t))}N=null,y=null,g.reset();for(const e in v)delete v[e];e.setRenderTarget(M),m=null,p=null,f=null,a=null,A=null,z.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}function G(e){for(let t=0;t<e.removed.length;t++){const n=e.removed[t],i=b.indexOf(n);i>=0&&(b[i]=null,R[i].disconnect(n))}for(let t=0;t<e.added.length;t++){const n=e.added[t];let i=b.indexOf(n);if(-1===i){for(let e=0;e<R.length;e++){if(e>=b.length){b.push(n),i=e;break}if(null===b[e]){b[e]=n,i=e;break}}if(-1===i)break}const r=R[i];r&&r.connect(n)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=R[e];return void 0===t&&(t=new Pn,R[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=R[e];return void 0===t&&(t=new Pn,R[e]=t),t.getGripSpace()},this.getHand=function(e){let t=R[e];return void 0===t&&(t=new Pn,R[e]=t),t.getHandSpace()},this.setFramebufferScaleFactor=function(e){o=e,!0===i.isPresenting&&E("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(e){l=e,!0===i.isPresenting&&E("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||s},this.setReferenceSpace=function(e){d=e},this.getBaseLayer=function(){return null!==p?p:m},this.getBinding=function(){return null===f&&_&&(f=new XRWebGLBinding(a,n)),f},this.getFrame=function(){return h},this.getSession=function(){return a},this.setSession=async function(t){if(a=t,null!==a){M=e.getRenderTarget(),a.addEventListener("select",F),a.addEventListener("selectstart",F),a.addEventListener("selectend",F),a.addEventListener("squeeze",F),a.addEventListener("squeezestart",F),a.addEventListener("squeezeend",F),a.addEventListener("end",B),a.addEventListener("inputsourceschange",G),!0!==S.xrCompatible&&await n.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(C);if(_&&"createProjectionLayer"in XRWebGLBinding.prototype){let t=null,i=null,r=null;S.depth&&(r=S.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,t=S.stencil?Rt:be,i=S.stencil?Ct:Le);const s={colorFormat:n.RGBA8,depthFormat:r,scaleFactor:o};f=this.getBinding(),p=f.createProjectionLayer(s),a.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),A=new O(p.textureWidth,p.textureHeight,{format:x,type:T,depthTexture:new oe(p.textureWidth,p.textureHeight,i,void 0,void 0,void 0,void 0,void 0,void 0,t),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:!1===p.ignoreDepthValues,resolveStencilBuffer:!1===p.ignoreDepthValues})}else{const t={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:o};m=new XRWebGLLayer(a,n,t),a.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),A=new O(m.framebufferWidth,m.framebufferHeight,{format:x,type:T,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:!1===m.ignoreDepthValues,resolveStencilBuffer:!1===m.ignoreDepthValues})}A.isXRRenderTarget=!0,this.setFoveation(c),d=null,s=await a.requestReferenceSpace(l),z.setContext(a),z.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(null!==a)return a.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};const H=new r,V=new r;function W(e,t){null===t?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(null===a)return;let t=e.near,n=e.far;null!==g.texture&&(g.depthNear>0&&(t=g.depthNear),g.depthFar>0&&(n=g.depthFar)),I.near=U.near=L.near=t,I.far=U.far=L.far=n,N===I.near&&y===I.far||(a.updateRenderState({depthNear:I.near,depthFar:I.far}),N=I.near,y=I.far),I.layers.mask=6|e.layers.mask,L.layers.mask=3&I.layers.mask,U.layers.mask=5&I.layers.mask;const i=e.parent,r=I.cameras;W(I,i);for(let e=0;e<r.length;e++)W(r[e],i);2===r.length?function(e,t,n){H.setFromMatrixPosition(t.matrixWorld),V.setFromMatrixPosition(n.matrixWorld);const i=H.distanceTo(V),r=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=r[14]/(r[10]-1),s=r[14]/(r[10]+1),l=(r[9]+1)/r[5],c=(r[9]-1)/r[5],d=(r[8]-1)/r[0],u=(a[8]+1)/a[0],f=o*d,p=o*u,m=i/(-d+u),h=m*-d;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),-1===r[10])e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{const t=o+m,n=s+m,r=f-h,a=p+(i-h),d=l*s/n*t,u=c*s/n*t;e.projectionMatrix.makePerspective(r,a,d,u,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}(I,L,U):I.projectionMatrix.copy(L.projectionMatrix),function(e,t,n){null===n?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld));e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=2*Ln*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}(e,I,i)},this.getCamera=function(){return I},this.getFoveation=function(){if(null!==p||null!==m)return c},this.setFoveation=function(e){c=e,null!==p&&(p.fixedFoveation=e),null!==m&&void 0!==m.fixedFoveation&&(m.fixedFoveation=e)},this.hasDepthSensing=function(){return null!==g.texture},this.getDepthSensingMesh=function(){return g.getMesh(I)},this.getCameraTexture=function(e){return v[e]};let k=null;const z=new On;z.setAnimationLoop(function(t,n){if(u=n.getViewerPose(d||s),h=n,null!==u){const t=u.views;null!==m&&(e.setRenderTargetFramebuffer(A,m.framebuffer),e.setRenderTarget(A));let n=!1;t.length!==I.cameras.length&&(I.cameras.length=0,n=!0);for(let i=0;i<t.length;i++){const r=t[i];let a=null;if(null!==m)a=m.getViewport(r);else{const t=f.getViewSubImage(p,r);a=t.viewport,0===i&&(e.setRenderTargetTextures(A,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(A))}let o=D[i];void 0===o&&(o=new w,o.layers.enable(i),o.viewport=new X,D[i]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),0===i&&(I.matrix.copy(o.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),!0===n&&I.cameras.push(o)}const r=a.enabledFeatures;if(r&&r.includes("depth-sensing")&&"gpu-optimized"==a.depthUsage&&_){f=i.getBinding();const e=f.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&g.init(e,a.renderState)}if(r&&r.includes("camera-access")&&_){e.state.unbindTexture(),f=i.getBinding();for(let e=0;e<t.length;e++){const n=t[e].camera;if(n){let e=v[n];e||(e=new Rn,v[n]=e);const t=f.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<R.length;e++){const t=b[e],i=R[e];null!==t&&void 0!==i&&i.update(t,n,d||s)}k&&k(t,n),n.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:n}),h=null}),this.setAnimationLoop=function(e){k=e},this.dispose=function(){}}}const Aa=new u,Ra=new f;function ba(e,t){function n(e,t){!0===e.matrixAutoUpdate&&e.updateMatrix(),t.value.copy(e.matrix)}function i(e,i){e.opacity.value=i.opacity,i.color&&e.diffuse.value.copy(i.color),i.emissive&&e.emissive.value.copy(i.emissive).multiplyScalar(i.emissiveIntensity),i.map&&(e.map.value=i.map,n(i.map,e.mapTransform)),i.alphaMap&&(e.alphaMap.value=i.alphaMap,n(i.alphaMap,e.alphaMapTransform)),i.bumpMap&&(e.bumpMap.value=i.bumpMap,n(i.bumpMap,e.bumpMapTransform),e.bumpScale.value=i.bumpScale,i.side===c&&(e.bumpScale.value*=-1)),i.normalMap&&(e.normalMap.value=i.normalMap,n(i.normalMap,e.normalMapTransform),e.normalScale.value.copy(i.normalScale),i.side===c&&e.normalScale.value.negate()),i.displacementMap&&(e.displacementMap.value=i.displacementMap,n(i.displacementMap,e.displacementMapTransform),e.displacementScale.value=i.displacementScale,e.displacementBias.value=i.displacementBias),i.emissiveMap&&(e.emissiveMap.value=i.emissiveMap,n(i.emissiveMap,e.emissiveMapTransform)),i.specularMap&&(e.specularMap.value=i.specularMap,n(i.specularMap,e.specularMapTransform)),i.alphaTest>0&&(e.alphaTest.value=i.alphaTest);const r=t.get(i),a=r.envMap,o=r.envMapRotation;a&&(e.envMap.value=a,Aa.copy(o),Aa.x*=-1,Aa.y*=-1,Aa.z*=-1,a.isCubeTexture&&!1===a.isRenderTargetTexture&&(Aa.y*=-1,Aa.z*=-1),e.envMapRotation.value.setFromMatrix4(Ra.makeRotationFromEuler(Aa)),e.flipEnvMap.value=a.isCubeTexture&&!1===a.isRenderTargetTexture?-1:1,e.reflectivity.value=i.reflectivity,e.ior.value=i.ior,e.refractionRatio.value=i.refractionRatio),i.lightMap&&(e.lightMap.value=i.lightMap,e.lightMapIntensity.value=i.lightMapIntensity,n(i.lightMap,e.lightMapTransform)),i.aoMap&&(e.aoMap.value=i.aoMap,e.aoMapIntensity.value=i.aoMapIntensity,n(i.aoMap,e.aoMapTransform))}return{refreshFogUniforms:function(t,n){n.color.getRGB(t.fogColor.value,g(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)},refreshMaterialUniforms:function(e,r,a,o,s){r.isMeshBasicMaterial||r.isMeshLambertMaterial?i(e,r):r.isMeshToonMaterial?(i(e,r),function(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}(e,r)):r.isMeshPhongMaterial?(i(e,r),function(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}(e,r)):r.isMeshStandardMaterial?(i(e,r),function(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform));e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform));t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}(e,r),r.isMeshPhysicalMaterial&&function(e,t,i){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform)));t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===c&&e.clearcoatNormalScale.value.negate()));t.dispersion>0&&(e.dispersion.value=t.dispersion);t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform)));t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=i.texture,e.transmissionSamplerSize.value.set(i.width,i.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor));t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform)));e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform));t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}(e,r,s)):r.isMeshMatcapMaterial?(i(e,r),function(e,t){t.matcap&&(e.matcap.value=t.matcap)}(e,r)):r.isMeshDepthMaterial?i(e,r):r.isMeshDistanceMaterial?(i(e,r),function(e,n){const i=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(i.matrixWorld),e.nearDistance.value=i.shadow.camera.near,e.farDistance.value=i.shadow.camera.far}(e,r)):r.isMeshNormalMaterial?i(e,r):r.isLineBasicMaterial?(function(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}(e,r),r.isLineDashedMaterial&&function(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}(e,r)):r.isPointsMaterial?function(e,t,i,r){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*i,e.scale.value=.5*r,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform));t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform));t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}(e,r,a,o):r.isSpriteMaterial?function(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform));t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform));t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}(e,r):r.isShadowMaterial?(e.color.value.copy(r.color),e.opacity.value=r.opacity):r.isShaderMaterial&&(r.uniformsNeedUpdate=!1)}}}function Ca(e,t,n,i){let r={},a={},o=[];const s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(e,t,n,i){const r=e.value,a=t+"_"+n;if(void 0===i[a])return i[a]="number"==typeof r||"boolean"==typeof r?r:r.clone(),!0;{const e=i[a];if("number"==typeof r||"boolean"==typeof r){if(e!==r)return i[a]=r,!0}else if(!1===e.equals(r))return e.copy(r),!0}return!1}function c(e){const t={boundary:0,storage:0};return"number"==typeof e||"boolean"==typeof e?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?E("WebGLRenderer: Texture samplers can not be part of an uniforms group."):E("WebGLRenderer: Unsupported uniform value type.",e),t}function d(t){const n=t.target;n.removeEventListener("dispose",d);const i=o.indexOf(n.__bindingPointIndex);o.splice(i,1),e.deleteBuffer(r[n.id]),delete r[n.id],delete a[n.id]}return{bind:function(e,t){const n=t.program;i.uniformBlockBinding(e,n)},update:function(n,u){let f=r[n.id];void 0===f&&(!function(e){const t=e.uniforms;let n=0;const i=16;for(let e=0,r=t.length;e<r;e++){const r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){const t=r[e],a=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=a.length;e<r;e++){const r=c(a[e]),o=n%i,s=o%r.boundary,l=o+s;n+=s,0!==l&&i-l<r.storage&&(n+=i-l),t.__data=new Float32Array(r.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=r.storage}}}const r=n%i;r>0&&(n+=i-r);e.__size=n,e.__cache={}}(n),f=function(t){const n=function(){for(let e=0;e<s;e++)if(-1===o.indexOf(e))return o.push(e),e;return y("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}();t.__bindingPointIndex=n;const i=e.createBuffer(),r=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,i),e.bufferData(e.UNIFORM_BUFFER,r,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,i),i}(n),r[n.id]=f,n.addEventListener("dispose",d));const p=u.program;i.updateUBOMapping(n,p);const m=t.render.frame;a[n.id]!==m&&(!function(t){const n=r[t.id],i=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let t=0,n=i.length;t<n;t++){const n=Array.isArray(i[t])?i[t]:[i[t]];for(let i=0,r=n.length;i<r;i++){const r=n[i];if(!0===l(r,t,i,a)){const t=r.__offset,n=Array.isArray(r.value)?r.value:[r.value];let i=0;for(let a=0;a<n.length;a++){const o=n[a],s=c(o);"number"==typeof o||"boolean"==typeof o?(r.__data[0]=o,e.bufferSubData(e.UNIFORM_BUFFER,t+i,r.__data)):o.isMatrix3?(r.__data[0]=o.elements[0],r.__data[1]=o.elements[1],r.__data[2]=o.elements[2],r.__data[3]=0,r.__data[4]=o.elements[3],r.__data[5]=o.elements[4],r.__data[6]=o.elements[5],r.__data[7]=0,r.__data[8]=o.elements[6],r.__data[9]=o.elements[7],r.__data[10]=o.elements[8],r.__data[11]=0):(o.toArray(r.__data,i),i+=s.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,t,r.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}(n),a[n.id]=m)},dispose:function(){for(const t in r)e.deleteBuffer(r[t]);o=[],r={},a={}}}}const Pa=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let La=null;class Ua{constructor(e={}){const{canvas:t=Dn(),context:i=null,depth:a=!0,stencil:o=!1,alpha:s=!1,antialias:l=!1,premultipliedAlpha:d=!0,preserveDrawingBuffer:u=!1,powerPreference:m="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:g=!1,outputBufferType:v=T}=e;let M;if(this.isWebGLRenderer=!0,null!==i){if("undefined"!=typeof WebGLRenderingContext&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=i.getContextAttributes().alpha}else M=s;const x=v,A=new Set([Vt,Ht,Gt]),R=new Set([T,Le,Pt,Ct,Ut,Dt]),b=new Uint32Array(4),C=new Int32Array(4);let P=null,L=null;const U=[],D=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=I,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const N=this;let F=!1;this._outputColorSpace=wn;let B=0,W=0,k=null,z=-1,Y=null;const K=new X,q=new X;let j=null;const Z=new n(0);let $=0,Q=t.width,J=t.height,ee=1,te=null,ne=null;const ie=new X(0,0,Q,J),re=new X(0,0,Q,J);let ae=!1;const oe=new Me;let se=!1,le=!1;const ce=new f,de=new r,ue=new X,fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pe=!1;function me(){return null===k?ee:1}let he,ge,ve,Ee,Se,xe,Ae,Re,be,Ce,Pe,Ue,De,we,Ie,Ne,ye,Fe,Oe,Be,Ge,He,Ve,We,ke=i;function ze(e,n){return t.getContext(e,n)}try{const e={alpha:!0,depth:a,stencil:o,antialias:l,premultipliedAlpha:d,preserveDrawingBuffer:u,powerPreference:m,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${In}`),t.addEventListener("webglcontextlost",Ke,!1),t.addEventListener("webglcontextrestored",qe,!1),t.addEventListener("webglcontextcreationerror",je,!1),null===ke){const t="webgl2";if(ke=ze(t,e),null===ke)throw ze(t)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(e){throw y("WebGLRenderer: "+e.message),e}function Xe(){he=new pi(ke),he.init(),He=new Ta(ke,he),ge=new qn(ke,he,e,He),ve=new Ea(ke,he),ge.reversedDepthBuffer&&g&&ve.buffers.depth.setReversed(!0),Ee=new _i(ke),Se=new ta,xe=new Sa(ke,he,ve,Se,ge,He,Ee),Ae=new Zn(N),Re=new fi(N),be=new Bn(ke),Ve=new Yn(ke,be),Ce=new mi(ke,be,Ee,Ve),Pe=new vi(ke,Ce,be,Ee),Oe=new gi(ke,ge,xe),Ne=new jn(Se),Ue=new ea(N,Ae,Re,he,ge,Ve,Ne),De=new ba(N,Se),we=new aa,Ie=new ua(he),Fe=new Xn(N,Ae,Re,ve,Pe,M,d),ye=new ga(N,Pe,ge),We=new Ca(ke,Ee,ge,ve),Be=new Kn(ke,he,Ee),Ge=new hi(ke,he,Ee),Ee.programs=Ue.programs,N.capabilities=ge,N.extensions=he,N.properties=Se,N.renderLists=we,N.shadowMap=ye,N.state=ve,N.info=Ee}Xe(),x!==T&&(w=new Si(x,t.width,t.height,a,o));const Ye=new xa(N,ke);function Ke(e){e.preventDefault(),Nn("WebGLRenderer: Context Lost."),F=!0}function qe(){Nn("WebGLRenderer: Context Restored."),F=!1;const e=Ee.autoReset,t=ye.enabled,n=ye.autoUpdate,i=ye.needsUpdate,r=ye.type;Xe(),Ee.autoReset=e,ye.enabled=t,ye.autoUpdate=n,ye.needsUpdate=i,ye.type=r}function je(e){y("WebGLRenderer: A WebGL context could not be created. Reason: ",e.statusMessage)}function Ze(e){const t=e.target;t.removeEventListener("dispose",Ze),function(e){(function(e){const t=Se.get(e).programs;void 0!==t&&(t.forEach(function(e){Ue.releaseProgram(e)}),e.isShaderMaterial&&Ue.releaseShaderCache(e))})(e),Se.remove(e)}(t)}function $e(e,t,n){!0===e.transparent&&e.side===_e&&!1===e.forceSinglePass?(e.side=c,e.needsUpdate=!0,st(e,t,n),e.side=_,e.needsUpdate=!0,st(e,t,n),e.side=_e):st(e,t,n)}this.xr=Ye,this.getContext=function(){return ke},this.getContextAttributes=function(){return ke.getContextAttributes()},this.forceContextLoss=function(){const e=he.get("WEBGL_lose_context");e&&e.loseContext()},this.forceContextRestore=function(){const e=he.get("WEBGL_lose_context");e&&e.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(e){void 0!==e&&(ee=e,this.setSize(Q,J,!1))},this.getSize=function(e){return e.set(Q,J)},this.setSize=function(e,n,i=!0){Ye.isPresenting?E("WebGLRenderer: Can't change size while VR device is presenting."):(Q=e,J=n,t.width=Math.floor(e*ee),t.height=Math.floor(n*ee),!0===i&&(t.style.width=e+"px",t.style.height=n+"px"),null!==w&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(Q*ee,J*ee).floor()},this.setDrawingBufferSize=function(e,n,i){Q=e,J=n,ee=i,t.width=Math.floor(e*i),t.height=Math.floor(n*i),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(x!==T){if(e)for(let t=0;t<e.length;t++)if(!0===e[t].isOutputPass){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}w.setEffects(e||[])}else console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.")},this.getCurrentViewport=function(e){return e.copy(K)},this.getViewport=function(e){return e.copy(ie)},this.setViewport=function(e,t,n,i){e.isVector4?ie.set(e.x,e.y,e.z,e.w):ie.set(e,t,n,i),ve.viewport(K.copy(ie).multiplyScalar(ee).round())},this.getScissor=function(e){return e.copy(re)},this.setScissor=function(e,t,n,i){e.isVector4?re.set(e.x,e.y,e.z,e.w):re.set(e,t,n,i),ve.scissor(q.copy(re).multiplyScalar(ee).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(e){ve.setScissorTest(ae=e)},this.setOpaqueSort=function(e){te=e},this.setTransparentSort=function(e){ne=e},this.getClearColor=function(e){return e.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let i=0;if(e){let e=!1;if(null!==k){const t=k.texture.format;e=A.has(t)}if(e){const e=k.texture.type,t=R.has(e),n=Fe.getClearColor(),i=Fe.getClearAlpha(),r=n.r,a=n.g,o=n.b;t?(b[0]=r,b[1]=a,b[2]=o,b[3]=i,ke.clearBufferuiv(ke.COLOR,0,b)):(C[0]=r,C[1]=a,C[2]=o,C[3]=i,ke.clearBufferiv(ke.COLOR,0,C))}else i|=ke.COLOR_BUFFER_BIT}t&&(i|=ke.DEPTH_BUFFER_BIT),n&&(i|=ke.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ke.clear(i)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ke,!1),t.removeEventListener("webglcontextrestored",qe,!1),t.removeEventListener("webglcontextcreationerror",je,!1),Fe.dispose(),we.dispose(),Ie.dispose(),Se.dispose(),Ae.dispose(),Re.dispose(),Pe.dispose(),Ve.dispose(),We.dispose(),Ue.dispose(),Ye.dispose(),Ye.removeEventListener("sessionstart",Je),Ye.removeEventListener("sessionend",et),tt.stop()},this.renderBufferDirect=function(e,t,n,i,r,a){null===t&&(t=fe);const o=r.isMesh&&r.matrixWorld.determinant()<0,s=function(e,t,n,i,r){!0!==t.isScene&&(t=fe);xe.resetTextureUnits();const a=t.fog,o=i.isMeshStandardMaterial?t.environment:null,s=null===k?N.outputColorSpace:!0===k.isXRRenderTarget?k.texture.colorSpace:G,l=(i.isMeshStandardMaterial?Re:Ae).get(i.envMap||o),c=!0===i.vertexColors&&!!n.attributes.color&&4===n.attributes.color.itemSize,d=!!n.attributes.tangent&&(!!i.normalMap||i.anisotropy>0),u=!!n.morphAttributes.position,f=!!n.morphAttributes.normal,p=!!n.morphAttributes.color;let m=I;i.toneMapped&&(null!==k&&!0!==k.isXRRenderTarget||(m=N.toneMapping));const h=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=void 0!==h?h.length:0,g=Se.get(i),v=L.state.lights;if(!0===se&&(!0===le||e!==Y)){const t=e===Y&&i.id===z;Ne.setState(i,e,t)}let E=!1;i.version===g.__version?g.needsLights&&g.lightsStateVersion!==v.state.version||g.outputColorSpace!==s||r.isBatchedMesh&&!1===g.batching?E=!0:r.isBatchedMesh||!0!==g.batching?r.isBatchedMesh&&!0===g.batchingColor&&null===r.colorTexture||r.isBatchedMesh&&!1===g.batchingColor&&null!==r.colorTexture||r.isInstancedMesh&&!1===g.instancing?E=!0:r.isInstancedMesh||!0!==g.instancing?r.isSkinnedMesh&&!1===g.skinning?E=!0:r.isSkinnedMesh||!0!==g.skinning?r.isInstancedMesh&&!0===g.instancingColor&&null===r.instanceColor||r.isInstancedMesh&&!1===g.instancingColor&&null!==r.instanceColor||r.isInstancedMesh&&!0===g.instancingMorph&&null===r.morphTexture||r.isInstancedMesh&&!1===g.instancingMorph&&null!==r.morphTexture||g.envMap!==l||!0===i.fog&&g.fog!==a?E=!0:void 0===g.numClippingPlanes||g.numClippingPlanes===Ne.numPlanes&&g.numIntersection===Ne.numIntersection?(g.vertexAlphas!==c||g.vertexTangents!==d||g.morphTargets!==u||g.morphNormals!==f||g.morphColors!==p||g.toneMapping!==m||g.morphTargetsCount!==_)&&(E=!0):E=!0:E=!0:E=!0:E=!0:(E=!0,g.__version=i.version);let T=g.currentProgram;!0===E&&(T=st(i,t,r));let M=!1,x=!1,A=!1;const R=T.getUniforms(),b=g.uniforms;ve.useProgram(T.program)&&(M=!0,x=!0,A=!0);i.id!==z&&(z=i.id,x=!0);if(M||Y!==e){ve.buffers.depth.getReversed()&&!0!==e.reversedDepth&&(e._reversedDepth=!0,e.updateProjectionMatrix()),R.setValue(ke,"projectionMatrix",e.projectionMatrix),R.setValue(ke,"viewMatrix",e.matrixWorldInverse);const t=R.map.cameraPosition;void 0!==t&&t.setValue(ke,de.setFromMatrixPosition(e.matrixWorld)),ge.logarithmicDepthBuffer&&R.setValue(ke,"logDepthBufFC",2/(Math.log(e.far+1)/Math.LN2)),(i.isMeshPhongMaterial||i.isMeshToonMaterial||i.isMeshLambertMaterial||i.isMeshBasicMaterial||i.isMeshStandardMaterial||i.isShaderMaterial)&&R.setValue(ke,"isOrthographic",!0===e.isOrthographicCamera),Y!==e&&(Y=e,x=!0,A=!0)}g.needsLights&&(v.state.directionalShadowMap.length>0&&R.setValue(ke,"directionalShadowMap",v.state.directionalShadowMap,xe),v.state.spotShadowMap.length>0&&R.setValue(ke,"spotShadowMap",v.state.spotShadowMap,xe),v.state.pointShadowMap.length>0&&R.setValue(ke,"pointShadowMap",v.state.pointShadowMap,xe));if(r.isSkinnedMesh){R.setOptional(ke,r,"bindMatrix"),R.setOptional(ke,r,"bindMatrixInverse");const e=r.skeleton;e&&(null===e.boneTexture&&e.computeBoneTexture(),R.setValue(ke,"boneTexture",e.boneTexture,xe))}r.isBatchedMesh&&(R.setOptional(ke,r,"batchingTexture"),R.setValue(ke,"batchingTexture",r._matricesTexture,xe),R.setOptional(ke,r,"batchingIdTexture"),R.setValue(ke,"batchingIdTexture",r._indirectTexture,xe),R.setOptional(ke,r,"batchingColorTexture"),null!==r._colorsTexture&&R.setValue(ke,"batchingColorTexture",r._colorsTexture,xe));const C=n.morphAttributes;void 0===C.position&&void 0===C.normal&&void 0===C.color||Oe.update(r,n,T);(x||g.receiveShadow!==r.receiveShadow)&&(g.receiveShadow=r.receiveShadow,R.setValue(ke,"receiveShadow",r.receiveShadow));i.isMeshGouraudMaterial&&null!==i.envMap&&(b.envMap.value=l,b.flipEnvMap.value=l.isCubeTexture&&!1===l.isRenderTargetTexture?-1:1);i.isMeshStandardMaterial&&null===i.envMap&&null!==t.environment&&(b.envMapIntensity.value=t.environmentIntensity);void 0!==b.dfgLUT&&(b.dfgLUT.value=(null===La&&(La=new Un(Pa,16,16,Te,S),La.name="DFG_LUT",La.minFilter=H,La.magFilter=H,La.wrapS=ft,La.wrapT=ft,La.generateMipmaps=!1,La.needsUpdate=!0),La));x&&(R.setValue(ke,"toneMappingExposure",N.toneMappingExposure),g.needsLights&&(U=A,(P=b).ambientLightColor.needsUpdate=U,P.lightProbe.needsUpdate=U,P.directionalLights.needsUpdate=U,P.directionalLightShadows.needsUpdate=U,P.pointLights.needsUpdate=U,P.pointLightShadows.needsUpdate=U,P.spotLights.needsUpdate=U,P.spotLightShadows.needsUpdate=U,P.rectAreaLights.needsUpdate=U,P.hemisphereLights.needsUpdate=U),a&&!0===i.fog&&De.refreshFogUniforms(b,a),De.refreshMaterialUniforms(b,i,ee,J,L.state.transmissionRenderTarget[e.id]),Rr.upload(ke,lt(g),b,xe));var P,U;i.isShaderMaterial&&!0===i.uniformsNeedUpdate&&(Rr.upload(ke,lt(g),b,xe),i.uniformsNeedUpdate=!1);i.isSpriteMaterial&&R.setValue(ke,"center",r.center);if(R.setValue(ke,"modelViewMatrix",r.modelViewMatrix),R.setValue(ke,"normalMatrix",r.normalMatrix),R.setValue(ke,"modelMatrix",r.matrixWorld),i.isShaderMaterial||i.isRawShaderMaterial){const e=i.uniformsGroups;for(let t=0,n=e.length;t<n;t++){const n=e[t];We.update(n,T),We.bind(n,T)}}return T}(e,t,n,i,r);ve.setMaterial(i,o);let l=n.index,c=1;if(!0===i.wireframe){if(l=Ce.getWireframeAttribute(n),void 0===l)return;c=2}const d=n.drawRange,u=n.attributes.position;let f=d.start*c,p=(d.start+d.count)*c;null!==a&&(f=Math.max(f,a.start*c),p=Math.min(p,(a.start+a.count)*c)),null!==l?(f=Math.max(f,0),p=Math.min(p,l.count)):null!=u&&(f=Math.max(f,0),p=Math.min(p,u.count));const m=p-f;if(m<0||m===1/0)return;let h;Ve.setup(r,i,s,n,l);let _=Be;if(null!==l&&(h=be.get(l),_=Ge,_.setIndex(h)),r.isMesh)!0===i.wireframe?(ve.setLineWidth(i.wireframeLinewidth*me()),_.setMode(ke.LINES)):_.setMode(ke.TRIANGLES);else if(r.isLine){let e=i.linewidth;void 0===e&&(e=1),ve.setLineWidth(e*me()),r.isLineSegments?_.setMode(ke.LINES):r.isLineLoop?_.setMode(ke.LINE_LOOP):_.setMode(ke.LINE_STRIP)}else r.isPoints?_.setMode(ke.POINTS):r.isSprite&&_.setMode(ke.TRIANGLES);if(r.isBatchedMesh)if(null!==r._multiDrawInstances)V("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),_.renderMultiDrawInstances(r._multiDrawStarts,r._multiDrawCounts,r._multiDrawCount,r._multiDrawInstances);else if(he.get("WEBGL_multi_draw"))_.renderMultiDraw(r._multiDrawStarts,r._multiDrawCounts,r._multiDrawCount);else{const e=r._multiDrawStarts,t=r._multiDrawCounts,n=r._multiDrawCount,a=l?be.get(l).bytesPerElement:1,o=Se.get(i).currentProgram.getUniforms();for(let i=0;i<n;i++)o.setValue(ke,"_gl_DrawID",i),_.render(e[i]/a,t[i])}else if(r.isInstancedMesh)_.renderInstances(f,m,r.count);else if(n.isInstancedBufferGeometry){const e=void 0!==n._maxInstanceCount?n._maxInstanceCount:1/0,t=Math.min(n.instanceCount,e);_.renderInstances(f,m,t)}else _.render(f,m)},this.compile=function(e,t,n=null){null===n&&(n=e),L=Ie.get(n),L.init(t),D.push(L),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(L.pushLight(e),e.castShadow&&L.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(L.pushLight(e),e.castShadow&&L.pushShadow(e))}),L.setupLights();const i=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;const t=e.material;if(t)if(Array.isArray(t))for(let r=0;r<t.length;r++){const a=t[r];$e(a,n,e),i.add(a)}else $e(t,n,e),i.add(t)}),L=D.pop(),i},this.compileAsync=function(e,t,n=null){const i=this.compile(e,t,n);return new Promise(t=>{function n(){i.forEach(function(e){Se.get(e).currentProgram.isReady()&&i.delete(e)}),0!==i.size?setTimeout(n,10):t(e)}null!==he.get("KHR_parallel_shader_compile")?n():setTimeout(n,10)})};let Qe=null;function Je(){tt.stop()}function et(){tt.start()}const tt=new On;function nt(e,t,n,i){if(!1===e.visible)return;if(e.layers.test(t.layers))if(e.isGroup)n=e.renderOrder;else if(e.isLOD)!0===e.autoUpdate&&e.update(t);else if(e.isLight)L.pushLight(e),e.castShadow&&L.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||oe.intersectsSprite(e)){i&&ue.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ce);const t=Pe.update(e),r=e.material;r.visible&&P.push(e,t,r,n,ue.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||oe.intersectsObject(e))){const t=Pe.update(e),r=e.material;if(i&&(void 0!==e.boundingSphere?(null===e.boundingSphere&&e.computeBoundingSphere(),ue.copy(e.boundingSphere.center)):(null===t.boundingSphere&&t.computeBoundingSphere(),ue.copy(t.boundingSphere.center)),ue.applyMatrix4(e.matrixWorld).applyMatrix4(ce)),Array.isArray(r)){const i=t.groups;for(let a=0,o=i.length;a<o;a++){const o=i[a],s=r[o.materialIndex];s&&s.visible&&P.push(e,t,s,n,ue.z,o)}}else r.visible&&P.push(e,t,r,n,ue.z,null)}const r=e.children;for(let e=0,a=r.length;e<a;e++)nt(r[e],t,n,i)}function it(e,t,n,i){const{opaque:r,transmissive:a,transparent:o}=e;L.setupLightsView(n),!0===se&&Ne.setGlobalState(N.clippingPlanes,n),i&&ve.viewport(K.copy(i)),r.length>0&&at(r,t,n),a.length>0&&at(a,t,n),o.length>0&&at(o,t,n),ve.buffers.depth.setTest(!0),ve.buffers.depth.setMask(!0),ve.buffers.color.setMask(!0),ve.setPolygonOffset(!1)}function rt(e,t,n,i){if(null!==(!0===n.isScene?n.overrideMaterial:null))return;if(void 0===L.state.transmissionRenderTarget[i.id]){const e=he.has("EXT_color_buffer_half_float")||he.has("EXT_color_buffer_float");L.state.transmissionRenderTarget[i.id]=new O(1,1,{generateMipmaps:!0,type:e?S:T,minFilter:mt,samples:ge.samples,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:p.workingColorSpace})}const r=L.state.transmissionRenderTarget[i.id],a=i.viewport||K;r.setSize(a.z*N.transmissionResolutionScale,a.w*N.transmissionResolutionScale);const s=N.getRenderTarget(),l=N.getActiveCubeFace(),d=N.getActiveMipmapLevel();N.setRenderTarget(r),N.getClearColor(Z),$=N.getClearAlpha(),$<1&&N.setClearColor(16777215,.5),N.clear(),pe&&Fe.render(n);const u=N.toneMapping;N.toneMapping=I;const f=i.viewport;if(void 0!==i.viewport&&(i.viewport=void 0),L.setupLightsView(i),!0===se&&Ne.setGlobalState(N.clippingPlanes,i),at(e,n,i),xe.updateMultisampleRenderTarget(r),xe.updateRenderTargetMipmap(r),!1===he.has("WEBGL_multisampled_render_to_texture")){let e=!1;for(let r=0,a=t.length;r<a;r++){const a=t[r],{object:o,geometry:s,material:l,group:d}=a;if(l.side===_e&&o.layers.test(i.layers)){const t=l.side;l.side=c,l.needsUpdate=!0,ot(o,n,i,s,l,d),l.side=t,l.needsUpdate=!0,e=!0}}!0===e&&(xe.updateMultisampleRenderTarget(r),xe.updateRenderTargetMipmap(r))}N.setRenderTarget(s,l,d),N.setClearColor(Z,$),void 0!==f&&(i.viewport=f),N.toneMapping=u}function at(e,t,n){const i=!0===t.isScene?t.overrideMaterial:null;for(let r=0,a=e.length;r<a;r++){const a=e[r],{object:o,geometry:s,group:l}=a;let c=a.material;!0===c.allowOverride&&null!==i&&(c=i),o.layers.test(n.layers)&&ot(o,t,n,s,c,l)}}function ot(e,t,n,i,r,a){e.onBeforeRender(N,t,n,i,r,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),r.onBeforeRender(N,t,n,i,e,a),!0===r.transparent&&r.side===_e&&!1===r.forceSinglePass?(r.side=c,r.needsUpdate=!0,N.renderBufferDirect(n,t,i,r,e,a),r.side=_,r.needsUpdate=!0,N.renderBufferDirect(n,t,i,r,e,a),r.side=_e):N.renderBufferDirect(n,t,i,r,e,a),e.onAfterRender(N,t,n,i,r,a)}function st(e,t,n){!0!==t.isScene&&(t=fe);const i=Se.get(e),r=L.state.lights,a=L.state.shadowsArray,o=r.state.version,s=Ue.getParameters(e,r.state,a,t,n),l=Ue.getProgramCacheKey(s);let c=i.programs;i.environment=e.isMeshStandardMaterial?t.environment:null,i.fog=t.fog,i.envMap=(e.isMeshStandardMaterial?Re:Ae).get(e.envMap||i.environment),i.envMapRotation=null!==i.environment&&null===e.envMap?t.environmentRotation:e.envMapRotation,void 0===c&&(e.addEventListener("dispose",Ze),c=new Map,i.programs=c);let d=c.get(l);if(void 0!==d){if(i.currentProgram===d&&i.lightsStateVersion===o)return ct(e,s),d}else s.uniforms=Ue.getUniforms(e),e.onBeforeCompile(s,N),d=Ue.acquireProgram(s,l),c.set(l,d),i.uniforms=s.uniforms;const u=i.uniforms;return(e.isShaderMaterial||e.isRawShaderMaterial)&&!0!==e.clipping||(u.clippingPlanes=Ne.uniform),ct(e,s),i.needsLights=function(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&!0===e.lights}(e),i.lightsStateVersion=o,i.needsLights&&(u.ambientLightColor.value=r.state.ambient,u.lightProbe.value=r.state.probe,u.directionalLights.value=r.state.directional,u.directionalLightShadows.value=r.state.directionalShadow,u.spotLights.value=r.state.spot,u.spotLightShadows.value=r.state.spotShadow,u.rectAreaLights.value=r.state.rectArea,u.ltc_1.value=r.state.rectAreaLTC1,u.ltc_2.value=r.state.rectAreaLTC2,u.pointLights.value=r.state.point,u.pointLightShadows.value=r.state.pointShadow,u.hemisphereLights.value=r.state.hemi,u.directionalShadowMap.value=r.state.directionalShadowMap,u.directionalShadowMatrix.value=r.state.directionalShadowMatrix,u.spotShadowMap.value=r.state.spotShadowMap,u.spotLightMatrix.value=r.state.spotLightMatrix,u.spotLightMap.value=r.state.spotLightMap,u.pointShadowMap.value=r.state.pointShadowMap,u.pointShadowMatrix.value=r.state.pointShadowMatrix),i.currentProgram=d,i.uniformsList=null,d}function lt(e){if(null===e.uniformsList){const t=e.currentProgram.getUniforms();e.uniformsList=Rr.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function ct(e,t){const n=Se.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}tt.setAnimationLoop(function(e){Qe&&Qe(e)}),"undefined"!=typeof self&&tt.setContext(self),this.setAnimationLoop=function(e){Qe=e,Ye.setAnimationLoop(e),null===e?tt.stop():tt.start()},Ye.addEventListener("sessionstart",Je),Ye.addEventListener("sessionend",et),this.render=function(e,t){if(void 0!==t&&!0!==t.isCamera)return void y("WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(!0===F)return;const n=!0===Ye.enabled&&!0===Ye.isPresenting,i=null!==w&&(null===k||n)&&w.begin(N,k);if(!0===e.matrixWorldAutoUpdate&&e.updateMatrixWorld(),null===t.parent&&!0===t.matrixWorldAutoUpdate&&t.updateMatrixWorld(),!0!==Ye.enabled||!0!==Ye.isPresenting||null!==w&&!1!==w.isCompositing()||(!0===Ye.cameraAutoUpdate&&Ye.updateCamera(t),t=Ye.getCamera()),!0===e.isScene&&e.onBeforeRender(N,e,t,k),L=Ie.get(e,D.length),L.init(t),D.push(L),ce.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),oe.setFromProjectionMatrix(ce,yn,t.reversedDepth),le=this.localClippingEnabled,se=Ne.init(this.clippingPlanes,le),P=we.get(e,U.length),P.init(),U.push(P),!0===Ye.enabled&&!0===Ye.isPresenting){const e=N.xr.getDepthSensingMesh();null!==e&&nt(e,t,-1/0,N.sortObjects)}nt(e,t,0,N.sortObjects),P.finish(),!0===N.sortObjects&&P.sort(te,ne),pe=!1===Ye.enabled||!1===Ye.isPresenting||!1===Ye.hasDepthSensing(),pe&&Fe.addToRenderList(P,e),this.info.render.frame++,!0===se&&Ne.beginShadows();const r=L.state.shadowsArray;ye.render(r,e,t),!0===se&&Ne.endShadows(),!0===this.info.autoReset&&this.info.reset();if(!1===(i&&w.hasRenderPass())){const n=P.opaque,i=P.transmissive;if(L.setupLights(),t.isArrayCamera){const r=t.cameras;if(i.length>0)for(let t=0,a=r.length;t<a;t++){rt(n,i,e,r[t])}pe&&Fe.render(e);for(let t=0,n=r.length;t<n;t++){const n=r[t];it(P,e,n,n.viewport)}}else i.length>0&&rt(n,i,e,t),pe&&Fe.render(e),it(P,e,t)}null!==k&&0===W&&(xe.updateMultisampleRenderTarget(k),xe.updateRenderTargetMipmap(k)),i&&w.end(N),!0===e.isScene&&e.onAfterRender(N,e,t),Ve.resetDefaultState(),z=-1,Y=null,D.pop(),D.length>0?(L=D[D.length-1],!0===se&&Ne.setGlobalState(N.clippingPlanes,L.state.camera)):L=null,U.pop(),P=U.length>0?U[U.length-1]:null},this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(e,t,n){const i=Se.get(e);i.__autoAllocateDepthBuffer=!1===e.resolveDepthBuffer,!1===i.__autoAllocateDepthBuffer&&(i.__useRenderToTexture=!1),Se.get(e.texture).__webglTexture=t,Se.get(e.depthTexture).__webglTexture=i.__autoAllocateDepthBuffer?void 0:n,i.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){const n=Se.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=void 0===t};const dt=ke.createFramebuffer();this.setRenderTarget=function(e,t=0,n=0){k=e,B=t,W=n;let i=null,r=!1,a=!1;if(e){const o=Se.get(e);if(void 0!==o.__useDefaultFramebuffer)return ve.bindFramebuffer(ke.FRAMEBUFFER,o.__webglFramebuffer),K.copy(e.viewport),q.copy(e.scissor),j=e.scissorTest,ve.viewport(K),ve.scissor(q),ve.setScissorTest(j),void(z=-1);if(void 0===o.__webglFramebuffer)xe.setupRenderTarget(e);else if(o.__hasExternalTextures)xe.rebindTextures(e,Se.get(e.texture).__webglTexture,Se.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){const t=e.depthTexture;if(o.__boundDepthTexture!==t){if(null!==t&&Se.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");xe.setupDepthRenderbuffer(e)}}const s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);const l=Se.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(i=Array.isArray(l[t])?l[t][n]:l[t],r=!0):i=e.samples>0&&!1===xe.useMultisampledRTT(e)?Se.get(e).__webglMultisampledFramebuffer:Array.isArray(l)?l[n]:l,K.copy(e.viewport),q.copy(e.scissor),j=e.scissorTest}else K.copy(ie).multiplyScalar(ee).floor(),q.copy(re).multiplyScalar(ee).floor(),j=ae;0!==n&&(i=dt);if(ve.bindFramebuffer(ke.FRAMEBUFFER,i)&&ve.drawBuffers(e,i),ve.viewport(K),ve.scissor(q),ve.setScissorTest(j),r){const i=Se.get(e.texture);ke.framebufferTexture2D(ke.FRAMEBUFFER,ke.COLOR_ATTACHMENT0,ke.TEXTURE_CUBE_MAP_POSITIVE_X+t,i.__webglTexture,n)}else if(a){const i=t;for(let t=0;t<e.textures.length;t++){const r=Se.get(e.textures[t]);ke.framebufferTextureLayer(ke.FRAMEBUFFER,ke.COLOR_ATTACHMENT0+t,r.__webglTexture,n,i)}}else if(null!==e&&0!==n){const t=Se.get(e.texture);ke.framebufferTexture2D(ke.FRAMEBUFFER,ke.COLOR_ATTACHMENT0,ke.TEXTURE_2D,t.__webglTexture,n)}z=-1},this.readRenderTargetPixels=function(e,t,n,i,r,a,o,s=0){if(!e||!e.isWebGLRenderTarget)return void y("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let l=Se.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&void 0!==o&&(l=l[o]),l){ve.bindFramebuffer(ke.FRAMEBUFFER,l);try{const o=e.textures[s],l=o.format,c=o.type;if(!ge.textureFormatReadable(l))return void y("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!ge.textureTypeReadable(c))return void y("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");t>=0&&t<=e.width-i&&n>=0&&n<=e.height-r&&(e.textures.length>1&&ke.readBuffer(ke.COLOR_ATTACHMENT0+s),ke.readPixels(t,n,i,r,He.convert(l),He.convert(c),a))}finally{const e=null!==k?Se.get(k).__webglFramebuffer:null;ve.bindFramebuffer(ke.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,i,r,a,o,s=0){if(!e||!e.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let l=Se.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&void 0!==o&&(l=l[o]),l){if(t>=0&&t<=e.width-i&&n>=0&&n<=e.height-r){ve.bindFramebuffer(ke.FRAMEBUFFER,l);const o=e.textures[s],c=o.format,d=o.type;if(!ge.textureFormatReadable(c))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ge.textureTypeReadable(d))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const u=ke.createBuffer();ke.bindBuffer(ke.PIXEL_PACK_BUFFER,u),ke.bufferData(ke.PIXEL_PACK_BUFFER,a.byteLength,ke.STREAM_READ),e.textures.length>1&&ke.readBuffer(ke.COLOR_ATTACHMENT0+s),ke.readPixels(t,n,i,r,He.convert(c),He.convert(d),0);const f=null!==k?Se.get(k).__webglFramebuffer:null;ve.bindFramebuffer(ke.FRAMEBUFFER,f);const p=ke.fenceSync(ke.SYNC_GPU_COMMANDS_COMPLETE,0);return ke.flush(),await Fn(ke,p,4),ke.bindBuffer(ke.PIXEL_PACK_BUFFER,u),ke.getBufferSubData(ke.PIXEL_PACK_BUFFER,0,a),ke.deleteBuffer(u),ke.deleteSync(p),a}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(e,t=null,n=0){const i=Math.pow(2,-n),r=Math.floor(e.image.width*i),a=Math.floor(e.image.height*i),o=null!==t?t.x:0,s=null!==t?t.y:0;xe.setTexture2D(e,0),ke.copyTexSubImage2D(ke.TEXTURE_2D,n,0,0,o,s,r,a),ve.unbindTexture()};const ut=ke.createFramebuffer(),pt=ke.createFramebuffer();this.copyTextureToTexture=function(e,t,n=null,i=null,r=0,a=null){let o,s,l,c,d,u,f,p,m;null===a&&(0!==r?(V("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),a=r,r=0):a=0);const h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(null!==n)o=n.max.x-n.min.x,s=n.max.y-n.min.y,l=n.isBox3?n.max.z-n.min.z:1,c=n.min.x,d=n.min.y,u=n.isBox3?n.min.z:0;else{const t=Math.pow(2,-r);o=Math.floor(h.width*t),s=Math.floor(h.height*t),l=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,c=0,d=0,u=0}null!==i?(f=i.x,p=i.y,m=i.z):(f=0,p=0,m=0);const _=He.convert(t.format),g=He.convert(t.type);let v;t.isData3DTexture?(xe.setTexture3D(t,0),v=ke.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(xe.setTexture2DArray(t,0),v=ke.TEXTURE_2D_ARRAY):(xe.setTexture2D(t,0),v=ke.TEXTURE_2D),ke.pixelStorei(ke.UNPACK_FLIP_Y_WEBGL,t.flipY),ke.pixelStorei(ke.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),ke.pixelStorei(ke.UNPACK_ALIGNMENT,t.unpackAlignment);const E=ke.getParameter(ke.UNPACK_ROW_LENGTH),S=ke.getParameter(ke.UNPACK_IMAGE_HEIGHT),T=ke.getParameter(ke.UNPACK_SKIP_PIXELS),M=ke.getParameter(ke.UNPACK_SKIP_ROWS),x=ke.getParameter(ke.UNPACK_SKIP_IMAGES);ke.pixelStorei(ke.UNPACK_ROW_LENGTH,h.width),ke.pixelStorei(ke.UNPACK_IMAGE_HEIGHT,h.height),ke.pixelStorei(ke.UNPACK_SKIP_PIXELS,c),ke.pixelStorei(ke.UNPACK_SKIP_ROWS,d),ke.pixelStorei(ke.UNPACK_SKIP_IMAGES,u);const A=e.isDataArrayTexture||e.isData3DTexture,R=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){const n=Se.get(e),i=Se.get(t),h=Se.get(n.__renderTarget),_=Se.get(i.__renderTarget);ve.bindFramebuffer(ke.READ_FRAMEBUFFER,h.__webglFramebuffer),ve.bindFramebuffer(ke.DRAW_FRAMEBUFFER,_.__webglFramebuffer);for(let n=0;n<l;n++)A&&(ke.framebufferTextureLayer(ke.READ_FRAMEBUFFER,ke.COLOR_ATTACHMENT0,Se.get(e).__webglTexture,r,u+n),ke.framebufferTextureLayer(ke.DRAW_FRAMEBUFFER,ke.COLOR_ATTACHMENT0,Se.get(t).__webglTexture,a,m+n)),ke.blitFramebuffer(c,d,o,s,f,p,o,s,ke.DEPTH_BUFFER_BIT,ke.NEAREST);ve.bindFramebuffer(ke.READ_FRAMEBUFFER,null),ve.bindFramebuffer(ke.DRAW_FRAMEBUFFER,null)}else if(0!==r||e.isRenderTargetTexture||Se.has(e)){const n=Se.get(e),i=Se.get(t);ve.bindFramebuffer(ke.READ_FRAMEBUFFER,ut),ve.bindFramebuffer(ke.DRAW_FRAMEBUFFER,pt);for(let e=0;e<l;e++)A?ke.framebufferTextureLayer(ke.READ_FRAMEBUFFER,ke.COLOR_ATTACHMENT0,n.__webglTexture,r,u+e):ke.framebufferTexture2D(ke.READ_FRAMEBUFFER,ke.COLOR_ATTACHMENT0,ke.TEXTURE_2D,n.__webglTexture,r),R?ke.framebufferTextureLayer(ke.DRAW_FRAMEBUFFER,ke.COLOR_ATTACHMENT0,i.__webglTexture,a,m+e):ke.framebufferTexture2D(ke.DRAW_FRAMEBUFFER,ke.COLOR_ATTACHMENT0,ke.TEXTURE_2D,i.__webglTexture,a),0!==r?ke.blitFramebuffer(c,d,o,s,f,p,o,s,ke.COLOR_BUFFER_BIT,ke.NEAREST):R?ke.copyTexSubImage3D(v,a,f,p,m+e,c,d,o,s):ke.copyTexSubImage2D(v,a,f,p,c,d,o,s);ve.bindFramebuffer(ke.READ_FRAMEBUFFER,null),ve.bindFramebuffer(ke.DRAW_FRAMEBUFFER,null)}else R?e.isDataTexture||e.isData3DTexture?ke.texSubImage3D(v,a,f,p,m,o,s,l,_,g,h.data):t.isCompressedArrayTexture?ke.compressedTexSubImage3D(v,a,f,p,m,o,s,l,_,h.data):ke.texSubImage3D(v,a,f,p,m,o,s,l,_,g,h):e.isDataTexture?ke.texSubImage2D(ke.TEXTURE_2D,a,f,p,o,s,_,g,h.data):e.isCompressedTexture?ke.compressedTexSubImage2D(ke.TEXTURE_2D,a,f,p,h.width,h.height,_,h.data):ke.texSubImage2D(ke.TEXTURE_2D,a,f,p,o,s,_,g,h);ke.pixelStorei(ke.UNPACK_ROW_LENGTH,E),ke.pixelStorei(ke.UNPACK_IMAGE_HEIGHT,S),ke.pixelStorei(ke.UNPACK_SKIP_PIXELS,T),ke.pixelStorei(ke.UNPACK_SKIP_ROWS,M),ke.pixelStorei(ke.UNPACK_SKIP_IMAGES,x),0===a&&t.generateMipmaps&&ke.generateMipmap(v),ve.unbindTexture()},this.initRenderTarget=function(e){void 0===Se.get(e).__webglFramebuffer&&xe.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?xe.setTextureCube(e,0):e.isData3DTexture?xe.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?xe.setTexture2DArray(e,0):xe.setTexture2D(e,0),ve.unbindTexture()},this.resetState=function(){B=0,W=0,k=null,ve.reset(),Ve.reset()},"undefined"!=typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=p._getDrawingBufferColorSpace(e),t.unpackColorSpace=p._getUnpackColorSpace()}}Object.assign(window.THREE,{ACESFilmicToneMapping:Q,AddEquation:Ie,AddOperation:ue,AdditiveBlending:lt,AgXToneMapping:$,AlphaFormat:Ft,AlwaysCompare:Mt,AlwaysDepth:et,ArrayCamera:Cn,BackSide:c,BoxGeometry:s,BufferAttribute:B,BufferGeometry:U,ByteType:Nt,CineonToneMapping:J,ClampToEdgeWrapping:ft,Color:n,ColorManagement:p,ConstantAlphaFactor:ye,ConstantColorFactor:Oe,CubeDepthTexture:Pe,CubeReflectionMapping:P,CubeRefractionMapping:L,CubeTexture:ne,CubeUVReflectionMapping:a,CullFaceBack:it,CullFaceFront:rt,CullFaceNone:nt,CustomBlending:at,CustomToneMapping:j,Data3DTexture:ie,DataArrayTexture:Y,DataTexture:Un,DepthFormat:be,DepthStencilFormat:Rt,DepthTexture:oe,DoubleSide:_e,DstAlphaFactor:We,DstColorFactor:ke,EqualCompare:St,EqualDepth:Qe,EquirectangularReflectionMapping:R,EquirectangularRefractionMapping:b,Euler:u,EventDispatcher:bn,ExternalTexture:Rn,Float32BufferAttribute:K,FloatType:M,FrontSide:_,Frustum:Me,GLSL3:le,GreaterCompare:Et,GreaterDepth:Ze,GreaterEqualCompare:re,GreaterEqualDepth:$e,HalfFloatType:S,IntType:v,Layers:Se,LessCompare:Tt,LessDepth:Je,LessEqualCompare:ae,LessEqualDepth:Ue,LinearFilter:H,LinearMipmapLinearFilter:mt,LinearMipmapNearestFilter:ht,LinearSRGBColorSpace:G,LinearToneMapping:te,LinearTransfer:me,Matrix3:e,Matrix4:f,MaxEquation:dt,Mesh:o,MeshBasicMaterial:N,MeshDepthMaterial:xe,MeshDistanceMaterial:Ae,MinEquation:ct,MirroredRepeatWrapping:ut,MixOperation:fe,MultiplyBlending:ot,MultiplyOperation:pe,NearestFilter:Ce,NearestMipmapLinearFilter:_t,NearestMipmapNearestFilter:gt,NeutralToneMapping:Z,NeverCompare:xt,NeverDepth:tt,NoBlending:F,NoColorSpace:At,NoToneMapping:I,NormalBlending:ge,NotEqualCompare:vt,NotEqualDepth:je,ObjectSpaceNormalMap:Ee,OneFactor:Ke,OneMinusConstantAlphaFactor:Ne,OneMinusConstantColorFactor:Fe,OneMinusDstAlphaFactor:Be,OneMinusDstColorFactor:Ge,OneMinusSrcAlphaFactor:He,OneMinusSrcColorFactor:Ve,OrthographicCamera:D,PCFShadowMap:de,PCFSoftShadowMap:Re,PMREMGenerator:oi,PerspectiveCamera:w,Plane:A,PlaneGeometry:h,R11_EAC_Format:Jt,RED_GREEN_RGTC2_Format:xn,RED_RGTC1_Format:Tn,REVISION:In,RG11_EAC_Format:tn,RGBAFormat:x,RGBAIntegerFormat:Vt,RGBA_ASTC_10x10_Format:hn,RGBA_ASTC_10x5_Format:fn,RGBA_ASTC_10x6_Format:pn,RGBA_ASTC_10x8_Format:mn,RGBA_ASTC_12x10_Format:_n,RGBA_ASTC_12x12_Format:gn,RGBA_ASTC_4x4_Format:rn,RGBA_ASTC_5x4_Format:an,RGBA_ASTC_5x5_Format:on,RGBA_ASTC_6x5_Format:sn,RGBA_ASTC_6x6_Format:ln,RGBA_ASTC_8x5_Format:cn,RGBA_ASTC_8x6_Format:dn,RGBA_ASTC_8x8_Format:un,RGBA_BPTC_Format:vn,RGBA_ETC2_EAC_Format:Qt,RGBA_PVRTC_2BPPV1_Format:jt,RGBA_PVRTC_4BPPV1_Format:qt,RGBA_S3TC_DXT1_Format:kt,RGBA_S3TC_DXT3_Format:zt,RGBA_S3TC_DXT5_Format:Xt,RGBFormat:Ot,RGB_BPTC_SIGNED_Format:En,RGB_BPTC_UNSIGNED_Format:Sn,RGB_ETC1_Format:Zt,RGB_ETC2_Format:$t,RGB_PVRTC_2BPPV1_Format:Kt,RGB_PVRTC_4BPPV1_Format:Yt,RGB_S3TC_DXT1_Format:Wt,RGFormat:Te,RGIntegerFormat:Ht,RawShaderMaterial:q,RedFormat:Bt,RedIntegerFormat:Gt,ReinhardToneMapping:ee,RepeatWrapping:pt,ReverseSubtractEquation:De,SIGNED_R11_EAC_Format:en,SIGNED_RED_GREEN_RGTC2_Format:An,SIGNED_RED_RGTC1_Format:Mn,SIGNED_RG11_EAC_Format:nn,SRGBColorSpace:wn,SRGBTransfer:m,ShaderChunk:Gn,ShaderLib:Vn,ShaderMaterial:l,ShortType:yt,SrcAlphaFactor:Xe,SrcAlphaSaturateFactor:ze,SrcColorFactor:Ye,SubtractEquation:we,SubtractiveBlending:st,TangentSpaceNormalMap:ve,Texture:se,Uint16BufferAttribute:k,Uint32BufferAttribute:W,UniformsLib:Hn,UniformsUtils:he,UnsignedByteType:T,UnsignedInt101111Type:It,UnsignedInt248Type:Ct,UnsignedInt5999Type:wt,UnsignedIntType:Le,UnsignedShort4444Type:Ut,UnsignedShort5551Type:Dt,UnsignedShortType:Pt,VSMShadowMap:ce,Vector2:t,Vector3:r,Vector4:X,WebGLCoordinateSystem:yn,WebGLCubeRenderTarget:C,WebGLRenderTarget:O,WebGLRenderer:Ua,WebGLUtils:Ta,WebXRController:Pn,ZeroFactor:qe,createCanvasElement:Dn,error:y,log:Nn,warn:E,warnOnce:V});

})();

window.__ADDONS=window.__ADDONS||{};

(function(){
const{BufferAttribute,BufferGeometry,Float32BufferAttribute,InstancedBufferAttribute,InterleavedBuffer,InterleavedBufferAttribute,TriangleFanDrawMode,TriangleStripDrawMode,TrianglesDrawMode,Vector3}=window.THREE;

/**
 * @module BufferGeometryUtils
 * @three_import import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
 */

/**
 * Computes vertex tangents using the MikkTSpace algorithm. MikkTSpace generates the same tangents consistently,
 * and is used in most modelling tools and normal map bakers. Use MikkTSpace for materials with normal maps,
 * because inconsistent tangents may lead to subtle visual issues in the normal map, particularly around mirrored
 * UV seams.
 *
 * In comparison to this method, {@link BufferGeometry#computeTangents} (a custom algorithm) generates tangents that
 * probably will not match the tangents in other software. The custom algorithm is sufficient for general use with a
 * custom material, and may be faster than MikkTSpace.
 *
 * Returns the original BufferGeometry. Indexed geometries will be de-indexed. Requires position, normal, and uv attributes.
 *
 * @param {BufferGeometry} geometry - The geometry to compute tangents for.
 * @param {Object} MikkTSpace - Instance of `examples/jsm/libs/mikktspace.module.js`, or `mikktspace` npm package.
 * Await `MikkTSpace.ready` before use.
 * @param {boolean} [negateSign=true] - Whether to negate the sign component (.w) of each tangent.
 * Required for normal map conventions in some formats, including glTF.
 * @return {BufferGeometry} The updated geometry.
 */
function computeMikkTSpaceTangents( geometry, MikkTSpace, negateSign = true ) {

	if ( ! MikkTSpace || ! MikkTSpace.isReady ) {

		throw new Error( 'BufferGeometryUtils: Initialized MikkTSpace library required.' );

	}

	if ( ! geometry.hasAttribute( 'position' ) || ! geometry.hasAttribute( 'normal' ) || ! geometry.hasAttribute( 'uv' ) ) {

		throw new Error( 'BufferGeometryUtils: Tangents require "position", "normal", and "uv" attributes.' );

	}

	function getAttributeArray( attribute ) {

		if ( attribute.normalized || attribute.isInterleavedBufferAttribute ) {

			const dstArray = new Float32Array( attribute.count * attribute.itemSize );

			for ( let i = 0, j = 0; i < attribute.count; i ++ ) {

				dstArray[ j ++ ] = attribute.getX( i );
				dstArray[ j ++ ] = attribute.getY( i );

				if ( attribute.itemSize > 2 ) {

					dstArray[ j ++ ] = attribute.getZ( i );

				}

			}

			return dstArray;

		}

		if ( attribute.array instanceof Float32Array ) {

			return attribute.array;

		}

		return new Float32Array( attribute.array );

	}

	// MikkTSpace algorithm requires non-indexed input.

	const _geometry = geometry.index ? geometry.toNonIndexed() : geometry;

	// Compute vertex tangents.

	const tangents = MikkTSpace.generateTangents(

		getAttributeArray( _geometry.attributes.position ),
		getAttributeArray( _geometry.attributes.normal ),
		getAttributeArray( _geometry.attributes.uv )

	);

	// Texture coordinate convention of glTF differs from the apparent
	// default of the MikkTSpace library; .w component must be flipped.

	if ( negateSign ) {

		for ( let i = 3; i < tangents.length; i += 4 ) {

			tangents[ i ] *= - 1;

		}

	}

	//

	_geometry.setAttribute( 'tangent', new BufferAttribute( tangents, 4 ) );

	if ( geometry !== _geometry ) {

		geometry.copy( _geometry );

	}

	return geometry;

}

/**
 * Merges a set of geometries into a single instance. All geometries must have compatible attributes.
 *
 * @param {Array<BufferGeometry>} geometries - The geometries to merge.
 * @param {boolean} [useGroups=false] - Whether to use groups or not.
 * @return {?BufferGeometry} The merged geometry. Returns `null` if the merge does not succeed.
 */
function mergeGeometries( geometries, useGroups = false ) {

	const isIndexed = geometries[ 0 ].index !== null;

	const attributesUsed = new Set( Object.keys( geometries[ 0 ].attributes ) );
	const morphAttributesUsed = new Set( Object.keys( geometries[ 0 ].morphAttributes ) );

	const attributes = {};
	const morphAttributes = {};

	const morphTargetsRelative = geometries[ 0 ].morphTargetsRelative;

	const mergedGeometry = new BufferGeometry();

	let offset = 0;

	for ( let i = 0; i < geometries.length; ++ i ) {

		const geometry = geometries[ i ];
		let attributesCount = 0;

		// ensure that all geometries are indexed, or none

		if ( isIndexed !== ( geometry.index !== null ) ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.' );
			return null;

		}

		// gather attributes, exit early if they're different

		for ( const name in geometry.attributes ) {

			if ( ! attributesUsed.has( name ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.' );
				return null;

			}

			if ( attributes[ name ] === undefined ) attributes[ name ] = [];

			attributes[ name ].push( geometry.attributes[ name ] );

			attributesCount ++;

		}

		// ensure geometries have the same number of attributes

		if ( attributesCount !== attributesUsed.size ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. Make sure all geometries have the same number of attributes.' );
			return null;

		}

		// gather morph attributes, exit early if they're different

		if ( morphTargetsRelative !== geometry.morphTargetsRelative ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. .morphTargetsRelative must be consistent throughout all geometries.' );
			return null;

		}

		for ( const name in geometry.morphAttributes ) {

			if ( ! morphAttributesUsed.has( name ) ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '.  .morphAttributes must be consistent throughout all geometries.' );
				return null;

			}

			if ( morphAttributes[ name ] === undefined ) morphAttributes[ name ] = [];

			morphAttributes[ name ].push( geometry.morphAttributes[ name ] );

		}

		if ( useGroups ) {

			let count;

			if ( isIndexed ) {

				count = geometry.index.count;

			} else if ( geometry.attributes.position !== undefined ) {

				count = geometry.attributes.position.count;

			} else {

				console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ' + i + '. The geometry must have either an index or a position attribute' );
				return null;

			}

			mergedGeometry.addGroup( offset, count, i );

			offset += count;

		}

	}

	// merge indices

	if ( isIndexed ) {

		let indexOffset = 0;
		const mergedIndex = [];

		for ( let i = 0; i < geometries.length; ++ i ) {

			const index = geometries[ i ].index;

			for ( let j = 0; j < index.count; ++ j ) {

				mergedIndex.push( index.getX( j ) + indexOffset );

			}

			indexOffset += geometries[ i ].attributes.position.count;

		}

		mergedGeometry.setIndex( mergedIndex );

	}

	// merge attributes

	for ( const name in attributes ) {

		const mergedAttribute = mergeAttributes( attributes[ name ] );

		if ( ! mergedAttribute ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the ' + name + ' attribute.' );
			return null;

		}

		mergedGeometry.setAttribute( name, mergedAttribute );

	}

	// merge morph attributes

	for ( const name in morphAttributes ) {

		const numMorphTargets = morphAttributes[ name ][ 0 ].length;

		if ( numMorphTargets === 0 ) break;

		mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
		mergedGeometry.morphAttributes[ name ] = [];

		for ( let i = 0; i < numMorphTargets; ++ i ) {

			const morphAttributesToMerge = [];

			for ( let j = 0; j < morphAttributes[ name ].length; ++ j ) {

				morphAttributesToMerge.push( morphAttributes[ name ][ j ][ i ] );

			}

			const mergedMorphAttribute = mergeAttributes( morphAttributesToMerge );

			if ( ! mergedMorphAttribute ) {

				console.error( 'THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the ' + name + ' morphAttribute.' );
				return null;

			}

			mergedGeometry.morphAttributes[ name ].push( mergedMorphAttribute );

		}

	}

	return mergedGeometry;

}

/**
 * Merges a set of attributes into a single instance. All attributes must have compatible properties and types.
 * Instances of {@link InterleavedBufferAttribute} are not supported.
 *
 * @param {Array<BufferAttribute>} attributes - The attributes to merge.
 * @return {?BufferAttribute} The merged attribute. Returns `null` if the merge does not succeed.
 */
function mergeAttributes( attributes ) {

	let TypedArray;
	let itemSize;
	let normalized;
	let gpuType = - 1;
	let arrayLength = 0;

	for ( let i = 0; i < attributes.length; ++ i ) {

		const attribute = attributes[ i ];

		if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
		if ( TypedArray !== attribute.array.constructor ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.' );
			return null;

		}

		if ( itemSize === undefined ) itemSize = attribute.itemSize;
		if ( itemSize !== attribute.itemSize ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.' );
			return null;

		}

		if ( normalized === undefined ) normalized = attribute.normalized;
		if ( normalized !== attribute.normalized ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.' );
			return null;

		}

		if ( gpuType === - 1 ) gpuType = attribute.gpuType;
		if ( gpuType !== attribute.gpuType ) {

			console.error( 'THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.' );
			return null;

		}

		arrayLength += attribute.count * itemSize;

	}

	const array = new TypedArray( arrayLength );
	const result = new BufferAttribute( array, itemSize, normalized );
	let offset = 0;

	for ( let i = 0; i < attributes.length; ++ i ) {

		const attribute = attributes[ i ];
		if ( attribute.isInterleavedBufferAttribute ) {

			const tupleOffset = offset / itemSize;
			for ( let j = 0, l = attribute.count; j < l; j ++ ) {

				for ( let c = 0; c < itemSize; c ++ ) {

					const value = attribute.getComponent( j, c );
					result.setComponent( j + tupleOffset, c, value );

				}

			}

		} else {

			array.set( attribute.array, offset );

		}

		offset += attribute.count * itemSize;

	}

	if ( gpuType !== undefined ) {

		result.gpuType = gpuType;

	}

	return result;

}

/**
 * Performs a deep clone of the given buffer attribute.
 *
 * @param {BufferAttribute} attribute - The attribute to clone.
 * @return {BufferAttribute} The cloned attribute.
 */
function deepCloneAttribute( attribute ) {

	if ( attribute.isInstancedInterleavedBufferAttribute || attribute.isInterleavedBufferAttribute ) {

		return deinterleaveAttribute( attribute );

	}

	if ( attribute.isInstancedBufferAttribute ) {

		return new InstancedBufferAttribute().copy( attribute );

	}

	return new BufferAttribute().copy( attribute );

}

/**
 * Interleaves a set of attributes and returns a new array of corresponding attributes that share a
 * single {@link InterleavedBuffer} instance. All attributes must have compatible types.
 *
 * @param {Array<BufferAttribute>} attributes - The attributes to interleave.
 * @return {?Array<InterleavedBufferAttribute>} An array of interleaved attributes. If interleave does not succeed, the method returns `null`.
 */
function interleaveAttributes( attributes ) {

	// Interleaves the provided attributes into an InterleavedBuffer and returns
	// a set of InterleavedBufferAttributes for each attribute
	let TypedArray;
	let arrayLength = 0;
	let stride = 0;

	// calculate the length and type of the interleavedBuffer
	for ( let i = 0, l = attributes.length; i < l; ++ i ) {

		const attribute = attributes[ i ];

		if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
		if ( TypedArray !== attribute.array.constructor ) {

			console.error( 'AttributeBuffers of different types cannot be interleaved' );
			return null;

		}

		arrayLength += attribute.array.length;
		stride += attribute.itemSize;

	}

	// Create the set of buffer attributes
	const interleavedBuffer = new InterleavedBuffer( new TypedArray( arrayLength ), stride );
	let offset = 0;
	const res = [];
	const getters = [ 'getX', 'getY', 'getZ', 'getW' ];
	const setters = [ 'setX', 'setY', 'setZ', 'setW' ];

	for ( let j = 0, l = attributes.length; j < l; j ++ ) {

		const attribute = attributes[ j ];
		const itemSize = attribute.itemSize;
		const count = attribute.count;
		const iba = new InterleavedBufferAttribute( interleavedBuffer, itemSize, offset, attribute.normalized );
		res.push( iba );

		offset += itemSize;

		// Move the data for each attribute into the new interleavedBuffer
		// at the appropriate offset
		for ( let c = 0; c < count; c ++ ) {

			for ( let k = 0; k < itemSize; k ++ ) {

				iba[ setters[ k ] ]( c, attribute[ getters[ k ] ]( c ) );

			}

		}

	}

	return res;

}

/**
 * Returns a new, non-interleaved version of the given attribute.
 *
 * @param {InterleavedBufferAttribute} attribute - The interleaved attribute.
 * @return {BufferAttribute} The non-interleaved attribute.
 */
function deinterleaveAttribute( attribute ) {

	const cons = attribute.data.array.constructor;
	const count = attribute.count;
	const itemSize = attribute.itemSize;
	const normalized = attribute.normalized;

	const array = new cons( count * itemSize );
	let newAttribute;
	if ( attribute.isInstancedInterleavedBufferAttribute ) {

		newAttribute = new InstancedBufferAttribute( array, itemSize, normalized, attribute.meshPerAttribute );

	} else {

		newAttribute = new BufferAttribute( array, itemSize, normalized );

	}

	for ( let i = 0; i < count; i ++ ) {

		newAttribute.setX( i, attribute.getX( i ) );

		if ( itemSize >= 2 ) {

			newAttribute.setY( i, attribute.getY( i ) );

		}

		if ( itemSize >= 3 ) {

			newAttribute.setZ( i, attribute.getZ( i ) );

		}

		if ( itemSize >= 4 ) {

			newAttribute.setW( i, attribute.getW( i ) );

		}

	}

	return newAttribute;

}

/**
 * Deinterleaves all attributes on the given geometry.
 *
 * @param {BufferGeometry} geometry - The geometry to deinterleave.
 */
function deinterleaveGeometry( geometry ) {

	const attributes = geometry.attributes;
	const morphTargets = geometry.morphTargets;
	const attrMap = new Map();

	for ( const key in attributes ) {

		const attr = attributes[ key ];
		if ( attr.isInterleavedBufferAttribute ) {

			if ( ! attrMap.has( attr ) ) {

				attrMap.set( attr, deinterleaveAttribute( attr ) );

			}

			attributes[ key ] = attrMap.get( attr );

		}

	}

	for ( const key in morphTargets ) {

		const attr = morphTargets[ key ];
		if ( attr.isInterleavedBufferAttribute ) {

			if ( ! attrMap.has( attr ) ) {

				attrMap.set( attr, deinterleaveAttribute( attr ) );

			}

			morphTargets[ key ] = attrMap.get( attr );

		}

	}

}

/**
 * Returns the amount of bytes used by all attributes to represent the geometry.
 *
 * @param {BufferGeometry} geometry - The geometry.
 * @return {number} The estimate bytes used.
 */
function estimateBytesUsed( geometry ) {

	// Return the estimated memory used by this geometry in bytes
	// Calculate using itemSize, count, and BYTES_PER_ELEMENT to account
	// for InterleavedBufferAttributes.
	let mem = 0;
	for ( const name in geometry.attributes ) {

		const attr = geometry.getAttribute( name );
		mem += attr.count * attr.itemSize * attr.array.BYTES_PER_ELEMENT;

	}

	const indices = geometry.getIndex();
	mem += indices ? indices.count * indices.itemSize * indices.array.BYTES_PER_ELEMENT : 0;
	return mem;

}

/**
 * Returns a new geometry with vertices for which all similar vertex attributes (within tolerance) are merged.
 *
 * @param {BufferGeometry} geometry - The geometry to merge vertices for.
 * @param {number} [tolerance=1e-4] - The tolerance value.
 * @return {BufferGeometry} - The new geometry with merged vertices.
 */
function mergeVertices( geometry, tolerance = 1e-4 ) {

	tolerance = Math.max( tolerance, Number.EPSILON );

	// Generate an index buffer if the geometry doesn't have one, or optimize it
	// if it's already available.
	const hashToIndex = {};
	const indices = geometry.getIndex();
	const positions = geometry.getAttribute( 'position' );
	const vertexCount = indices ? indices.count : positions.count;

	// next value for triangle indices
	let nextIndex = 0;

	// attributes and new attribute arrays
	const attributeNames = Object.keys( geometry.attributes );
	const tmpAttributes = {};
	const tmpMorphAttributes = {};
	const newIndices = [];
	const getters = [ 'getX', 'getY', 'getZ', 'getW' ];
	const setters = [ 'setX', 'setY', 'setZ', 'setW' ];

	// Initialize the arrays, allocating space conservatively. Extra
	// space will be trimmed in the last step.
	for ( let i = 0, l = attributeNames.length; i < l; i ++ ) {

		const name = attributeNames[ i ];
		const attr = geometry.attributes[ name ];

		tmpAttributes[ name ] = new attr.constructor(
			new attr.array.constructor( attr.count * attr.itemSize ),
			attr.itemSize,
			attr.normalized
		);

		const morphAttributes = geometry.morphAttributes[ name ];
		if ( morphAttributes ) {

			if ( ! tmpMorphAttributes[ name ] ) tmpMorphAttributes[ name ] = [];
			morphAttributes.forEach( ( morphAttr, i ) => {

				const array = new morphAttr.array.constructor( morphAttr.count * morphAttr.itemSize );
				tmpMorphAttributes[ name ][ i ] = new morphAttr.constructor( array, morphAttr.itemSize, morphAttr.normalized );

			} );

		}

	}

	// convert the error tolerance to an amount of decimal places to truncate to
	const halfTolerance = tolerance * 0.5;
	const exponent = Math.log10( 1 / tolerance );
	const hashMultiplier = Math.pow( 10, exponent );
	const hashAdditive = halfTolerance * hashMultiplier;
	for ( let i = 0; i < vertexCount; i ++ ) {

		const index = indices ? indices.getX( i ) : i;

		// Generate a hash for the vertex attributes at the current index 'i'
		let hash = '';
		for ( let j = 0, l = attributeNames.length; j < l; j ++ ) {

			const name = attributeNames[ j ];
			const attribute = geometry.getAttribute( name );
			const itemSize = attribute.itemSize;

			for ( let k = 0; k < itemSize; k ++ ) {

				// double tilde truncates the decimal value
				hash += `${ ~ ~ ( attribute[ getters[ k ] ]( index ) * hashMultiplier + hashAdditive ) },`;

			}

		}

		// Add another reference to the vertex if it's already
		// used by another index
		if ( hash in hashToIndex ) {

			newIndices.push( hashToIndex[ hash ] );

		} else {

			// copy data to the new index in the temporary attributes
			for ( let j = 0, l = attributeNames.length; j < l; j ++ ) {

				const name = attributeNames[ j ];
				const attribute = geometry.getAttribute( name );
				const morphAttributes = geometry.morphAttributes[ name ];
				const itemSize = attribute.itemSize;
				const newArray = tmpAttributes[ name ];
				const newMorphArrays = tmpMorphAttributes[ name ];

				for ( let k = 0; k < itemSize; k ++ ) {

					const getterFunc = getters[ k ];
					const setterFunc = setters[ k ];
					newArray[ setterFunc ]( nextIndex, attribute[ getterFunc ]( index ) );

					if ( morphAttributes ) {

						for ( let m = 0, ml = morphAttributes.length; m < ml; m ++ ) {

							newMorphArrays[ m ][ setterFunc ]( nextIndex, morphAttributes[ m ][ getterFunc ]( index ) );

						}

					}

				}

			}

			hashToIndex[ hash ] = nextIndex;
			newIndices.push( nextIndex );
			nextIndex ++;

		}

	}

	// generate result BufferGeometry
	const result = geometry.clone();
	for ( const name in geometry.attributes ) {

		const tmpAttribute = tmpAttributes[ name ];

		result.setAttribute( name, new tmpAttribute.constructor(
			tmpAttribute.array.slice( 0, nextIndex * tmpAttribute.itemSize ),
			tmpAttribute.itemSize,
			tmpAttribute.normalized,
		) );

		if ( ! ( name in tmpMorphAttributes ) ) continue;

		for ( let j = 0; j < tmpMorphAttributes[ name ].length; j ++ ) {

			const tmpMorphAttribute = tmpMorphAttributes[ name ][ j ];

			result.morphAttributes[ name ][ j ] = new tmpMorphAttribute.constructor(
				tmpMorphAttribute.array.slice( 0, nextIndex * tmpMorphAttribute.itemSize ),
				tmpMorphAttribute.itemSize,
				tmpMorphAttribute.normalized,
			);

		}

	}

	// indices

	result.setIndex( newIndices );

	return result;

}

/**
 * Returns a new indexed geometry based on `TrianglesDrawMode` draw mode.
 * This mode corresponds to the `gl.TRIANGLES` primitive in WebGL.
 *
 * @param {BufferGeometry} geometry - The geometry to convert.
 * @param {number} drawMode - The current draw mode.
 * @return {BufferGeometry} The new geometry using `TrianglesDrawMode`.
 */
function toTrianglesDrawMode( geometry, drawMode ) {

	if ( drawMode === TrianglesDrawMode ) {

		console.warn( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.' );
		return geometry;

	}

	if ( drawMode === TriangleFanDrawMode || drawMode === TriangleStripDrawMode ) {

		let index = geometry.getIndex();

		// generate index if not present

		if ( index === null ) {

			const indices = [];

			const position = geometry.getAttribute( 'position' );

			if ( position !== undefined ) {

				for ( let i = 0; i < position.count; i ++ ) {

					indices.push( i );

				}

				geometry.setIndex( indices );
				index = geometry.getIndex();

			} else {

				console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.' );
				return geometry;

			}

		}

		//

		const numberOfTriangles = index.count - 2;
		const newIndices = [];

		if ( drawMode === TriangleFanDrawMode ) {

			// gl.TRIANGLE_FAN

			for ( let i = 1; i <= numberOfTriangles; i ++ ) {

				newIndices.push( index.getX( 0 ) );
				newIndices.push( index.getX( i ) );
				newIndices.push( index.getX( i + 1 ) );

			}

		} else {

			// gl.TRIANGLE_STRIP

			for ( let i = 0; i < numberOfTriangles; i ++ ) {

				if ( i % 2 === 0 ) {

					newIndices.push( index.getX( i ) );
					newIndices.push( index.getX( i + 1 ) );
					newIndices.push( index.getX( i + 2 ) );

				} else {

					newIndices.push( index.getX( i + 2 ) );
					newIndices.push( index.getX( i + 1 ) );
					newIndices.push( index.getX( i ) );

				}

			}

		}

		if ( ( newIndices.length / 3 ) !== numberOfTriangles ) {

			console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.' );

		}

		// build final geometry

		const newGeometry = geometry.clone();
		newGeometry.setIndex( newIndices );
		newGeometry.clearGroups();

		return newGeometry;

	} else {

		console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:', drawMode );
		return geometry;

	}

}

/**
 * Calculates the morphed attributes of a morphed/skinned BufferGeometry.
 *
 * Helpful for Raytracing or Decals (i.e. a `DecalGeometry` applied to a morphed Object with a `BufferGeometry`
 * will use the original `BufferGeometry`, not the morphed/skinned one, generating an incorrect result.
 * Using this function to create a shadow `Object3`D the `DecalGeometry` can be correctly generated).
 *
 * @param {Mesh|Line|Points} object - The 3D object to compute morph attributes for.
 * @return {Object} An object with original position/normal attributes and morphed ones.
 */
function computeMorphedAttributes( object ) {

	const _vA = new Vector3();
	const _vB = new Vector3();
	const _vC = new Vector3();

	const _tempA = new Vector3();
	const _tempB = new Vector3();
	const _tempC = new Vector3();

	const _morphA = new Vector3();
	const _morphB = new Vector3();
	const _morphC = new Vector3();

	function _calculateMorphedAttributeData(
		object,
		attribute,
		morphAttribute,
		morphTargetsRelative,
		a,
		b,
		c,
		modifiedAttributeArray
	) {

		_vA.fromBufferAttribute( attribute, a );
		_vB.fromBufferAttribute( attribute, b );
		_vC.fromBufferAttribute( attribute, c );

		const morphInfluences = object.morphTargetInfluences;

		if ( morphAttribute && morphInfluences ) {

			_morphA.set( 0, 0, 0 );
			_morphB.set( 0, 0, 0 );
			_morphC.set( 0, 0, 0 );

			for ( let i = 0, il = morphAttribute.length; i < il; i ++ ) {

				const influence = morphInfluences[ i ];
				const morph = morphAttribute[ i ];

				if ( influence === 0 ) continue;

				_tempA.fromBufferAttribute( morph, a );
				_tempB.fromBufferAttribute( morph, b );
				_tempC.fromBufferAttribute( morph, c );

				if ( morphTargetsRelative ) {

					_morphA.addScaledVector( _tempA, influence );
					_morphB.addScaledVector( _tempB, influence );
					_morphC.addScaledVector( _tempC, influence );

				} else {

					_morphA.addScaledVector( _tempA.sub( _vA ), influence );
					_morphB.addScaledVector( _tempB.sub( _vB ), influence );
					_morphC.addScaledVector( _tempC.sub( _vC ), influence );

				}

			}

			_vA.add( _morphA );
			_vB.add( _morphB );
			_vC.add( _morphC );

		}

		if ( object.isSkinnedMesh ) {

			object.applyBoneTransform( a, _vA );
			object.applyBoneTransform( b, _vB );
			object.applyBoneTransform( c, _vC );

		}

		modifiedAttributeArray[ a * 3 + 0 ] = _vA.x;
		modifiedAttributeArray[ a * 3 + 1 ] = _vA.y;
		modifiedAttributeArray[ a * 3 + 2 ] = _vA.z;
		modifiedAttributeArray[ b * 3 + 0 ] = _vB.x;
		modifiedAttributeArray[ b * 3 + 1 ] = _vB.y;
		modifiedAttributeArray[ b * 3 + 2 ] = _vB.z;
		modifiedAttributeArray[ c * 3 + 0 ] = _vC.x;
		modifiedAttributeArray[ c * 3 + 1 ] = _vC.y;
		modifiedAttributeArray[ c * 3 + 2 ] = _vC.z;

	}

	const geometry = object.geometry;
	const material = object.material;

	let a, b, c;
	const index = geometry.index;
	const positionAttribute = geometry.attributes.position;
	const morphPosition = geometry.morphAttributes.position;
	const morphTargetsRelative = geometry.morphTargetsRelative;
	const normalAttribute = geometry.attributes.normal;
	const morphNormal = geometry.morphAttributes.position;

	const groups = geometry.groups;
	const drawRange = geometry.drawRange;
	let i, j, il, jl;
	let group;
	let start, end;

	const modifiedPosition = new Float32Array( positionAttribute.count * positionAttribute.itemSize );
	const modifiedNormal = new Float32Array( normalAttribute.count * normalAttribute.itemSize );

	if ( index !== null ) {

		// indexed buffer geometry

		if ( Array.isArray( material ) ) {

			for ( i = 0, il = groups.length; i < il; i ++ ) {

				group = groups[ i ];

				start = Math.max( group.start, drawRange.start );
				end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

				for ( j = start, jl = end; j < jl; j += 3 ) {

					a = index.getX( j );
					b = index.getX( j + 1 );
					c = index.getX( j + 2 );

					_calculateMorphedAttributeData(
						object,
						positionAttribute,
						morphPosition,
						morphTargetsRelative,
						a, b, c,
						modifiedPosition
					);

					_calculateMorphedAttributeData(
						object,
						normalAttribute,
						morphNormal,
						morphTargetsRelative,
						a, b, c,
						modifiedNormal
					);

				}

			}

		} else {

			start = Math.max( 0, drawRange.start );
			end = Math.min( index.count, ( drawRange.start + drawRange.count ) );

			for ( i = start, il = end; i < il; i += 3 ) {

				a = index.getX( i );
				b = index.getX( i + 1 );
				c = index.getX( i + 2 );

				_calculateMorphedAttributeData(
					object,
					positionAttribute,
					morphPosition,
					morphTargetsRelative,
					a, b, c,
					modifiedPosition
				);

				_calculateMorphedAttributeData(
					object,
					normalAttribute,
					morphNormal,
					morphTargetsRelative,
					a, b, c,
					modifiedNormal
				);

			}

		}

	} else {

		// non-indexed buffer geometry

		if ( Array.isArray( material ) ) {

			for ( i = 0, il = groups.length; i < il; i ++ ) {

				group = groups[ i ];

				start = Math.max( group.start, drawRange.start );
				end = Math.min( ( group.start + group.count ), ( drawRange.start + drawRange.count ) );

				for ( j = start, jl = end; j < jl; j += 3 ) {

					a = j;
					b = j + 1;
					c = j + 2;

					_calculateMorphedAttributeData(
						object,
						positionAttribute,
						morphPosition,
						morphTargetsRelative,
						a, b, c,
						modifiedPosition
					);

					_calculateMorphedAttributeData(
						object,
						normalAttribute,
						morphNormal,
						morphTargetsRelative,
						a, b, c,
						modifiedNormal
					);

				}

			}

		} else {

			start = Math.max( 0, drawRange.start );
			end = Math.min( positionAttribute.count, ( drawRange.start + drawRange.count ) );

			for ( i = start, il = end; i < il; i += 3 ) {

				a = i;
				b = i + 1;
				c = i + 2;

				_calculateMorphedAttributeData(
					object,
					positionAttribute,
					morphPosition,
					morphTargetsRelative,
					a, b, c,
					modifiedPosition
				);

				_calculateMorphedAttributeData(
					object,
					normalAttribute,
					morphNormal,
					morphTargetsRelative,
					a, b, c,
					modifiedNormal
				);

			}

		}

	}

	const morphedPositionAttribute = new Float32BufferAttribute( modifiedPosition, 3 );
	const morphedNormalAttribute = new Float32BufferAttribute( modifiedNormal, 3 );

	return {

		positionAttribute: positionAttribute,
		normalAttribute: normalAttribute,
		morphedPositionAttribute: morphedPositionAttribute,
		morphedNormalAttribute: morphedNormalAttribute

	};

}

/**
 * Merges the {@link BufferGeometry#groups} for the given geometry.
 *
 * @param {BufferGeometry} geometry - The geometry to modify.
 * @return {BufferGeometry} - The updated geometry
 */
function mergeGroups( geometry ) {

	if ( geometry.groups.length === 0 ) {

		console.warn( 'THREE.BufferGeometryUtils.mergeGroups(): No groups are defined. Nothing to merge.' );
		return geometry;

	}

	let groups = geometry.groups;

	// sort groups by material index

	groups = groups.sort( ( a, b ) => {

		if ( a.materialIndex !== b.materialIndex ) return a.materialIndex - b.materialIndex;

		return a.start - b.start;

	} );

	// create index for non-indexed geometries

	if ( geometry.getIndex() === null ) {

		const positionAttribute = geometry.getAttribute( 'position' );
		const indices = [];

		for ( let i = 0; i < positionAttribute.count; i += 3 ) {

			indices.push( i, i + 1, i + 2 );

		}

		geometry.setIndex( indices );

	}

	// sort index

	const index = geometry.getIndex();

	const newIndices = [];

	for ( let i = 0; i < groups.length; i ++ ) {

		const group = groups[ i ];

		const groupStart = group.start;
		const groupLength = groupStart + group.count;

		for ( let j = groupStart; j < groupLength; j ++ ) {

			newIndices.push( index.getX( j ) );

		}

	}

	geometry.dispose(); // Required to force buffer recreation
	geometry.setIndex( newIndices );

	// update groups indices

	let start = 0;

	for ( let i = 0; i < groups.length; i ++ ) {

		const group = groups[ i ];

		group.start = start;
		start += group.count;

	}

	// merge groups

	let currentGroup = groups[ 0 ];

	geometry.groups = [ currentGroup ];

	for ( let i = 1; i < groups.length; i ++ ) {

		const group = groups[ i ];

		if ( currentGroup.materialIndex === group.materialIndex ) {

			currentGroup.count += group.count;

		} else {

			currentGroup = group;
			geometry.groups.push( currentGroup );

		}

	}

	return geometry;

}

/**
 * Modifies the supplied geometry if it is non-indexed, otherwise creates a new,
 * non-indexed geometry. Returns the geometry with smooth normals everywhere except
 * faces that meet at an angle greater than the crease angle.
 *
 * @param {BufferGeometry} geometry - The geometry to modify.
 * @param {number} [creaseAngle=Math.PI/3] - The crease angle in radians.
 * @return {BufferGeometry} - The updated geometry
 */
function toCreasedNormals( geometry, creaseAngle = Math.PI / 3 /* 60 degrees */ ) {

	const creaseDot = Math.cos( creaseAngle );
	const hashMultiplier = ( 1 + 1e-10 ) * 1e2;

	// reusable vectors
	const verts = [ new Vector3(), new Vector3(), new Vector3() ];
	const tempVec1 = new Vector3();
	const tempVec2 = new Vector3();
	const tempNorm = new Vector3();
	const tempNorm2 = new Vector3();

	// hashes a vector
	function hashVertex( v ) {

		const x = ~ ~ ( v.x * hashMultiplier );
		const y = ~ ~ ( v.y * hashMultiplier );
		const z = ~ ~ ( v.z * hashMultiplier );
		return `${x},${y},${z}`;

	}

	// BufferGeometry.toNonIndexed() warns if the geometry is non-indexed
	// and returns the original geometry
	const resultGeometry = geometry.index ? geometry.toNonIndexed() : geometry;
	const posAttr = resultGeometry.attributes.position;
	const vertexMap = {};

	// find all the normals shared by commonly located vertices
	for ( let i = 0, l = posAttr.count / 3; i < l; i ++ ) {

		const i3 = 3 * i;
		const a = verts[ 0 ].fromBufferAttribute( posAttr, i3 + 0 );
		const b = verts[ 1 ].fromBufferAttribute( posAttr, i3 + 1 );
		const c = verts[ 2 ].fromBufferAttribute( posAttr, i3 + 2 );

		tempVec1.subVectors( c, b );
		tempVec2.subVectors( a, b );

		// add the normal to the map for all vertices
		const normal = new Vector3().crossVectors( tempVec1, tempVec2 ).normalize();
		for ( let n = 0; n < 3; n ++ ) {

			const vert = verts[ n ];
			const hash = hashVertex( vert );
			if ( ! ( hash in vertexMap ) ) {

				vertexMap[ hash ] = [];

			}

			vertexMap[ hash ].push( normal );

		}

	}

	// average normals from all vertices that share a common location if they are within the
	// provided crease threshold
	const normalArray = new Float32Array( posAttr.count * 3 );
	const normAttr = new BufferAttribute( normalArray, 3, false );
	for ( let i = 0, l = posAttr.count / 3; i < l; i ++ ) {

		// get the face normal for this vertex
		const i3 = 3 * i;
		const a = verts[ 0 ].fromBufferAttribute( posAttr, i3 + 0 );
		const b = verts[ 1 ].fromBufferAttribute( posAttr, i3 + 1 );
		const c = verts[ 2 ].fromBufferAttribute( posAttr, i3 + 2 );

		tempVec1.subVectors( c, b );
		tempVec2.subVectors( a, b );

		tempNorm.crossVectors( tempVec1, tempVec2 ).normalize();

		// average all normals that meet the threshold and set the normal value
		for ( let n = 0; n < 3; n ++ ) {

			const vert = verts[ n ];
			const hash = hashVertex( vert );
			const otherNormals = vertexMap[ hash ];
			tempNorm2.set( 0, 0, 0 );

			for ( let k = 0, lk = otherNormals.length; k < lk; k ++ ) {

				const otherNorm = otherNormals[ k ];
				if ( tempNorm.dot( otherNorm ) > creaseDot ) {

					tempNorm2.add( otherNorm );

				}

			}

			tempNorm2.normalize();
			normAttr.setXYZ( i3 + n, tempNorm2.x, tempNorm2.y, tempNorm2.z );

		}

	}

	resultGeometry.setAttribute( 'normal', normAttr );
	return resultGeometry;

}

Object.assign(window.__ADDONS,{computeMikkTSpaceTangents:computeMikkTSpaceTangents,mergeGeometries:mergeGeometries,mergeAttributes:mergeAttributes,deepCloneAttribute:deepCloneAttribute,deinterleaveAttribute:deinterleaveAttribute,deinterleaveGeometry:deinterleaveGeometry,interleaveAttributes:interleaveAttributes,estimateBytesUsed:estimateBytesUsed,mergeVertices:mergeVertices,toTrianglesDrawMode:toTrianglesDrawMode,computeMorphedAttributes:computeMorphedAttributes,mergeGroups:mergeGroups,toCreasedNormals:toCreasedNormals});

})();

(function(){
const{Controls,MOUSE,Quaternion,Spherical,TOUCH,Vector2,Vector3,Plane,Ray,MathUtils}=window.THREE;

/**
 * Fires when the camera has been transformed by the controls.
 *
 * @event OrbitControls#change
 * @type {Object}
 */
const _changeEvent = { type: 'change' };

/**
 * Fires when an interaction was initiated.
 *
 * @event OrbitControls#start
 * @type {Object}
 */
const _startEvent = { type: 'start' };

/**
 * Fires when an interaction has finished.
 *
 * @event OrbitControls#end
 * @type {Object}
 */
const _endEvent = { type: 'end' };

const _ray = new Ray();
const _plane = new Plane();
const _TILT_LIMIT = Math.cos( 70 * MathUtils.DEG2RAD );

const _v = new Vector3();
const _twoPI = 2 * Math.PI;

const _STATE = {
	NONE: - 1,
	ROTATE: 0,
	DOLLY: 1,
	PAN: 2,
	TOUCH_ROTATE: 3,
	TOUCH_PAN: 4,
	TOUCH_DOLLY_PAN: 5,
	TOUCH_DOLLY_ROTATE: 6
};
const _EPS = 0.000001;


/**
 * Orbit controls allow the camera to orbit around a target.
 *
 * OrbitControls performs orbiting, dollying (zooming), and panning. Unlike {@link TrackballControls},
 * it maintains the "up" direction `object.up` (+Y by default).
 *
 * - Orbit: Left mouse / touch: one-finger move.
 * - Zoom: Middle mouse, or mousewheel / touch: two-finger spread or squish.
 * - Pan: Right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move.
 *
 * ```js
 * const controls = new OrbitControls( camera, renderer.domElement );
 *
 * // controls.update() must be called after any manual changes to the camera's transform
 * camera.position.set( 0, 20, 100 );
 * controls.update();
 *
 * function animate() {
 *
 * 	// required if controls.enableDamping or controls.autoRotate are set to true
 * 	controls.update();
 *
 * 	renderer.render( scene, camera );
 *
 * }
 * ```
 *
 * @augments Controls
 * @three_import const{OrbitControls}=window.__ADDONS;
 */
class OrbitControls extends Controls {

	/**
	 * Constructs a new controls instance.
	 *
	 * @param {Object3D} object - The object that is managed by the controls.
	 * @param {?HTMLElement} domElement - The HTML element used for event listeners.
	 */
	constructor( object, domElement = null ) {

		super( object, domElement );

		this.state = _STATE.NONE;

		/**
		 * The focus point of the controls, the `object` orbits around this.
		 * It can be updated manually at any point to change the focus of the controls.
		 *
		 * @type {Vector3}
		 */
		this.target = new Vector3();

		/**
		 * The focus point of the `minTargetRadius` and `maxTargetRadius` limits.
		 * It can be updated manually at any point to change the center of interest
		 * for the `target`.
		 *
		 * @type {Vector3}
		 */
		this.cursor = new Vector3();

		/**
		 * How far you can dolly in (perspective camera only).
		 *
		 * @type {number}
		 * @default 0
		 */
		this.minDistance = 0;

		/**
		 * How far you can dolly out (perspective camera only).
		 *
		 * @type {number}
		 * @default Infinity
		 */
		this.maxDistance = Infinity;

		/**
		 * How far you can zoom in (orthographic camera only).
		 *
		 * @type {number}
		 * @default 0
		 */
		this.minZoom = 0;

		/**
		 * How far you can zoom out (orthographic camera only).
		 *
		 * @type {number}
		 * @default Infinity
		 */
		this.maxZoom = Infinity;

		/**
		 * How close you can get the target to the 3D `cursor`.
		 *
		 * @type {number}
		 * @default 0
		 */
		this.minTargetRadius = 0;

		/**
		 * How far you can move the target from the 3D `cursor`.
		 *
		 * @type {number}
		 * @default Infinity
		 */
		this.maxTargetRadius = Infinity;

		/**
		 * How far you can orbit vertically, lower limit. Range is `[0, Math.PI]` radians.
		 *
		 * @type {number}
		 * @default 0
		 */
		this.minPolarAngle = 0;

		/**
		 * How far you can orbit vertically, upper limit. Range is `[0, Math.PI]` radians.
		 *
		 * @type {number}
		 * @default Math.PI
		 */
		this.maxPolarAngle = Math.PI;

		/**
		 * How far you can orbit horizontally, lower limit. If set, the interval `[ min, max ]`
		 * must be a sub-interval of `[ - 2 PI, 2 PI ]`, with `( max - min < 2 PI )`.
		 *
		 * @type {number}
		 * @default -Infinity
		 */
		this.minAzimuthAngle = - Infinity;

		/**
		 * How far you can orbit horizontally, upper limit. If set, the interval `[ min, max ]`
		 * must be a sub-interval of `[ - 2 PI, 2 PI ]`, with `( max - min < 2 PI )`.
		 *
		 * @type {number}
		 * @default -Infinity
		 */
		this.maxAzimuthAngle = Infinity;

		/**
		 * Set to `true` to enable damping (inertia), which can be used to give a sense of weight
		 * to the controls. Note that if this is enabled, you must call `update()` in your animation
		 * loop.
		 *
		 * @type {boolean}
		 * @default false
		 */
		this.enableDamping = false;

		/**
		 * The damping inertia used if `enableDamping` is set to `true`.
		 *
		 * Note that for this to work, you must call `update()` in your animation loop.
		 *
		 * @type {number}
		 * @default 0.05
		 */
		this.dampingFactor = 0.05;

		/**
		 * Enable or disable zooming (dollying) of the camera.
		 *
		 * @type {boolean}
		 * @default true
		 */
		this.enableZoom = true;

		/**
		 * Speed of zooming / dollying.
		 *
		 * @type {number}
		 * @default 1
		 */
		this.zoomSpeed = 1.0;

		/**
		 * Enable or disable horizontal and vertical rotation of the camera.
		 *
		 * Note that it is possible to disable a single axis by setting the min and max of the
		 * `minPolarAngle` or `minAzimuthAngle` to the same value, which will cause the vertical
		 * or horizontal rotation to be fixed at that value.
		 *
		 * @type {boolean}
		 * @default true
		 */
		this.enableRotate = true;

		/**
		 * Speed of rotation.
		 *
		 * @type {number}
		 * @default 1
		 */
		this.rotateSpeed = 1.0;

		/**
		 * How fast to rotate the camera when the keyboard is used.
		 *
		 * @type {number}
		 * @default 1
		 */
		this.keyRotateSpeed = 1.0;

		/**
		 * Enable or disable camera panning.
		 *
		 * @type {boolean}
		 * @default true
		 */
		this.enablePan = true;

		/**
		 * Speed of panning.
		 *
		 * @type {number}
		 * @default 1
		 */
		this.panSpeed = 1.0;

		/**
		 * Defines how the camera's position is translated when panning. If `true`, the camera pans
		 * in screen space. Otherwise, the camera pans in the plane orthogonal to the camera's up
		 * direction.
		 *
		 * @type {boolean}
		 * @default true
		 */
		this.screenSpacePanning = true;

		/**
		 * How fast to pan the camera when the keyboard is used in
		 * pixels per keypress.
		 *
		 * @type {number}
		 * @default 7
		 */
		this.keyPanSpeed = 7.0;

		/**
		 * Setting this property to `true` allows to zoom to the cursor's position.
		 *
		 * @type {boolean}
		 * @default false
		 */
		this.zoomToCursor = false;

		/**
		 * Set to true to automatically rotate around the target
		 *
		 * Note that if this is enabled, you must call `update()` in your animation loop.
		 * If you want the auto-rotate speed to be independent of the frame rate (the refresh
		 * rate of the display), you must pass the time `deltaTime`, in seconds, to `update()`.
		 *
		 * @type {boolean}
		 * @default false
		 */
		this.autoRotate = false;

		/**
		 * How fast to rotate around the target if `autoRotate` is `true`. The default  equates to 30 seconds
		 * per orbit at 60fps.
		 *
		 * Note that if `autoRotate` is enabled, you must call `update()` in your animation loop.
		 *
		 * @type {number}
		 * @default 2
		 */
		this.autoRotateSpeed = 2.0;

		/**
		 * This object contains references to the keycodes for controlling camera panning.
		 *
		 * ```js
		 * controls.keys = {
		 * 	LEFT: 'ArrowLeft', //left arrow
		 * 	UP: 'ArrowUp', // up arrow
		 * 	RIGHT: 'ArrowRight', // right arrow
		 * 	BOTTOM: 'ArrowDown' // down arrow
		 * }
		 * ```
		 * @type {Object}
		 */
		this.keys = { LEFT: 'ArrowLeft', UP: 'ArrowUp', RIGHT: 'ArrowRight', BOTTOM: 'ArrowDown' };

		/**
		 * This object contains references to the mouse actions used by the controls.
		 *
		 * ```js
		 * controls.mouseButtons = {
		 * 	LEFT: THREE.MOUSE.ROTATE,
		 * 	MIDDLE: THREE.MOUSE.DOLLY,
		 * 	RIGHT: THREE.MOUSE.PAN
		 * }
		 * ```
		 * @type {Object}
		 */
		this.mouseButtons = { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN };

		/**
		 * This object contains references to the touch actions used by the controls.
		 *
		 * ```js
		 * controls.mouseButtons = {
		 * 	ONE: THREE.TOUCH.ROTATE,
		 * 	TWO: THREE.TOUCH.DOLLY_PAN
		 * }
		 * ```
		 * @type {Object}
		 */
		this.touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN };

		/**
		 * Used internally by `saveState()` and `reset()`.
		 *
		 * @type {Vector3}
		 */
		this.target0 = this.target.clone();

		/**
		 * Used internally by `saveState()` and `reset()`.
		 *
		 * @type {Vector3}
		 */
		this.position0 = this.object.position.clone();

		/**
		 * Used internally by `saveState()` and `reset()`.
		 *
		 * @type {number}
		 */
		this.zoom0 = this.object.zoom;

		// the target DOM element for key events
		this._domElementKeyEvents = null;

		// internals

		this._lastPosition = new Vector3();
		this._lastQuaternion = new Quaternion();
		this._lastTargetPosition = new Vector3();

		// so camera.up is the orbit axis
		this._quat = new Quaternion().setFromUnitVectors( object.up, new Vector3( 0, 1, 0 ) );
		this._quatInverse = this._quat.clone().invert();

		// current position in spherical coordinates
		this._spherical = new Spherical();
		this._sphericalDelta = new Spherical();

		this._scale = 1;
		this._panOffset = new Vector3();

		this._rotateStart = new Vector2();
		this._rotateEnd = new Vector2();
		this._rotateDelta = new Vector2();

		this._panStart = new Vector2();
		this._panEnd = new Vector2();
		this._panDelta = new Vector2();

		this._dollyStart = new Vector2();
		this._dollyEnd = new Vector2();
		this._dollyDelta = new Vector2();

		this._dollyDirection = new Vector3();
		this._mouse = new Vector2();
		this._performCursorZoom = false;

		this._pointers = [];
		this._pointerPositions = {};

		this._controlActive = false;

		// event listeners

		this._onPointerMove = onPointerMove.bind( this );
		this._onPointerDown = onPointerDown.bind( this );
		this._onPointerUp = onPointerUp.bind( this );
		this._onContextMenu = onContextMenu.bind( this );
		this._onMouseWheel = onMouseWheel.bind( this );
		this._onKeyDown = onKeyDown.bind( this );

		this._onTouchStart = onTouchStart.bind( this );
		this._onTouchMove = onTouchMove.bind( this );

		this._onMouseDown = onMouseDown.bind( this );
		this._onMouseMove = onMouseMove.bind( this );

		this._interceptControlDown = interceptControlDown.bind( this );
		this._interceptControlUp = interceptControlUp.bind( this );

		//

		if ( this.domElement !== null ) {

			this.connect( this.domElement );

		}

		this.update();

	}

	connect( element ) {

		super.connect( element );

		this.domElement.addEventListener( 'pointerdown', this._onPointerDown );
		this.domElement.addEventListener( 'pointercancel', this._onPointerUp );

		this.domElement.addEventListener( 'contextmenu', this._onContextMenu );
		this.domElement.addEventListener( 'wheel', this._onMouseWheel, { passive: false } );

		const document = this.domElement.getRootNode(); // offscreen canvas compatibility
		document.addEventListener( 'keydown', this._interceptControlDown, { passive: true, capture: true } );

		this.domElement.style.touchAction = 'none'; // disable touch scroll

	}

	disconnect() {

		this.domElement.removeEventListener( 'pointerdown', this._onPointerDown );
		this.domElement.ownerDocument.removeEventListener( 'pointermove', this._onPointerMove );
		this.domElement.ownerDocument.removeEventListener( 'pointerup', this._onPointerUp );
		this.domElement.removeEventListener( 'pointercancel', this._onPointerUp );

		this.domElement.removeEventListener( 'wheel', this._onMouseWheel );
		this.domElement.removeEventListener( 'contextmenu', this._onContextMenu );

		this.stopListenToKeyEvents();

		const document = this.domElement.getRootNode(); // offscreen canvas compatibility
		document.removeEventListener( 'keydown', this._interceptControlDown, { capture: true } );

		this.domElement.style.touchAction = 'auto';

	}

	dispose() {

		this.disconnect();

	}

	/**
	 * Get the current vertical rotation, in radians.
	 *
	 * @return {number} The current vertical rotation, in radians.
	 */
	getPolarAngle() {

		return this._spherical.phi;

	}

	/**
	 * Get the current horizontal rotation, in radians.
	 *
	 * @return {number} The current horizontal rotation, in radians.
	 */
	getAzimuthalAngle() {

		return this._spherical.theta;

	}

	/**
	 * Returns the distance from the camera to the target.
	 *
	 * @return {number} The distance from the camera to the target.
	 */
	getDistance() {

		return this.object.position.distanceTo( this.target );

	}

	/**
	 * Adds key event listeners to the given DOM element.
	 * `window` is a recommended argument for using this method.
	 *
	 * @param {HTMLElement} domElement - The DOM element
	 */
	listenToKeyEvents( domElement ) {

		domElement.addEventListener( 'keydown', this._onKeyDown );
		this._domElementKeyEvents = domElement;

	}

	/**
	 * Removes the key event listener previously defined with `listenToKeyEvents()`.
	 */
	stopListenToKeyEvents() {

		if ( this._domElementKeyEvents !== null ) {

			this._domElementKeyEvents.removeEventListener( 'keydown', this._onKeyDown );
			this._domElementKeyEvents = null;

		}

	}

	/**
	 * Save the current state of the controls. This can later be recovered with `reset()`.
	 */
	saveState() {

		this.target0.copy( this.target );
		this.position0.copy( this.object.position );
		this.zoom0 = this.object.zoom;

	}

	/**
	 * Reset the controls to their state from either the last time the `saveState()`
	 * was called, or the initial state.
	 */
	reset() {

		this.target.copy( this.target0 );
		this.object.position.copy( this.position0 );
		this.object.zoom = this.zoom0;

		this.object.updateProjectionMatrix();
		this.dispatchEvent( _changeEvent );

		this.update();

		this.state = _STATE.NONE;

	}

	update( deltaTime = null ) {

		const position = this.object.position;

		_v.copy( position ).sub( this.target );

		// rotate offset to "y-axis-is-up" space
		_v.applyQuaternion( this._quat );

		// angle from z-axis around y-axis
		this._spherical.setFromVector3( _v );

		if ( this.autoRotate && this.state === _STATE.NONE ) {

			this._rotateLeft( this._getAutoRotationAngle( deltaTime ) );

		}

		if ( this.enableDamping ) {

			this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor;
			this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor;

		} else {

			this._spherical.theta += this._sphericalDelta.theta;
			this._spherical.phi += this._sphericalDelta.phi;

		}

		// restrict theta to be between desired limits

		let min = this.minAzimuthAngle;
		let max = this.maxAzimuthAngle;

		if ( isFinite( min ) && isFinite( max ) ) {

			if ( min < - Math.PI ) min += _twoPI; else if ( min > Math.PI ) min -= _twoPI;

			if ( max < - Math.PI ) max += _twoPI; else if ( max > Math.PI ) max -= _twoPI;

			if ( min <= max ) {

				this._spherical.theta = Math.max( min, Math.min( max, this._spherical.theta ) );

			} else {

				this._spherical.theta = ( this._spherical.theta > ( min + max ) / 2 ) ?
					Math.max( min, this._spherical.theta ) :
					Math.min( max, this._spherical.theta );

			}

		}

		// restrict phi to be between desired limits
		this._spherical.phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, this._spherical.phi ) );

		this._spherical.makeSafe();


		// move target to panned location

		if ( this.enableDamping === true ) {

			this.target.addScaledVector( this._panOffset, this.dampingFactor );

		} else {

			this.target.add( this._panOffset );

		}

		// Limit the target distance from the cursor to create a sphere around the center of interest
		this.target.sub( this.cursor );
		this.target.clampLength( this.minTargetRadius, this.maxTargetRadius );
		this.target.add( this.cursor );

		let zoomChanged = false;
		// adjust the camera position based on zoom only if we're not zooming to the cursor or if it's an ortho camera
		// we adjust zoom later in these cases
		if ( this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera ) {

			this._spherical.radius = this._clampDistance( this._spherical.radius );

		} else {

			const prevRadius = this._spherical.radius;
			this._spherical.radius = this._clampDistance( this._spherical.radius * this._scale );
			zoomChanged = prevRadius != this._spherical.radius;

		}

		_v.setFromSpherical( this._spherical );

		// rotate offset back to "camera-up-vector-is-up" space
		_v.applyQuaternion( this._quatInverse );

		position.copy( this.target ).add( _v );

		this.object.lookAt( this.target );

		if ( this.enableDamping === true ) {

			this._sphericalDelta.theta *= ( 1 - this.dampingFactor );
			this._sphericalDelta.phi *= ( 1 - this.dampingFactor );

			this._panOffset.multiplyScalar( 1 - this.dampingFactor );

		} else {

			this._sphericalDelta.set( 0, 0, 0 );

			this._panOffset.set( 0, 0, 0 );

		}

		// adjust camera position
		if ( this.zoomToCursor && this._performCursorZoom ) {

			let newRadius = null;
			if ( this.object.isPerspectiveCamera ) {

				// move the camera down the pointer ray
				// this method avoids floating point error
				const prevRadius = _v.length();
				newRadius = this._clampDistance( prevRadius * this._scale );

				const radiusDelta = prevRadius - newRadius;
				this.object.position.addScaledVector( this._dollyDirection, radiusDelta );
				this.object.updateMatrixWorld();

				zoomChanged = !! radiusDelta;

			} else if ( this.object.isOrthographicCamera ) {

				// adjust the ortho camera position based on zoom changes
				const mouseBefore = new Vector3( this._mouse.x, this._mouse.y, 0 );
				mouseBefore.unproject( this.object );

				const prevZoom = this.object.zoom;
				this.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom / this._scale ) );
				this.object.updateProjectionMatrix();

				zoomChanged = prevZoom !== this.object.zoom;

				const mouseAfter = new Vector3( this._mouse.x, this._mouse.y, 0 );
				mouseAfter.unproject( this.object );

				this.object.position.sub( mouseAfter ).add( mouseBefore );
				this.object.updateMatrixWorld();

				newRadius = _v.length();

			} else {

				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.' );
				this.zoomToCursor = false;

			}

			// handle the placement of the target
			if ( newRadius !== null ) {

				if ( this.screenSpacePanning ) {

					// position the orbit target in front of the new camera position
					this.target.set( 0, 0, - 1 )
						.transformDirection( this.object.matrix )
						.multiplyScalar( newRadius )
						.add( this.object.position );

				} else {

					// get the ray and translation plane to compute target
					_ray.origin.copy( this.object.position );
					_ray.direction.set( 0, 0, - 1 ).transformDirection( this.object.matrix );

					// if the camera is 20 degrees above the horizon then don't adjust the focus target to avoid
					// extremely large values
					if ( Math.abs( this.object.up.dot( _ray.direction ) ) < _TILT_LIMIT ) {

						this.object.lookAt( this.target );

					} else {

						_plane.setFromNormalAndCoplanarPoint( this.object.up, this.target );
						_ray.intersectPlane( _plane, this.target );

					}

				}

			}

		} else if ( this.object.isOrthographicCamera ) {

			const prevZoom = this.object.zoom;
			this.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom / this._scale ) );

			if ( prevZoom !== this.object.zoom ) {

				this.object.updateProjectionMatrix();
				zoomChanged = true;

			}

		}

		this._scale = 1;
		this._performCursorZoom = false;

		// update condition is:
		// min(camera displacement, camera rotation in radians)^2 > EPS
		// using small-angle approximation cos(x/2) = 1 - x^2 / 8

		if ( zoomChanged ||
			this._lastPosition.distanceToSquared( this.object.position ) > _EPS ||
			8 * ( 1 - this._lastQuaternion.dot( this.object.quaternion ) ) > _EPS ||
			this._lastTargetPosition.distanceToSquared( this.target ) > _EPS ) {

			this.dispatchEvent( _changeEvent );

			this._lastPosition.copy( this.object.position );
			this._lastQuaternion.copy( this.object.quaternion );
			this._lastTargetPosition.copy( this.target );

			return true;

		}

		return false;

	}

	_getAutoRotationAngle( deltaTime ) {

		if ( deltaTime !== null ) {

			return ( _twoPI / 60 * this.autoRotateSpeed ) * deltaTime;

		} else {

			return _twoPI / 60 / 60 * this.autoRotateSpeed;

		}

	}

	_getZoomScale( delta ) {

		const normalizedDelta = Math.abs( delta * 0.01 );
		return Math.pow( 0.95, this.zoomSpeed * normalizedDelta );

	}

	_rotateLeft( angle ) {

		this._sphericalDelta.theta -= angle;

	}

	_rotateUp( angle ) {

		this._sphericalDelta.phi -= angle;

	}

	_panLeft( distance, objectMatrix ) {

		_v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
		_v.multiplyScalar( - distance );

		this._panOffset.add( _v );

	}

	_panUp( distance, objectMatrix ) {

		if ( this.screenSpacePanning === true ) {

			_v.setFromMatrixColumn( objectMatrix, 1 );

		} else {

			_v.setFromMatrixColumn( objectMatrix, 0 );
			_v.crossVectors( this.object.up, _v );

		}

		_v.multiplyScalar( distance );

		this._panOffset.add( _v );

	}

	// deltaX and deltaY are in pixels; right and down are positive
	_pan( deltaX, deltaY ) {

		const element = this.domElement;

		if ( this.object.isPerspectiveCamera ) {

			// perspective
			const position = this.object.position;
			_v.copy( position ).sub( this.target );
			let targetDistance = _v.length();

			// half of the fov is center to top of screen
			targetDistance *= Math.tan( ( this.object.fov / 2 ) * Math.PI / 180.0 );

			// we use only clientHeight here so aspect ratio does not distort speed
			this._panLeft( 2 * deltaX * targetDistance / element.clientHeight, this.object.matrix );
			this._panUp( 2 * deltaY * targetDistance / element.clientHeight, this.object.matrix );

		} else if ( this.object.isOrthographicCamera ) {

			// orthographic
			this._panLeft( deltaX * ( this.object.right - this.object.left ) / this.object.zoom / element.clientWidth, this.object.matrix );
			this._panUp( deltaY * ( this.object.top - this.object.bottom ) / this.object.zoom / element.clientHeight, this.object.matrix );

		} else {

			// camera neither orthographic nor perspective
			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
			this.enablePan = false;

		}

	}

	_dollyOut( dollyScale ) {

		if ( this.object.isPerspectiveCamera || this.object.isOrthographicCamera ) {

			this._scale /= dollyScale;

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
			this.enableZoom = false;

		}

	}

	_dollyIn( dollyScale ) {

		if ( this.object.isPerspectiveCamera || this.object.isOrthographicCamera ) {

			this._scale *= dollyScale;

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
			this.enableZoom = false;

		}

	}

	_updateZoomParameters( x, y ) {

		if ( ! this.zoomToCursor ) {

			return;

		}

		this._performCursorZoom = true;

		const rect = this.domElement.getBoundingClientRect();
		const dx = x - rect.left;
		const dy = y - rect.top;
		const w = rect.width;
		const h = rect.height;

		this._mouse.x = ( dx / w ) * 2 - 1;
		this._mouse.y = - ( dy / h ) * 2 + 1;

		this._dollyDirection.set( this._mouse.x, this._mouse.y, 1 ).unproject( this.object ).sub( this.object.position ).normalize();

	}

	_clampDistance( dist ) {

		return Math.max( this.minDistance, Math.min( this.maxDistance, dist ) );

	}

	//
	// event callbacks - update the object state
	//

	_handleMouseDownRotate( event ) {

		this._rotateStart.set( event.clientX, event.clientY );

	}

	_handleMouseDownDolly( event ) {

		this._updateZoomParameters( event.clientX, event.clientX );
		this._dollyStart.set( event.clientX, event.clientY );

	}

	_handleMouseDownPan( event ) {

		this._panStart.set( event.clientX, event.clientY );

	}

	_handleMouseMoveRotate( event ) {

		this._rotateEnd.set( event.clientX, event.clientY );

		this._rotateDelta.subVectors( this._rotateEnd, this._rotateStart ).multiplyScalar( this.rotateSpeed );

		const element = this.domElement;

		this._rotateLeft( _twoPI * this._rotateDelta.x / element.clientHeight ); // yes, height

		this._rotateUp( _twoPI * this._rotateDelta.y / element.clientHeight );

		this._rotateStart.copy( this._rotateEnd );

		this.update();

	}

	_handleMouseMoveDolly( event ) {

		this._dollyEnd.set( event.clientX, event.clientY );

		this._dollyDelta.subVectors( this._dollyEnd, this._dollyStart );

		if ( this._dollyDelta.y > 0 ) {

			this._dollyOut( this._getZoomScale( this._dollyDelta.y ) );

		} else if ( this._dollyDelta.y < 0 ) {

			this._dollyIn( this._getZoomScale( this._dollyDelta.y ) );

		}

		this._dollyStart.copy( this._dollyEnd );

		this.update();

	}

	_handleMouseMovePan( event ) {

		this._panEnd.set( event.clientX, event.clientY );

		this._panDelta.subVectors( this._panEnd, this._panStart ).multiplyScalar( this.panSpeed );

		this._pan( this._panDelta.x, this._panDelta.y );

		this._panStart.copy( this._panEnd );

		this.update();

	}

	_handleMouseWheel( event ) {

		this._updateZoomParameters( event.clientX, event.clientY );

		if ( event.deltaY < 0 ) {

			this._dollyIn( this._getZoomScale( event.deltaY ) );

		} else if ( event.deltaY > 0 ) {

			this._dollyOut( this._getZoomScale( event.deltaY ) );

		}

		this.update();

	}

	_handleKeyDown( event ) {

		let needsUpdate = false;

		switch ( event.code ) {

			case this.keys.UP:

				if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

					if ( this.enableRotate ) {

						this._rotateUp( _twoPI * this.keyRotateSpeed / this.domElement.clientHeight );

					}

				} else {

					if ( this.enablePan ) {

						this._pan( 0, this.keyPanSpeed );

					}

				}

				needsUpdate = true;
				break;

			case this.keys.BOTTOM:

				if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

					if ( this.enableRotate ) {

						this._rotateUp( - _twoPI * this.keyRotateSpeed / this.domElement.clientHeight );

					}

				} else {

					if ( this.enablePan ) {

						this._pan( 0, - this.keyPanSpeed );

					}

				}

				needsUpdate = true;
				break;

			case this.keys.LEFT:

				if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

					if ( this.enableRotate ) {

						this._rotateLeft( _twoPI * this.keyRotateSpeed / this.domElement.clientHeight );

					}

				} else {

					if ( this.enablePan ) {

						this._pan( this.keyPanSpeed, 0 );

					}

				}

				needsUpdate = true;
				break;

			case this.keys.RIGHT:

				if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

					if ( this.enableRotate ) {

						this._rotateLeft( - _twoPI * this.keyRotateSpeed / this.domElement.clientHeight );

					}

				} else {

					if ( this.enablePan ) {

						this._pan( - this.keyPanSpeed, 0 );

					}

				}

				needsUpdate = true;
				break;

		}

		if ( needsUpdate ) {

			// prevent the browser from scrolling on cursor keys
			event.preventDefault();

			this.update();

		}


	}

	_handleTouchStartRotate( event ) {

		if ( this._pointers.length === 1 ) {

			this._rotateStart.set( event.pageX, event.pageY );

		} else {

			const position = this._getSecondPointerPosition( event );

			const x = 0.5 * ( event.pageX + position.x );
			const y = 0.5 * ( event.pageY + position.y );

			this._rotateStart.set( x, y );

		}

	}

	_handleTouchStartPan( event ) {

		if ( this._pointers.length === 1 ) {

			this._panStart.set( event.pageX, event.pageY );

		} else {

			const position = this._getSecondPointerPosition( event );

			const x = 0.5 * ( event.pageX + position.x );
			const y = 0.5 * ( event.pageY + position.y );

			this._panStart.set( x, y );

		}

	}

	_handleTouchStartDolly( event ) {

		const position = this._getSecondPointerPosition( event );

		const dx = event.pageX - position.x;
		const dy = event.pageY - position.y;

		const distance = Math.sqrt( dx * dx + dy * dy );

		this._dollyStart.set( 0, distance );

	}

	_handleTouchStartDollyPan( event ) {

		if ( this.enableZoom ) this._handleTouchStartDolly( event );

		if ( this.enablePan ) this._handleTouchStartPan( event );

	}

	_handleTouchStartDollyRotate( event ) {

		if ( this.enableZoom ) this._handleTouchStartDolly( event );

		if ( this.enableRotate ) this._handleTouchStartRotate( event );

	}

	_handleTouchMoveRotate( event ) {

		if ( this._pointers.length == 1 ) {

			this._rotateEnd.set( event.pageX, event.pageY );

		} else {

			const position = this._getSecondPointerPosition( event );

			const x = 0.5 * ( event.pageX + position.x );
			const y = 0.5 * ( event.pageY + position.y );

			this._rotateEnd.set( x, y );

		}

		this._rotateDelta.subVectors( this._rotateEnd, this._rotateStart ).multiplyScalar( this.rotateSpeed );

		const element = this.domElement;

		this._rotateLeft( _twoPI * this._rotateDelta.x / element.clientHeight ); // yes, height

		this._rotateUp( _twoPI * this._rotateDelta.y / element.clientHeight );

		this._rotateStart.copy( this._rotateEnd );

	}

	_handleTouchMovePan( event ) {

		if ( this._pointers.length === 1 ) {

			this._panEnd.set( event.pageX, event.pageY );

		} else {

			const position = this._getSecondPointerPosition( event );

			const x = 0.5 * ( event.pageX + position.x );
			const y = 0.5 * ( event.pageY + position.y );

			this._panEnd.set( x, y );

		}

		this._panDelta.subVectors( this._panEnd, this._panStart ).multiplyScalar( this.panSpeed );

		this._pan( this._panDelta.x, this._panDelta.y );

		this._panStart.copy( this._panEnd );

	}

	_handleTouchMoveDolly( event ) {

		const position = this._getSecondPointerPosition( event );

		const dx = event.pageX - position.x;
		const dy = event.pageY - position.y;

		const distance = Math.sqrt( dx * dx + dy * dy );

		this._dollyEnd.set( 0, distance );

		this._dollyDelta.set( 0, Math.pow( this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed ) );

		this._dollyOut( this._dollyDelta.y );

		this._dollyStart.copy( this._dollyEnd );

		const centerX = ( event.pageX + position.x ) * 0.5;
		const centerY = ( event.pageY + position.y ) * 0.5;

		this._updateZoomParameters( centerX, centerY );

	}

	_handleTouchMoveDollyPan( event ) {

		if ( this.enableZoom ) this._handleTouchMoveDolly( event );

		if ( this.enablePan ) this._handleTouchMovePan( event );

	}

	_handleTouchMoveDollyRotate( event ) {

		if ( this.enableZoom ) this._handleTouchMoveDolly( event );

		if ( this.enableRotate ) this._handleTouchMoveRotate( event );

	}

	// pointers

	_addPointer( event ) {

		this._pointers.push( event.pointerId );

	}

	_removePointer( event ) {

		delete this._pointerPositions[ event.pointerId ];

		for ( let i = 0; i < this._pointers.length; i ++ ) {

			if ( this._pointers[ i ] == event.pointerId ) {

				this._pointers.splice( i, 1 );
				return;

			}

		}

	}

	_isTrackingPointer( event ) {

		for ( let i = 0; i < this._pointers.length; i ++ ) {

			if ( this._pointers[ i ] == event.pointerId ) return true;

		}

		return false;

	}

	_trackPointer( event ) {

		let position = this._pointerPositions[ event.pointerId ];

		if ( position === undefined ) {

			position = new Vector2();
			this._pointerPositions[ event.pointerId ] = position;

		}

		position.set( event.pageX, event.pageY );

	}

	_getSecondPointerPosition( event ) {

		const pointerId = ( event.pointerId === this._pointers[ 0 ] ) ? this._pointers[ 1 ] : this._pointers[ 0 ];

		return this._pointerPositions[ pointerId ];

	}

	//

	_customWheelEvent( event ) {

		const mode = event.deltaMode;

		// minimal wheel event altered to meet delta-zoom demand
		const newEvent = {
			clientX: event.clientX,
			clientY: event.clientY,
			deltaY: event.deltaY,
		};

		switch ( mode ) {

			case 1: // LINE_MODE
				newEvent.deltaY *= 16;
				break;

			case 2: // PAGE_MODE
				newEvent.deltaY *= 100;
				break;

		}

		// detect if event was triggered by pinching
		if ( event.ctrlKey && ! this._controlActive ) {

			newEvent.deltaY *= 10;

		}

		return newEvent;

	}

}

function onPointerDown( event ) {

	if ( this.enabled === false ) return;

	if ( this._pointers.length === 0 ) {

		this.domElement.setPointerCapture( event.pointerId );

		this.domElement.ownerDocument.addEventListener( 'pointermove', this._onPointerMove );
		this.domElement.ownerDocument.addEventListener( 'pointerup', this._onPointerUp );

	}

	//

	if ( this._isTrackingPointer( event ) ) return;

	//

	this._addPointer( event );

	if ( event.pointerType === 'touch' ) {

		this._onTouchStart( event );

	} else {

		this._onMouseDown( event );

	}

}

function onPointerMove( event ) {

	if ( this.enabled === false ) return;

	if ( event.pointerType === 'touch' ) {

		this._onTouchMove( event );

	} else {

		this._onMouseMove( event );

	}

}

function onPointerUp( event ) {

	this._removePointer( event );

	switch ( this._pointers.length ) {

		case 0:

			this.domElement.releasePointerCapture( event.pointerId );

			this.domElement.ownerDocument.removeEventListener( 'pointermove', this._onPointerMove );
			this.domElement.ownerDocument.removeEventListener( 'pointerup', this._onPointerUp );

			this.dispatchEvent( _endEvent );

			this.state = _STATE.NONE;

			break;

		case 1:

			const pointerId = this._pointers[ 0 ];
			const position = this._pointerPositions[ pointerId ];

			// minimal placeholder event - allows state correction on pointer-up
			this._onTouchStart( { pointerId: pointerId, pageX: position.x, pageY: position.y } );

			break;

	}

}

function onMouseDown( event ) {

	let mouseAction;

	switch ( event.button ) {

		case 0:

			mouseAction = this.mouseButtons.LEFT;
			break;

		case 1:

			mouseAction = this.mouseButtons.MIDDLE;
			break;

		case 2:

			mouseAction = this.mouseButtons.RIGHT;
			break;

		default:

			mouseAction = - 1;

	}

	switch ( mouseAction ) {

		case MOUSE.DOLLY:

			if ( this.enableZoom === false ) return;

			this._handleMouseDownDolly( event );

			this.state = _STATE.DOLLY;

			break;

		case MOUSE.ROTATE:

			if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

				if ( this.enablePan === false ) return;

				this._handleMouseDownPan( event );

				this.state = _STATE.PAN;

			} else {

				if ( this.enableRotate === false ) return;

				this._handleMouseDownRotate( event );

				this.state = _STATE.ROTATE;

			}

			break;

		case MOUSE.PAN:

			if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

				if ( this.enableRotate === false ) return;

				this._handleMouseDownRotate( event );

				this.state = _STATE.ROTATE;

			} else {

				if ( this.enablePan === false ) return;

				this._handleMouseDownPan( event );

				this.state = _STATE.PAN;

			}

			break;

		default:

			this.state = _STATE.NONE;

	}

	if ( this.state !== _STATE.NONE ) {

		this.dispatchEvent( _startEvent );

	}

}

function onMouseMove( event ) {

	switch ( this.state ) {

		case _STATE.ROTATE:

			if ( this.enableRotate === false ) return;

			this._handleMouseMoveRotate( event );

			break;

		case _STATE.DOLLY:

			if ( this.enableZoom === false ) return;

			this._handleMouseMoveDolly( event );

			break;

		case _STATE.PAN:

			if ( this.enablePan === false ) return;

			this._handleMouseMovePan( event );

			break;

	}

}

function onMouseWheel( event ) {

	if ( this.enabled === false || this.enableZoom === false || this.state !== _STATE.NONE ) return;

	event.preventDefault();

	this.dispatchEvent( _startEvent );

	this._handleMouseWheel( this._customWheelEvent( event ) );

	this.dispatchEvent( _endEvent );

}

function onKeyDown( event ) {

	if ( this.enabled === false ) return;

	this._handleKeyDown( event );

}

function onTouchStart( event ) {

	this._trackPointer( event );

	switch ( this._pointers.length ) {

		case 1:

			switch ( this.touches.ONE ) {

				case TOUCH.ROTATE:

					if ( this.enableRotate === false ) return;

					this._handleTouchStartRotate( event );

					this.state = _STATE.TOUCH_ROTATE;

					break;

				case TOUCH.PAN:

					if ( this.enablePan === false ) return;

					this._handleTouchStartPan( event );

					this.state = _STATE.TOUCH_PAN;

					break;

				default:

					this.state = _STATE.NONE;

			}

			break;

		case 2:

			switch ( this.touches.TWO ) {

				case TOUCH.DOLLY_PAN:

					if ( this.enableZoom === false && this.enablePan === false ) return;

					this._handleTouchStartDollyPan( event );

					this.state = _STATE.TOUCH_DOLLY_PAN;

					break;

				case TOUCH.DOLLY_ROTATE:

					if ( this.enableZoom === false && this.enableRotate === false ) return;

					this._handleTouchStartDollyRotate( event );

					this.state = _STATE.TOUCH_DOLLY_ROTATE;

					break;

				default:

					this.state = _STATE.NONE;

			}

			break;

		default:

			this.state = _STATE.NONE;

	}

	if ( this.state !== _STATE.NONE ) {

		this.dispatchEvent( _startEvent );

	}

}

function onTouchMove( event ) {

	this._trackPointer( event );

	switch ( this.state ) {

		case _STATE.TOUCH_ROTATE:

			if ( this.enableRotate === false ) return;

			this._handleTouchMoveRotate( event );

			this.update();

			break;

		case _STATE.TOUCH_PAN:

			if ( this.enablePan === false ) return;

			this._handleTouchMovePan( event );

			this.update();

			break;

		case _STATE.TOUCH_DOLLY_PAN:

			if ( this.enableZoom === false && this.enablePan === false ) return;

			this._handleTouchMoveDollyPan( event );

			this.update();

			break;

		case _STATE.TOUCH_DOLLY_ROTATE:

			if ( this.enableZoom === false && this.enableRotate === false ) return;

			this._handleTouchMoveDollyRotate( event );

			this.update();

			break;

		default:

			this.state = _STATE.NONE;

	}

}

function onContextMenu( event ) {

	if ( this.enabled === false ) return;

	event.preventDefault();

}

function interceptControlDown( event ) {

	if ( event.key === 'Control' ) {

		this._controlActive = true;

		const document = this.domElement.getRootNode(); // offscreen canvas compatibility

		document.addEventListener( 'keyup', this._interceptControlUp, { passive: true, capture: true } );

	}

}

function interceptControlUp( event ) {

	if ( event.key === 'Control' ) {

		this._controlActive = false;

		const document = this.domElement.getRootNode(); // offscreen canvas compatibility

		document.removeEventListener( 'keyup', this._interceptControlUp, { passive: true, capture: true } );

	}

}

Object.assign(window.__ADDONS,{OrbitControls:OrbitControls});

})();

(function(){
const{AnimationClip,Bone,Box3,BufferAttribute,BufferGeometry,ClampToEdgeWrapping,Color,ColorManagement,DirectionalLight,DoubleSide,FileLoader,FrontSide,Group,ImageBitmapLoader,InstancedMesh,InterleavedBuffer,InterleavedBufferAttribute,Interpolant,InterpolateDiscrete,InterpolateLinear,Line,LineBasicMaterial,LineLoop,LineSegments,LinearFilter,LinearMipmapLinearFilter,LinearMipmapNearestFilter,LinearSRGBColorSpace,Loader,LoaderUtils,Material,MathUtils,Matrix4,Mesh,MeshBasicMaterial,MeshPhysicalMaterial,MeshStandardMaterial,MirroredRepeatWrapping,NearestFilter,NearestMipmapLinearFilter,NearestMipmapNearestFilter,NumberKeyframeTrack,Object3D,OrthographicCamera,PerspectiveCamera,PointLight,Points,PointsMaterial,PropertyBinding,Quaternion,QuaternionKeyframeTrack,RepeatWrapping,Skeleton,SkinnedMesh,Sphere,SpotLight,Texture,TextureLoader,TriangleFanDrawMode,TriangleStripDrawMode,Vector2,Vector3,VectorKeyframeTrack,SRGBColorSpace,InstancedBufferAttribute}=window.THREE;
const{toTrianglesDrawMode}=window.__ADDONS;

/**
 * A loader for the glTF 2.0 format.
 *
 * [glTF](https://www.khronos.org/gltf/} (GL Transmission Format) is an [open format specification]{@link https://github.com/KhronosGroup/glTF/tree/main/specification/2.0)
 * for efficient delivery and loading of 3D content. Assets may be provided either in JSON (.gltf) or binary (.glb)
 * format. External files store textures (.jpg, .png) and additional binary data (.bin). A glTF asset may deliver
 * one or more scenes, including meshes, materials, textures, skins, skeletons, morph targets, animations, lights,
 * and/or cameras.
 *
 * `GLTFLoader` uses {@link ImageBitmapLoader} whenever possible. Be advised that image bitmaps are not
 * automatically GC-collected when they are no longer referenced, and they require special handling during
 * the disposal process.
 *
 * `GLTFLoader` supports the following glTF 2.0 extensions:
 * - KHR_draco_mesh_compression
 * - KHR_materials_clearcoat
 * - KHR_materials_dispersion
 * - KHR_materials_ior
 * - KHR_materials_specular
 * - KHR_materials_transmission
 * - KHR_materials_iridescence
 * - KHR_materials_unlit
 * - KHR_materials_volume
 * - KHR_mesh_quantization
 * - KHR_lights_punctual
 * - KHR_texture_basisu
 * - KHR_texture_transform
 * - EXT_texture_webp
 * - EXT_meshopt_compression
 * - EXT_mesh_gpu_instancing
 *
 * The following glTF 2.0 extension is supported by an external user plugin:
 * - [KHR_materials_variants](https://github.com/takahirox/three-gltf-extensions)
 * - [MSFT_texture_dds](https://github.com/takahirox/three-gltf-extensions)
 * - [KHR_animation_pointer](https://github.com/needle-tools/three-animation-pointer)
 * - [NEEDLE_progressive](https://github.com/needle-tools/gltf-progressive)
 *
 * ```js
 * const loader = new GLTFLoader();
 *
 * // Optional: Provide a DRACOLoader instance to decode compressed mesh data
 * const dracoLoader = new DRACOLoader();
 * dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
 * loader.setDRACOLoader( dracoLoader );
 *
 * const gltf = await loader.loadAsync( 'models/gltf/duck/duck.gltf' );
 * scene.add( gltf.scene );
 * ```
 *
 * @augments Loader
 * @three_import const{GLTFLoader}=window.__ADDONS;
 */
class GLTFLoader extends Loader {

	/**
	 * Constructs a new glTF loader.
	 *
	 * @param {LoadingManager} [manager] - The loading manager.
	 */
	constructor( manager ) {

		super( manager );

		this.dracoLoader = null;
		this.ktx2Loader = null;
		this.meshoptDecoder = null;

		this.pluginCallbacks = [];

		this.register( function ( parser ) {

			return new GLTFMaterialsClearcoatExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsDispersionExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFTextureBasisUExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFTextureWebPExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFTextureAVIFExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsSheenExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsTransmissionExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsVolumeExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsIorExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsEmissiveStrengthExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsSpecularExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsIridescenceExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsAnisotropyExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMaterialsBumpExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFLightsExtension( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMeshoptCompression( parser );

		} );

		this.register( function ( parser ) {

			return new GLTFMeshGpuInstancing( parser );

		} );

	}

	/**
	 * Starts loading from the given URL and passes the loaded glTF asset
	 * to the `onLoad()` callback.
	 *
	 * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
	 * @param {function(GLTFLoader~LoadObject)} onLoad - Executed when the loading process has been finished.
	 * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
	 * @param {onErrorCallback} onError - Executed when errors occur.
	 */
	load( url, onLoad, onProgress, onError ) {

		const scope = this;

		let resourcePath;

		if ( this.resourcePath !== '' ) {

			resourcePath = this.resourcePath;

		} else if ( this.path !== '' ) {

			// If a base path is set, resources will be relative paths from that plus the relative path of the gltf file
			// Example  path = 'https://my-cnd-server.com/', url = 'assets/models/model.gltf'
			// resourcePath = 'https://my-cnd-server.com/assets/models/'
			// referenced resource 'model.bin' will be loaded from 'https://my-cnd-server.com/assets/models/model.bin'
			// referenced resource '../textures/texture.png' will be loaded from 'https://my-cnd-server.com/assets/textures/texture.png'
			const relativeUrl = LoaderUtils.extractUrlBase( url );
			resourcePath = LoaderUtils.resolveURL( relativeUrl, this.path );

		} else {

			resourcePath = LoaderUtils.extractUrlBase( url );

		}

		// Tells the LoadingManager to track an extra item, which resolves after
		// the model is fully loaded. This means the count of items loaded will
		// be incorrect, but ensures manager.onLoad() does not fire early.
		this.manager.itemStart( url );

		const _onError = function ( e ) {

			if ( onError ) {

				onError( e );

			} else {

				console.error( e );

			}

			scope.manager.itemError( url );
			scope.manager.itemEnd( url );

		};

		const loader = new FileLoader( this.manager );

		loader.setPath( this.path );
		loader.setResponseType( 'arraybuffer' );
		loader.setRequestHeader( this.requestHeader );
		loader.setWithCredentials( this.withCredentials );

		loader.load( url, function ( data ) {

			try {

				scope.parse( data, resourcePath, function ( gltf ) {

					onLoad( gltf );

					scope.manager.itemEnd( url );

				}, _onError );

			} catch ( e ) {

				_onError( e );

			}

		}, onProgress, _onError );

	}

	/**
	 * Sets the given Draco loader to this loader. Required for decoding assets
	 * compressed with the `KHR_draco_mesh_compression` extension.
	 *
	 * @param {DRACOLoader} dracoLoader - The Draco loader to set.
	 * @return {GLTFLoader} A reference to this loader.
	 */
	setDRACOLoader( dracoLoader ) {

		this.dracoLoader = dracoLoader;
		return this;

	}

	/**
	 * Sets the given KTX2 loader to this loader. Required for loading KTX2
	 * compressed textures.
	 *
	 * @param {KTX2Loader} ktx2Loader - The KTX2 loader to set.
	 * @return {GLTFLoader} A reference to this loader.
	 */
	setKTX2Loader( ktx2Loader ) {

		this.ktx2Loader = ktx2Loader;
		return this;

	}

	/**
	 * Sets the given meshopt decoder. Required for decoding assets
	 * compressed with the `EXT_meshopt_compression` extension.
	 *
	 * @param {Object} meshoptDecoder - The meshopt decoder to set.
	 * @return {GLTFLoader} A reference to this loader.
	 */
	setMeshoptDecoder( meshoptDecoder ) {

		this.meshoptDecoder = meshoptDecoder;
		return this;

	}

	/**
	 * Registers a plugin callback. This API is internally used to implement the various
	 * glTF extensions but can also used by third-party code to add additional logic
	 * to the loader.
	 *
	 * @param {function(parser:GLTFParser)} callback - The callback function to register.
	 * @return {GLTFLoader} A reference to this loader.
	 */
	register( callback ) {

		if ( this.pluginCallbacks.indexOf( callback ) === - 1 ) {

			this.pluginCallbacks.push( callback );

		}

		return this;

	}

	/**
	 * Unregisters a plugin callback.
	 *
	 * @param {Function} callback - The callback function to unregister.
	 * @return {GLTFLoader} A reference to this loader.
	 */
	unregister( callback ) {

		if ( this.pluginCallbacks.indexOf( callback ) !== - 1 ) {

			this.pluginCallbacks.splice( this.pluginCallbacks.indexOf( callback ), 1 );

		}

		return this;

	}

	/**
	 * Parses the given FBX data and returns the resulting group.
	 *
	 * @param {string|ArrayBuffer} data - The raw glTF data.
	 * @param {string} path - The URL base path.
	 * @param {function(GLTFLoader~LoadObject)} onLoad - Executed when the loading process has been finished.
	 * @param {onErrorCallback} onError - Executed when errors occur.
	 */
	parse( data, path, onLoad, onError ) {

		let json;
		const extensions = {};
		const plugins = {};
		const textDecoder = new TextDecoder();

		if ( typeof data === 'string' ) {

			json = JSON.parse( data );

		} else if ( data instanceof ArrayBuffer ) {

			const magic = textDecoder.decode( new Uint8Array( data, 0, 4 ) );

			if ( magic === BINARY_EXTENSION_HEADER_MAGIC ) {

				try {

					extensions[ EXTENSIONS.KHR_BINARY_GLTF ] = new GLTFBinaryExtension( data );

				} catch ( error ) {

					if ( onError ) onError( error );
					return;

				}

				json = JSON.parse( extensions[ EXTENSIONS.KHR_BINARY_GLTF ].content );

			} else {

				json = JSON.parse( textDecoder.decode( data ) );

			}

		} else {

			json = data;

		}

		if ( json.asset === undefined || json.asset.version[ 0 ] < 2 ) {

			if ( onError ) onError( new Error( 'THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.' ) );
			return;

		}

		const parser = new GLTFParser( json, {

			path: path || this.resourcePath || '',
			crossOrigin: this.crossOrigin,
			requestHeader: this.requestHeader,
			manager: this.manager,
			ktx2Loader: this.ktx2Loader,
			meshoptDecoder: this.meshoptDecoder

		} );

		parser.fileLoader.setRequestHeader( this.requestHeader );

		for ( let i = 0; i < this.pluginCallbacks.length; i ++ ) {

			const plugin = this.pluginCallbacks[ i ]( parser );

			if ( ! plugin.name ) console.error( 'THREE.GLTFLoader: Invalid plugin found: missing name' );

			plugins[ plugin.name ] = plugin;

			// Workaround to avoid determining as unknown extension
			// in addUnknownExtensionsToUserData().
			// Remove this workaround if we move all the existing
			// extension handlers to plugin system
			extensions[ plugin.name ] = true;

		}

		if ( json.extensionsUsed ) {

			for ( let i = 0; i < json.extensionsUsed.length; ++ i ) {

				const extensionName = json.extensionsUsed[ i ];
				const extensionsRequired = json.extensionsRequired || [];

				switch ( extensionName ) {

					case EXTENSIONS.KHR_MATERIALS_UNLIT:
						extensions[ extensionName ] = new GLTFMaterialsUnlitExtension();
						break;

					case EXTENSIONS.KHR_DRACO_MESH_COMPRESSION:
						extensions[ extensionName ] = new GLTFDracoMeshCompressionExtension( json, this.dracoLoader );
						break;

					case EXTENSIONS.KHR_TEXTURE_TRANSFORM:
						extensions[ extensionName ] = new GLTFTextureTransformExtension();
						break;

					case EXTENSIONS.KHR_MESH_QUANTIZATION:
						extensions[ extensionName ] = new GLTFMeshQuantizationExtension();
						break;

					default:

						if ( extensionsRequired.indexOf( extensionName ) >= 0 && plugins[ extensionName ] === undefined ) {

							console.warn( 'THREE.GLTFLoader: Unknown extension "' + extensionName + '".' );

						}

				}

			}

		}

		parser.setExtensions( extensions );
		parser.setPlugins( plugins );
		parser.parse( onLoad, onError );

	}

	/**
	 * Async version of {@link GLTFLoader#parse}.
	 *
	 * @async
	 * @param {string|ArrayBuffer} data - The raw glTF data.
	 * @param {string} path - The URL base path.
	 * @return {Promise<GLTFLoader~LoadObject>} A Promise that resolves with the loaded glTF when the parsing has been finished.
	 */
	parseAsync( data, path ) {

		const scope = this;

		return new Promise( function ( resolve, reject ) {

			scope.parse( data, path, resolve, reject );

		} );

	}

}

/* GLTFREGISTRY */

function GLTFRegistry() {

	let objects = {};

	return	{

		get: function ( key ) {

			return objects[ key ];

		},

		add: function ( key, object ) {

			objects[ key ] = object;

		},

		remove: function ( key ) {

			delete objects[ key ];

		},

		removeAll: function () {

			objects = {};

		}

	};

}

/*********************************/
/********** EXTENSIONS ***********/
/*********************************/

const EXTENSIONS = {
	KHR_BINARY_GLTF: 'KHR_binary_glTF',
	KHR_DRACO_MESH_COMPRESSION: 'KHR_draco_mesh_compression',
	KHR_LIGHTS_PUNCTUAL: 'KHR_lights_punctual',
	KHR_MATERIALS_CLEARCOAT: 'KHR_materials_clearcoat',
	KHR_MATERIALS_DISPERSION: 'KHR_materials_dispersion',
	KHR_MATERIALS_IOR: 'KHR_materials_ior',
	KHR_MATERIALS_SHEEN: 'KHR_materials_sheen',
	KHR_MATERIALS_SPECULAR: 'KHR_materials_specular',
	KHR_MATERIALS_TRANSMISSION: 'KHR_materials_transmission',
	KHR_MATERIALS_IRIDESCENCE: 'KHR_materials_iridescence',
	KHR_MATERIALS_ANISOTROPY: 'KHR_materials_anisotropy',
	KHR_MATERIALS_UNLIT: 'KHR_materials_unlit',
	KHR_MATERIALS_VOLUME: 'KHR_materials_volume',
	KHR_TEXTURE_BASISU: 'KHR_texture_basisu',
	KHR_TEXTURE_TRANSFORM: 'KHR_texture_transform',
	KHR_MESH_QUANTIZATION: 'KHR_mesh_quantization',
	KHR_MATERIALS_EMISSIVE_STRENGTH: 'KHR_materials_emissive_strength',
	EXT_MATERIALS_BUMP: 'EXT_materials_bump',
	EXT_TEXTURE_WEBP: 'EXT_texture_webp',
	EXT_TEXTURE_AVIF: 'EXT_texture_avif',
	EXT_MESHOPT_COMPRESSION: 'EXT_meshopt_compression',
	EXT_MESH_GPU_INSTANCING: 'EXT_mesh_gpu_instancing'
};

/**
 * Punctual Lights Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_lights_punctual
 *
 * @private
 */
class GLTFLightsExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL;

		// Object3D instance caches
		this.cache = { refs: {}, uses: {} };

	}

	_markDefs() {

		const parser = this.parser;
		const nodeDefs = this.parser.json.nodes || [];

		for ( let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex ++ ) {

			const nodeDef = nodeDefs[ nodeIndex ];

			if ( nodeDef.extensions
					&& nodeDef.extensions[ this.name ]
					&& nodeDef.extensions[ this.name ].light !== undefined ) {

				parser._addNodeRef( this.cache, nodeDef.extensions[ this.name ].light );

			}

		}

	}

	_loadLight( lightIndex ) {

		const parser = this.parser;
		const cacheKey = 'light:' + lightIndex;
		let dependency = parser.cache.get( cacheKey );

		if ( dependency ) return dependency;

		const json = parser.json;
		const extensions = ( json.extensions && json.extensions[ this.name ] ) || {};
		const lightDefs = extensions.lights || [];
		const lightDef = lightDefs[ lightIndex ];
		let lightNode;

		const color = new Color( 0xffffff );

		if ( lightDef.color !== undefined ) color.setRGB( lightDef.color[ 0 ], lightDef.color[ 1 ], lightDef.color[ 2 ], LinearSRGBColorSpace );

		const range = lightDef.range !== undefined ? lightDef.range : 0;

		switch ( lightDef.type ) {

			case 'directional':
				lightNode = new DirectionalLight( color );
				lightNode.target.position.set( 0, 0, - 1 );
				lightNode.add( lightNode.target );
				break;

			case 'point':
				lightNode = new PointLight( color );
				lightNode.distance = range;
				break;

			case 'spot':
				lightNode = new SpotLight( color );
				lightNode.distance = range;
				// Handle spotlight properties.
				lightDef.spot = lightDef.spot || {};
				lightDef.spot.innerConeAngle = lightDef.spot.innerConeAngle !== undefined ? lightDef.spot.innerConeAngle : 0;
				lightDef.spot.outerConeAngle = lightDef.spot.outerConeAngle !== undefined ? lightDef.spot.outerConeAngle : Math.PI / 4.0;
				lightNode.angle = lightDef.spot.outerConeAngle;
				lightNode.penumbra = 1.0 - lightDef.spot.innerConeAngle / lightDef.spot.outerConeAngle;
				lightNode.target.position.set( 0, 0, - 1 );
				lightNode.add( lightNode.target );
				break;

			default:
				throw new Error( 'THREE.GLTFLoader: Unexpected light type: ' + lightDef.type );

		}

		// Some lights (e.g. spot) default to a position other than the origin. Reset the position
		// here, because node-level parsing will only override position if explicitly specified.
		lightNode.position.set( 0, 0, 0 );

		assignExtrasToUserData( lightNode, lightDef );

		if ( lightDef.intensity !== undefined ) lightNode.intensity = lightDef.intensity;

		lightNode.name = parser.createUniqueName( lightDef.name || ( 'light_' + lightIndex ) );

		dependency = Promise.resolve( lightNode );

		parser.cache.add( cacheKey, dependency );

		return dependency;

	}

	getDependency( type, index ) {

		if ( type !== 'light' ) return;

		return this._loadLight( index );

	}

	createNodeAttachment( nodeIndex ) {

		const self = this;
		const parser = this.parser;
		const json = parser.json;
		const nodeDef = json.nodes[ nodeIndex ];
		const lightDef = ( nodeDef.extensions && nodeDef.extensions[ this.name ] ) || {};
		const lightIndex = lightDef.light;

		if ( lightIndex === undefined ) return null;

		return this._loadLight( lightIndex ).then( function ( light ) {

			return parser._getNodeRef( self.cache, lightIndex, light );

		} );

	}

}

/**
 * Unlit Materials Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_unlit
 *
 * @private
 */
class GLTFMaterialsUnlitExtension {

	constructor() {

		this.name = EXTENSIONS.KHR_MATERIALS_UNLIT;

	}

	getMaterialType() {

		return MeshBasicMaterial;

	}

	extendParams( materialParams, materialDef, parser ) {

		const pending = [];

		materialParams.color = new Color( 1.0, 1.0, 1.0 );
		materialParams.opacity = 1.0;

		const metallicRoughness = materialDef.pbrMetallicRoughness;

		if ( metallicRoughness ) {

			if ( Array.isArray( metallicRoughness.baseColorFactor ) ) {

				const array = metallicRoughness.baseColorFactor;

				materialParams.color.setRGB( array[ 0 ], array[ 1 ], array[ 2 ], LinearSRGBColorSpace );
				materialParams.opacity = array[ 3 ];

			}

			if ( metallicRoughness.baseColorTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'map', metallicRoughness.baseColorTexture, SRGBColorSpace ) );

			}

		}

		return Promise.all( pending );

	}

}

/**
 * Materials Emissive Strength Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/blob/5768b3ce0ef32bc39cdf1bef10b948586635ead3/extensions/2.0/Khronos/KHR_materials_emissive_strength/README.md
 *
 * @private
 */
class GLTFMaterialsEmissiveStrengthExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_EMISSIVE_STRENGTH;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const emissiveStrength = materialDef.extensions[ this.name ].emissiveStrength;

		if ( emissiveStrength !== undefined ) {

			materialParams.emissiveIntensity = emissiveStrength;

		}

		return Promise.resolve();

	}

}

/**
 * Clearcoat Materials Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_clearcoat
 *
 * @private
 */
class GLTFMaterialsClearcoatExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_CLEARCOAT;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		if ( extension.clearcoatFactor !== undefined ) {

			materialParams.clearcoat = extension.clearcoatFactor;

		}

		if ( extension.clearcoatTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'clearcoatMap', extension.clearcoatTexture ) );

		}

		if ( extension.clearcoatRoughnessFactor !== undefined ) {

			materialParams.clearcoatRoughness = extension.clearcoatRoughnessFactor;

		}

		if ( extension.clearcoatRoughnessTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'clearcoatRoughnessMap', extension.clearcoatRoughnessTexture ) );

		}

		if ( extension.clearcoatNormalTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'clearcoatNormalMap', extension.clearcoatNormalTexture ) );

			if ( extension.clearcoatNormalTexture.scale !== undefined ) {

				const scale = extension.clearcoatNormalTexture.scale;

				materialParams.clearcoatNormalScale = new Vector2( scale, scale );

			}

		}

		return Promise.all( pending );

	}

}

/**
 * Materials dispersion Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_dispersion
 *
 * @private
 */
class GLTFMaterialsDispersionExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_DISPERSION;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const extension = materialDef.extensions[ this.name ];

		materialParams.dispersion = extension.dispersion !== undefined ? extension.dispersion : 0;

		return Promise.resolve();

	}

}

/**
 * Iridescence Materials Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_iridescence
 *
 * @private
 */
class GLTFMaterialsIridescenceExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_IRIDESCENCE;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		if ( extension.iridescenceFactor !== undefined ) {

			materialParams.iridescence = extension.iridescenceFactor;

		}

		if ( extension.iridescenceTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'iridescenceMap', extension.iridescenceTexture ) );

		}

		if ( extension.iridescenceIor !== undefined ) {

			materialParams.iridescenceIOR = extension.iridescenceIor;

		}

		if ( materialParams.iridescenceThicknessRange === undefined ) {

			materialParams.iridescenceThicknessRange = [ 100, 400 ];

		}

		if ( extension.iridescenceThicknessMinimum !== undefined ) {

			materialParams.iridescenceThicknessRange[ 0 ] = extension.iridescenceThicknessMinimum;

		}

		if ( extension.iridescenceThicknessMaximum !== undefined ) {

			materialParams.iridescenceThicknessRange[ 1 ] = extension.iridescenceThicknessMaximum;

		}

		if ( extension.iridescenceThicknessTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'iridescenceThicknessMap', extension.iridescenceThicknessTexture ) );

		}

		return Promise.all( pending );

	}

}

/**
 * Sheen Materials Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_sheen
 *
 * @private
 */
class GLTFMaterialsSheenExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_SHEEN;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		materialParams.sheenColor = new Color( 0, 0, 0 );
		materialParams.sheenRoughness = 0;
		materialParams.sheen = 1;

		const extension = materialDef.extensions[ this.name ];

		if ( extension.sheenColorFactor !== undefined ) {

			const colorFactor = extension.sheenColorFactor;
			materialParams.sheenColor.setRGB( colorFactor[ 0 ], colorFactor[ 1 ], colorFactor[ 2 ], LinearSRGBColorSpace );

		}

		if ( extension.sheenRoughnessFactor !== undefined ) {

			materialParams.sheenRoughness = extension.sheenRoughnessFactor;

		}

		if ( extension.sheenColorTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'sheenColorMap', extension.sheenColorTexture, SRGBColorSpace ) );

		}

		if ( extension.sheenRoughnessTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'sheenRoughnessMap', extension.sheenRoughnessTexture ) );

		}

		return Promise.all( pending );

	}

}

/**
 * Transmission Materials Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_transmission
 * Draft: https://github.com/KhronosGroup/glTF/pull/1698
 *
 * @private
 */
class GLTFMaterialsTransmissionExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_TRANSMISSION;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		if ( extension.transmissionFactor !== undefined ) {

			materialParams.transmission = extension.transmissionFactor;

		}

		if ( extension.transmissionTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'transmissionMap', extension.transmissionTexture ) );

		}

		return Promise.all( pending );

	}

}

/**
 * Materials Volume Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_volume
 *
 * @private
 */
class GLTFMaterialsVolumeExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_VOLUME;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		materialParams.thickness = extension.thicknessFactor !== undefined ? extension.thicknessFactor : 0;

		if ( extension.thicknessTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'thicknessMap', extension.thicknessTexture ) );

		}

		materialParams.attenuationDistance = extension.attenuationDistance || Infinity;

		const colorArray = extension.attenuationColor || [ 1, 1, 1 ];
		materialParams.attenuationColor = new Color().setRGB( colorArray[ 0 ], colorArray[ 1 ], colorArray[ 2 ], LinearSRGBColorSpace );

		return Promise.all( pending );

	}

}

/**
 * Materials ior Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_ior
 *
 * @private
 */
class GLTFMaterialsIorExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_IOR;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const extension = materialDef.extensions[ this.name ];

		materialParams.ior = extension.ior !== undefined ? extension.ior : 1.5;

		return Promise.resolve();

	}

}

/**
 * Materials specular Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_specular
 *
 * @private
 */
class GLTFMaterialsSpecularExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_SPECULAR;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		materialParams.specularIntensity = extension.specularFactor !== undefined ? extension.specularFactor : 1.0;

		if ( extension.specularTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'specularIntensityMap', extension.specularTexture ) );

		}

		const colorArray = extension.specularColorFactor || [ 1, 1, 1 ];
		materialParams.specularColor = new Color().setRGB( colorArray[ 0 ], colorArray[ 1 ], colorArray[ 2 ], LinearSRGBColorSpace );

		if ( extension.specularColorTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'specularColorMap', extension.specularColorTexture, SRGBColorSpace ) );

		}

		return Promise.all( pending );

	}

}


/**
 * Materials bump Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/EXT_materials_bump
 *
 * @private
 */
class GLTFMaterialsBumpExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.EXT_MATERIALS_BUMP;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		materialParams.bumpScale = extension.bumpFactor !== undefined ? extension.bumpFactor : 1.0;

		if ( extension.bumpTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'bumpMap', extension.bumpTexture ) );

		}

		return Promise.all( pending );

	}

}

/**
 * Materials anisotropy Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_anisotropy
 *
 * @private
 */
class GLTFMaterialsAnisotropyExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_MATERIALS_ANISOTROPY;

	}

	getMaterialType( materialIndex ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) return null;

		return MeshPhysicalMaterial;

	}

	extendMaterialParams( materialIndex, materialParams ) {

		const parser = this.parser;
		const materialDef = parser.json.materials[ materialIndex ];

		if ( ! materialDef.extensions || ! materialDef.extensions[ this.name ] ) {

			return Promise.resolve();

		}

		const pending = [];

		const extension = materialDef.extensions[ this.name ];

		if ( extension.anisotropyStrength !== undefined ) {

			materialParams.anisotropy = extension.anisotropyStrength;

		}

		if ( extension.anisotropyRotation !== undefined ) {

			materialParams.anisotropyRotation = extension.anisotropyRotation;

		}

		if ( extension.anisotropyTexture !== undefined ) {

			pending.push( parser.assignTexture( materialParams, 'anisotropyMap', extension.anisotropyTexture ) );

		}

		return Promise.all( pending );

	}

}

/**
 * BasisU Texture Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_texture_basisu
 *
 * @private
 */
class GLTFTextureBasisUExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.KHR_TEXTURE_BASISU;

	}

	loadTexture( textureIndex ) {

		const parser = this.parser;
		const json = parser.json;

		const textureDef = json.textures[ textureIndex ];

		if ( ! textureDef.extensions || ! textureDef.extensions[ this.name ] ) {

			return null;

		}

		const extension = textureDef.extensions[ this.name ];
		const loader = parser.options.ktx2Loader;

		if ( ! loader ) {

			if ( json.extensionsRequired && json.extensionsRequired.indexOf( this.name ) >= 0 ) {

				throw new Error( 'THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures' );

			} else {

				// Assumes that the extension is optional and that a fallback texture is present
				return null;

			}

		}

		return parser.loadTextureImage( textureIndex, extension.source, loader );

	}

}

/**
 * WebP Texture Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/EXT_texture_webp
 *
 * @private
 */
class GLTFTextureWebPExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.EXT_TEXTURE_WEBP;

	}

	loadTexture( textureIndex ) {

		const name = this.name;
		const parser = this.parser;
		const json = parser.json;

		const textureDef = json.textures[ textureIndex ];

		if ( ! textureDef.extensions || ! textureDef.extensions[ name ] ) {

			return null;

		}

		const extension = textureDef.extensions[ name ];
		const source = json.images[ extension.source ];

		let loader = parser.textureLoader;
		if ( source.uri ) {

			const handler = parser.options.manager.getHandler( source.uri );
			if ( handler !== null ) loader = handler;

		}

		return parser.loadTextureImage( textureIndex, extension.source, loader );

	}

}

/**
 * AVIF Texture Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/EXT_texture_avif
 *
 * @private
 */
class GLTFTextureAVIFExtension {

	constructor( parser ) {

		this.parser = parser;
		this.name = EXTENSIONS.EXT_TEXTURE_AVIF;

	}

	loadTexture( textureIndex ) {

		const name = this.name;
		const parser = this.parser;
		const json = parser.json;

		const textureDef = json.textures[ textureIndex ];

		if ( ! textureDef.extensions || ! textureDef.extensions[ name ] ) {

			return null;

		}

		const extension = textureDef.extensions[ name ];
		const source = json.images[ extension.source ];

		let loader = parser.textureLoader;
		if ( source.uri ) {

			const handler = parser.options.manager.getHandler( source.uri );
			if ( handler !== null ) loader = handler;

		}

		return parser.loadTextureImage( textureIndex, extension.source, loader );

	}

}

/**
 * meshopt BufferView Compression Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/EXT_meshopt_compression
 *
 * @private
 */
class GLTFMeshoptCompression {

	constructor( parser ) {

		this.name = EXTENSIONS.EXT_MESHOPT_COMPRESSION;
		this.parser = parser;

	}

	loadBufferView( index ) {

		const json = this.parser.json;
		const bufferView = json.bufferViews[ index ];

		if ( bufferView.extensions && bufferView.extensions[ this.name ] ) {

			const extensionDef = bufferView.extensions[ this.name ];

			const buffer = this.parser.getDependency( 'buffer', extensionDef.buffer );
			const decoder = this.parser.options.meshoptDecoder;

			if ( ! decoder || ! decoder.supported ) {

				if ( json.extensionsRequired && json.extensionsRequired.indexOf( this.name ) >= 0 ) {

					throw new Error( 'THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files' );

				} else {

					// Assumes that the extension is optional and that fallback buffer data is present
					return null;

				}

			}

			return buffer.then( function ( res ) {

				const byteOffset = extensionDef.byteOffset || 0;
				const byteLength = extensionDef.byteLength || 0;

				const count = extensionDef.count;
				const stride = extensionDef.byteStride;

				const source = new Uint8Array( res, byteOffset, byteLength );

				if ( decoder.decodeGltfBufferAsync ) {

					return decoder.decodeGltfBufferAsync( count, stride, source, extensionDef.mode, extensionDef.filter ).then( function ( res ) {

						return res.buffer;

					} );

				} else {

					// Support for MeshoptDecoder 0.18 or earlier, without decodeGltfBufferAsync
					return decoder.ready.then( function () {

						const result = new ArrayBuffer( count * stride );
						decoder.decodeGltfBuffer( new Uint8Array( result ), count, stride, source, extensionDef.mode, extensionDef.filter );
						return result;

					} );

				}

			} );

		} else {

			return null;

		}

	}

}

/**
 * GPU Instancing Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/EXT_mesh_gpu_instancing
 *
 * @private
 */
class GLTFMeshGpuInstancing {

	constructor( parser ) {

		this.name = EXTENSIONS.EXT_MESH_GPU_INSTANCING;
		this.parser = parser;

	}

	createNodeMesh( nodeIndex ) {

		const json = this.parser.json;
		const nodeDef = json.nodes[ nodeIndex ];

		if ( ! nodeDef.extensions || ! nodeDef.extensions[ this.name ] ||
			nodeDef.mesh === undefined ) {

			return null;

		}

		const meshDef = json.meshes[ nodeDef.mesh ];

		// No Points or Lines + Instancing support yet

		for ( const primitive of meshDef.primitives ) {

			if ( primitive.mode !== WEBGL_CONSTANTS.TRIANGLES &&
				 primitive.mode !== WEBGL_CONSTANTS.TRIANGLE_STRIP &&
				 primitive.mode !== WEBGL_CONSTANTS.TRIANGLE_FAN &&
				 primitive.mode !== undefined ) {

				return null;

			}

		}

		const extensionDef = nodeDef.extensions[ this.name ];
		const attributesDef = extensionDef.attributes;

		// @TODO: Can we support InstancedMesh + SkinnedMesh?

		const pending = [];
		const attributes = {};

		for ( const key in attributesDef ) {

			pending.push( this.parser.getDependency( 'accessor', attributesDef[ key ] ).then( accessor => {

				attributes[ key ] = accessor;
				return attributes[ key ];

			} ) );

		}

		if ( pending.length < 1 ) {

			return null;

		}

		pending.push( this.parser.createNodeMesh( nodeIndex ) );

		return Promise.all( pending ).then( results => {

			const nodeObject = results.pop();
			const meshes = nodeObject.isGroup ? nodeObject.children : [ nodeObject ];
			const count = results[ 0 ].count; // All attribute counts should be same
			const instancedMeshes = [];

			for ( const mesh of meshes ) {

				// Temporal variables
				const m = new Matrix4();
				const p = new Vector3();
				const q = new Quaternion();
				const s = new Vector3( 1, 1, 1 );

				const instancedMesh = new InstancedMesh( mesh.geometry, mesh.material, count );

				for ( let i = 0; i < count; i ++ ) {

					if ( attributes.TRANSLATION ) {

						p.fromBufferAttribute( attributes.TRANSLATION, i );

					}

					if ( attributes.ROTATION ) {

						q.fromBufferAttribute( attributes.ROTATION, i );

					}

					if ( attributes.SCALE ) {

						s.fromBufferAttribute( attributes.SCALE, i );

					}

					instancedMesh.setMatrixAt( i, m.compose( p, q, s ) );

				}

				// Add instance attributes to the geometry, excluding TRS.
				for ( const attributeName in attributes ) {

					if ( attributeName === '_COLOR_0' ) {

						const attr = attributes[ attributeName ];
						instancedMesh.instanceColor = new InstancedBufferAttribute( attr.array, attr.itemSize, attr.normalized );

					} else if ( attributeName !== 'TRANSLATION' &&
						 attributeName !== 'ROTATION' &&
						 attributeName !== 'SCALE' ) {

						mesh.geometry.setAttribute( attributeName, attributes[ attributeName ] );

					}

				}

				// Just in case
				Object3D.prototype.copy.call( instancedMesh, mesh );

				this.parser.assignFinalMaterial( instancedMesh );

				instancedMeshes.push( instancedMesh );

			}

			if ( nodeObject.isGroup ) {

				nodeObject.clear();

				nodeObject.add( ... instancedMeshes );

				return nodeObject;

			}

			return instancedMeshes[ 0 ];

		} );

	}

}

/* BINARY EXTENSION */
const BINARY_EXTENSION_HEADER_MAGIC = 'glTF';
const BINARY_EXTENSION_HEADER_LENGTH = 12;
const BINARY_EXTENSION_CHUNK_TYPES = { JSON: 0x4E4F534A, BIN: 0x004E4942 };

class GLTFBinaryExtension {

	constructor( data ) {

		this.name = EXTENSIONS.KHR_BINARY_GLTF;
		this.content = null;
		this.body = null;

		const headerView = new DataView( data, 0, BINARY_EXTENSION_HEADER_LENGTH );
		const textDecoder = new TextDecoder();

		this.header = {
			magic: textDecoder.decode( new Uint8Array( data.slice( 0, 4 ) ) ),
			version: headerView.getUint32( 4, true ),
			length: headerView.getUint32( 8, true )
		};

		if ( this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC ) {

			throw new Error( 'THREE.GLTFLoader: Unsupported glTF-Binary header.' );

		} else if ( this.header.version < 2.0 ) {

			throw new Error( 'THREE.GLTFLoader: Legacy binary file detected.' );

		}

		const chunkContentsLength = this.header.length - BINARY_EXTENSION_HEADER_LENGTH;
		const chunkView = new DataView( data, BINARY_EXTENSION_HEADER_LENGTH );
		let chunkIndex = 0;

		while ( chunkIndex < chunkContentsLength ) {

			const chunkLength = chunkView.getUint32( chunkIndex, true );
			chunkIndex += 4;

			const chunkType = chunkView.getUint32( chunkIndex, true );
			chunkIndex += 4;

			if ( chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON ) {

				const contentArray = new Uint8Array( data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength );
				this.content = textDecoder.decode( contentArray );

			} else if ( chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN ) {

				const byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
				this.body = data.slice( byteOffset, byteOffset + chunkLength );

			}

			// Clients must ignore chunks with unknown types.

			chunkIndex += chunkLength;

		}

		if ( this.content === null ) {

			throw new Error( 'THREE.GLTFLoader: JSON content not found.' );

		}

	}

}

/**
 * DRACO Mesh Compression Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_draco_mesh_compression
 *
 * @private
 */
class GLTFDracoMeshCompressionExtension {

	constructor( json, dracoLoader ) {

		if ( ! dracoLoader ) {

			throw new Error( 'THREE.GLTFLoader: No DRACOLoader instance provided.' );

		}

		this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION;
		this.json = json;
		this.dracoLoader = dracoLoader;
		this.dracoLoader.preload();

	}

	decodePrimitive( primitive, parser ) {

		const json = this.json;
		const dracoLoader = this.dracoLoader;
		const bufferViewIndex = primitive.extensions[ this.name ].bufferView;
		const gltfAttributeMap = primitive.extensions[ this.name ].attributes;
		const threeAttributeMap = {};
		const attributeNormalizedMap = {};
		const attributeTypeMap = {};

		for ( const attributeName in gltfAttributeMap ) {

			const threeAttributeName = ATTRIBUTES[ attributeName ] || attributeName.toLowerCase();

			threeAttributeMap[ threeAttributeName ] = gltfAttributeMap[ attributeName ];

		}

		for ( const attributeName in primitive.attributes ) {

			const threeAttributeName = ATTRIBUTES[ attributeName ] || attributeName.toLowerCase();

			if ( gltfAttributeMap[ attributeName ] !== undefined ) {

				const accessorDef = json.accessors[ primitive.attributes[ attributeName ] ];
				const componentType = WEBGL_COMPONENT_TYPES[ accessorDef.componentType ];

				attributeTypeMap[ threeAttributeName ] = componentType.name;
				attributeNormalizedMap[ threeAttributeName ] = accessorDef.normalized === true;

			}

		}

		return parser.getDependency( 'bufferView', bufferViewIndex ).then( function ( bufferView ) {

			return new Promise( function ( resolve, reject ) {

				dracoLoader.decodeDracoFile( bufferView, function ( geometry ) {

					for ( const attributeName in geometry.attributes ) {

						const attribute = geometry.attributes[ attributeName ];
						const normalized = attributeNormalizedMap[ attributeName ];

						if ( normalized !== undefined ) attribute.normalized = normalized;

					}

					resolve( geometry );

				}, threeAttributeMap, attributeTypeMap, LinearSRGBColorSpace, reject );

			} );

		} );

	}

}

/**
 * Texture Transform Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_texture_transform
 *
 * @private
 */
class GLTFTextureTransformExtension {

	constructor() {

		this.name = EXTENSIONS.KHR_TEXTURE_TRANSFORM;

	}

	extendTexture( texture, transform ) {

		if ( ( transform.texCoord === undefined || transform.texCoord === texture.channel )
			&& transform.offset === undefined
			&& transform.rotation === undefined
			&& transform.scale === undefined ) {

			// See https://github.com/mrdoob/three.js/issues/21819.
			return texture;

		}

		texture = texture.clone();

		if ( transform.texCoord !== undefined ) {

			texture.channel = transform.texCoord;

		}

		if ( transform.offset !== undefined ) {

			texture.offset.fromArray( transform.offset );

		}

		if ( transform.rotation !== undefined ) {

			texture.rotation = transform.rotation;

		}

		if ( transform.scale !== undefined ) {

			texture.repeat.fromArray( transform.scale );

		}

		texture.needsUpdate = true;

		return texture;

	}

}

/**
 * Mesh Quantization Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization
 *
 * @private
 */
class GLTFMeshQuantizationExtension {

	constructor() {

		this.name = EXTENSIONS.KHR_MESH_QUANTIZATION;

	}

}

/*********************************/
/********** INTERPOLATION ********/
/*********************************/

// Spline Interpolation
// Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#appendix-c-spline-interpolation
class GLTFCubicSplineInterpolant extends Interpolant {

	constructor( parameterPositions, sampleValues, sampleSize, resultBuffer ) {

		super( parameterPositions, sampleValues, sampleSize, resultBuffer );

	}

	copySampleValue_( index ) {

		// Copies a sample value to the result buffer. See description of glTF
		// CUBICSPLINE values layout in interpolate_() function below.

		const result = this.resultBuffer,
			values = this.sampleValues,
			valueSize = this.valueSize,
			offset = index * valueSize * 3 + valueSize;

		for ( let i = 0; i !== valueSize; i ++ ) {

			result[ i ] = values[ offset + i ];

		}

		return result;

	}

	interpolate_( i1, t0, t, t1 ) {

		const result = this.resultBuffer;
		const values = this.sampleValues;
		const stride = this.valueSize;

		const stride2 = stride * 2;
		const stride3 = stride * 3;

		const td = t1 - t0;

		const p = ( t - t0 ) / td;
		const pp = p * p;
		const ppp = pp * p;

		const offset1 = i1 * stride3;
		const offset0 = offset1 - stride3;

		const s2 = - 2 * ppp + 3 * pp;
		const s3 = ppp - pp;
		const s0 = 1 - s2;
		const s1 = s3 - pp + p;

		// Layout of keyframe output values for CUBICSPLINE animations:
		//   [ inTangent_1, splineVertex_1, outTangent_1, inTangent_2, splineVertex_2, ... ]
		for ( let i = 0; i !== stride; i ++ ) {

			const p0 = values[ offset0 + i + stride ]; // splineVertex_k
			const m0 = values[ offset0 + i + stride2 ] * td; // outTangent_k * (t_k+1 - t_k)
			const p1 = values[ offset1 + i + stride ]; // splineVertex_k+1
			const m1 = values[ offset1 + i ] * td; // inTangent_k+1 * (t_k+1 - t_k)

			result[ i ] = s0 * p0 + s1 * m0 + s2 * p1 + s3 * m1;

		}

		return result;

	}

}

const _quaternion = new Quaternion();

class GLTFCubicSplineQuaternionInterpolant extends GLTFCubicSplineInterpolant {

	interpolate_( i1, t0, t, t1 ) {

		const result = super.interpolate_( i1, t0, t, t1 );

		_quaternion.fromArray( result ).normalize().toArray( result );

		return result;

	}

}


/*********************************/
/********** INTERNALS ************/
/*********************************/

/* CONSTANTS */

const WEBGL_CONSTANTS = {
	FLOAT: 5126,
	//FLOAT_MAT2: 35674,
	FLOAT_MAT3: 35675,
	FLOAT_MAT4: 35676,
	FLOAT_VEC2: 35664,
	FLOAT_VEC3: 35665,
	FLOAT_VEC4: 35666,
	LINEAR: 9729,
	REPEAT: 10497,
	SAMPLER_2D: 35678,
	POINTS: 0,
	LINES: 1,
	LINE_LOOP: 2,
	LINE_STRIP: 3,
	TRIANGLES: 4,
	TRIANGLE_STRIP: 5,
	TRIANGLE_FAN: 6,
	UNSIGNED_BYTE: 5121,
	UNSIGNED_SHORT: 5123
};

const WEBGL_COMPONENT_TYPES = {
	5120: Int8Array,
	5121: Uint8Array,
	5122: Int16Array,
	5123: Uint16Array,
	5125: Uint32Array,
	5126: Float32Array
};

const WEBGL_FILTERS = {
	9728: NearestFilter,
	9729: LinearFilter,
	9984: NearestMipmapNearestFilter,
	9985: LinearMipmapNearestFilter,
	9986: NearestMipmapLinearFilter,
	9987: LinearMipmapLinearFilter
};

const WEBGL_WRAPPINGS = {
	33071: ClampToEdgeWrapping,
	33648: MirroredRepeatWrapping,
	10497: RepeatWrapping
};

const WEBGL_TYPE_SIZES = {
	'SCALAR': 1,
	'VEC2': 2,
	'VEC3': 3,
	'VEC4': 4,
	'MAT2': 4,
	'MAT3': 9,
	'MAT4': 16
};

const ATTRIBUTES = {
	POSITION: 'position',
	NORMAL: 'normal',
	TANGENT: 'tangent',
	TEXCOORD_0: 'uv',
	TEXCOORD_1: 'uv1',
	TEXCOORD_2: 'uv2',
	TEXCOORD_3: 'uv3',
	COLOR_0: 'color',
	WEIGHTS_0: 'skinWeight',
	JOINTS_0: 'skinIndex',
};

const PATH_PROPERTIES = {
	scale: 'scale',
	translation: 'position',
	rotation: 'quaternion',
	weights: 'morphTargetInfluences'
};

const INTERPOLATION = {
	CUBICSPLINE: undefined, // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
		                        // keyframe track will be initialized with a default interpolation type, then modified.
	LINEAR: InterpolateLinear,
	STEP: InterpolateDiscrete
};

const ALPHA_MODES = {
	OPAQUE: 'OPAQUE',
	MASK: 'MASK',
	BLEND: 'BLEND'
};

/**
 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#default-material
 *
 * @private
 * @param {Object<string, Material>} cache
 * @return {Material}
 */
function createDefaultMaterial( cache ) {

	if ( cache[ 'DefaultMaterial' ] === undefined ) {

		cache[ 'DefaultMaterial' ] = new MeshStandardMaterial( {
			color: 0xFFFFFF,
			emissive: 0x000000,
			metalness: 1,
			roughness: 1,
			transparent: false,
			depthTest: true,
			side: FrontSide
		} );

	}

	return cache[ 'DefaultMaterial' ];

}

function addUnknownExtensionsToUserData( knownExtensions, object, objectDef ) {

	// Add unknown glTF extensions to an object's userData.

	for ( const name in objectDef.extensions ) {

		if ( knownExtensions[ name ] === undefined ) {

			object.userData.gltfExtensions = object.userData.gltfExtensions || {};
			object.userData.gltfExtensions[ name ] = objectDef.extensions[ name ];

		}

	}

}

/**
 *
 * @private
 * @param {Object3D|Material|BufferGeometry|Object|AnimationClip} object
 * @param {GLTF.definition} gltfDef
 */
function assignExtrasToUserData( object, gltfDef ) {

	if ( gltfDef.extras !== undefined ) {

		if ( typeof gltfDef.extras === 'object' ) {

			Object.assign( object.userData, gltfDef.extras );

		} else {

			console.warn( 'THREE.GLTFLoader: Ignoring primitive type .extras, ' + gltfDef.extras );

		}

	}

}

/**
 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#morph-targets
 *
 * @private
 * @param {BufferGeometry} geometry
 * @param {Array<GLTF.Target>} targets
 * @param {GLTFParser} parser
 * @return {Promise<BufferGeometry>}
 */
function addMorphTargets( geometry, targets, parser ) {

	let hasMorphPosition = false;
	let hasMorphNormal = false;
	let hasMorphColor = false;

	for ( let i = 0, il = targets.length; i < il; i ++ ) {

		const target = targets[ i ];

		if ( target.POSITION !== undefined ) hasMorphPosition = true;
		if ( target.NORMAL !== undefined ) hasMorphNormal = true;
		if ( target.COLOR_0 !== undefined ) hasMorphColor = true;

		if ( hasMorphPosition && hasMorphNormal && hasMorphColor ) break;

	}

	if ( ! hasMorphPosition && ! hasMorphNormal && ! hasMorphColor ) return Promise.resolve( geometry );

	const pendingPositionAccessors = [];
	const pendingNormalAccessors = [];
	const pendingColorAccessors = [];

	for ( let i = 0, il = targets.length; i < il; i ++ ) {

		const target = targets[ i ];

		if ( hasMorphPosition ) {

			const pendingAccessor = target.POSITION !== undefined
				? parser.getDependency( 'accessor', target.POSITION )
				: geometry.attributes.position;

			pendingPositionAccessors.push( pendingAccessor );

		}

		if ( hasMorphNormal ) {

			const pendingAccessor = target.NORMAL !== undefined
				? parser.getDependency( 'accessor', target.NORMAL )
				: geometry.attributes.normal;

			pendingNormalAccessors.push( pendingAccessor );

		}

		if ( hasMorphColor ) {

			const pendingAccessor = target.COLOR_0 !== undefined
				? parser.getDependency( 'accessor', target.COLOR_0 )
				: geometry.attributes.color;

			pendingColorAccessors.push( pendingAccessor );

		}

	}

	return Promise.all( [
		Promise.all( pendingPositionAccessors ),
		Promise.all( pendingNormalAccessors ),
		Promise.all( pendingColorAccessors )
	] ).then( function ( accessors ) {

		const morphPositions = accessors[ 0 ];
		const morphNormals = accessors[ 1 ];
		const morphColors = accessors[ 2 ];

		if ( hasMorphPosition ) geometry.morphAttributes.position = morphPositions;
		if ( hasMorphNormal ) geometry.morphAttributes.normal = morphNormals;
		if ( hasMorphColor ) geometry.morphAttributes.color = morphColors;
		geometry.morphTargetsRelative = true;

		return geometry;

	} );

}

/**
 *
 * @private
 * @param {Mesh} mesh
 * @param {GLTF.Mesh} meshDef
 */
function updateMorphTargets( mesh, meshDef ) {

	mesh.updateMorphTargets();

	if ( meshDef.weights !== undefined ) {

		for ( let i = 0, il = meshDef.weights.length; i < il; i ++ ) {

			mesh.morphTargetInfluences[ i ] = meshDef.weights[ i ];

		}

	}

	// .extras has user-defined data, so check that .extras.targetNames is an array.
	if ( meshDef.extras && Array.isArray( meshDef.extras.targetNames ) ) {

		const targetNames = meshDef.extras.targetNames;

		if ( mesh.morphTargetInfluences.length === targetNames.length ) {

			mesh.morphTargetDictionary = {};

			for ( let i = 0, il = targetNames.length; i < il; i ++ ) {

				mesh.morphTargetDictionary[ targetNames[ i ] ] = i;

			}

		} else {

			console.warn( 'THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.' );

		}

	}

}

function createPrimitiveKey( primitiveDef ) {

	let geometryKey;

	const dracoExtension = primitiveDef.extensions && primitiveDef.extensions[ EXTENSIONS.KHR_DRACO_MESH_COMPRESSION ];

	if ( dracoExtension ) {

		geometryKey = 'draco:' + dracoExtension.bufferView
				+ ':' + dracoExtension.indices
				+ ':' + createAttributesKey( dracoExtension.attributes );

	} else {

		geometryKey = primitiveDef.indices + ':' + createAttributesKey( primitiveDef.attributes ) + ':' + primitiveDef.mode;

	}

	if ( primitiveDef.targets !== undefined ) {

		for ( let i = 0, il = primitiveDef.targets.length; i < il; i ++ ) {

			geometryKey += ':' + createAttributesKey( primitiveDef.targets[ i ] );

		}

	}

	return geometryKey;

}

function createAttributesKey( attributes ) {

	let attributesKey = '';

	const keys = Object.keys( attributes ).sort();

	for ( let i = 0, il = keys.length; i < il; i ++ ) {

		attributesKey += keys[ i ] + ':' + attributes[ keys[ i ] ] + ';';

	}

	return attributesKey;

}

function getNormalizedComponentScale( constructor ) {

	// Reference:
	// https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization#encoding-quantized-data

	switch ( constructor ) {

		case Int8Array:
			return 1 / 127;

		case Uint8Array:
			return 1 / 255;

		case Int16Array:
			return 1 / 32767;

		case Uint16Array:
			return 1 / 65535;

		default:
			throw new Error( 'THREE.GLTFLoader: Unsupported normalized accessor component type.' );

	}

}

function getImageURIMimeType( uri ) {

	if ( uri.search( /\.jpe?g($|\?)/i ) > 0 || uri.search( /^data\:image\/jpeg/ ) === 0 ) return 'image/jpeg';
	if ( uri.search( /\.webp($|\?)/i ) > 0 || uri.search( /^data\:image\/webp/ ) === 0 ) return 'image/webp';
	if ( uri.search( /\.ktx2($|\?)/i ) > 0 || uri.search( /^data\:image\/ktx2/ ) === 0 ) return 'image/ktx2';

	return 'image/png';

}

const _identityMatrix = new Matrix4();

/* GLTF PARSER */

class GLTFParser {

	constructor( json = {}, options = {} ) {

		this.json = json;
		this.extensions = {};
		this.plugins = {};
		this.options = options;

		// loader object cache
		this.cache = new GLTFRegistry();

		// associations between Three.js objects and glTF elements
		this.associations = new Map();

		// BufferGeometry caching
		this.primitiveCache = {};

		// Node cache
		this.nodeCache = {};

		// Object3D instance caches
		this.meshCache = { refs: {}, uses: {} };
		this.cameraCache = { refs: {}, uses: {} };
		this.lightCache = { refs: {}, uses: {} };

		this.sourceCache = {};
		this.textureCache = {};

		// Track node names, to ensure no duplicates
		this.nodeNamesUsed = {};

		// Use an ImageBitmapLoader if imageBitmaps are supported. Moves much of the
		// expensive work of uploading a texture to the GPU off the main thread.

		let isSafari = false;
		let safariVersion = - 1;
		let isFirefox = false;
		let firefoxVersion = - 1;

		if ( typeof navigator !== 'undefined' ) {

			const userAgent = navigator.userAgent;

			isSafari = /^((?!chrome|android).)*safari/i.test( userAgent ) === true;
			const safariMatch = userAgent.match( /Version\/(\d+)/ );
			safariVersion = isSafari && safariMatch ? parseInt( safariMatch[ 1 ], 10 ) : - 1;

			isFirefox = userAgent.indexOf( 'Firefox' ) > - 1;
			firefoxVersion = isFirefox ? userAgent.match( /Firefox\/([0-9]+)\./ )[ 1 ] : - 1;

		}

		if ( typeof createImageBitmap === 'undefined' || ( isSafari && safariVersion < 17 ) || ( isFirefox && firefoxVersion < 98 ) ) {

			this.textureLoader = new TextureLoader( this.options.manager );

		} else {

			this.textureLoader = new ImageBitmapLoader( this.options.manager );

		}

		this.textureLoader.setCrossOrigin( this.options.crossOrigin );
		this.textureLoader.setRequestHeader( this.options.requestHeader );

		this.fileLoader = new FileLoader( this.options.manager );
		this.fileLoader.setResponseType( 'arraybuffer' );

		if ( this.options.crossOrigin === 'use-credentials' ) {

			this.fileLoader.setWithCredentials( true );

		}

	}

	setExtensions( extensions ) {

		this.extensions = extensions;

	}

	setPlugins( plugins ) {

		this.plugins = plugins;

	}

	parse( onLoad, onError ) {

		const parser = this;
		const json = this.json;
		const extensions = this.extensions;

		// Clear the loader cache
		this.cache.removeAll();
		this.nodeCache = {};

		// Mark the special nodes/meshes in json for efficient parse
		this._invokeAll( function ( ext ) {

			return ext._markDefs && ext._markDefs();

		} );

		Promise.all( this._invokeAll( function ( ext ) {

			return ext.beforeRoot && ext.beforeRoot();

		} ) ).then( function () {

			return Promise.all( [

				parser.getDependencies( 'scene' ),
				parser.getDependencies( 'animation' ),
				parser.getDependencies( 'camera' ),

			] );

		} ).then( function ( dependencies ) {

			const result = {
				scene: dependencies[ 0 ][ json.scene || 0 ],
				scenes: dependencies[ 0 ],
				animations: dependencies[ 1 ],
				cameras: dependencies[ 2 ],
				asset: json.asset,
				parser: parser,
				userData: {}
			};

			addUnknownExtensionsToUserData( extensions, result, json );

			assignExtrasToUserData( result, json );

			return Promise.all( parser._invokeAll( function ( ext ) {

				return ext.afterRoot && ext.afterRoot( result );

			} ) ).then( function () {

				for ( const scene of result.scenes ) {

					scene.updateMatrixWorld();

				}

				onLoad( result );

			} );

		} ).catch( onError );

	}

	/**
	 * Marks the special nodes/meshes in json for efficient parse.
	 *
	 * @private
	 */
	_markDefs() {

		const nodeDefs = this.json.nodes || [];
		const skinDefs = this.json.skins || [];
		const meshDefs = this.json.meshes || [];

		// Nothing in the node definition indicates whether it is a Bone or an
		// Object3D. Use the skins' joint references to mark bones.
		for ( let skinIndex = 0, skinLength = skinDefs.length; skinIndex < skinLength; skinIndex ++ ) {

			const joints = skinDefs[ skinIndex ].joints;

			for ( let i = 0, il = joints.length; i < il; i ++ ) {

				nodeDefs[ joints[ i ] ].isBone = true;

			}

		}

		// Iterate over all nodes, marking references to shared resources,
		// as well as skeleton joints.
		for ( let nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex ++ ) {

			const nodeDef = nodeDefs[ nodeIndex ];

			if ( nodeDef.mesh !== undefined ) {

				this._addNodeRef( this.meshCache, nodeDef.mesh );

				// Nothing in the mesh definition indicates whether it is
				// a SkinnedMesh or Mesh. Use the node's mesh reference
				// to mark SkinnedMesh if node has skin.
				if ( nodeDef.skin !== undefined ) {

					meshDefs[ nodeDef.mesh ].isSkinnedMesh = true;

				}

			}

			if ( nodeDef.camera !== undefined ) {

				this._addNodeRef( this.cameraCache, nodeDef.camera );

			}

		}

	}

	/**
	 * Counts references to shared node / Object3D resources. These resources
	 * can be reused, or "instantiated", at multiple nodes in the scene
	 * hierarchy. Mesh, Camera, and Light instances are instantiated and must
	 * be marked. Non-scenegraph resources (like Materials, Geometries, and
	 * Textures) can be reused directly and are not marked here.
	 *
	 * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
	 *
	 * @private
	 * @param {Object} cache
	 * @param {Object3D} index
	 */
	_addNodeRef( cache, index ) {

		if ( index === undefined ) return;

		if ( cache.refs[ index ] === undefined ) {

			cache.refs[ index ] = cache.uses[ index ] = 0;

		}

		cache.refs[ index ] ++;

	}

	/**
	 * Returns a reference to a shared resource, cloning it if necessary.
	 *
	 * @private
	 * @param {Object} cache
	 * @param {number} index
	 * @param {Object} object
	 * @return {Object}
	 */
	_getNodeRef( cache, index, object ) {

		if ( cache.refs[ index ] <= 1 ) return object;

		const ref = object.clone();

		// Propagates mappings to the cloned object, prevents mappings on the
		// original object from being lost.
		const updateMappings = ( original, clone ) => {

			const mappings = this.associations.get( original );
			if ( mappings != null ) {

				this.associations.set( clone, mappings );

			}

			for ( const [ i, child ] of original.children.entries() ) {

				updateMappings( child, clone.children[ i ] );

			}

		};

		updateMappings( object, ref );

		ref.name += '_instance_' + ( cache.uses[ index ] ++ );

		return ref;

	}

	_invokeOne( func ) {

		const extensions = Object.values( this.plugins );
		extensions.push( this );

		for ( let i = 0; i < extensions.length; i ++ ) {

			const result = func( extensions[ i ] );

			if ( result ) return result;

		}

		return null;

	}

	_invokeAll( func ) {

		const extensions = Object.values( this.plugins );
		extensions.unshift( this );

		const pending = [];

		for ( let i = 0; i < extensions.length; i ++ ) {

			const result = func( extensions[ i ] );

			if ( result ) pending.push( result );

		}

		return pending;

	}

	/**
	 * Requests the specified dependency asynchronously, with caching.
	 *
	 * @private
	 * @param {string} type
	 * @param {number} index
	 * @return {Promise<Object3D|Material|Texture|AnimationClip|ArrayBuffer|Object>}
	 */
	getDependency( type, index ) {

		const cacheKey = type + ':' + index;
		let dependency = this.cache.get( cacheKey );

		if ( ! dependency ) {

			switch ( type ) {

				case 'scene':
					dependency = this.loadScene( index );
					break;

				case 'node':
					dependency = this._invokeOne( function ( ext ) {

						return ext.loadNode && ext.loadNode( index );

					} );
					break;

				case 'mesh':
					dependency = this._invokeOne( function ( ext ) {

						return ext.loadMesh && ext.loadMesh( index );

					} );
					break;

				case 'accessor':
					dependency = this.loadAccessor( index );
					break;

				case 'bufferView':
					dependency = this._invokeOne( function ( ext ) {

						return ext.loadBufferView && ext.loadBufferView( index );

					} );
					break;

				case 'buffer':
					dependency = this.loadBuffer( index );
					break;

				case 'material':
					dependency = this._invokeOne( function ( ext ) {

						return ext.loadMaterial && ext.loadMaterial( index );

					} );
					break;

				case 'texture':
					dependency = this._invokeOne( function ( ext ) {

						return ext.loadTexture && ext.loadTexture( index );

					} );
					break;

				case 'skin':
					dependency = this.loadSkin( index );
					break;

				case 'animation':
					dependency = this._invokeOne( function ( ext ) {

						return ext.loadAnimation && ext.loadAnimation( index );

					} );
					break;

				case 'camera':
					dependency = this.loadCamera( index );
					break;

				default:
					dependency = this._invokeOne( function ( ext ) {

						return ext != this && ext.getDependency && ext.getDependency( type, index );

					} );

					if ( ! dependency ) {

						throw new Error( 'Unknown type: ' + type );

					}

					break;

			}

			this.cache.add( cacheKey, dependency );

		}

		return dependency;

	}

	/**
	 * Requests all dependencies of the specified type asynchronously, with caching.
	 *
	 * @private
	 * @param {string} type
	 * @return {Promise<Array<Object>>}
	 */
	getDependencies( type ) {

		let dependencies = this.cache.get( type );

		if ( ! dependencies ) {

			const parser = this;
			const defs = this.json[ type + ( type === 'mesh' ? 'es' : 's' ) ] || [];

			dependencies = Promise.all( defs.map( function ( def, index ) {

				return parser.getDependency( type, index );

			} ) );

			this.cache.add( type, dependencies );

		}

		return dependencies;

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
	 *
	 * @private
	 * @param {number} bufferIndex
	 * @return {Promise<ArrayBuffer>}
	 */
	loadBuffer( bufferIndex ) {

		const bufferDef = this.json.buffers[ bufferIndex ];
		const loader = this.fileLoader;

		if ( bufferDef.type && bufferDef.type !== 'arraybuffer' ) {

			throw new Error( 'THREE.GLTFLoader: ' + bufferDef.type + ' buffer type is not supported.' );

		}

		// If present, GLB container is required to be the first buffer.
		if ( bufferDef.uri === undefined && bufferIndex === 0 ) {

			return Promise.resolve( this.extensions[ EXTENSIONS.KHR_BINARY_GLTF ].body );

		}

		const options = this.options;

		return new Promise( function ( resolve, reject ) {

			loader.load( LoaderUtils.resolveURL( bufferDef.uri, options.path ), resolve, undefined, function () {

				reject( new Error( 'THREE.GLTFLoader: Failed to load buffer "' + bufferDef.uri + '".' ) );

			} );

		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
	 *
	 * @private
	 * @param {number} bufferViewIndex
	 * @return {Promise<ArrayBuffer>}
	 */
	loadBufferView( bufferViewIndex ) {

		const bufferViewDef = this.json.bufferViews[ bufferViewIndex ];

		return this.getDependency( 'buffer', bufferViewDef.buffer ).then( function ( buffer ) {

			const byteLength = bufferViewDef.byteLength || 0;
			const byteOffset = bufferViewDef.byteOffset || 0;
			return buffer.slice( byteOffset, byteOffset + byteLength );

		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
	 *
	 * @private
	 * @param {number} accessorIndex
	 * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
	 */
	loadAccessor( accessorIndex ) {

		const parser = this;
		const json = this.json;

		const accessorDef = this.json.accessors[ accessorIndex ];

		if ( accessorDef.bufferView === undefined && accessorDef.sparse === undefined ) {

			const itemSize = WEBGL_TYPE_SIZES[ accessorDef.type ];
			const TypedArray = WEBGL_COMPONENT_TYPES[ accessorDef.componentType ];
			const normalized = accessorDef.normalized === true;

			const array = new TypedArray( accessorDef.count * itemSize );
			return Promise.resolve( new BufferAttribute( array, itemSize, normalized ) );

		}

		const pendingBufferViews = [];

		if ( accessorDef.bufferView !== undefined ) {

			pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.bufferView ) );

		} else {

			pendingBufferViews.push( null );

		}

		if ( accessorDef.sparse !== undefined ) {

			pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.sparse.indices.bufferView ) );
			pendingBufferViews.push( this.getDependency( 'bufferView', accessorDef.sparse.values.bufferView ) );

		}

		return Promise.all( pendingBufferViews ).then( function ( bufferViews ) {

			const bufferView = bufferViews[ 0 ];

			const itemSize = WEBGL_TYPE_SIZES[ accessorDef.type ];
			const TypedArray = WEBGL_COMPONENT_TYPES[ accessorDef.componentType ];

			// For VEC3: itemSize is 3, elementBytes is 4, itemBytes is 12.
			const elementBytes = TypedArray.BYTES_PER_ELEMENT;
			const itemBytes = elementBytes * itemSize;
			const byteOffset = accessorDef.byteOffset || 0;
			const byteStride = accessorDef.bufferView !== undefined ? json.bufferViews[ accessorDef.bufferView ].byteStride : undefined;
			const normalized = accessorDef.normalized === true;
			let array, bufferAttribute;

			// The buffer is not interleaved if the stride is the item size in bytes.
			if ( byteStride && byteStride !== itemBytes ) {

				// Each "slice" of the buffer, as defined by 'count' elements of 'byteStride' bytes, gets its own InterleavedBuffer
				// This makes sure that IBA.count reflects accessor.count properly
				const ibSlice = Math.floor( byteOffset / byteStride );
				const ibCacheKey = 'InterleavedBuffer:' + accessorDef.bufferView + ':' + accessorDef.componentType + ':' + ibSlice + ':' + accessorDef.count;
				let ib = parser.cache.get( ibCacheKey );

				if ( ! ib ) {

					array = new TypedArray( bufferView, ibSlice * byteStride, accessorDef.count * byteStride / elementBytes );

					// Integer parameters to IB/IBA are in array elements, not bytes.
					ib = new InterleavedBuffer( array, byteStride / elementBytes );

					parser.cache.add( ibCacheKey, ib );

				}

				bufferAttribute = new InterleavedBufferAttribute( ib, itemSize, ( byteOffset % byteStride ) / elementBytes, normalized );

			} else {

				if ( bufferView === null ) {

					array = new TypedArray( accessorDef.count * itemSize );

				} else {

					array = new TypedArray( bufferView, byteOffset, accessorDef.count * itemSize );

				}

				bufferAttribute = new BufferAttribute( array, itemSize, normalized );

			}

			// https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#sparse-accessors
			if ( accessorDef.sparse !== undefined ) {

				const itemSizeIndices = WEBGL_TYPE_SIZES.SCALAR;
				const TypedArrayIndices = WEBGL_COMPONENT_TYPES[ accessorDef.sparse.indices.componentType ];

				const byteOffsetIndices = accessorDef.sparse.indices.byteOffset || 0;
				const byteOffsetValues = accessorDef.sparse.values.byteOffset || 0;

				const sparseIndices = new TypedArrayIndices( bufferViews[ 1 ], byteOffsetIndices, accessorDef.sparse.count * itemSizeIndices );
				const sparseValues = new TypedArray( bufferViews[ 2 ], byteOffsetValues, accessorDef.sparse.count * itemSize );

				if ( bufferView !== null ) {

					// Avoid modifying the original ArrayBuffer, if the bufferView wasn't initialized with zeroes.
					bufferAttribute = new BufferAttribute( bufferAttribute.array.slice(), bufferAttribute.itemSize, bufferAttribute.normalized );

				}

				// Ignore normalized since we copy from sparse
				bufferAttribute.normalized = false;

				for ( let i = 0, il = sparseIndices.length; i < il; i ++ ) {

					const index = sparseIndices[ i ];

					bufferAttribute.setX( index, sparseValues[ i * itemSize ] );
					if ( itemSize >= 2 ) bufferAttribute.setY( index, sparseValues[ i * itemSize + 1 ] );
					if ( itemSize >= 3 ) bufferAttribute.setZ( index, sparseValues[ i * itemSize + 2 ] );
					if ( itemSize >= 4 ) bufferAttribute.setW( index, sparseValues[ i * itemSize + 3 ] );
					if ( itemSize >= 5 ) throw new Error( 'THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.' );

				}

				bufferAttribute.normalized = normalized;

			}

			return bufferAttribute;

		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
	 *
	 * @private
	 * @param {number} textureIndex
	 * @return {Promise<?Texture>}
	 */
	loadTexture( textureIndex ) {

		const json = this.json;
		const options = this.options;
		const textureDef = json.textures[ textureIndex ];
		const sourceIndex = textureDef.source;
		const sourceDef = json.images[ sourceIndex ];

		let loader = this.textureLoader;

		if ( sourceDef.uri ) {

			const handler = options.manager.getHandler( sourceDef.uri );
			if ( handler !== null ) loader = handler;

		}

		return this.loadTextureImage( textureIndex, sourceIndex, loader );

	}

	loadTextureImage( textureIndex, sourceIndex, loader ) {

		const parser = this;
		const json = this.json;

		const textureDef = json.textures[ textureIndex ];
		const sourceDef = json.images[ sourceIndex ];

		const cacheKey = ( sourceDef.uri || sourceDef.bufferView ) + ':' + textureDef.sampler;

		if ( this.textureCache[ cacheKey ] ) {

			// See https://github.com/mrdoob/three.js/issues/21559.
			return this.textureCache[ cacheKey ];

		}

		const promise = this.loadImageSource( sourceIndex, loader ).then( function ( texture ) {

			texture.flipY = false;

			texture.name = textureDef.name || sourceDef.name || '';

			if ( texture.name === '' && typeof sourceDef.uri === 'string' && sourceDef.uri.startsWith( 'data:image/' ) === false ) {

				texture.name = sourceDef.uri;

			}

			const samplers = json.samplers || {};
			const sampler = samplers[ textureDef.sampler ] || {};

			texture.magFilter = WEBGL_FILTERS[ sampler.magFilter ] || LinearFilter;
			texture.minFilter = WEBGL_FILTERS[ sampler.minFilter ] || LinearMipmapLinearFilter;
			texture.wrapS = WEBGL_WRAPPINGS[ sampler.wrapS ] || RepeatWrapping;
			texture.wrapT = WEBGL_WRAPPINGS[ sampler.wrapT ] || RepeatWrapping;
			texture.generateMipmaps = ! texture.isCompressedTexture && texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;

			parser.associations.set( texture, { textures: textureIndex } );

			return texture;

		} ).catch( function () {

			return null;

		} );

		this.textureCache[ cacheKey ] = promise;

		return promise;

	}

	loadImageSource( sourceIndex, loader ) {

		const parser = this;
		const json = this.json;
		const options = this.options;

		if ( this.sourceCache[ sourceIndex ] !== undefined ) {

			return this.sourceCache[ sourceIndex ].then( ( texture ) => texture.clone() );

		}

		const sourceDef = json.images[ sourceIndex ];

		const URL = self.URL || self.webkitURL;

		let sourceURI = sourceDef.uri || '';
		let isObjectURL = false;

		if ( sourceDef.bufferView !== undefined ) {

			// Load binary image data from bufferView, if provided.

			sourceURI = parser.getDependency( 'bufferView', sourceDef.bufferView ).then( function ( bufferView ) {

				isObjectURL = true;
				const blob = new Blob( [ bufferView ], { type: sourceDef.mimeType } );
				sourceURI = URL.createObjectURL( blob );
				return sourceURI;

			} );

		} else if ( sourceDef.uri === undefined ) {

			throw new Error( 'THREE.GLTFLoader: Image ' + sourceIndex + ' is missing URI and bufferView' );

		}

		const promise = Promise.resolve( sourceURI ).then( function ( sourceURI ) {

			return new Promise( function ( resolve, reject ) {

				let onLoad = resolve;

				if ( loader.isImageBitmapLoader === true ) {

					onLoad = function ( imageBitmap ) {

						const texture = new Texture( imageBitmap );
						texture.needsUpdate = true;

						resolve( texture );

					};

				}

				loader.load( LoaderUtils.resolveURL( sourceURI, options.path ), onLoad, undefined, reject );

			} );

		} ).then( function ( texture ) {

			// Clean up resources and configure Texture.

			if ( isObjectURL === true ) {

				URL.revokeObjectURL( sourceURI );

			}

			assignExtrasToUserData( texture, sourceDef );

			texture.userData.mimeType = sourceDef.mimeType || getImageURIMimeType( sourceDef.uri );

			return texture;

		} ).catch( function ( error ) {

			console.error( 'THREE.GLTFLoader: Couldn\'t load texture', sourceURI );
			throw error;

		} );

		this.sourceCache[ sourceIndex ] = promise;
		return promise;

	}

	/**
	 * Asynchronously assigns a texture to the given material parameters.
	 *
	 * @private
	 * @param {Object} materialParams
	 * @param {string} mapName
	 * @param {Object} mapDef
	 * @param {string} [colorSpace]
	 * @return {Promise<Texture>}
	 */
	assignTexture( materialParams, mapName, mapDef, colorSpace ) {

		const parser = this;

		return this.getDependency( 'texture', mapDef.index ).then( function ( texture ) {

			if ( ! texture ) return null;

			if ( mapDef.texCoord !== undefined && mapDef.texCoord > 0 ) {

				texture = texture.clone();
				texture.channel = mapDef.texCoord;

			}

			if ( parser.extensions[ EXTENSIONS.KHR_TEXTURE_TRANSFORM ] ) {

				const transform = mapDef.extensions !== undefined ? mapDef.extensions[ EXTENSIONS.KHR_TEXTURE_TRANSFORM ] : undefined;

				if ( transform ) {

					const gltfReference = parser.associations.get( texture );
					texture = parser.extensions[ EXTENSIONS.KHR_TEXTURE_TRANSFORM ].extendTexture( texture, transform );
					parser.associations.set( texture, gltfReference );

				}

			}

			if ( colorSpace !== undefined ) {

				texture.colorSpace = colorSpace;

			}

			materialParams[ mapName ] = texture;

			return texture;

		} );

	}

	/**
	 * Assigns final material to a Mesh, Line, or Points instance. The instance
	 * already has a material (generated from the glTF material options alone)
	 * but reuse of the same glTF material may require multiple threejs materials
	 * to accommodate different primitive types, defines, etc. New materials will
	 * be created if necessary, and reused from a cache.
	 *
	 * @private
	 * @param {Object3D} mesh Mesh, Line, or Points instance.
	 */
	assignFinalMaterial( mesh ) {

		const geometry = mesh.geometry;
		let material = mesh.material;

		const useDerivativeTangents = geometry.attributes.tangent === undefined;
		const useVertexColors = geometry.attributes.color !== undefined;
		const useFlatShading = geometry.attributes.normal === undefined;

		if ( mesh.isPoints ) {

			const cacheKey = 'PointsMaterial:' + material.uuid;

			let pointsMaterial = this.cache.get( cacheKey );

			if ( ! pointsMaterial ) {

				pointsMaterial = new PointsMaterial();
				Material.prototype.copy.call( pointsMaterial, material );
				pointsMaterial.color.copy( material.color );
				pointsMaterial.map = material.map;
				pointsMaterial.sizeAttenuation = false; // glTF spec says points should be 1px

				this.cache.add( cacheKey, pointsMaterial );

			}

			material = pointsMaterial;

		} else if ( mesh.isLine ) {

			const cacheKey = 'LineBasicMaterial:' + material.uuid;

			let lineMaterial = this.cache.get( cacheKey );

			if ( ! lineMaterial ) {

				lineMaterial = new LineBasicMaterial();
				Material.prototype.copy.call( lineMaterial, material );
				lineMaterial.color.copy( material.color );
				lineMaterial.map = material.map;

				this.cache.add( cacheKey, lineMaterial );

			}

			material = lineMaterial;

		}

		// Clone the material if it will be modified
		if ( useDerivativeTangents || useVertexColors || useFlatShading ) {

			let cacheKey = 'ClonedMaterial:' + material.uuid + ':';

			if ( useDerivativeTangents ) cacheKey += 'derivative-tangents:';
			if ( useVertexColors ) cacheKey += 'vertex-colors:';
			if ( useFlatShading ) cacheKey += 'flat-shading:';

			let cachedMaterial = this.cache.get( cacheKey );

			if ( ! cachedMaterial ) {

				cachedMaterial = material.clone();

				if ( useVertexColors ) cachedMaterial.vertexColors = true;
				if ( useFlatShading ) cachedMaterial.flatShading = true;

				if ( useDerivativeTangents ) {

					// https://github.com/mrdoob/three.js/issues/11438#issuecomment-507003995
					if ( cachedMaterial.normalScale ) cachedMaterial.normalScale.y *= - 1;
					if ( cachedMaterial.clearcoatNormalScale ) cachedMaterial.clearcoatNormalScale.y *= - 1;

				}

				this.cache.add( cacheKey, cachedMaterial );

				this.associations.set( cachedMaterial, this.associations.get( material ) );

			}

			material = cachedMaterial;

		}

		mesh.material = material;

	}

	getMaterialType( /* materialIndex */ ) {

		return MeshStandardMaterial;

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
	 *
	 * @private
	 * @param {number} materialIndex
	 * @return {Promise<Material>}
	 */
	loadMaterial( materialIndex ) {

		const parser = this;
		const json = this.json;
		const extensions = this.extensions;
		const materialDef = json.materials[ materialIndex ];

		let materialType;
		const materialParams = {};
		const materialExtensions = materialDef.extensions || {};

		const pending = [];

		if ( materialExtensions[ EXTENSIONS.KHR_MATERIALS_UNLIT ] ) {

			const kmuExtension = extensions[ EXTENSIONS.KHR_MATERIALS_UNLIT ];
			materialType = kmuExtension.getMaterialType();
			pending.push( kmuExtension.extendParams( materialParams, materialDef, parser ) );

		} else {

			// Specification:
			// https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#metallic-roughness-material

			const metallicRoughness = materialDef.pbrMetallicRoughness || {};

			materialParams.color = new Color( 1.0, 1.0, 1.0 );
			materialParams.opacity = 1.0;

			if ( Array.isArray( metallicRoughness.baseColorFactor ) ) {

				const array = metallicRoughness.baseColorFactor;

				materialParams.color.setRGB( array[ 0 ], array[ 1 ], array[ 2 ], LinearSRGBColorSpace );
				materialParams.opacity = array[ 3 ];

			}

			if ( metallicRoughness.baseColorTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'map', metallicRoughness.baseColorTexture, SRGBColorSpace ) );

			}

			materialParams.metalness = metallicRoughness.metallicFactor !== undefined ? metallicRoughness.metallicFactor : 1.0;
			materialParams.roughness = metallicRoughness.roughnessFactor !== undefined ? metallicRoughness.roughnessFactor : 1.0;

			if ( metallicRoughness.metallicRoughnessTexture !== undefined ) {

				pending.push( parser.assignTexture( materialParams, 'metalnessMap', metallicRoughness.metallicRoughnessTexture ) );
				pending.push( parser.assignTexture( materialParams, 'roughnessMap', metallicRoughness.metallicRoughnessTexture ) );

			}

			materialType = this._invokeOne( function ( ext ) {

				return ext.getMaterialType && ext.getMaterialType( materialIndex );

			} );

			pending.push( Promise.all( this._invokeAll( function ( ext ) {

				return ext.extendMaterialParams && ext.extendMaterialParams( materialIndex, materialParams );

			} ) ) );

		}

		if ( materialDef.doubleSided === true ) {

			materialParams.side = DoubleSide;

		}

		const alphaMode = materialDef.alphaMode || ALPHA_MODES.OPAQUE;

		if ( alphaMode === ALPHA_MODES.BLEND ) {

			materialParams.transparent = true;

			// See: https://github.com/mrdoob/three.js/issues/17706
			materialParams.depthWrite = false;

		} else {

			materialParams.transparent = false;

			if ( alphaMode === ALPHA_MODES.MASK ) {

				materialParams.alphaTest = materialDef.alphaCutoff !== undefined ? materialDef.alphaCutoff : 0.5;

			}

		}

		if ( materialDef.normalTexture !== undefined && materialType !== MeshBasicMaterial ) {

			pending.push( parser.assignTexture( materialParams, 'normalMap', materialDef.normalTexture ) );

			materialParams.normalScale = new Vector2( 1, 1 );

			if ( materialDef.normalTexture.scale !== undefined ) {

				const scale = materialDef.normalTexture.scale;

				materialParams.normalScale.set( scale, scale );

			}

		}

		if ( materialDef.occlusionTexture !== undefined && materialType !== MeshBasicMaterial ) {

			pending.push( parser.assignTexture( materialParams, 'aoMap', materialDef.occlusionTexture ) );

			if ( materialDef.occlusionTexture.strength !== undefined ) {

				materialParams.aoMapIntensity = materialDef.occlusionTexture.strength;

			}

		}

		if ( materialDef.emissiveFactor !== undefined && materialType !== MeshBasicMaterial ) {

			const emissiveFactor = materialDef.emissiveFactor;
			materialParams.emissive = new Color().setRGB( emissiveFactor[ 0 ], emissiveFactor[ 1 ], emissiveFactor[ 2 ], LinearSRGBColorSpace );

		}

		if ( materialDef.emissiveTexture !== undefined && materialType !== MeshBasicMaterial ) {

			pending.push( parser.assignTexture( materialParams, 'emissiveMap', materialDef.emissiveTexture, SRGBColorSpace ) );

		}

		return Promise.all( pending ).then( function () {

			const material = new materialType( materialParams );

			if ( materialDef.name ) material.name = materialDef.name;

			assignExtrasToUserData( material, materialDef );

			parser.associations.set( material, { materials: materialIndex } );

			if ( materialDef.extensions ) addUnknownExtensionsToUserData( extensions, material, materialDef );

			return material;

		} );

	}

	/**
	 * When Object3D instances are targeted by animation, they need unique names.
	 *
	 * @private
	 * @param {string} originalName
	 * @return {string}
	 */
	createUniqueName( originalName ) {

		const sanitizedName = PropertyBinding.sanitizeNodeName( originalName || '' );

		if ( sanitizedName in this.nodeNamesUsed ) {

			return sanitizedName + '_' + ( ++ this.nodeNamesUsed[ sanitizedName ] );

		} else {

			this.nodeNamesUsed[ sanitizedName ] = 0;

			return sanitizedName;

		}

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
	 *
	 * Creates BufferGeometries from primitives.
	 *
	 * @private
	 * @param {Array<GLTF.Primitive>} primitives
	 * @return {Promise<Array<BufferGeometry>>}
	 */
	loadGeometries( primitives ) {

		const parser = this;
		const extensions = this.extensions;
		const cache = this.primitiveCache;

		function createDracoPrimitive( primitive ) {

			return extensions[ EXTENSIONS.KHR_DRACO_MESH_COMPRESSION ]
				.decodePrimitive( primitive, parser )
				.then( function ( geometry ) {

					return addPrimitiveAttributes( geometry, primitive, parser );

				} );

		}

		const pending = [];

		for ( let i = 0, il = primitives.length; i < il; i ++ ) {

			const primitive = primitives[ i ];
			const cacheKey = createPrimitiveKey( primitive );

			// See if we've already created this geometry
			const cached = cache[ cacheKey ];

			if ( cached ) {

				// Use the cached geometry if it exists
				pending.push( cached.promise );

			} else {

				let geometryPromise;

				if ( primitive.extensions && primitive.extensions[ EXTENSIONS.KHR_DRACO_MESH_COMPRESSION ] ) {

					// Use DRACO geometry if available
					geometryPromise = createDracoPrimitive( primitive );

				} else {

					// Otherwise create a new geometry
					geometryPromise = addPrimitiveAttributes( new BufferGeometry(), primitive, parser );

				}

				// Cache this geometry
				cache[ cacheKey ] = { primitive: primitive, promise: geometryPromise };

				pending.push( geometryPromise );

			}

		}

		return Promise.all( pending );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
	 *
	 * @private
	 * @param {number} meshIndex
	 * @return {Promise<Group|Mesh|SkinnedMesh|Line|Points>}
	 */
	loadMesh( meshIndex ) {

		const parser = this;
		const json = this.json;
		const extensions = this.extensions;

		const meshDef = json.meshes[ meshIndex ];
		const primitives = meshDef.primitives;

		const pending = [];

		for ( let i = 0, il = primitives.length; i < il; i ++ ) {

			const material = primitives[ i ].material === undefined
				? createDefaultMaterial( this.cache )
				: this.getDependency( 'material', primitives[ i ].material );

			pending.push( material );

		}

		pending.push( parser.loadGeometries( primitives ) );

		return Promise.all( pending ).then( function ( results ) {

			const materials = results.slice( 0, results.length - 1 );
			const geometries = results[ results.length - 1 ];

			const meshes = [];

			for ( let i = 0, il = geometries.length; i < il; i ++ ) {

				const geometry = geometries[ i ];
				const primitive = primitives[ i ];

				// 1. create Mesh

				let mesh;

				const material = materials[ i ];

				if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLES ||
						primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ||
						primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ||
						primitive.mode === undefined ) {

					// .isSkinnedMesh isn't in glTF spec. See ._markDefs()
					mesh = meshDef.isSkinnedMesh === true
						? new SkinnedMesh( geometry, material )
						: new Mesh( geometry, material );

					if ( mesh.isSkinnedMesh === true ) {

						// normalize skin weights to fix malformed assets (see #15319)
						mesh.normalizeSkinWeights();

					}

					if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ) {

						mesh.geometry = toTrianglesDrawMode( mesh.geometry, TriangleStripDrawMode );

					} else if ( primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ) {

						mesh.geometry = toTrianglesDrawMode( mesh.geometry, TriangleFanDrawMode );

					}

				} else if ( primitive.mode === WEBGL_CONSTANTS.LINES ) {

					mesh = new LineSegments( geometry, material );

				} else if ( primitive.mode === WEBGL_CONSTANTS.LINE_STRIP ) {

					mesh = new Line( geometry, material );

				} else if ( primitive.mode === WEBGL_CONSTANTS.LINE_LOOP ) {

					mesh = new LineLoop( geometry, material );

				} else if ( primitive.mode === WEBGL_CONSTANTS.POINTS ) {

					mesh = new Points( geometry, material );

				} else {

					throw new Error( 'THREE.GLTFLoader: Primitive mode unsupported: ' + primitive.mode );

				}

				if ( Object.keys( mesh.geometry.morphAttributes ).length > 0 ) {

					updateMorphTargets( mesh, meshDef );

				}

				mesh.name = parser.createUniqueName( meshDef.name || ( 'mesh_' + meshIndex ) );

				assignExtrasToUserData( mesh, meshDef );

				if ( primitive.extensions ) addUnknownExtensionsToUserData( extensions, mesh, primitive );

				parser.assignFinalMaterial( mesh );

				meshes.push( mesh );

			}

			for ( let i = 0, il = meshes.length; i < il; i ++ ) {

				parser.associations.set( meshes[ i ], {
					meshes: meshIndex,
					primitives: i
				} );

			}

			if ( meshes.length === 1 ) {

				if ( meshDef.extensions ) addUnknownExtensionsToUserData( extensions, meshes[ 0 ], meshDef );

				return meshes[ 0 ];

			}

			const group = new Group();

			if ( meshDef.extensions ) addUnknownExtensionsToUserData( extensions, group, meshDef );

			parser.associations.set( group, { meshes: meshIndex } );

			for ( let i = 0, il = meshes.length; i < il; i ++ ) {

				group.add( meshes[ i ] );

			}

			return group;

		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
	 *
	 * @private
	 * @param {number} cameraIndex
	 * @return {Promise<Camera>|undefined}
	 */
	loadCamera( cameraIndex ) {

		let camera;
		const cameraDef = this.json.cameras[ cameraIndex ];
		const params = cameraDef[ cameraDef.type ];

		if ( ! params ) {

			console.warn( 'THREE.GLTFLoader: Missing camera parameters.' );
			return;

		}

		if ( cameraDef.type === 'perspective' ) {

			camera = new PerspectiveCamera( MathUtils.radToDeg( params.yfov ), params.aspectRatio || 1, params.znear || 1, params.zfar || 2e6 );

		} else if ( cameraDef.type === 'orthographic' ) {

			camera = new OrthographicCamera( - params.xmag, params.xmag, params.ymag, - params.ymag, params.znear, params.zfar );

		}

		if ( cameraDef.name ) camera.name = this.createUniqueName( cameraDef.name );

		assignExtrasToUserData( camera, cameraDef );

		return Promise.resolve( camera );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
	 *
	 * @private
	 * @param {number} skinIndex
	 * @return {Promise<Skeleton>}
	 */
	loadSkin( skinIndex ) {

		const skinDef = this.json.skins[ skinIndex ];

		const pending = [];

		for ( let i = 0, il = skinDef.joints.length; i < il; i ++ ) {

			pending.push( this._loadNodeShallow( skinDef.joints[ i ] ) );

		}

		if ( skinDef.inverseBindMatrices !== undefined ) {

			pending.push( this.getDependency( 'accessor', skinDef.inverseBindMatrices ) );

		} else {

			pending.push( null );

		}

		return Promise.all( pending ).then( function ( results ) {

			const inverseBindMatrices = results.pop();
			const jointNodes = results;

			// Note that bones (joint nodes) may or may not be in the
			// scene graph at this time.

			const bones = [];
			const boneInverses = [];

			for ( let i = 0, il = jointNodes.length; i < il; i ++ ) {

				const jointNode = jointNodes[ i ];

				if ( jointNode ) {

					bones.push( jointNode );

					const mat = new Matrix4();

					if ( inverseBindMatrices !== null ) {

						mat.fromArray( inverseBindMatrices.array, i * 16 );

					}

					boneInverses.push( mat );

				} else {

					console.warn( 'THREE.GLTFLoader: Joint "%s" could not be found.', skinDef.joints[ i ] );

				}

			}

			return new Skeleton( bones, boneInverses );

		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
	 *
	 * @private
	 * @param {number} animationIndex
	 * @return {Promise<AnimationClip>}
	 */
	loadAnimation( animationIndex ) {

		const json = this.json;
		const parser = this;

		const animationDef = json.animations[ animationIndex ];
		const animationName = animationDef.name ? animationDef.name : 'animation_' + animationIndex;

		const pendingNodes = [];
		const pendingInputAccessors = [];
		const pendingOutputAccessors = [];
		const pendingSamplers = [];
		const pendingTargets = [];

		for ( let i = 0, il = animationDef.channels.length; i < il; i ++ ) {

			const channel = animationDef.channels[ i ];
			const sampler = animationDef.samplers[ channel.sampler ];
			const target = channel.target;
			const name = target.node;
			const input = animationDef.parameters !== undefined ? animationDef.parameters[ sampler.input ] : sampler.input;
			const output = animationDef.parameters !== undefined ? animationDef.parameters[ sampler.output ] : sampler.output;

			if ( target.node === undefined ) continue;

			pendingNodes.push( this.getDependency( 'node', name ) );
			pendingInputAccessors.push( this.getDependency( 'accessor', input ) );
			pendingOutputAccessors.push( this.getDependency( 'accessor', output ) );
			pendingSamplers.push( sampler );
			pendingTargets.push( target );

		}

		return Promise.all( [

			Promise.all( pendingNodes ),
			Promise.all( pendingInputAccessors ),
			Promise.all( pendingOutputAccessors ),
			Promise.all( pendingSamplers ),
			Promise.all( pendingTargets )

		] ).then( function ( dependencies ) {

			const nodes = dependencies[ 0 ];
			const inputAccessors = dependencies[ 1 ];
			const outputAccessors = dependencies[ 2 ];
			const samplers = dependencies[ 3 ];
			const targets = dependencies[ 4 ];

			const tracks = [];

			for ( let i = 0, il = nodes.length; i < il; i ++ ) {

				const node = nodes[ i ];
				const inputAccessor = inputAccessors[ i ];
				const outputAccessor = outputAccessors[ i ];
				const sampler = samplers[ i ];
				const target = targets[ i ];

				if ( node === undefined ) continue;

				if ( node.updateMatrix ) {

					node.updateMatrix();

				}

				const createdTracks = parser._createAnimationTracks( node, inputAccessor, outputAccessor, sampler, target );

				if ( createdTracks ) {

					for ( let k = 0; k < createdTracks.length; k ++ ) {

						tracks.push( createdTracks[ k ] );

					}

				}

			}

			const animation = new AnimationClip( animationName, undefined, tracks );

			assignExtrasToUserData( animation, animationDef );

			return animation;

		} );

	}

	createNodeMesh( nodeIndex ) {

		const json = this.json;
		const parser = this;
		const nodeDef = json.nodes[ nodeIndex ];

		if ( nodeDef.mesh === undefined ) return null;

		return parser.getDependency( 'mesh', nodeDef.mesh ).then( function ( mesh ) {

			const node = parser._getNodeRef( parser.meshCache, nodeDef.mesh, mesh );

			// if weights are provided on the node, override weights on the mesh.
			if ( nodeDef.weights !== undefined ) {

				node.traverse( function ( o ) {

					if ( ! o.isMesh ) return;

					for ( let i = 0, il = nodeDef.weights.length; i < il; i ++ ) {

						o.morphTargetInfluences[ i ] = nodeDef.weights[ i ];

					}

				} );

			}

			return node;

		} );

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
	 *
	 * @private
	 * @param {number} nodeIndex
	 * @return {Promise<Object3D>}
	 */
	loadNode( nodeIndex ) {

		const json = this.json;
		const parser = this;

		const nodeDef = json.nodes[ nodeIndex ];

		const nodePending = parser._loadNodeShallow( nodeIndex );

		const childPending = [];
		const childrenDef = nodeDef.children || [];

		for ( let i = 0, il = childrenDef.length; i < il; i ++ ) {

			childPending.push( parser.getDependency( 'node', childrenDef[ i ] ) );

		}

		const skeletonPending = nodeDef.skin === undefined
			? Promise.resolve( null )
			: parser.getDependency( 'skin', nodeDef.skin );

		return Promise.all( [
			nodePending,
			Promise.all( childPending ),
			skeletonPending
		] ).then( function ( results ) {

			const node = results[ 0 ];
			const children = results[ 1 ];
			const skeleton = results[ 2 ];

			if ( skeleton !== null ) {

				// This full traverse should be fine because
				// child glTF nodes have not been added to this node yet.
				node.traverse( function ( mesh ) {

					if ( ! mesh.isSkinnedMesh ) return;

					mesh.bind( skeleton, _identityMatrix );

				} );

			}

			for ( let i = 0, il = children.length; i < il; i ++ ) {

				node.add( children[ i ] );

			}

			return node;

		} );

	}

	// ._loadNodeShallow() parses a single node.
	// skin and child nodes are created and added in .loadNode() (no '_' prefix).
	_loadNodeShallow( nodeIndex ) {

		const json = this.json;
		const extensions = this.extensions;
		const parser = this;

		// This method is called from .loadNode() and .loadSkin().
		// Cache a node to avoid duplication.

		if ( this.nodeCache[ nodeIndex ] !== undefined ) {

			return this.nodeCache[ nodeIndex ];

		}

		const nodeDef = json.nodes[ nodeIndex ];

		// reserve node's name before its dependencies, so the root has the intended name.
		const nodeName = nodeDef.name ? parser.createUniqueName( nodeDef.name ) : '';

		const pending = [];

		const meshPromise = parser._invokeOne( function ( ext ) {

			return ext.createNodeMesh && ext.createNodeMesh( nodeIndex );

		} );

		if ( meshPromise ) {

			pending.push( meshPromise );

		}

		if ( nodeDef.camera !== undefined ) {

			pending.push( parser.getDependency( 'camera', nodeDef.camera ).then( function ( camera ) {

				return parser._getNodeRef( parser.cameraCache, nodeDef.camera, camera );

			} ) );

		}

		parser._invokeAll( function ( ext ) {

			return ext.createNodeAttachment && ext.createNodeAttachment( nodeIndex );

		} ).forEach( function ( promise ) {

			pending.push( promise );

		} );

		this.nodeCache[ nodeIndex ] = Promise.all( pending ).then( function ( objects ) {

			let node;

			// .isBone isn't in glTF spec. See ._markDefs
			if ( nodeDef.isBone === true ) {

				node = new Bone();

			} else if ( objects.length > 1 ) {

				node = new Group();

			} else if ( objects.length === 1 ) {

				node = objects[ 0 ];

			} else {

				node = new Object3D();

			}

			if ( node !== objects[ 0 ] ) {

				for ( let i = 0, il = objects.length; i < il; i ++ ) {

					node.add( objects[ i ] );

				}

			}

			if ( nodeDef.name ) {

				node.userData.name = nodeDef.name;
				node.name = nodeName;

			}

			assignExtrasToUserData( node, nodeDef );

			if ( nodeDef.extensions ) addUnknownExtensionsToUserData( extensions, node, nodeDef );

			if ( nodeDef.matrix !== undefined ) {

				const matrix = new Matrix4();
				matrix.fromArray( nodeDef.matrix );
				node.applyMatrix4( matrix );

			} else {

				if ( nodeDef.translation !== undefined ) {

					node.position.fromArray( nodeDef.translation );

				}

				if ( nodeDef.rotation !== undefined ) {

					node.quaternion.fromArray( nodeDef.rotation );

				}

				if ( nodeDef.scale !== undefined ) {

					node.scale.fromArray( nodeDef.scale );

				}

			}

			if ( ! parser.associations.has( node ) ) {

				parser.associations.set( node, {} );

			} else if ( nodeDef.mesh !== undefined && parser.meshCache.refs[ nodeDef.mesh ] > 1 ) {

				const mapping = parser.associations.get( node );
				parser.associations.set( node, { ...mapping } );

			}

			parser.associations.get( node ).nodes = nodeIndex;

			return node;

		} );

		return this.nodeCache[ nodeIndex ];

	}

	/**
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
	 *
	 * @private
	 * @param {number} sceneIndex
	 * @return {Promise<Group>}
	 */
	loadScene( sceneIndex ) {

		const extensions = this.extensions;
		const sceneDef = this.json.scenes[ sceneIndex ];
		const parser = this;

		// Loader returns Group, not Scene.
		// See: https://github.com/mrdoob/three.js/issues/18342#issuecomment-578981172
		const scene = new Group();
		if ( sceneDef.name ) scene.name = parser.createUniqueName( sceneDef.name );

		assignExtrasToUserData( scene, sceneDef );

		if ( sceneDef.extensions ) addUnknownExtensionsToUserData( extensions, scene, sceneDef );

		const nodeIds = sceneDef.nodes || [];

		const pending = [];

		for ( let i = 0, il = nodeIds.length; i < il; i ++ ) {

			pending.push( parser.getDependency( 'node', nodeIds[ i ] ) );

		}

		return Promise.all( pending ).then( function ( nodes ) {

			for ( let i = 0, il = nodes.length; i < il; i ++ ) {

				scene.add( nodes[ i ] );

			}

			// Removes dangling associations, associations that reference a node that
			// didn't make it into the scene.
			const reduceAssociations = ( node ) => {

				const reducedAssociations = new Map();

				for ( const [ key, value ] of parser.associations ) {

					if ( key instanceof Material || key instanceof Texture ) {

						reducedAssociations.set( key, value );

					}

				}

				node.traverse( ( node ) => {

					const mappings = parser.associations.get( node );

					if ( mappings != null ) {

						reducedAssociations.set( node, mappings );

					}

				} );

				return reducedAssociations;

			};

			parser.associations = reduceAssociations( scene );

			return scene;

		} );

	}

	_createAnimationTracks( node, inputAccessor, outputAccessor, sampler, target ) {

		const tracks = [];

		const targetName = node.name ? node.name : node.uuid;
		const targetNames = [];

		if ( PATH_PROPERTIES[ target.path ] === PATH_PROPERTIES.weights ) {

			node.traverse( function ( object ) {

				if ( object.morphTargetInfluences ) {

					targetNames.push( object.name ? object.name : object.uuid );

				}

			} );

		} else {

			targetNames.push( targetName );

		}

		let TypedKeyframeTrack;

		switch ( PATH_PROPERTIES[ target.path ] ) {

			case PATH_PROPERTIES.weights:

				TypedKeyframeTrack = NumberKeyframeTrack;
				break;

			case PATH_PROPERTIES.rotation:

				TypedKeyframeTrack = QuaternionKeyframeTrack;
				break;

			case PATH_PROPERTIES.translation:
			case PATH_PROPERTIES.scale:

				TypedKeyframeTrack = VectorKeyframeTrack;
				break;

			default:

				switch ( outputAccessor.itemSize ) {

					case 1:
						TypedKeyframeTrack = NumberKeyframeTrack;
						break;
					case 2:
					case 3:
					default:
						TypedKeyframeTrack = VectorKeyframeTrack;
						break;

				}

				break;

		}

		const interpolation = sampler.interpolation !== undefined ? INTERPOLATION[ sampler.interpolation ] : InterpolateLinear;


		const outputArray = this._getArrayFromAccessor( outputAccessor );

		for ( let j = 0, jl = targetNames.length; j < jl; j ++ ) {

			const track = new TypedKeyframeTrack(
				targetNames[ j ] + '.' + PATH_PROPERTIES[ target.path ],
				inputAccessor.array,
				outputArray,
				interpolation
			);

			// Override interpolation with custom factory method.
			if ( sampler.interpolation === 'CUBICSPLINE' ) {

				this._createCubicSplineTrackInterpolant( track );

			}

			tracks.push( track );

		}

		return tracks;

	}

	_getArrayFromAccessor( accessor ) {

		let outputArray = accessor.array;

		if ( accessor.normalized ) {

			const scale = getNormalizedComponentScale( outputArray.constructor );
			const scaled = new Float32Array( outputArray.length );

			for ( let j = 0, jl = outputArray.length; j < jl; j ++ ) {

				scaled[ j ] = outputArray[ j ] * scale;

			}

			outputArray = scaled;

		}

		return outputArray;

	}

	_createCubicSplineTrackInterpolant( track ) {

		track.createInterpolant = function InterpolantFactoryMethodGLTFCubicSpline( result ) {

			// A CUBICSPLINE keyframe in glTF has three output values for each input value,
			// representing inTangent, splineVertex, and outTangent. As a result, track.getValueSize()
			// must be divided by three to get the interpolant's sampleSize argument.

			const interpolantType = ( this instanceof QuaternionKeyframeTrack ) ? GLTFCubicSplineQuaternionInterpolant : GLTFCubicSplineInterpolant;

			return new interpolantType( this.times, this.values, this.getValueSize() / 3, result );

		};

		// Mark as CUBICSPLINE. `track.getInterpolation()` doesn't support custom interpolants.
		track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;

	}

}

/**
 *
 * @private
 * @param {BufferGeometry} geometry
 * @param {GLTF.Primitive} primitiveDef
 * @param {GLTFParser} parser
 */
function computeBounds( geometry, primitiveDef, parser ) {

	const attributes = primitiveDef.attributes;

	const box = new Box3();

	if ( attributes.POSITION !== undefined ) {

		const accessor = parser.json.accessors[ attributes.POSITION ];

		const min = accessor.min;
		const max = accessor.max;

		// glTF requires 'min' and 'max', but VRM (which extends glTF) currently ignores that requirement.

		if ( min !== undefined && max !== undefined ) {

			box.set(
				new Vector3( min[ 0 ], min[ 1 ], min[ 2 ] ),
				new Vector3( max[ 0 ], max[ 1 ], max[ 2 ] )
			);

			if ( accessor.normalized ) {

				const boxScale = getNormalizedComponentScale( WEBGL_COMPONENT_TYPES[ accessor.componentType ] );
				box.min.multiplyScalar( boxScale );
				box.max.multiplyScalar( boxScale );

			}

		} else {

			console.warn( 'THREE.GLTFLoader: Missing min/max properties for accessor POSITION.' );

			return;

		}

	} else {

		return;

	}

	const targets = primitiveDef.targets;

	if ( targets !== undefined ) {

		const maxDisplacement = new Vector3();
		const vector = new Vector3();

		for ( let i = 0, il = targets.length; i < il; i ++ ) {

			const target = targets[ i ];

			if ( target.POSITION !== undefined ) {

				const accessor = parser.json.accessors[ target.POSITION ];
				const min = accessor.min;
				const max = accessor.max;

				// glTF requires 'min' and 'max', but VRM (which extends glTF) currently ignores that requirement.

				if ( min !== undefined && max !== undefined ) {

					// we need to get max of absolute components because target weight is [-1,1]
					vector.setX( Math.max( Math.abs( min[ 0 ] ), Math.abs( max[ 0 ] ) ) );
					vector.setY( Math.max( Math.abs( min[ 1 ] ), Math.abs( max[ 1 ] ) ) );
					vector.setZ( Math.max( Math.abs( min[ 2 ] ), Math.abs( max[ 2 ] ) ) );


					if ( accessor.normalized ) {

						const boxScale = getNormalizedComponentScale( WEBGL_COMPONENT_TYPES[ accessor.componentType ] );
						vector.multiplyScalar( boxScale );

					}

					// Note: this assumes that the sum of all weights is at most 1. This isn't quite correct - it's more conservative
					// to assume that each target can have a max weight of 1. However, for some use cases - notably, when morph targets
					// are used to implement key-frame animations and as such only two are active at a time - this results in very large
					// boxes. So for now we make a box that's sometimes a touch too small but is hopefully mostly of reasonable size.
					maxDisplacement.max( vector );

				} else {

					console.warn( 'THREE.GLTFLoader: Missing min/max properties for accessor POSITION.' );

				}

			}

		}

		// As per comment above this box isn't conservative, but has a reasonable size for a very large number of morph targets.
		box.expandByVector( maxDisplacement );

	}

	geometry.boundingBox = box;

	const sphere = new Sphere();

	box.getCenter( sphere.center );
	sphere.radius = box.min.distanceTo( box.max ) / 2;

	geometry.boundingSphere = sphere;

}

/**
 *
 * @private
 * @param {BufferGeometry} geometry
 * @param {GLTF.Primitive} primitiveDef
 * @param {GLTFParser} parser
 * @return {Promise<BufferGeometry>}
 */
function addPrimitiveAttributes( geometry, primitiveDef, parser ) {

	const attributes = primitiveDef.attributes;

	const pending = [];

	function assignAttributeAccessor( accessorIndex, attributeName ) {

		return parser.getDependency( 'accessor', accessorIndex )
			.then( function ( accessor ) {

				geometry.setAttribute( attributeName, accessor );

			} );

	}

	for ( const gltfAttributeName in attributes ) {

		const threeAttributeName = ATTRIBUTES[ gltfAttributeName ] || gltfAttributeName.toLowerCase();

		// Skip attributes already provided by e.g. Draco extension.
		if ( threeAttributeName in geometry.attributes ) continue;

		pending.push( assignAttributeAccessor( attributes[ gltfAttributeName ], threeAttributeName ) );

	}

	if ( primitiveDef.indices !== undefined && ! geometry.index ) {

		const accessor = parser.getDependency( 'accessor', primitiveDef.indices ).then( function ( accessor ) {

			geometry.setIndex( accessor );

		} );

		pending.push( accessor );

	}

	if ( ColorManagement.workingColorSpace !== LinearSRGBColorSpace && 'COLOR_0' in attributes ) {

		console.warn( `THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ColorManagement.workingColorSpace}" not supported.` );

	}

	assignExtrasToUserData( geometry, primitiveDef );

	computeBounds( geometry, primitiveDef, parser );

	return Promise.all( pending ).then( function () {

		return primitiveDef.targets !== undefined
			? addMorphTargets( geometry, primitiveDef.targets, parser )
			: geometry;

	} );

}

/**
 * Loader result of `GLTFLoader`.
 *
 * @typedef {Object} GLTFLoader~LoadObject
 * @property {Array<AnimationClip>} animations - An array of animation clips.
 * @property {Object} asset - Meta data about the loaded asset.
 * @property {Array<Camera>} cameras - An array of cameras.
 * @property {GLTFParser} parser - A reference to the internal parser.
 * @property {Group} scene - The default scene.
 * @property {Array<Group>} scenes - glTF assets might define multiple scenes.
 * @property {Object} userData - Additional data.
 **/

Object.assign(window.__ADDONS,{GLTFLoader:GLTFLoader});

})();

(function(){
const{BackSide,BoxGeometry,InstancedMesh,Mesh,MeshLambertMaterial,MeshStandardMaterial,PointLight,Scene,Object3D}=window.THREE;

/**
 * This class represents a scene with a basic room setup that can be used as
 * input for {@link PMREMGenerator#fromScene}. The resulting PMREM represents the room's
 * lighting and can be used for Image Based Lighting by assigning it to {@link Scene#environment}
 * or directly as an environment map to PBR materials.
 *
 * The implementation is based on the [EnvironmentScene](https://github.com/google/model-viewer/blob/master/packages/model-viewer/src/three-components/EnvironmentScene.ts)
 * component from the `model-viewer` project.
 *
 * ```js
 * const environment = new RoomEnvironment();
 * const pmremGenerator = new THREE.PMREMGenerator( renderer );
 *
 * const envMap = pmremGenerator.fromScene( environment ).texture;
 * scene.environment = envMap;
 * ```
 *
 * @augments Scene
 * @three_import const{RoomEnvironment}=window.__ADDONS;
 */
class RoomEnvironment extends Scene {

	constructor() {

		super();

		this.name = 'RoomEnvironment';

		const geometry = new BoxGeometry();
		geometry.deleteAttribute( 'uv' );

		const roomMaterial = new MeshStandardMaterial( { side: BackSide } );
		const boxMaterial = new MeshStandardMaterial();

		const mainLight = new PointLight( 0xffffff, 900, 28, 2 );
		mainLight.position.set( 0.418, 16.199, 0.300 );
		this.add( mainLight );

		const room = new Mesh( geometry, roomMaterial );
		room.position.set( - 0.757, 13.219, 0.717 );
		room.scale.set( 31.713, 28.305, 28.591 );
		this.add( room );

		const boxes = new InstancedMesh( geometry, boxMaterial, 6 );
		const transform = new Object3D();

		// box1
		transform.position.set( - 10.906, 2.009, 1.846 );
		transform.rotation.set( 0, - 0.195, 0 );
		transform.scale.set( 2.328, 7.905, 4.651 );
		transform.updateMatrix();
		boxes.setMatrixAt( 0, transform.matrix );

		// box2
		transform.position.set( - 5.607, - 0.754, - 0.758 );
		transform.rotation.set( 0, 0.994, 0 );
		transform.scale.set( 1.970, 1.534, 3.955 );
		transform.updateMatrix();
		boxes.setMatrixAt( 1, transform.matrix );

		// box3
		transform.position.set( 6.167, 0.857, 7.803 );
		transform.rotation.set( 0, 0.561, 0 );
		transform.scale.set( 3.927, 6.285, 3.687 );
		transform.updateMatrix();
		boxes.setMatrixAt( 2, transform.matrix );

		// box4
		transform.position.set( - 2.017, 0.018, 6.124 );
		transform.rotation.set( 0, 0.333, 0 );
		transform.scale.set( 2.002, 4.566, 2.064 );
		transform.updateMatrix();
		boxes.setMatrixAt( 3, transform.matrix );

		// box5
		transform.position.set( 2.291, - 0.756, - 2.621 );
		transform.rotation.set( 0, - 0.286, 0 );
		transform.scale.set( 1.546, 1.552, 1.496 );
		transform.updateMatrix();
		boxes.setMatrixAt( 4, transform.matrix );

		// box6
		transform.position.set( - 2.193, - 0.369, - 5.547 );
		transform.rotation.set( 0, 0.516, 0 );
		transform.scale.set( 3.875, 3.487, 2.986 );
		transform.updateMatrix();
		boxes.setMatrixAt( 5, transform.matrix );

		this.add( boxes );


		// -x right
		const light1 = new Mesh( geometry, createAreaLightMaterial( 50 ) );
		light1.position.set( - 16.116, 14.37, 8.208 );
		light1.scale.set( 0.1, 2.428, 2.739 );
		this.add( light1 );

		// -x left
		const light2 = new Mesh( geometry, createAreaLightMaterial( 50 ) );
		light2.position.set( - 16.109, 18.021, - 8.207 );
		light2.scale.set( 0.1, 2.425, 2.751 );
		this.add( light2 );

		// +x
		const light3 = new Mesh( geometry, createAreaLightMaterial( 17 ) );
		light3.position.set( 14.904, 12.198, - 1.832 );
		light3.scale.set( 0.15, 4.265, 6.331 );
		this.add( light3 );

		// +z
		const light4 = new Mesh( geometry, createAreaLightMaterial( 43 ) );
		light4.position.set( - 0.462, 8.89, 14.520 );
		light4.scale.set( 4.38, 5.441, 0.088 );
		this.add( light4 );

		// -z
		const light5 = new Mesh( geometry, createAreaLightMaterial( 20 ) );
		light5.position.set( 3.235, 11.486, - 12.541 );
		light5.scale.set( 2.5, 2.0, 0.1 );
		this.add( light5 );

		// +y
		const light6 = new Mesh( geometry, createAreaLightMaterial( 100 ) );
		light6.position.set( 0.0, 20.0, 0.0 );
		light6.scale.set( 1.0, 0.1, 1.0 );
		this.add( light6 );

	}

	/**
	 * Frees internal resources. This method should be called
	 * when the environment is no longer required.
	 */
	dispose() {

		const resources = new Set();

		this.traverse( ( object ) => {

			if ( object.isMesh ) {

				resources.add( object.geometry );
				resources.add( object.material );

			}

		} );

		for ( const resource of resources ) {

			resource.dispose();

		}

	}

}

function createAreaLightMaterial( intensity ) {

	// create an emissive-only material. see #31348
	const material = new MeshLambertMaterial( {
		color: 0x000000,
		emissive: 0xffffff,
		emissiveIntensity: intensity
	} );

	return material;

}

Object.assign(window.__ADDONS,{RoomEnvironment:RoomEnvironment});

})();

