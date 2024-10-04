// back/src/modules/puppeteer/puppeteer.service.ts

import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PuppeteerService {
  async generatePdf(htmlContent: string) {
    // Lanza un navegador de Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Establece el contenido HTML
    await page.setContent(htmlContent, {
      waitUntil: 'domcontentloaded',
    });

    // Genera el PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();
    return pdfBuffer;
  }
}
