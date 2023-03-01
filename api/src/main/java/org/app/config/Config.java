package org.app.config;

import lombok.Getter;

import static org.app.utils.FileUtils.SLASH;
import static org.app.utils.OSValidateUtil.isUnix;
import static org.app.utils.OSValidateUtil.isWindows;

public class Config {
  public final static String CV_NAME = "CV";
  public final static String DOCX = ".docx";
  public final static String ZIP = ".zip";
  public final static String PNG = ".png";
  public final static String JSON = ".json";
  private final static String LOCAL_PATH = getPathSystem();
  public final static String PATTERN_CS = LOCAL_PATH + "pattern" + DOCX;
  public final static String DOWNLOAD_PATH = LOCAL_PATH + "download/";
  public final static String UNPACKING_PATH = LOCAL_PATH + "unpacking/";
  public final static String PHOTO_PATH = LOCAL_PATH + "photo/";
  public final static String JSON_FILES_PATH = LOCAL_PATH + "jsonStore/";
  public final static String WORD_MEDIA_FOLDER = "/word/media/";
  public final static String PHOTO = "image1.png";

  public static final String NAME = "name";
  public static final String PROFESSION = "profession";
  public static final String EDUCATION = "education";
  public static final String LANGUAGE = "language";
  public static final String LEVEL = "level";
  public static final String DOMAIN = "domain";
  public static final String MAIN_PAGE_TITLE = "MainPageTitle";
  public static final String MAIN_PAGE_EXPERIENCE = "MainPageExperience";
  public static final String MAIN_PAGE_DESCRIPTION_FORM = "descForm";
  public static final String TITLE = "title";
  public static final String DESCRIPTION = "description";
  public static final String PROJECT_TITLE = "projectName";
  public static final String PROJECT_DESCRIPTION = "projectDescription";
  public static final String PROJECT_ROLE = "role";
  public static final String PROJECT_PERIOD = "period";
  public static final String PROJECT_RESPONSIBILITIES = "responsibilities";
  public static final String PROJECT_TOOLS = "tools";
  public static final String SKILL_FIELD_TOP = "skillField1";
  public static final String SKILL_FIELD_FOR_ADDING = "skillField2";
  public static final String SKILL_TOOL = "skillTool";
  public static final String EXPERIENCE_YEAR = "exYear";
  public static final String LAST_USED = "lastUsed";

  public static final String SAVE_REQUEST = "/save";
  public static final String UPLOAD_REQUEST = "/uploadPhoto";
  public static final String ADMIN_PAGE_ENDPOINT = "/adminPage";

  public static final String FILE = "file";
  public static final String RANDOM_PREFIX = "cv_";

  public enum Style {
    RED_TITLE("2"),
    BOLD_TITLE("3"),
    LOWERCASE_DESCRIPTION_WITH_INDENTION("100"),
    LOWERCASE_DESCRIPTION_WITHOUT_INDENTION("11"),
    LOWERCASE_DESCRIPTION_ENUMERATION_WITH_RED_DOT("12"),
    LOWERCASE_SKILL_BOLD("14"),
    LOWERCASE_SKILL_YEAR("15");
    @Getter
    private String value;

    Style(String value) {
      this.value = value;
    }
  }

  private static String getPathSystem() {
    String path = "";
    if (isWindows()) {
      path = System.getProperty("user.dir") + SLASH + "api/";
    } else if (isUnix()) {
      path = "/usr/local/lib/api/";
    }
    return path;
  }
}
