import {
  Account,
  Avatars,
  Client,
  Databases,
  Storage,
  ID,
  Query,
} from 'react-native-appwrite';
export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.robbie.aora',
  projectId: '661c00142e2eeb14fdce',
  databaseId: '661c033fbcea4c874948',
  userCollectionId: '661c0369c20ce112f003',
  videosCollectionId: '661c038f2bf2cd7829df',
  storageid: '661c055a6baa026d4a27',
};

// Init your react-native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// get all posts
export const getAllPost = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.orderDesc('$createdAt')]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

// Trending
export const getLatestVideos = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.search('title', query)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
export const getUserPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.equal('creator', userId)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFilePreview = (fileId: string, type: 'image' | 'video') => {
  let fileUrl;

  try {
    if (type === 'image') {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageid,
        fileId,
        2000,
        2000,
        'top',
        100
      );
    } else if (type === 'video') {
      fileUrl = storage.getFileView(appwriteConfig.storageid, fileId);
    } else {
      throw new Error('Invalid file type');
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadFile = async (file, type: 'image' | 'video') => {
  if (!file) return;
  const { mimeType, ...rest } = file;
  const asset = {
    name:file.fileName,
    type:file.mimeType,
    size:file.fileSize,
    uri:file.uri
  }
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageid,
      ID.unique(),
      asset
    );
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl
  } catch (error) {
    throw new Error(error);
  }
};

export const createVideo = async (form: {
  title: string;
  thumbnail: any;
  video: any;
  prompt: string;
  userId: string;
}) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost
  } catch (error) {
    throw new Error(error);
  }
};
