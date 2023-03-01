package org.app.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import net.lingala.zip4j.ZipFile;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.app.responsepojo.CVPojo;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static org.app.config.Config.*;

public class FileUtils {

  public final static String SLASH = "/";

  public static List<Path> getListFiles(String dir) {
    List<Path> result;
    try {
      Path path = Paths.get(dir);
      try (Stream<Path> walk = Files.walk(path)) {
        result = walk.filter(Files::isRegularFile)
          .collect(Collectors.toList());
      }
      return result;
    } catch (IOException e) {
      e.printStackTrace();
    }
    return null;
  }

  public static void deleteFiles(String dir, String startWith, String extension) {
    List<Path> files = getListFiles(dir);
    files.forEach(s -> {
      if (s.toFile().getName().startsWith(startWith) && s.toFile().getName().endsWith(extension)) {
        FileUtils.deleteFile(s);
      }
    });
  }

  public static void deleteFiles(String dir) {
    List<Path> files = getListFiles(dir);
    if (files.size() != 0) files.forEach(FileUtils::deleteFile);
  }

  public static void deleteFile(Path file) {
    try {
      Files.delete(file);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public static XWPFDocument receiveDocument(String filePath) {
    XWPFDocument doc = null;
    File docxFile = new File(filePath);
    try {
      InputStream is = Files.newInputStream(Paths.get(docxFile.getPath()));
      doc = new XWPFDocument(OPCPackage.open(is));
    } catch (Exception ex) {
      ex.printStackTrace();
    }
    return doc;
  }

  public static String getABSPath() {
    String path = System.getProperty("user.dir") + "/api/";
    if (path.contains("\\api/api/"))
      return System.getProperty("user.dir") + SLASH;
    else return path;
  }

  public static void addFileToDocx(String destination, String packingPathFile, String addingPathFile, String newFileName,
                                   String downloadPath, String unpackingPath) {
    try {
      ZipFile zipFile = new ZipFile(packingPathFile);
      zipFile.extractAll(unpackingPath);
      try {
        Files.copy(new File(addingPathFile).toPath(), new File(destination).toPath(), REPLACE_EXISTING);
      } catch (IOException e) {
        e.printStackTrace();
      }
      ZipFile zipFileNew = new ZipFile(downloadPath + newFileName + DOCX);
      zipFileNew.addFile(new File(unpackingPath + "[Content_Types].xml"));
      zipFileNew.addFolder(new File(unpackingPath + "word"));
      zipFileNew.addFolder(new File(unpackingPath + "docProps"));
      zipFileNew.addFolder(new File(unpackingPath + "_rels"));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  public static void saveCVToJson(CVPojo cv, String fileName, String jsonPath) {
    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
    try {
      String json = ow.writeValueAsString(cv);
      BufferedWriter writer = new BufferedWriter(new FileWriter(jsonPath + fileName + JSON));
      writer.write(json);
      writer.close();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}
