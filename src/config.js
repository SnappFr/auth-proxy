export const Config = {
  url: undefined,
  getUrl() {
    if (!Config.url) throw "You must defined Config.url";
    return Config.url;
  }
};
  