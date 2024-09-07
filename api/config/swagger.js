module.exports = {
    openapi: '3.0.0',
    info: {
      title: 'URL Compressor API',
      version: '1.0.0',
      description: 'API for downloading and compressing files from URLs'
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server'
      }
    ],
    paths: {
      '/compress': {
        post: {
          summary: 'Start a compression task',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    urls: {
                      oneOf: [
                        { type: 'string' },
                        { type: 'array', items: { type: 'string' } }
                      ]
                    }
                  }
                }
              }
            }
          },
          responses: {
            '202': {
              description: 'Accepted',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      task_id: { type: 'string' },
                      message: { type: 'string' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      // Add other endpoints here
    }
  };