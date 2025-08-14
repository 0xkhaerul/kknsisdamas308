import { getAccessToken } from "../utils/auth";
import CONFIG from "../config";

const ENDPOINTS = {
  // Auth
  REGISTER: `${CONFIG.BASE_URL}/users`,
  LOGIN: `${CONFIG.BASE_URL}/login`,

  POSTS: `${CONFIG.BASE_URL}/posts`,
};

export async function register({ nama_lengkap, email, password }) {
  try {
    const response = await fetch(ENDPOINTS.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nama_lengkap, email, password }),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      return { error: true, data: responseJson };
    }

    return { error: false, data: responseJson };
  } catch (error) {
    return { error: true, data: { message: "Network error" } };
  }
}

export async function login({ email, password }) {
  try {
    const response = await fetch(ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      return { error: true, data: responseJson };
    }

    return { error: false, data: responseJson };
  } catch (error) {
    return { error: true, data: { message: "Network error" } };
  }
}

export async function createPost({ content, files }) {
  try {
    const formData = new FormData();
    formData.append("content", content);

    // Handle multiple files
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }

    const response = await fetch(ENDPOINTS.POSTS, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: formData,
    });

    const responseJson = await response.json();

    if (!response.ok) {
      return { error: true, data: responseJson };
    }

    return { error: false, data: responseJson };
  } catch (error) {
    return { error: true, data: { message: "Network error" } };
  }
}

export async function getAllPosts(page = 1) {
  try {
    const response = await fetch(`${ENDPOINTS.POSTS}?page=${page}`);
    const responseJson = await response.json();

    if (!response.ok) {
      return { error: true, data: responseJson };
    }

    return { error: false, data: responseJson };
  } catch (error) {
    return { error: true, data: { message: "Network error" } };
  }
}

// src/utils/api.js
export async function deletePost(postId) {
  try {
    const response = await fetch(`${ENDPOINTS.POSTS}/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    const responseJson = await response.json();

    if (!response.ok) {
      return { error: true, data: responseJson };
    }

    return { error: false, data: responseJson };
  } catch (error) {
    return { error: true, data: { message: "Network error" } };
  }
}
