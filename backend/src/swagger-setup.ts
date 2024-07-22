import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { writeFile } from 'fs';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('API')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  const path = `${process.cwd()}/swagger.json`;
  writeFile(path, JSON.stringify(document), (err) => {
    if (err) console.log(err);
    else {
      console.log('File swagger.JSON created successfully\n');
    }
  });
}
