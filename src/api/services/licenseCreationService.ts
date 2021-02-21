import BikeRiderInfo from '../types/bikeRiderInfo';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import licenseEmailingService from '../services/licenseEmailingService';

const fs = require('fs');

export default async function(bikeRider: BikeRiderInfo) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize()
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const fontSize = 15;
    page.drawText(
        "License holder: " + bikeRider.firstName + " " + bikeRider.lastName + "\n" +
        "ID: " + bikeRider.ID + "\n" +
        "email: " + bikeRider.email + "\n" +
        "phone: " + bikeRider.phone,
    {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
    });
    const pdfBytes = await pdfDoc.save();
    licenseEmailingService(pdfBytes).catch(err => console.log(err));
    return;
}