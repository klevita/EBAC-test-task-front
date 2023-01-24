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
  static async alterTask(userId:number,title:string,completed:boolean) {
    const resp = await httpClient().post(this.API_ENDPOINT + "alterTask",{title:title,userId:userId,completed:completed});
    return resp.data as number;
  }
  static async deleteTask(id:number) {
    const resp = await httpClient().delete(this.API_ENDPOINT + "deleteTaskById/" + id);
    return resp
  }
  static async completeTask(id:number, completed:boolean) {
    const resp = await httpClient().patch(this.API_ENDPOINT + "completeTaskById/" + id,{completed:completed});
    return resp
  }
}
