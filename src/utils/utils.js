export const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat'];
export const months = [
	null,
  'January', 
	'February',
	'March', 
	'April', 
	'May', 
	'June', 
	'July', 
	'August',
	'September',
	'October',
	'November',
	'December'
];

export function getDaysArray(year, month) {
	const names = [ 'Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat' ];
	let date = new Date(year, month-1, 1);
  const result = [[], [], [], [], []];
  let week = 0;
  while (date.getMonth() == month-1 && week < 6) {
    /* If there are 5 rows to be rendered, create an extra week */
    if (week === 5) result[5] = []; 		
    result[week].push(date.getDate()+ '-' +names[date.getDay()]);
    if (names[date.getDay()] =='Sat') week++;
    date.setDate(date.getDate()+1);
	}
  return result;
}

/*Random key generator for keys*/
export function uniqueID () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 7);
}
