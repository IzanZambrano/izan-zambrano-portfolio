# Genera public/cv/cv-es.pdf y cv-en.pdf.
# Uso: python3 scripts/generar_cv.py public/img/foto.jpg public/cv
# Requiere: pip install reportlab pillow  (y fuentes DejaVu)
import sys
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, Frame, Spacer, KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from PIL import Image, ImageDraw

D='/usr/share/fonts/truetype/dejavu/'
pdfmetrics.registerFont(TTFont('S', D+'DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('SB', D+'DejaVuSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('SO', D+'DejaVuSans-Oblique.ttf'))
pdfmetrics.registerFont(TTFont('M', D+'DejaVuSansMono.ttf'))
pdfmetrics.registerFont(TTFont('MB', D+'DejaVuSansMono-Bold.ttf'))
from reportlab.lib.fonts import addMapping
addMapping('S',0,0,'S'); addMapping('S',1,0,'SB'); addMapping('S',0,1,'SO'); addMapping('S',1,1,'SB')

VERDE=HexColor('#1a7f37'); OSCURO=HexColor('#0d1117'); TXT=HexColor('#1f2328'); MUTED=HexColor('#59636e')
SIDE_BG=HexColor('#0d1117'); SIDE_TXT=HexColor('#e6edf3'); SIDE_MUTED=HexColor('#8b949e'); SIDE_VERDE=HexColor('#3fb950')

T={
'es':dict(
 rol='Estudiante de ASIR · Encargado de IT',
 contacto='CONTACTO', idiomas='IDIOMAS', habilidades='HABILIDADES',
 perfil='PERFIL', exp='EXPERIENCIA', form='FORMACIÓN',
 loc='Mataró (Barcelona)',
 perfil_txt=[
  'Estudiante de segundo curso del CFGS en Administración de Sistemas Informáticos en Red (ASIR), con una gran pasión por la informática, la administración de sistemas y las infraestructuras de red.',
  'Conocimientos prácticos en entornos Linux, administración de servidores, servicios de red, virtualización y automatización con Bash. Especialmente interesado en la ciberseguridad y la administración de infraestructuras IT. Mi objetivo es especializarme en sistemas, redes y ciberseguridad.'],
 exp_items=[
  ('Encargado del departamento de IT','ESGroup','Sept. 2026 – actualidad',['Tareas del entorno tecnológico de la empresa y gestión de sus sistemas informáticos.']),
  ("Equipo de restaurante","McDonald's",'2026',[]),
  ('Promotor de ventas · campaña Brother','MediaMarkt','2025 – 2026',[]),
 ],
 form_items=[
  ('CFGS Administración de Sistemas Informáticos en Red (ASIR)','Institut Thos i Codina · Mataró','2025 – 2027 (en curso)',['Sistemas operativos, redes y servicios de red, bases de datos, virtualización, seguridad informática y automatización.']),
  ('Bachillerato Tecnológico','Institut Miquel Biada · Mataró','2023 – 2025',['Trabajo de investigación sobre ciberseguridad: cifrado de contraseñas y mensajes.']),
 ],
 idi=[('Castellano','Nativo'),('Catalán','Nativo'),('Inglés','B2')],
 skills=[
  ('Sistemas','Debian, Ubuntu, Fedora, Manjaro, Windows 11'),
  ('Administración','Usuarios, grupos, permisos, procesos y servicios; servidores Linux'),
  ('Redes','TCP/IP, DNS (BIND9), DHCP, VLANs, direccionamiento IP'),
  ('Servicios','Apache, Nginx, MySQL, MariaDB'),
  ('Virtualización','VirtualBox, Proxmox, Docker, Docker Compose'),
  ('Automatización','Bash, Git, GitHub'),
  ('Desarrollo','HTML, CSS, PHP, JavaScript, Python, Java, C++'),
  ('Ofimática','Microsoft Office, LibreOffice'),
 ],
 proyecto='PROYECTO DESTACADO',
 proyecto_txt='<b>Portfolio autodesplegado</b> — web propia con Astro, servida con Caddy en Docker en un VPS y desplegada con GitHub Actions (CI/CD). Bilingüe e integrada con la API de GitHub.',
),
'en':dict(
 rol='ASIR Student · Head of IT',
 contacto='CONTACT', idiomas='LANGUAGES', habilidades='SKILLS',
 perfil='PROFILE', exp='EXPERIENCE', form='EDUCATION',
 loc='Mataró (Barcelona), Spain',
 perfil_txt=[
  'Second-year student of the Higher Vocational Diploma in Network and Systems Administration (ASIR), with a strong passion for IT, system administration and network infrastructure.',
  'Hands-on experience with Linux environments, server administration, network services, virtualisation and Bash automation. Particularly interested in cybersecurity and IT infrastructure management. My goal is to specialise in systems, networking and cybersecurity.'],
 exp_items=[
  ('Head of IT department','ESGroup','Sep 2026 – present',["Work across the company's technology environment and management of its IT systems."]),
  ('Crew member',"McDonald's",'2026',[]),
  ('Sales promoter · Brother campaign','MediaMarkt','2025 – 2026',[]),
 ],
 form_items=[
  ('Higher Vocational Diploma in Network and Systems Administration (ASIR)','Institut Thos i Codina · Mataró','2025 – 2027 (in progress)',['Operating systems, networking and network services, databases, virtualisation, IT security and automation.']),
  ('Baccalaureate in Science and Technology','Institut Miquel Biada · Mataró','2023 – 2025',['Research project on cybersecurity: password and message encryption.']),
 ],
 idi=[('Spanish','Native'),('Catalan','Native'),('English','B2')],
 skills=[
  ('Systems','Debian, Ubuntu, Fedora, Manjaro, Windows 11'),
  ('Administration','Users, groups, permissions, processes and services; Linux servers'),
  ('Networking','TCP/IP, DNS (BIND9), DHCP, VLANs, IP addressing'),
  ('Services','Apache, Nginx, MySQL, MariaDB'),
  ('Virtualisation','VirtualBox, Proxmox, Docker, Docker Compose'),
  ('Automation','Bash, Git, GitHub'),
  ('Development','HTML, CSS, PHP, JavaScript, Python, Java, C++'),
  ('Office','Microsoft Office, LibreOffice'),
 ],
 proyecto='FEATURED PROJECT',
 proyecto_txt='<b>Self-hosted portfolio</b> — personal website built with Astro, served by Caddy in Docker on a VPS and deployed with GitHub Actions (CI/CD). Bilingual and integrated with the GitHub API.',
),
}

def circ_photo(src, out):
    im=Image.open(src).convert('RGB'); s=min(im.size); im=im.crop((0,0,s,s)).resize((600,600),Image.LANCZOS)
    m=Image.new('L',(600,600),0); ImageDraw.Draw(m).ellipse((0,0,600,600),fill=255)
    o=Image.new('RGBA',(600,600)); o.paste(im,(0,0),m); o.save(out)

def build(lang, foto, out):
    t=T[lang]; W,H=A4; c=canvas.Canvas(out,pagesize=A4)
    c.setTitle(f'CV Izan Zambrano ({lang.upper()})'); c.setAuthor('Izan Zambrano')
    SW=190  # ancho barra lateral
    c.setFillColor(SIDE_BG); c.rect(0,0,SW,H,fill=1,stroke=0)
    # foto
    c.drawImage(ImageReader(foto),(SW-120)/2,H-160,120,120,mask='auto')
    c.setStrokeColor(SIDE_VERDE); c.setLineWidth(2); c.circle(SW/2,H-100,61,stroke=1,fill=0)

    side_h=ParagraphStyle('sh',fontName='MB',fontSize=10,textColor=SIDE_VERDE,spaceBefore=14,spaceAfter=6)
    side_p=ParagraphStyle('sp',fontName='S',fontSize=8.6,leading=12,textColor=SIDE_TXT)
    side_k=ParagraphStyle('sk',fontName='SB',fontSize=8.6,leading=11,textColor=SIDE_TXT,spaceBefore=5)
    side_v=ParagraphStyle('sv',fontName='S',fontSize=8.2,leading=11,textColor=SIDE_MUTED)
    side=[Paragraph('$ '+t['contacto'].lower(),side_h),
          Paragraph('izdazaan@gmail.com',side_p),
          Paragraph('github.com/IzanZambrano',side_p),
          Paragraph(t['loc'],side_p),
          Paragraph('$ '+t['idiomas'].lower(),side_h)]
    for k,v in t['idi']: side.append(Paragraph(f'<b>{k}</b> <font color="#8b949e">· {v}</font>',side_p))
    side.append(Paragraph('$ '+t['habilidades'].lower(),side_h))
    for k,v in t['skills']: side+= [Paragraph(k,side_k),Paragraph(v,side_v)]
    Frame(16,20,SW-32,H-190,showBoundary=0,leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0).addFromList(side,c)

    # cabecera
    X=SW+30; MW=W-X-32
    c.setFillColor(OSCURO); c.setFont('MB',28); c.drawString(X,H-75,'Izan Zambrano')
    c.setFillColor(VERDE); c.setFont('M',12); c.drawString(X,H-97,t['rol'])
    c.setStrokeColor(HexColor('#d0d7de')); c.setLineWidth(1); c.line(X,H-115,W-32,H-115)

    h=ParagraphStyle('h',fontName='MB',fontSize=11,textColor=VERDE,spaceBefore=12,spaceAfter=6)
    p=ParagraphStyle('p',fontName='S',fontSize=9.2,leading=13.2,textColor=TXT,spaceAfter=5,alignment=4)
    it=ParagraphStyle('it',fontName='SB',fontSize=9.8,leading=13,textColor=OSCURO)
    meta=ParagraphStyle('m',fontName='S',fontSize=8.6,leading=12,textColor=MUTED)
    det=ParagraphStyle('d',fontName='S',fontSize=8.8,leading=12.4,textColor=TXT,spaceAfter=7)
    main=[Paragraph('> '+t['perfil'],h)]+[Paragraph(x,p) for x in t['perfil_txt']]
    def bloque(items):
        r=[]
        for a,b,per,ds in items:
            g=[Paragraph(a,it),Paragraph(f'{b} <font color="#1a7f37">·</font> {per}',meta)]
            g+= [Paragraph(d,det) for d in ds] or [Spacer(1,7)]
            r.extend(g)
        return r
    main+=[Paragraph('> '+t['exp'],h)]+bloque(t['exp_items'])
    main+=[Paragraph('> '+t['form'],h)]+bloque(t['form_items'])
    main+=[Paragraph('> '+t['proyecto'],h),Paragraph(t['proyecto_txt'],p)]
    f=Frame(X,30,MW,H-160,showBoundary=0,leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0)
    f.addFromList(main,c)
    if main: print('WARNING overflow', lang, len(main))
    c.save()

circ_photo(sys.argv[1],'/tmp/cvgen/foto_c.png')
for lang in ('es','en'):
    build(lang,'/tmp/cvgen/foto_c.png',f'{sys.argv[2]}/cv-{lang}.pdf')
print('ok')
