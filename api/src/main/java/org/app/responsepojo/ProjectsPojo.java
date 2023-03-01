package org.app.responsepojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProjectsPojo {
  private String title;
  private String description;
  private String role;
  private String period;
  private String[] responsibilities;
  private String tools;
}
