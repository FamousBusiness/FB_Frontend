"use client";

import { useEffect } from "react";

const SchemaInjector = ({ schemas }) => {
  useEffect(() => {
    const insertScript = (json) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(json);
      document.head.appendChild(script);
    };

    if (schemas) {
      insertScript(schemas.breadCrumbSchema);
      insertScript(schemas.itemListSchema);
      insertScript(schemas.faqSchema);
      insertScript(schemas.articleSchema);
    }

    return () => {
      // optional cleanup
    };
  }, [schemas]);

  return null;
};

export default SchemaInjector;
