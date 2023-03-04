package org.app.controller;


import org.apache.commons.lang3.StringUtils;
import org.app.config.Config;
import org.app.responsepojo.CVPojo;
import org.app.services.DocumentService;
import org.app.utils.FileUtils;
import org.app.utils.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.Objects;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static org.app.config.Config.*;
import static org.app.config.Messages.INCORRECT_PHOTO;
import static org.app.services.DocumentService.UNDERLINE;

@Controller
public class MainPageController {
  private String photoFileName;

  @Autowired
  DocumentService documentService;

  @RequestMapping(value = "/{path:[^\\.]*}")
  public String redirect() {
      return "forward:/";
  }

  @GetMapping("/")
  public String index() {
    return "index";
  }

  @GetMapping
  public String openMainPage() {
    documentService.setDocument(FileUtils.receiveDocument(Config.PATTERN_CS));
    return "mainPage";
  }

  @RequestMapping(value = SAVE_REQUEST, method = RequestMethod.POST)
  public ResponseEntity<Resource> generateCV(@RequestBody Map<String, Object> payload) {
    CVPojo cv = new CVPojo().getInstance(payload);
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
      DOWNLOAD_PATH + CV_fileName + ZIP,
      PHOTO_PATH + photoFileName,
      CV_fileName, DOWNLOAD_PATH, UNPACKING_PATH);
    FileUtils.deleteFile(filePath);
    FileUtils.saveCVToJson(cv, fileName, JSON_FILES_PATH);
    return documentService.downloadCV(fileName + DOCX, new File(DOWNLOAD_PATH + CV_fileName + DOCX), Config.PATTERN_CS);
  }

  @RequestMapping(value = UPLOAD_REQUEST, method = RequestMethod.POST)
  public ResponseEntity<String> uploadFile(@RequestParam(FILE) MultipartFile file) {
    try {
      if (!Objects.equals(file.getContentType(), MediaType.IMAGE_PNG_VALUE))
        return new ResponseEntity<>(INCORRECT_PHOTO, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
      FileUtils.deleteFiles(PHOTO_PATH);
      photoFileName = RandomUtils.createName() + PNG;
      Files.copy(file.getInputStream(), new File(PHOTO_PATH + photoFileName).toPath(), REPLACE_EXISTING);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
