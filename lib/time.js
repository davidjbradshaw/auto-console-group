export default function time() {
    const now = new Date();
    const padTime = (key, targetLength) => now[`get${key}`]().toString().padStart(targetLength, '0');
    const hours = padTime('Hours', 2);
    const minutes = padTime('Minutes', 2);
    const seconds = padTime('Seconds', 2);
    const milliseconds = padTime('Milliseconds', 3);
    return `@ ${hours}:${minutes}:${seconds}.${milliseconds}`;
}
