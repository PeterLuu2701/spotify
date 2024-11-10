import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { Upload } from '@aws-sdk/lib-storage';

@Injectable()
export class AwsS3Service {
  private s3 = new S3Client({ region: 'us-east-1' });

  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!file || !file.buffer) {
      throw new Error('File buffer is missing');
    }

    const fileKey = `songs/${uuidv4()}-${file.originalname}`;

    try {
      const upload = new Upload({
        client: this.s3,
        params: {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: fileKey,
          Body: file.buffer, 
          ContentType: file.mimetype,
        },
      });

      await upload.done();

      return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    } catch (error) {
      console.error('Error uploading to S3:', error);
      throw new Error('Failed to upload file to S3');
    }
  }
}
