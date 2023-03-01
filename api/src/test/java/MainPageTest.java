import com.fasterxml.jackson.databind.ObjectMapper;
import config.Config;
import org.apache.commons.lang3.StringUtils;
import org.app.responsepojo.CVPojo;
import org.app.utils.FileUtils;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Objects;

import static config.Config.*;
import static org.app.services.DocumentService.UNDERLINE;
import static org.app.utils.FileUtils.SLASH;

public class MainPageTest extends BaseTest {
  private static final String PATH_JSON = "example.json";
  private CVPojo cv;

  @Before
  public void before() {
    documentService.setDocument(FileUtils.receiveDocument(Config.PATTERN_CS));
  }

  @Test
  public void verifyManuallyCVTest() {
    try {
      cv = new CVPojo().getInstance(new ObjectMapper().readValue(new File(Objects.requireNonNull(MainPageTest.class
        .getClassLoader().getResource(PATH_JSON)).getPath()), HashMap.class));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    documentService.setParagraph(Config.NAME, cv.getName() + StringUtils.SPACE + cv.getSurname().charAt(0) + ".");
    documentService.setParagraph(Config.PROFESSION, cv.getProfession().toUpperCase());
    documentService.setTable(Config.EDUCATION, cv.getEducation());
    documentService.setLanguage(cv.getLanguages(), UNDERLINE + LANGUAGE);
    documentService.setTable(DOMAIN, CVPojo.formatValue(cv.getDomains()));
    documentService.setTable(MAIN_PAGE_TITLE, cv.getMainPageTitle());
    documentService.setTable(MAIN_PAGE_EXPERIENCE, cv.getMainPageExperience());
    documentService.setForm(cv.getMainDescriptions());
    cv.getProjects().forEach(project -> documentService.addProject(project));
    documentService.addSkill(cv.getSkills());
    String fileName = cv.getName() + UNDERLINE + cv.getSurname();
    Path filePath = documentService.saveZip(fileName, DOWNLOAD_PATH);
    String CV_fileName = Config.CV_NAME + UNDERLINE + cv.getName() + UNDERLINE + cv.getSurname();
    FileUtils.deleteFiles(UNPACKING_PATH);
    FileUtils.addFileToDocx(UNPACKING_PATH + WORD_MEDIA_FOLDER + PHOTO,
      DOWNLOAD_PATH + SLASH + CV_fileName + ZIP,
      PHOTO_PATH + SLASH + CV_fileName + PNG,
      CV_fileName, DOWNLOAD_PATH + SLASH, UNPACKING_PATH + SLASH);
    FileUtils.deleteFile(filePath);
    FileUtils.saveCVToJson(cv, fileName, JSON_FILES_PATH);
    documentService.downloadCV(fileName + DOCX, new File(DOWNLOAD_PATH + SLASH + CV_fileName + DOCX), Config.PATTERN_CS);
  }
}
