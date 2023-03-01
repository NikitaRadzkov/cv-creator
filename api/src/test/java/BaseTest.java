import org.app.services.DocumentService;
import org.junit.Before;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public abstract class BaseTest {
  DocumentService documentService;

  @Before
  public void beforeTest() {
    createInstances();
  }

  private void createInstances() {
    documentService = new DocumentService();
  }
}
