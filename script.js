const WEAPON_TYPES = ["斬", "打", "突"];
const ATTRIBUTES = ["火", "水", "風", "土", "聖", "闇"];
const INTEGRAL_SERIES = ["Integral", "Nox", "Lux", "Rosso", "Yasha", "Gaou", "Machina", "Gale", "Rex", "Lava"];
const CHAOS_LEVELS = ["95", "110", "135", "155", "175", "195", "215", "235", "255", "275", "295"];
const INGOT_COL_TYPES = ["fixed", "percent"];
const INGOT_PROFICIENCY_TYPES = ["fixed", "percent"];
const INGOT_EXPERIENCE_TYPES = ["fixed", "percent"];
const INGOT_DAMAGE_TYPES = ["critical", "nonCritical"];
const INGOT_WEAPON_TYPES = ["片手直剣", "片手細剣", "片手棍", "両手斧", "両手槍", "短剣", "弓", "盾"];
const LABYRINTH_DETAIL_IMAGES = {
  16: ["16_1.png", "16_2.png"],
  17: ["17.png"],
  19: ["19.png"],
  23: ["23.png"],
  24: ["24_1.png", "24_2.png"],
  31: ["31.png"],
  33: ["33_1.png", "33_2.png"],
  44: ["44.png"],
  51: ["51_1.png", "51_2.png"],
  65: ["65_1.png", "65_2.png"],
  69: ["69.png"],
  75: ["75.png"],
  79: ["79.png"],
  83: ["83.png"],
  89: ["89_1.png", "89_2.png"],
  91: ["91.png"],
  100: ["100_1.png", "100_2.png"],
};
const CHAOS_DETAIL_IMAGES = {
  195: { 突: ["195pi_1.jpg", "195pi_2.jpg"] },
  215: { 斬: ["215sl_1.png", "215sl_2.png"] },
  235: { 打: ["235st.png"] },
  255: { 打: ["255st_1.png", "255st_2.png"] },
  275: { 突: ["275pi_1.png", "275pi_2.png"] },
  295: { 斬: ["295sl_1.png", "295sl_2.jpg"] },
};
const COMBAT_ICON_FILES = {
  斬: "slash.png",
  打: "blunt.png",
  突: "thrust.png",
  火: "fire.png",
  水: "water.png",
  風: "wind.png",
  土: "earth.png",
  聖: "holy.png",
  闇: "dark.png",
};

const weaponLabels = {
  斬: "斬撃",
  打: "打撃",
  突: "突撃",
};

const attributeLabels = {
  火: "火",
  水: "水",
  風: "風",
  土: "土",
  聖: "聖",
  闇: "闇",
};

const integralLabels = {
  ja: {
    Integral: "インテグラル",
    Nox: "ノクス",
    Lux: "ルクス",
    Rosso: "ロッソ",
    Yasha: "ヤシャ",
    Gaou: "ガオウ",
    Machina: "マキナ",
    Gale: "ゲイル",
    Rex: "レクス",
    Lava: "ラヴァ",
  },
  en: {
    Integral: "Integral",
    Nox: "Nox",
    Lux: "Lux",
    Rosso: "Rosso",
    Yasha: "Yasha",
    Gaou: "Gaou",
    Machina: "Machina",
    Gale: "Gale",
    Rex: "Rex",
    Lava: "Lava",
  },
};
const chaosLevelLabels = {
  ja: {
    95: "95",
    110: "110",
    135: "135",
    155: "155",
    175: "175",
    195: "195",
    215: "215",
    235: "235",
    255: "255",
    275: "275",
    295: "295",
  },
  en: {
    95: "95",
    110: "110",
    135: "135",
    155: "155",
    175: "175",
    195: "195",
    215: "215",
    235: "235",
    255: "255",
    275: "275",
    295: "295",
  },
};

const translations = {
  ja: {
    heroCopy: "挑むボスの弱点を選択して、最適な相手を見つけよう。",
    filterTitle: "弱点から探す",
    clear: "条件をリセット",
    weaponLegend: "武器弱点",
    attributeLegend: "属性弱点",
    multiple: "複数選択可",
    filterNote: "同じ分類内では「いずれか」、武器と属性を両方選んだ場合は「両方」に一致するボスを表示します。",
    resultTitle: "ボス一覧",
    resultCount: (shown, total) => `${shown} / ${total} 体`,
    weapon: "武器",
    attribute: "属性",
    weaponFilter: "武器",
    attributeFilter: "属性",
    integralLegend: "インテグラル",
    integralFilter: "インテグラル",
    chaosLevelLegend: "カオスレベル",
    chaosLevelFilter: "カオスレベル",
    locationLegend: "エリア",
    locationFilter: "エリア",
    ingotFilterTitle: "入手インゴットで絞り込み",
    ingotFilterNote: "同じ分類内ではいずれか、異なる分類ではすべての条件に一致するインゴットを持つボスを表示します。",
    ingotColLegend: "Col獲得量",
    ingotProficiencyLegend: "熟練度経験値",
    ingotExperienceLegend: "経験値",
    ingotDamageLegend: "ダメージ",
    ingotWeaponTypeLegend: "武器種",
    ingotWeaponWeaknessLegend: "武器弱点",
    ingotAttributeLegend: "属性",
    ingot: "入手インゴット",
    ingotImageAlt: (name) => `${name}の画像`,
    labyrinthDetail: (floor) => `${floor}層の詳細情報`,
    labyrinthImageAlt: (floor, index, total) => `${floor}層の詳細情報（${index} / ${total}）`,
    chaosDetail: (level) => `カオスレベル${level}の詳細情報`,
    chaosImageAlt: (level, index, total) => `カオスレベル${level}の詳細情報（${index} / ${total}）`,
    noResultsTitle: "該当するボスが見つかりません",
    noResultsCopy: "選択した弱点の組み合わせを変えてみてください。",
    loadError: "データを読み込めませんでした",
    loadErrorTitle: "ボスデータを読み込めませんでした",
    loadErrorCopy: "index.html をローカルサーバー経由で開いているか確認してください。",
    floor: (floor) => `${floor}層`,
  },
  en: {
    heroCopy: "Select a boss weakness to find the best opponent for your build.",
    filterTitle: "Find by weakness",
    clear: "Clear filters",
    weaponLegend: "Physical weakness",
    attributeLegend: "Elemental weakness",
    multiple: "Multiple selections allowed",
    filterNote: "Selections within a group use OR. Selecting both groups requires matches in both.",
    resultTitle: "Boss list",
    resultCount: (shown, total) => `${shown} / ${total} bosses`,
    weapon: "Type",
    attribute: "Element",
    weaponFilter: "Type",
    attributeFilter: "Element",
    integralLegend: "Integral Series",
    integralFilter: "Integral Series",
    chaosLevelLegend: "Chaos Level",
    chaosLevelFilter: "Chaos Level",
    locationLegend: "Area",
    locationFilter: "Area",
    ingotFilterTitle: "Filter by obtainable ingot",
    ingotFilterNote: "Selections within a group use OR. Selections across different groups must all match the ingot.",
    ingotColLegend: "Col gain",
    ingotProficiencyLegend: "Proficiency EXP",
    ingotExperienceLegend: "Experience",
    ingotDamageLegend: "Damage",
    ingotWeaponTypeLegend: "Weapon type",
    ingotWeaponWeaknessLegend: "Physical type",
    ingotAttributeLegend: "Element",
    ingot: "Obtainable ingot",
    ingotImageAlt: (name) => `${name} image`,
    labyrinthDetail: (floor) => `Floor ${floor} details`,
    labyrinthImageAlt: (floor, index, total) => `Floor ${floor} details (${index} / ${total})`,
    chaosDetail: (level) => `Chaos Level ${level} details`,
    chaosImageAlt: (level, index, total) => `Chaos Level ${level} details (${index} / ${total})`,
    noResultsTitle: "No bosses found",
    noResultsCopy: "Try changing the selected weakness combination.",
    loadError: "Could not load data",
    loadErrorTitle: "Could not load boss data",
    loadErrorCopy: "Please open index.html through a local web server.",
    floor: (floor) => `Floor ${floor}`,
  },
};

const englishWeaponLabels = { 斬: "Slash", 打: "Strike", 突: "Pierce" };
const englishAttributeLabels = { 火: "Fire", 水: "Water", 風: "Wind", 土: "Earth", 聖: "Holy", 闇: "Dark" };

const ingotFilterLabels = {
  ja: {
    fixed: "固定値",
    percent: "%",
    critical: "クリティカル",
    nonCritical: "非クリティカル",
    "片手直剣": "片手直剣",
    "片手細剣": "片手細剣",
    "片手棍": "片手棍",
    "両手斧": "両手斧",
    "両手槍": "両手槍",
    短剣: "短剣",
    弓: "弓",
    盾: "盾",
    ...weaponLabels,
    ...attributeLabels,
  },
  en: {
    fixed: "Flat",
    percent: "Percent",
    critical: "Critical",
    nonCritical: "Non-critical",
    "片手直剣": "One-handed Sword",
    "片手細剣": "Rapier",
    "片手棍": "One-handed Club",
    "両手斧": "Two-handed Axe",
    "両手槍": "Two-handed Spear",
    短剣: "Dagger",
    弓: "Bow",
    盾: "Shield",
    ...englishWeaponLabels,
    ...englishAttributeLabels,
  },
};

const locationLabels = {
  ja: {
    labyrinth: "迷宮区",
    undergroundLabyrinth: "地下迷宮",
    dungeon: "ダンジョン",
    chaosShowdown: "カオス討伐戦",
  },
  en: {
    labyrinth: "Aincrad Labyrinth",
    undergroundLabyrinth: "Underground Labyrinth",
    dungeon: "Dungeon",
    chaosShowdown: "Chaos Showdown",
  },
};

const LOCATION_TYPES = ["labyrinth", "undergroundLabyrinth", "dungeon", "chaosShowdown"];

const state = {
  bosses: [],
  language: "ja",
  selectedWeapons: new Set(),
  selectedAttributes: new Set(),
  selectedSeries: new Set(),
  selectedChaosLevels: new Set(),
  selectedLocations: new Set(),
  selectedIngotCol: new Set(),
  selectedIngotProficiency: new Set(),
  selectedIngotExperience: new Set(),
  selectedIngotDamage: new Set(),
  selectedIngotWeaponTypes: new Set(),
  selectedIngotWeaponWeaknesses: new Set(),
  selectedIngotAttributes: new Set(),
};

const elements = {
  weaponFilters: document.querySelector("#weaponFilters"),
  attributeFilters: document.querySelector("#attributeFilters"),
  integralFilterGroup: document.querySelector("#integralFilterGroup"),
  integralFilters: document.querySelector("#integralFilters"),
  chaosLevelFilterGroup: document.querySelector("#chaosLevelFilterGroup"),
  chaosLevelFilters: document.querySelector("#chaosLevelFilters"),
  locationFilters: document.querySelector("#locationFilters"),
  ingotFiltersSection: document.querySelector("#ingotFiltersSection"),
  ingotColFilters: document.querySelector("#ingotColFilters"),
  ingotProficiencyFilters: document.querySelector("#ingotProficiencyFilters"),
  ingotExperienceFilters: document.querySelector("#ingotExperienceFilters"),
  ingotDamageFilters: document.querySelector("#ingotDamageFilters"),
  ingotWeaponTypeFilters: document.querySelector("#ingotWeaponTypeFilters"),
  ingotWeaponWeaknessFilters: document.querySelector("#ingotWeaponWeaknessFilters"),
  ingotAttributeFilters: document.querySelector("#ingotAttributeFilters"),
  clearFilters: document.querySelector("#clearFilters"),
  languageToggle: document.querySelector("#languageToggle"),
  themeToggle: document.querySelector("#themeToggle"),
  resultCount: document.querySelector("#resultCount"),
  activeFilters: document.querySelector("#activeFilters"),
  bossList: document.querySelector("#bossList"),
  template: document.querySelector("#bossCardTemplate"),
};

function t(key) {
  return translations[state.language][key];
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {}
  if (elements.themeToggle) {
    elements.themeToggle.textContent = theme === "dark" ? "🌙" : "☀️";
    elements.themeToggle.setAttribute(
      "aria-label",
      state.language === "ja" ? (theme === "dark" ? "ダークモード" : "ライトモード") : theme === "dark" ? "Dark mode" : "Light mode",
    );
  }
}

function labelsFor(type) {
  if (type === "weapon") {
    return state.language === "en" ? englishWeaponLabels : weaponLabels;
  }
  if (type === "attribute") {
    return state.language === "en" ? englishAttributeLabels : attributeLabels;
  }
  if (type === "series") {
    return integralLabels[state.language] || integralLabels.ja;
  }
  if (type === "chaosLevel") {
    return chaosLevelLabels[state.language] || chaosLevelLabels.ja;
  }
  if (type.startsWith("ingot")) {
    return ingotFilterLabels[state.language] || ingotFilterLabels.ja;
  }
  return type === "location" ? locationLabels[state.language] : {};
}

function translateInterface() {
  document.documentElement.lang = state.language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  elements.languageToggle.textContent = state.language === "ja" ? "EN" : "JP";
  elements.languageToggle.setAttribute(
    "aria-label",
    state.language === "ja" ? "Switch to English" : "日本語に切り替え",
  );
}

function isCombatIconType(type) {
  return type === "weapon" || type === "attribute" || type === "ingotWeaponWeakness" || type === "ingotAttribute";
}

function createCombatIcon(value, label, className) {
  const filename = COMBAT_ICON_FILES[value];
  if (!filename) return null;

  const image = document.createElement("img");
  image.className = className;
  image.src = `images/icon/${filename}`;
  image.alt = label;
  return image;
}

function setFilterOptionContent(container, value, labelText, type) {
  const icon = isCombatIconType(type) && createCombatIcon(value, labelText, "combat-icon filter-icon");
  container.replaceChildren();
  if (icon) {
    container.classList.add("icon-filter-label");
    container.setAttribute("aria-label", labelText);
    container.append(icon);
  } else {
    container.classList.remove("icon-filter-label");
    container.removeAttribute("aria-label");
    container.textContent = labelText;
  }
}

function createFilterOptions(container, values, labels, selectionSet, type) {
  values.forEach((value) => {
    const label = document.createElement("label");
    label.className = "filter-option";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = value;
    input.addEventListener("change", () => {
      if (input.checked) {
        selectionSet.add(value);
      } else {
        selectionSet.delete(value);
      }
      if (type === "location") {
        syncLocationDependentFilterVisibility();
      }
      render();
    });

    const text = document.createElement("span");
    const labelText = type === "location"
      ? locationLabels[state.language][value] || value
      : labelsFor(type)[value] || labels[value] || value;

    if (isCombatIconType(type)) {
      label.classList.add("icon-filter-option");
    }
    setFilterOptionContent(text, value, labelText, type);
    label.append(input, text);
    container.append(label);
  });
}

function toArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : value ? [value] : [];
}

function normaliseBoss(boss, index) {
  // 既存データでは武器種と属性が attributeWeakness に混在しているため、
  // 画面表示用にここで分けます。weaponType に値が追加された場合も対応します。
  const allWeaknesses = [
    ...toArray(boss.weaponType),
    ...toArray(boss.attributeWeakness),
  ];

  const weaponWeaknesses = [...new Set(allWeaknesses.filter((item) => WEAPON_TYPES.includes(item)))];
  const attributeWeaknesses = [
    ...new Set(allWeaknesses.filter((item) => ATTRIBUTES.includes(item))),
  ];
  const integralSeries = [...new Set(toArray(boss.integralSeries))];
  const chaosLevels = boss.level != null ? [String(boss.level)] : [];
  const englishName = toArray(boss.englishName).join(" / ");
  const rawName = toArray(boss.name).join(" / ");
  const nickname = typeof boss.nickname === "string" ? boss.nickname : "";
  const displayName = englishName || nickname || rawName || "Unknown Boss";
  const japaneseName = !/[繧繝縺譁蜈]/.test(nickname) ? nickname : "";
  const alternateName = englishName ? "" : japaneseName || rawName;
  return {
    id: index + 1,
    chapter: boss.chapter,
    floor: boss.floor,
    location: boss.location,
    name: displayName,
    japaneseName,
    alternateName,
    weaponWeaknesses,
    attributeWeaknesses,
    integralSeries,
    chaosLevels,
    ingot: boss.ingot && typeof boss.ingot === "object" ? boss.ingot : null,
  };
}

function hasActiveIngotFilters() {
  return (
    state.selectedIngotCol.size > 0 ||
    state.selectedIngotProficiency.size > 0 ||
    state.selectedIngotExperience.size > 0 ||
    state.selectedIngotDamage.size > 0 ||
    state.selectedIngotWeaponTypes.size > 0 ||
    state.selectedIngotWeaponWeaknesses.size > 0 ||
    state.selectedIngotAttributes.size > 0
  );
}

function matchesIngotSelection(boss) {
  if (!hasActiveIngotFilters()) return true;

  const filters = boss.ingot?.filters;
  if (!filters) return false;

  const matchesValue = (selection, value) => selection.size === 0 || selection.has(value);
  const matchesValues = (selection, values) =>
    selection.size === 0 || (Array.isArray(values) && values.some((value) => selection.has(value)));

  return (
    matchesValue(state.selectedIngotCol, filters.col) &&
    matchesValue(state.selectedIngotProficiency, filters.proficiency) &&
    matchesValue(state.selectedIngotExperience, filters.experience) &&
    matchesValue(state.selectedIngotDamage, filters.damage) &&
    matchesValues(state.selectedIngotWeaponTypes, filters.weaponTypes) &&
    matchesValues(state.selectedIngotWeaponWeaknesses, filters.weaponWeaknesses) &&
    matchesValues(state.selectedIngotAttributes, filters.attributes)
  );
}

function matchesSelection(boss) {
  const weaponMatches =
    state.selectedWeapons.size === 0 ||
    boss.weaponWeaknesses.some((weakness) => state.selectedWeapons.has(weakness));
  const attributeMatches =
    state.selectedAttributes.size === 0 ||
    boss.attributeWeaknesses.some((weakness) => state.selectedAttributes.has(weakness));
  const seriesMatches =
    state.selectedSeries.size === 0 ||
    boss.integralSeries.some((series) => state.selectedSeries.has(series));

  const chaosLevelMatches =
    state.selectedChaosLevels.size === 0 ||
    boss.chaosLevels.some((level) => state.selectedChaosLevels.has(level));
  const locationMatches =
    state.selectedLocations.size === 0 ||
    (boss.location && state.selectedLocations.has(boss.location));

  return weaponMatches && attributeMatches && seriesMatches && chaosLevelMatches && locationMatches && matchesIngotSelection(boss);
}

function getFloorLabel(boss) {
  if (boss.floor) return t("floor")(boss.floor);
  if (boss.chapter) return state.language === "ja" ? `第${boss.chapter}章` : `Chapter ${boss.chapter}`;
  return "SPECIAL";
}

function appendBadges(container, values, labels, className, type) {
  values.forEach((value) => {
    const badge = document.createElement("span");
    badge.className = `badge ${className}`;
    const label = labels[value] || value;
    const icon = isCombatIconType(type) && createCombatIcon(value, label, "combat-icon badge-icon");
    if (icon) {
      badge.classList.add("icon-badge");
      badge.setAttribute("aria-label", label);
      badge.append(icon);
    } else {
      badge.textContent = label;
    }
    container.append(badge);
  });
}

function ingotImagePath(sourceImage) {
  return `images/dungeon/${encodeURIComponent(sourceImage)}`;
}

function labyrinthImagePath(filename) {
  return `images/labyrinth/${encodeURIComponent(filename)}`;
}

function chaosImagePath(filename) {
  return `images/chaos/${encodeURIComponent(filename)}`;
}

function detailForBoss(boss) {
  if (boss.location === "labyrinth") {
    const images = LABYRINTH_DETAIL_IMAGES[boss.floor];
    if (!images?.length) return null;
    return {
      images,
      label: t("labyrinthDetail")(boss.floor),
      imageAlt: (index) => t("labyrinthImageAlt")(boss.floor, index + 1, images.length),
      imagePath: labyrinthImagePath,
    };
  }

  if (boss.location === "chaosShowdown") {
    const level = boss.chaosLevels[0];
    const imageByWeakness = CHAOS_DETAIL_IMAGES[level] || {};
    const images = [...new Set(boss.weaponWeaknesses.flatMap((weakness) => imageByWeakness[weakness] || []))];
    if (!images.length) return null;
    return {
      images,
      label: t("chaosDetail")(level),
      imageAlt: (index) => t("chaosImageAlt")(level, index + 1, images.length),
      imagePath: chaosImagePath,
    };
  }

  return null;
}

function setCardDetailOpen(card, isOpen) {
  card.classList.toggle("detail-open", isOpen);
  card.querySelector(".boss-id").setAttribute("aria-expanded", String(isOpen));
}

function toggleCardDetail(card) {
  const shouldOpen = !card.classList.contains("detail-open");
  elements.bossList.querySelectorAll(".boss-card.detail-open").forEach((openCard) => {
    if (openCard !== card) setCardDetailOpen(openCard, false);
  });
  setCardDetailOpen(card, shouldOpen);
}

function renderCard(boss) {
  const fragment = elements.template.content.cloneNode(true);
  const card = fragment.querySelector(".boss-card");
  const location = locationLabels[state.language][boss.location] || boss.location || "Other";

  card.querySelector(".boss-location").textContent = location;
  const floorBadge = card.querySelector(".boss-id");
  floorBadge.textContent = getFloorLabel(boss);
  const detail = detailForBoss(boss);
  if (detail) {
    const tooltip = card.querySelector(".boss-detail-tooltip");
    const imageList = tooltip.querySelector(".boss-detail-images");
    card.classList.add("has-detail-image");
    floorBadge.classList.add("has-detail-image");
    floorBadge.tabIndex = 0;
    floorBadge.setAttribute("role", "button");
    floorBadge.setAttribute("aria-label", detail.label);
    floorBadge.setAttribute("aria-expanded", "false");
    tooltip.hidden = false;
    card.addEventListener("click", () => toggleCardDetail(card));
    floorBadge.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCardDetail(card);
      }
    });
    tooltip.addEventListener("click", (event) => event.stopPropagation());
    detail.images.forEach((filename, index) => {
      const image = document.createElement("img");
      image.className = "boss-detail-image";
      image.src = detail.imagePath(filename);
      image.alt = detail.imageAlt(index);
      image.loading = "lazy";
      imageList.append(image);
    });
  }
  card.querySelector(".boss-name").textContent =
    state.language === "ja" && boss.japaneseName ? boss.japaneseName : boss.name;
  const subname = card.querySelector(".boss-subname");
  subname.textContent = boss.alternateName;
  subname.hidden = !boss.alternateName;

  if (state.selectedLocations.has("dungeon") && boss.location === "dungeon" && boss.ingot?.sourceImage) {
    const media = card.querySelector(".ingot-image");
    const image = media.querySelector(".ingot-thumbnail");
    media.hidden = false;
    image.src = ingotImagePath(boss.ingot.sourceImage);
    image.alt = t("ingotImageAlt")(boss.ingot.name);
    image.addEventListener("error", () => {
      media.hidden = true;
    }, { once: true });
  }

  if (boss.weaponWeaknesses.length) {
    const row = card.querySelector(".weapon-row");
    row.hidden = false;
    card.querySelector(".weapon-row .weakness-label").textContent = t("weapon");
    appendBadges(card.querySelector(".weapon-badges"), boss.weaponWeaknesses, labelsFor("weapon"), "weapon-badge", "weapon");
  }

  if (boss.attributeWeaknesses.length) {
    const row = card.querySelector(".attribute-row");
    row.hidden = false;
    row.querySelector(".weakness-label").textContent = t("attribute");
    appendBadges(
      card.querySelector(".attribute-badges"),
      boss.attributeWeaknesses,
      labelsFor("attribute"),
      "attribute-badge",
      "attribute",
    );
  }

  if (boss.ingot?.name) {
    const row = card.querySelector(".ingot-row");
    row.hidden = false;
    row.querySelector(".weakness-label").textContent = t("ingot");
    row.querySelector(".ingot-name").textContent = boss.ingot.name;
  }

  return fragment;
}

function makeActiveFilter(label, value, type) {
  const valueLabel = type ? labelsFor(type)[value] || value : value;
  return {
    label,
    value,
    valueLabel,
    iconType: isCombatIconType(type) ? type : null,
  };
}

function renderActiveFilters() {
  const filters = [
    ...[...state.selectedWeapons].map((value) => makeActiveFilter(t("weaponFilter"), value, "weapon")),
    ...[...state.selectedAttributes].map((value) => makeActiveFilter(t("attributeFilter"), value, "attribute")),
    ...[...state.selectedSeries].map((value) => makeActiveFilter(t("integralFilter"), value, "series")),
    ...[...state.selectedChaosLevels].map((value) => makeActiveFilter(t("chaosLevelFilter"), value, "chaosLevel")),
    ...[...state.selectedLocations].map((value) => makeActiveFilter(t("locationFilter"), locationLabels[state.language][value] || value)),
    ...[...state.selectedIngotCol].map((value) => makeActiveFilter(t("ingotColLegend"), value, "ingotCol")),
    ...[...state.selectedIngotProficiency].map((value) => makeActiveFilter(t("ingotProficiencyLegend"), value, "ingotProficiency")),
    ...[...state.selectedIngotExperience].map((value) => makeActiveFilter(t("ingotExperienceLegend"), value, "ingotExperience")),
    ...[...state.selectedIngotDamage].map((value) => makeActiveFilter(t("ingotDamageLegend"), value, "ingotDamage")),
    ...[...state.selectedIngotWeaponTypes].map((value) => makeActiveFilter(t("ingotWeaponTypeLegend"), value, "ingotWeaponType")),
    ...[...state.selectedIngotWeaponWeaknesses].map((value) => makeActiveFilter(t("ingotWeaponWeaknessLegend"), value, "ingotWeaponWeakness")),
    ...[...state.selectedIngotAttributes].map((value) => makeActiveFilter(t("ingotAttributeLegend"), value, "ingotAttribute")),
  ];

  elements.activeFilters.replaceChildren();
  elements.activeFilters.hidden = filters.length === 0;

  filters.forEach((filter) => {
    const chip = document.createElement("span");
    chip.className = "active-filter";
    if (filter.iconType) {
      chip.setAttribute("aria-label", `${filter.label}: ${filter.valueLabel}`);
      const prefix = document.createElement("span");
      prefix.textContent = `${filter.label}:`;
      chip.append(prefix, createCombatIcon(filter.value, filter.valueLabel, "combat-icon active-filter-icon"));
    } else {
      chip.textContent = `${filter.label}: ${filter.valueLabel}`;
    }
    elements.activeFilters.append(chip);
  });
}

function render() {
  const visibleBosses = state.bosses.filter(matchesSelection);
  const hasFilters =
    state.selectedWeapons.size > 0 ||
    state.selectedAttributes.size > 0 ||
    state.selectedSeries.size > 0 ||
    state.selectedChaosLevels.size > 0 ||
    state.selectedLocations.size > 0 ||
    hasActiveIngotFilters();

  elements.clearFilters.disabled = !hasFilters;
  elements.resultCount.textContent = t("resultCount")(visibleBosses.length, state.bosses.length);
  elements.bossList.replaceChildren();
  elements.bossList.setAttribute("aria-busy", "false");
  renderActiveFilters();

  if (visibleBosses.length === 0) {
    const message = document.createElement("div");
    message.className = "empty-state";
    const title = document.createElement("strong");
    title.textContent = t("noResultsTitle");
    message.append(title, t("noResultsCopy"));
    elements.bossList.append(message);
    return;
  }

  const cardFragment = document.createDocumentFragment();
  visibleBosses.forEach((boss) => cardFragment.append(renderCard(boss)));
  elements.bossList.append(cardFragment);
}

function clearFilters() {
  state.selectedWeapons.clear();
  state.selectedAttributes.clear();
  state.selectedSeries.clear();
  state.selectedChaosLevels.clear();
  state.selectedLocations.clear();
  clearIngotFilters();
  document.querySelectorAll('.filter-option input[type="checkbox"]').forEach((input) => {
    input.checked = false;
  });
  syncLocationDependentFilterVisibility();
  render();
}

function clearIntegralFilters() {
  state.selectedSeries.clear();
  elements.integralFilterGroup.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.checked = false;
  });
}

function clearChaosLevelFilters() {
  state.selectedChaosLevels.clear();
  elements.chaosLevelFilterGroup.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.checked = false;
  });
}

function clearIngotFilters() {
  state.selectedIngotCol.clear();
  state.selectedIngotProficiency.clear();
  state.selectedIngotExperience.clear();
  state.selectedIngotDamage.clear();
  state.selectedIngotWeaponTypes.clear();
  state.selectedIngotWeaponWeaknesses.clear();
  state.selectedIngotAttributes.clear();
  elements.ingotFiltersSection.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.checked = false;
  });
}

function syncIngotFilterVisibility() {
  const showIngotFilters = state.selectedLocations.has("dungeon");
  elements.ingotFiltersSection.hidden = !showIngotFilters;
  if (!showIngotFilters) {
    clearIngotFilters();
  }
}

function syncIntegralFilterVisibility() {
  const showIntegralFilters = state.selectedLocations.has("labyrinth");
  elements.integralFilterGroup.hidden = !showIntegralFilters;
  if (!showIntegralFilters) {
    clearIntegralFilters();
  }
}

function syncChaosLevelFilterVisibility() {
  const showChaosLevelFilters = state.selectedLocations.has("chaosShowdown");
  elements.chaosLevelFilterGroup.hidden = !showChaosLevelFilters;
  if (!showChaosLevelFilters) {
    clearChaosLevelFilters();
  }
}

function syncLocationDependentFilterVisibility() {
  syncChaosLevelFilterVisibility();
  syncIntegralFilterVisibility();
  syncIngotFilterVisibility();
}

function getFilterType(input) {
  if (input.closest("#weaponFilters")) return "weapon";
  if (input.closest("#attributeFilters")) return "attribute";
  if (input.closest("#integralFilters")) return "series";
  if (input.closest("#chaosLevelFilters")) return "chaosLevel";
  if (input.closest("#ingotColFilters")) return "ingotCol";
  if (input.closest("#ingotProficiencyFilters")) return "ingotProficiency";
  if (input.closest("#ingotExperienceFilters")) return "ingotExperience";
  if (input.closest("#ingotDamageFilters")) return "ingotDamage";
  if (input.closest("#ingotWeaponTypeFilters")) return "ingotWeaponType";
  if (input.closest("#ingotWeaponWeaknessFilters")) return "ingotWeaponWeakness";
  if (input.closest("#ingotAttributeFilters")) return "ingotAttribute";
  return "location";
}

function changeLanguage() {
  state.language = state.language === "ja" ? "en" : "ja";
  translateInterface();
  document.querySelectorAll(".filter-option input").forEach((input) => {
    const label = input.nextElementSibling;
    const type = getFilterType(input);
    const labelText = type === "location"
      ? locationLabels[state.language][input.value] || input.value
      : labelsFor(type)[input.value] || input.value;
    setFilterOptionContent(label, input.value, labelText, type);
  });
  render();
}

async function loadBosses() {
  try {
    const response = await fetch("bosses.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("bosses.json must contain an array");

    state.bosses = data.map(normaliseBoss);
    render();
  } catch (error) {
    elements.resultCount.textContent = t("loadError");
    elements.bossList.setAttribute("aria-busy", "false");
    const message = document.createElement("div");
    message.className = "error-state";
    const title = document.createElement("strong");
    title.textContent = t("loadErrorTitle");
    const details = document.createElement("small");
    details.textContent = error.message;
    message.append(title, t("loadErrorCopy"), document.createElement("br"), details);
    elements.bossList.replaceChildren(message);
  }
}

createFilterOptions(elements.weaponFilters, WEAPON_TYPES, weaponLabels, state.selectedWeapons, "weapon");
createFilterOptions(
  elements.attributeFilters,
  ATTRIBUTES,
  attributeLabels,
  state.selectedAttributes,
  "attribute",
);
createFilterOptions(elements.integralFilters, INTEGRAL_SERIES, integralLabels, state.selectedSeries, "series");
createFilterOptions(elements.chaosLevelFilters, CHAOS_LEVELS, chaosLevelLabels[state.language], state.selectedChaosLevels, "chaosLevel");
createFilterOptions(elements.locationFilters, LOCATION_TYPES, locationLabels, state.selectedLocations, "location");
createFilterOptions(elements.ingotColFilters, INGOT_COL_TYPES, ingotFilterLabels.ja, state.selectedIngotCol, "ingotCol");
createFilterOptions(elements.ingotProficiencyFilters, INGOT_PROFICIENCY_TYPES, ingotFilterLabels.ja, state.selectedIngotProficiency, "ingotProficiency");
createFilterOptions(elements.ingotExperienceFilters, INGOT_EXPERIENCE_TYPES, ingotFilterLabels.ja, state.selectedIngotExperience, "ingotExperience");
createFilterOptions(elements.ingotDamageFilters, INGOT_DAMAGE_TYPES, ingotFilterLabels.ja, state.selectedIngotDamage, "ingotDamage");
createFilterOptions(elements.ingotWeaponTypeFilters, INGOT_WEAPON_TYPES, ingotFilterLabels.ja, state.selectedIngotWeaponTypes, "ingotWeaponType");
createFilterOptions(elements.ingotWeaponWeaknessFilters, WEAPON_TYPES, ingotFilterLabels.ja, state.selectedIngotWeaponWeaknesses, "ingotWeaponWeakness");
createFilterOptions(elements.ingotAttributeFilters, ATTRIBUTES, ingotFilterLabels.ja, state.selectedIngotAttributes, "ingotAttribute");
elements.clearFilters.addEventListener("click", clearFilters);
elements.languageToggle.addEventListener("click", changeLanguage);
if (elements.themeToggle) {
  elements.themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    applyTheme(current === "dark" ? "light" : "dark");
    render();
  });
}
translateInterface();
// Initialize theme from localStorage or prefers-color-scheme
const savedTheme = (() => {
  try { return localStorage.getItem("theme"); } catch (e) { return null; }
})();
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (prefersDark ? "dark" : "light"));
loadBosses();
