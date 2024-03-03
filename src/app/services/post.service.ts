import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc, query, where } from 'firebase/firestore';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  db = getFirestore();

  async getPosts(userId: string) {
    const querySnapshot = await getDocs(query(collection(this.db, 'posts'), where('userId', '==', userId)));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
  }

  async getPostById(id: string) {
    const postDoc = await getDoc(doc(this.db, 'posts', id));
    if (postDoc.exists()) {
      return { id: postDoc.id, ...postDoc.data() } as Post;
    } else {
      throw new Error('No such document!');
    }
  }

  createPost(post: Post) {
    return addDoc(collection(this.db, 'posts'), post);
  }

  updatePost(post: Post) {
    if (!post) {
      throw new Error('El post no puede ser undefined');
    }

    const { id, ...updatedPost } = post; // Separate 'id' from the rest of the properties
    const postDoc = doc(this.db, 'posts', id);
    return updateDoc(postDoc, updatedPost);
  }

  deletePost(id: string) {
    return deleteDoc(doc(this.db, 'posts', id));
  }
}