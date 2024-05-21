class TrekDTO {
  constructor(id, name, desc, download_url) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.download_url = download_url;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getDesc() {
    return this.desc;
  }

  setDesc(desc) {
    this.desc = desc;
  }

  getdownload_url() {
    return this.download_url;
  }

  setdownload_url(download_url) {
    this.download_url = download_url;
  }

  static fromFirestore(doc) {
    const data = doc.data();
    return new TrekDTO(doc.id, data.name, data.desc, data.download_url);
  }
}

export default TrekDTO;
