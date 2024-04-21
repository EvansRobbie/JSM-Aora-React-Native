import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
} from 'react-native-appwrite';
export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  plartform: 'com.robbie.aora',
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
  .setPlatform(appwriteConfig.plartform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

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
export const getAllPost = async () =>{
  try {
      const posts =  await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videosCollectionId
      )
      return posts.documents
  } catch (error) {
      throw new Error(error)
  }
}

// Trending
export const getLatestVideos = async () =>{
  try {
      const posts =  await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videosCollectionId,
        [Query.orderDesc('$createdAt', Query.limit(7))]
      )
      return posts.documents
  } catch (error) {
      throw new Error(error)
  }
}
