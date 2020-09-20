// 定义：在链式存储结构中，通过每个结点存储数据元素信息，并且存放下个后继元素的存储地址，从而将整个结构链接起来。
// 每个结点包含两部分，其中存储数据元素信息的域称为数据域（存放数据），存储直接后继元素位置的域称为指针域（存放下个结点的指针）
// 通过链表，可以快速的增加或删除结点，但查询速度较慢。
// 线性表包括顺序存储结构和链表结构，若线性表需要频繁查找，很少进行插入和删除操作时，宜采用顺序存储结构。
// 若需要频繁插入和删除时，宜采用单链表结构。
// 时间性能对比：
// 查找: 顺序存储结构为为O(1)，单链表为O(n)
// 插入和删除: 顺序存储结构为为O(n)，单链表在找出指定位置指针后，为O(1)
// 空间性能对比：
// 顺序存储结构需要预先分配存储空间，分大了，浪费空间，分小了，容易发生溢出。
// 单链表：不需分配存储空间，只要有空间就可以进行分配，元素个数也不受限制。

// 单链表，实现功能：创建、查找、查找上一个、尾部插入、头部插入、给定节点之前插入、给定节点之后插入、 按给定节点删除、整表删除
class ListNode {
  constructor (list) {
    // 不传参数则创建空链表
    if (!list) {
      this.head = null
      return
    }
    // 如果传入数组，则按数组顺序创建链表
    if (list instanceof Array) {
      if (list.length === 0) {
        this.head = null
      } else {
        this.create(list)
      }
    } else {
      this.head = null
    }
  }

  // 按数组创建整个链表
  create (list) {
    let currentNode
    for (let i = 0, len = list.length; i < len; i++) {
      let value = list[i]
      if (i === 0) {
        // 创建头节点
        const newNode = new Node(value)
        this.head = newNode
        currentNode = this.head
      } else {
        // 依次往后创建节点
        const newNode = new Node(value)
        currentNode.next = newNode
        currentNode = currentNode.next
      }
    }
  }

  // 尾部插入
  append (value) {
    let headNode = this.head
    // 如果链表是空的，插入的节点将是第一个节点
    if (!headNode) {
      this.head = new Node(value)
      return
    }
    currentNode = headNode
    // 找到链表的最后一个节点
    while (currentNode.next) {
      currentNode = currentNode.next
    }
    currentNode.next = new Node(value)
  }

  // 头部插入
  unshift (value) {
    let headNode = this.head
    // 如果链表是空的，插入的节点将是第一个节点
    if (!headNode) {
      this.head = new Node(value)
      return
    }
    let newNode = new Node(value)
    newNode.next = this.head
    this.head = newNode
  }

  // 给定节点值之后插入
  insertAfter (insertValue, value) {
    let findNode = this.find(insertValue)
    if (findNode) {
      const newNode = new Node(value)
      newNode.next = findNode.next
      findNode.next = newNode
      return true
    } else {
      return false
    }
  }

  // 给定节点值之前插入
  insertBefore (insertValue, value) {
    let findPrevNode = this.find(insertValue)
    if (findPrevNode) {
      const newNode = new Node(value)
      newNode.next = findPrevNode.next
      findPrevNode.next = newNode
      return true
    } else {
      return false
    }
  }

  // 通过值查找节点
  find (value) {
    let currentNode = this.head
    // 如果链表是空的，返回null
    if (!currentNode) {
      return null
    }
    // 开始查找
    while (currentNode) {
      if (currentNode.value === value) {
        return currentNode
      }
      currentNode = currentNode.next
    }
    // 如果没找到，返回null
    return null
  }

  // 通过值查找上个节点
  findPrev (value) {
    let currentNode = this.head
    let prevNode = this.head
    // 如果链表是空的，返回null
    if (!currentNode) {
      return null
    }
    // 开始查找
    while (currentNode) {
      if (currentNode.value === value) {
        return prevNode
      }
      prevNode = currentNode
      currentNode = currentNode.next
    }
    // 如果没找到，返回null
    return null
  }

  // 删除指定节点
  delete (value) {
    let findPrevNode = this.findPrev(value)
    let currentNode = findPrevNode.next
    findPrevNode.next = currentNode.next
    currentNode = null
  }

  // 删除整个链表
  clear () {
    let currentNode = this.head
    // 删除第一个节点
    this.head = null
    // 解除节点得到next引用，即可被垃圾回收器回收
    while (currentNode) {
      let prevNode = currentNode
      currentNode = currentNode.next
      prevNode.next = null
    }
  }
}

// 生成节点的构造函数
function Node (value) {
  this.next = null
  this.value = value
}

const listNode = new ListNode ([1, 5, 7, 3, 6])
// listNode.append(1)
// listNode.unshift(2)
// listNode.insertAfter(2, 3)
// listNode.insertBefore(1, 4)
// listNode.delete(1)
// listNode.clear()
console.log('listNode-', JSON.stringify(listNode))
