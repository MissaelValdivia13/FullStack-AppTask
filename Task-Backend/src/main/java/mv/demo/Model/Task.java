package mv.demo.Model;

import jakarta.persistence.*;
import lombok.*;
import lombok.NoArgsConstructor;

@Data
@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private boolean completed;
}

