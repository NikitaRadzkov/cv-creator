package org.app.utils;

import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

import static org.app.config.Config.RANDOM_PREFIX;
import static org.app.utils.RandomUtils.CharacterSet.ENGLISH_ALPHABET;

public class RandomUtils {
  private static Random random = new Random();
  private static final String SMALL_PREFIX = "t";

  public enum CharacterSet {
    GERMAN_UMLAUTS("ÄäÖöÜüß"),
    UMLAUTS("ÄäǞǟĄ̈ą̈B̈b̈C̈c̈ËëḦḧÏïḮḯJ̈j̈K̈k̈L̈l̈M̈m̈N̈n̈ÖöȪȫǪ̈ǫ̈ṎṏP̈p̈Q̈q̈Q̣̈q̣̈R̈r̈S̈s̈T̈ẗÜüǕǖǗǘǙǚǛǜṲṳṺṻṲ̄ṳ̄ᴞV̈v̈ẄẅẌẍŸÿZ̈z̈"),
    CHINESE_ALPHABET("请首先设置数据集项目属性。必须首先调用命令是数据集的部分时它是必需的无法为节点"),
    RUSSIAN_ALPHABET("АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"),
    ENGLISH_ALPHABET("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvqxyz"),
    NUMERIC("0123456789"),
    SPECIAL_CHARS(",./?'|][{}()-_=+*&^:;#@$%\""),
    FORBIDDEN_CHARS(" АБВГДЕЖабвгдеж"),
    ALL_CHARS(ENGLISH_ALPHABET.getCharacters() + NUMERIC.getCharacters() + SPECIAL_CHARS.getCharacters());

    private String characters;

    CharacterSet(final String characters) {
      this.characters = characters;
    }

    public String getCharacters() {
      return characters;
    }
  }

  public static <T> T getRandomListElement(List<T> listCollection) {
    if (listCollection == null || listCollection.isEmpty()) {
      throw new IllegalArgumentException("Source collection must be defined and contain at least one element");
    }
    int randomIndex = random.nextInt(listCollection.size());
    return listCollection.get(randomIndex);
  }

  private static String generateRandomString(long charactersCount, CharacterSet charactersSet) {
    if (charactersCount < 0) {
      throw new IllegalArgumentException("Characters count must be greater then 0");
    }
    if (StringUtils.isEmpty(charactersSet.getCharacters())) {
      throw new IllegalArgumentException("Characters set must be defined and contain at least one character");
    }
    List chars = Arrays.asList(charactersSet.getCharacters().split(""));
    StringBuilder stringBuilder = new StringBuilder();
    for (int i = 0; i < charactersCount; i++) {
      stringBuilder.append(getRandomListElement(chars));
    }
    return stringBuilder.toString();
  }

  public static String generateRandomStringWithPrefix(String prefix, long charactersCount, CharacterSet charactersSet) {
    return new StringBuilder()
      .append(prefix)
      .append(generateRandomString(Long.sum(-prefix.length(), charactersCount), charactersSet))
      .toString();
  }

  public static String getRandomString(long charCount, CharacterSet charactersSet, boolean usePrefix) {

    if ((charCount > RANDOM_PREFIX.length()) && usePrefix) {
      return generateRandomStringWithPrefix(RANDOM_PREFIX, charCount, charactersSet);
    } else if ((charCount > SMALL_PREFIX.length()) && usePrefix) {
      return generateRandomStringWithPrefix(SMALL_PREFIX, charCount, charactersSet);
    } else {
      return generateRandomString(charCount, charactersSet);
    }
  }

  public static String createName() {
    return RandomUtils.getRandomString(8, ENGLISH_ALPHABET, true);
  }

  public static String createName(String prefix) {
    return prefix + RandomUtils.getRandomString(7, ENGLISH_ALPHABET, false);
  }
}
