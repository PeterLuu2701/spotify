import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger('search-service');

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async onModuleInit() {
    const index = 'songs';
    const exists = await this.elasticsearchService.indices.exists({ index });
    if (!exists) {
      await this.elasticsearchService.indices.create({
        index,
        body: {
          mappings: {
            properties: {
              song_name: { type: 'text' },
              description: { type: 'text' },
              album_id: { type: 'integer' },
              duration: { type: 'keyword' },
              release_date: { type: 'date' },
              genre_id: { type: 'integer' },
              image: { type: 'text' },
              file_url: { type: 'text' },
            },
          },
        },
      });
      console.log(`Index '${index}' created successfully`);
    }
  }

  async indexDocument(index: string, id: string, body: any) {
    try {
      return await this.elasticsearchService.index({
        index,
        id,
        body,
      });
    } catch (error) {
      this.logger.error(`Error indexing document: ${error.message}`);
      throw error;
    }
  }

  async search(index: string, query: any) {
    try {
      const response = await this.elasticsearchService.search({
        index,
        body: query,
      });
      return response.hits.hits;
    } catch (error) {
      this.logger.error(`Error searching index ${index}: ${error.message}`);
      throw error;
    }
  }
}
