/* FBN public website → app launch switches.
 * Keep registration destinations null until their exact production paths
 * and end-to-end approval journeys have been tested.
 * On launch, enter full HTTPS URLs under app.footballbuyingnetwork.co.uk.
 * Existing hrefs remain operational if a destination is not configured.
 */
(function () {
  "use strict";
  const destinations = {
    club: null,       // e.g. validated production club request-access URL
    supplier: null,   // validated production supplier request-access URL
    login: "https://app.footballbuyingnetwork.co.uk/"
  };

  function safeAppUrl(value) {
    if (!value) return null;
    try {
      const url = new URL(value);
      return url.protocol === "https:" && url.hostname === "app.footballbuyingnetwork.co.uk"
        ? url.href : null;
    } catch (_) { return null; }
  }

  document.querySelectorAll("[data-fbn-link]").forEach(function (link) {
    const destination = safeAppUrl(destinations[link.dataset.fbnLink]);
    if (destination) link.href = destination;
  });

  // The existing /join.html form remains a working fallback until launch.
  // At launch, enable the redirect only after the production club URL is verified.
  const redirectLegacyJoinPage = false;
  if (redirectLegacyJoinPage && /\/join\.html$/.test(location.pathname)) {
    const destination = safeAppUrl(destinations.club);
    if (destination) location.replace(destination);
  }
})();
