from pathlib import Path
from pypdf import PdfReader

pdfs = [
    Path('public/cv/FULL-STACK-WEB-DEVELOPMENT-ENGLISH-CV.pdf'),
    Path('public/cv/FULL-STACK-WEB-DEVELOPMENT-HEBREW-CV.pdf'),
]

out_dir = Path('public/cv/_extracted')
out_dir.mkdir(parents=True, exist_ok=True)

for pdf in pdfs:
    reader = PdfReader(str(pdf))
    pages = []
    for i, page in enumerate(reader.pages, start=1):
        text = page.extract_text() or ''
        pages.append(f"\n\n--- page {i} ---\n\n{text}")
    out = out_dir / (pdf.stem + '.txt')
    out.write_text('\n'.join(pages), encoding='utf-8')
    print(pdf.name, '->', out.as_posix(), 'pages=', len(reader.pages), 'chars=', out.stat().st_size)
