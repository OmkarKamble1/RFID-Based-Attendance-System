import { format } from 'date-fns';

export const devConsole = (d) => {
	if(process.env.NODE_ENV === 'production') return;
	const date = format(new Date(Date.now()), 'dd-MM-yyyy HH:mm:ss');
  	console.log(`[${date}][development]: ${d}`);
}
