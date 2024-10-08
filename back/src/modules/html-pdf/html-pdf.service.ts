import { Injectable } from '@nestjs/common';
import * as pdf from 'html-pdf';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class HtmlPdfService {
  async generatePdf(data: any): Promise<Buffer> {
    const logoPath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'uploads',
      'favicon.jpg',
    );

    // Convertir la imagen en base64 para incrustarla en el PDF
    const logoBase64 = this.getBase64Image(logoPath);

    // Añadir el logo a la plantilla HTML
    const htmlContentWithLogo = /* html */ `
      <html>
      <head>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            font-size: 12px; /* Ajusta el tamaño exacto de la fuente */
          }
          h1 { color: #333; }
          .logo { text-align: center; margin-bottom: 20px; }
          .logo img { width: 150px; }
        </style>
      </head>
      <body>
        <div class="logo">
          <img src="data:image/png;base64,${logoBase64}" />
        </div>
        ${data.content} <!-- Contenido HTML dinámico recibido -->
      </body>
      </html>
    `;

    const options = {
      format: 'A3',
      border: {
        top: '1in',
        right: '1in',
        bottom: '1in',
        left: '1in',
      },
      // Asegurar el tamaño consistente en diferentes entornos
      dpi: 300,
      zoomFactor: '1', // Ajustar el factor de zoom
    };

    return new Promise((resolve, reject) => {
      pdf.create(htmlContentWithLogo, options).toBuffer((err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    });
  }

  // Método para convertir una imagen a base64
  private getBase64Image(imgPath: string): string {
    const image = fs.readFileSync(imgPath);
    return Buffer.from(image).toString('base64');
  }
}
