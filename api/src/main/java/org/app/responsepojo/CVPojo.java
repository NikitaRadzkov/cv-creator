package org.app.responsepojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CVPojo {
  private String name;
  private String surname;
  private String profession;
  private String education;
  private List<LinkedHashMap<String, String>> languages;
  private String[] domains;
  private String mainPageTitle;
  private String mainPageExperience;
  private List<LinkedHashMap<String, String>> mainDescriptions;
  private List<ProjectsPojo> projects;
  private List<SkillsPojo> skills;

  public List<CVPojo> getInstance(Object[] objects) {
    ObjectMapper mapper = new ObjectMapper();
    return Arrays.stream(objects)
      .map(object -> mapper.convertValue(object, CVPojo.class))
      .collect(Collectors.toList());
  }

  public CVPojo getInstance(Object response) {
    return new ObjectMapper().convertValue(response, CVPojo.class);
  }

  public static String formatValue(String[] value) {
    return Arrays.toString(value).replaceAll("[\\[\\]\"]", StringUtils.EMPTY);
  }
}
