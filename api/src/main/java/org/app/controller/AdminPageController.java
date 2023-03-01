package org.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import static org.app.config.Config.ADMIN_PAGE_ENDPOINT;

@Controller
public class AdminPageController {

  @GetMapping(value = ADMIN_PAGE_ENDPOINT)
  public String openMainPage() {
    return "mainPage";
  }
}
