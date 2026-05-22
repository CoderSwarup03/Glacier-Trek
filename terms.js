async function loadTermsPolicy() {
  const container = document.getElementById("termsContent");

  if (!container) return;

  try {
    const endpoint =
      API_CONFIG?.ENDPOINTS?.TERMS || "/api/policies";
    const url = API_CONFIG.getUrl(endpoint);
    response = await fetch(url);
    if (!response.ok) throw new Error("Primary failed");
  } catch (err) {
    console.warn("Fallback API used");
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    container.innerHTML = "<p>No data found.</p>";
    return;
  }

  // ✅ Filter ONLY terms
  const terms = data.find((item) => item.type === "terms");

  if (!terms) {
    container.innerHTML =
      "<p>Terms & Conditions not available.</p>";
    return;
  }

  const cleanContent = terms.content
    ? terms.content
    : "";
  // const cleanContent = terms.content
  //   ? terms.content.replace(/&nbsp;/g, " ")
  //   : "";

  container.innerHTML =
    cleanContent ||
    "<p>Terms & Conditions content not available.</p>";
}
