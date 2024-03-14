import OpenAI from 'openai';

export async function completion(role, prompt) {
	const openai = new OpenAI();

	let input;
	if (!prompt) {
		input = [
			{ role: 'system', content: role },
		];
	}
	else {
		input = [
			{ role: 'system', content: role },
			{ role: 'user', content: prompt },
		];
	}

	const response = await openai.chat.completions.create({
		messages: input,
		model: 'gpt-3.5-turbo',
	});

	return response.choices[0].message.content;
}

// probably wont use this one, very expensive
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