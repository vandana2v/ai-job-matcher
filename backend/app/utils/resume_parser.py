from PyPDF2 import PdfReader
from fastapi import UploadFile
import io


def extract_text_from_pdf(file: UploadFile) -> str:
    content = file.file.read()
    reader = PdfReader(io.BytesIO(content))
    text = []
    for page in reader.pages:
        page_text = page.extract_text() or ""
        text.append(page_text)
    return "\n".join(text).strip()