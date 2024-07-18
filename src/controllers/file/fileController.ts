import { Request, Response } from 'express'
import fileServiceClass from '../../services/file/fileService'
import { FileMoveParams } from '../../types/types'
import {handleError} from "../../utils/erroHandler";

const fileService = new fileServiceClass()

interface FileParams {
	fileId: string
}

// Define interface for query parameters
interface FileQuery {
	version?: string
	format?: string
}
class FileController {
	async uploadFile(req: Request, res: Response) {
		try {
			const result = await fileService.uploadFile(req, res)
			if (result) {
				res
					.status(200)
					.json({ success: true, message: 'File uploaded successfully' })
			} else {
				res.status(404).json({ message: 'Error uploading file' })
			}
		} catch (error) {
			console.log(error)
			const { statusCode, message } = handleError(error)
			res.status(statusCode).json({ message })
		}
	}

	async moveFile(
		req: Request<FileParams, {}, {}, FileMoveParams>,
		res: Response
	) {
		try {
			const { fromPath, toPath } = req.query
			const { fileId } = req.params

			const result = await fileService.moveFile(fromPath, toPath, fileId)
			if (result) {
				res
					.status(200)
					.json({ success: true, message: 'File moved successfully' })
			} else {
				res.status(404).json({ message: 'Error moving file' })
			}
		} catch (error) {
			const { statusCode, message } = handleError(error)
			res.status(statusCode).json({ message })
		}
	}

	async copyFile(
		req: Request<FileParams, {}, {}, FileMoveParams>,
		res: Response
	) {
		try {
			const { fromPath, toPath } = req.query
			const { fileId } = req.params

			const result = await fileService.copyFile(fromPath, toPath, fileId)
			if (result) {
				res
					.status(200)
					.json({ success: true, message: 'File copy successfully' })
			} else {
				res.status(404).json({ message: 'Error copying file' })
			}
		} catch (error) {
			const { statusCode, message } = handleError(error)
			res.status(statusCode).json({ message })
		}
	}

	async deleteFile(
		req: Request<FileParams, {}, {}, Omit<FileMoveParams, 'toPath'>>,
		res: Response
	) {
		try {
			const { fromPath } = req.query
			const { fileId } = req.params

			const result = await fileService.deleteFile(fromPath, fileId)
			if (result) {
				res
					.status(200)
					.json({ success: true, message: 'File delete successfully' })
			} else {
				res.status(404).json({ message: 'Error delete file' })
			}
		} catch (error) {
			const { statusCode, message } = handleError(error)
			res.status(statusCode).json({ message })
		}
	}

	async downloadFile(req: Request<FileParams, {}, {}, {}>, res: Response) {
		try {
			const { fileId } = req.params
			const result = await fileService.downloadFile(fileId)

			if (result) {
				res.status(200).send(result.data)
			} else {
				res.status(404).json({ message: 'Error downloading file' })
			}
		} catch (error) {
			const { statusCode, message } = handleError(error)
			res.status(statusCode).json({ message })
		}
	}

	async getFileInfo(
		req: Request<FileParams, {}, {}, Pick<FileMoveParams, 'file_id'>>,
		res: Response
	) {
		try {
			const { fileId } = req.params
			const result = await fileService.getFileInfo(fileId)

			if (result) {
				res.status(200).json(result.data)
			} else {
				res.status(404).json({ message: 'Error getting file info' })
			}
		} catch (error) {
			const { statusCode, message } = handleError(error)
			res.status(statusCode).json({ message })
		}
	}
}

export default new FileController()
