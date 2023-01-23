import httpClient from "@/clients/EbacHTTPClient";

export interface Task{
    id:number,
    userId:number,
    title:string,
    completed:boolean
}

export default class AuthorArticleService {
  static API_ENDPOINT = "task/";
  static async getTasksByUserId(id:number) {
    const resp = await httpClient().get(this.API_ENDPOINT + "getTasksByUserId/" + id);
    return resp.data as Task[];
  }
}
