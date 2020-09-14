import { fetchWithXDomainRequest } from "./fetchWithXDomainRequest";
if (window.XDomainRequest && !("withCredentials" in new XMLHttpRequest())) {
  window.fetch = fetchWithXDomainRequest;
}
