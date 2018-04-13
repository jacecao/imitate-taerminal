export default function (parent, children) {
	let height = children.offsetHeight - parent.offsetHeight;
	children.style.transform = `translate3d(0,-${height}px,0)`;
}