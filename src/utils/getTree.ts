export function getTree() {
  try {
    const response = fetch("/static/nstruct.json");
    return response;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
