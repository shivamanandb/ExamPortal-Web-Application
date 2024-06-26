    package com.exam.examserver.repository;

    import java.util.Set;

    import org.springframework.data.jpa.repository.JpaRepository;

    import com.exam.examserver.models.exam.Question;
    import com.exam.examserver.models.exam.Quiz;

    public interface QuestionRepository extends JpaRepository<Question, Long> {

        Set<Question> findByQuiz(Quiz quiz);
        
    }
