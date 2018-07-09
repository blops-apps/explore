import randomColor from 'randomcolor';

export default function colorPicker(ary) {
	const colors = (ary || []).map(e => randomColor())
	console.log(colors)
	return colors
}