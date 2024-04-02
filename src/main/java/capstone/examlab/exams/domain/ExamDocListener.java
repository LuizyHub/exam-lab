package capstone.examlab.exams.domain;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

@Slf4j
@Profile("mongo")
@Component
public class ExamDocListener extends AbstractMongoEventListener<ExamDoc> {

    @Override
    public void onBeforeConvert(BeforeConvertEvent<ExamDoc> event) {
        log.error("onBeforeConvert");
        ExamDoc examDoc = event.getSource();
        if (examDoc.getExamId() == null) {
            examDoc.setExamId(ExamDoc.sequence++);
        }
    }
}
