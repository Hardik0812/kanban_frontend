import { urls } from "../Urls";
import { ProjectService } from "../http/ProjectService";

export class ProjectApi {
  static create(data) {
    return ProjectService.post(urls.project.add, data);
  }

  static update(data, id) {
    const url = `${urls.project.update}/${id}/`;
    return ProjectService.patch(url, data);
  }

  static get(data) {
    return ProjectService.get(urls.project.get, data);
  }

  static delete(id) {
    const url = `${urls.project.delete}/${id}/`;
    console.log("url", url);
    return ProjectService.delete(url);
  }
}
