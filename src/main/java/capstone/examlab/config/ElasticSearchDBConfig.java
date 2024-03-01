package capstone.examlab.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;

@Configuration
public class ElasticSearchDBConfig extends ElasticsearchConfiguration {
    @Value("${spring.elasticsearch.rest.username}")
    private String elasticsearchUsername;

    @Value("${spring.elasticsearch.rest.password}")
    private String elasticsearchPassword;

    @Value("${spring.elasticsearch.rest.uris}")
    private String elasticsearchUrl;

    @Override
    public ClientConfiguration clientConfiguration() {
        return ClientConfiguration.builder()
                .connectedTo(elasticsearchUrl)
                .withBasicAuth(elasticsearchUsername, elasticsearchPassword)
                .build();
    }
}
