function Node(value: any) {
    this.value = value;
    this.next = null;
}
interface INode{
    value: any,
    next: object| null
}
function LinkedList() {
    this.head = null;

    this.add = function (value: any): void {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    };

    this.remove = function (value: any): void {
        if (!this.head) return;

        if (this.head.value === value) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next && current.next.value !== value) {
            current = current.next;
        }

        if (current.next) {
            current.next = current.next.next;
        }
    };

    this.search = function (value: any): Node | null {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }
        return null;
    };

    this.insert = function (value: any, index: number): void {
        if (index < 0) return;

        const newNode = new Node(value);
        if (index === 0) {
            newNode.next = this.head;
            this.head = newNode;
            return;
        }

        let current = this.head;
        let prev = null;
        let i = 0;

        while (current && i < index) {
            prev = current;
            current = current.next;
            i++;
        }

        if (prev) {
            newNode.next = current;
            prev.next = newNode;
        }
    };

    this.reverse = function (): void {
        let previous = null;
        let current = this.head;
        let next = null;

        while (current) {
            next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }

        this.head = previous;
    };

    
}

