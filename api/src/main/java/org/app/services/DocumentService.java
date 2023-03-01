package org.app.services;

import lombok.Getter;
import lombok.Setter;
import org.apache.poi.xwpf.usermodel.*;
import org.app.config.Config;
import org.app.responsepojo.ProjectsPojo;
import org.app.responsepojo.SkillsPojo;
import org.app.utils.FileUtils;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTPPr;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTRow;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTSpacing;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import static org.app.config.Config.*;
import static org.app.config.Config.Style.*;
import static org.app.utils.FileUtils.SLASH;

@Service
public class DocumentService {
  public static final String UNDERLINE = "_";
  @Setter
  @Getter
  private XWPFDocument document;


  public void setParagraph(String configName, String text) {
    document.getParagraphs().stream().filter(s -> s.getText().contains(getTextWithUnderline(configName))).findFirst().get()
      .getRuns().get(0).setText(text, 0);
    if (document.getParagraphs().stream().filter(s -> s.getText().contains(text)).findFirst().get()
      .getRuns().size() > 1) {
      for (int i = document.getParagraphs().stream().filter(s -> s.getText().contains(text))
        .findFirst().get().getRuns().size(); i > 0; i--) {
        document.getParagraphs().stream().filter(s -> s.getText().contains(text))
          .findFirst().get().removeRun(i);
      }
    }
  }

  public void setTable(String configName, String text) {
    int count = getParagraphTable(getTextWithUnderline(configName)).get(0).getRuns().size();
    getParagraphTable(getTextWithUnderline(configName)).get(0).getRuns().get(0).setText(text, 0);
    if (count > 1) {
      for (int i = count; i > 0; i--) {
        document.getTables().stream().filter(s -> s.getText().contains(configName)).findFirst().get()
          .getRows().stream().filter(s -> s.getTableCells().stream().anyMatch(a -> a.getParagraphs().stream()
            .anyMatch(b -> b.getRuns().stream().anyMatch(c -> c.text().contains(text))))).findFirst().get()
          .getTableCells().stream().filter(s -> s.getParagraphs().stream().anyMatch(b -> b.getRuns().stream().anyMatch(c -> c.text().contains(text)))).findFirst().get().getParagraphs().stream()
          .filter(b -> b.getRuns().stream().anyMatch(c -> c.text().contains(text))).findFirst().get().removeRun(i);
      }
    }
  }

  public void setTable(String configName, String text, XWPFTableRow row) {
    XWPFParagraph paragraph = row.getTableCells().stream().filter(a -> a.getParagraphs().stream()
        .anyMatch(b -> b.getText().contains(configName))).findFirst().get()
      .getParagraphs().stream().filter(s -> s.getText().contains(configName)).findFirst()
      .get();
    int count = paragraph.getRuns().size();
    paragraph.getRuns().get(0).setText(text, 0);
    if (count > 1) {
      for (int i = count; i > 0; i--) {
        paragraph.removeRun(i);
      }
    }
  }

  public void setTable(String text, XWPFParagraph paragraph) {
    int count = paragraph.getRuns().size();
    paragraph.getRuns().get(0).setText(text, 0);
    if (count > 1) {
      for (int i = count; i > 0; i--) {
        paragraph.removeRun(i);
      }
    }
  }

  public void setLanguage(List<LinkedHashMap<String, String>> languages, String configName) {
    XWPFParagraph oldParagraph = getTableCell(configName).getParagraphs().stream()
      .filter(s -> s.getText().contains(configName)).findFirst().get();
    languages.forEach((s) -> {
      XWPFParagraph newParagraph = createParagraph(configName, oldParagraph);
      newParagraph.createRun().setText(s.get(LANGUAGE) + " − " + s.get(LEVEL), 0);
      newParagraph.setStyle(LOWERCASE_DESCRIPTION_WITHOUT_INDENTION.getValue());
    });
    removeParagraph(getTextWithUnderline(LANGUAGE));
  }

  private XWPFParagraph createParagraph(String configName, XWPFParagraph oldParagraph) {
    getTableCell(configName).insertNewParagraph(oldParagraph.getCTP().newCursor());
    int positionNewPar = getTableCell(configName).getParagraphs().indexOf(oldParagraph) - 1;
    return getTableCell(configName).getParagraphs().get(positionNewPar);
  }

  private XWPFParagraph createParagraph(String configName, XWPFParagraph oldParagraph, XWPFTableRow row) {
    getTableCell(configName, row).insertNewParagraph(oldParagraph.getCTP().newCursor());
    int positionNewPar = getTableCell(configName, row).getParagraphs().indexOf(oldParagraph) - 1;
    return getTableCell(configName, row).getParagraphs().get(positionNewPar);
  }

  public void setForm(List<LinkedHashMap<String, String>> mainDesc) {
    XWPFParagraph oldForm = getParagraphTable(MAIN_PAGE_DESCRIPTION_FORM)
      .stream().filter(s -> s.getText().contains(MAIN_PAGE_DESCRIPTION_FORM)).findFirst().get();
    mainDesc.forEach(s -> {
      XWPFParagraph newParagraphTitle = createParagraph(MAIN_PAGE_DESCRIPTION_FORM, oldForm);
      newParagraphTitle.createRun().setText(s.get(TITLE), 0);
      newParagraphTitle.setStyle(BOLD_TITLE.getValue());

      XWPFParagraph newParagraphDesc = createParagraph(MAIN_PAGE_DESCRIPTION_FORM, oldForm);
      newParagraphDesc.createRun().setText(s.get(DESCRIPTION), 0);
      newParagraphDesc.setStyle(LOWERCASE_DESCRIPTION_WITH_INDENTION.getValue());
    });
    removeParagraph(MAIN_PAGE_DESCRIPTION_FORM);
  }

  private List<XWPFParagraph> getParagraphTable(String configName) {
    return getTableCellList(configName).stream().filter(d -> d.getParagraphs().stream()
        .anyMatch(b -> b.getText().contains(configName))).findFirst().get().getParagraphs().stream()
      .filter(f -> f.getText().contains(configName)).collect(Collectors.toList());
  }

  private List<XWPFParagraph> getParagraphTable(String configName, XWPFTableRow row) {
    return row.getTableCells().stream().filter(a -> a.getParagraphs().stream()
      .anyMatch(b -> b.getText().contains(configName))).findFirst().get().getParagraphs();
  }

  private List<XWPFTableCell> getTableCellList(String configName) {
    return getTable(configName).getRows().stream().filter(s -> s.getTableCells().stream()
      .anyMatch(a -> a.getParagraphs().stream()
        .anyMatch(b -> b.getText().contains(configName)))).findFirst().get().getTableCells();
  }

  private XWPFTable getTable(String configName) {
    return document.getTables().stream().filter(s -> s.getText().contains(configName)).findFirst().get();
  }

  private void copySpacing(XWPFParagraph paragraphOld, XWPFParagraph paragraphNew) {
    CTPPr ppr = paragraphNew.getCTP().getPPr();
    if (ppr == null) ppr = paragraphNew.getCTP().addNewPPr();
    CTSpacing spacingNew = ppr.isSetSpacing() ? ppr.getSpacing() : ppr.addNewSpacing();
    CTSpacing spacingOld = paragraphOld.getCTP().getPPr().getSpacing();
    spacingNew.setAfter(spacingOld.getAfter());
    spacingNew.setBefore(spacingOld.getBefore());
    spacingNew.setLineRule(spacingOld.getLineRule());
    spacingNew.setLine(spacingOld.getLine());
  }

  private void copyFont(XWPFParagraph paragraphOld, XWPFParagraph paragraphNew) {
    paragraphNew.getRuns().get(0).setFontFamily(paragraphOld.getRuns().get(0).getFontFamily());
    paragraphNew.getRuns().get(0).setFontSize(paragraphOld.getRuns().get(0).getFontSize());
    paragraphNew.getRuns().get(0).setColor(paragraphOld.getRuns().get(0).getColor());
    paragraphNew.getRuns().get(0).setBold(paragraphOld.getRuns().get(0).isBold());
  }

  private void removeParagraph(String configName) {
    getTableCell(configName).removeParagraph(getTableCell(configName).getParagraphs().indexOf(getParagraphTable(configName)
      .stream().filter(s -> s.getText().contains(configName)).findFirst().get()));
  }

  private void removeRow(String configName) {
    getTable(configName).removeRow(getTable(configName).getRows().indexOf(getTableRow(configName)));
  }

  private void removeParagraph(String configName, XWPFTableRow row) {
    getTableCell(configName, row).removeParagraph(getTableCell(configName, row).getParagraphs()
      .indexOf(getParagraphTable(configName, row)
        .stream().filter(s -> s.getText().contains(configName)).findFirst().get()));
  }

  private XWPFTableCell getTableCell(String configName) {
    return getTableCellList(configName).stream().filter(s -> s.getText().contains(configName)).findFirst().get();
  }

  private XWPFTableCell getTableCell(String configName, XWPFTableRow row) {
    return row.getTableCells().stream().filter(s -> s.getText().contains(configName)).findFirst().get();
  }

  private void copyStyle(XWPFParagraph paragraphOld, XWPFParagraph paragraphNew) {
    copyFont(paragraphOld, paragraphNew);
    copySpacing(paragraphOld, paragraphNew);
  }

  private String getTextWithUnderline(String text) {
    return UNDERLINE + text;
  }

  private XWPFTableRow getTableRow(String configName) {
    return getTable(configName).getRows().stream().filter(s -> s.getTableCells()
      .stream().anyMatch(a -> a.getText().contains(configName))).findFirst().get();
  }

  public void addProject(ProjectsPojo project) {
    XWPFTableRow row = new XWPFTableRow((CTRow) getTableRow(getTextWithUnderline(PROJECT_TITLE)).getCtRow().copy(),
      getTable(getTextWithUnderline(PROJECT_TITLE)));
    XWPFTableRow rowEmpty = new XWPFTableRow((CTRow) getTable(getTextWithUnderline(PROJECT_TITLE))
      .getRow(getTable(getTextWithUnderline(PROJECT_TITLE)).getRows()
        .indexOf(getTableRow(getTextWithUnderline(PROJECT_TITLE))) + 1).getCtRow().copy(),
      getTable(getTextWithUnderline(PROJECT_TITLE)));
    setTable(getTextWithUnderline(PROJECT_TITLE), project.getTitle(), row);
    setTable(getTextWithUnderline(PROJECT_DESCRIPTION), project.getDescription(), row);
    setTable(getTextWithUnderline(PROJECT_ROLE), project.getRole(), row);
    setTable(getTextWithUnderline(PROJECT_PERIOD), project.getPeriod(), row);
    setTable(getTextWithUnderline(PROJECT_TOOLS), project.getTools(), row);
    XWPFParagraph oldResponsibility = getParagraphTable(PROJECT_RESPONSIBILITIES, row)
      .stream().filter(s -> s.getText().contains(PROJECT_RESPONSIBILITIES)).findFirst().get();
    Arrays.asList(project.getResponsibilities()).forEach(responsibility -> {
      XWPFParagraph newParagraphTitle = createParagraph(PROJECT_RESPONSIBILITIES, oldResponsibility, row);
      newParagraphTitle.createRun().setText(responsibility, 0);
      newParagraphTitle.setStyle(LOWERCASE_DESCRIPTION_ENUMERATION_WITH_RED_DOT.getValue());
    });
    removeParagraph(PROJECT_RESPONSIBILITIES, row);
    getTable(getTextWithUnderline(PROJECT_TITLE)).addRow(row);
    getTable(getTextWithUnderline(PROJECT_TITLE)).addRow(rowEmpty);
  }

  public void addSkill(List<SkillsPojo> skills) {
    if (skills.size() > 1) {
      for (int i = 0; i < skills.size(); i++) {
        if (i == 0) {
          XWPFTableRow row = getTableRow(getTextWithUnderline(SKILL_FIELD_TOP));
          addRowSkill(skills, i, SKILL_FIELD_TOP, row);
        } else {
          XWPFTableRow row = new XWPFTableRow((CTRow) getTableRow(getTextWithUnderline(SKILL_FIELD_FOR_ADDING)).getCtRow().copy(),
            getTable(getTextWithUnderline(SKILL_FIELD_FOR_ADDING)));
          addRowSkill(skills, i, SKILL_FIELD_FOR_ADDING, row);
          getTable(getTextWithUnderline(SKILL_FIELD_FOR_ADDING)).addRow(row);
        }
      }
      removeRow(SKILL_FIELD_FOR_ADDING);
    } else if (skills.size() == 1) {
      XWPFTableRow row = getTableRow(getTextWithUnderline(SKILL_FIELD_TOP));
      addRowSkill(skills, 0, SKILL_FIELD_TOP, row);
      removeRow(SKILL_FIELD_FOR_ADDING);
    } else {
      throw new NoSuchElementException("Skills couldn't have 0 size");
    }
  }

  private void addRowSkill(List<SkillsPojo> skills, int numberSkill, String configName, XWPFTableRow row) {
    setTable(configName, skills.get(numberSkill).getName(), row);
    skills.get(numberSkill).getTools().forEach(skill -> {
      addParagraphToRow(SKILL_TOOL, row, skill.getName(), LOWERCASE_SKILL_BOLD);
      addParagraphToRow(EXPERIENCE_YEAR, row, skill.getExperience(), LOWERCASE_SKILL_YEAR);
      addParagraphToRow(LAST_USED, row, skill.getLastUsed(), LOWERCASE_SKILL_YEAR);

    });
    removeParagraph(SKILL_TOOL, row);
    removeParagraph(EXPERIENCE_YEAR, row);
    removeParagraph(LAST_USED, row);
  }

  private void addParagraphToRow(String configName, XWPFTableRow row, String text, Style style) {
    XWPFParagraph oldParagraph = getParagraphTable(configName, row)
      .stream().filter(s -> s.getText().contains(configName)).findFirst().get();
    XWPFParagraph newParagraphTitle = createParagraph(configName, oldParagraph, row);
    newParagraphTitle.createRun().setText(text, 0);
    newParagraphTitle.setStyle(style.getValue());
  }

  public Path saveZip(String name, String path) {
    getTable(getTextWithUnderline(PROJECT_TITLE)).removeRow(
      getTable(getTextWithUnderline(PROJECT_TITLE)).getRows()
        .indexOf(getTableRow(getTextWithUnderline(PROJECT_TITLE))));
    String fileName = CV_NAME + UNDERLINE + name + ZIP;
    String filePath = path + SLASH + fileName;
    File file = new File(filePath);
    try {
      FileUtils.deleteFiles(path);
      document.write(new FileOutputStream(filePath));
      document.close();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    return file.getAbsoluteFile().toPath();
  }

  public ResponseEntity<Resource> downloadCV(String fileName, File file, String documentPath) {
    HttpHeaders header = new HttpHeaders();
    header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);
    header.add("Cache-Control", "no-cache, no-store, must-revalidate");
    header.add("Pragma", "no-cache");
    header.add("Expires", "0");

    Path path = Paths.get(file.getAbsolutePath());
    ByteArrayResource resource;
    try {
      resource = new ByteArrayResource(Files.readAllBytes(path));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    document = FileUtils.receiveDocument(documentPath);
    return ResponseEntity.ok()
      .headers(header)
      .contentLength(file.length())
      .contentType(MediaType.parseMediaType("application/octet-stream"))
      .body(resource);
  }
}
