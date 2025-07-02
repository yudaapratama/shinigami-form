// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


type Payment = {
	checkout_url: string
	payment_id: string
}

type Data = {
	success: boolean
	message: string
  data?: Payment
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

	if (req.method !== 'POST') {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).json({
			success: false,
			message: 'Method not allowed'
		})
	}

	const body = JSON.parse(req.body)

	const request = await fetch(`https://gateway.genshinwish.cloud/v1/payment/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			"user_id": body.userId,
			"user_email": body.email,
			"user_name": body.name,
			"payment_method": body.method,
			"support_message": body.message === '' ? '-' : body.message
		})
	})
	
	if (request.status !== 200) {
		return res.status(request.status).json({
			success: false,
			message: 'Create payment failed'
		})
	}

	const payment = await request.json()

  res.status(200).json({
		success: true,
		message: 'Create payment success',
		data: payment
	})
}