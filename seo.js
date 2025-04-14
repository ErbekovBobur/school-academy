document.addEventListener("DOMContentLoaded", () => {
  const pageConfig = {
    "index.html": {
      title: "School Academy | Ташкент",
      description: "School Academy в Ташкенте — качественное образование для детей от детского сада до средней школы",
      keywords: "школа, образование, Ташкент, детский сад, начальная школа, средняя школа",
      ogImage: "img/logo-uz.png",
    },
    "about.html": {
      title: "School Academy | О школе",
      description: "О School Academy в Ташкенте — история, преподаватели, галерея и миссия школы",
      keywords: "о школе, преподаватели, галерея, миссия, Ташкент",
      ogImage: "img/teachers/teacher1.jpg",
    },
    "program.html": {
      title: "School Academy | Программы",
      description: "Образовательные программы School Academy — детский сад, начальная и средняя школа в Ташкенте",
      keywords: "программы, детский сад, начальная школа, средняя школа, Ташкент",
      ogImage: "img/programs/kindergarten.jpg",
    },
    "contacts.html": {
      title: "School Academy | Контакты",
      description: "Контакты School Academy в Ташкенте — адрес, телефон, карта и часы работы",
      keywords: "контакты, адрес, телефон, Ташкент",
      ogImage: "img/logo-uz.png",
    },
  };

  const currentPage = location.pathname.split("/").pop() || "index.html";
  const config = pageConfig[currentPage] || pageConfig["index.html"];

  // Update Meta Tags
  document.title = config.title;
  document.querySelector('meta[name="description"]').setAttribute("content", config.description);
  if (!document.querySelector('meta[name="keywords"]')) {
    const keywordsMeta = document.createElement("meta");
    keywordsMeta.name = "keywords";
    keywordsMeta.content = config.keywords;
    document.head.appendChild(keywordsMeta);
  } else {
    document.querySelector('meta[name="keywords"]').setAttribute("content", config.keywords);
  }

  // Open Graph Tags
  const ogTags = [
    { property: "og:title", content: config.title },
    { property: "og:description", content: config.description },
    { property: "og:image", content: location.origin + "/" + config.ogImage },
    { property: "og:type", content: "website" },
    { property: "og:url", content: location.href },
  ];

  ogTags.forEach((tag) => {
    let meta = document.querySelector(`meta[property="${tag.property}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("property", tag.property);
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", tag.content);
  });

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "School Academy",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Юнусабадский район, массив Юнусабад, 7-й квартал, 16/1",
      addressLocality: "Ташкент",
      addressCountry: "UZ",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+998711234567",
      contactType: "customer service",
    },
    url: location.origin,
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(jsonLd);
  document.head.appendChild(script);
});
