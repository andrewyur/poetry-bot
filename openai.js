import OpenAI from 'openai';

export async function completion(role, prompt) {
	const openai = new OpenAI();

	const response = await openai.chat.completions.create({
		messages: [
			{ role: 'system', content: role },
			{ role: 'user', content: prompt },
		],
		model: 'gpt-3.5-turbo',
	});

	return response.choices[0].message.content;
}

export async function image(prompt) {
	const openai = new OpenAI();

	const response = await openai.images.generate({
		model: 'dall-e-3',
		prompt,
		n: 1,
		size: '1024x1024',
	});


	return response.data.url;
}