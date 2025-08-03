export class PriorityQueue<T> {
    public heap: T[] = []
    private readonly comparator: (a: T, b: T) => number;

    public constructor(data: T[], comp: (a: T, b: T) => number) {
        this.comparator = comp

        // Heapify
        data.forEach((item: T) => this.push(item))
    }

    public pop(): T | undefined {
        if (this.isEmpty()) return;

        let top = this.top();
        let last = this.heap.pop()!

        if (!this.isEmpty()) {
            this.heap[0] = last;
            this.bubbleDown();
        }

        return top;
    }

    public push(val: T): void {
        this.heap.push(val);
        this.bubbleUp();
    }

    public top(): T {
        return this.heap[0];
    }

    public bubbleUp(): void {
        let i = this.heap.length - 1;

        while (i > 0) {
            let parent = Math.floor((i - 1) /  2)
            if (this.comparator(this.heap[i], this.heap[parent]) >= 0) break;

            [this.heap[i],this.heap[parent]] = [this.heap[parent], this.heap[i]];
            i = parent;
        }
    }

    public bubbleDown(): void {
        let i = 0;
        let length = this.size();
        
        while (true) {
            let left = Math.floor(2 * i + 1);
            let right = Math.floor(2 * i + 2);
            let priority = i;

            if (left < length && this.comparator(this.heap[left], this.heap[priority]) < 0) {
                priority = left;
            }

            if (right < length && this.comparator(this.heap[right], this.heap[priority]) < 0) {
                priority = right;
            }

            if (priority === i) break;

            [this.heap[i], this.heap[priority]] = [this.heap[priority], this.heap[i]];
            i = priority;
        }
    }

    public isEmpty(): boolean {
        return this.heap.length === 0;
    }

    public size(): number {
        return this.heap.length;
    }

}