import {
	createClient,
	SupabaseClient as SupabaseClientType,
} from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { Database } from 'types/supabase'

// Загрузка переменных окружения
dotenv.config()

const SUPABASE_URL = process.env.SUPABASE_URL as string
const SUPABASE_KEY = process.env.SUPABASE_KEY as string

if (!SUPABASE_URL || !SUPABASE_KEY) {
	throw new Error('Supabase URL and KEY are required.')
}

class SupabaseClient {
	private static instance: SupabaseClient
	private client: SupabaseClientType

	private constructor() {
		this.client = createClient<Database>(SUPABASE_URL, SUPABASE_KEY)
	}

	public static getInstance(): SupabaseClient {
		if (!SupabaseClient.instance) {
			SupabaseClient.instance = new SupabaseClient()
		}
		return SupabaseClient.instance
	}

	public getClient(): SupabaseClientType {
		return this.client
	}
}

const instance = SupabaseClient.getInstance()
Object.freeze(instance)

export default instance
