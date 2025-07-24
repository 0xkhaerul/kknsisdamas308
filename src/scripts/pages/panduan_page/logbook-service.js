import { createPost, getAllPosts, deletePost } from "../../data/api";

export class LogbookService {
  async createPost(postData) {
    console.log("LogbookService: Creating post with data:", postData);
    return await createPost(postData);
  }

  async getAllPosts(page = 1) {
    return await getAllPosts(page);
  }

  async deletePost(postId) {
    return await deletePost(postId);
  }
}
