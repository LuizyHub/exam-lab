package capstone.examlab.exams.dto;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;

@Data
@Builder
public class Question {
    private String id;
    private String type;
    private String question;
    private ArrayList<String> questionImageUrls;
    private ArrayList<String> questionImageDescriptions;
    private ArrayList<String> options;
    private ArrayList<Integer> answers;
    private String commentary;
    private ArrayList<String> commentaryImageUrls;
    private ArrayList<String> commentaryImageDescriptions;
    private ArrayList<String> tags;

    public Question() {
    }

    public Question(String id, String type, String question, ArrayList<String> questionImageUrls, ArrayList<String> questionImageDescriptions, ArrayList<String> options, ArrayList<Integer> answers, String commentary, ArrayList<String> commentaryImageUrls, ArrayList<String> commentaryImageDescriptions, ArrayList<String> tags) {
        this.id = id;
        this.type = type;
        this.question = question;
        this.questionImageUrls = questionImageUrls;
        this.questionImageDescriptions = questionImageDescriptions;
        this.options = options;
        this.answers = answers;
        this.commentary = commentary;
        this.commentaryImageUrls = commentaryImageUrls;
        this.commentaryImageDescriptions = commentaryImageDescriptions;
        this.tags = tags;
    }
}
