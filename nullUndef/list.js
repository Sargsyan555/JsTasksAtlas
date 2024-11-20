function Node(value) {
    this.value = value;
    this.next = null;
}
// type INode{
//     value: any,
//     next: object| null
// }
function LinkedList() {
    this.head = null;
    this.add = function (value) {
        var newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        }
        else {
            var current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    };
    this.remove = function (value) {
        if (!this.head)
            return;
        if (this.head.value === value) {
            this.head = this.head.next;
            return;
        }
        var current = this.head;
        while (current.next && current.next.value !== value) {
            current = current.next;
        }
        if (current.next) {
            current.next = current.next.next;
        }
    };
    this.search = function (value) {
        var current = this.head;
        while (current) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }
        return null;
    };
    this.insert = function (value, index) {
        if (index < 0)
            return;
        var newNode = new Node(value);
        if (index === 0) {
            newNode.next = this.head;
            this.head = newNode;
            return;
        }
        var current = this.head;
        var previous = null;
        var i = 0;
        while (current && i < index) {
            previous = current;
            current = current.next;
            i++;
        }
        if (previous) {
            newNode.next = current;
            previous.next = newNode;
        }
    };
    this.reverse = function () {
        var previous = null;
        var current = this.head;
        var next = null;
        while (current) {
            next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }
        this.head = previous;
    };
}
// Example usage
var list = new LinkedList();
list.add(10);
list.add(20);
list.remove(10);
list.insert(15, 1);
list.reverse();
console.log(list.search(15)); // Node { value: 15, next: Node { value: 5, next: null } }
console.log(list.search(100)); // null
