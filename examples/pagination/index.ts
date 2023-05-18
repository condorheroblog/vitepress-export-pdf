import { readFileSync, writeFileSync } from "node:fs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const existingPdfBytes = readFileSync("./vitepress.dev.pdf");
const pdfDoc = await PDFDocument.load(existingPdfBytes);
const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

const pages = pdfDoc.getPages();
const totalPages = pages.length;

for (let i = 0; i < totalPages; i++) {
	const page = pages[i];
	const { width } = page.getSize();
	const text = `${i + 1} / ${totalPages}`;
	const fontSize = 9;
	const textX = width - 50;
	const textY = fontSize;
	page.drawText(text, {
		x: textX,
		y: textY + 5,
		size: fontSize,
		font: helveticaFont,
		color: rgb(127 / 256, 127 / 256, 127 / 256),
	});
}

const pdfBytes = await pdfDoc.save();
writeFileSync("pagination.pdf", pdfBytes);
