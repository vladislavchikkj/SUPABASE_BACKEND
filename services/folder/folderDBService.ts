import { FolderDB, FolderInsert } from 'types/types'
import supabase from '../db/supabase'

export default class FolderDBService {
	async createFolder(folder: FolderInsert) {
		try {
			console.log('Creating folder in DB:', folder)
			const { data, error } = await supabase
				.getClient()
				.from('folders')
				.insert([
					{
						id: folder.id,
						folder_name: folder.folder_name,
						parent_id: folder.parent_id || null,
						user_id: folder.user_id,
						created_at: new Date().toISOString(),
					},
				])
				.select()
				.single()

			if (error) {
				console.log('Error creating folder in DB:', error)
				throw error
			}

			console.log('Folder created in DB successfully:', data)
			return { success: true, data } // Вернуть объект с данными папки
		} catch (error) {
			console.log('Exception during folder creation:', error)
			return { success: false, error: error.message }
		}
	}

	async getFolder(folder_id: string) {
		try {
			console.log('Getting folder from DB with ID:', folder_id)
			const { data, error } = await supabase
				.getClient()
				.from('folders')
				.select('*')
				.eq('id', folder_id)
				.single()

			if (error) {
				console.log('Error getting folder from DB:', error)
				throw error
			}

			console.log('Folder retrieved from DB successfully:', data)
			return { success: true, data: data as FolderDB }
		} catch (error) {
			console.log('Exception during folder retrieval:', error)
			return { success: false, error: error.message }
		}
	}

	async updateFolder(folder_id: string, updates: Partial<FolderInsert>) {
		try {
			console.log('Updating folder in DB:', folder_id, updates)
			const { data, error } = await supabase
				.getClient()
				.from('folders')
				.update(updates)
				.eq('id', folder_id)
				.single()

			if (error) {
				console.log('Error updating folder in DB:', error)
				throw error
			}

			console.log('Folder updated in DB successfully:', data)
			return { success: true, data }
		} catch (error) {
			console.log('Exception during folder update:', error)
			return { success: false, error: error.message }
		}
	}

	async deleteFolder(folder_id: string) {
		try {
			console.log('Deleting folder from DB with ID:', folder_id)
			const { error } = await supabase
				.getClient()
				.from('folders')
				.delete()
				.eq('id', folder_id)

			if (error) {
				console.log('Error deleting folder from DB:', error)
				throw error
			}

			console.log('Folder deleted from DB successfully')
			return { success: true }
		} catch (error) {
			console.log('Exception during folder deletion:', error)
			return { success: false, error: error.message }
		}
	}

	async getUserFolders(user_id: string) {
		try {
			console.log('Getting all folders for user ID:', user_id)
			const { data, error } = await supabase
				.getClient()
				.from('folders')
				.select('*')
				.eq('user_id', user_id)

			if (error) {
				console.log('Error getting folders from DB:', error)
				throw error
			}

			console.log('Folders retrieved from DB successfully:', data)
			return { success: true, data: data as FolderDB[] }
		} catch (error) {
			console.log('Exception during folder retrieval:', error)
			return { success: false, error: error.message }
		}
	}
}
