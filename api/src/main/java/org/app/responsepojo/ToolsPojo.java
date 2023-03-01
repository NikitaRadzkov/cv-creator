package org.app.responsepojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ToolsPojo {
  private String name;
  private String experience;
  private String lastUsed;
}
