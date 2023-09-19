import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_COLLECTION } from './storageConfig'

export async function createNewUserAvatar(avatar: string) {
  await AsyncStorage.setItem(USER_COLLECTION, avatar)
}

export async function getUserAvatar() {
  try {
    const storage = await AsyncStorage.getItem(USER_COLLECTION)

    return storage ?? ''
  } catch (error) {
    throw error
  }
}
