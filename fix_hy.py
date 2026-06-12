#!/usr/bin/env python3
"""Replace Armenian (hy) give+sections+framework-expr4+5 with proper Unicode."""
import re

with open('src/data/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

arm_start = content.find('  /* ── ARMENIAN ── */')
arm_end   = content.find('  /* ── PORTUGUESE ── */')
hy = content[arm_start:arm_end]

# ── ALL Armenian Unicode code points ─────────────────────────────────────
# Small
a=0x0561;b=0x0562;g=0x0563;d=0x0564;ye=0x0565;z=0x0566;eh=0x0567
et=0x0568;tp=0x0569;zh=0x056A;ii=0x056B;l=0x056C;kh=0x056D;ts=0x056E
k=0x056F;h=0x0570;dz=0x0571;gh=0x0572;ch=0x0573;m=0x0574;y=0x0575
n=0x0576;sh=0x0577;vo=0x0578;p=0x057A;j=0x057B;rr=0x057C;s=0x057D
v=0x057E;t=0x057F;r=0x0580;tsp=0x0581;pp=0x0583;kp=0x0584;o=0x0585;f=0x0586
wi=0x0582  # 2nd char of "ou" digraph ու
# Capital
cA=0x0531;cB=0x0532;cG=0x0533;cD=0x0534;cYE=0x0535;cZ=0x0536
cZH=0x053A;cII=0x053B;cL=0x053C;cKH=0x053D;cK=0x053F;cH=0x0540
cDZ=0x0541;cGH=0x0542;cCH=0x0543;cM=0x0544;cY=0x0545;cN=0x0546
cSH=0x0547;cVO=0x0548;cP=0x054A;cJ=0x054B;cRR=0x054C;cS=0x054D
cV=0x054E;cT=0x054F;cR=0x0550;cTP=0x0539;cKP=0x0554;cPP=0x0553

def c(*x): return ''.join(chr(q) for q in x)
ou = c(vo, wi)   # ու

# ── Frequently reused words ───────────────────────────────────────────────
HAMAR    = c(h,a,m,a,r)                               # hamar = for
ASTVATC  = c(cA,s,t,v,a,ts)                           # Astvats = God
HAMASHKH = c(h,a,m,a,sh,kh,a,r,h,a,y,ii,n)           # hamashkharhain = global
YEKELEC  = c(cYE,k,ye,gh,ye,tsp,ii)                   # Yekeleci = Church
RESURS   = c(cRR,ye,s)+ou+c(r,s,n,ye,r)               # Resursner
AZGNER   = c(a,z,g,n,ye,r)                            # azgner = nations
KRISTOS  = c(cK,r,ii,s,t,vo,s)                        # Kristos
VERD     = c(v,ye,r,a,d,a,r,ts)+ou                    # veradartsu = return (genitive)
MERD_AR  = c(cM,ye,r,dz,a,v,vo,r)+' '+c(cA,r,ye,v,ye,l,kp)  # Merdzavor Arevek
NVIRAT   = c(n,v,ii,r,a,t,v)+ou+c(tp,y)+ou+c(n)      # nviratv·utyun = donation
AMSAKAN  = c(cA,m,s,a,k,a,y,ii,n)                     # Amsakan = monthly
AJJAKTS  = c(cA,j,j,a,k,ts)+ou+c(tp,y)+ou+c(n)       # Ajjakts·utyun = support
ISRAEL   = c(cII,s,r,a,y,ye,l)                        # Israel
VIDTEACH = c(cT,ye,s,a)+ou+c(s)+ou+c(ts,m,n,ye,r)    # Tesao-usoumner = video teachings
BOOKS    = c(cG,r,kp,ye,r)                            # Grk'er = Books
NOTES    = c(cN,sh)+ou+c(m,n,ye,r)                    # Nsh·oumner = Notes
GORTS_EUT= c(cG,vo,r,ts,et,n,k,ye,r)+ou+c(tp,y)+ou+c(n)  # Gortsënkor·eutyun = partnership
MEZMOV   = c(cM,ye,z,m,vo,v)                          # Mezmov = with us
ARTICLES = c(cH,vo,d,v,a,ts,n,ye,r)                   # Hodvatszner = articles
BACK_ALL = '← '+c(cB,vo,l,vo,r)+' '+RESURS           # ← Bolor Resursner
SHORTS5  = '1 '+c(cRR,vo,p,ye)+' '+c(k,a,r,ch)+' '+c(t,ye,s,a,n,y)+ou+c(tp,ye,r)

# ── Expression 04 ────────────────────────────────────────────────────────
e04_title = c(cV,ye,r,j,ii,n)+' '+c(cZH,a,m,a,n,a,k,n,ye,r)
e04_sub   = c(cA,z,g,ye,r,ii)+' '+c(cD,a,t,a,s,t,a,n)
e04_body  = (
    c(cS)+ou+c(r,b)+' '+c(cG,ii,r,kp,et)+' '+
    c(b,a,tsp,a,h,a,y,t)+ou+c(m)+' '+c(ye)+' '+
    ASTVATC+' '+c(ts,r,a,g,ii,r,et)+' '+
    c(a,z,g,n,ye,r,ii)+' '+HAMAR+' '+
    c(v,ye,r,j,ii,n)+' '+c(vo,r,ye,r,ii,n)+' — '+
    c(m,ye,ts)+' '+c(tsp,n,tsp)+ou+c(m)+' '+ou+' '+
    c(v,ye,r,a,d,a,s,a,v,vo,r)+ou+c(m)+', '+
    c(ye,r,b)+' '+c(p,a,t,m)+ou+c(tp,y)+ou+c(n,n)+' '+
    c(et,n,tsp,n)+ou+c(m)+' '+c(ye)+' '+
    c(d,ye,p,ii)+' '+c(ii,r)+' '+
    c(k,a,n,kh,a,t,ye,s,v,a,ts)+' '+c(a,v,a,r,t)+':'
)

# ── Expression 05 ────────────────────────────────────────────────────────
e05_title = c(cA,gh,vo,tp,kp,ii)+' '+c(cT)+ou+c(n)
e05_sub   = c(cH,a,s,t,a,t,ye,l)+' '+ASTVATC+' '+c(cB,n,a,k,a,v,a,y,r,et)
e05_body  = (
    ASTVATC+' '+c(b,a,r,dz,r,a,tsp,n)+ou+c(m)+' '+c(ye)+
    ' 24/7 '+c(a,gh,vo,tp,kp,ii)+' '+c(t)+ou+c(n,ye,r)+' '+
    AZGNER+ou+c(m)+' — '+
    c(b,a,r,ye,kh,vo,s)+ou+c(tp,y,a,n)+' '+
    c(h,ii,m,kp,n,ye,r,n)+', '+c(vo,r,n)+' '+
    c(k,p,a,sh,ye,tsp,n,ye,l,o,v)+' '+c(ye)+' '+
    HAMASHKH+' '+c(b,ye,r,kp)+':'
)

# ── GIVE section ─────────────────────────────────────────────────────────
give_eyebrow  = GORTS_EUT+' '+MEZMOV
give_title    = AJJAKTS+' '+c(cT,a,r,ye,kp)+' Framework:ME-'+c(ii)+' '+c(cG,vo,r,ts,ii,n)
give_desc     = (
    'Framework:ME-'+c(n)+' '+ou+c(s)+ou+c(ts,m,a,n)+' '+c(ye,v)+' '+
    c(rr,ye,s)+ou+c(r,s,n,ye,r,ii)+' '+c(a,n,v,ch,a,r)+' '+c(g,r,a,d,a,r,a,n)+' '+
    c(ye)+' '+HAMASHKH+' '+YEKELEC+c(ii)+' '+HAMAR+'. '+
    c(cA,m,ye,n,a,y,ii,n)+' '+c(h,vo,d,v,a,ts,d)+', '+
    ou+c(s)+ou+c(ts,m,n,ye,r)+' '+c(ye,v)+' '+RESURS+' '+
    c(a,n,v,ch,a,r)+' '+c(ye)+'.'
)
give_r1t = c(cA,n,v,ch,a,r)+' '+c(cK,r,vo,n,a,k,a,n)+' '+RESURS
give_r1b = ou+c(s)+ou+c(ts,a,k,a,n)+' '+c(h,vo,d,v,a,ts,n,ye,r)+', '+VIDTEACH+' '+c(ye,v)+' '+NOTES
give_r2t = c(cH,a,s,n,ye,l)+' '+AZGNER+c(ii,n)
give_r2b = c(cP,a,t,r,a,s,t,ye,l)+' '+HAMASHKH+' '+YEKELEC+c(ii,n)+' '+KRISTOS+c(ii)+' '+VERD+' '+HAMAR
give_r3t = c(cB,a,r,ye,kh,vo,s)+ou+c(tp,y)+ou+c(n)+' '+c(ye,v)+' '+c(cA,gh,vo,tp,kp)
give_r3b = (
    c(a,gh,vo,tp,kp,a,y,ii,n)+' '+c(a,j,j,a,k,ts)+ou+c(tp,y)+ou+c(n)+' '+
    ISRAEL+c(ii)+', '+MERD_AR+c(kp,ii)+' '+c(ye,v)+' '+AZGNER+c(ii)+' '+HAMAR
)
give_mt  = AMSAKAN+' '+AJJAKTS
give_md  = (
    c(cM,ii,a,ts,ye,kp)+' '+c(vo,r,p,ye,s)+' '+AMSAKAN+' '+
    c(g,vo,r,ts)+ou+c(n,k,vo,r)+' '+c(ye,v)+' '+c(vo,k,n,ye,ts,ye,kp)+' '+
    c(a,y,s)+' '+c(ts,a,r,a,y)+ou+c(tp,y)+ou+c(n,n)+'.'
)
give_cta = AMSAKAN+' '+NVIRAT
give_sec = (
    c(cA,n,p,a,t)+ou+c(h,a,r)+' '+NVIRAT+' Zeffy-'+c(ii)+' '+
    c(m,ii,j,vo,tsp,y)+ou+c(tp,y,a,m,b)+' — 100% '+c(g,n,vo,m)+' '+c(ye)+' '+
    c(ts,a,r,a,y)+ou+c(tp,y)+ou+c(n,ii,n)
)
give_q   = c(cH,a,r,ts)+ou+c(m,n,ye,r)+'?'

# ── SECTIONS ─────────────────────────────────────────────────────────────
soon     = c(cSH)+ou+c(t,vo,v)
notify   = c(cDZ,a,n)+ou+c(ch,ye,l)
backhome = '← '+c(cG,l,kh,a,v,vo,r)+' '+c(cYE,j)

res_ey   = c(cA,n,v,ch,a,r)+' '+c(ye,v)+' '+c(cB,vo,l,vo,r,ii)+' '+c(cH,a,m,a,r)
res_ti   = c(cK,r,vo,n,a,k,a,n)+' '+ou+c(s)+ou+c(ts,m,a,n)+' '+RESURS
res_su   = (
    c(cA,ch,k,a,ts,vo,gh)+' '+RESURS+c(ii)+' '+c(g,r,a,d,a,r,a,n)+' — '+
    c(a,n,v,ch,a,r)+' '+c(h,a,s,a,n,ye,l,ii)+' '+
    HAMASHKH+' '+YEKELEC+c(ii,n)+' '+KRISTOS+c(ii)+' '+VERD+' '+HAMAR+'.'
)
res_ba   = ou+c(s)+ou+c(ts,m,n,ye,r)+' '+ISRAEL+c(ii)+', '+MERD_AR+c(kp,ii)+' '+c(ye,v)+' '+AZGNER+c(ii)+' '+c(m,a,s,ii,n)

c1t = VIDTEACH
c1d = VIDTEACH+' Framework:ME YouTube '+c(a,l,ii,kp,ii)+' 7 '+c(b,a,zh,m,n,a,k,a,n)+' '+c(n,y)+ou+c(tp,n,ye,r,o,v)+'.'
c1a = ou+c(s)+ou+c(ts,m,a,s,ii,r,ye,l)

c2t = BOOKS
c2d = c(cA,n,v,ch,a,r,a,b,a,n)+ou+c(ts)+ou+c(m,n,ye,r)+' '+c(k,r,vo,n,a,k,a,n)+' '+c(g,r,kp,ye,r,ii)+' '+c(g,r,a,d,a,r,a,n)+'.'
c2a = ou+c(s)+ou+c(ts,m,a,s,ii,r,ye,l)+' '+BOOKS

c3t = ARTICLES+' '+c(y,s,t)+' '+c(cA,z,g,ii)
c3d = ARTICLES+' '+ASTVATC+c(vo)+' '+c(pp,rr,k,a,g,vo,r,ts,a,k,a,n)+' '+c(n,p,a,t,a,k,n,ye,r,ii)+' '+c(m,a,s,ii,n)+'.'
c3a = ou+c(s)+ou+c(ts,m,a,s,ii,r,ye,l)+' '+ARTICLES

c4t = NOTES
c4d = c(cN,ye,r,b,ye,rr,n,ye,l,ii)+' '+ou+c(s)+ou+c(ts,a,k,a,n)+' '+NOTES+'.'
c4a = ou+c(s)+ou+c(ts,m,a,s,ii,r,ye,l)+' '+NOTES

c5t = SHORTS5
c5d = '1 '+c(r,vo,p,ye)+' '+ou+c(s)+ou+c(ts,m,n,ye,r)+' '+c(a,m,ye,n,vo,r,y,a)+' '+c(kh,r,a,kh,r,a,ts)+ou+c(m,n)+'.'
c5a = ou+c(s)+ou+c(ts,m,a,s,ii,r,ye,l)

nat_ti = AZGNER+' '+c(ye,v)+' '+c(cM,a,r,g,a,r,ye)+ou+c(tp,y)+ou+c(n)
nat_de = ASTVATC+c(vo)+' '+c(k,r,vo,n,a,k,a,n)+' '+c(m,a,r,g,a,r,ye)+ou+c(tp,y)+ou+c(n)+' '+c(ye,v)+' '+c(pp,rr,k,a,g,vo,r,ts,a,k,a,n)+' '+c(n,p,a,t,a,k,n,ye,r,n)+' '+MERD_AR+c(kp,ii)+' '+AZGNER+c(ii)+' '+HAMAR+'.'
et_ti  = c(cV,ye,r,j,ii,n)+' '+c(cZH,a,m,a,n,a,k,n,ye,r)
et_de  = ou+c(s)+ou+c(ts,m,n,ye,r)+' '+c(ye,v)+' '+RESURS+' '+c(k,r,vo,n,a,k,a,n)+' '+c(ye,s,kp,a,t,vo,l,vo,g,ii,a,y,ii)+' — '+c(h,a,s,k,a,n,a,l)+' '+c(n,sh,a,n,n,ye,r,n)+' '+c(ye,v)+' '+AZGNER+c(ii)+' '+c(d,a,s,a,v,vo,r)+ou+c(m,n)+' '+c(v,ye,r,j,ii,n)+' '+c(vo,r,ye,r,ii,n)+'.'
geo_ti = c(cYE,r,k,r,a,kp,a,gh,a,kp,a,k,a,n)+ou+c(tp,y)+ou+c(n)
geo_de = c(ye,r,k,r,a,kp,a,gh,a,kp,a,k,a,n)+' '+c(v,ye,r,l)+ou+c(ts)+ou+c(m)+' '+c(ye,v)+' '+c(m,ye,k,n,a,b,a,n)+ou+c(tp,y)+ou+c(n,n,ye,r)+' '+ASTVATC+c(vo)+' '+c(cB,a,n,ii)+' '+c(l)+ou+c(y,s,ii)+' '+c(n,ye,rr,kp,vo)+'.'
art_ti = ARTICLES+' '+c(y,s,t)+' '+c(cA,z,g,ii)
art_su = c(cYE,n,t,r,ye,l)+' '+c(a,z,g,ii)+' '+c(d,r,vo,sh,a,k,n)+' '+ASTVATC+c(vo)+' '+c(n,p,a,t,a,k,n,ye,r,ii)+' '+c(m,a,s,ii,n)+' '+ARTICLES+' '+c(k,a,r,d,a,l)+ou+'.'
art_se = c(cYE,n,t,r,ye,l)+' '+c(cA,z,g)
art_ba = BACK_ALL

aut_ti = c(cH,ye,gh,ii,n,a,k,n,ye,r)
aut_su = c(cD,z,a,y,n,ye,r,n)+' '+c(ye,v)+' '+ou+c(s)+ou+c(ts,ii,ch,n,ye,r,n)+' Framework:ME-'+c(ii)+' '+c(et,t,ye,rr,ye,v)
aut_so = c(cH,ye,gh,ii,n,a,k,n,ye,r,ii)+' '+c(p,r,vo,f,ii,l,n,ye,r,n)+' '+soon+'.'

vt_ey  = c(cA,n,v,ch,a,r)+' '+RESURS
vt_ti  = VIDTEACH
vt_su  = VIDTEACH+' Framework:ME YouTube '+c(a,l,ii,kp,ii)+'.'
vt_ba  = BACK_ALL
vt_vi  = c(t,ye,s,a,n,y)+ou+c(tp)
vt_vis = c(t,ye,s,a,n,y)+ou+c(tp)

# category labels + descs
hop_l  = c(cA,gh,vo,tp,kp,ii)+' '+c(cT)+ou+c(n)
hop_d  = c(sh)+ou+c(r,j,vo,r,y,a,k,a,n)+' '+c(b,a,r,ye,kh,vo,s)+ou+c(tp,y)+ou+c(n)+' '+MERD_AR+c(kp,ii)+' '+AZGNER+c(ii)+' '+c(ye,v)+' '+KRISTOS+c(ii)+' '+VERD+' '+HAMAR+'.'
end_l  = c(cV,ye,r,j,ii,n)+' '+c(cZH,a,m,a,n,a,k,n,ye,r)
end_d  = c(k,r,vo,n,a,k,a,n)+' '+c(m,a,r,g,a,r,ye)+ou+c(tp,y)+ou+c(n)+' '+c(ye,v)+' '+ASTVATC+c(vo)+' '+c(ts,r,a,g,ii,r,n)+' '+AZGNER+c(ii)+' '+HAMAR+' '+c(v,ye,r,j,ii,n)+' '+c(vo,r,ye,r,ii,n)+'.'
isr_l  = ISRAEL
isr_d  = ASTVATC+c(vo)+' '+ou+c(kh,t,a,y,ii,n)+' '+c(n,p,a,t,a,k,n,ye,r,n)+' '+c(h,r,ye,a,k,a,n)+' '+c(zh,vo,gh,vo,v,r,d,ii)+', '+c(ye,r,k,r,ii)+' '+c(ye,v)+' '+c(v,ye,r,j,ii,n)+' '+c(zh,a,m,a,n,a,k,n,ye,r,ii)+' '+c(m,a,r,g,a,r,ye)+ou+c(tp,y)+ou+c(n)+'.'
boc_l  = KRISTOS+c(ii)+' '+c(cH,a,r,s,n,a,ts)+ou
boc_d  = HAMASHKH+' '+YEKELEC+c(ii,n)+' '+c(p,a,t,r,a,s,t,v,a,ts)+' '+c(ye,v)+' '+c(h,a,n,d,n,v,a,ts)+' '+c(cII,s)+ou+c(s,ii)+' '+VERD+' '+HAMAR+'.'
mis_l  = c(cA,rr,a,kp,ye,l)+ou+c(tp,y)+ou+c(n)+' '+MERD_AR+ou+c(m)
mis_d  = c(cA,v,ye,t,a,r,a,n,n)+' '+c(h,a,s,ts,n,ye,l)+' '+MERD_AR+c(kp,ii)+' '+c(a,n,h,a,s,a,n,ye,l,ii)+' '+c(zh,vo,gh,vo,v,r,d,n,ye,r,ii,n)+'.'
cl_l   = c(cK,r,ii,s,t,vo,n,ye,a,k,a,n)+' '+c(cK,y,a,n,kp)
cl_d   = c(g,vo,r,n,a,v,vo,r)+' '+ou+c(s)+ou+c(ts)+ou+c(m)+' '+KRISTOS+c(ii,n)+' '+c(h,ye,t,ye,v,vo,r,d,ye,l)+ou+' '+HAMAR+'.'
th_l   = c(cA,s,t,v,a,ts,a,b,a,n)+ou+c(tp,y)+ou+c(n)
th_d   = c(k,r,vo,n,a,k,a,n)+' '+c(v,a,r,d,a,p,ye,t,a,k,a,n)+' '+ou+c(s)+ou+c(ts)+ou+c(m,n,ye,r,ii)+' '+c(h,a,s,k,a,n)+ou+c(m)+'.'

bk_ti  = BOOKS
bk_su  = c(cA,n,v,ch,a,r,a,b,a,n)+ou+c(ts)+ou+c(m,n,ye,r)+' '+c(k,a,r,d,a,l)+ou+' '+HAMAR+'.'
bk_vi  = c(cT,ye,s,n,ye,l)+' '+c(cG,ii,r,kp,n)
bk_so  = BOOKS+' '+c(sh)+ou+c(t,vo,v)+'.'
bk_ba  = BACK_ALL
bk_by  = c(h,ye,gh,ii,n,a,k)

no_ti  = NOTES
no_su  = c(cN,ye,r,b,ye,rr,n,ye,l,ii)+' '+ou+c(s)+ou+c(ts,a,k,a,n)+' '+NOTES+'.'
no_so  = NOTES+' '+soon+'.'
no_ba  = BACK_ALL

sh_ti  = SHORTS5
sh_su  = '1 '+c(r,vo,p,ye)+' '+ou+c(s)+ou+c(ts,m,n,ye,r)+' '+c(a,m,ye,n,vo,r,y,a)+' '+c(kh,r,a,kh,r,a,ts)+ou+c(m,n)+'.'
sh_ba  = BACK_ALL

# ── Build replacement text ───────────────────────────────────────────────
repl = f"""        {{ num: '04', title: '{e04_title}', sub: '{e04_sub}', body: '{e04_body}' }},
        {{ num: '05', title: '{e05_title}', sub: '{e05_sub}', body: '{e05_body}' }},
      ],
    }},
    give: {{
      eyebrow: '{give_eyebrow}', title: '{give_title}',
      desc: '{give_desc}',
      reason1Title: '{give_r1t}', reason1Body: '{give_r1b}',
      reason2Title: '{give_r2t}', reason2Body: '{give_r2b}',
      reason3Title: '{give_r3t}', reason3Body: '{give_r3b}',
      monthlyTitle: '{give_mt}', monthlyDesc: '{give_md}',
      giveCTA: '{give_cta}', secure: '{give_sec}',
      questions: '{give_q}',
    }},
    sections: {{
      comingSoon: '{soon}', getNotified: '{notify}', backToHome: '{backhome}',
      resources: {{
        eyebrow: '{res_ey}', title: '{res_ti}',
        sub: '{res_su}',
        badge: '{res_ba}',
        cards: [
          {{ title: '{c1t}', desc: '{c1d}', cta: '{c1a}' }},
          {{ title: '{c2t}', desc: '{c2d}', cta: '{c2a}' }},
          {{ title: '{c3t}', desc: '{c3d}', cta: '{c3a}' }},
          {{ title: '{c4t}', desc: '{c4d}', cta: '{c4a}' }},
          {{ title: '{c5t}', desc: '{c5d}', cta: '{c5a}' }},
        ],
      }},
      nations: {{ title: '{nat_ti}', desc: '{nat_de}' }},
      endTimes: {{ title: '{et_ti}', desc: '{et_de}' }},
      geopolitics: {{ title: '{geo_ti}', desc: '{geo_de}' }},
      articles: {{ title: '{art_ti}', sub: '{art_su}', selectNation: '{art_se}', back: '{art_ba}' }},
      authors: {{ title: '{aut_ti}', sub: '{aut_su}', comingSoon: '{aut_so}' }},
      videoTeachings: {{
        eyebrow: '{vt_ey}', title: '{vt_ti}', sub: '{vt_su}', back: '{vt_ba}',
        video: '{vt_vi}', videos: '{vt_vis}',
        categories: {{
          'house-of-prayer':      {{ label: '{hop_l}', desc: '{hop_d}' }},
          'end-times':            {{ label: '{end_l}',  desc: '{end_d}' }},
          'israel':               {{ label: '{isr_l}', desc: '{isr_d}' }},
          'bride-of-christ':      {{ label: '{boc_l}', desc: '{boc_d}' }},
          'missions-middle-east': {{ label: '{mis_l}', desc: '{mis_d}' }},
          'christian-living':     {{ label: '{cl_l}',  desc: '{cl_d}' }},
          'theology':             {{ label: '{th_l}',  desc: '{th_d}' }},
        }},
      }},
      books: {{ title: '{bk_ti}', sub: '{bk_su}', viewBook: '{bk_vi}', comingSoon: '{bk_so}', back: '{bk_ba}', by: '{bk_by}' }},
      notes: {{ title: '{no_ti}', sub: '{no_su}', comingSoon: '{no_so}', back: '{no_ba}' }},
      shorts: {{ title: '{sh_ti}', sub: '{sh_su}', back: '{sh_ba}' }},
    }},
  }},

"""

# Find the position of expression 04 in hy
expr4_pos = hy.find("{ num: '04'")
new_hy = hy[:expr4_pos] + repl

# Verify ARM-only for non-ASCII content
bad = [(c2, hex(ord(c2))) for c2 in repl
       if not (0x0531 <= ord(c2) <= 0x058F)
       and ord(c2) > 127]
if bad:
    print("WARNING - non-Armenian non-ASCII chars:", bad[:10])
else:
    print("OK - all non-ASCII characters are proper Armenian Unicode")

# Write
new_content = content[:arm_start] + new_hy + content[arm_end:]
with open('src/data/translations.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)
print("File written.")
